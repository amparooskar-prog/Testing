const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navigation?.classList.toggle("open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Individual public posts work where Facebook's full Page timeline is unavailable.
document.querySelectorAll('.facebook-post-frame').forEach(frame => {
  const viewport = frame.parentElement;
  let lastWidth = 0;
  const resize = () => {
    const available = Math.floor(viewport.clientWidth);
    if (!available) return;
    const width = Math.max(350, Math.min(500, available));
    const scale = Math.min(1, available / width);
    frame.style.width = width + 'px';
    frame.style.maxWidth = 'none';
    frame.style.transformOrigin = 'top left';
    frame.style.transform = 'scale(' + scale + ')';
    viewport.style.height = (Number(frame.dataset.height) * scale) + 'px';
    if (width !== lastWidth) {
      const url = new URL(frame.src);
      url.searchParams.set('width', String(width));
      if (url.href !== frame.src) frame.src = url.href;
      lastWidth = width;
    }
  };
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(viewport);
  else window.addEventListener('resize', resize);
});

const track = document.querySelector('#post-track');
if (track) {
  const cards = [...track.querySelectorAll('.facebook-post')];
  const previous = document.querySelector('#post-prev');
  const next = document.querySelector('#post-next');
  const position = document.querySelector('#post-position');
  let current = 0;
  const sync = () => {
    const left = track.getBoundingClientRect().left;
    current = cards.reduce((best, card, index) => Math.abs(card.getBoundingClientRect().left-left) < Math.abs(cards[best].getBoundingClientRect().left-left) ? index : best, 0);
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
    position.textContent = (current + 1) + ' / ' + cards.length;
  };
  const go = (index) => {
    index = Math.max(0, Math.min(cards.length - 1, index));
    const offset = cards[index].getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({left:offset,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };
  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  track.addEventListener('scroll', sync, {passive:true});
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault();
      go(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length-1 : current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  window.addEventListener('resize', sync);
  sync();
}
