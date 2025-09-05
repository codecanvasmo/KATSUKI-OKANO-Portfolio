// タブ切り替えを提供するモジュール（index と pages で再利用）
export function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
      // 全タブ・全パネルの状態をリセット
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
      document.querySelectorAll('.panel').forEach(p => { p.classList.remove('is-active'); p.setAttribute('aria-hidden', 'true'); });

      // クリックされたタブをアクティブ化し、対応パネルを表示
      tab.classList.add('is-active');
      const target = tab.getAttribute('data-tab');
      const panel = document.getElementById(target);
      if (panel) { panel.classList.add('is-active'); panel.setAttribute('aria-hidden', 'false'); }
    });
  });
}