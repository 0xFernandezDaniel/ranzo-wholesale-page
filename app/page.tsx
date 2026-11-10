import type { Metadata } from "next";

import Image from "next/image";

import Blank from "@/components/Blank";
import HexNut from "@/components/HexNut";
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
 * The look: colour in big full-width bands, everything centred, one button
 * style. Storefront tokens only.
 */

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Brand-name tools and hardware by the case or pallet. For business buyers with a resale certificate.",
};

const HERO_BUTTON_ID = "hero-cta";

/**
 * THE HERO PHOTO SLOT (RAN-45). There is no real photo yet, and the page
 * shows no stand-in and no empty box. When the photo of real case packs or a
 * pallet arrives, put the file in public/images and set this, for example:
 *
 *   { src: "/images/hero-pallet.jpg", alt: "Cases of tools on a pallet" }
 *
 * It then appears as one wide landscape photo at the foot of the hero band,
 * under the button and the lines below it, and the headline steps down a
 * size so the top of the photo shows on the first screen. Nothing else needs
 * to change. No stock imagery of people (so not the seed image
 * public/images/hero-built-for-pros.jpg).
 */
const HERO_PHOTO = null as { src: string; alt: string } | null;

/**
 * The headline: a navy lead phrase and an orange phrase that always starts
 * its own line. Lead candidate from the brief; Daniel picks the final one in
 * RAN-44. Change the words here and the sizing below adapts, so a longer
 * headline still sets as two tidy lines on a laptop.
 */
const HEADLINE = { lead: "DeWalt by the pallet,", accent: "at wholesale prices." };

/**
 * Roughly how wide the longer phrase is, in ems of the headline type. 0.54em
 * a character is a safe estimate for this face and weight (the two headlines
 * tested measure 0.46 and 0.51). If a new headline ever breaks into a third
 * line on a laptop, raise it a little.
 */
const HEADLINE_EMS = Math.max(HEADLINE.lead.length, HEADLINE.accent.length) * 0.54;

/**
 * The four buyer questions (brief, "Above the fold") as four short facts: the
 * key fact in bold, the rest of the answer as its label.
 */
