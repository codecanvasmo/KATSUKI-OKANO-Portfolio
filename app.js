// タブ切替
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.tab;
    tabs.forEach(b => b.classList.toggle("is-active", b === btn));
    panels.forEach(p => {
      const active = p.id === id;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-hidden", String(!active));
    });
    btn.setAttribute("aria-selected", "true");
    tabs.forEach(b => { if (b !== btn) b.setAttribute("aria-selected", "false"); });
    history.replaceState(null, "", `#${id}`); // URLハッシュ更新（直リンク用）
  });
});

// ハッシュで直リンク: /#art など
const hash = location.hash.replace("#","");
if (hash) {
  const target = document.querySelector(`.tab[data-tab="${hash}"]`);
  if (target) target.click();
}

// シンプルLightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbTitle = document.getElementById("lightbox-title");
const lbClose = document.querySelector(".lightbox-close");

document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-lightbox]");
  if (!a) return;
  e.preventDefault();
  lbImg.src = a.getAttribute("href");
  lbTitle.textContent = a.getAttribute("data-title") || "";
  lb.hidden = false;
});

lbClose.addEventListener("click", () => { lb.hidden = true; lbImg.src = ""; });
lb.addEventListener("click", (e) => {
  if (e.target === lb) { lb.hidden = true; lbImg.src = ""; }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { lb.hidden = true; lbImg.src = ""; }
});
