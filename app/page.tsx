import type { Metadata } from "next";

import Image from "next/image";

import Blank from "@/components/Blank";
import { InterestFormProvider, PricingButton } from "@/components/InterestForm";
import LandingFooter from "@/components/LandingFooter";
import LandingHeader from "@/components/LandingHeader";

/**
 * The wholesale landing page. One job: get a qualified wholesale buyer to
 * click the button and fill in the six-field interest form.
 *
 * Spec: the "Wholesale page brief" in Linear, plus RAN-14, 44, 45, 46, 47,
 * 48, 51 and 52. Every claim here comes from the brief. Anything missing or
 * undecided is a <Blank>, never a guess.
 *
 * The look (Daniel's feedback, after qogita.com and acquisition.com): a light
 * hero with the photo sitting on it, a headline at a moderate size, and dark
 * colour kept for the slim top bar, text, the closing band and the footer.
 * White and very light grey bands alternate, everything lines up on one left
 * edge, and orange is the button plus the three step numbers. Storefront
 * tokens only.
 */

export const metadata: Metadata = {
  // absolute: the full tab title, so a layout's "%s | Ranzo Hardware" template
  // can never double the suffix after the port.
  title: { absolute: "Wholesale tools and hardware | Ranzo Hardware" },
  description:
    "Wholesale tools and hardware by the case or pallet. DeWalt, Milwaukee and more. For business buyers with a resale certificate.",
};

const HERO_BUTTON_ID = "hero-cta";

/**
 * THE HERO PHOTO (RAN-45). public/images/wholesale-hero.jpg, a square
 * 1600x1600 JPEG under 500 KB. To swap it, replace the file or change `src`.
 *
 * It fills the right of the hero band on a laptop, running to the band's
 * right edge and fading into the grey on its left, and sits under the text on
 * a phone, where it shows whole. It is cropped to fill its space, and `crop`
 * says which part stays in view at each width: the laptop space is taller
 * than wide, so it keeps the left and middle (the two full pallets) and lets
 * the right edge go; the tablet space is wide, so it keeps the floor and
 * pallets and lets the ceiling go.
 */
const HERO_PHOTO = {
  src: "/images/wholesale-hero.jpg",
  alt: "Pallets stacked with boxed DeWalt tools on a warehouse floor",
  crop: "object-center sm:object-[50%_72%] lg:object-[34%_50%]",
};

/**
 * The headline, as two phrases that each start their own line. Daniel has
 * decided this is one general landing page, so it names no single brand
 * (RAN-44).
 */
const HEADLINE = { lead: "Wholesale tools and hardware,", second: "by the case or pallet." };

/**
 * How wide the longer phrase is, in ems of the headline type: 0.5em a
 * character is a safe estimate for this face and weight (this headline
 * measures 0.49). The hero's text column is made exactly this wide on a
 * laptop, so each phrase stays on one line and the photo gets the rest.
 */
const HEADLINE_EMS = Math.max(HEADLINE.lead.length, HEADLINE.second.length) * 0.5;

/** The brief's numbers ("can we deliver"), as the hero's row of stats. */
const STATS = [
  { figure: "60,000+", label: "products" },
  { figure: "2,900+", label: "brands" },
  // Non-breaking spaces (\u00A0) keep "in 14 states" together.
  { figure: "15", label: "distribution centers in\u00A014\u00A0states" },
];

/**
 * Brand logos (RAN-49). Provisional: Daniel still has to confirm which logos
 * we are allowed to show. Order is the one Ty set.
 *
 * Each file in public/images/brands is the brand's own, copied in unchanged
 * and shown as supplied: never redrawn, recoloured, cropped or stretched.
 * `mark` is the share of the file's height that the visible logo fills (the
 * rest is the file's own empty margin). The page divides by it so every logo
 * is drawn at the same visual height, whatever margin its file carries.
 *
 * A brand with no usable file has no `logo` and shows as a plain text tile.
 * To add one: put the file in public/images/brands and fill in `logo`.
 */
