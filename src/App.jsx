import { useState, useEffect } from "react";

const LOGO_IMG = "/logo.png";

const PRODUCT_IMGS = {
  coriander: "/coriander.png",
  chilli: "/chilli.png",
  ginger: "/ginger.png",
  springonion: "/onion.png",
  carrot: "/carrot.png",
  tomato: "/tomato.png",
  cabbage: "/cabbage.png",
  banana: "/banana.png",
  mango: "/mango.png",
  spinach: "/spinach.png"
}

const PRODUCTS = [
  {
    name: "Dehydrated Green Chilli",
    desc: "Sun-dried green chilli retaining natural heat and colour. Used in sauces, seasonings, ready meals, and spice blends. Available in flakes, powder, and slices.",
    forms: ["Flakes", "Powder", "Slices"],
    mainImg: PRODUCT_IMGS.chilli,
    specs: { "Moisture": "6–8%", "Colour": "Natural green to olive green", "Cut Form": "Flakes / Powder / Slices", "Application": "Sauces, seasonings, ready meals", "Packaging": "LDPE liner + Carton", "Origin": "Maharashtra / AP" }
  },
  {
    name: "Dehydrated Carrot",
    desc: "Bright orange carrot with retained beta-carotene and natural sweetness. Widely used in beverages, desserts, flavouring, and health powders.",
    forms: ["Flakes", "Powder", "Slices"],
    mainImg: PRODUCT_IMGS.carrot,
    specs: { "Moisture": "<5%", "Colour": "Bright orange", "Cut Form": "Flakes / Powder / Slices", "Application": "Beverages, desserts, flavoring", "Packaging": "Poly bag + Carton", "Origin": "Maharashtra / Rajasthan" }
  },
  {
    name: "Dehydrated Cabbage",
    desc: "Crisp dehydrated cabbage ideal for soups, instant noodles, and dehydrated meal mixes. Maintains light colour and mild flavour after rehydration.",
    forms: ["Flakes", "Slices"],
    mainImg:  PRODUCT_IMGS.cabbage,
    specs: { "Moisture": "<5%", "Colour": "Creamy white to light green", "Cut Form": "Flakes / Slices", "Application": "Soups, instant noodles, dehydrated mixes", "Packaging": "Kraft + Liner", "Origin": "Maharashtra" }
  },
  {
    name: "Dehydrated Spinach",
    desc: "Rich green spinach flakes and powder retaining chlorophyll and nutrients. Ideal for nutraceuticals, health powders, and fortified food blends.",
    forms: ["Flakes", "Powder"],
    mainImg:  PRODUCT_IMGS.spinach,
    specs: { "Moisture": "<5%", "Colour": "Rich green", "Cut Form": "Flakes / Powder", "Application": "Nutraceuticals, powders, health blends", "Packaging": "Vacuum Packing Optional", "Origin": "Maharashtra" }
  },
  {
    name: "Dehydrated Banana",
    desc: "Creamy banana powder and slices made from ripe bananas. Perfect for baby food, bakery products, smoothies, and nutritional powders.",
    forms: ["Powder", "Slices"],
    mainImg:  PRODUCT_IMGS.banana,
    specs: { "Moisture": "<5%", "Colour": "Cream to light yellow", "Cut Form": "Powder / Slices", "Application": "Baby food, bakery, smoothies", "Packaging": "Poly Bag + Carton", "Origin": "Maharashtra / Karnataka" }
  },
  {
    name: "Dehydrated Mango",
    desc: "Golden mango powder and slices with concentrated tropical flavour. Used in beverages, desserts, flavouring, and export food manufacturing.",
    forms: ["Powder", "Slices"],
    mainImg:  PRODUCT_IMGS.mango,
    specs: { "Moisture": "<5%", "Colour": "Yellow to golden yellow", "Cut Form": "Powder / Slices", "Application": "Beverages, desserts, flavoring", "Packaging": "Poly Bag + Carton", "Origin": "Maharashtra / Konkan" }
  },
];

const QUALITY_STEPS = [
  { icon: "🌱", tag: "Source", title: "Farm-Level Procurement", desc: "We partner directly with verified farmers across Maharashtra. Every batch is traceable to its origin field, ensuring chemical-free practices from root to harvest.", img: "" },
  { icon: "🔬", tag: "Inspection", title: "Raw Material Testing", desc: "Incoming produce undergoes moisture content analysis, microbial screening, and pesticide residue testing before entering our facility.", img: "" },
  { icon: "⚙️", tag: "Processing", title: "Controlled Dehydration", desc: "Tunnel dryers maintain temperature within ±2°C tolerance, preserving colour, texture, and nutritional integrity.", img: "" },
  { icon: "📊", tag: "Analysis", title: "In-Process QC Checks", desc: "Every 30 minutes our lab team samples product from the line — checking moisture levels, Aw, and visual grade to prevent batch drift.", img: "" },
  { icon: "🧪", tag: "Lab", title: "Finished Product Testing", desc: "Final products are tested for moisture %, bulk density, ash content, particle size distribution, and microbial count before packing approval.", img: "" },
  { icon: "📦", tag: "Packaging", title: "Hygienic & Sealed Packaging", desc: "Food-grade poly packs, HDPE bags, and nitrogen-flushed pouches ensure shelf life of 12–24 months. Custom export packaging available.", img: "" },
];

const PROCESS_STEPS = [
  {
    tag: "Raw Material", title: "Raw Material Reception", ccp: null, ccpNum: null,
    desc: "Fresh produce is received directly from our contract farms and verified supplier network. Each incoming batch is weighed, tagged with farm origin, and held for pre-processing inspection before entering the facility.",
    details: ["Farm-Level Traceability", "Batch Tagging", "Weight & Volume Check", "Origin Documentation"],
    color: "#2d6a35"
  },
  {
    tag: "CCP 1", title: "Sorting & Grading", ccp: "Foreign Material Removal", ccpNum: 1,
    desc: "Produce is manually and mechanically sorted by size, colour, and quality. Foreign materials, damaged pieces, and substandard units are removed at this critical control point before any further processing.",
    details: ["Foreign Material Removal", "Size Grading", "Colour Sorting", "Conveyor Inspection"],
    color: "#b85450"
  },
  {
    tag: "Processing", title: "Cutting / Size Reduction", ccp: null, ccpNum: null,
    desc: "Sorted produce is cut to uniform dimensions using stainless steel cutters. Cut form — flakes, slices, or powder — is set per customer specification to ensure consistent drying and final appearance.",
    details: ["Uniform Cut Size", "SS Equipment", "Flakes / Slices / Minced", "Custom Specification"],
    color: "#d4a017"
  },
  {
    tag: "CCP 2", title: "Bubble Washing", ccp: "Surface Contaminant Removal", ccpNum: 2,
    desc: "Cut produce passes through a multi-stage bubble wash system using food-grade water. High-pressure bubbling action removes surface dust, soil, and residual contaminants from all surfaces.",
    details: ["Bubble Wash System", "Multi-Stage Rinse", "Food-Grade Water", "Surface Contaminant Removal"],
    color: "#b85450"
  },
  {
    tag: "CCP 3", title: "Ozone Treatment", ccp: "Microbial & Pesticide Load Reduction", ccpNum: 3,
    desc: "Washed produce is treated with controlled ozone dosing to reduce microbial load and residual pesticide concentration. This chemical-free treatment is a key differentiator in our food safety protocol.",
    details: ["Ozonization System", "Microbial Reduction", "Pesticide Load Reduction", "Chemical-Free Treatment"],
    color: "#b85450"
  },
  {
    tag: "CCP 4", title: "Blanching", ccp: "Microbial & Enzyme Control", ccpNum: 4,
    desc: "Produce undergoes controlled heat blanching to inactivate enzymes that cause colour and flavour degradation, and to achieve further reduction of microbial count before the drying stage.",
    details: ["Heat Blanching", "Enzyme Inactivation", "Colour Preservation", "Microbial Control"],
    color: "#d4a017"
  },
  {
    tag: "Drying", title: "Solar Drying", ccp: null, ccpNum: null,
    desc: "Pre-processed produce enters our solar drying system for initial moisture reduction. This energy-efficient first stage reduces bulk moisture before controlled mechanical drying begins.",
    details: ["Solar Dryer", "Initial Moisture Reduction", "Energy Efficient", "Natural Process"],
    color: "#4a9e55"
  },
  {
    tag: "Drying", title: "Heat Pump Drying", ccp: null, ccpNum: null,
    desc: "The heat pump dryer performs controlled dehydration at consistent temperatures, preserving colour, aroma, and nutritional content. This stage handles the bulk of moisture reduction.",
    details: ["Heat Pump System", "Controlled Dehydration", "Colour Retention", "Aroma Preservation"],
    color: "#4a9e55"
  },
  {
    tag: "CCP 5", title: "Electric Drying", ccp: "Final Moisture Adjustment", ccpNum: 5,
    desc: "The electric dryer provides precise final moisture adjustment to meet exact product specifications (typically ≤5–8%). This critical control point ensures every batch meets the target moisture level before packing.",
    details: ["Electric Dryer", "Final Moisture Adjustment", "≤5–8% Target", "Precision Control"],
    color: "#b85450"
  },
  {
    tag: "CCP 6", title: "Packaging", ccp: "Hygiene & Contamination Control", ccpNum: 6,
    desc: "Approved product is packed in our PUF panel-based, temperature-controlled, dust-free packaging area. Food-grade packaging (LDPE, poly bags, Kraft+liner, vacuum packs) is applied with full batch documentation and export labelling.",
    details: ["Dust-Free Packing Area", "Food-Grade Packaging", "Batch Documentation", "Export Labelling"],
    color: "#7b5ea7"
  },
  {
    tag: "Cold Storage", title: "Cold Storage", ccp: null, ccpNum: null,
    desc: "Finished goods are stored under controlled cold storage conditions to ensure product stability and maintain shelf life of 12–24 months. Inventory is managed on a FIFO basis with full traceability.",
    details: ["Temperature Controlled", "FIFO Management", "12–24 Month Shelf Life", "Finished Goods Stability"],
    color: "#5ba4a4"
  },
];

