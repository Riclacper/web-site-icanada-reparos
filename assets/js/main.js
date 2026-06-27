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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupCarousel(carousel) {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = viewport?.firstElementChild;
  const previousButton = carousel.parentElement?.querySelector("[data-carousel-prev]");
  const nextButton = carousel.parentElement?.querySelector("[data-carousel-next]");
  const toggleButton = carousel.parentElement?.querySelector("[data-carousel-toggle]");

  if (!viewport || !track || track.children.length === 0) return;

  const items = [...track.children];
  const intervalDuration = Number(carousel.dataset.interval) || 5000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let currentIndex = 0;
  let intervalId = null;
  let manuallyPaused = reduceMotion.matches;
  let temporarilyPaused = false;

  function itemOffset(index) {
    const item = items[index];
    return item ? item.offsetLeft - track.offsetLeft : 0;
  }

  function goTo(index) {
    currentIndex = (index + items.length) % items.length;
    viewport.scrollTo({
      left: itemOffset(currentIndex),
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  }

  function stopAutoplay() {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (manuallyPaused || temporarilyPaused || document.hidden || reduceMotion.matches) {
      return;
    }

    intervalId = window.setInterval(() => {
      goTo(currentIndex + 1);
    }, intervalDuration);
  }

  function updateToggleButton() {
    if (!toggleButton) return;

    toggleButton.textContent = manuallyPaused ? "Reproduzir" : "Pausar";
    toggleButton.setAttribute("aria-pressed", String(manuallyPaused));
  }

  previousButton?.addEventListener("click", () => {
    goTo(currentIndex - 1);
    startAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    goTo(currentIndex + 1);
    startAutoplay();
  });

  toggleButton?.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    updateToggleButton();
    startAutoplay();
  });

  viewport.addEventListener("mouseenter", () => {
    temporarilyPaused = true;
    stopAutoplay();
  });

  viewport.addEventListener("mouseleave", () => {
    temporarilyPaused = false;
    startAutoplay();
  });

  viewport.addEventListener("focusin", () => {
    temporarilyPaused = true;
    stopAutoplay();
  });

  viewport.addEventListener("focusout", () => {
    temporarilyPaused = false;
    startAutoplay();
  });

  viewport.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(viewport.carouselScrollTimer);
      viewport.carouselScrollTimer = window.setTimeout(() => {
        const closestIndex = items.reduce(
          (bestIndex, item, index) => {
            const bestDistance = Math.abs(itemOffset(bestIndex) - viewport.scrollLeft);
            const currentDistance = Math.abs(itemOffset(index) - viewport.scrollLeft);
            return currentDistance < bestDistance ? index : bestIndex;
          },
          0,
        );

        currentIndex = closestIndex;
      }, 100);
    },
    { passive: true },
  );

  document.addEventListener("visibilitychange", startAutoplay);
  reduceMotion.addEventListener?.("change", () => {
    manuallyPaused = reduceMotion.matches;
    updateToggleButton();
    startAutoplay();
  });

  updateToggleButton();
  startAutoplay();
}

document.querySelectorAll("[data-carousel]").forEach(setupCarousel);

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