const FOUR_FACTS = [
  // What you get
  { fact: "By the case or pallet", label: "Brand-name tools and hardware." },
  // Can we deliver
  { fact: "60,000+ products", label: "2,900+ brands, 15 distribution centers in 14 states." },
  // How long
  {
    fact: "Within the hour",
    label: "We reach out with pricing, Monday to Friday, 9 to 6 Eastern.",
  },
  // How much work
  { fact: "Six fields", label: "We call, then email your pricing." },
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

const PROOF = [
  { figure: "60,000+", label: "products" },
  { figure: "2,900+", label: "brands" },
  { figure: "15", label: "distribution centers in 14 states" },
  { figure: "1 hour", label: "until we reach out, Monday to Friday, 9 to 6 Eastern" },
];

/** Who the page is not for. Sits directly under the button, both times. No
    minimum order is stated (removed pending Daniel's decision in RAN-42). */
function Disqualifier({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <p
      className={`mt-3 text-sm font-medium leading-relaxed sm:text-[0.9375rem] ${tone === "dark" ? "text-white" : "text-gray-900"}`}
    >
      Business buyers only. Resale certificate required.
    </p>
  );
}

/** One centred heading style for every section. */
function SectionHeading({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <h2
      className={`text-balance text-center text-3xl font-extrabold tracking-tight sm:text-5xl ${tone === "dark" ? "text-white" : "text-accent-500"}`}
    >
      {children}
    </h2>
  );
}

/** Full-width band padding and the centred column inside it. */
const band = "px-4 py-14 sm:px-6 sm:py-24 lg:px-8";
const column = "mx-auto max-w-6xl";
const belowHeading = "mt-8 sm:mt-12";

/** White card with a crisp border and a thin orange top edge. */
const card =
  "relative overflow-hidden rounded-xl border border-stone-300 bg-white p-6 pt-7 sm:p-8 sm:pt-9 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand-500";

export default function WholesalePage() {
  return (
    <InterestFormProvider>
      <LandingHeader heroButtonId={HERO_BUTTON_ID} />

      <main className="flex-1">
        {/* ── Hero (RAN-44, RAN-45, RAN-46). A full-width light band that owns
            the first screen: headline, four facts, the button, the
            disqualifier. Nothing to click but the button. ── */}
        <section
          className={`relative flex flex-col justify-center overflow-hidden bg-stone-100 px-4 py-8 text-center sm:px-6 sm:py-12 lg:px-8 ${
            HERO_PHOTO ? "" : "lg:min-h-[min(calc(100svh-3.5rem),56rem)]"
          }`}
        >
          {/* Two large, quiet shapes: the hex nut from the logo, mirrored,
              one at each edge and partly off-screen, framing the headline. */}
          <HexNut className="pointer-events-none absolute -left-32 -top-8 h-64 -scale-x-100 text-stone-200 opacity-70 sm:-left-40 sm:h-96 lg:-left-[26%] lg:top-1/2 lg:h-[112%] lg:-translate-y-1/2" />
          <HexNut className="pointer-events-none absolute -right-32 -top-8 h-64 text-stone-200 opacity-70 sm:-right-40 sm:h-96 lg:-right-[26%] lg:top-1/2 lg:h-[112%] lg:-translate-y-1/2" />

          <div className="relative">
            {/* Sized to sit well inside the screen, not to fill it: about 92px
                on a 1366 laptop and 115px at 1920, less on short screens, and
                never wider than the screen allows for the longer phrase
                (--headline-fit). On phones it may wrap within a phrase. */}
            <h1
              style={{ "--headline-fit": `calc((100vw - 4rem) / ${HEADLINE_EMS.toFixed(2)})` } as React.CSSProperties}
              className={`text-balance font-black leading-[0.98] tracking-[-0.035em] text-accent-500 ${
                HERO_PHOTO
                  ? "text-[length:max(1.75rem,min(calc(var(--headline-fit)_*_1.05),10svh))] lg:text-[length:min(5.6vw,10svh,6rem,var(--headline-fit))]"
                  : "text-[length:max(1.75rem,min(calc(var(--headline-fit)_*_1.05),12svh))] lg:text-[length:min(6.75vw,12svh,7.2rem,var(--headline-fit))]"
              }`}
            >
              <span className="block">{HEADLINE.lead}</span>
              <span className="block text-brand-500">{HEADLINE.accent}</span>
            </h1>

            {/* The four answers as a row of four short facts; stacked in the
                same order on a phone. */}
            <ul className="mx-auto mt-7 grid max-w-[1440px] gap-3.5 sm:mt-10 lg:mt-[min(3.5rem,6.5svh)] lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stone-300">
              {FOUR_FACTS.map(({ fact, label }) => (
                <li key={fact} className="lg:px-4">
                  <strong className="block text-lg font-extrabold leading-tight tracking-tight text-accent-500 lg:text-[length:clamp(1.0625rem,1.75vw,1.625rem)]">
                    {fact}
                  </strong>
                  <span className="mx-auto mt-0.5 block max-w-[22rem] text-[0.9375rem] leading-snug text-gray-700 lg:mt-1.5 lg:max-w-[19rem] lg:text-base lg:leading-snug">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 sm:mt-10 lg:mt-[min(3.5rem,6.5svh)]">
              <PricingButton id={HERO_BUTTON_ID} className="w-full sm:w-auto" />
              <Disqualifier />
              <p className="mt-3 text-sm text-stone-500 lg:mt-4">
                Family-owned on Long Island since 2021.
              </p>
            </div>

            {/* The photo slot. Renders nothing until HERO_PHOTO is set. */}
            {HERO_PHOTO ? (
              <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl sm:aspect-[21/9]">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </section>

        {/* ── 1. How it works (RAN-47). A sequence, not cards: three navy
            numbers joined by an orange line. One row from md; stacked with
            short vertical joins on a phone. ── */}
        <section className={`bg-white ${band}`}>
          <div className={column}>
            <SectionHeading>How it works</SectionHeading>
            <ol className={`${belowHeading} md:grid md:grid-cols-3 md:gap-x-8`}>
              {STEPS.map((step, index) => {
                const last = index === STEPS.length - 1;
                return (
                  <li key={step.title} className="relative flex flex-col items-center text-center">
                    <span className="text-6xl font-extrabold leading-none tracking-tight text-accent-500 md:text-7xl">
                      {index + 1}
                    </span>
                    {last ? null : (
                      // The join to the next number, across the column gap
                      <span
                        aria-hidden
                        className="absolute left-[calc(50%+2.75rem)] top-[2.1875rem] hidden h-0.5 w-[calc(100%-3.5rem)] rounded-full bg-brand-500 md:block"
                      />
                    )}
                    <h3 className="mt-3 max-w-xs text-balance text-xl font-extrabold leading-snug tracking-tight text-accent-500 md:mt-5 md:text-2xl md:leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-base leading-relaxed text-gray-700 md:mt-2">
                      {step.body}
                    </p>
                    {last ? null : (
                      <span aria-hidden className="my-5 h-8 w-0.5 rounded-full bg-brand-500 md:hidden" />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── 2. Who buys from us (RAN-48). The brief's three segments, in
            its order. The brief gives what and why only for the first. ── */}
        <section className={`bg-stone-100 ${band}`}>
          <div className={column}>
            <SectionHeading>Who buys from us</SectionHeading>
            <div className={`${belowHeading} grid gap-4 sm:gap-6 md:grid-cols-3`}>
              <article className={card}>
                <h3 className="text-xl font-extrabold tracking-tight text-accent-500">
                  Marketplace resellers
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">
                  Amazon and Walmart sellers of power tools. They know their
                  numbers and buy by the case or pallet.
                </p>
              </article>
              <article className={card}>
                <h3 className="text-xl font-extrabold tracking-tight text-accent-500">
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
                <h3 className="text-xl font-extrabold tracking-tight text-accent-500">
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

        {/* ── 3. Brands and categories (RAN-49). A quiet strip, not a wall.
            Logos and categories come from Daniel's allowed list; until then
            the slots are plain grey notes. ── */}
        <section className={`bg-white ${band}`}>
          <div className={`${column} text-center`}>
            <SectionHeading>Brands and categories</SectionHeading>
            <div className={`${belowHeading} mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-6`}>
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="flex h-12 items-center justify-center rounded-md border border-dashed border-stone-300 text-xs text-stone-400"
                >
                  Logo
                </div>
              ))}
            </div>
            <p className="mt-3">
              <Blank source="Daniel, RAN-49">brand logos we are allowed to show</Blank>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className="rounded-full border border-dashed border-stone-300 px-4 py-1.5 text-xs text-stone-400"
                >
                  Category
                </span>
              ))}
            </div>
            <p className="mt-3">
              <Blank source="Daniel, RAN-49">top wholesale categories</Blank>
            </p>
          </div>
        </section>

        {/* ── 4. Proof: the brief's numbers, as the page's one orange band.
            The testimonial block is left out until real customers give their
            sentences (RAN-50). Never add an invented quote here. ── */}
        <section className={`bg-brand-600 text-white ${band}`}>
          <div className="mx-auto max-w-7xl">
            <SectionHeading tone="dark">The numbers</SectionHeading>
            <dl className={`${belowHeading} grid gap-x-6 gap-y-9 text-center sm:grid-cols-2 lg:grid-cols-4`}>
              {PROOF.map(({ figure, label }) => (
                <div key={label} className="@container flex flex-col items-center">
                  <dt className="order-2 mt-2 max-w-[15rem] text-base leading-snug text-white">
                    {label}
                  </dt>
                  <dd className="order-1 text-[length:clamp(3rem,20cqw,5.5rem)] font-black leading-none tracking-tight">
                    {figure}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 5. Terms and FAQ (RAN-51). Short answers, no hedging. Five
            questions: two rows of two, then the last across both columns.
            The minimum-order question is out pending RAN-42. ── */}
        <section className={`bg-white ${band}`}>
          <div className={column}>
            <SectionHeading>Terms and questions</SectionHeading>
            <dl className={`${belowHeading} mx-auto grid max-w-5xl gap-x-12 gap-y-6 md:grid-cols-2`}>
              <Faq q="Who can open a wholesale account?">
                Business buyers only. A resale certificate must be on file
                before your first order.
              </Faq>
              <Faq q="How do I pay?">Deposit or prepaid, by ACH or wire.</Faq>
              <Faq q="How is freight charged?">LTL freight is quoted per order.</Faq>
              <Faq q="Can I return a wholesale order?">
                <Blank source="Daniel, RAN-51">returns on wholesale orders</Blank>
              </Faq>
              <Faq q="What happens after I send the form?" wide>
                We call you within the hour, Monday to Friday, 9 to 6 Eastern,
                and send pricing by email. Outside those hours, you hear from
                us in under a business day.
              </Faq>
            </dl>
          </div>
        </section>

        {/* ── 6. The button again, on a navy band ── */}
        <section className={`bg-accent-500 text-center ${band}`}>
          <div className={column}>
            <SectionHeading tone="dark">Six fields and we call you.</SectionHeading>
            <div className={belowHeading}>
              <PricingButton className="w-full sm:w-auto" />
              <Disqualifier tone="dark" />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </InterestFormProvider>
  );
}

function Faq({ q, wide = false, children }: { q: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`border-t border-stone-300 pt-5 ${wide ? "md:col-span-2" : ""}`}>
      <dt className="text-lg font-bold text-accent-500">{q}</dt>
      <dd className="mt-1.5 text-base leading-relaxed text-gray-700">{children}</dd>
    </div>
  );
}
