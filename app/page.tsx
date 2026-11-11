import type { Metadata } from "next";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

import Blank from "@/components/Blank";
import { InterestFormProvider, OpenFormLink, PricingButton } from "@/components/InterestForm";
import LandingFooter from "@/components/LandingFooter";
import LandingHeader from "@/components/LandingHeader";

/**
 * The wholesale landing page. One job: get a qualified wholesale buyer to
 * click the button and fill in the interest form.
 *
 * Spec: the "Wholesale page brief" in Linear, plus RAN-14, 44, 45, 46, 47,
 * 49, 51 and 52. Every claim here comes from the brief. Anything missing or
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
 * right edge, and sits under the text on a phone, where it shows whole. Its
 * edges are clean: no fade (Daniel, RAN-46). It is cropped to fill its space, and `crop`
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
 * The headline: Daniel's wording, word for word (RAN-44), as three phrases
 * that each start their own line.
 */
const HEADLINE = ["Milwaukee, DeWalt and", "2,900 other brands", "at wholesale prices."];

/**
 * How wide the hero's text column is on a laptop, in ems of the headline
 * type. The photo takes everything to the right of it, so this number sets
 * the photo's place and crop: it is kept at the width the photo was chosen
 * for. Each headline phrase needs about 0.5em a character (10.5em for the
 * longest), so all three stay on one line with room to spare.
 */
const HEADLINE_EMS = 14.5;

/** The brief's numbers ("can we deliver"), as the hero's row of stats. Each
    label is short enough to stay on one line (Daniel, RAN-46). */
const STATS = [
  { figure: "60,000+", label: "products" },
  { figure: "2,900+", label: "brands" },
  { figure: "15", label: "distribution centers" },
];

/**
 * Brand logos (RAN-49). Provisional: Daniel still has to confirm which logos
 * we are allowed to show. Order is the one Ty set. Makita is left out until
 * there is a correct file for it.
 *
 * DeWalt is the brand's own vector file, unchanged. The other three are the
 * logo on its own background colour, cropped to an even margin and saved at
 * twice the widest size it is drawn at. Nothing is redrawn, recoloured or
 * stretched: `width` and `height` are the file's own proportions.
 *
 * `show` is how wide the logo is drawn, as a share of a tile's inner width.
 * The shares balance the row by visual weight, not by height: every badge
 * covers about the same area, so a wide logo (Stanley) comes out shorter and
 * a compact one (Grip-Rite) taller, and none dominates. To add a brand, put
 * its file here and pick `show` so that show x show / (width / height)
 * comes to about 0.22. Grip-Rite sits a little under that, because its
 * badge is the tallest and has no margin of its own. DeWalt's is higher,
 * because its file has clear space around the yellow badge (the badge is
 * 93% of the file's width and 79% of its height); it also keeps its own
 * square corners, since the rounding only ever trims a file's margin.
 */
const BRANDS = [
  { name: "DeWalt", src: "/images/brands/dewalt-logo.svg", width: 957, height: 343, show: 0.92 },
  { name: "Milwaukee", src: "/images/brands/milwaukee-logo.png", width: 252, height: 129, show: 0.66 },
  { name: "Stanley", src: "/images/brands/stanley-logo.png", width: 336, height: 96, show: 0.88 },
  { name: "Grip-Rite", src: "/images/brands/grip-rite-logo.png", width: 198, height: 139, show: 0.52 },
];

/**
 * The inner width of one brand tile, worked out from the width of the grid
 * (100cqw): two tiles a row with 12px of padding on a phone, two a row with
 * 28px of padding on a tablet, four a row from a laptop up, 16px gaps.
 * Capped at 190px, where a logo reaches the full size its file was saved for.
 */
const BRAND_TILE =
  "[--tile:min(190px,calc((100cqw-1rem)/2-1.5rem-2px))] sm:[--tile:min(190px,calc((100cqw-1rem)/2-3.5rem-2px))] lg:[--tile:min(190px,calc((100cqw-3rem)/4-3.5rem-2px))]";

