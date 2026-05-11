import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=Satisfy&display=swap');

  :root {
    --green-deep: #1a3a1f;
    --green-mid: #2d6a35;
    --green-fresh: #4a9e55;
    --green-light: #7dc583;
    --cream: #f5f0e8;
    --cream-dark: #ede5d0;
    --amber: #c4873a;
    --amber-light: #e8b86d;
    --brown: #5c3d1e;
    --white: #fdfaf5;
    --text-dark: #1a1a1a;
    --text-mid: #3d4a3d;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  .site-wrapper {
    min-height: 100vh;
  }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 72px;
    background: rgba(26,58,31,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(74,158,85,0.25);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .logo-leaf {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--green-fresh), var(--green-light));
    border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    animation: leafSway 3s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes leafSway {
    0%,100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .logo-main {
    font-family: 'Satisfy', cursive;
    font-size: 22px;
    color: var(--green-light);
    letter-spacing: 0.5px;
  }

  .logo-sub {
    font-size: 9px;
    color: var(--amber-light);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .nav-tabs {
    display: flex;
    gap: 4px;
  }

  .nav-tab {
    padding: 8px 18px;
    border: none;
    background: transparent;
    color: rgba(245,240,232,0.75);
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    letter-spacing: 0.5px;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.25s;
    position: relative;
  }

  .nav-tab::after {
    content: '';
    position: absolute;
    bottom: 4px; left: 50%; right: 50%;
    height: 2px;
    background: var(--amber-light);
    border-radius: 2px;
    transition: all 0.25s;
  }

  .nav-tab:hover { color: var(--cream); }
  .nav-tab:hover::after { left: 18px; right: 18px; }

  .nav-tab.active {
    color: var(--amber-light);
    background: rgba(196,135,58,0.12);
  }

  .nav-tab.active::after { left: 18px; right: 18px; }

  /* ── PAGE ── */
  .page {
    min-height: 100vh;
    padding-top: 72px;
    animation: pageIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes pageIn {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── HERO (Story) ── */
  .hero {
    position: relative;
    height: calc(100vh - 72px);
    background: var(--green-deep);
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-bg-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(ellipse 120% 80% at 70% 50%, rgba(45,106,53,0.4) 0%, transparent 70%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5Z' fill='rgba(74,158,85,0.06)'/%3E%3Cpath d='M30 35 Q38 45 30 55 Q22 45 30 35Z' fill='rgba(74,158,85,0.04)'/%3E%3C/svg%3E");
    background-size: auto, 60px 60px;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 0 80px;
    max-width: 700px;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(196,135,58,0.15);
    border: 1px solid rgba(196,135,58,0.35);
    border-radius: 100px;
    padding: 6px 18px;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--amber-light);
    margin-bottom: 28px;
    animation: fadeSlideUp 0.7s 0.1s both;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 6vw, 82px);
    font-weight: 900;
    line-height: 1.05;
    color: var(--cream);
    margin-bottom: 24px;
    animation: fadeSlideUp 0.7s 0.2s both;
  }

  .hero-title em {
    font-style: italic;
    color: var(--green-light);
  }

  .hero-desc {
    font-size: 17px;
    line-height: 1.8;
    color: rgba(245,240,232,0.72);
    max-width: 480px;
    margin-bottom: 40px;
    animation: fadeSlideUp 0.7s 0.3s both;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--amber);
    color: var(--white);
    padding: 14px 32px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.25s;
    animation: fadeSlideUp 0.7s 0.4s both;
  }

  .hero-cta:hover {
    background: var(--amber-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(196,135,58,0.35);
  }

  .hero-float-leaves {
    position: absolute;
    right: 80px; top: 50%;
    transform: translateY(-50%);
    width: 380px; height: 380px;
  }

  .float-leaf {
    position: absolute;
    border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%;
    opacity: 0.15;
  }

  .float-leaf:nth-child(1) {
    width: 220px; height: 280px;
    background: var(--green-fresh);
    top: 0; left: 80px;
    animation: floatLeaf1 6s ease-in-out infinite;
  }

  .float-leaf:nth-child(2) {
    width: 160px; height: 200px;
    background: var(--green-light);
    bottom: 40px; left: 0;
    animation: floatLeaf2 7s ease-in-out infinite;
  }

  .float-leaf:nth-child(3) {
    width: 120px; height: 150px;
    background: var(--amber);
    bottom: 20px; right: 20px;
    opacity: 0.12;
    animation: floatLeaf1 5s 1s ease-in-out infinite;
  }

  @keyframes floatLeaf1 {
    0%,100% { transform: rotate(-10deg) translateY(0); }
    50% { transform: rotate(5deg) translateY(-20px); }
  }

  @keyframes floatLeaf2 {
    0%,100% { transform: rotate(8deg) translateY(0); }
    50% { transform: rotate(-8deg) translateY(-15px); }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── STORY SECTIONS ── */
  .story-section {
    padding: 100px 80px;
    background: var(--white);
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--green-fresh);
    font-weight: 500;
    margin-bottom: 12px;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 3.5vw, 52px);
    font-weight: 700;
    color: var(--green-deep);
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .section-body {
    font-size: 16px;
    line-height: 1.85;
    color: var(--text-mid);
    max-width: 600px;
  }

  .story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .story-visual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .story-card {
    background: var(--green-deep);
    border-radius: 16px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform 0.3s;
  }

  .story-card:hover { transform: translateY(-4px); }

  .story-card:nth-child(2) { margin-top: 32px; background: var(--amber); }
  .story-card:nth-child(3) { background: var(--cream-dark); }
  .story-card:nth-child(4) { margin-top: -32px; background: var(--green-mid); }

  .story-card-num {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 900;
    color: rgba(255,255,255,0.9);
    line-height: 1;
  }

  .story-card:nth-child(3) .story-card-num { color: var(--green-deep); }

  .story-card-label {
    font-size: 12px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
  }

  .story-card:nth-child(3) .story-card-label { color: var(--text-mid); }

  .values-strip {
    background: var(--green-deep);
    padding: 72px 80px;
    display: flex;
    gap: 0;
    justify-content: center;
    overflow: hidden;
  }

  .value-item {
    flex: 1;
    padding: 0 40px;
    border-right: 1px solid rgba(255,255,255,0.1);
    text-align: center;
    animation: fadeSlideUp 0.5s both;
  }

  .value-item:last-child { border-right: none; }

  .value-icon {
    font-size: 36px;
    margin-bottom: 16px;
    display: block;
    animation: leafSway 4s ease-in-out infinite;
  }

  .value-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: var(--cream);
    margin-bottom: 10px;
  }

  .value-desc {
    font-size: 13.5px;
    color: rgba(245,240,232,0.6);
    line-height: 1.7;
  }

  /* ── PRODUCTS ── */
  .products-hero {
    background: linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%);
    padding: 80px 80px 60px;
    text-align: center;
  }

  .products-hero .section-title { color: var(--cream); margin: 0 auto 16px; }
  .products-hero .section-label { text-align: center; color: var(--amber-light); }
  .products-hero .section-body { color: rgba(245,240,232,0.7); margin: 0 auto; text-align: center; max-width: 560px; }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
    padding: 72px 80px;
    background: var(--cream);
    max-width: 100%;
  }

  .product-card {
    background: var(--white);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(26,58,31,0.08);
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    cursor: pointer;
    position: relative;
  }

  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(26,58,31,0.16);
  }

  .product-card-img {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    position: relative;
    overflow: hidden;
  }

  .product-card-img::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.85;
  }

  .card-green .product-card-img { background: linear-gradient(135deg, #e8f5e9, #c8e6c9); }
  .card-amber .product-card-img { background: linear-gradient(135deg, #fff3e0, #ffe0b2); }
  .card-brown .product-card-img { background: linear-gradient(135deg, #efebe9, #d7ccc8); }
  .card-teal .product-card-img { background: linear-gradient(135deg, #e0f2f1, #b2dfdb); }
  .card-purple .product-card-img { background: linear-gradient(135deg, #f3e5f5, #e1bee7); }
  .card-red .product-card-img { background: linear-gradient(135deg, #fce4ec, #f8bbd0); }

  .product-badge {
    position: absolute;
    top: 14px; right: 14px;
    background: var(--green-deep);
    color: var(--cream);
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 100px;
  }

  .product-card-body {
    padding: 24px;
  }

  .product-card-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--green-deep);
    margin-bottom: 8px;
  }

  .product-card-desc {
    font-size: 13.5px;
    color: var(--text-mid);
    line-height: 1.65;
    margin-bottom: 16px;
  }

  .product-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .product-tag {
    background: var(--cream-dark);
    color: var(--green-mid);
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 0.5px;
  }

  /* ── QUALITY ── */
  .quality-hero {
    background: var(--cream);
    padding: 80px 80px 0;
    text-align: center;
  }

  .quality-hero .section-title { color: var(--green-deep); }

  .quality-timeline {
    padding: 72px 80px;
    background: var(--white);
    position: relative;
  }

  .quality-timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 72px; bottom: 72px;
    width: 2px;
    background: linear-gradient(to bottom, var(--green-fresh), var(--amber));
    transform: translateX(-50%);
  }

  .qt-item {
    display: grid;
    grid-template-columns: 1fr 60px 1fr;
    gap: 0;
    margin-bottom: 56px;
    align-items: center;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .qt-item:nth-child(even) .qt-content { order: 3; text-align: left; }
  .qt-item:nth-child(even) .qt-empty { order: 1; }
  .qt-item:nth-child(even) .qt-dot-wrap { order: 2; }

  .qt-content {
    background: var(--cream);
    border-radius: 16px;
    padding: 24px 28px;
    text-align: right;
    border: 1px solid var(--cream-dark);
    transition: all 0.3s;
  }

  .qt-item:nth-child(even) .qt-content { text-align: left; }

  .qt-content:hover {
    border-color: var(--green-light);
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(26,58,31,0.1);
  }

  .qt-dot-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .qt-dot {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: var(--green-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border: 3px solid var(--white);
    box-shadow: 0 0 0 3px var(--green-fresh);
    z-index: 2;
    position: relative;
    transition: transform 0.3s;
  }

  .qt-item:hover .qt-dot { transform: scale(1.2); }

  .qt-empty { }

  .qt-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--green-deep);
    margin-bottom: 8px;
  }

  .qt-desc {
    font-size: 13.5px;
    line-height: 1.7;
    color: var(--text-mid);
  }

  .qt-tag {
    display: inline-block;
    background: var(--green-deep);
    color: var(--cream);
    font-size: 10px;
    padding: 2px 10px;
    border-radius: 100px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .cert-strip {
    background: var(--green-deep);
    padding: 56px 80px;
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cert-badge {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 16px;
    padding: 24px 32px;
    text-align: center;
    min-width: 160px;
    transition: all 0.3s;
  }

  .cert-badge:hover {
    background: rgba(255,255,255,0.12);
    transform: translateY(-4px);
  }

  .cert-icon { font-size: 32px; margin-bottom: 10px; display: block; }
  .cert-name { font-size: 14px; font-weight: 500; color: var(--cream); margin-bottom: 4px; }
  .cert-note { font-size: 11px; color: rgba(245,240,232,0.5); }

  /* ── PROCESS ── */
  .process-hero {
    background: linear-gradient(160deg, var(--green-deep) 0%, #0d2010 100%);
    padding: 80px 80px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .process-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1.5' fill='rgba(74,158,85,0.2)'/%3E%3C/svg%3E");
    background-size: 80px 80px;
  }

  .process-hero .section-title { color: var(--cream); position: relative; }
  .process-hero .section-label { color: var(--amber-light); position: relative; }
  .process-hero .section-body { color: rgba(245,240,232,0.65); margin: 0 auto; text-align: center; max-width: 520px; position: relative; }

  .process-steps {
    padding: 80px;
    background: var(--cream);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .process-step {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 32px;
    padding: 48px 0;
    border-bottom: 1px solid var(--cream-dark);
    align-items: start;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
    transition: all 0.3s;
  }

  .process-step:last-child { border-bottom: none; }
  .process-step:hover .step-num { background: var(--amber); color: var(--white); }

  .step-num {
    width: 72px; height: 72px;
    background: var(--green-deep);
    color: var(--cream);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 900;
    flex-shrink: 0;
    transition: all 0.3s;
    margin-top: 8px;
  }

  .step-content {}

  .step-tag {
    display: inline-block;
    background: var(--green-fresh);
    color: var(--white);
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--green-deep);
    margin-bottom: 10px;
  }

  .step-desc {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-mid);
    margin-bottom: 14px;
    max-width: 580px;
  }

  .step-details {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .step-detail {
    background: var(--white);
    border: 1px solid var(--cream-dark);
    color: var(--green-mid);
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 100px;
  }

  /* ── CONTACT ── */
  .contact-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 72px);
  }

  .contact-left {
    background: var(--green-deep);
    padding: 80px 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .contact-left::before {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: rgba(74,158,85,0.1);
    bottom: -100px; right: -100px;
  }

  .contact-left::after {
    content: '';
    position: absolute;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: rgba(196,135,58,0.08);
    top: 60px; left: -60px;
  }

  .contact-left .section-title { color: var(--cream); position: relative; z-index: 1; }
  .contact-left .section-label { color: var(--amber-light); z-index: 1; position: relative; }
  .contact-left .section-body { color: rgba(245,240,232,0.65); z-index: 1; position: relative; max-width: 400px; }

  .contact-info {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    z-index: 1;
  }

  .contact-info-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .ci-icon {
    width: 44px; height: 44px;
    background: rgba(255,255,255,0.08);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .ci-text {}
  .ci-title { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--amber-light); margin-bottom: 4px; }
  .ci-val { font-size: 15px; color: rgba(245,240,232,0.85); line-height: 1.5; }

  .contact-right {
    background: var(--cream);
    padding: 80px 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--green-deep);
    margin-bottom: 32px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }

  .form-label {
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--green-mid);
    font-weight: 500;
  }

  .form-input, .form-select, .form-textarea {
    padding: 12px 16px;
    border: 1.5px solid var(--cream-dark);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    background: var(--white);
    color: var(--text-dark);
    transition: all 0.2s;
    outline: none;
    width: 100%;
  }

  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--green-fresh);
    box-shadow: 0 0 0 3px rgba(74,158,85,0.12);
  }

  .form-textarea { height: 120px; resize: vertical; }

  .form-submit {
    background: var(--green-deep);
    color: var(--cream);
    padding: 14px 36px;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
  }

  .form-submit:hover {
    background: var(--green-fresh);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(26,58,31,0.2);
  }

  .submit-success {
    background: rgba(74,158,85,0.12);
    border: 1.5px solid var(--green-fresh);
    border-radius: 12px;
    padding: 20px 24px;
    color: var(--green-mid);
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    animation: fadeSlideUp 0.4s both;
  }

  /* ── SCROLLING TICKER ── */
  .ticker {
    background: var(--amber);
    padding: 12px 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .ticker-inner {
    display: inline-flex;
    animation: tickerScroll 20s linear infinite;
    gap: 0;
  }

  .ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 0 48px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--white);
  }

  .ticker-dot {
    width: 5px; height: 5px;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
  }

  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ── FOOTER ── */
  footer {
    background: #0d1f10;
    padding: 48px 80px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-logo { font-family: 'Satisfy', cursive; font-size: 28px; color: var(--green-light); }
  .footer-tagline { font-size: 13px; color: rgba(245,240,232,0.4); margin-top: 4px; }

  .footer-links {
    display: flex;
    gap: 32px;
  }

  .footer-link {
    font-size: 13.5px;
    color: rgba(245,240,232,0.5);
    cursor: pointer;
    transition: color 0.2s;
    background: none;
    border: none;
  }

  .footer-link:hover { color: var(--green-light); }

  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-copy { font-size: 12px; color: rgba(245,240,232,0.3); }

  @media (max-width: 768px) {
    nav { padding: 0 20px; }
    .nav-tabs { gap: 2px; }
    .nav-tab { padding: 6px 10px; font-size: 12px; }
    .hero-content { padding: 0 28px; }
    .hero-float-leaves { display: none; }
    .story-grid, .contact-page { grid-template-columns: 1fr; }
    .quality-timeline::before { left: 30px; }
    .qt-item { grid-template-columns: 30px 1fr; }
    .qt-empty { display: none; }
    .qt-dot-wrap { grid-column: 1; justify-content: flex-start; }
    .qt-content { grid-column: 2; text-align: left !important; }
    .story-section, .products-grid, .process-steps, .contact-left, .contact-right, .cert-strip, .values-strip { padding: 48px 24px; }
    .process-steps { padding: 48px 24px; }
    .products-hero, .process-hero, .quality-hero { padding: 60px 24px 40px; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 40px 24px 20px; }
    .footer-top { flex-direction: column; gap: 16px; text-align: center; }
    .footer-links { flex-wrap: wrap; justify-content: center; gap: 16px; }
    .logo-main { font-size: 18px; }
  }
`;

const PRODUCTS = [
  { emoji: "🧅", name: "Dehydrated Onion", desc: "Premium quality dehydrated onion flakes, minced and powder — exported globally with consistent pungency and aroma.", tags: ["Flakes", "Minced", "Powder", "Granules"], color: "card-amber" },
  { emoji: "🧄", name: "Dehydrated Garlic", desc: "Sun-cured and air-dried garlic in flakes, granules, and powder form. Rich in allicin, ideal for culinary and industrial use.", tags: ["Flakes", "Granules", "Powder"], color: "card-green" },
  { emoji: "🌿", name: "Dehydrated Coriander", desc: "Bright-green dried coriander leaves preserving natural oils and flavour. Perfect for seasoning and spice blends.", tags: ["Leaves", "Seeds", "Powder"], color: "card-teal" },
  { emoji: "🌶", name: "Dehydrated Chilli", desc: "Red and green chilli varieties dried to retain colour and heat levels. Available in whole, crushed, and powder form.", tags: ["Whole", "Crushed", "Powder"], color: "card-red" },
  { emoji: "🫚", name: "Dehydrated Ginger", desc: "Carefully sliced and dried ginger root retaining essential oils. Widely used in beverages, spice mixes, and health products.", tags: ["Sliced", "Powder", "Granules"], color: "card-brown" },
  { emoji: "🥦", name: "Dehydrated Vegetables Mix", desc: "Customisable mixed vegetable blends — carrot, spinach, fenugreek, capsicum — tailored for soup & snack manufacturers.", tags: ["Carrot", "Spinach", "Capsicum", "Custom Mix"], color: "card-purple" },
];

const QUALITY_STEPS = [
  { icon: "🌱", tag: "Source", title: "Farm-Level Procurement", desc: "We partner directly with verified farmers across Maharashtra. Every batch is traceable to its origin field, ensuring chemical-free growing practices from root to harvest." },
  { icon: "🔬", tag: "Inspection", title: "Raw Material Testing", desc: "Incoming produce undergoes moisture content analysis, microbial screening, and pesticide residue testing before entering our facility." },
  { icon: "⚙️", tag: "Processing", title: "Controlled Dehydration", desc: "State-of-the-art tunnel dryers maintain temperature and airflow within ±2°C tolerance, preserving colour, texture, and nutritional integrity." },
  { icon: "📊", tag: "Analysis", title: "In-Process QC Checks", desc: "Every 30 minutes our lab team samples product from the line — checking moisture levels, Aw (water activity), and visual grade to prevent batch drift." },
  { icon: "🧪", tag: "Lab", title: "Finished Product Testing", desc: "Final products are tested for moisture %, bulk density, ash content, particle size distribution, and microbial count before packing approval." },
  { icon: "📦", tag: "Packaging", title: "Hygienic & Sealed Packaging", desc: "Food-grade poly packs, HDPE bags, and nitrogen-flushed pouches ensure shelf life of 12–24 months. Custom export packaging available." },
];

const PROCESS_STEPS = [
  { tag: "Stage 01", title: "Sourcing & Procurement", desc: "We source directly from contract farmers and select wholesale markets in Solapur, Nashik, and Kolhapur. Seasonality is managed through cold-store inventory to ensure year-round supply.", details: ["Direct Farmer Tie-ups", "Seasonal Planning", "Variety Selection", "Cold Storage Buffer"] },
  { tag: "Stage 02", title: "Sorting & Grading", desc: "Received produce is sorted by size, colour, and quality grade. Damaged or substandard pieces are separated on conveyor inspection tables before any processing begins.", details: ["Manual Inspection", "Size Grading", "Colour Sorting", "Reject Removal"] },
  { tag: "Stage 03", title: "Washing & Cleaning", desc: "Multiple-stage washing using food-grade water removes field dust, surface contaminants, and pesticide residues. Produce is sanitised with approved food-safe solutions.", details: ["Multi-Stage Wash", "Sanitisation", "Water Recirculation", "Surface Drying"] },
  { tag: "Stage 04", title: "Cutting & Slicing", desc: "Depending on the final product specification — flakes, slices, or minced — stainless steel cutters process the cleaned material to uniform dimensions for consistent drying.", details: ["Uniform Cut Size", "SS Equipment", "Custom Specification", "Mincing / Slicing / Flaking"] },
  { tag: "Stage 05", title: "Dehydration", desc: "Tunnel dehydrators operate at controlled temperatures (50–70°C) with calibrated airflow across multiple passes. Total drying time varies by product — typically 8 to 14 hours — until target moisture of ≤5% is achieved.", details: ["Tunnel Dryers", "50–70°C Range", "Airflow Calibration", "≤5% Moisture Target"] },
  { tag: "Stage 06", title: "Post-Drying Processing", desc: "Dried product is milled, screened, or blended depending on final form (powder, granule, flake). Screens ensure uniform particle size before batch approval.", details: ["Milling", "Sieving", "Blending", "Particle Sizing"] },
  { tag: "Stage 07", title: "Quality Testing & Packing", desc: "Each approved batch is weighed, tested, and packed in food-grade packaging. Batch codes, production date, expiry, and export documentation are generated at this stage.", details: ["Batch Testing", "Food-grade Packs", "Export Labelling", "Documentation"] },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("story");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <>
      <style>{style}</style>
      <div className="site-wrapper">
        <nav>
          <div className="nav-logo">
            <div className="logo-leaf">🌿</div>
            <div className="logo-text">
              <span className="logo-main">MNTP Farm Fresh</span>
              <span className="logo-sub">Dehydrated · Exports</span>
            </div>
          </div>
          <div className="nav-tabs">
            {tabs.map(t => (
              <button
                key={t.id}
                className={`nav-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {activeTab === "story" && (
          <div className="page" key="story">
            {/* Hero */}
            <div className="hero">
              <div className="hero-bg-pattern" />
              <div className="hero-content">
                <div className="hero-eyebrow">🌿 Rooted in Maharashtra</div>
                <h1 className="hero-title">From Farm to <em>Global Table</em></h1>
                <p className="hero-desc">
                  MNTP Farm Fresh brings the best of Indian agriculture to the world — through precision dehydration that locks in nature's flavour, colour, and nutrition.
                </p>
                <button className="hero-cta" onClick={() => setActiveTab("products")}>
                  Explore Products →
                </button>
              </div>
              <div className="hero-float-leaves" aria-hidden>
                <div className="float-leaf" />
                <div className="float-leaf" />
                <div className="float-leaf" />
              </div>
            </div>

            {/* Ticker */}
            <div className="ticker">
              <div className="ticker-inner">
                {["Dehydrated Onion","Dehydrated Garlic","Coriander Leaves","Ginger Powder","Chilli Flakes","Custom Blends","Export Quality","ISO Certified","Farm to Table","MNTP Farm Fresh"].concat(
                  ["Dehydrated Onion","Dehydrated Garlic","Coriander Leaves","Ginger Powder","Chilli Flakes","Custom Blends","Export Quality","ISO Certified","Farm to Table","MNTP Farm Fresh"]
                ).map((item, i) => (
                  <span className="ticker-item" key={i}>
                    {item} <span className="ticker-dot" />
                  </span>
                ))}
              </div>
            </div>

            {/* Story */}
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
                <div className="story-visual">
                  <div className="story-card">
                    <span className="story-card-num">500+</span>
                    <span className="story-card-label">Farmer Partners</span>
                  </div>
                  <div className="story-card">
                    <span className="story-card-num">20+</span>
                    <span className="story-card-label">Countries Exported</span>
                  </div>
                  <div className="story-card">
                    <span className="story-card-num">12</span>
                    <span className="story-card-label">Product Lines</span>
                  </div>
                  <div className="story-card">
                    <span className="story-card-num">98%</span>
                    <span className="story-card-label">Client Retention</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="values-strip">
              {[
                { icon: "🌱", title: "Farm-First", desc: "We source directly and pay fairly, building long-term trust with our growing communities." },
                { icon: "🔬", title: "Science-Backed", desc: "Every drying curve and moisture target is validated by food scientists in our in-house lab." },
                { icon: "🌍", title: "Export-Ready", desc: "We manage phytosanitary, FDA, and EU compliance documentation so you don't have to." },
                { icon: "♻️", title: "Sustainable", desc: "Solar-assisted drying, zero-waste water treatment, and biodegradable packaging options." },
              ].map((v, i) => (
                <div className="value-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="value-icon">{v.icon}</span>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer>
              <div className="footer-top">
                <div>
                  <div className="footer-logo">MNTP Farm Fresh</div>
                  <div className="footer-tagline">Premium Dehydrated Agricultural Products · Solapur, Maharashtra</div>
                </div>
                <div className="footer-links">
                  {tabs.map(t => (
                    <button key={t.id} className="footer-link" onClick={() => setActiveTab(t.id)}>{t.label}</button>
                  ))}
                </div>
              </div>
              <div className="footer-bottom">
                <span className="footer-copy">© 2024 MNTP Farm Fresh. All rights reserved.</span>
                <span className="footer-copy">Made with 🌿 in Solapur</span>
              </div>
            </footer>
          </div>
        )}

        {activeTab === "products" && (
          <div className="page" key="products">
            <div className="products-hero">
              <div className="section-label">Dehydrated Range</div>
              <h2 className="section-title">Our Products</h2>
              <p className="section-body">
                100% natural, chemical-free dehydrated vegetables and spices — crafted for consistent quality across every shipment.
              </p>
            </div>
            <div className="products-grid">
              {PRODUCTS.map((p, i) => (
                <div className={`product-card ${p.color}`} key={i} style={{ animationDelay: `${i * 0.07}s`, animation: `fadeSlideUp 0.5s ${i * 0.07}s both` }}>
                  <div className="product-card-img">
                    <span style={{ fontSize: 64, position: "relative", zIndex: 1 }}>{p.emoji}</span>
                    <span className="product-badge">Dehydrated</span>
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-name">{p.name}</div>
                    <div className="product-card-desc">{p.desc}</div>
                    <div className="product-tags">
                      {p.tags.map((t, j) => <span className="product-tag" key={j}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--green-deep)", padding: "48px 80px", textAlign: "center" }}>
              <p style={{ color: "rgba(245,240,232,0.7)", fontSize: 15, marginBottom: 20 }}>
                Need a custom blend, specific moisture grade, or private-label packaging?
              </p>
              <button className="hero-cta" onClick={() => setActiveTab("contact")}>
                Request a Quote →
              </button>
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="page" key="quality">
            <div className="quality-hero">
              <div className="section-label">Standards & Certifications</div>
              <h2 className="section-title">Quality You Can Trust</h2>
              <p className="section-body" style={{ margin: "0 auto 0", color: "var(--text-mid)", textAlign: "center", maxWidth: 520 }}>
                From soil to shipment, every step is governed by documented protocols and third-party verified standards.
              </p>
            </div>
            <div className="quality-timeline">
              {QUALITY_STEPS.map((s, i) => (
                <div className="qt-item" key={i}>
                  <div className="qt-content">
                    <span className="qt-tag">{s.tag}</span>
                    <div className="qt-title">{s.title}</div>
                    <div className="qt-desc">{s.desc}</div>
                  </div>
                  <div className="qt-dot-wrap">
                    <div className="qt-dot">{s.icon}</div>
                  </div>
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
            <div className="process-hero">
              <div className="section-label">How We Work</div>
              <h2 className="section-title">The Dehydration Process</h2>
              <p className="section-body">
                A 7-stage journey that transforms fresh farm produce into shelf-stable, export-grade dehydrated products — without additives or preservatives.
              </p>
            </div>
            <div className="process-steps">
              {PROCESS_STEPS.map((s, i) => (
                <div className="process-step" key={i}>
                  <div>
                    <div className="step-num">{i + 1}</div>
                  </div>
                  <div className="step-content">
                    <span className="step-tag">{s.tag}</span>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                    <div className="step-details">
                      {s.details.map((d, j) => <span className="step-detail" key={j}>{d}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="page" key="contact">
            <div className="contact-page">
              <div className="contact-left">
                <div className="section-label">Get In Touch</div>
                <h2 className="section-title">Let's Grow Together</h2>
                <p className="section-body">
                  Whether you're looking for bulk dehydrated supply, export partnerships, or custom product development — our team is ready to help.
                </p>
                <div className="contact-info">
                  <div className="contact-info-item">
                    <div className="ci-icon">📍</div>
                    <div className="ci-text">
                      <div className="ci-title">Address</div>
                      <div className="ci-val">Solapur, Maharashtra, India — 413 001</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">📞</div>
                    <div className="ci-text">
                      <div className="ci-title">Phone</div>
                      <div className="ci-val">+91 98765 43210</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">✉️</div>
                    <div className="ci-text">
                      <div className="ci-title">Email</div>
                      <div className="ci-val">exports@mntpfarmfresh.com</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="ci-icon">🕐</div>
                    <div className="ci-text">
                      <div className="ci-title">Working Hours</div>
                      <div className="ci-val">Mon – Sat, 9:00 AM – 6:30 PM IST</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-right">
                <div className="form-title">Send an Enquiry</div>
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
                    <input className="form-input" placeholder="+91 …" value={formData.phone}
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
                  <textarea className="form-textarea" placeholder="Describe your quantity, packing requirements, destination country…"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <button className="form-submit" onClick={handleSubmit}>
                  Send Enquiry 🌿
                </button>
                {submitted && (
                  <div className="submit-success">
                    ✅ Thank you! We've received your enquiry and will respond within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}