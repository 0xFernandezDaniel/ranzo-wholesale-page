import type { Metadata } from "next";

import Link from "next/link";

import { ChevronRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Ranzo Hardware Trade Accounts: wholesale pricing, dedicated support, and tax-exempt purchasing for contractors, tradespeople, and business buyers.",
};

export default function WholesalePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent-500 py-10 sm:py-12">
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-stone-400">
            <Link href="https://ranzohardware.com" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-stone-300">Trade Accounts</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Trade Accounts
          </h1>
          <div className="mt-3 h-1 w-14 rounded-full bg-brand-500" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            Built for contractors, tradespeople, and businesses that buy in
            volume. Wholesale pricing, dedicated support, and flexible terms.
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* Two-column: Benefits + Who Qualifies */}
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Benefits */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">
              What You Get
            </h2>
            <div className="mt-4 space-y-0 divide-y divide-stone-200">
              {[
                "Free standard shipping on qualifying orders",
                "Volume discounts on bulk orders",
                "Tax-exempt purchasing for qualified accounts",
                "Dedicated account manager",
                "Priority customer support",
                "Access to trade-only deals",
                "Bulk order quotes and project pricing",
              ].map((benefit) => (
                <p
                  key={benefit}
                  className="flex items-center gap-3 py-3 text-base text-gray-700"
                >
                  <Check className="h-4 w-4 shrink-0 text-brand-500" />
                  {benefit}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar: Who Qualifies + Apply */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">
                Who Qualifies
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-gray-700">
                <li>Licensed contractors and tradespeople</li>
                <li>Construction and remodeling firms</li>
                <li>Property management and facilities</li>
                <li>Government, schools, and nonprofits</li>
                <li>Manufacturing and industrial</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">
                How to Apply
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-700">
                Fill out the contact form with your business name and a
                brief description of your purchasing needs. Applications are
                reviewed within 24 hours. Once approved, your account
                manager will set up your account and walk you through pricing and
                terms.
              </p>
              <Link
                href="https://ranzohardware.com/contact"
                className="mt-5 inline-block rounded-md bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                Apply for a Trade Account
              </Link>
            </div>
          </div>

        </div>

        {/* FAQ */}
        <div className="mt-16 border-t border-stone-200 pt-12">
          <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">
            Common Questions
          </h2>
          <dl className="mt-6 max-w-3xl space-y-6">
            {[
              {
                q: "Is there a cost to open a Trade Account?",
                a: "No. Trade Accounts are free for qualified businesses.",
              },
              {
                q: "How long does approval take?",
                a: "Most applications are reviewed within 24 hours.",
              },
              {
                q: "Do I need a minimum order size?",
                a: "No. Trade Account benefits apply to every order, with no minimum purchase requirement.",
              },
              {
                q: "Can I get a quote for a large project?",
                a: "Yes. Contact your account manager with a parts list and we'll provide custom project pricing.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="text-base font-bold text-gray-900">{q}</dt>
                <dd className="mt-1 text-base leading-relaxed text-gray-600">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </>
  );
}
