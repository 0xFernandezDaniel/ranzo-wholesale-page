import Logo from "./Logo";

const SITE = "https://ranzohardware.com";

/** Stand-in footer; the real one is swapped in when the page is ported. */
export default function SiteFooter() {
  return (
    <footer className="bg-steel-600 text-accent-200">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Logo variant="reversed" className="h-8 w-auto" />
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`${SITE}/shipping-delivery`} className="hover:text-white">Shipping</a>
          <a href={`${SITE}/return-policy`} className="hover:text-white">Returns</a>
          <a href={`${SITE}/contact`} className="hover:text-white">Contact</a>
          <a href={`${SITE}/about`} className="hover:text-white">About</a>
        </div>
        <p className="text-xs text-accent-300">&copy; {new Date().getFullYear()} Ranzo Hardware. Family owned, Holbrook, NY.</p>
      </div>
    </footer>
  );
}
