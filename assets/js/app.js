/**
 * app.js
 *
 * Shared UI utilities used on every page: demo banner, toast
 * notifications, confirm dialogs, and safe HTML interpolation.
 * Contains no business logic — pages compose these with DemoStore.
 */

(() => {
  const TOAST_DURATION_MS = 3500;
  const TOAST_EXIT_MS = 200;

  /** Escape a value for safe interpolation into HTML templates. */
  function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Show a transient toast notification.
   * @param {string} message
   * @param {'default'|'danger'} [type]
   */
  function showToast(message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = type === 'danger' ? 'toast is-danger' : 'toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    getToastContainer().appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-leaving');
      setTimeout(() => toast.remove(), TOAST_EXIT_MS);
    }, TOAST_DURATION_MS);
  }

  /**
   * Show a confirm dialog and resolve with the user's choice.
   * @param {object} options
   * @param {string} options.title
   * @param {string} options.message
   * @param {string} [options.confirmLabel]
   * @param {boolean} [options.danger] - Style the confirm button as destructive
   * @returns {Promise<boolean>}
   */
  function confirmDialog({ title, message, confirmLabel = 'Ya', danger = false }) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <h3 id="modalTitle">${escapeHtml(title)}</h3>
          <p>${escapeHtml(message)}</p>
          <div class="actions">
            <button class="btn btn-secondary" data-action="cancel">Batal</button>
            <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirm">${escapeHtml(confirmLabel)}</button>
          </div>
        </div>`;

      function close(result) {
        overlay.remove();
        document.removeEventListener('keydown', onKeydown);
        resolve(result);
      }

      function onKeydown(event) {
        if (event.key === 'Escape') close(false);
      }

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) close(false);
        const action = event.target.closest('[data-action]');
        if (action) close(action.dataset.action === 'confirm');
      });
      document.addEventListener('keydown', onKeydown);

      document.body.appendChild(overlay);
      overlay.querySelector('[data-action="confirm"]').focus();
    });
  }

  /** Inject the "Portfolio Demo" banner at the top of the page. */
  function renderDemoBanner() {
    const banner = document.createElement('div');
    banner.className = 'demo-banner';
    banner.textContent = 'Portfolio Demo — data contoh, disimpan lokal di browser';
    document.body.prepend(banner);
  }

  window.escapeHtml = escapeHtml;
  window.showToast = showToast;
  window.confirmDialog = confirmDialog;

  document.addEventListener('DOMContentLoaded', renderDemoBanner);
})();
