"use client";

import { useEffect, useState } from "react";

import { PricingButton } from "./InterestForm";
import Logo from "./Logo";

/**
 * The top of the landing page, in two parts.
 *
 * The storefront's own utility strip (Daniel, 2026-11-15: "only use the
 * original trust bar that lives on ranzohardware"): About Us, Shipping,
 * Returns and the phone number, on the storefront's steel bar, linking to
 * the storefront. It scrolls away with the page.
 *
 * Under it, a white header that stays at the top: the logo and the one
 * button, no navigation (brief: "This page carries the logo, the button and a
 * legal footer"). The logo is not a link, so nothing above the fold competes
 * with the hero button. The header's copy of the button stays hidden until
 * the hero button has scrolled out of view.
 */
const SITE = "https://ranzohardware.com";
const LINKS = [
  { href: `${SITE}/about`, label: "About Us" },
  { href: `${SITE}/shipping-delivery`, label: "Shipping" },
  { href: `${SITE}/return-policy`, label: "Returns" },
];
const PHONE = { label: "+1 (631) 946-3827", href: "tel:+16319463827" };

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
      <div className="bg-steel-600 text-white">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-start gap-4 px-4 text-xs sm:gap-6 sm:px-6 sm:text-[13px] lg:px-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a href={PHONE.href} className="font-normal text-white/60 transition-colors hover:text-white">
            {PHONE.label}
          </a>
        </div>
      </div>

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
