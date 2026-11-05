# Digi Tech Rakes

A responsive, dark-theme Next.js App Router landing page for a Nepal-focused digital marketing consultant. The page is built around diagnosis, customer journey clarity and a free consultation. It does not contain invented testimonials, business results, contact details or social links.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. To create a production build, run `npm run build` and then `npm run start`.

## Configuration before launch

Copy `.env.example` to `.env.local` for local use, or configure the same values in your deployment environment.

- `NEXT_PUBLIC_SITE_URL`: Replace the example origin with the canonical production origin. It is used for canonical and Open Graph metadata.
- `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`: Add real tracking IDs only. These scripts stay disabled when the values are blank. If Google Analytics is managed through GTM, leave `NEXT_PUBLIC_GA_ID` blank to avoid loading it twice. Conversion event names are defined in `lib/tracking.ts` and the landing page.

## Content to replace or complete

- Replace the proof placeholders in the Results section only with verified testimonials, case studies and work samples. Obtain permission before publishing client names or assets.
- Add the real professional photo in the hero if desired. No person is fabricated in this version.
- Add verified contact details and social media URLs to the footer when available.
- Publish actual Privacy Policy and Terms pages before linking them; the footer currently marks these as pages to add.
- The Open Graph preview graphic at `public/opengraph-image.svg` is a simple brand graphic placeholder. Replace it with a final share image if one is prepared.

## Consultation form email delivery

The server-side `/api/leads` route forwards valid form submissions to FormSubmit's AJAX endpoint for `rakesclicks@gmail.com`. It emails the submitted contact details, business type, marketing problem and preferred contact method; it does not use Google Sheets or Resend. The destination address stays in the server route.

On the first accepted submission, FormSubmit sends an activation email to `rakesclicks@gmail.com`. Open that message and confirm the form to activate delivery; FormSubmit holds submissions until confirmation. It also keeps a submission archive for 30 days, which can be reviewed through its API.

## Form contract

The server route validates these fields: `name`, `business`, `businessType`, `phone`, `problem`, and `preferredContact`, then forwards them to FormSubmit as JSON. The frontend also applies required-field and minimum-length validation. The analytics layer never sends consultation field values.

## Project structure

```text
app/                 App Router page, metadata and global styles
components/          Landing page interactions and analytics scripts
lib/                 Anonymous conversion event helper
public/              Open Graph image placeholder
```
