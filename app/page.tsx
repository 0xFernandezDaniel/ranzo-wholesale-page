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
 * hero with its text centred and the photo as one wide picture under the
 * button (RAN-46), a headline at a moderate size, and dark colour kept for
 * the slim top bar, text, the closing band and the footer.
 * White and very light grey bands alternate, everything lines up on one left
 * edge, and orange is the button plus the three step numbers. Storefront
 * tokens only.
 */

export const metadata: Metadata = {
  // absolute: the full tab title, so a layout's "%s | Ranzo Hardware" template
  // can never double the suffix after the port.
  title: { absolute: "Wholesale tools and hardware | Ranzo Hardware" },
  description:
    "Wholesale tools and hardware by the case or pallet. DeWalt, Milwaukee and more, for contractors, hardware stores and online resellers.",
};

const HERO_BUTTON_ID = "hero-cta";

/**
 * THE HERO PHOTO (RAN-45). public/images/wholesale-hero.jpg, a square
 * 1600x1600 JPEG under 500 KB. To swap it, replace the file or change `src`.
 *
 * It sits on the right half of the hero, inside the page column, as a
 * rounded 4:3 picture beside the text (Daniel, RAN-46, after qogita.com);
 * on a phone it follows the text. Its edges are clean: no fade. `crop` is
 * the object-position that keeps the pallets and floor in view.
 */
const HERO_PHOTO = {
  src: "/images/wholesale-hero.jpg",
  alt: "Pallets stacked with boxed DeWalt tools on a warehouse floor",
  crop: "object-[50%_62%]",
};

/**
 * The headline: Daniel's wording, word for word (RAN-44, shortened
 * 2026-11-15), as two phrases that each start their own line.
 */
const HEADLINE = ["Power tools", "at wholesale prices."];

/** The brief's numbers ("can we deliver"), as a row under the hero paragraph,
    each on a thin left rule (after qogita.com). Each label is short enough to
    stay on one line (Daniel, RAN-46). */
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

/* No line under the buttons: Daniel removed "Business buyers only. Resale
   certificate required." (RAN-46). No minimum order is stated either,
   pending RAN-42. */

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
        {/* ── Hero (RAN-44, RAN-45, RAN-46). After qogita.com (Daniel): a light
            grey band; inside the page column, the text on the left (headline,
            one paragraph, the three numbers on thin rules, the button) and
            the photo on the right half, a rounded picture. On a phone the
            text comes first and the photo follows. ── */}
        <section className="bg-stone-100">
          <div className={`${column} py-12 sm:py-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:py-20`}>
            <div className="max-w-[38rem]">
              <h1 className="text-[1.875rem] max-[359px]:text-[1.75rem] font-bold leading-[1.08] tracking-tight text-accent-500 sm:text-[2.5rem] lg:text-[clamp(2.5rem,3.6vw,3.5rem)]">
                {HEADLINE.map((line) => (
                  <span key={line} className="block text-balance">
                    {line}{" "}
                  </span>
                ))}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-gray-700 sm:mt-5 sm:text-lg sm:leading-relaxed">
                For contractors, hardware stores and online resellers. Every
                product is guaranteed authentic and new in the original
                packaging. Shipped from 15 distribution centers across the
                United States.
              </p>

              {/* The numbers: figure over label, each on a thin left rule,
                  in a row. Only under 360px wide may a label wrap. */}
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 sm:mt-7 sm:gap-x-10">
                {STATS.map(({ figure, label }) => (
                  <div key={label} className="flex flex-col-reverse border-l-2 border-accent-500 pl-3">
                    <dt className="mt-0.5 whitespace-nowrap text-[0.8125rem] leading-snug text-gray-600 max-[359px]:whitespace-normal sm:text-sm">
                      {label}
                    </dt>
                    <dd className="text-[1.375rem] font-bold leading-none tracking-tight text-accent-500 sm:text-[1.625rem]">
                      {figure}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 sm:mt-8">
                <PricingButton id={HERO_BUTTON_ID} className="w-full sm:w-auto" />
              </div>
            </div>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl lg:mt-0">
              <Image
                src={HERO_PHOTO.src}
                alt={HERO_PHOTO.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover ${HERO_PHOTO.crop}`}
              />
            </div>
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
