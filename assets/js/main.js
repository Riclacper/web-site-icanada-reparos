const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#site-nav");

function closeMenu() {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("pointerdown", (event) => {
    if (!navigation.classList.contains("is-open")) return;

    const clickedInsideMenu = navigation.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) closeMenu();
  });
}

function setupContinuousCarousel(carousel) {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = viewport?.firstElementChild;

  if (!viewport || !track || track.children.length === 0) return;
  if (carousel.dataset.continuousCarouselReady === "true") return;

  carousel.dataset.continuousCarouselReady = "true";

  const originalItems = [...track.children];

  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");

    clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });

    clone.querySelectorAll("img").forEach((image) => {
      image.alt = "";
    });

    track.appendChild(clone);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const speed = viewport.classList.contains("clients-carousel") ? 28 : 20;

  let loopWidth = 0;
  let lastFrameTime = performance.now();
  let animationFrameId = null;

  function calculateLoopWidth() {
    const firstOriginal = track.children[0];
    const firstClone = track.children[originalItems.length];

    if (!firstOriginal || !firstClone) return;

    loopWidth = firstClone.offsetLeft - firstOriginal.offsetLeft;
  }

  function animate(currentTime) {
    const elapsedSeconds = Math.min((currentTime - lastFrameTime) / 1000, 0.1);
    lastFrameTime = currentTime;

    if (!reduceMotion.matches && !document.hidden && loopWidth > 0) {
      viewport.scrollLeft += speed * elapsedSeconds;

      if (viewport.scrollLeft >= loopWidth) {
        viewport.scrollLeft -= loopWidth;
      }
    }

    animationFrameId = window.requestAnimationFrame(animate);
  }

  calculateLoopWidth();

  const resizeObserver = new ResizeObserver(calculateLoopWidth);
  resizeObserver.observe(track);

  window.addEventListener("load", calculateLoopWidth, { once: true });
  reduceMotion.addEventListener?.("change", () => {
    lastFrameTime = performance.now();
  });

  animationFrameId = window.requestAnimationFrame(animate);

  window.addEventListener("pagehide", () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
    resizeObserver.disconnect();
  });
}

document.querySelectorAll("[data-carousel]").forEach(setupContinuousCarousel);

function setupBackToTopButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Voltar ao topo da página");
  button.setAttribute("title", "Voltar ao topo");
  button.innerHTML = '<span aria-hidden="true">↑</span>';

  document.body.appendChild(button);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateButtonVisibility() {
    button.classList.toggle("is-visible", window.scrollY > 500);
  }

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  });

  window.addEventListener("scroll", updateButtonVisibility, { passive: true });
  updateButtonVisibility();
}

setupBackToTopButton();

const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleSection) return;

      navigationLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${visibleSection.target.id}`,
        );
      });
    },
    {
      rootMargin: "-35% 0px -55%",
      threshold: [0.05, 0.25, 0.5],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function trackInteraction(eventName, element) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    event_category: "engagement",
    event_label: element.textContent.trim().replace(/\s+/g, " "),
    link_url: element.href || "",
  });
}

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    trackInteraction(element.dataset.track, element);
  });
});

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
