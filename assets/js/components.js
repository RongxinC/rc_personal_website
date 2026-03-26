/**
 * Shared components — masthead & sidebar
 * Edit ONLY this file to update nav or sidebar across all pages.
 */

// ── 1. SITE NAVIGATION ────────────────────────────────────────────────────────
// Add, remove, or reorder nav links here.
const NAV_LINKS = [
  { label: "About",        href: "index.html" },
  // { label: "Research",     href: "research.html" },  // hidden for now
  { label: "Publications", href: "publications.html" },
  { label: "CV",           href: "CV_Rongxin_Cheng.pdf", external: true },
];

// ── 2. SIDEBAR CONTENT ────────────────────────────────────────────────────────
// Edit the values below — they propagate to every page automatically.
const AUTHOR = {
  name:       "Rongxin Cheng",
  pronouns:   "she/her \u00a0·\u00a0 程容馨",
  title:      "Postdoctoral Research Scholar",
  dept:       "Department of Psychology",
  university: "University of California, Riverside",

  // Path to your headshot. Put the image file in assets/images/.
  // Supported formats: .jpg  .png  .webp
  photo:      "assets/images/headshot.jpg",

  // Contact & links — set href to null to hide an entry.
  links: [
    { icon: "fas fa-envelope",      label: "rongxinc@ucr.edu",  href: "mailto:rongxinc@ucr.edu" },
    { icon: "fas fa-map-marker-alt",label: "Riverside, CA",     href: null },
    { icon: "fas fa-file-alt",      label: "Curriculum Vitae",  href: "CV_Rongxin_Cheng.pdf", external: true },
    // Uncomment and fill in any of the lines below:
    // { icon: "fab fa-google",     label: "Google Scholar", href: "YOUR_URL", external: true },
    // { icon: "fab fa-orcid",      label: "ORCID",          href: "YOUR_URL", external: true },
    // { icon: "fab fa-github",     label: "GitHub",         href: "YOUR_URL", external: true },
    // { icon: "fab fa-twitter",    label: "Twitter / X",    href: "YOUR_URL", external: true },
    // { icon: "fab fa-linkedin",   label: "LinkedIn",       href: "YOUR_URL", external: true },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Everything below builds and injects the HTML — no need to edit.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  // ── Masthead ──
  function buildMasthead() {
    const navLinks = NAV_LINKS.map(({ label, href, external }) => {
      const isActive = href === currentPage || (currentPage === "" && href === "index.html");
      const cls   = isActive ? ' class="active"' : '';
      const attrs = external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${href}"${cls}${attrs}>${label}</a>`;
    }).join("\n      ");

    const mobileLinks = NAV_LINKS.map(({ label, href, external }) => {
      const attrs = external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${href}"${attrs}>${label}</a>`;
    }).join("\n  ");

    return `
<header class="masthead">
  <div class="masthead__inner">
    <div class="masthead__title"><a href="index.html">${AUTHOR.name}</a></div>
    <nav class="greedy-nav">
      ${navLinks}
    </nav>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav">
  ${mobileLinks}
</nav>`;
  }

  // ── Sidebar ──
  function buildSidebar() {
    const linkItems = AUTHOR.links.map(({ icon, label, href, external }) => {
      const attrs = external ? ' target="_blank" rel="noopener"' : '';
      const inner = href
        ? `<a href="${href}"${attrs}>${label}</a>`
        : `<span>${label}</span>`;
      return `<li><span class="icon"><i class="${icon}"></i></span>${inner}</li>`;
    }).join("\n        ");

    return `
<div class="author__avatar">
  <img src="${AUTHOR.photo}" alt="${AUTHOR.name}"
       onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
  <div class="avatar-placeholder" style="display:none;">RC</div>
</div>

<div class="author__content">
  <h1 class="author__name">${AUTHOR.name}</h1>
  <p class="author__pronouns">${AUTHOR.pronouns}</p>
  <p class="author__bio">
    ${AUTHOR.title}<br>
    ${AUTHOR.dept}<br>
    ${AUTHOR.university}
  </p>
</div>

<hr class="sidebar__divider">

<div class="author__urls-wrapper">
  <h3>Contact &amp; Links</h3>
  <ul class="author__urls">
    ${linkItems}
  </ul>
</div>`;
  }

  // ── Inject ──
  document.addEventListener("DOMContentLoaded", function () {
    const mastheadMount = document.getElementById("masthead-mount");
    if (mastheadMount) mastheadMount.outerHTML = buildMasthead();

    const sidebarMount = document.getElementById("sidebar-mount");
    if (sidebarMount) sidebarMount.innerHTML = buildSidebar();

    // Mobile nav toggle (re-bind after injection)
    const toggle    = document.getElementById("nav-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    if (toggle && mobileNav) {
      toggle.addEventListener("click", function () {
        mobileNav.classList.toggle("open");
      });
    }
  });
})();
