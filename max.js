/* Кнопка «Написать в MAX»: копирует сообщение и открывает чат, если задана ссылка (data-max на body). Без ссылки подсказывает найти контакт по номеру. */
(() => {
  const link = (document.body.dataset.max || "").trim();
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-max-btn]"); if (!a) return;
    e.preventDefault();
    // подсказка показывается сразу, копирование не ждём (в некоторых браузерах оно может зависнуть)
    const box = a.closest(".s-contacts, .s-widget");
    document.querySelectorAll("[data-max-note]").forEach((n) => (n.hidden = true));
    const note = (box && box.querySelector("[data-max-note]")) || document.querySelector("[data-max-note]");
    if (note) { note.hidden = false; clearTimeout(note._t); note._t = setTimeout(() => (note.hidden = true), 8000); }
    const bubble = document.querySelector("[data-s-bubble]");
    const text = (bubble && bubble.textContent.trim()) || "Здравствуйте! Пишу с сайта «Автосервис на Войкова».";
    try { navigator.clipboard.writeText(text).catch(() => {}); } catch (_) {}
    if (link) window.open(link, "_blank", "noopener");
  });
})();