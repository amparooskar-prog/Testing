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

const feed=document.querySelector('#facebook-feed');
if(feed){let previousWidth=0;const resizeFeed=()=>{const width=Math.max(180,Math.min(500,Math.floor(feed.parentElement.clientWidth-2)));if(width===previousWidth)return;previousWidth=width;const url=new URL(feed.src);url.searchParams.set('width',String(width));feed.src=url.href;};resizeFeed();new ResizeObserver(resizeFeed).observe(feed.parentElement);}
