/**
 * pages/teacher.js
 * Shared dashboard for teacher, class leader, and admin roles:
 * submission review, CSV export, and (admin) user management.
 */

(() => {
  const PAGE_COPY = {
    admin: {
      title: 'Dashboard Admin',
      subtitle: 'Kelola pengguna dan pantau semua data demo.'
    },
    classleader: {
      title: 'Dashboard Ketua Kelas',
      subtitle: 'Pantau status piket kelas Anda hari ini.'
    },
    teacher: {
      title: 'Dashboard Guru',
      subtitle: 'Verifikasi laporan piket harian dan kelola tugas.'
    }
  };
  const STATUS_BADGES = {
    present: { class: 'badge-success', label: 'Hadir' },
    absent: { class: 'badge-danger', label: 'Ditolak' },
    pending: { class: 'badge-warning', label: 'Menunggu' }
  };

  let currentUser = null;
  let cachedData = [];
  let editingUserId = null;

  function init() {
    currentUser = checkAuth('teacher');
    if (!currentUser) return;

    document.getElementById('navUser').textContent = currentUser.name || currentUser.email;
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('dayFilter').addEventListener('change', renderAttendance);
    document.getElementById('exportBtn').addEventListener('click', exportCsv);

    const copy = PAGE_COPY[currentUser.role] || PAGE_COPY.teacher;
    document.getElementById('pageTitle').textContent = copy.title;
    document.getElementById('pageSubtitle').textContent = copy.subtitle;

    renderRolePanel();
    renderAttendance();
  }

  // ============================================================================
  // Role panels
  // ============================================================================

  function renderRolePanel() {
    const panel = document.getElementById('rolePanel');
    if (currentUser.role === 'classleader') {
      panel.innerHTML = buildClassLeaderPanel();
    } else if (currentUser.role === 'admin') {
      panel.innerHTML = buildAdminPanel();
      bindAdminPanel();
      renderUsers();
    } else {
      panel.innerHTML = '';
    }
  }

  function buildClassLeaderPanel() {
    const duties = DemoStore.schedule.getToday(currentUser.class);
    const reportCount = DemoStore.attendance.getAll().filter((entry) => {
      const student = DemoStore.users.get(entry.user_id);
      return student && student.class === currentUser.class;
    }).length;

    const dutyRows = duties.length === 0
      ? '<div class="empty-state">Tidak ada tugas piket hari ini.</div>'
      : duties.map((item) => `
          <div class="list-row">
            <div class="list-row-title">${escapeHtml(item.duty)}</div>
            <span class="list-row-meta">${escapeHtml(item.time)}</span>
          </div>`).join('');

    return `
      <div class="card">
        <h3>Status Piket Hari Ini</h3>
        <span class="card-hint">Laporan masuk untuk ${escapeHtml(currentUser.class)}: ${reportCount}</span>
        ${dutyRows}
      </div>`;
  }

  function buildAdminPanel() {
    return `
      <div class="card">
        <h3>Kelola Pengguna</h3>
        <span class="card-hint">Tambah, ubah, atau hapus akun demo.</span>
        <div class="form-grid">
          <div class="field field-full">
            <label for="formName">Nama</label>
            <input id="formName" placeholder="Nama pengguna">
          </div>
          <div class="field field-full">
            <label for="formEmail">Email</label>
            <input id="formEmail" type="email" placeholder="nama@sekolah.sch.id">
          </div>
          <div class="field">
            <label for="formRole">Role</label>
            <select id="formRole">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="classleader">Class Leader</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="field">
            <label for="formClass">Kelas</label>
            <input id="formClass" placeholder="XII B">
          </div>
          <div class="field field-full">
            <label for="formPiketDay">Hari Piket</label>
            <input id="formPiketDay" placeholder="Kamis">
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-secondary" id="cancelEditBtn" hidden>Batal</button>
          <button class="btn btn-primary" id="saveUserBtn">Tambah Pengguna</button>
        </div>
        <div id="userList" style="margin-top:20px;"></div>
      </div>`;
  }

  function bindAdminPanel() {
    document.getElementById('saveUserBtn').addEventListener('click', saveUser);
    document.getElementById('cancelEditBtn').addEventListener('click', () => setEditingUser(null));
    document.getElementById('userList').addEventListener('click', onUserListClick);
  }

  function onUserListClick(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === 'edit') setEditingUser(id);
    if (action === 'delete') deleteUser(id);
  }

  function renderUsers() {
    const users = DemoStore.users.getAll();
    document.getElementById('userList').innerHTML = users.map((user) => `
      <div class="list-row">
        <div>
          <div class="list-row-title">${escapeHtml(user.name || user.email)}</div>
          <div class="list-row-meta">${escapeHtml(user.role)} • ${escapeHtml(user.class || '-')}</div>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-ghost btn-sm" data-action="edit" data-id="${user.id}">Edit</button>
          <button class="btn btn-ghost btn-sm" data-action="delete" data-id="${user.id}">Hapus</button>
        </div>
      </div>`).join('');
  }

  /** Enter or leave edit mode; null clears the form back to "create". */
  function setEditingUser(id) {
    const user = id ? DemoStore.users.get(id) : null;
    editingUserId = user ? id : null;

    document.getElementById('formName').value = user ? user.name || '' : '';
    document.getElementById('formEmail').value = user ? user.email || '' : '';
    document.getElementById('formRole').value = user ? user.role || 'student' : 'student';
    document.getElementById('formClass').value = user ? user.class || '' : '';
    document.getElementById('formPiketDay').value = user ? user.piket_day || '' : '';

    document.getElementById('saveUserBtn').textContent = editingUserId ? 'Perbarui Pengguna' : 'Tambah Pengguna';
    document.getElementById('cancelEditBtn').hidden = !editingUserId;
  }

  function saveUser() {
    const payload = {
      name: document.getElementById('formName').value.trim(),
      email: document.getElementById('formEmail').value.trim(),
      role: document.getElementById('formRole').value,
      class: document.getElementById('formClass').value.trim(),
      piket_day: document.getElementById('formPiketDay').value.trim()
    };
    if (!payload.name || !payload.email) {
      showToast('Isi nama dan email terlebih dahulu.', 'danger');
      return;
    }

    if (editingUserId) {
      DemoStore.users.update(editingUserId, payload);
      showToast('Pengguna berhasil diperbarui.');
    } else {
      DemoStore.users.create({ ...payload, password: 'demo123', moving_subjects: [] });
      showToast('Pengguna berhasil ditambahkan.');
    }
    setEditingUser(null);
    renderUsers();
  }

  async function deleteUser(id) {
    const user = DemoStore.users.get(id);
    const confirmed = await confirmDialog({
      title: 'Hapus Pengguna',
      message: `Hapus ${user ? user.name || user.email : 'pengguna ini'} dari data demo?`,
      confirmLabel: 'Hapus',
      danger: true
    });
    if (!confirmed) return;

    DemoStore.users.delete(id);
    if (editingUserId === id) setEditingUser(null);
    showToast('Pengguna dihapus.');
    renderUsers();
  }

  // ============================================================================
  // Attendance review
  // ============================================================================

  function getFilteredAttendance() {
    const dayFilter = document.getElementById('dayFilter').value;
    const userMap = Object.fromEntries(DemoStore.users.getAll().map((user) => [user.id, user]));
    const merged = DemoStore.attendance.getAll()
      .map((entry) => ({ ...entry, profile: userMap[entry.user_id] || {} }));
    return dayFilter === 'all' ? merged : merged.filter((item) => item.profile.piket_day === dayFilter);
  }

  function renderAttendance() {
    cachedData = getFilteredAttendance();

    const listEl = document.getElementById('list');
    if (cachedData.length === 0) {
      listEl.innerHTML = '<div class="empty-state">Tidak ada laporan untuk filter ini.</div>';
      return;
    }

    listEl.innerHTML = cachedData.map((entry) => {
      const badge = STATUS_BADGES[entry.status] || STATUS_BADGES.pending;
      return `
        <div class="card" style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:14px;">
            <div>
              <div class="list-row-title">${escapeHtml(entry.profile.name || entry.profile.email || 'Siswa')}</div>
              <div class="list-row-meta">${escapeHtml(entry.profile.class || '-')} • ${formatDate(entry.created_at)}, ${formatTime(entry.created_at)}</div>
            </div>
            <span class="badge ${badge.class}">${badge.label}</span>
          </div>
          <div class="list-row" style="margin-bottom:14px;">
            <span class="list-row-meta">Bukti dukung</span>
            <span class="list-row-title">${escapeHtml(entry.photo_name || 'Tidak ada')}</span>
          </div>
          <div class="field">
            <label for="note_${entry.id}">Catatan Guru</label>
            <input type="text" id="note_${entry.id}" value="${escapeHtml(entry.note || '')}" placeholder="Beri feedback...">
          </div>
          <div class="actions">
            <button class="btn btn-success" data-review="present" data-id="${entry.id}">Terima</button>
            <button class="btn btn-danger" data-review="absent" data-id="${entry.id}">Tolak</button>
          </div>
        </div>`;
    }).join('');
  }

  document.getElementById('list').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-review]');
    if (!button) return;
    const { review, id } = button.dataset;
    const note = document.getElementById(`note_${id}`).value;
    DemoStore.attendance.update(id, { status: review, note });
    showToast(review === 'present' ? 'Laporan diterima.' : 'Laporan ditolak.');
    renderAttendance();
  });

  // ============================================================================
  // CSV export
  // ============================================================================

  function toCsvValue(value) {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function exportCsv() {
    if (cachedData.length === 0) {
      showToast('Belum ada data untuk diekspor.', 'danger');
      return;
    }
    const header = ['Tanggal', 'Kelas', 'HariPiket', 'Status', 'Catatan', 'Foto'];
    const rows = cachedData.map((entry) => [
      entry.created_at,
      entry.profile.class,
      entry.profile.piket_day,
      entry.status,
      entry.note,
      entry.photo_name
    ].map(toCsvValue).join(','));

    const blob = new Blob([[header.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'RecisCare_Laporan.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  init();
})();
