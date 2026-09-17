/* ==================================================
   PROJECT BASE PATH
================================================== */

const BASE_PATH = window.location.hostname.includes("github.io")
  ? "/neature-prototype/"
  : "/";

/* ==================================================
   COMPONENTS LOADER
================================================== */

async function loadComponents() {
  const slots = document.querySelectorAll("[data-component]");

  for (const slot of slots) {
    const componentName = slot.dataset.component;
    let path;

    if (
      componentName.startsWith("../") ||
      componentName.startsWith("./")
    ) {
      path = `${componentName}.html`;
    } else {
      path = `${BASE_PATH}components/${componentName}.html`;
    }

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Impossible de charger ${path}`);
      }

      slot.innerHTML = await response.text();

      // Corrige les chemins absolus dans les composants
      slot.querySelectorAll("[href], [src]").forEach((element) => {
        const href = element.getAttribute("href");
        const src = element.getAttribute("src");

        if (href && href.startsWith("/") && !href.startsWith("//")) {
          element.setAttribute(
            "href",
            `${BASE_PATH}${href.slice(1)}`
          );
        }

        if (src && src.startsWith("/") && !src.startsWith("//")) {
          element.setAttribute(
            "src",
            `${BASE_PATH}${src.slice(1)}`
          );
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  // Tous les composants sont maintenant chargés
  document.dispatchEvent(
    new CustomEvent("components:loaded")
  );
}

/* ==================================================
   MEGA MENUS
================================================== */

function initMegaMenus() {
  const megaMenus = document.querySelectorAll(".mega-menu");

  megaMenus.forEach((megaMenu) => {
    const categories = megaMenu.querySelectorAll(".mega-menu__category");
    const panels = megaMenu.querySelectorAll(".mega-menu__panel");

    // Active la catégorie et le panneau correspondants
    function activatePanel(target) {
      categories.forEach((category) => {
        const isActive = category.dataset.megaTarget === target;
        category.classList.toggle("is-active", isActive);
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.megaPanel === target;
        panel.classList.toggle("is-active", isActive);
      });
    }

    // Interactions : survol, clavier et clic
    categories.forEach((category) => {
      category.addEventListener("mouseenter", () => {
        activatePanel(category.dataset.megaTarget);
      });

      category.addEventListener("focus", () => {
        activatePanel(category.dataset.megaTarget);
      });

      category.addEventListener("click", () => {
        activatePanel(category.dataset.megaTarget);
      });
    });
  });
}


/* ==================================================
   INITIALISATION DES COMPOSANTS
================================================== */

// On écoute l'événement avant de lancer le chargement
document.addEventListener("components:loaded", () => {
  initMegaMenus();
  initFooterAccordions();
});

loadComponents();

/* ==================================================
   FAQ
================================================== */

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    const question = event.target.closest(".faq-item__question");

    if (!question) return;

    const item = question.closest(".faq-item");
    const faq = question.closest(".faq");

    if (!item || !faq) return;

    const items = faq.querySelectorAll(".faq-item");
    const isOpen = item.classList.contains("is-open");

    // Ferme tous les autres items
    items.forEach((otherItem) => {
      otherItem.classList.remove("is-open");

      const otherButton = otherItem.querySelector(".faq-item__question");

      if (otherButton) {
        otherButton.setAttribute("aria-expanded", "false");
      }
    });

    // Ouvre l'item sélectionné
    if (!isOpen) {
      item.classList.add("is-open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

/* ==================================================
   FOOTER ACCORDEONS
================================================== */

function initFooterAccordions() {
  const toggles = document.querySelectorAll(".site-footer__accordion-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (window.innerWidth > 600) return;

      const content = toggle.nextElementSibling;
      if (!content) return;

      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      toggles.forEach((otherToggle) => {
        const otherContent = otherToggle.nextElementSibling;

        otherToggle.setAttribute("aria-expanded", "false");
        otherContent?.classList.remove("is-open");
      });

      if (!isOpen) {
        toggle.setAttribute("aria-expanded", "true");
        content.classList.add("is-open");
      }
    });
  });
}