/**
 * pages/login.js
 * Login page: demo role selection and demo data reset.
 */

(() => {
  document.getElementById('loginBtn').addEventListener('click', () => {
    const role = document.getElementById('roleSelect').value;
    enterDemo(role);
  });

  document.getElementById('resetLink').addEventListener('click', async (event) => {
    event.preventDefault();
    const confirmed = await confirmDialog({
      title: 'Reset Data Demo',
      message: 'Semua perubahan akan dihapus dan data demo dikembalikan ke kondisi awal.',
      confirmLabel: 'Reset',
      danger: true
    });
    if (confirmed) resetDemo();
  });
})();
