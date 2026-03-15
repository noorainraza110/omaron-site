const navShell = document.querySelector(".nav-shell");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const trackableElements = document.querySelectorAll("[data-meta-track]");

const trackMetaEvent = (eventName, parameters = {}) => {
  if (typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", eventName, parameters);
};

trackableElements.forEach((element) => {
  element.addEventListener("click", () => {
    const trackType = element.getAttribute("data-meta-track");

    if (trackType === "whatsapp-click") {
      trackMetaEvent("Contact", {
        destination: "https://wa.me/923324567825",
        location: "omarone-site"
      });
    }

    if (trackType === "map-click") {
      trackMetaEvent("FindLocation", {
        destination: "https://maps.app.goo.gl/iXpZPbL6EjSSsv6q6",
        location: "rawalakot-kashmir"
      });
    }

    if (trackType === "gallery-open") {
      trackMetaEvent("ViewContent", {
        destination: "https://omaronemountainhomes.pixieset.com/",
        content_name: "pixieset-gallery"
      });
    }
  });
});

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