/** The line under the logos: Daniel's wording, word for word (RAN-14). */
const BRANDS_LINE =
  "We carry Milwaukee, DeWalt, Craftsman, Stanley, Irwin, Lenox and Bostitch, plus Makita, Bosch, Diablo, Klein and more than 2,900 other brands, across power tools, hand tools, blades and bits, tool storage, fasteners, outdoor power equipment and plumbing, electrical and paint supplies.";

/** The three steps, in Daniel's wording, which he has approved (RAN-47). */
const STEPS = [
  {
    title: "Tell us about your business",
    body: "Fill out a quick form, so we can understand your needs.",
  },
  {
    title: "We reach out within the hour to assign you an Account Manager",
    body: "Monday to Friday, 9 to 5 Eastern. Pricing follows by email.",
  },
  {
    title: "We send out wholesale promos and special offers",
    body: "On our WhatsApp deals channel.",
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
            about 1560 wide). --hero-text is the text column, HEADLINE_EMS of
            that size wide; the photo gets all the rest. ── */}
        <section
          style={{ "--hero-ems": HEADLINE_EMS.toFixed(2) } as React.CSSProperties}
          className="relative overflow-hidden bg-stone-100 [--hero-h1:clamp(2.5rem,4.1vw,4rem)] [--hero-text:calc(var(--hero-h1)*var(--hero-ems))]"
        >
          <div className={column}>
            <div className="pb-9 pt-9 sm:py-14 lg:w-[var(--hero-text)] lg:py-16">
              <h1 className="text-[1.875rem] max-[359px]:text-[1.75rem] font-bold leading-[1.08] tracking-tight text-accent-500 sm:text-[2.5rem] lg:text-[length:var(--hero-h1)]">
                {HEADLINE.map((line) => (
                  <span key={line} className="block text-balance">
                    {line}{" "}
                  </span>
                ))}
              </h1>

              <p className="mt-4 max-w-[36rem] text-base leading-relaxed text-gray-700 sm:mt-5 sm:text-lg sm:leading-relaxed">
                For contractors, hardware stores and online resellers. Every
                product is guaranteed authentic and new in the original
                packaging. Shipped from 15 distribution centers across the
                United States.
              </p>

              {/* The stats, separated by thin vertical rules. Every label
                  stays on one line, so the three figures and the three labels
                  each share a line. Only under 360px wide may a label wrap. */}
              <dl className="mt-6 flex divide-x divide-stone-300 sm:mt-8">
                {STATS.map(({ figure, label }) => (
                  <div key={label} className="flex flex-col-reverse justify-end px-3.5 first:pl-0 last:pr-0 max-[359px]:px-2.5 sm:px-6">
                    <dt className="mt-1 whitespace-nowrap text-[0.8125rem] leading-snug text-gray-600 max-[359px]:whitespace-normal sm:text-sm sm:leading-snug">
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
                <p className="mt-4 text-sm font-medium text-gray-900 sm:text-[0.9375rem]">
                  {DISQUALIFIER}
                </p>
              </div>
            </div>
          </div>

          {/* The photo's place: to the right of the text column on a laptop,
              out to the band's right edge; under the text on a phone, edge to
              edge. Clean edges, no fade and no overlay. */}
          <div className="relative aspect-square sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[calc(max(0px,50%-45rem)+2rem+var(--hero-text)+1.5rem)] lg:aspect-auto">
            <Image
              src={HERO_PHOTO.src}
              alt={HERO_PHOTO.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover ${HERO_PHOTO.crop}`}
            />
          </div>
        </section>

        {/* ── 1. How it works (RAN-47). A sequence, not cards: each number is
            followed by a hairline that runs on to the next.

            The titles differ in length, so side by side each step lends its
            three rows (number, title, text) to one shared grid: every title
            gets the height of the longest, and the three texts start on the
            same line. ── */}
        <section className={`bg-white ${band}`}>
          <div className={column}>
            <SectionHeading>How it works</SectionHeading>
            <ol className={`${belowHeading} grid gap-y-9 md:grid-cols-3 md:gap-x-10 md:gap-y-0`}>
              {STEPS.map((step, index) => (
                <li key={step.title} className="md:row-span-3 md:grid md:grid-rows-subgrid">
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

        {/* ── 2. Brands and categories (RAN-49). A quiet strip, not a wall:
            four brands, each a small rounded badge centred on a white tile
            with a hairline border, then one sentence naming the rest of the
            brands and the categories.

            One row of four from a laptop up, two by two below that. On a
            phone the tiles have less padding, so the logos have room to be
            larger. ── */}
        <section className={`bg-stone-100 ${band}`}>
          <div className={column}>
            <SectionHeading>Brands and categories</SectionHeading>
            <ul
              aria-label="Brands"
              className={`${belowHeading} @container grid grid-cols-2 gap-4 lg:grid-cols-4 ${BRAND_TILE}`}
            >
              {BRANDS.map(({ name, src, width, height, show }) => (
                <li
                  key={name}
                  className="flex h-28 items-center justify-center rounded-xl border border-stone-200 bg-white p-3 sm:h-36 sm:p-7"
                >
                  {/* unoptimized: the file is served exactly as saved. */}
                  <Image
                    src={src}
                    alt={name}
                    width={width}
                    height={height}
                    unoptimized
                    style={{ width: `calc(var(--tile) * ${show})` }}
                    className="h-auto max-w-none rounded-md"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-gray-700 sm:mt-8 sm:text-lg sm:leading-relaxed">
              {BRANDS_LINE}
            </p>
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

        {/* ── 3. FAQs (RAN-51). Daniel's questions and answers, word for
            word, in his order. Each answer stays hidden until its question is
            clicked: these are native <details>, so they open with a click, a
            tap, or Enter and Space from the keyboard, with no script. The
            heading sits beside the list on a laptop and above it on a phone.
            No returns question: wholesale orders are not returned. ── */}
        <section className={`bg-white ${band}`}>
          <div className={`${column} lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-x-10`}>
            <SectionHeading>FAQs</SectionHeading>
            <div className="mt-8 border-b border-stone-300 lg:mt-0">
              <Faq q="Who is the right fit for the wholesale program?">
                Our wholesale program is ideal for those who buy power tools,
                supplies, and equipment in large quantities to bring their unit
                cost down.
              </Faq>
              <Faq q="Where will my goods come from?">
                Your goods will be sent from one of our 15 warehouses closest
                to you. Most wholesale orders ship from Holbrook, NY, where we
                stock most of our inventory.
              </Faq>
              <Faq q="I want to place an order. How does it work?">
                <ol className="list-decimal space-y-1.5 pl-5">
                  <li>
                    Fill out the <OpenFormLink>wholesale interest form</OpenFormLink>.
                  </li>
                  <li>Receive a promo file or special offers from our sales team.</li>
                  <li>Confirm quantities and pricing, then receive an invoice.</li>
                </ol>
              </Faq>
              <Faq q="How do I pay?">Deposit or prepaid, by ACH or wire.</Faq>
              <Faq q="How is freight charged?">LTL freight is quoted per order.</Faq>
            </div>
          </div>
        </section>

        {/* ── 4. The button again, on a modest navy band: the heading on the
            left, the button on the right. The footer below is the much
            darker accent-900, so the two separate without a rule. ── */}
        <section className="bg-accent-500 py-12 sm:py-16">
          <div className={`${column} md:flex md:items-center md:justify-between md:gap-10`}>
            <SectionHeading tone="dark">A quick form and we call you.</SectionHeading>
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

/** One question. Closed until clicked; the arrow turns when it is open. */
function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group border-t border-stone-300">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-5 text-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 [&::-webkit-details-marker]:hidden">
        <h3 className="text-base font-bold sm:text-lg">{q}</h3>
        <ChevronDown
          aria-hidden
          className="h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div className="max-w-[42rem] pb-6 text-base leading-relaxed text-gray-700">{children}</div>
    </details>
  );
}
