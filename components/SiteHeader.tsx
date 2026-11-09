import Logo from "./Logo";

const SITE = "https://ranzohardware.com";

/**
 * A stand-in for the real storefront header (which needs the live catalog
 * and cart). Same height, colour and logo so the page below reads in
 * context. Not part of the design: the real header replaces it when the
 * page is ported.
 */
export default function SiteHeader() {
  return (
    <header className="bg-steel-600 text-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href={SITE} aria-label="Ranzo Hardware home">
          <Logo variant="reversed" className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-accent-100 md:flex">
          <a href={`${SITE}/departments`} className="hover:text-white">Departments</a>
          <a href={`${SITE}/best-sellers`} className="hover:text-white">Best Sellers</a>
          <a href={`${SITE}/bulk-discounts`} className="hover:text-white">Bulk Discounts</a>
          <span className="rounded-full bg-brand-500 px-3 py-1 text-white">Wholesale</span>
        </nav>
      </div>
    </header>
  );
}
