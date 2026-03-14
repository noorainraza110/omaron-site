const navShell = document.querySelector(".nav-shell");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const galleryTriggers = document.querySelectorAll('[data-open-gallery="true"]');
const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCaption = document.querySelector(".lightbox__caption");
const lightboxClose = document.querySelector(".lightbox__close");
const lightboxPrev = document.querySelector(".lightbox__nav--prev");
const lightboxNext = document.querySelector(".lightbox__nav--next");

const galleryItems = [
  "assets/gallery/drive-download-20260313T043817Z-3-001/20250427_133220.jpg",
  "assets/gallery/drive-download-20260313T043817Z-3-001/20250427_133444.jpg",
  "assets/gallery/drive-download-20260313T043817Z-3-001/IMG-20250824-WA0015.jpg",
  "assets/gallery/drive-download-20260313T043817Z-3-001/IMG-20250824-WA0016.jpg",
  "assets/gallery/drive-download-20260313T043817Z-3-001/IMG-20250824-WA0021.jpg",
  "assets/gallery/drive-download-20260313T043817Z-3-001/WHISPER FRONT AFTERNOON.jpg",
  "assets/gallery/drive-download-20260313T043921Z-3-001/20250427_170458.jpg",
  "assets/gallery/drive-download-20260313T043921Z-3-001/20250825_145019.jpg",
  "assets/gallery/drive-download-20260313T043921Z-3-001/20250829_133532.jpg",
  "assets/gallery/drive-download-20260313T043921Z-3-001/20250829_134123.jpg",
  "assets/gallery/drive-download-20260313T043921Z-3-001/20250829_134137.jpg",
  "assets/gallery/drive-download-20260313T043921Z-3-001/ANMP0005.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_104448.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_105529.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_163606.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_164137.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_164601.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_165105.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_165352.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_165654.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_165947.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_171745.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_171950.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_173855.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_175316.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260301_175331.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260306_163457.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260308_160416.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260309_180320.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260309_180439.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/20260309_180529.jpg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/WhatsApp Image 2026-03-07 at 5.46.50 PM.jpeg",
  "assets/gallery/drive-download-20260313T044224Z-3-4/WhatsApp Image 2026-03-07 at 5.46.52 PM (1).jpeg"
];

let currentGalleryIndex = 0;
let lastFocusedElement = null;
let touchStartX = 0;
let touchEndX = 0;

if (navShell && navToggle && navLinks) {
  const closeMenu = () => {
    navShell.classList.remove("nav-open");
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    navShell.classList.add("nav-open");
    navLinks.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 720) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 720) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (!navShell.contains(target) && window.innerWidth < 720) {
      closeMenu();
    }
  });
}

if (lightbox && lightboxImage && lightboxCaption) {
  const cleanTitle = (path) => {
    const fileName = path.split("/").pop() ?? "";
    return fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const openLightbox = (index) => {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    currentGalleryIndex = index;
    const path = galleryItems[index];
    lightboxImage.src = encodeURI(path);
    lightboxImage.alt = cleanTitle(path);
    lightboxCaption.textContent = cleanTitle(path);
    lightbox.classList.add("is-open");
    lightbox.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (document.activeElement instanceof HTMLElement && lightbox.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.src = "";

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  const stepLightbox = (direction) => {
    const total = galleryItems.length;
    currentGalleryIndex = (currentGalleryIndex + direction + total) % total;
    openLightbox(currentGalleryIndex);
  };

  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (window.innerWidth < 720) {
        navShell?.classList.remove("nav-open");
        navLinks?.classList.remove("is-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Open navigation menu");
      }

      openLightbox(0);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", () => stepLightbox(-1));
  lightboxNext?.addEventListener("click", () => stepLightbox(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }, { passive: true });

  lightbox.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance < 0) {
      stepLightbox(1);
      return;
    }

    stepLightbox(-1);
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      stepLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      stepLightbox(1);
    }
  });
}
