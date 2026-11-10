"use client";

import { useEffect, useState } from "react";

import { PricingButton } from "./InterestForm";
import Logo from "./Logo";

/**
 * The landing page's own slim top bar, in the storefront header's colours
 * (steel with the white logo): the logo and the one button, no
 * navigation (brief: "This page carries the logo, the button and a legal
 * footer"). The logo is not a link, so nothing above the fold competes with
 * the hero button. The bar's copy of the button stays hidden until the hero
 * button has scrolled out of view.
 */
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
    <header className="sticky top-0 z-40 bg-steel-600">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo variant="reversed" className="h-8 w-auto" />
        <div
          className={`transition-opacity duration-200 ${showButton ? "opacity-100" : "invisible opacity-0"}`}
          aria-hidden={!showButton}
        >
          <PricingButton size="sm" />
        </div>
      </div>
    </header>
  );
}
