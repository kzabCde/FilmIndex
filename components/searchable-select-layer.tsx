"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

type SelectBinding = {
  select: HTMLSelectElement;
  mount: HTMLSpanElement;
  id: string;
};

type SelectOption = {
  value: string;
  label: string;
  disabled: boolean;
};

function optionText(option: HTMLOptionElement | undefined) {
  return (option?.textContent ?? "").trim();
}

function selectedText(select: HTMLSelectElement) {
  return optionText(select.options[select.selectedIndex]);
}

function labelForSelect(select: HTMLSelectElement) {
  const explicit = select.getAttribute("aria-label");
  if (explicit) return explicit;
  const label = select.closest("label");
  const heading = label?.querySelector(":scope > span")?.textContent?.trim()
    ?? label?.querySelector("span")?.textContent?.trim();
  return heading || select.name || "Select option";
}

function readOptions(select: HTMLSelectElement): SelectOption[] {
  return Array.from(select.options).map((option) => ({
    value: option.value,
    label: optionText(option),
    disabled: option.disabled,
  }));
}

function SearchableSelectInput({ binding }: { binding: SelectBinding }) {
  const { select, id } = binding;
  const rootRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(() => selectedText(select));
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [, refreshOptions] = useState(0);

  const options = readOptions(select);
  const needle = typed ? query.trim().toLocaleLowerCase() : "";
  const filtered = options.filter((option) => !needle || option.label.toLocaleLowerCase().includes(needle));
  const menuId = `${id}-menu`;

  useEffect(() => {
    const sync = () => {
      setQuery(selectedText(select));
      setTyped(false);
      setActiveIndex(-1);
      refreshOptions((value) => value + 1);
    };
    select.addEventListener("change", sync);
    select.addEventListener("input", sync);
    return () => {
      select.removeEventListener("change", sync);
      select.removeEventListener("input", sync);
    };
  }, [select]);

  function choose(option: SelectOption) {
    if (option.disabled) return;
    if (select.value !== option.value) {
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
      setter?.call(select, option.value);
      select.dispatchEvent(new Event("input", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setQuery(option.label);
    setTyped(false);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function openMenu() {
    refreshOptions((value) => value + 1);
    setQuery(selectedText(select));
    setTyped(false);
    setActiveIndex(-1);
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    setTyped(false);
    setActiveIndex(-1);
    setQuery(selectedText(select));
  }

  function moveActive(delta: number) {
    const enabled = filtered.map((option, index) => ({ option, index })).filter(({ option }) => !option.disabled);
    if (!enabled.length) return;
    const currentPosition = enabled.findIndex(({ index }) => index === activeIndex);
    const nextPosition = currentPosition < 0
      ? (delta > 0 ? 0 : enabled.length - 1)
      : (currentPosition + delta + enabled.length) % enabled.length;
    setActiveIndex(enabled[nextPosition].index);
  }

  return (
    <span className={`searchable-select${open ? " is-open" : ""}`} ref={rootRef} data-searchable-select-for={id}>
      <span className="searchable-select-control">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-label={labelForSelect(select)}
          aria-autocomplete="list"
          aria-controls={menuId}
          aria-expanded={open}
          aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          value={query}
          onFocus={(event) => {
            if (!open) openMenu();
            event.currentTarget.select();
          }}
          onClick={() => {
            if (!open) openMenu();
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setTyped(true);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onBlur={() => {
            window.setTimeout(() => {
              if (!rootRef.current?.contains(document.activeElement)) closeMenu();
            }, 0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              if (!open) openMenu();
              moveActive(1);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (!open) openMenu();
              moveActive(-1);
            } else if (event.key === "Enter" && open) {
              const target = activeIndex >= 0 ? filtered[activeIndex] : filtered.find((option) => !option.disabled);
              if (target) {
                event.preventDefault();
                choose(target);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              closeMenu();
              event.currentTarget.select();
            }
          }}
        />
        <button
          type="button"
          className="searchable-select-toggle"
          tabIndex={-1}
          aria-label={open ? "Close options" : "Open options"}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (open) closeMenu();
            else openMenu();
            inputRef.current?.focus();
          }}
        >
          <span aria-hidden="true">⌄</span>
        </button>
      </span>

      {open ? (
        <span className="searchable-select-menu" id={menuId} role="listbox">
          {filtered.length ? filtered.map((option, index) => (
            <button
              id={`${id}-option-${index}`}
              key={`${option.value}-${index}`}
              type="button"
              role="option"
              aria-selected={select.value === option.value}
              disabled={option.disabled}
              className={index === activeIndex ? "is-active" : ""}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(option)}
            >
              {option.label || "—"}
            </button>
          )) : <span className="searchable-select-empty">No matching options</span>}
        </span>
      ) : null}
    </span>
  );
}

export function SearchableSelectLayer() {
  const [bindings, setBindings] = useState<SelectBinding[]>([]);

  useEffect(() => {
    let raf = 0;
    let nextId = 0;
    const ids = new WeakMap<HTMLSelectElement, string>();
    const originals = new WeakMap<HTMLSelectElement, { tabIndex: string | null; ariaHidden: string | null }>();
    let previous: SelectBinding[] = [];

    const scan = () => {
      const selects = Array.from(document.querySelectorAll<HTMLSelectElement>("select:not([data-no-search-enhance])"));
      const activeSelects = new Set(selects);

      previous.forEach((binding) => {
        if (!activeSelects.has(binding.select) || !binding.select.isConnected) binding.mount.remove();
      });

      const next = selects.map((select) => {
        let id = ids.get(select);
        if (!id) {
          nextId += 1;
          id = `filmindex-searchable-select-${nextId}`;
          ids.set(select, id);
          originals.set(select, {
            tabIndex: select.getAttribute("tabindex"),
            ariaHidden: select.getAttribute("aria-hidden"),
          });
        }

        let mount = select.nextElementSibling instanceof HTMLSpanElement && select.nextElementSibling.classList.contains("searchable-select-mount")
          ? select.nextElementSibling
          : null;

        if (!mount) {
          mount = document.createElement("span");
          mount.className = "searchable-select-mount";
          select.insertAdjacentElement("afterend", mount);
        }

        select.dataset.searchableSelectEnhanced = "true";
        select.classList.add("searchable-select-native");
        select.tabIndex = -1;
        select.setAttribute("aria-hidden", "true");

        return { select, mount, id };
      });

      previous = next;
      setBindings(next);
    };

    const scheduleScan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };

    const observer = new MutationObserver((mutations) => {
      const relevant = mutations.some((mutation) => {
        const target = mutation.target;
        return !(target instanceof Element && target.closest(".searchable-select-mount"));
      });
      if (relevant) scheduleScan();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    scan();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      previous.forEach(({ select, mount }) => {
        mount.remove();
        select.classList.remove("searchable-select-native");
        delete select.dataset.searchableSelectEnhanced;
        const original = originals.get(select);
        if (original?.tabIndex === null) select.removeAttribute("tabindex");
        else if (original) select.setAttribute("tabindex", original.tabIndex);
        if (original?.ariaHidden === null) select.removeAttribute("aria-hidden");
        else if (original) select.setAttribute("aria-hidden", original.ariaHidden);
      });
    };
  }, []);

  return <>{bindings.map((binding) => createPortal(<SearchableSelectInput binding={binding} />, binding.mount, binding.id))}</>;
}
