/**
 * generate-sitemap.js
 * Run: node generate-sitemap.js  (after npm run build)
 * Or merge into package.json: "postbuild": "react-snap && node generate-sitemap.js"
 */

const fs   = require("fs");
const path = require("path");

const SITE_URL = "https://www.mntpfarmfresh.com";
const today    = new Date().toISOString().split("T")[0];

const routes = [
  // Main sections (SPA hash routes — all resolve to index.html)
  { path: "/",          priority: "1.0", changefreq: "weekly"  },
  { path: "/#story",    priority: "0.9", changefreq: "monthly" },
  { path: "/#products", priority: "1.0", changefreq: "monthly" },
  { path: "/#quality",  priority: "0.8", changefreq: "monthly" },
  { path: "/#process",  priority: "0.8", changefreq: "monthly" },
  { path: "/#contact",  priority: "0.7", changefreq: "monthly" },

  // Individual product anchors (for structured data signal)
  { path: "/#products/dehydrated-ginger",       priority: "0.9", changefreq: "monthly" },
  { path: "/#products/dehydrated-green-chilli",  priority: "0.9", changefreq: "monthly" },
  { path: "/#products/dehydrated-carrot",        priority: "0.9", changefreq: "monthly" },
  { path: "/#products/dehydrated-cabbage",       priority: "0.8", changefreq: "monthly" },
  { path: "/#products/dehydrated-spinach",       priority: "0.8", changefreq: "monthly" },
  { path: "/#products/dehydrated-banana",        priority: "0.8", changefreq: "monthly" },
  { path: "/#products/dehydrated-mango",         priority: "0.9", changefreq: "monthly" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const outPath = path.join(__dirname, "build", "sitemap.xml");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml, "utf-8");
console.log(`✅  Sitemap → ${outPath}  (${routes.length} URLs)`);