const BRANDS: {
  name: string;
  logo?: { src: string; width: number; height: number; mark: number };
}[] = [
  { name: "DeWalt", logo: { src: "/images/brands/dewalt.svg", width: 957, height: 343, mark: 0.794 } },
  { name: "Milwaukee", logo: { src: "/images/brands/milwaukee.png", width: 256, height: 256, mark: 1 } },
  { name: "Makita", logo: { src: "/images/brands/makita.png", width: 256, height: 256, mark: 1 } },
  { name: "3M" }, // no logo file supplied
  { name: "Stanley", logo: { src: "/images/brands/stanley.png", width: 256, height: 256, mark: 1 } },
  { name: "Grip-Rite", logo: { src: "/images/brands/grip-rite.png", width: 256, height: 256, mark: 0.484 } },
];

/**
 * The shared visual height of the logos: 48px, or less when a tile is too
 * narrow for the widest logo (DeWalt's badge, 3.26 times as wide as it is
 * tall) to keep 20px of clear space on each side. 100cqw is the tile's width.
 */
const LOGO_HEIGHT = "min(3rem, calc((100cqw - 2.5rem) / 3.26))";

/** Top wholesale categories (RAN-49), as Ty listed them. */
const CATEGORIES = [
  "Power tools",
  "Batteries and chargers",
  "Hand tools",
  "Fasteners",
  "Safety gear",
  "Tapes and adhesives",
  "Tool storage",
  "Outdoor equipment",
];

const STEPS = [
  {
    title: "Tell us about your business",
    body: "Six fields: company, contact name, phone, email, ship-to ZIP and how you heard of us.",
  },
  {
    title: "We reach out within the hour with pricing",
    body: "Monday to Friday, 9 to 6 Eastern. Pricing follows by email.",
  },
  {
    title: "We ship by the case from the nearest warehouse",
    body: "15 distribution centers in 14 states.",
  },
];

/** Who the page is not for. Sits with the button, both times. No minimum
    order is stated (removed pending Daniel's decision in RAN-42). */
const DISQUALIFIER = "Business buyers only. Resale certificate required.";

/** One heading style for every section: left-aligned, moderate, bold. */
function SectionHeading({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <h2
      className={`text-balance text-[1.75rem] font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl ${tone === "dark" ? "text-white" : "text-accent-500"}`}
    >
      {children}
    </h2>
  );
}

/** Full-width band padding, and the page column every band shares, so the
    logo, the headline and each section start on the same left edge. */
const band = "py-14 sm:py-20";
const column = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8";
const belowHeading = "mt-8 sm:mt-10";

/** Plain white card with a hairline border. */
const card = "rounded-xl border border-stone-200 bg-white p-6 sm:p-7";

