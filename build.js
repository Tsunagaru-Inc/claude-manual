// build.js — generates index.html from sections/*.md
// Run: node build.js  (or: npm run build)
import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

/* ── Slugify heading text to a stable HTML id ─────────────── */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[（）()「」【】・。、！？!?,;:.'"…—–\\/]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ── Collect headings during render for nav / TOC ─────────── */
const headings = [];

marked.use({
  gfm: true,
  renderer: {
    heading(text, depth) {
      if (depth === 1) {
        const m = text.match(/^(\d+)\.\s+(.+)$/);
        if (m) {
          const [, num, title] = m;
          const id = slugify(`${num}-${title}`);
          headings.push({ depth, num, title, id });
          return `<h1 id="${id}" data-num="${num}">${title}</h1>\n`;
        }
      }
      if (depth === 2) {
        const m = text.match(/^(\d+-\d+)\.\s+(.+)$/);
        if (m) {
          const [, num, title] = m;
          const id = slugify(`${num}-${title}`);
          headings.push({ depth, num, title, id });
          return `<h2 id="${id}"><span class="h2-num">${num}</span>${title}</h2>\n`;
        }
      }
      const id = slugify(text);
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    }
  }
});

/* ── Post-process marked HTML output ──────────────────────── */
function postprocess(html) {
  // Wrap fenced code blocks
  html = html.replace(
    /<pre><code(?: class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const badge = lang ? `<span class="code-lang">${lang}</span>` : '';
      const cls   = lang ? ` class="language-${lang}"` : '';
      return `<div class="code-wrap">${badge}<pre><code${cls}>${code}</code></pre></div>`;
    }
  );
  // Wrap tables
  html = html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
  // Warn blockquotes (start with ⚠️)
  html = html.replace(
    /<blockquote>\n?(<p>)(⚠️|⚠)/g,
    '<blockquote class="warn">\n$1$2'
  );
  // Task-list checkboxes (marked v9 emits plain <li><input ...> without extra classes)
  html = html
    .replace(/<li><input disabled="" type="checkbox"> /g, '<li><span class="checkbox"></span>')
    .replace(/<ul>\n<li><span class="checkbox">/g, '<ul class="checklist">\n<li><span class="checkbox">');
  return html;
}

/* ── Parse each section file ──────────────────────────────── */
const SECTIONS = ['00_overview', '01_setup', '02_usage', '03_security', '04_usecases'];

const sectionsHTML = SECTIONS.map((name, i) => {
  const raw   = readFileSync(join(ROOT, 'sections', `${name}.md`), 'utf-8');
  // Strip HTML comments (including multi-line editorial notes)
  const clean = raw.replace(/<!--[\s\S]*?-->/g, '').trim();
  const body  = postprocess(marked.parse(clean));
  return `<section data-sec="${i}" class="fade-in">\n${body}</section>`;
}).join('\n\n');

/* ── Build sidebar nav ────────────────────────────────────── */
const navItems = headings.map(h => {
  if (h.depth === 1) {
    return `      <li class="nav-h1"><a href="#${h.id}"><span class="nav-num">${h.num}</span><span class="nav-label">${h.title}</span></a></li>`;
  }
  return `      <li class="nav-h2"><a href="#${h.id}"><span class="nav-subnum">${h.num}</span><span class="nav-label">${h.title}</span></a></li>`;
}).join('\n');

/* ── Build inline TOC ─────────────────────────────────────── */
const tocItems = headings
  .filter(h => h.depth === 1)
  .map(h => {
    return `    <li><span class="toc-num">${h.num}</span><a href="#${h.id}">${h.title}</a></li>`;
  }).join('\n');

/* ── CSS ──────────────────────────────────────────────────── */
const CSS = `
/* ── Tokens ───────────────────────────────────────────────── */
:root {
  /* Pure neutral palette — no warm tint */
  --bg:           #FFFFFF;
  --bg-subtle:    oklch(97.8% 0 0);
  --bg-muted:     oklch(95.5% 0 0);
  --bg-code:      oklch(96.5% 0 0);
  --bg-warn:      oklch(98.8% 0.016 75);
  --border:       oklch(89.5% 0 0);
  --border-mid:   oklch(78.5% 0 0);
  --border-warn:  oklch(62% 0.08 55);
  --text:         oklch(12.5% 0 0);
  --text-mid:     oklch(41% 0 0);
  --text-light:   oklch(58% 0 0);
  --text-xlight:  oklch(72% 0 0);
  --watermark:    oklch(93% 0 0);

  /* Radius scale */
  --radius-sm:    5px;
  --radius:       10px;
  --radius-lg:    14px;

  --font-serif:   'Shippori Mincho B1', 'Hiragino Mincho ProN', 'Yu Mincho', serif;
  --font-sans:    'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif;
  --font-mono:    'SFMono-Regular', 'Cascadia Code', 'Consolas', monospace;

  --nav-w:        272px;
  --content-max:  780px;
  --pad-x:        clamp(2.5rem, 5vw, 5rem);

  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
}

/* ── Reset ────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.85;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 2px;
  border-radius: 3px;
}

/* ── Sidebar ──────────────────────────────────────────────── */
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: var(--nav-w);
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--bg-subtle);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  /* Subtle depth: shadow on the right edge only */
  box-shadow: 2px 0 16px oklch(0% 0 0 / 0.04);
}

.sidebar-brand {
  padding: 2.25rem 1.75rem 1.75rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.sidebar-brand .co {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-light);
  margin-bottom: 0.6rem;
}

.sidebar-brand .title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.45;
  letter-spacing: 0.01em;
}

.sidebar-brand .ver {
  margin-top: 0.6rem;
  font-size: 0.65rem;
  color: var(--text-xlight);
  letter-spacing: 0.05em;
}

/* Nav */
nav { padding: 1rem 0 0.5rem; }
nav ul { list-style: none; }
.nav-h1 { margin-top: 0.2rem; }

.nav-h1 > a {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 1.75rem;
  min-height: 2.75rem;  /* 44px Apple HIG minimum */
  text-decoration: none;
  transition: background 0.15s var(--ease-out);
}

.nav-h2 > a {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.35rem 1.75rem 0.35rem 3rem;
  min-height: 2rem;
  text-decoration: none;
  transition: background 0.15s var(--ease-out);
}

.nav-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.45rem;
  height: 1.45rem;
  background: var(--bg-muted);
  border-radius: 50%;
  font-size: 0.67rem;
  font-weight: 700;
  color: var(--text-mid);
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
  font-variant-numeric: tabular-nums;
}

.nav-subnum {
  font-size: 0.63rem;
  font-weight: 600;
  color: var(--text-xlight);
  min-width: 1.9rem;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  letter-spacing: 0.01em;
}

.nav-label {
  font-size: 0.74rem;
  color: var(--text-mid);
  line-height: 1.4;
  transition: color 0.15s;
}

.nav-h1 .nav-label { font-size: 0.77rem; font-weight: 700; color: var(--text); }

.nav-h1 > a:hover { background: var(--bg-muted); }
.nav-h1 > a:hover .nav-num   { background: var(--border-mid); color: var(--text); }
.nav-h1 > a:hover .nav-label { color: var(--text); }
.nav-h2 > a:hover .nav-label { color: var(--text); }
.nav-h2 > a:hover .nav-subnum { color: var(--text-mid); }

.nav-h1 > a.active { background: var(--bg-muted); }
.nav-h1 > a.active .nav-num   { background: var(--text); color: var(--bg); }
.nav-h1 > a.active .nav-label { color: var(--text); }
.nav-h2 > a.active .nav-label { color: var(--text); font-weight: 600; }
.nav-h2 > a.active .nav-subnum { color: var(--text-mid); }

/* ── Main ─────────────────────────────────────────────────── */
main {
  margin-left: var(--nav-w);
  padding: clamp(3.5rem, 6vw, 5.5rem) var(--pad-x) clamp(6rem, 10vw, 9rem);
}

.content { max-width: var(--content-max); }

/* ── Cover ────────────────────────────────────────────────── */
.cover {
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(3.5rem, 6vw, 5rem);
  margin-bottom: clamp(3rem, 6vw, 4.5rem);
  border-bottom: 1px solid var(--border);
  position: relative;
}

.cover-co {
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-light);
  margin-bottom: 1.75rem;
}

.cover h1 {
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 5.5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 1.75rem;
  border-bottom: none;
  padding-bottom: 0;
}
.cover h1::before { display: none; }

.cover-rule {
  width: 2.5rem;
  height: 1.5px;
  background: var(--border-mid);
  margin-bottom: 1.75rem;
}

.cover-desc {
  font-size: 1rem;
  color: var(--text-mid);
  line-height: 1.85;
  max-width: 50ch;
  margin-bottom: 2.75rem;
}

.cover-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.cover-meta span {
  font-size: 0.7rem;
  color: var(--text-light);
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.cover-meta span::before {
  content: '';
  display: inline-block;
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background: var(--border-mid);
}

/* ── TOC ──────────────────────────────────────────────────── */
.toc {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem 2.25rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
  background: var(--bg-subtle);
}

.toc-head {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-light);
  margin-bottom: 1.1rem;
}

.toc ol { list-style: none; display: grid; gap: 0; }

.toc li {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
}
.toc li:last-child { border-bottom: none; }
.toc li::before { content: none; }
.toc ol li { padding-left: 0; }

.toc-num {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-xlight);
  min-width: 1.4rem;
  font-variant-numeric: tabular-nums;
}

.toc a { color: var(--text); text-decoration: none; font-weight: 500; }
.toc a:hover { text-decoration: underline; text-underline-offset: 2px; }

/* ── Sections ─────────────────────────────────────────────── */
section { margin-bottom: clamp(4.5rem, 8vw, 7rem); padding-top: 0.5rem; }

.fade-in {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ── Headings ─────────────────────────────────────────────── */
h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 3.75vw, 2.6rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: visible;
}

h1[data-num]::before {
  content: attr(data-num);
  position: absolute;
  right: 0;
  bottom: 0;
  top: auto;
  transform: none;
  font-family: var(--font-serif);
  font-size: clamp(4.5rem, 9vw, 7.5rem);
  font-weight: 700;
  color: var(--watermark);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.05em;
}

h2 {
  font-family: var(--font-sans);
  font-size: clamp(1.02rem, 2vw, 1.18rem);
  font-weight: 700;
  color: var(--text);
  margin-top: clamp(2.25rem, 4vw, 3rem);
  margin-bottom: 0.9rem;
  line-height: 1.4;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.h2-num {
  font-size: 0.66rem;
  font-weight: 700;
  color: var(--text-xlight);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  padding-top: 0.15em;
}

h3 {
  font-family: var(--font-sans);
  font-size: clamp(0.93rem, 1.5vw, 1.02rem);
  font-weight: 700;
  color: var(--text);
  margin-top: 1.9rem;
  margin-bottom: 0.6rem;
  line-height: 1.4;
  padding-left: 0.8rem;
  border-left: 2px solid var(--border-mid);
}

h4 {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-mid);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

/* ── Body copy ────────────────────────────────────────────── */
p {
  font-size: clamp(0.92rem, 1.5vw, 1rem);
  line-height: 1.9;
  color: var(--text);
  margin-bottom: 0.95rem;
  max-width: 66ch;
}

/* ── Lists ────────────────────────────────────────────────── */
ul, ol { padding-left: 1.4rem; margin-bottom: 0.95rem; }

li {
  font-size: clamp(0.9rem, 1.5vw, 0.97rem);
  line-height: 1.85;
  color: var(--text);
  margin-bottom: 0.25rem;
  max-width: 66ch;
}

ul { list-style: none; padding-left: 0; }
ul li { padding-left: 1.25rem; position: relative; }
ul li::before { content: '–'; position: absolute; left: 0; color: var(--text-xlight); font-weight: 400; }

ol { counter-reset: list-counter; padding-left: 0; }
ol li { counter-increment: list-counter; padding-left: 1.9rem; position: relative; }
ol li::before {
  content: counter(list-counter) '.';
  position: absolute;
  left: 0;
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--text-light);
  top: 0.22em;
  font-variant-numeric: tabular-nums;
}

/* Checklist */
ul.checklist { list-style: none; padding-left: 0; }
ul.checklist li { padding-left: 1.6rem; position: relative; }
ul.checklist li::before { display: none; }

.checkbox {
  position: absolute;
  left: 0;
  top: 0.3em;
  width: 0.85rem;
  height: 0.85rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 2px;
  background: var(--bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ── Blockquotes ──────────────────────────────────────────── */
blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.35rem;
  background: var(--bg-subtle);
  border-left: 3px solid var(--border-mid);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.875rem;
  color: var(--text-mid);
  line-height: 1.8;
}

blockquote.warn {
  background: var(--bg-warn);
  border-left-color: var(--border-warn);
  color: var(--text);
}

blockquote p { font-size: inherit; max-width: none; margin-bottom: 0.45rem; }
blockquote p:last-child { margin-bottom: 0; }
blockquote strong { color: var(--text); }

/* ── Code ─────────────────────────────────────────────────── */
code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-muted);
  padding: 0.12em 0.38em;
  border-radius: 4px;
  color: var(--text);
}

.code-wrap { position: relative; margin: 1.5rem 0; }

.code-lang {
  position: absolute;
  top: 0.65rem;
  right: 1rem;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-xlight);
  pointer-events: none;
  user-select: none;
}

pre {
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.35rem 1.6rem;
  overflow-x: auto;
  tab-size: 2;
}

pre code {
  background: none;
  padding: 0;
  font-size: 0.81rem;
  line-height: 1.7;
  color: var(--text);
  border-radius: 0;
}

/* ── Tables ───────────────────────────────────────────────── */
.table-wrap {
  margin: 1.5rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

table { width: 100%; border-collapse: collapse; font-size: 0.875rem; min-width: 400px; }

th, td {
  padding: 0.75rem 1.15rem;
  text-align: left;
  line-height: 1.55;
  vertical-align: top;
  border-bottom: 1px solid var(--border);
}

th {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-mid);
  background: var(--bg-muted);
  border-bottom: 1.5px solid var(--border-mid);
  white-space: nowrap;
}

tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--bg-subtle); transition: background 0.12s; }

/* ── HR ───────────────────────────────────────────────────── */
hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }

/* ── Links ────────────────────────────────────────────────── */
a {
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--border-mid);
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  transition: text-decoration-color 0.15s;
}
a:hover { text-decoration-color: var(--text); }

/* ── Print ────────────────────────────────────────────────── */
@media print {
  :root { --nav-w: 0px; }
  .sidebar { display: none; }
  main { margin-left: 0; padding: 1.5rem 2.5rem; }
  .cover { padding: 2rem 0 2.5rem; }
  .cover h1 { font-size: 2.5rem; }
  section { page-break-inside: avoid; }
  h1, h2, h3 { page-break-after: avoid; }
  pre, table, blockquote, .table-wrap { page-break-inside: avoid; }
  a { text-decoration: none; }
  .fade-in { opacity: 1; transform: none; }
  h1[data-num]::before { opacity: 0.05; }
}

/* ── Mobile ───────────────────────────────────────────────── */
@media (max-width: 960px) {
  :root { --nav-w: 0px; }
  .sidebar { display: none; }
  main { margin-left: 0; padding: 2rem 1.5rem 5rem; }
  .cover h1 { font-size: 2.2rem; }
  h1[data-num]::before { font-size: 4.5rem; opacity: 0.65; }
}

/* ── Reduced motion ───────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .fade-in { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}
`.trim();

/* ── JavaScript ───────────────────────────────────────────── */
const JS = `
// Scroll entrance
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = '0ms';
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.04, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Nav active state
const headings = [...document.querySelectorAll('h1[id], h2[id]')];
const navLinks = [...document.querySelectorAll('nav a')];

let ticking = false;
function updateActive() {
  const scrollY = window.scrollY + 130;
  let current = headings[0]?.id ?? '';
  for (const h of headings) {
    if (h.offsetTop <= scrollY) current = h.id;
    else break;
  }
  navLinks.forEach(a => {
    const href = a.getAttribute('href')?.slice(1);
    a.classList.toggle('active', href === current);
  });
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateActive); ticking = true; }
}, { passive: true });

updateActive();
`.trim();

/* ── Assemble HTML ────────────────────────────────────────── */
const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Claude 社内活用マニュアル — ツナガル株式会社</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;700&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<style>
${CSS}
</style>
</head>
<body>
<div class="layout">

<aside class="sidebar" aria-label="ナビゲーション">
  <div class="sidebar-brand">
    <div class="co">ツナガル株式会社</div>
    <div class="title">Claude<br>社内活用マニュアル</div>
    <div class="ver">Version 0.2 &thinsp;&middot;&thinsp; 2026年3月</div>
  </div>
  <nav>
    <ul>
${navItems}
    </ul>
  </nav>
</aside>

<main>
<div class="content">

<div class="cover">
  <div class="cover-co">ツナガル株式会社</div>
  <h1>Claude<br>社内活用マニュアル</h1>
  <div class="cover-rule"></div>
  <p class="cover-desc">Claudeを業務に取り入れるための実践的なガイドです。ツールの使い方だけでなく、安全で持続可能なAI活用の土台づくりを目的としています。</p>
  <div class="cover-meta">
    <span>Version 0.2</span>
    <span>2026年3月</span>
    <span>全スタッフ対象</span>
  </div>
</div>

<div class="toc" aria-label="目次">
  <div class="toc-head">目次</div>
  <ol>
${tocItems}
  </ol>
</div>

${sectionsHTML}

</div>
</main>
</div>

<script>
${JS}
</script>
</body>
</html>`;

writeFileSync(join(ROOT, 'index.html'), html, 'utf-8');
console.log(`Built index.html (${(html.length / 1024).toFixed(1)} KB)`);
