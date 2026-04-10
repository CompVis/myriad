/* ── Related Works Dropdown ───────────────────────── */

function setMoreWorksOpen(isOpen) {
  const dropdown = document.getElementById("moreWorksDropdown");
  const button = document.querySelector(".more-works-btn");
  if (!dropdown || !button) return;
  dropdown.classList.toggle("show", isOpen);
  button.classList.toggle("active", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  dropdown.setAttribute("aria-hidden", String(!isOpen));
}

function toggleMoreWorks() {
  const dropdown = document.getElementById("moreWorksDropdown");
  if (!dropdown) return;
  setMoreWorksOpen(!dropdown.classList.contains("show"));
}


/* ── Copy BibTeX ──────────────────────────────────── */

function copyBibTeX() {
  const source = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const label = document.querySelector(".copy-text");
  if (!source || !button || !label) return;

  const flash = () => {
    button.classList.add("copied");
    label.textContent = "Copied!";
    setTimeout(() => {
      button.classList.remove("copied");
      label.textContent = "Copy";
    }, 2000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(source.textContent).then(flash);
    return;
  }

  const ta = document.createElement("textarea");
  ta.value = source.textContent;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:absolute;left:-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  flash();
}


/* ── Scroll to Top ────────────────────────────────── */

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ── Expandable Sections ──────────────────────────── */

function toggleExpand(btn) {
  const content = btn.parentElement.querySelector(".expandable-content");
  if (!content) return;
  const isOpen = content.classList.contains("show");
  content.classList.toggle("show");
  btn.setAttribute("aria-expanded", String(!isOpen));
  const label = btn.querySelector("span");
  if (label) {
    const showText = label.dataset.show || "Show details";
    const hideText = label.dataset.hide || "Hide details";
    label.textContent = isOpen ? showText : hideText;
  }
}


/* ── Event Listeners ──────────────────────────────── */

document.addEventListener("click", (e) => {
  const container = document.querySelector(".more-works-container");
  if (!container || container.contains(e.target)) return;
  setMoreWorksOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMoreWorksOpen(false);
});

window.addEventListener("scroll", () => {
  const btn = document.querySelector(".scroll-to-top");
  if (!btn) return;
  btn.classList.toggle("visible", window.scrollY > 400);
}, { passive: true });
