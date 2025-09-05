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

// タブ切り替え機能
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {
    // すべてのタブ・パネルのアクティブ状態を解除
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.remove('is-active');
      p.setAttribute('aria-hidden', 'true');
    });

    // クリックされたタブと対応パネルをアクティブ化
    tab.classList.add('is-active');
    const target = tab.getAttribute('data-tab');
    const panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('is-active');
      panel.setAttribute('aria-hidden', 'false');
    }
  });
});

// ギャラリー画像クリックでライトボックス表示
document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // 通常のリンク遷移を防止

    // ライトボックス要素を取得
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');

    // 画像とタイトルをセット
    img.src = link.href;
    img.alt = link.querySelector('img').alt;
    title.textContent = link.getAttribute('data-title') || '';

    // ライトボックス表示
    lightbox.hidden = false;
  });
});

// ライトボックス閉じるボタン
document.querySelector('.lightbox-close').addEventListener('click', function () {
  document.getElementById('lightbox').hidden = true;
});

// ライトボックス外クリックで閉じる
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) {
    this.hidden = true;
  }
});
