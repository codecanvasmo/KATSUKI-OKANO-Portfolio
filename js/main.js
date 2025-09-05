// エントリーポイント：個別モジュールを初期化する
import { initTabs } from './tabs.js';
import { initLightbox } from './lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  initTabs();      // タブ切り替えを有効化
  initLightbox();  // ギャラリーライトボックスを有効化
});