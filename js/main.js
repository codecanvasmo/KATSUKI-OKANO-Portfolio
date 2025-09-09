/*
  シンプルなタブ＋ライトボックス初期化。モジュールとして読み込まれることを想定。
  既に別実装がある場合は上書きに注意してください。
*/
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  if (!tabs.length || !panels.length) return;

  function showPanelById(id) {
    panels.forEach(p => {
      const active = p.id === id;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    tabs.forEach(t => {
      const active = t.getAttribute('data-tab') === id;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  // 初期表示：is-active が付いている panel があればそれを、なければ最初の panel を表示
  const initialPanel = panels.find(p => p.classList.contains('is-active')) || panels[0];
  if (initialPanel) showPanelById(initialPanel.id);

  tabs.forEach(tab => {
    if (tab.__bound_tab__) return;
    tab.__bound_tab__ = true;
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-tab');
      if (!id) return;
      showPanelById(id);
      // フォーカス管理（アクセシビリティ）
      tab.focus();
    });
  });
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    if (link.__bound_lb__) return;
    link.__bound_lb__ = true;
    link.addEventListener('click', e => {
      e.preventDefault();
      if (!img || !lb) return;
      img.src = link.href;
      img.alt = link.querySelector('img')?.alt || '';
      title.textContent = link.getAttribute('data-title') || '';
      lb.hidden = false;
      lb.focus();
    });
  });
  lb.querySelector('.lightbox-close')?.addEventListener('click', () => lb.hidden = true);
  lb.addEventListener('click', e => { if (e.target === lb) lb.hidden = true; });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });
}

document.addEventListener('DOMContentLoaded', () => {
  try { initTabs(); } catch (e) { console.error('initTabs error', e); }
  try { initLightbox(); } catch (e) { console.error('initLightbox error', e); }
});