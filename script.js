const navShell = document.querySelector(".nav-shell");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const trackableElements = document.querySelectorAll("[data-meta-track]");

const loadDeferredScripts = () => {
  if (window.__omaroneDeferredScriptsLoaded) {
    return;
  }

  window.__omaroneDeferredScriptsLoaded = true;

  const googleScript = document.createElement("script");
  googleScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-18018932946";
  googleScript.async = true;
  document.head.appendChild(googleScript);
  window.gtag("config", "AW-18018932946");

  const metaScript = document.createElement("script");
  metaScript.src = "https://connect.facebook.net/en_US/fbevents.js";
  metaScript.async = true;
  metaScript.onload = () => {
    window.fbq.loaded = true;
    window.fbq("init", "1400947588733806");
    window.fbq("track", "PageView");
  };
  document.head.appendChild(metaScript);
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(loadDeferredScripts, { timeout: 2500 });
} else {
  window.addEventListener("load", () => {
    window.setTimeout(loadDeferredScripts, 1200);
  }, { once: true });
}

const trackGoogleEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, parameters);
};

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
      trackGoogleEvent("generate_lead", {
        method: "WhatsApp",
        destination: "https://wa.me/923324567825"
      });
    }

    if (trackType === "map-click") {
      trackMetaEvent("FindLocation", {
        destination: "https://maps.app.goo.gl/iXpZPbL6EjSSsv6q6",
        location: "rawalakot-kashmir"
      });
      trackGoogleEvent("find_location", {
        destination: "https://maps.app.goo.gl/iXpZPbL6EjSSsv6q6",
        location: "Rawalakot, Kashmir"
      });
    }

    if (trackType === "gallery-open") {
      trackMetaEvent("ViewContent", {
        destination: "https://omaronemountainhomes.pixieset.com/",
        content_name: "pixieset-gallery"
      });
      trackGoogleEvent("view_gallery", {
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