export default function WholesalePage() {
  return (
    <InterestFormProvider>
      <LandingHeader heroButtonId={HERO_BUTTON_ID} />

      <main className="flex-1">
        {/* ── Hero (RAN-44, RAN-45, RAN-46). A light grey band: the text on
            the left, the photo on the right running to the band's edge. On a
            phone the text comes first and the photo follows. Nothing to
            click but the button.

            --hero-h1 is the headline size (56px on a 1366 laptop, 64px from
            about 1560 wide). --hero-text is the text column: exactly as wide
            as the longer headline phrase, so the photo gets all the rest. ── */}
        <section
          style={{ "--hero-ems": HEADLINE_EMS.toFixed(2) } as React.CSSProperties}
          className="relative overflow-hidden bg-stone-100 [--hero-h1:clamp(2.5rem,4.1vw,4rem)] [--hero-text:calc(var(--hero-h1)*var(--hero-ems))]"
        >
          <div className={column}>
            <div className="pb-9 pt-9 sm:py-14 lg:w-[var(--hero-text)] lg:py-16">
              <h1 className="text-[1.875rem] max-[359px]:text-[1.75rem] font-bold leading-[1.08] tracking-tight text-accent-500 sm:text-[2.5rem] lg:text-[length:var(--hero-h1)]">
                <span className="block text-balance">{HEADLINE.lead}</span>
                <span className="block text-balance">{HEADLINE.second}</span>
              </h1>

              <p className="mt-4 max-w-[36rem] text-base leading-relaxed text-gray-700 sm:mt-5 sm:text-lg sm:leading-relaxed">
                For Amazon and Walmart sellers, hardware stores and bulk
                buyers. DeWalt, Milwaukee and more. We reach out with pricing
                within the hour, Monday to Friday, 9&nbsp;to&nbsp;6&nbsp;Eastern.
              </p>

              {/* The stats, separated by thin vertical rules. */}
              <dl className="mt-6 flex divide-x divide-stone-300 sm:mt-8">
                {STATS.map(({ figure, label }) => (
                  <div key={label} className="flex flex-col-reverse justify-end px-3.5 first:pl-0 last:pr-0 sm:px-6">
                    <dt className="mt-1 max-w-[9.5rem] text-[0.8125rem] leading-snug text-gray-600 sm:text-sm sm:leading-snug">
                      {label}
                    </dt>
                    <dd className="text-[1.375rem] font-bold leading-none tracking-tight text-accent-500 sm:text-[1.75rem]">
                      {figure}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 sm:mt-8">
                <PricingButton id={HERO_BUTTON_ID} className="w-full sm:w-auto" />
                <p className="mt-4 text-sm text-gray-700 sm:text-[0.9375rem]">
                  Six fields. We call, then email your pricing.
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 sm:text-[0.9375rem]">
                  {DISQUALIFIER}
                </p>
              </div>
            </div>
          </div>

          {/* The photo's place: to the right of the text column on a laptop,
              out to the band's right edge; under the text on a phone, edge to
              edge. Its inner edge (left on a laptop, top on a phone) fades into
              the grey in eased steps, so it sits on the band rather than in a
              frame. No overlay. */}
          <div className="relative aspect-square sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[calc(max(0px,50%-45rem)+2rem+var(--hero-text)+1.5rem)] lg:aspect-auto">
            <Image
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover ${HERO_PHOTO.crop} [mask-image:linear-gradient(to_bottom,transparent,rgb(0_0_0/0.4)_8%,rgb(0_0_0/0.85)_17%,black_25%)] lg:[mask-image:linear-gradient(to_right,transparent,rgb(0_0_0/0.4)_8%,rgb(0_0_0/0.85)_17%,black_26%)]`}
            />
          </div>
        </section>

        {/* ── 1. How it works (RAN-47). A sequence, not cards: each number is
            followed by a hairline that runs on to the next. ── */}
        <section className={`bg-white ${band}`}>
          <div className={column}>
            <SectionHeading>How it works</SectionHeading>
            <ol className={`${belowHeading} grid gap-y-9 md:grid-cols-3 md:gap-x-10`}>
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold leading-none text-brand-600 sm:text-[1.75rem]">
                      {index + 1}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-stone-300" />
                  </div>
                  <h3 className="mt-4 max-w-[22rem] text-balance text-lg font-bold leading-snug tracking-tight text-accent-500 sm:text-xl sm:leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[22rem] text-base leading-relaxed text-gray-700">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 2. Who buys from us (RAN-48). The brief's three segments, in
            its order. The brief gives what and why only for the first. ── */}
        <section className={`bg-stone-100 ${band}`}>
          <div className={column}>
            <SectionHeading>Who buys from us</SectionHeading>
            <div className={`${belowHeading} grid gap-4 md:grid-cols-3 md:gap-6`}>
              <article className={card}>
                <h3 className="text-lg font-bold tracking-tight text-accent-500 sm:text-xl">
                  Marketplace resellers
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  Amazon and Walmart sellers of power tools. They know their
                  numbers and buy by the case or pallet.
                </p>
              </article>
              <article className={card}>
                <h3 className="text-lg font-bold tracking-tight text-accent-500 sm:text-xl">
                  Independent stores
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  Independent hardware, farm and supply stores.
                </p>
                <p className="mt-3">
                  <Blank source="not in the brief, RAN-48">
                    what they reorder and why they buy from us
                  </Blank>
                </p>
              </article>
              <article className={card}>
                <h3 className="text-lg font-bold tracking-tight text-accent-500 sm:text-xl">
                  Contractors and property managers
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  Contractors, builders, property managers and facilities teams.
                </p>
                <p className="mt-3">
                  <Blank source="not in the brief, RAN-48">
                    what they reorder and why they buy from us
                  </Blank>
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── 3. Brands and categories (RAN-49). A quiet strip, not a wall:
            six brands, each on its own plain white tile at one shared visual
            height, then the categories as pills. One row of six on a wide
            screen, three by two on a tablet, two by three on a phone. ── */}
        <section className={`bg-white ${band}`}>
          <div className={column}>
            <SectionHeading>Brands and categories</SectionHeading>
            <ul
              aria-label="Brands"
              className={`${belowHeading} grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6`}
            >
              {BRANDS.map(({ name, logo }) => (
                <li key={name} className="@container">
                  <div
                    style={{ "--logo-h": LOGO_HEIGHT } as React.CSSProperties}
                    className="flex h-28 items-center justify-center rounded-xl border border-stone-200 bg-white"
                  >
                    {logo ? (
                      // unoptimized: the file is served exactly as supplied.
                      <Image
                        src={logo.src}
                        alt={name}
                        width={logo.width}
                        height={logo.height}
                        unoptimized
                        style={{ height: `calc(var(--logo-h) / ${logo.mark})`, width: "auto" }}
                        className="max-w-none"
                      />
                    ) : (
                      <span className="text-2xl font-bold tracking-tight text-accent-500">
                        {name}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <ul aria-label="Categories" className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
              {CATEGORIES.map((category) => (
                <li
                  key={category}
                  className="rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium text-accent-500 sm:text-[0.9375rem]"
                >
                  {category}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Blank prefix="">
                Provisional. Daniel to confirm which logos we&rsquo;re allowed to show (RAN-49).
              </Blank>
            </p>
          </div>
        </section>

        {/* The proof numbers now live in the hero's stats row. A testimonial
            block is left out until real customers give their sentences
            (RAN-50). Never add an invented quote. */}

        {/* ── 4. Terms and FAQ (RAN-51). Short answers, no hedging. The
            heading sits beside the list on a laptop and above it on a phone.
            The minimum-order question is out pending RAN-42. ── */}
        <section className={`bg-stone-100 ${band}`}>
          <div className={`${column} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-x-10`}>
            <SectionHeading>Terms and questions</SectionHeading>
            <dl className="mt-8 border-b border-stone-300 lg:mt-0">
              <Faq q="Who can open a wholesale account?">
                Business buyers only. A resale certificate must be on file
                before your first order.
              </Faq>
              <Faq q="How do I pay?">Deposit or prepaid, by ACH or wire.</Faq>
              <Faq q="How is freight charged?">LTL freight is quoted per order.</Faq>
              <Faq q="Can I return a wholesale order?">
                <Blank source="Daniel, RAN-51">returns on wholesale orders</Blank>
              </Faq>
              <Faq q="What happens after I send the form?">
                We call you within the hour, Monday to Friday, 9 to 6 Eastern,
                and send pricing by email. Outside those hours, you hear from
                us in under a business day.
              </Faq>
            </dl>
          </div>
        </section>

        {/* ── 5. The button again, on a modest navy band: the heading on the
            left, the button on the right. The footer below is the much
            darker accent-900, so the two separate without a rule. ── */}
        <section className="bg-accent-500 py-12 sm:py-16">
          <div className={`${column} md:flex md:items-center md:justify-between md:gap-10`}>
            <SectionHeading tone="dark">Six fields and we call you.</SectionHeading>
            <div className="mt-6 shrink-0 md:mt-0 md:text-right">
              {/* White focus ring: the default navy one would vanish here. */}
              <PricingButton className="w-full focus-visible:outline-white! sm:w-auto" />
              <p className="mt-3 text-sm font-medium text-white sm:text-[0.9375rem]">{DISQUALIFIER}</p>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </InterestFormProvider>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-stone-300 py-5">
      <dt className="text-base font-bold text-accent-500 sm:text-lg">{q}</dt>
      <dd className="mt-1.5 max-w-[42rem] text-base leading-relaxed text-gray-700">{children}</dd>
    </div>
  );
}
