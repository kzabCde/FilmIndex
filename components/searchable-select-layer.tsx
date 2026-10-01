"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

type SelectBinding = {
  select: HTMLSelectElement;
  id: string;
};

type PositionedBinding = SelectBinding & {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
};

function optionText(option: HTMLOptionElement) {
  return (option.textContent ?? "").trim();
}

function labelForSelect(select: HTMLSelectElement) {
  const explicit = select.getAttribute("aria-label");
  if (explicit) return explicit;
  const label = select.closest("label");
  const heading = label?.querySelector("span")?.textContent?.trim();
  return heading || select.name || "Select option";
}

function isVisible(select: HTMLSelectElement) {
  const rect = select.getBoundingClientRect();
  const style = window.getComputedStyle(select);
  return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
}

function positionOf(binding: SelectBinding): PositionedBinding {
  const rect = binding.select.getBoundingClientRect();
  return {
    ...binding,
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    visible: isVisible(binding.select),
  };
}

function SearchableSelectInput({ binding }: { binding: PositionedBinding }) {
  const { select } = binding;
  const [text, setText] = useState(() => optionText(select.options[select.selectedIndex]));
  const [focused, setFocused] = useState(false);

  const options = useMemo(
    () => Array.from(select.options).map((option) => ({ value: option.value, label: optionText(option), disabled: option.disabled })),
    [select, select.options.length],
  );

  useEffect(() => {
    const sync = () => setText(optionText(select.options[select.selectedIndex]));
    select.addEventListener("change", sync);
    select.addEventListener("input", sync);
    return () => {
      select.removeEventListener("change", sync);
      select.removeEventListener("input", sync);
    };
  }, [select]);

  function commit(raw: string) {
    const normalized = raw.trim().toLocaleLowerCase();
    const match = options.find((option) => option.label.toLocaleLowerCase() === normalized)
      ?? options.find((option) => option.value.toLocaleLowerCase() === normalized);
    if (!match || match.disabled) return false;
    if (select.value !== match.value) {
      const valueSetter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
      valueSetter?.call(select, match.value);
      select.dispatchEvent(new Event("input", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setText(match.label);
    return true;
  }

  function restore() {
    setText(optionText(select.options[select.selectedIndex]));
  }

  if (!binding.visible) return null;

  return (
    <div
      className={`searchable-select-overlay${focused ? " is-focused" : ""}`}
      style={{ top: binding.top, left: binding.left, width: binding.width, height: binding.height }}
      data-searchable-select-for={binding.id}
    >
      <input
        type="text"
        role="combobox"
        aria-label={labelForSelect(select)}
        aria-autocomplete="list"
        aria-expanded={focused}
        list={`${binding.id}-options`}
        value={text}
        onFocus={(event) => {
          setFocused(true);
          event.currentTarget.select();
        }}
        onChange={(event) => {
          const next = event.target.value;
          setText(next);
          commit(next);
        }}
        onBlur={() => {
          setFocused(false);
          if (!commit(text)) restore();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (commit(text)) event.currentTarget.blur();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            restore();
            event.currentTarget.blur();
          }
        }}
      />
      <span className="searchable-select-chevron" aria-hidden="true">⌄</span>
      <datalist id={`${binding.id}-options`}>
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.label}>{option.label}</option>
        ))}
      </datalist>
    </div>
  );
}

export function SearchableSelectLayer() {
  const [bindings, setBindings] = useState<PositionedBinding[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    let nextId = 0;
    const ids = new WeakMap<HTMLSelectElement, string>();

    const scan = () => {
      const selects = Array.from(document.querySelectorAll("select"));
      const next = selects.map((select) => {
        let id = ids.get(select);
        if (!id) {
          nextId += 1;
          id = `filmindex-searchable-select-${nextId}`;
          ids.set(select, id);
          select.dataset.searchableSelectEnhanced = "true";
        }
        return positionOf({ select, id });
      });
      setBindings(next);
    };

    const scheduleScan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };

    const observer = new MutationObserver(scheduleScan);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style", "hidden"] });
    const resizeObserver = new ResizeObserver(scheduleScan);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", scheduleScan);
    window.addEventListener("scroll", scheduleScan, true);
    scan();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleScan);
      window.removeEventListener("scroll", scheduleScan, true);
      document.querySelectorAll("select[data-searchable-select-enhanced]").forEach((select) => delete (select as HTMLElement).dataset.searchableSelectEnhanced);
    };
  }, []);

  if (!mounted) return null;
  return createPortal(
    <div className="searchable-select-layer" aria-hidden={false}>
      {bindings.map((binding) => <SearchableSelectInput key={binding.id} binding={binding} />)}
    </div>,
    document.body,
  );
}
