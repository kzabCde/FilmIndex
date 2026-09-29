export function BrandIcon({ className = "brand-mark" }: { className?: string }) {
  return (
    <img
      className={className}
      src="/filmindex-icon.png"
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
