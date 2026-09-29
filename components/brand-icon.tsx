export function BrandIcon({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="13" fill="currentColor" />
      <g fill="var(--brand-paper, #F4F1EA)">
        <rect x="4" y="9" width="6" height="6" rx="1.5" />
        <rect x="4" y="19" width="6" height="6" rx="1.5" />
        <rect x="4" y="29" width="6" height="6" rx="1.5" />
        <rect x="4" y="39" width="6" height="6" rx="1.5" />
        <rect x="4" y="49" width="6" height="6" rx="1.5" />
        <rect x="54" y="9" width="6" height="6" rx="1.5" />
        <rect x="54" y="19" width="6" height="6" rx="1.5" />
        <rect x="54" y="29" width="6" height="6" rx="1.5" />
        <rect x="54" y="39" width="6" height="6" rx="1.5" />
        <rect x="54" y="49" width="6" height="6" rx="1.5" />
        <path d="M15 14h21c4 0 8 1 11 3 3 2 5 5 6 8l-5 2c-1-2-3-4-4-5-2-1-4-2-7-2h-9v9h16v6H28v15h-8V20h-5v-6Z" />
        <path d="M43 14h8v36h-8V14Z" />
      </g>
      <rect x="30" y="36" width="7" height="7" rx="1.5" fill="#E5A128" />
    </svg>
  );
}