// Farm photos — only relevant ones (no black image DSC_4926)
const FARM_PHOTOS = [
  { src: "https://i.ibb.co/vx8YFzF7/DSC-4977.jpg", caption: "Tomato vines in full bloom", tag: "Tomato Farm" },
  { src: "https://i.ibb.co/cStyWBHd/DSC-4985.jpg", caption: "Fresh bottle gourd on the vine", tag: "Produce" },
  { src: "https://i.ibb.co/Y7dDnsF0/DSC-4949.jpg", caption: "Seedlings planted under mulch", tag: "Planting Stage" },
  { src: "https://i.ibb.co/SDs30Sdq/DSC-49117.jpg", caption: "Moringa trees in flower", tag: "Farm Diversity" },
  { src: "https://i.ibb.co/XxPjM083/DSC-4975.jpg", caption: "Trellised crop rows with drip irrigation", tag: "Our Fields" },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=Satisfy&display=swap');
  :root {
    --green-deep: #1a3a1f; --green-mid: #2d6a35; --green-fresh: #4a9e55;
    --green-light: #7dc583; --cream: #f5f0e8; --cream-dark: #ede5d0;
    --amber: #c4873a; --amber-light: #e8b86d; --brown: #5c3d1e;
    --white: #fdfaf5; --text-dark: #1a1a1a; --text-mid: #3d4a3d;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--text-dark); overflow-x: hidden; }
  .site-wrapper { min-height: 100vh; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 72px;
    background: rgba(26,58,31,0.97); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(74,158,85,0.25);
  }
  .nav-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .logo-text { display: flex; flex-direction: column; line-height: 1; }
  .logo-main { font-family: 'Arial Black', 'DM Sans', sans-serif; font-size: 17px; font-weight: 900; color: var(--white); letter-spacing: 1px; text-transform: uppercase; }
  .logo-main span { color: var(--green-light); }
  .logo-sub { font-size: 9px; color: var(--amber-light); letter-spacing: 3px; text-transform: uppercase; margin-top: 3px; }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab { padding: 8px 18px; border: none; background: transparent; color: rgba(245,240,232,0.75); font-family: 'DM Sans', sans-serif; font-size: 13.5px; letter-spacing: 0.5px; cursor: pointer; border-radius: 6px; transition: all 0.25s; position: relative; }
  .nav-tab::after { content: ''; position: absolute; bottom: 4px; left: 50%; right: 50%; height: 2px; background: var(--amber-light); border-radius: 2px; transition: all 0.25s; }
  .nav-tab:hover { color: var(--cream); }
  .nav-tab:hover::after, .nav-tab.active::after { left: 18px; right: 18px; }
  .nav-tab.active { color: var(--amber-light); background: rgba(196,135,58,0.12); }

  .page { min-height: 100vh; padding-top: 72px; animation: pageIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes pageIn { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

  /* HERO */
  .hero { position: relative; height: calc(100vh - 72px); background: var(--green-deep); display: flex; align-items: center; overflow: hidden; }
  .hero-bg-pattern { position: absolute; inset: 0; background-image: radial-gradient(ellipse 120% 80% at 70% 50%, rgba(45,106,53,0.4) 0%, transparent 70%); }
  .hero-content { position: relative; z-index: 2; padding: 0 80px; max-width: 620px; }
  .hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; background: rgba(196,135,58,0.15); border: 1px solid rgba(196,135,58,0.35); border-radius: 100px; padding: 6px 18px; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--amber-light); margin-bottom: 28px; animation: fadeSlideUp 0.7s 0.1s both; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 5.5vw, 76px); font-weight: 900; line-height: 1.05; color: var(--cream); margin-bottom: 24px; animation: fadeSlideUp 0.7s 0.2s both; }
  .hero-title em { font-style: italic; color: var(--green-light); }
  .hero-desc { font-size: 16px; line-height: 1.8; color: rgba(245,240,232,0.72); max-width: 460px; margin-bottom: 40px; animation: fadeSlideUp 0.7s 0.3s both; }
  .hero-cta { display: inline-flex; align-items: center; gap: 10px; background: var(--amber); color: var(--white); padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 500; cursor: pointer; border: none; transition: all 0.25s; animation: fadeSlideUp 0.7s 0.4s both; font-family: 'DM Sans', sans-serif; }
  .hero-cta:hover { background: var(--amber-light); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(196,135,58,0.35); }
  @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

  /* TICKER */
  .ticker { background: var(--amber); padding: 12px 0; overflow: hidden; white-space: nowrap; }
  .ticker-inner { display: inline-flex; animation: tickerScroll 20s linear infinite; }
  .ticker-item { display: inline-flex; align-items: center; gap: 16px; padding: 0 48px; font-size: 13px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--white); }
  .ticker-dot { width: 5px; height: 5px; background: rgba(255,255,255,0.6); border-radius: 50%; }
  @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* STORY */
  .story-section { padding: 100px 80px; background: var(--white); }
  .section-label { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--green-fresh); font-weight: 500; margin-bottom: 12px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(32px, 3.5vw, 52px); font-weight: 700; color: var(--green-deep); line-height: 1.2; margin-bottom: 20px; }
  .section-body { font-size: 16px; line-height: 1.85; color: var(--text-mid); max-width: 600px; }
  .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1200px; margin: 0 auto; }

  /* FARM GALLERY */
  .farm-gallery-section { padding: 0 0 80px; background: var(--white); }
  .farm-gallery-inner { max-width: 1200px; margin: 0 auto; padding: 0 80px; }
  .farm-gallery-label { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--green-fresh); font-weight: 500; margin-bottom: 12px; }
  .farm-gallery-title { font-family: 'Playfair Display', serif; font-size: clamp(26px, 3vw, 38px); font-weight: 700; color: var(--green-deep); margin-bottom: 32px; }

  /* Mosaic grid layout */
  .farm-mosaic {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 260px 260px;
    gap: 10px;
  }
  .mosaic-item { position: relative; overflow: hidden; border-radius: 12px; cursor: pointer; }
  .mosaic-item:nth-child(1) { grid-column: 1 / 6; grid-row: 1 / 2; }
  .mosaic-item:nth-child(2) { grid-column: 6 / 9; grid-row: 1 / 2; }
  .mosaic-item:nth-child(3) { grid-column: 9 / 13; grid-row: 1 / 3; }
  .mosaic-item:nth-child(4) { grid-column: 1 / 4; grid-row: 2 / 3; }
  .mosaic-item:nth-child(5) { grid-column: 4 / 9; grid-row: 2 / 3; }
  .mosaic-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
  .mosaic-item:hover img { transform: scale(1.06); }
  .mosaic-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,30,17,0.7) 0%, transparent 55%); opacity: 0; transition: opacity 0.3s; }
  .mosaic-item:hover .mosaic-overlay { opacity: 1; }
  .mosaic-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 18px; transform: translateY(8px); opacity: 0; transition: all 0.3s; }
  .mosaic-item:hover .mosaic-caption { transform: translateY(0); opacity: 1; }
  .mosaic-tag { display: inline-block; background: var(--amber); color: white; font-size: 10px; padding: 2px 10px; border-radius: 100px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 5px; }
  .mosaic-cap-text { font-size: 13px; color: rgba(245,240,232,0.9); line-height: 1.4; }

  /* FARM VIDEO */
  .farm-video-section { background: var(--green-deep); padding: 72px 80px; }
  .farm-video-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; align-items: center; }
  .farm-video-text .section-title { color: var(--cream); }
  .farm-video-text .section-label { color: var(--amber-light); }
  .farm-video-text .section-body { color: rgba(245,240,232,0.7); }
  .farm-video-wrap { border-radius: 16px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.4); position: relative; }
  .farm-video-wrap video { width: 100%; display: block; max-height: 480px; object-fit: cover; background: #000; }
  .video-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(196,135,58,0.18); border: 1px solid rgba(196,135,58,0.35); border-radius: 100px; padding: 6px 16px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--amber-light); margin-bottom: 20px; }

  /* VALUES */
  .values-strip { background: var(--green-deep); padding: 72px 80px; display: flex; gap: 0; justify-content: center; }
  .value-item { flex: 1; padding: 0 40px; border-right: 1px solid rgba(255,255,255,0.1); text-align: center; }
  .value-item:last-child { border-right: none; }
  .value-icon { font-size: 36px; margin-bottom: 16px; display: block; }
  .value-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); margin-bottom: 10px; }
  .value-desc { font-size: 13.5px; color: rgba(245,240,232,0.6); line-height: 1.7; }

  /* HOME ENQUIRY */
  .home-enquiry { background: var(--cream); padding: 80px; }
  .home-enquiry-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.3fr; gap: 64px; align-items: center; }
  .home-enquiry-form { background: var(--white); border-radius: 20px; padding: 40px; box-shadow: 0 8px 40px rgba(26,58,31,0.1); }
  .home-contact-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
  .home-ci-icon { width: 40px; height: 40px; background: rgba(26,58,31,0.08); border: 1px solid var(--cream-dark); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .home-ci-title { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--green-mid); margin-bottom: 3px; font-weight: 500; }
  .home-ci-val { font-size: 14px; color: var(--text-mid); line-height: 1.5; }

  /* PRODUCTS */
  .products-main { flex: 1; padding: 48px 64px 80px; }
  .products-main-header { margin-bottom: 36px; }
  .products-main-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--green-deep); margin-bottom: 8px; }
  .products-main-sub { font-size: 14px; color: var(--text-mid); }
  .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
  .product-card { background: var(--white); border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.3s; border: 1px solid transparent; display: flex; flex-direction: column; align-items: center; padding: 32px 24px 24px; text-align: center; }
  .product-card:hover { border-color: var(--cream-dark); box-shadow: 0 8px 32px rgba(26,58,31,0.1); transform: translateY(-4px); }
  .product-card-img-wrap { width: 180px; height: 180px; border-radius: 50%; overflow: hidden; background: #f0ede6; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; border: 3px solid #e8e2d6; flex-shrink: 0; }
  .product-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
  .product-card:hover .product-card-img { transform: scale(1.07); }
  .product-card-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: var(--green-deep); margin-bottom: 8px; }
  .product-card-forms { display: flex; flex-wrap: wrap; gap: 5px; justify-content: center; margin-bottom: 16px; }
  .product-card-form { background: var(--cream); color: var(--green-mid); font-size: 10px; padding: 3px 10px; border-radius: 100px; letter-spacing: 0.5px; }
  .product-card-btn { background: var(--green-deep); color: var(--cream); border: none; padding: 9px 22px; border-radius: 7px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px; }
  .product-card-btn:hover { background: var(--amber); }
  .products-cta-strip { background: var(--green-deep); padding: 48px 80px; text-align: center; }

  /* QUALITY */
  .quality-hero { background: var(--cream); padding: 80px 80px 0; text-align: center; }
  .quality-hero .section-title { color: var(--green-deep); }
  .quality-timeline { padding: 72px 80px; background: var(--white); position: relative; }
  .quality-timeline::before { content: ''; position: absolute; left: 50%; top: 72px; bottom: 72px; width: 2px; background: linear-gradient(to bottom, var(--green-fresh), var(--amber)); transform: translateX(-50%); }
  .qt-item { display: grid; grid-template-columns: 1fr 60px 1fr; gap: 0; margin-bottom: 56px; align-items: center; max-width: 900px; margin-left: auto; margin-right: auto; }
  .qt-item:nth-child(even) .qt-content { order: 3; }
  .qt-item:nth-child(even) .qt-empty { order: 1; }
  .qt-item:nth-child(even) .qt-dot-wrap { order: 2; }
  .qt-content { background: var(--cream); border-radius: 16px; overflow: hidden; border: 1px solid var(--cream-dark); transition: all 0.3s; }
  .qt-content:hover { border-color: var(--green-light); transform: scale(1.02); box-shadow: 0 8px 32px rgba(26,58,31,0.1); }
  .qt-content-body { padding: 18px 22px; text-align: left; }
  .qt-dot-wrap { display: flex; justify-content: center; align-items: center; }
  .qt-dot { width: 44px; height: 44px; border-radius: 50%; background: var(--green-deep); display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid var(--white); box-shadow: 0 0 0 3px var(--green-fresh); z-index: 2; position: relative; transition: transform 0.3s; }
  .qt-item:hover .qt-dot { transform: scale(1.2); }
  .qt-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--green-deep); margin-bottom: 6px; }
  .qt-desc { font-size: 13px; line-height: 1.7; color: var(--text-mid); }
  .qt-tag { display: inline-block; background: var(--green-deep); color: var(--cream); font-size: 10px; padding: 2px 10px; border-radius: 100px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
  .cert-strip { background: var(--green-deep); padding: 56px 80px; display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }
  .cert-badge { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 24px 32px; text-align: center; min-width: 160px; transition: all 0.3s; }
  .cert-badge:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); }
  .cert-icon { font-size: 32px; margin-bottom: 10px; display: block; }
  .cert-name { font-size: 14px; font-weight: 500; color: var(--cream); margin-bottom: 4px; }
  .cert-note { font-size: 11px; color: rgba(245,240,232,0.5); }

  /* PROCESS */
  .process-hero { background: linear-gradient(160deg, var(--green-deep) 0%, #0d2010 100%); padding: 80px 80px 60px; text-align: center; position: relative; overflow: hidden; }
  .process-hero .section-title { color: var(--cream); position: relative; }
  .process-hero .section-label { color: var(--amber-light); position: relative; }
  .process-hero .section-body { color: rgba(245,240,232,0.65); margin: 0 auto; text-align: center; max-width: 520px; position: relative; }
  .process-steps { padding: 80px; background: var(--cream); display: flex; flex-direction: column; }
  .process-step { display: grid; grid-template-columns: 80px 1fr; gap: 32px; padding: 48px 0; border-bottom: 1px solid var(--cream-dark); align-items: start; max-width: 900px; margin: 0 auto; width: 100%; transition: all 0.3s; }
  .process-step:last-child { border-bottom: none; }
  .process-step:hover .step-num { background: var(--amber); }
  .step-num { width: 72px; height: 72px; background: var(--green-deep); color: var(--cream); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; flex-shrink: 0; transition: all 0.3s; margin-top: 8px; }
  .step-tag { display: inline-block; background: var(--green-fresh); color: var(--white); font-size: 10px; padding: 3px 10px; border-radius: 100px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
  .step-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--green-deep); margin-bottom: 10px; }
  .step-desc { font-size: 15px; line-height: 1.8; color: var(--text-mid); margin-bottom: 14px; max-width: 580px; }
  .step-details { display: flex; flex-wrap: wrap; gap: 8px; }
  .step-detail { background: var(--white); border: 1px solid var(--cream-dark); color: var(--green-mid); font-size: 12px; padding: 4px 12px; border-radius: 100px; }

  /* CONTACT */
  .contact-page { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 72px); }
  .contact-left { background: var(--green-deep); padding: 80px 64px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
  .contact-left::before { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: rgba(74,158,85,0.1); bottom: -100px; right: -100px; }
  .contact-left::after { content: ''; position: absolute; width: 200px; height: 200px; border-radius: 50%; background: rgba(196,135,58,0.08); top: 60px; left: -60px; }
  .contact-left .section-title { color: var(--cream); position: relative; z-index: 1; }
  .contact-left .section-label { color: var(--amber-light); z-index: 1; position: relative; }
  .contact-left .section-body { color: rgba(245,240,232,0.65); z-index: 1; position: relative; max-width: 400px; }
  .contact-info { margin-top: 48px; display: flex; flex-direction: column; gap: 24px; position: relative; z-index: 1; }
  .contact-info-item { display: flex; align-items: flex-start; gap: 16px; }
  .ci-icon { width: 44px; height: 44px; background: rgba(255,255,255,0.08); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1); }
  .ci-title { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--amber-light); margin-bottom: 4px; }
  .ci-val { font-size: 15px; color: rgba(245,240,232,0.85); line-height: 1.5; }
  .contact-right { background: var(--cream); padding: 80px 64px; display: flex; flex-direction: column; justify-content: center; }
  .form-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--green-deep); margin-bottom: 32px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .form-label { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--green-mid); font-weight: 500; }
  .form-input, .form-select, .form-textarea { padding: 12px 16px; border: 1.5px solid var(--cream-dark); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; background: var(--white); color: var(--text-dark); transition: all 0.2s; outline: none; width: 100%; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--green-fresh); box-shadow: 0 0 0 3px rgba(74,158,85,0.12); }
  .form-textarea { height: 120px; resize: vertical; }
  .form-submit { background: var(--green-deep); color: var(--cream); padding: 14px 36px; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.25s; display: inline-flex; align-items: center; gap: 10px; margin-top: 8px; }
  .form-submit:hover { background: var(--green-fresh); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,58,31,0.2); }
  .submit-success { background: rgba(74,158,85,0.12); border: 1.5px solid var(--green-fresh); border-radius: 12px; padding: 20px 24px; color: var(--green-mid); font-size: 15px; display: flex; align-items: center; gap: 12px; margin-top: 16px; animation: fadeSlideUp 0.4s both; }

  /* FOOTER */
  footer { background: #0d1f10; padding: 48px 80px 28px; display: flex; flex-direction: column; gap: 32px; }
  .footer-top { display: flex; align-items: center; justify-content: space-between; }
  .footer-logo { font-family: 'Arial Black', sans-serif; font-size: 24px; font-weight: 900; color: var(--white); letter-spacing: 1px; text-transform: uppercase; }
  .footer-tagline { font-size: 13px; color: rgba(245,240,232,0.4); margin-top: 4px; }
  .footer-links { display: flex; gap: 32px; }
  .footer-link { font-size: 13.5px; color: rgba(245,240,232,0.5); cursor: pointer; transition: color 0.2s; background: none; border: none; font-family: 'DM Sans', sans-serif; }
  .footer-link:hover { color: var(--green-light); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 12px; color: rgba(245,240,232,0.3); }

  /* WHATSAPP */
  .whatsapp-float { position: fixed; bottom: 28px; right: 28px; z-index: 999; width: 56px; height: 56px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.4); cursor: pointer; border: none; transition: all 0.25s; text-decoration: none; }
  .whatsapp-float:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(37,211,102,0.55); }
  .whatsapp-float svg { width: 30px; height: 30px; }

  /* LIGHTBOX */
  .lightbox-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(5,15,7,0.92); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; animation: pageIn 0.25s both; }
  .lightbox-img { max-width: 88vw; max-height: 85vh; border-radius: 12px; object-fit: contain; box-shadow: 0 32px 80px rgba(0,0,0,0.6); }
  .lightbox-close { position: absolute; top: 24px; right: 28px; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .lightbox-close:hover { background: rgba(255,255,255,0.22); }
  .lightbox-caption { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); background: rgba(15,30,17,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 8px 20px; color: rgba(245,240,232,0.85); font-size: 14px; white-space: nowrap; }

  /* MOBILE NAV HAMBURGER */
  .nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 8px; }
  .nav-hamburger span { display: block; width: 24px; height: 2px; background: var(--cream); border-radius: 2px; transition: all 0.3s; }
  .mobile-menu { display: none; position: fixed; top: 72px; left: 0; right: 0; background: rgba(26,58,31,0.98); backdrop-filter: blur(12px); z-index: 99; flex-direction: column; padding: 12px 0 20px; border-bottom: 1px solid rgba(74,158,85,0.25); animation: fadeSlideUp 0.25s both; }
  .mobile-menu.open { display: flex; }
  .mobile-nav-tab { padding: 14px 28px; border: none; background: transparent; color: rgba(245,240,232,0.8); font-family: 'DM Sans', sans-serif; font-size: 16px; letter-spacing: 0.5px; cursor: pointer; text-align: left; transition: all 0.2s; }
  .mobile-nav-tab:hover, .mobile-nav-tab.active { color: var(--amber-light); background: rgba(196,135,58,0.1); }

  @media (max-width: 768px) {
    .nav-tabs { display: none; }
    .nav-hamburger { display: flex; }
    nav { padding: 0 20px; }
    .logo-main { font-size: 14px; }
    .logo-sub { font-size: 8px; }
    nav img { width: 36px !important; height: 36px !important; }

    .hero-content { padding: 0 24px; }
    .story-grid, .contact-page, .home-enquiry-inner, .farm-video-inner { grid-template-columns: 1fr; gap: 32px; }
    .story-section { padding: 48px 20px; }
    .process-steps, .contact-left, .contact-right, .cert-strip, .home-enquiry { padding: 40px 20px; }
    .values-strip { flex-direction: column; padding: 48px 24px; gap: 32px; }
    .value-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 0 0 32px; }
    .value-item:last-child { border-bottom: none; padding-bottom: 0; }
    .farm-gallery-inner { padding: 0 16px; }
    .farm-gallery-section { padding: 0 0 48px; }
    .farm-video-section { padding: 40px 20px; }
    .products-hero, .process-hero, .quality-hero { padding: 48px 20px 32px; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 36px 20px 20px; }
    .footer-top { flex-direction: column; gap: 16px; text-align: center; }
    .footer-links { flex-wrap: wrap; justify-content: center; gap: 12px; }

    /* Products — single column, full width card, image not cut */
    .products-grid { grid-template-columns: 1fr; gap: 12px; max-width: 100%; margin: 0; }
    .products-main { padding: 24px 16px 60px; }
    .product-card { flex-direction: row; align-items: center; padding: 16px; text-align: left; gap: 14px; min-width: 0; overflow: hidden; }
    .product-card-img-wrap { width: 88px; height: 88px; min-width: 88px; flex-shrink: 0; margin-bottom: 0; }
    .product-card-content { flex: 1; min-width: 0; overflow: hidden; }
    .product-card-name { font-size: 15px; margin-bottom: 5px; white-space: normal; }
    .product-card-forms { justify-content: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 4px; max-width: 100%; overflow: hidden; }
    .product-card-form { font-size: 10px; padding: 2px 8px; white-space: nowrap; }
    .product-card-btn { font-size: 11px; padding: 7px 14px; width: auto; }

    .home-enquiry-form { padding: 24px 20px; }
    .quality-timeline { padding: 48px 20px; }
    .quality-timeline::before { left: 20px; }
    .qt-item { grid-template-columns: 24px 1fr; gap: 12px; margin-bottom: 36px; }
    .qt-empty { display: none; }
    .qt-dot-wrap { grid-column: 1; justify-content: flex-start; }
    .qt-dot { width: 36px; height: 36px; font-size: 16px; }
    .qt-content { grid-column: 2; }
    .cert-strip { padding: 40px 20px; gap: 16px; }

    /* Farm gallery — uniform 2-col grid, captions always visible */
    .farm-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 160px 160px 200px; gap: 8px; }
    .mosaic-item:nth-child(1) { grid-column: 1 / 2; grid-row: 1 / 2; }
    .mosaic-item:nth-child(2) { grid-column: 2 / 3; grid-row: 1 / 2; }
    .mosaic-item:nth-child(3) { grid-column: 1 / 2; grid-row: 2 / 3; }
    .mosaic-item:nth-child(4) { grid-column: 2 / 3; grid-row: 2 / 3; }
    .mosaic-item:nth-child(5) { grid-column: 1 / 3; grid-row: 3 / 4; }
    .mosaic-overlay { opacity: 1; }
    .mosaic-caption { opacity: 1; transform: translateY(0); padding: 10px 12px; }
    .mosaic-tag { font-size: 9px; padding: 2px 8px; }
    .mosaic-cap-text { font-size: 11px; }

    .process-steps { padding: 40px 20px; }
    .process-step { grid-template-columns: 52px 1fr; gap: 16px; padding: 28px 0; }
    .step-num { width: 48px; height: 48px; font-size: 20px; }
    .step-title { font-size: 18px; }
    .process-hero { padding: 48px 20px 32px; }
    .facility-grid { grid-template-columns: 1fr !important; }
    .plant-stats-grid { grid-template-columns: 1fr !important; }
    .process-banner { padding: 20px 16px !important; flex-direction: column !important; gap: 16px !important; }
    .process-banner > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.3); padding: 0 0 16px !important; }
    .process-banner > div:last-child { border-bottom: none; padding-bottom: 0 !important; }
    .facility-section { padding: 40px 16px !important; }
    .ccp-legend { padding: 32px 16px 0 !important; }
    .process-flow { padding: 24px 16px 60px !important; }

    .products-cta-strip { padding: 40px 20px; }
    .whatsapp-float { bottom: 16px; right: 16px; width: 48px; height: 48px; }
  }

  @media (min-width: 769px) and (max-width: 900px) {
    nav { padding: 0 24px; }
    .nav-tabs { display: none; }
    .nav-hamburger { display: flex; }
    .story-grid, .contact-page, .home-enquiry-inner, .farm-video-inner { grid-template-columns: 1fr; gap: 40px; }
    .story-section, .process-steps, .contact-left, .contact-right, .cert-strip, .values-strip, .home-enquiry, .farm-video-section { padding: 48px 32px; }
    .farm-gallery-inner { padding: 0 32px; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 40px 32px 20px; }
    .footer-top { flex-direction: column; gap: 16px; text-align: center; }
    .footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
    .products-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .products-main { padding: 32px; }
    .home-enquiry-form { padding: 28px; }
    .quality-timeline::before { left: 30px; }
    .qt-item { grid-template-columns: 30px 1fr; }
    .qt-empty { display: none; }
    .qt-dot-wrap { grid-column: 1; justify-content: flex-start; }
    .qt-content { grid-column: 2; }
    .farm-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px 200px; }
    .mosaic-item:nth-child(1) { grid-column: 1 / 2; grid-row: 1 / 2; }
    .mosaic-item:nth-child(2) { grid-column: 2 / 3; grid-row: 1 / 2; }
    .mosaic-item:nth-child(3) { grid-column: 1 / 2; grid-row: 2 / 3; }
    .mosaic-item:nth-child(4) { grid-column: 2 / 3; grid-row: 2 / 3; }
    .mosaic-item:nth-child(5) { grid-column: 1 / 3; grid-row: 3 / 4; }
  }
