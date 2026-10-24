(() => {
  const banner = document.querySelector("[data-relocation-banner]");
  const message = banner?.querySelector("[data-relocation-message]");
  if (!banner || !message) return;

  // Horário de Recife (UTC−03:00), independente do fuso do visitante.
  const startsAt = Date.parse("2026-10-24T00:00:00-03:00");
  const openingDay = Date.parse("2026-10-26T00:00:00-03:00");
  const opensAt = Date.parse("2026-10-26T09:00:00-03:00");
  const endsAt = Date.parse("2026-11-02T00:00:00-03:00");
  const boundaries = [startsAt, openingDay, opensAt, endsAt];
  let timer;

  function updateBanner() {
    window.clearTimeout(timer);
    const now = Date.now();
    const visible = now >= startsAt && now < endsAt;

    if (visible) {
      let text = "Segunda-feira, 26/10: começamos no novo endereço!";
      if (now >= opensAt) {
        text = "Já estamos atendendo no novo endereço. Confira!";
      } else if (now >= openingDay) {
        text = "É hoje! Atendimento no novo endereço a partir das 09h.";
      }
      if (message.textContent !== text) message.textContent = text;
    }

    banner.hidden = !visible;

    // Atualiza também páginas que permanecerem abertas durante a mudança.
    const nextBoundary = boundaries.find((boundary) => boundary > now);
    if (nextBoundary !== undefined) {
      timer = window.setTimeout(
        updateBanner,
        Math.min(nextBoundary - now + 50, 2147483647),
      );
    }
  }

  window.addEventListener("pageshow", updateBanner);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateBanner();
  });

  updateBanner();
})();
