import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import styles from "./catalog-filters.module.css";

type FilterOption = { value: string; label: string };
type FilterDefinition = { name: string; label: string; options: FilterOption[] };

export function CatalogFilters({
  action,
  locale,
  filters,
  values,
  applyLabel,
  clearLabel,
  resultLabel,
  resultCount,
}: {
  action: string;
  locale: Locale;
  filters: FilterDefinition[];
  values: Record<string, string>;
  applyLabel: string;
  clearLabel: string;
  resultLabel: string;
  resultCount: number;
}) {
  return (
    <div className={styles.panel}>
      <form method="get" action={action} className={styles.form}>
        <input type="hidden" name="lang" value={locale} />
        {filters.map((filter) => (
          <label key={filter.name}>
            <span>{filter.label}</span>
            <select name={filter.name} defaultValue={values[filter.name] ?? ""}>
              <option value="">—</option>
              {filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        ))}
        <div className={styles.actions}>
          <button type="submit">{applyLabel}</button>
          <Link href={withLocale(action, locale)}>{clearLabel}</Link>
        </div>
      </form>
      <p className={styles.count}><strong>{resultCount}</strong> {resultLabel}</p>
    </div>
  );
}
