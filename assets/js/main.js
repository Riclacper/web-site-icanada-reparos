const interactionsStylesheet = document.createElement("link");
interactionsStylesheet.rel = "stylesheet";
interactionsStylesheet.href = "./assets/css/interactions.css";
interactionsStylesheet.dataset.interactionsStyles = "true";
document.head.appendChild(interactionsStylesheet);

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

  function createClone(item) {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");

    clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });

    clone.querySelectorAll("img").forEach((image) => {
      image.alt = "";
    });

    return clone;
  }

  const beforeFragment = document.createDocumentFragment();
  const afterFragment = document.createDocumentFragment();

  originalItems.forEach((item) => {
    beforeFragment.appendChild(createClone(item));
    afterFragment.appendChild(createClone(item));
  });

  track.prepend(beforeFragment);
  track.append(afterFragment);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const speed = viewport.classList.contains("clients-carousel") ? 28 : 20;
  const middleStartIndex = originalItems.length;

  let loopWidth = 0;
  let initialized = false;
  let lastFrameTime = performance.now();
  let animationFrameId = null;
  let resumeTimer = null;
  let scrollSettleTimer = null;
  let userPaused = false;
  let mouseDragging = false;
  let touchActive = false;
  let activePointerId = null;
  let startX = 0;
  let startScrollLeft = 0;
  let autoScrollPosition = 0;

  function calculateLoopWidth() {
    const firstClone = track.children[0];
    const firstOriginal = track.children[middleStartIndex];

    if (!firstClone || !firstOriginal) return;

    loopWidth = firstOriginal.offsetLeft - firstClone.offsetLeft;

    if (!initialized && loopWidth > 0) {
      autoScrollPosition = loopWidth;
      viewport.scrollLeft = autoScrollPosition;
      initialized = true;
    }
  }

  function normalizeScrollPosition() {
    if (loopWidth <= 0) return;

    autoScrollPosition = viewport.scrollLeft;

    if (autoScrollPosition >= loopWidth * 2) {
      autoScrollPosition -= loopWidth;
      viewport.scrollLeft = autoScrollPosition;
    } else if (autoScrollPosition < loopWidth * 0.5) {
      autoScrollPosition += loopWidth;
      viewport.scrollLeft = autoScrollPosition;
    }
  }

  function pauseAutoplay() {
    userPaused = true;
    autoScrollPosition = viewport.scrollLeft;
    window.clearTimeout(resumeTimer);
  }

  function resumeAutoplayAfter(delay = 850) {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      normalizeScrollPosition();
      autoScrollPosition = viewport.scrollLeft;
      userPaused = false;
      lastFrameTime = performance.now();
    }, delay);
  }

  function animate(currentTime) {
    const elapsedSeconds = Math.min((currentTime - lastFrameTime) / 1000, 0.1);
    lastFrameTime = currentTime;

    if (
      initialized &&
      !reduceMotion.matches &&
      !document.hidden &&
      !userPaused &&
      loopWidth > 0
    ) {
      autoScrollPosition += speed * elapsedSeconds;

      if (autoScrollPosition >= loopWidth * 2) {
        autoScrollPosition -= loopWidth;
      } else if (autoScrollPosition < loopWidth * 0.5) {
        autoScrollPosition += loopWidth;
      }

      viewport.scrollLeft = autoScrollPosition;
    }

    animationFrameId = window.requestAnimationFrame(animate);
  }

  function beginMouseDrag(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    pauseAutoplay();
    mouseDragging = true;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startScrollLeft = viewport.scrollLeft;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture?.(event.pointerId);
  }

  function moveMouseDrag(event) {
    if (!mouseDragging || event.pointerId !== activePointerId) return;

    event.preventDefault();
    viewport.scrollLeft = startScrollLeft - (event.clientX - startX);
    autoScrollPosition = viewport.scrollLeft;
  }

  function endMouseDrag(event) {
    if (!mouseDragging) return;
    if (event?.pointerId !== undefined && event.pointerId !== activePointerId) return;

    if (activePointerId !== null && viewport.hasPointerCapture?.(activePointerId)) {
      viewport.releasePointerCapture(activePointerId);
    }

    mouseDragging = false;
    activePointerId = null;
    viewport.classList.remove("is-dragging");
    normalizeScrollPosition();
    resumeAutoplayAfter(750);
  }

  viewport.addEventListener("pointerdown", beginMouseDrag);
  viewport.addEventListener("pointermove", moveMouseDrag, { passive: false });
  viewport.addEventListener("pointerup", endMouseDrag);
  viewport.addEventListener("pointercancel", endMouseDrag);
  viewport.addEventListener("lostpointercapture", endMouseDrag);

  viewport.addEventListener(
    "touchstart",
    () => {
      touchActive = true;
      pauseAutoplay();
    },
    { passive: true },
  );

  function finishTouchInteraction() {
    touchActive = false;
    window.clearTimeout(scrollSettleTimer);
    scrollSettleTimer = window.setTimeout(() => {
      normalizeScrollPosition();
      resumeAutoplayAfter(750);
    }, 180);
  }

  viewport.addEventListener("touchend", finishTouchInteraction, { passive: true });
  viewport.addEventListener("touchcancel", finishTouchInteraction, { passive: true });

  viewport.addEventListener(
    "scroll",
    () => {
      if (userPaused || mouseDragging || touchActive) {
        autoScrollPosition = viewport.scrollLeft;
      }

      if (!userPaused || mouseDragging || touchActive) return;

      window.clearTimeout(scrollSettleTimer);
      scrollSettleTimer = window.setTimeout(() => {
        normalizeScrollPosition();
        resumeAutoplayAfter(750);
      }, 180);
    },
    { passive: true },
  );

  calculateLoopWidth();

  const resizeObserver = new ResizeObserver(calculateLoopWidth);
  resizeObserver.observe(track);

  window.addEventListener("load", calculateLoopWidth, { once: true });
  reduceMotion.addEventListener?.("change", () => {
    lastFrameTime = performance.now();
    autoScrollPosition = viewport.scrollLeft;
  });

  animationFrameId = window.requestAnimationFrame(animate);

  window.addEventListener("pagehide", () => {
    window.clearTimeout(resumeTimer);
    window.clearTimeout(scrollSettleTimer);

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

function setupFloatingWhatsAppIcon() {
  const button = document.querySelector(".floating-whatsapp");
  if (!button) return;

  button.setAttribute("title", "Chamar no WhatsApp");
  button.innerHTML = `
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
    >
      <path
        fill="currentColor"
        d="M19.11 17.21c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z"
      />
      <path
        fill="currentColor"
        d="M16.04 3.2c-7.05 0-12.78 5.73-12.78 12.78 0 2.25.59 4.45 1.7 6.38L3.15 28.8l6.59-1.73a12.75 12.75 0 0 0 6.3 1.61h.01c7.04 0 12.78-5.73 12.78-12.78S23.09 3.2 16.04 3.2zm0 23.32h-.01c-1.91 0-3.78-.51-5.4-1.48l-.39-.23-3.91 1.03 1.04-3.81-.25-.4a10.58 10.58 0 0 1-1.63-5.65c0-5.83 4.74-10.57 10.57-10.57 2.82 0 5.47 1.1 7.47 3.1 2 2 3.1 4.65 3.1 7.47 0 5.83-4.75 10.57-10.59 10.57z"
      />
    </svg>
  `;
}

setupFloatingWhatsAppIcon();

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

  const label =
    element.getAttribute("aria-label") ||
    element.getAttribute("title") ||
    element.textContent.trim().replace(/\s+/g, " ");

  window.gtag("event", eventName, {
    event_category: "engagement",
    event_label: label,
    link_url: element.href || "",
  });
}

function setupDeveloperCredit() {
  const footerCopy = document.querySelector(".footer-copy");
  if (!footerCopy || footerCopy.querySelector(".footer-credit")) return;

  const credit = document.createElement("p");
  credit.className = "footer-credit";
  credit.style.marginTop = "6px";

  const link = document.createElement("a");
  link.href = "https://portfolio-ricardo-lacerda.vercel.app/";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Ricardo Lacerda";
  link.dataset.track = "developer_portfolio";
  link.setAttribute("aria-label", "Acessar o portfólio de Ricardo Lacerda");
  link.style.color = "#ffffff";
  link.style.fontWeight = "800";
  link.style.textDecoration = "underline";
  link.style.textUnderlineOffset = "3px";

  credit.append("Desenvolvido por ", link);
  footerCopy.appendChild(credit);
}

setupDeveloperCredit();

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    trackInteraction(element.dataset.track, element);
  });
});

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
