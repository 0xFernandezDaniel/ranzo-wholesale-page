"use client";

import { useEffect, useState } from "react";

import { PricingButton } from "./InterestForm";
import Logo from "./Logo";

/**
 * The top of the landing page, in two parts.
 *
 * A slim navy bar with three short facts. It scrolls away with the page. A
 * phone has room for the first fact only, a tablet for two, a laptop for all
 * three; the other two are also said lower on the page.
 *
 * Under it, a white header that stays at the top: the logo and the one
 * button, no navigation (brief: "This page carries the logo, the button and a
 * legal footer"). The logo is not a link, so nothing above the fold competes
 * with the hero button. The header's copy of the button stays hidden until
 * the hero button has scrolled out of view.
 */
const FACTS = [
  { text: "Pricing within the hour, Mon\u2013Fri 9\u20135 ET", show: "" },
  { text: "Ships by the case from 15 distribution centers", show: "hidden sm:block" },
  { text: "Family-owned on Long Island since 2021", show: "hidden lg:block" },
];

export default function LandingHeader({ heroButtonId }: { heroButtonId: string }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const heroButton = document.getElementById(heroButtonId);
    if (!heroButton) return;
    const observer = new IntersectionObserver(([entry]) =>
      setShowButton(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(heroButton);
    return () => observer.disconnect();
  }, [heroButtonId]);

  return (
    <>
      <aside aria-label="At a glance" className="bg-accent-500 text-accent-100">
        <ul className="mx-auto flex h-9 max-w-[1440px] items-center justify-center px-4 text-[0.8125rem] font-medium sm:px-6 lg:justify-between lg:px-8">
          {FACTS.map(({ text, show }) => (
            <li key={text} className={`${show} whitespace-nowrap sm:px-5 sm:first:pl-0 lg:px-0`}>
              {text}
            </li>
          ))}
        </ul>
      </aside>

      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Logo className="h-9 w-auto" />
          <div
            className={`transition-opacity duration-200 ${showButton ? "opacity-100" : "invisible opacity-0"}`}
            aria-hidden={!showButton}
          >
            {/* Never wraps, and tightens under 360px so it clears the logo on
                a 320px phone. */}
            <PricingButton
              size="sm"
              className="whitespace-nowrap max-[359px]:px-3 max-[359px]:text-[0.8125rem]"
            />
          </div>
        </div>
      </header>
    </>
  );
}
