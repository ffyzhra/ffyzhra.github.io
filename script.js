// ============ CERTIFICATIONS DATA ============
const certs = [
  // Data & AI
  { title: "Membangun Sistem Machine Learning", year: 2026, cat: "data", id: "6RPN792J8X2M" },
  { title: "Belajar Fundamental Deep Learning", year: 2026, cat: "data", id: "EYX4Q8E0OPDL" },
  { title: "Belajar Machine Learning untuk Pemula", year: 2026, cat: "data", id: "MEPJOE0DWZ3V" },
  { title: "Belajar Dasar AI", year: 2026, cat: "data", id: "L4PQ998RVPO1" },
  { title: "Belajar Fundamental Analisis Data", year: 2026, cat: "data", id: "98XW0R1N9XM3" },
  { title: "Belajar Fundamental Pemrosesan Data", year: 2026, cat: "data", id: "2VX3013DJXYQ" },
  { title: "Belajar Dasar Visualisasi Data", year: 2026, cat: "data", id: "MRZMWD8DKPYQ" },
  { title: "Belajar Matematika untuk Data Science", year: 2026, cat: "data", id: "53XE1058KZRN" },
  { title: "Belajar Dasar Data Science", year: 2026, cat: "data", id: "98XW0R6JLXM3" },
  { title: "Belajar Data Science", year: 2023, cat: "data", id: "NVP7716LGPR0" },
  // Programming & Tools
  { title: "Memulai Pemrograman dengan Python", year: 2026, cat: "prog", id: "72ZDJOE0VZYW" },
  { title: "Belajar Dasar Git dengan GitHub", year: 2026, cat: "prog", id: "2VX30137JXYQ" },
  { title: "Pengenalan ke Logika Pemrograman", year: 2026, cat: "prog", id: "GRX5WK74YZ0M" },
  { title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software", year: 2026, cat: "prog", id: "4EXG1522QPRL" },
  { title: "Belajar Pemrograman Prosedural dengan Python", year: 2023, cat: "prog", id: "81P2VGW8YPOY" },
  { title: "Belajar Dasar SQL", year: 2023, cat: "prog", id: "N9ZOOEQ18ZG5" },
  // Management & Finance
  { title: "Belajar Dasar Manajemen Proyek", year: 2023, cat: "mgmt", id: "N9ZOOE5Y8ZG5" },
  { title: "Introduction to Financial Literacy", year: 2025, cat: "mgmt", id: "QLZ96WJ8MZ5D" },
];

const catLabel = { data: "Data & AI", prog: "Programming & Tools", mgmt: "Management & Finance" };

const certList = document.getElementById("certList");

function renderCerts(filter = "all") {
  const items = certs.filter((c) => filter === "all" || c.cat === filter);
  certList.innerHTML = items
    .map(
      (c, i) => `
      <li style="animation-delay:${i * 30}ms">
        <div>
          <span class="cat">${catLabel[c.cat]}</span>
          <a href="https://www.dicoding.com/certificates/${c.id}" target="_blank" rel="noopener">${c.title}</a>
        </div>
        <span class="year">${c.year}</span>
      </li>`
    )
    .join("");
}
renderCerts();

document.getElementById("certFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b === btn));
  renderCerts(btn.dataset.filter);
});

// ============ NAVBAR ============
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  nav.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", open);
}
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Highlight the active section in the navbar
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// ============ REVEAL ON SCROLL ============
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ============ COUNT-UP STATS ============
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const start = performance.now();
      const duration = 1400;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));
}

// ============ LIGHTBOX ============
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".shot img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
};
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});
document.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

// ============ FOOTER YEAR ============
document.getElementById("year").textContent = new Date().getFullYear();
