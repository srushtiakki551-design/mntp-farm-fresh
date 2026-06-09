import { Helmet } from "react-helmet-async";

const SITE_NAME = "MNTP Farm Fresh";
const SITE_URL = "https://www.mntpfarmfresh.com"; // update if your domain is different
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`; // create a 1200x630 banner and put it in /public

/**
 * Drop <SEO /> at the top of any page component.
 *
 * Props:
 *   title       – page-level title (appended with " | MNTP Farm Fresh")
 *   description – meta description, ~150 chars
 *   path        – URL path, e.g. "/products/dehydrated-ginger"
 *   image       – OG image path (optional, defaults to og-image.jpg)
 *   schema      – JSON-LD object or array of objects (optional)
 *   noindex     – set true on private/utility pages
 */
export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  schema = null,
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Dehydrated Fruits & Vegetables Manufacturer, Solapur`;

  const fullUrl  = `${SITE_URL}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // schema can be a single object or an array — always serialise as array
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* ── Basic ──────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ─────────────────────────────────────── */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ── Twitter Card ───────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />

      {/* ── JSON-LD Structured Data ────────────────────────── */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}