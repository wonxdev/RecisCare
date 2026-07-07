/**
 * pages/student.js
 * Student dashboard: duty schedule, warnings, and evidence submission.
 */

(() => {
  const WARNING_LIMIT = 3;
  const WEEKS_TO_SHOW = 5;
  const DAY_INDEX = { Minggu: 0, Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6 };
  const STATUS_BADGES = {
    present: { class: 'badge-success', label: 'Hadir' },
    absent: { class: 'badge-danger', label: 'Ditolak' },
    pending: { class: 'badge-warning', label: 'Menunggu' },
    missed: { class: 'badge-danger', label: 'Terlewat' },
    upcoming: { class: 'badge-warning', label: 'Jadwal Hari Ini' },
    scheduled: { class: '', label: 'Terjadwal' }
  };

  let user = null;

  function init() {
    user = checkAuth('student');
    if (!user) return;

    const displayName = user.name || user.email.split('@')[0];
    document.getElementById('navUser').textContent = displayName;
    document.getElementById('userName').textContent = displayName;
    document.getElementById('userClass').textContent = user.class || 'Kelas Tidak Ada';
    document.getElementById('piketDay').textContent = user.piket_day || '-';

    document.getElementById('photo').addEventListener('change', previewFile);
    document.getElementById('submitBtn').addEventListener('click', submitEvidence);
    document.getElementById('logoutBtn').addEventListener('click', logout);

    renderScheduleAndWarnings();
  }

  /** Build the last five scheduled duty dates and their submission status. */
  function buildScheduleHistory() {
    const targetIndex = DAY_INDEX[user.piket_day];
    if (targetIndex === undefined) return [];

    const history = DemoStore.attendance.getAll().filter((entry) => entry.user_id === user.id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const items = [];
    for (let week = 0; week < WEEKS_TO_SHOW; week++) {
      const date = new Date();
      date.setDate(date.getDate() - week * 7);
      date.setDate(date.getDate() + (targetIndex - date.getDay()));
      date.setHours(0, 0, 0, 0);

      const match = history.find((entry) => new Date(entry.created_at).toDateString() === date.toDateString());
      let status = 'missed';
      if (match) {
        status = match.status;
      } else if (date.getTime() === today.getTime()) {
        status = 'upcoming';
      } else if (date.getTime() > today.getTime()) {
        status = 'scheduled';
      }
      items.push({ date, status, match });
    }
    return items;
  }

  function renderScheduleAndWarnings() {
    const items = buildScheduleHistory();
    const warnings = items.filter((item) => item.status === 'missed' || item.status === 'absent').length;

    const warningEl = document.getElementById('warningCount');
    warningEl.textContent = `${warnings}/${WARNING_LIMIT}`;
    warningEl.classList.toggle('is-danger', warnings >= WARNING_LIMIT);

    const listEl = document.getElementById('scheduleList');
    if (items.length === 0) {
      listEl.innerHTML = '<div class="empty-state">Belum ada jadwal piket untuk akun ini.</div>';
      return;
    }

    listEl.innerHTML = items.map((item) => {
      const badge = STATUS_BADGES[item.status] || STATUS_BADGES.pending;
      const note = item.match && item.match.note
        ? `<div class="list-row-meta">Catatan guru: ${escapeHtml(item.match.note)}</div>`
        : '';
      return `
        <div class="list-row">
          <div>
            <div class="list-row-title">${formatDate(item.date)}</div>
            ${note}
          </div>
          <span class="badge ${badge.class}">${badge.label}</span>
        </div>`;
    }).join('');
  }

  function previewFile() {
    const file = document.getElementById('photo').files[0];
    if (!file) return;
    document.getElementById('preview').hidden = false;
    document.getElementById('filename').textContent = file.name;
    const img = document.getElementById('previewImg');
    img.hidden = false;
    img.src = URL.createObjectURL(file);
  }

  function submitEvidence() {
    const fileInput = document.getElementById('photo');
    if (!fileInput.files[0]) {
      showToast('Pilih foto terlebih dahulu.', 'danger');
      return;
    }

    const button = document.getElementById('submitBtn');
    button.disabled = true;
    button.textContent = 'Mengirim...';

    DemoStore.attendance.markPresent(user.id, { status: 'pending', photo_name: fileInput.files[0].name });
    showToast('Laporan piket berhasil dikirim.');

    button.disabled = false;
    button.textContent = 'Kirim Bukti';
    renderScheduleAndWarnings();
  }

  init();
})();
