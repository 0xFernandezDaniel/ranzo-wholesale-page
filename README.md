# Ranzo Hardware wholesale page

A design sandbox for the wholesale (trade accounts) page of ranzohardware.com.
This repository holds only that page. When the design is final, Daniel ports
it into the storefront, where the real header, footer, catalog and forms live.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3100. Every push to `main` deploys to the preview site
(Daniel will give you the URL), usually within two minutes.

## What to edit

- `app/page.tsx`: the page. Sections, copy, layout, all yours.
- `components/`: anything you want to split out (cards, forms, galleries).
- `public/images/`: photos and graphics. Keep files under 500 KB; JPEG for
  photos, PNG or SVG for graphics.
- `app/globals.css`: add tokens or utilities below the Ranzo block.

Leave `components/SiteHeader.tsx` and `SiteFooter.tsx` alone. They are
stand-ins for the real site chrome so you can see the page in context.

## The look

Tailwind CSS v4 with the storefront's tokens already loaded:

- `brand-*`: Ranzo orange (`brand-500` is `#C85A3A`). Buttons, accents, the
  hexagon mark.
- `accent-*`: navy (`accent-500` is `#293E4A`). Dark sections, headings on
  light.
- `steel-600`: the header and footer blue-grey.
- Neutrals: Tailwind `stone` and `gray`.
- Type: Inter everywhere. Headlines `font-extrabold tracking-tight`.
- Page width `max-w-[1440px]`, gutters `px-4 sm:px-6 lg:px-8`.

The main site's components use `lucide-react` for icons; it is installed.

## Rules that come from the business

- Say nothing we cannot back up: no guarantees, no "lowest price", no
  savings percentages against other stores, no compare-at prices.
- Shipping claims must match the site: free standard shipping over $99 on
  parcel items, LTL quoted per order. Do not invent terms.
- Wholesale customers are tax exempt only with a resale certificate on file.
- No supplier names anywhere on the page.
- Forms are design only here. The real form posts into our B2B system when
  the page is ported, so design the fields you want and Daniel wires them.

## Workflow

1. Push to `main` as often as you like; the preview updates.
2. When you want a review, message Daniel with the preview URL.
3. Daniel ports the finished page into the storefront and credits you.
