import Blank from "./Blank";
import Logo from "./Logo";

/** The landing page's legal footer. No storefront navigation (brief). */
export default function LandingFooter() {
  return (
    <footer className="bg-accent-900 text-accent-200">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-4 py-10 text-center text-sm sm:px-6 lg:px-8">
        <Logo variant="reversed" className="h-8 w-auto" />
        <p className="text-accent-200">
          &copy; {new Date().getFullYear()} Ranzo Hardware. Family-owned on Long Island since 2021.
        </p>
        <p className="text-accent-200">Ranzo Supply LLC · 1640 Lincoln Ave, Unit 2, Holbrook, NY 11741</p>
        <p>
          <Blank tone="dark" source="Daniel, at port, RAN-40">
            legal links, which pages and which URLs
          </Blank>
        </p>
      </div>
    </footer>
  );
}
