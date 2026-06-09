/**
 * schemas.js — JSON-LD structured data for MNTP Farm Fresh
 * Import and pass to <SEO schema={...} />
 * Test at: https://search.google.com/test/rich-results
 */

const SITE_URL   = "https://www.mntpfarmfresh.com";
const COMPANY    = "MNTP Farm Fresh";
const PHONE      = "+91-9423591545";
const EMAIL      = "contact@mntpfarmfresh.com";
const ADDRESS    = "G4 Chincholi MIDC, Solapur, Maharashtra – 413255";

// ── 1. Organization ── use on every page via siteWideSchemas ───────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "MNTP Farm Fresh is a dehydrated fruits and vegetables manufacturer based in Solapur, Maharashtra. We supply export-grade dehydrated ginger, green chilli, carrot, cabbage, spinach, banana, and mango to food manufacturers and exporters worldwide.",
  telephone: PHONE,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "G4 Chincholi MIDC",
    addressLocality: "Solapur",
    addressRegion: "Maharashtra",
    postalCode: "413255",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE,
    contactType: "sales",
    areaServed: ["IN", "US", "GB", "AE", "AU", "DE"],
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  sameAs: [
    // Add your LinkedIn / IndiaMART / Facebook URLs here when ready
  ],
};

// ── 2. LocalBusiness ── helps Google Maps / local search ──────────────────
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: COMPANY,
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "G4 Chincholi MIDC",
    addressLocality: "Solapur",
    addressRegion: "Maharashtra",
    postalCode: "413255",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.6805,   // approximate — update with exact coords
    longitude: 75.9064,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "09:00",
    closes: "18:30",
  },
  priceRange: "$$",
};

// ── 3. Product schema factory ── call for each product page ───────────────
export function productSchema({ name, description, image, sku, keywords }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.jpg`,
    sku,
    keywords,
    brand: { "@type": "Brand", name: COMPANY },
    manufacturer: { "@type": "Organization", name: COMPANY, url: SITE_URL },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: COMPANY },
    },
  };
}

// ── 4. FAQ schema ── used on homepage & quality page ──────────────────────
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What dehydrated products does MNTP Farm Fresh manufacture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MNTP Farm Fresh manufactures dehydrated ginger, dehydrated green chilli, dehydrated carrot, dehydrated cabbage, dehydrated spinach, dehydrated banana, and dehydrated mango. All products are available in flakes, powder, slices, and granule forms.",
      },
    },
    {
      "@type": "Question",
      name: "Where is MNTP Farm Fresh located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MNTP Farm Fresh is located at G4 Chincholi MIDC, Solapur, Maharashtra – 413255, India.",
      },
    },
    {
      "@type": "Question",
      name: "Do you supply dehydrated vegetables for export?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. MNTP Farm Fresh is APEDA registered and FSSAI licensed. We supply export-grade dehydrated vegetables and fruits to food manufacturers in the USA, UK, UAE, Australia, Germany, and across Asia.",
      },
    },
    {
      "@type": "Question",
      name: "What certifications does MNTP Farm Fresh hold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MNTP Farm Fresh holds FSSAI license, ISO 22000 certification, and APEDA registration. All products are third-party lab tested for moisture content, microbial count, and pesticide residue.",
      },
    },
    {
      "@type": "Question",
      name: "What is the dehydration capacity of MNTP Farm Fresh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our facility at Chincholi MIDC, Solapur has a dehydration capacity of 1.6 MT per day, using a combination of heat pump, electric, and solar drying systems.",
      },
    },
    {
      "@type": "Question",
      name: "How can I request a bulk quote for dehydrated products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `You can contact MNTP Farm Fresh by email at ${EMAIL}, by phone at ${PHONE}, or through the enquiry form on our website at ${SITE_URL}.`,
      },
    },
  ],
};

// ── 5. BreadcrumbList factory ── use on inner pages ───────────────────────
// crumbs = [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, ...]
export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

// ── 6. Pre-built product schemas for all 7 products ───────────────────────
export const PRODUCT_SCHEMAS = {
  "Dehydrated Ginger": productSchema({
    name: "Dehydrated Ginger",
    description: "Export-grade dehydrated ginger in sliced, powder, granule, and split forms. Moisture ≤10%. Sourced from Kerala and Maharashtra. Widely used in beverages, spice mixes, and health products.",
    image: "/ginger.png",
    sku: "MNTP-DG-001",
    keywords: "dehydrated ginger, dried ginger powder, ginger flakes bulk, dehydrated ginger exporter India",
  }),
  "Dehydrated Green Chilli": productSchema({
    name: "Dehydrated Green Chilli",
    description: "Sun-dried green chilli in flakes, powder, and slice forms. Moisture 6–8%. Natural heat and colour retained. Sourced from Maharashtra and Andhra Pradesh. Ideal for sauces, seasonings, and ready meals.",
    image: "/chilli.png",
    sku: "MNTP-DGC-002",
    keywords: "dehydrated green chilli, dried chilli flakes bulk, green chilli powder exporter, dehydrated chilli manufacturer India",
  }),
  "Dehydrated Carrot": productSchema({
    name: "Dehydrated Carrot",
    description: "Bright orange dehydrated carrot with retained beta-carotene. Moisture <5%. Available in flakes, powder, and slices. Sourced from Maharashtra and Rajasthan.",
    image: "/carrot.png",
    sku: "MNTP-DC-003",
    keywords: "dehydrated carrot, dried carrot flakes, carrot powder bulk, dehydrated carrot exporter India",
  }),
  "Dehydrated Cabbage": productSchema({
    name: "Dehydrated Cabbage",
    description: "Crisp dehydrated cabbage in flakes and slices. Moisture <5%. Ideal for soups, instant noodles, and dehydrated meal mixes. Sourced from Maharashtra.",
    image: null,
    sku: "MNTP-DCB-004",
    keywords: "dehydrated cabbage, dried cabbage flakes bulk, cabbage flakes manufacturer India",
  }),
  "Dehydrated Spinach": productSchema({
    name: "Dehydrated Spinach",
    description: "Rich green dehydrated spinach in flakes and powder. Moisture <5%. Ideal for nutraceuticals, health powders, and fortified food blends. Vacuum packing available.",
    image: null,
    sku: "MNTP-DS-005",
    keywords: "dehydrated spinach, dried spinach powder bulk, spinach flakes exporter India, dehydrated spinach manufacturer",
  }),
  "Dehydrated Banana": productSchema({
    name: "Dehydrated Banana",
    description: "Cream-yellow dehydrated banana in powder and slice forms. Moisture <5%. Perfect for baby food, bakery products, smoothies, and nutritional powders. Sourced from Maharashtra and Karnataka.",
    image: null,
    sku: "MNTP-DB-006",
    keywords: "dehydrated banana, banana powder bulk, dried banana slices manufacturer India",
  }),
  "Dehydrated Mango": productSchema({
    name: "Dehydrated Mango",
    description: "Golden dehydrated mango in powder and slice forms. Moisture <5%. Concentrated tropical flavour. Sourced from Maharashtra and Konkan. Used in beverages, desserts, and export food manufacturing.",
    image: null,
    sku: "MNTP-DM-007",
    keywords: "dehydrated mango, dried mango powder bulk, mango slices manufacturer India, dehydrated mango exporter",
  }),
};

// ── 7. Site-wide schemas — include on every page ──────────────────────────
export const siteWideSchemas = [organizationSchema, localBusinessSchema];