`;

function EnquiryForm({ onSubmit, submitted, formData, setFormData }) {
  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Your Name *</label>
          <input className="form-input" placeholder="Full name" value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Company</label>
          <input className="form-input" placeholder="Organisation" value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input className="form-input" type="email" placeholder="you@company.com" value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" placeholder="+91 ..." value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Product of Interest</label>
        <select className="form-select" value={formData.product}
          onChange={e => setFormData({ ...formData, product: e.target.value })}>
          <option value="">Select a product</option>
          {PRODUCTS.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
          <option value="Custom Blend">Custom Blend / Other</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Message / Requirements</label>
        <textarea className="form-textarea" placeholder="Describe your quantity, packing requirements, destination country..."
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })} />
      </div>
      <button className="form-submit" onClick={onSubmit}>Send Enquiry 🌿</button>
      {submitted && (
        <div className="submit-success">
          ✅ Thank you! We will respond within 24 hours.
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return ["story","products","quality","process","contact"].includes(hash) ? hash : "story";
  });
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync tab → URL hash
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace("#", "");
      if (["story","products","quality","process","contact"].includes(hash)) {
        setActiveTab(hash);
        setSelectedProduct(null);
        setMenuOpen(false);
      } else {
        setActiveTab("story");
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" });
    }
  };

  const tabs = [
    { id: "story", label: "Our Story" },
    { id: "products", label: "Products" },
    { id: "quality", label: "Quality" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact Us" },
  ];

  const goToContact = (productName) => {
    setFormData(f => ({ ...f, product: productName }));
    setActiveTab("contact");
  };

  const tickerItems = ["Dehydrated Onion","Dehydrated Garlic","Coriander Leaves","Ginger Powder","Green Chilli","Custom Blends","Export Quality","FSSAI Certified","Farm to Table","MNTP Farm Fresh"];

  return (
    <>
      <style>{style}</style>
      <div className="site-wrapper">

        <nav>
          <div className="nav-logo" onClick={() => { setActiveTab("story"); setMenuOpen(false); }}>
            <img src={LOGO_IMG} alt="MNTP Logo" style={{width: 44, height: 44, objectFit: "contain", flexShrink: 0}} />
            <div className="logo-text">
              <span className="logo-main">MNTP <span>FARM FRESH</span></span>
              <span className="logo-sub">Dehydrated · Exports</span>
            </div>
          </div>
          <div className="nav-tabs">
            {tabs.map(t => (
              <button key={t.id} className={`nav-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span style={{transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none"}} />
            <span style={{opacity: menuOpen ? 0 : 1}} />
            <span style={{transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none"}} />
          </button>
        </nav>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {tabs.map(t => (
            <button key={t.id} className={`mobile-nav-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => { setActiveTab(t.id); setMenuOpen(false); }}>{t.label}</button>
          ))}
        </div>

        {activeTab === "story" && (
          <div className="page" key="story">
            <div className="hero">
              <div className="hero-bg-pattern" />
              <div className="hero-content">
                <div className="hero-eyebrow">🌿 Rooted in Maharashtra</div>
                <h1 className="hero-title">From Farm to <em>Global Table</em></h1>
                <p className="hero-desc">
                  MNTP Farm Fresh brings the best of Indian agriculture to the world — through precision dehydration that locks in nature's flavour, colour, and nutrition.
                </p>
                <button className="hero-cta" onClick={() => setActiveTab("products")}>Explore Products →</button>
              </div>
            </div>

            <div className="ticker">
              <div className="ticker-inner">
                {tickerItems.concat(tickerItems).map((item, i) => (
                  <span className="ticker-item" key={i}>{item} <span className="ticker-dot" /></span>
                ))}
              </div>
            </div>

            <div className="story-section">
              <div className="story-grid">
                <div>
                  <div className="section-label">Who We Are</div>
                  <h2 className="section-title">A Legacy Grown from the Soil of Solapur</h2>
                  <p className="section-body">
                    MNTP Farm Fresh began with a simple belief: that India's agricultural abundance deserves world-class processing. Founded in Solapur — India's onion capital — we built our facility close to the farms we work with, reducing transit, preserving freshness, and creating direct livelihoods for local growers.
                    <br /><br />
                    Over the years, we've grown into a trusted dehydration partner for spice blenders, food manufacturers, and exporters across Asia, Europe, and the Middle East.
                  </p>
                </div>
                {/* Replace placeholder with real farm photo */}
                <div style={{borderRadius: 16, overflow: "hidden", height: 360, position: "relative", boxShadow: "0 16px 48px rgba(26,58,31,0.18)"}}>
                  <img
                    src="https://i.ibb.co/XxPjM083/DSC-4975.jpg"
                    alt="Our farm fields in Maharashtra"
                    style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}
                  />
                  <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,30,17,0.45) 0%, transparent 60%)"}} />
                  <div style={{position:"absolute", bottom:20, left:20}}>
                    <span style={{background:"rgba(196,135,58,0.9)", color:"white", fontSize:11, padding:"4px 14px", borderRadius:100, letterSpacing:1, textTransform:"uppercase"}}>Our Fields · Solapur</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── FARM PHOTO GALLERY ── */}
            <div className="farm-gallery-section">
              <div className="farm-gallery-inner">
                <div className="farm-gallery-label">Straight from the Source</div>
                <h2 className="farm-gallery-title">Life on the Farm</h2>
                <div className="farm-mosaic">
                  {FARM_PHOTOS.map((photo, i) => (
                    <div className="mosaic-item" key={i} onClick={() => setLightboxPhoto(photo)}>
                      <img src={photo.src} alt={photo.caption} loading="lazy" />
                      <div className="mosaic-overlay" />
                      <div className="mosaic-caption">
                        <div><span className="mosaic-tag">{photo.tag}</span></div>
                        <div className="mosaic-cap-text">{photo.caption}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── FARM VIDEO ── */}
            <div className="farm-video-section">
              <div className="farm-video-inner">
                <div className="farm-video-text">
                  <div className="section-label">Behind the Scenes</div>
                  <h2 className="section-title">Watch Our Farm in Action</h2>
                  <p className="section-body">
                    From lush green fields to carefully tended produce — every crop we dehydrate begins its journey here, grown by farmers we know by name.
                  </p>
                  <div style={{marginTop: 28, display:"flex", gap:12, flexWrap:"wrap"}}>
                    <div className="video-badge">🎥 Farm footage</div>
                    <div className="video-badge">📍 Solapur, Maharashtra</div>
                  </div>
                </div>
                <div className="farm-video-wrap">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster="https://i.ibb.co/XxPjM083/DSC-4975.jpg"
                  >
                    <source src="https://res.cloudinary.com/djiomh95j/video/upload/v1779295208/WhatsApp_Video_2026-05-17_at_9.06.50_AM_mgswcp.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
              </div>
            </div>

            <div className="values-strip">
              {[
                { icon: "🌱", title: "Farm-First", desc: "We source directly and pay fairly, building long-term trust with our growing communities." },
                { icon: "🔬", title: "Science-Backed", desc: "Every drying curve and moisture target is validated by food scientists in our in-house lab." },
                { icon: "🌾", title: "Sourced from Farm", desc: "Every batch is traced from field to final product — direct procurement ensures freshness, quality, and full traceability." },
                { icon: "🌍", title: "Export-Ready", desc: "We manage FSSAI, APEDA, and phytosanitary compliance documentation so our partners can focus on their business." },
              ].map((v, i) => (
                <div className="value-item" key={i}>
                  <span className="value-icon">{v.icon}</span>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>

            <div className="home-enquiry">
              <div className="home-enquiry-inner">
                <div>
                  <div className="section-label">Get In Touch</div>
                  <h2 className="section-title">Let's Grow Together</h2>
                  <p className="section-body">Looking for bulk dehydrated supply, export partnerships, or custom product development? Send us your requirements and we'll respond within 24 hours.</p>
                  <div style={{ marginTop: 32 }}>
                    {[
                      { icon: "📍", title: "Address", val: "G4 Chincholi MIDC, Solapur, Maharashtra – 413255" },
                      { icon: "📞", title: "Phone", val: "+91 9423591545" },
                      { icon: "✉️", title: "Email", val: "contact@mntpfamfresh.com" },
                    ].map((item, i) => (
                      <div className="home-contact-item" key={i}>
                        <div className="home-ci-icon">{item.icon}</div>
                        <div>
                          <div className="home-ci-title">{item.title}</div>
                          <div className="home-ci-val">{item.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="home-enquiry-form">
                  <div className="form-title">Send an Enquiry</div>
                  <EnquiryForm onSubmit={handleSubmit} submitted={submitted} formData={formData} setFormData={setFormData} />
                </div>
              </div>
            </div>

            <footer>
              <div className="footer-top">
                <div>
                  <div className="footer-logo">MNTP <span style={{color:"var(--green-light)"}}>FARM FRESH</span></div>
                  <div className="footer-tagline">Premium Dehydrated Agricultural Products · Solapur, Maharashtra</div>
                </div>
                <div className="footer-links">
                  {tabs.map(t => <button key={t.id} className="footer-link" onClick={() => setActiveTab(t.id)}>{t.label}</button>)}
                </div>
              </div>
              <div className="footer-bottom">
                <span className="footer-copy">© 2025 MNTP Farm Fresh. All rights reserved.</span>
                <span className="footer-copy">Made with 🌿 in Solapur</span>
              </div>
            </footer>
          </div>
        )}

        {activeTab === "products" && (
          <div className="page" key="products">
            <div className="products-main" style={{padding: "48px 64px 80px"}}>
              <div className="products-main-header">
                <div className="products-main-title">Our Products</div>
                <div className="products-main-sub">100% natural, chemical-free dehydrated produce — export grade, every batch.</div>
              </div>
              <div className="products-grid">
                {PRODUCTS.map((p, i) => (
                  <div className="product-card" key={i} onClick={() => setSelectedProduct(p)} style={{cursor:"pointer"}}>
                    <div className="product-card-img-wrap">
                      {p.mainImg ? (
                        <img src={p.mainImg} alt={p.name} className="product-card-img" />
                      ) : (
                        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-mid)",fontSize:12}}>No image</div>
                      )}
                    </div>
                    <div className="product-card-content" style={{flex:1, minWidth:0, overflow:"hidden"}}>
                      <div className="product-card-name">{p.name}</div>
                      <div className="product-card-forms">
                        {p.forms.map((f, j) => <span className="product-card-form" key={j}>{f}</span>)}
                      </div>
                      <button className="product-card-btn" onClick={e => { e.stopPropagation(); setSelectedProduct(p); }}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="products-cta-strip">
              <p style={{ color: "rgba(245,240,232,0.7)", fontSize: 15, marginBottom: 20 }}>
                Need a custom blend, specific moisture grade, or private-label packaging?
              </p>
              <button className="hero-cta" onClick={() => setActiveTab("contact")}>Request a Quote →</button>
            </div>
          </div>
        )}

        {/* PRODUCT DETAIL MODAL */}
        {selectedProduct && (
          <div style={{
            position:"fixed", inset:0, zIndex:200,
            background:"rgba(15,30,17,0.72)", backdropFilter:"blur(6px)",
            display:"flex", alignItems:"flex-end", justifyContent:"center",
            padding:"0", animation:"pageIn 0.3s both"
          }} onClick={() => setSelectedProduct(null)}>
            <div style={{
              background:"var(--white)", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:820,
              maxHeight:"92vh", overflow:"hidden", display:"flex", flexDirection:"column",
              boxShadow:"0 -8px 40px rgba(0,0,0,0.35)", animation:"slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both"
            }} onClick={e => e.stopPropagation()}>

              {/* Drag handle */}
              <div style={{display:"flex", justifyContent:"center", padding:"12px 0 4px"}}>
                <div style={{width:40, height:4, borderRadius:2, background:"var(--cream-dark)"}} />
              </div>

              {/* Header — stacked on mobile */}
              <div style={{display:"flex", flexDirection:"column", position:"relative"}}>
                {/* Close btn */}
                <button onClick={() => setSelectedProduct(null)} style={{
                  position:"absolute", top:12, right:16, width:36, height:36,
                  borderRadius:"50%", background:"rgba(0,0,0,0.12)", border:"none",
                  color:"var(--white)", fontSize:20, cursor:"pointer", display:"flex",
                  alignItems:"center", justifyContent:"center", zIndex:10, lineHeight:1
                }}>×</button>

                {/* Image + title row */}
                <div style={{display:"flex", background:"var(--green-deep)", padding:"20px 20px 20px 20px", gap:16, alignItems:"center"}}>
                  <div style={{
                    width:90, height:90, borderRadius:12, overflow:"hidden",
                    background:"var(--cream)", flexShrink:0,
                    border:"2px solid rgba(255,255,255,0.15)"
                  }}>
                    {selectedProduct.mainImg
                      ? <img src={selectedProduct.mainImg} alt={selectedProduct.name} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                      : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>🌿</div>
                    }
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"var(--amber-light)", marginBottom:6}}>Product Details</div>
                    <div style={{fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700, color:"var(--cream)", lineHeight:1.2, marginBottom:10}}>{selectedProduct.name}</div>
                    <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
                      {selectedProduct.forms.map((f, i) => (
                        <span key={i} style={{background:"rgba(255,255,255,0.12)", color:"var(--cream)", fontSize:10, padding:"2px 10px", borderRadius:100, border:"1px solid rgba(255,255,255,0.15)"}}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{padding:"16px 20px 0", background:"var(--white)"}}>
                  <p style={{fontSize:13, lineHeight:1.7, color:"var(--text-mid)"}}>{selectedProduct.desc}</p>
                </div>
              </div>

              {/* Specs + CTA — scrollable */}
              <div style={{padding:"16px 20px 24px", overflowY:"auto", flex:1}}>
                <div style={{fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"var(--green-mid)", fontWeight:600, marginBottom:12}}>Technical Specifications</div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", border:"1px solid var(--cream-dark)", borderRadius:12, overflow:"hidden"}}>
                  {Object.entries(selectedProduct.specs).map(([key, val], i, arr) => (
                    <div key={i} style={{
                      padding:"12px 14px",
                      borderRight: (i % 2 !== 1) ? "1px solid var(--cream-dark)" : "none",
                      borderBottom: (i < arr.length - 2) ? "1px solid var(--cream-dark)" : "none",
                      background: i % 2 === 0 ? "var(--white)" : "#faf8f3"
                    }}>
                      <div style={{fontSize:9, letterSpacing:1, textTransform:"uppercase", color:"var(--green-mid)", marginBottom:3, fontWeight:500}}>{key}</div>
                      <div style={{fontSize:14, fontWeight:600, color:"var(--green-deep)"}}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons — stacked on mobile */}
                <div style={{display:"flex", flexDirection:"column", gap:10, marginTop:20}}>
                  <button style={{
                    background:"var(--green-deep)", color:"var(--cream)", border:"none",
                    padding:"14px 24px", borderRadius:10, fontSize:15, fontWeight:500,
                    cursor:"pointer", fontFamily:"'DM Sans', sans-serif", width:"100%"
                  }} onClick={() => { goToContact(selectedProduct.name); setSelectedProduct(null); }}>
                    🌿 Request a Quote
                  </button>
                  <a href="https://wa.me/919423591545" target="_blank" rel="noopener noreferrer" style={{
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    background:"#25D366", color:"white", padding:"14px 24px", borderRadius:10,
                    fontSize:15, fontWeight:500, textDecoration:"none", width:"100%"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.525 5.847L.057 23.982l6.31-1.653A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.018-1.382l-.36-.214-3.736.979 1-3.635-.234-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="page" key="quality">
            <div className="quality-hero">
              <div className="section-label">Standards & Certifications</div>
              <h2 className="section-title">Quality You Can Trust</h2>
              <p className="section-body" style={{ margin: "0 auto 40px", color: "var(--text-mid)", textAlign: "center", maxWidth: 520 }}>
                From soil to shipment, every step is governed by documented protocols and third-party verified standards.
              </p>
            </div>
            <div className="quality-timeline">
              {QUALITY_STEPS.map((s, i) => (
                <div className="qt-item" key={i}>
                  <div className="qt-content">
                    <div className="qt-content-body">
                      <span className="qt-tag">{s.tag}</span>
                      <div className="qt-title">{s.title}</div>
                      <div className="qt-desc">{s.desc}</div>
                    </div>
                  </div>
                  <div className="qt-dot-wrap"><div className="qt-dot">{s.icon}</div></div>
                  <div className="qt-empty" />
                </div>
              ))}
            </div>
            <div className="cert-strip">
              {[
                { icon: "🏅", name: "FSSAI Licensed", note: "Food Safety & Standards" },
                { icon: "🌐", name: "ISO 22000", note: "Food Management Systems" },
                { icon: "🌿", name: "APEDA Registered", note: "Agri Exports India" },
                { icon: "🔬", name: "Lab Tested", note: "3rd Party Verified" },
                { icon: "📋", name: "Phytosanitary", note: "Export Documentation" },
              ].map((c, i) => (
                <div className="cert-badge" key={i}>
                  <span className="cert-icon">{c.icon}</span>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-note">{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "process" && (
          <div className="page" key="process">
            {/* Hero */}
            <div className="process-hero">
              <div className="section-label">How We Work</div>
              <h2 className="section-title">Process Flow & Critical Control Points</h2>
              <p className="section-body">
                An 11-stage HACCP-aligned process that transforms fresh farm produce into export-grade dehydrated ingredients — with 6 Critical Control Points ensuring food safety at every step.
              </p>
            </div>

            {/* Plant stats banner */}
            <div className="process-banner" style={{background:"var(--amber)", padding:"28px 80px", display:"flex", gap:0, justifyContent:"center", flexWrap:"wrap"}}>
              {[
                { val: "1.6 MT/day", label: "Dehydration Capacity" },
                { val: "Ozonization + Blanching", label: "Microbial Control System" },
                { val: "Heat Pump + Electric + Solar", label: "Drying System" },
              ].map((s, i) => (
                <div key={i} style={{flex:1, minWidth:200, textAlign:"center", padding:"0 24px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.3)" : "none"}}>
                  <div style={{fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, color:"white", marginBottom:4}}>{s.val}</div>
                  <div style={{fontSize:12, letterSpacing:1, textTransform:"uppercase", color:"rgba(255,255,255,0.8)"}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Facility images from PDF */}
            <div className="facility-section" style={{background:"var(--cream)", padding:"64px 80px"}}>
              <div style={{maxWidth:1100, margin:"0 auto"}}>
                <div className="section-label">Our Facility</div>
                <h3 className="section-title" style={{marginBottom:8}}>Salient Features</h3>
                <p style={{fontSize:15, color:"var(--text-mid)", marginBottom:32, lineHeight:1.7}}>MNTP FarmFresh Pvt. Ltd. is a dehydrated food ingredient manufacturer built on an integrated farm-to-processing model. We deliver consistent, export-grade products with controlled processing, scalable capacity, and specification-driven supply.</p>

                {/* Aerial plant photo */}
                <div style={{borderRadius:14, overflow:"hidden", boxShadow:"0 8px 32px rgba(26,58,31,0.15)", marginBottom:24, position:"relative"}}>
                  <img src="https://i.ibb.co/FLMf8Ybv/Screenshot-2026-05-28-164049.png" alt="MNTP FarmFresh plant aerial view"
                    style={{width:"100%", height:"auto", display:"block"}} />
                  <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,30,17,0.6) 0%, transparent 50%)"}} />
                  <div style={{position:"absolute", bottom:20, left:24}}>
                    <span style={{background:"rgba(196,135,58,0.9)", color:"white", fontSize:11, padding:"5px 16px", borderRadius:100, letterSpacing:1, textTransform:"uppercase"}}>Our Plant · Chincholi MIDC, Solapur</span>
                  </div>
                </div>
                <div className="facility-grid" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
                  <div style={{borderRadius:14, overflow:"hidden", boxShadow:"0 8px 32px rgba(26,58,31,0.12)"}}>
                    <img src="https://i.ibb.co/r25TdfrP/Screenshot-2026-05-28-164102.png" alt="Processing line"
                      style={{width:"100%", height:240, objectFit:"cover", display:"block"}} />
                    <div style={{padding:"16px 20px", background:"white"}}>
                      <div style={{fontSize:13, fontWeight:600, color:"var(--green-deep)", marginBottom:4}}>Sorting, Cutting & Washing Line</div>
                      <div style={{fontSize:12, color:"var(--text-mid)", lineHeight:1.6}}>Equipped with sorting, cutting, washing, blanching and handling systems ensuring pesticide free, heavy metal free and dust free finished product.</div>
                    </div>
                  </div>
                  <div style={{borderRadius:14, overflow:"hidden", boxShadow:"0 8px 32px rgba(26,58,31,0.12)"}}>
                    <img src="https://i.ibb.co/Y4xFpjyt/Screenshot-2026-05-28-164119.png" alt="PUF panel processing area"
                      style={{width:"100%", height:240, objectFit:"cover", display:"block"}} />
                    <div style={{padding:"16px 20px", background:"white"}}>
                      <div style={{fontSize:13, fontWeight:600, color:"var(--green-deep)", marginBottom:4}}>PUF Panel Processing Area</div>
                      <div style={{fontSize:12, color:"var(--text-mid)", lineHeight:1.6}}>Temperature-controlled, dust-free processing area built with PUF panel construction for hygienic food manufacturing environments.</div>
                    </div>
                  </div>
                </div>

                {/* Plant stats */}
                <div className="plant-stats-grid" style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:24}}>
                  {[
                    { icon:"⚙️", val:"1.6 MT/day", label:"Dehydration Capacity" },
                    { icon:"🧪", val:"Ozonization + Blanching", label:"Microbial Control System" },
                    { icon:"☀️", val:"Heat Pump + Electric + Solar", label:"Drying Systems" },
                  ].map((s,i) => (
                    <div key={i} style={{background:"white", borderRadius:12, padding:"20px 16px", textAlign:"center", border:"1px solid var(--cream-dark)", boxShadow:"0 2px 8px rgba(26,58,31,0.06)"}}>
                      <div style={{fontSize:28, marginBottom:8}}>{s.icon}</div>
                      <div style={{fontFamily:"'Playfair Display', serif", fontSize:15, fontWeight:700, color:"var(--green-deep)", marginBottom:4}}>{s.val}</div>
                      <div style={{fontSize:11, color:"var(--text-mid)", letterSpacing:0.5, textTransform:"uppercase"}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CCP Legend */}
            <div className="ccp-legend" style={{background:"var(--white)", padding:"48px 80px 0"}}>
              <div style={{maxWidth:900, margin:"0 auto"}}>
                <div className="section-label" style={{textAlign:"center", marginBottom:16}}>Colour Legend</div>
                <div style={{display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:8}}>
                  {[
                    { color:"#2d6a35", label:"Raw Material" },
                    { color:"#b85450", label:"Critical Control Point (CCP)" },
                    { color:"#d4a017", label:"Post Harvest Processing" },
                    { color:"#4a9e55", label:"Drying / Processing" },
                    { color:"#7b5ea7", label:"Packaging" },
                    { color:"#5ba4a4", label:"Cold Storage" },
                  ].map((l, i) => (
                    <div key={i} style={{display:"flex", alignItems:"center", gap:8}}>
                      <div style={{width:14, height:14, borderRadius:3, background:l.color, flexShrink:0}} />
                      <span style={{fontSize:12, color:"var(--text-mid)"}}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process flow steps */}
            <div className="process-flow" style={{background:"var(--white)", padding:"32px 80px 80px"}}>
              <div style={{maxWidth:900, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:0}}>
                {PROCESS_STEPS.map((s, i) => (
                  <div key={i} style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {/* Step box */}
                    <div style={{
                      width:"100%", maxWidth:620,
                      background:s.color, borderRadius:12,
                      padding:"18px 24px", position:"relative",
                      boxShadow:"0 4px 16px rgba(0,0,0,0.12)",
                      transition:"transform 0.2s",
                    }}>
                      <div style={{display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12}}>
                        <div style={{flex:1}}>
                          {s.ccpNum && (
                            <div style={{display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,0,0,0.2)", borderRadius:100, padding:"2px 10px", marginBottom:8}}>
                              <span style={{fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.95)", letterSpacing:1.5, textTransform:"uppercase"}}>CCP {s.ccpNum}</span>
                            </div>
                          )}
                          <div style={{fontSize:16, fontWeight:700, color:"white", marginBottom: s.ccp ? 4 : 0, fontFamily:"'Playfair Display', serif"}}>{s.title}</div>
                          {s.ccp && <div style={{fontSize:12, color:"rgba(255,255,255,0.8)", fontStyle:"italic"}}>{s.ccp}</div>}
                        </div>
                        <div style={{background:"rgba(255,255,255,0.15)", borderRadius:8, padding:"6px 12px", flexShrink:0}}>
                          <div style={{fontSize:10, color:"rgba(255,255,255,0.7)", letterSpacing:1, textTransform:"uppercase"}}>{s.tag}</div>
                        </div>
                      </div>
                    </div>

                    {/* Expandable detail — shown below each box */}
                    <div style={{
                      width:"100%", maxWidth:580, background:"var(--cream)",
                      borderRadius:"0 0 10px 10px", padding:"14px 20px",
                      borderLeft:`3px solid ${s.color}`, marginBottom:0,
                    }}>
                      <p style={{fontSize:13, color:"var(--text-mid)", lineHeight:1.7, marginBottom:10}}>{s.desc}</p>
                      <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                        {s.details.map((d, j) => (
                          <span key={j} style={{background:"white", border:"1px solid var(--cream-dark)", color:"var(--green-mid)", fontSize:11, padding:"3px 10px", borderRadius:100}}>{d}</span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow connector (not after last) */}
                    {i < PROCESS_STEPS.length - 1 && (
                      <div style={{display:"flex", flexDirection:"column", alignItems:"center", margin:"4px 0"}}>
                        <div style={{width:2, height:20, background:"var(--cream-dark)"}} />
                        <div style={{width:0, height:0, borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderTop:`10px solid var(--cream-dark)`}} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="page" key="contact">
            <div className="contact-page">
              <div className="contact-left">
                <div className="section-label">Get In Touch</div>
                <h2 className="section-title">Let's Grow Together</h2>
                <p className="section-body">Whether you're looking for bulk dehydrated supply, export partnerships, or custom product development — our team is ready to help.</p>
                <div className="contact-info">
                  {[
                    { icon: "📍", title: "Address", val: "G4 Chincholi MIDC, Solapur, Maharashtra – 413255" },
                    { icon: "📞", title: "Phone", val: "+91 9423591545" },
                    { icon: "✉️", title: "Email", val: "contact@mntpfamfresh.com" },
                    { icon: "🕐", title: "Working Hours", val: "Mon – Sat, 9:00 AM – 6:30 PM IST" },
                  ].map((item, i) => (
                    <div className="contact-info-item" key={i}>
                      <div className="ci-icon">{item.icon}</div>
                      <div>
                        <div className="ci-title">{item.title}</div>
                        <div className="ci-val">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="contact-right">
                <div className="form-title">Send an Enquiry</div>
                <EnquiryForm onSubmit={handleSubmit} submitted={submitted} formData={formData} setFormData={setFormData} />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX */}
      {lightboxPhoto && (
        <div className="lightbox-overlay" onClick={() => setLightboxPhoto(null)}>
          <button className="lightbox-close" onClick={() => setLightboxPhoto(null)}>×</button>
          <img className="lightbox-img" src={lightboxPhoto.src} alt={lightboxPhoto.caption} onClick={e => e.stopPropagation()} />
          <div className="lightbox-caption">{lightboxPhoto.caption}</div>
        </div>
      )}

      <a className="whatsapp-float" href="https://wa.me/919423591545" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.525 5.847L.057 23.982l6.31-1.653A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.018-1.382l-.36-.214-3.736.979 1-3.635-.234-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
      </a>
    </>
  );
}
