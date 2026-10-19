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
