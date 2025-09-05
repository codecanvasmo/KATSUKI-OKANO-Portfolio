// シンプルなライトボックス初期化（画像拡大表示）
export function initLightbox() {
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // 通常のリンク遷移を止める

      const lightbox = document.getElementById('lightbox');
      const img = document.getElementById('lightbox-img');
      const title = document.getElementById('lightbox-title');

      // 画像とタイトルをセットして表示
      img.src = link.href;
      img.alt = link.querySelector('img')?.alt || '';
      title.textContent = link.getAttribute('data-title') || '';
      lightbox.hidden = false;
    });
  });

  // 閉じるボタン
  document.querySelector('.lightbox-close')?.addEventListener('click', () => document.getElementById('lightbox').hidden = true);

  // 背景クリックで閉じる
  document.getElementById('lightbox')?.addEventListener('click', function (e) { if (e.target === this) this.hidden = true; });
}