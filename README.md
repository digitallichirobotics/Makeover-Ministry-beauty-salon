# Makeover Ministry Beauty Salon

A responsive premium unisex salon website built with Next.js 16, React 19, Tailwind CSS 4 and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before launching

1. Edit `SALON` at the top of `app/page.tsx` with your real phone number, email, address, and Instagram URL.
2. Replace demo Unsplash images with your licensed salon photography.
3. Replace illustrative service prices, statistics, descriptions, and experience claims with your actual information.
4. Add actual team names and photos.
5. Set `NEXT_PUBLIC_SALON_WHATSAPP` in `.env.local` for local development and in your hosting environment before building for production. Use the salon?s WhatsApp number with its country code, using digits only (no plus sign or spaces). Restart the local dev server after setting it. Customers send prefilled requests in WhatsApp, where the salon confirms availability.
6. Review privacy, terms, accessibility, and business details before production.

## Client reviews

Add approved client reviews to the list in `app/reviews.tsx`. Set `NEXT_PUBLIC_SALON_REVIEW_URL` to your public review link before building to show the Leave a Review button.

## Deploy

Push to GitHub and import into Vercel. Next.js is auto-detected.
