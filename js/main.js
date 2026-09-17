/* ==================================================
   INITIALISATION APRÈS CHARGEMENT DES COMPOSANTS
================================================== */

document.addEventListener("components:loaded", () => {


  /* ==================================================
     MENU BURGER
  ================================================== */

  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".site-header__burger");

  if (header && burger) {

    burger.addEventListener("click", () => {

      const isOpen =
        burger.getAttribute("aria-expanded") === "true";

      burger.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      header.classList.toggle(
        "is-menu-open",
        !isOpen
      );

    });

  }


  /* ==================================================
     SOUS-MENUS MOBILE
  ================================================== */

  const megaItems = document.querySelectorAll(".nav-item--mega");

  megaItems.forEach((item) => {

    const link = item.querySelector(".nav-item__link");

    if (!link) return;


    link.addEventListener("click", (event) => {

      /* Desktop : le lien fonctionne normalement */

      if (window.innerWidth >= 1100) {
        return;
      }


      /* Mobile / tablette */

      event.preventDefault();

      const isOpen =
        item.classList.contains("is-open");


      /* Ferme les autres sous-menus */

      megaItems.forEach((otherItem) => {

        if (otherItem !== item) {
          otherItem.classList.remove("is-open");
        }

      });


      /* Ouvre / ferme celui sélectionné */

      item.classList.toggle(
        "is-open",
        !isOpen
      );

    });

  });


  /* ==================================================
     CAROUSEL SERVICES — MOBILE
  ================================================== */

  const servicesTrack =
    document.querySelector(".services-grid__list");

  const servicesPrev =
    document.querySelector(".services-grid__nav--prev");

  const servicesNext =
    document.querySelector(".services-grid__nav--next");


  if (
    servicesTrack &&
    servicesPrev &&
    servicesNext
  ) {

    const getScrollAmount = () => {

      const card =
        servicesTrack.querySelector(".service-row");

      if (!card) return 0;

      const styles =
        getComputedStyle(servicesTrack);

      const gap =
        parseFloat(styles.columnGap) ||
        parseFloat(styles.gap) ||
        0;

      return (
        card.getBoundingClientRect().width +
        gap
      );

    };


    /* Suivant */

    servicesNext.addEventListener("click", () => {

      servicesTrack.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });

    });


    /* Précédent */

    servicesPrev.addEventListener("click", () => {

      servicesTrack.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });

    });


    /* État des boutons */

    const updateButtons = () => {

      const maxScroll =
        servicesTrack.scrollWidth -
        servicesTrack.clientWidth;

      servicesPrev.disabled =
        servicesTrack.scrollLeft <= 5;

      servicesNext.disabled =
        servicesTrack.scrollLeft >= maxScroll - 5;

    };


    servicesTrack.addEventListener(
      "scroll",
      updateButtons
    );

    window.addEventListener(
      "resize",
      updateButtons
    );

    updateButtons();

  }

});


/* ==================================================
   SERVICES GRID — AFFICHER / MASQUER LES SERVICES
================================================== */

document.addEventListener("click", (event) => {

  const toggle =
    event.target.closest(".services-grid__toggle");

  if (!toggle) return;


  const servicesGrid =
    toggle.closest(".services-grid");

  if (!servicesGrid) return;


  const toggleLabel =
    toggle.querySelector(
      ".services-grid__toggle-label"
    );


  const isExpanded =
    servicesGrid.classList.toggle("is-expanded");


  toggle.setAttribute(
    "aria-expanded",
    String(isExpanded)
  );


  if (toggleLabel) {

    toggleLabel.textContent =
      isExpanded
        ? "Réduire"
        : "Voir les 3 autres services";

  }


  /* Si on referme la section */

  if (!isExpanded) {

    const service3 =
      document.querySelector("#service-3");

    if (service3) {

      service3.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }

});