(() => {
  const STORAGE_KEY = 'reciscare-demo-db';
  const ACTIVE_ROLE_KEY = 'reciscare-demo-role';
  const ACTIVE_USER_KEY = 'reciscare-demo-user';
  const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  function createId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function formatDate(value) {
    const date = new Date(value);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function formatTime(value) {
    const date = new Date(value);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  function getOffsetDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  }

  function buildSeedData() {
    const admin = {
      id: 'admin-demo',
      email: 'admin@reciscare.demo',
      password: 'admin123',
      role: 'admin',
      name: 'Demo Administrator',
      class: 'Admin',
      piket_day: 'Senin',
      moving_subjects: [],
      created_at: new Date().toISOString()
    };

    const teacher = {
      id: 'teacher-demo',
      email: 'teacher@reciscare.demo',
      password: 'teacher123',
      role: 'teacher',
      name: 'Demo Teacher',
      class: 'Guru',
      piket_day: 'Rabu',
      moving_subjects: [],
      created_at: new Date().toISOString()
    };

    const classLeader = {
      id: 'classleader-demo',
      email: 'leader@reciscare.demo',
      password: 'leader123',
      role: 'classleader',
      name: 'Demo Class Leader',
      class: 'XII B',
      piket_day: 'Kamis',
      moving_subjects: [],
      created_at: new Date().toISOString()
    };

    const studentA = {
      id: 'student-a',
      email: 'siswaa@reciscare.demo',
      password: 'student123',
      role: 'student',
      name: 'Demo Student A',
      class: 'XII B',
      piket_day: 'Kamis',
      moving_subjects: ['Informatika', 'Fisika', 'Bahasa Inggris Minat', 'Ekonomi'],
      created_at: new Date().toISOString()
    };

    const studentB = {
      id: 'student-b',
      email: 'siswab@reciscare.demo',
      password: 'student123',
      role: 'student',
      name: 'Demo Student B',
      class: 'XII C',
      piket_day: 'Jumat',
      moving_subjects: ['Biologi', 'Sastra Indonesia'],
      created_at: new Date().toISOString()
    };

    const users = [admin, teacher, classLeader, studentA, studentB];

    const schedule = [
      { id: 'sched-1', day: 'Senin', class: 'XII B', duty: 'Membersihkan ruang kelas', time: '07:00' },
      { id: 'sched-2', day: 'Selasa', class: 'XII B', duty: 'Menyapu lorong', time: '07:15' },
      { id: 'sched-3', day: 'Rabu', class: 'XII B', duty: 'Membersihkan laboratorium', time: '07:00' },
      { id: 'sched-4', day: 'Kamis', class: 'XII B', duty: 'Membersihkan toilet', time: '07:05' },
      { id: 'sched-5', day: 'Jumat', class: 'XII B', duty: 'Mengatur taman', time: '07:10' },
      { id: 'sched-6', day: 'Senin', class: 'XII C', duty: 'Membersihkan perpustakaan', time: '07:00' }
    ];

    const attendance = [
      { id: 'att-1', user_id: 'student-a', created_at: getOffsetDate(-14), status: 'present', note: 'Tepat waktu', photo_name: 'foto-1.jpg' },
      { id: 'att-2', user_id: 'student-a', created_at: getOffsetDate(-7), status: 'absent', note: 'Tidak hadir', photo_name: 'foto-2.jpg' },
      { id: 'att-3', user_id: 'student-a', created_at: getOffsetDate(-3), status: 'pending', note: '', photo_name: 'foto-3.jpg' },
      { id: 'att-4', user_id: 'student-b', created_at: getOffsetDate(-10), status: 'present', note: 'Selesai', photo_name: 'foto-4.jpg' },
      { id: 'att-5', user_id: 'student-b', created_at: getOffsetDate(-5), status: 'present', note: 'Sangat baik', photo_name: 'foto-5.jpg' }
    ];

    const assignments = [
      { id: 'assign-1', title: 'Laporan Kebersihan Kelas', subject: 'Pendidikan Pancasila', description: 'Buat laporan singkat tentang rutinitas kebersihan', due_date: getOffsetDate(2), priority: 'high', created_by: 'teacher-demo', target_class: 'XII B', created_at: new Date().toISOString() },
      { id: 'assign-2', title: 'Presentasi Informatika', subject: 'Informatika', description: 'Presentasikan aplikasi sederhana', due_date: getOffsetDate(5), priority: 'medium', created_by: 'teacher-demo', target_class: 'XII B', created_at: new Date().toISOString() },
      { id: 'assign-3', title: 'Analisis Fisika', subject: 'Fisika', description: 'Kerjakan soal analisis tentang gerak lurus', due_date: getOffsetDate(7), priority: 'high', created_by: 'teacher-demo', target_class: 'XII B', created_at: new Date().toISOString() },
      { id: 'assign-4', title: 'Diskusi Ekonomi', subject: 'Ekonomi', description: 'Buat rangkuman kasus ekonomi makro', due_date: getOffsetDate(8), priority: 'medium', created_by: 'teacher-demo', target_class: 'XII B', created_at: new Date().toISOString() },
      { id: 'assign-5', title: 'Karya Tulis Bahasa Indonesia', subject: 'Bahasa Indonesia', description: 'Tulis esai 500 kata tentang budaya sekolah', due_date: getOffsetDate(6), priority: 'low', created_by: 'teacher-demo', target_class: 'XII C', created_at: new Date().toISOString() },
      { id: 'assign-6', title: 'Praktikum Biologi', subject: 'Biologi', description: 'Kumpulkan hasil praktikum', due_date: getOffsetDate(4), priority: 'medium', created_by: 'teacher-demo', target_class: 'XII C', created_at: new Date().toISOString() }
    ];

    const assignment_status = [
      { assignment_id: 'assign-1', student_id: 'student-a', status: 'completed', updated_at: getOffsetDate(-1) },
      { assignment_id: 'assign-2', student_id: 'student-a', status: 'pending', updated_at: new Date().toISOString() },
      { assignment_id: 'assign-3', student_id: 'student-a', status: 'in_progress', updated_at: new Date().toISOString() },
      { assignment_id: 'assign-4', student_id: 'student-a', status: 'pending', updated_at: new Date().toISOString() },
      { assignment_id: 'assign-5', student_id: 'student-b', status: 'completed', updated_at: getOffsetDate(-2) },
      { assignment_id: 'assign-6', student_id: 'student-b', status: 'pending', updated_at: new Date().toISOString() }
    ];

    return { users, schedule, attendance, assignments, assignment_status };
  }

  function readStore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = buildSeedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }

    return JSON.parse(raw);
  }

  function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  const database = {
    users: {
      getAll() {
        return clone(readStore().users);
      },
      get(id) {
        const store = readStore();
        return clone(store.users.find((user) => user.id === id));
      },
      create(payload) {
        const store = readStore();
        const user = { id: payload.id || createId('user'), created_at: new Date().toISOString(), ...payload };
        store.users.push(user);
        writeStore(store);
        return clone(user);
      },
      update(id, payload) {
        const store = readStore();
        const index = store.users.findIndex((user) => user.id === id);
        if (index === -1) return null;
        store.users[index] = { ...store.users[index], ...payload };
        writeStore(store);
        return clone(store.users[index]);
      },
      delete(id) {
        const store = readStore();
        store.users = store.users.filter((user) => user.id !== id);
        writeStore(store);
        return true;
      }
    },
    schedule: {
      getAll() {
        return clone(readStore().schedule);
      },
      getToday(className) {
        const store = readStore();
        const today = DAY_NAMES[new Date().getDay()];
        return clone(store.schedule.filter((item) => item.day === today && (!className || item.class === className)));
      },
      create(payload) {
        const store = readStore();
        const item = { id: payload.id || createId('schedule'), ...payload };
        store.schedule.push(item);
        writeStore(store);
        return clone(item);
      },
      update(id, payload) {
        const store = readStore();
        const index = store.schedule.findIndex((item) => item.id === id);
        if (index === -1) return null;
        store.schedule[index] = { ...store.schedule[index], ...payload };
        writeStore(store);
        return clone(store.schedule[index]);
      },
      delete(id) {
        const store = readStore();
        store.schedule = store.schedule.filter((item) => item.id !== id);
        writeStore(store);
        return true;
      }
    },
    attendance: {
      getAll() {
        return clone(readStore().attendance.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      },
      markPresent(userId, payload = {}) {
        const store = readStore();
        const item = {
          id: createId('attendance'),
          user_id: userId,
          created_at: new Date().toISOString(),
          status: 'pending',
          note: '',
          ...payload
        };
        store.attendance.push(item);
        writeStore(store);
        return clone(item);
      },
      update(id, payload) {
        const store = readStore();
        const index = store.attendance.findIndex((item) => item.id === id);
        if (index === -1) return null;
        store.attendance[index] = { ...store.attendance[index], ...payload };
        writeStore(store);
        return clone(store.attendance[index]);
      }
    },
    assignments: {
      getAll() {
        return clone(readStore().assignments);
      },
      get(id) {
        const store = readStore();
        return clone(store.assignments.find((item) => item.id === id));
      },
      create(payload) {
        const store = readStore();
        const item = { id: payload.id || createId('assign'), created_at: new Date().toISOString(), ...payload };
        store.assignments.push(item);
        writeStore(store);
        return clone(item);
      },
      update(id, payload) {
        const store = readStore();
        const index = store.assignments.findIndex((item) => item.id === id);
        if (index === -1) return null;
        store.assignments[index] = { ...store.assignments[index], ...payload };
        writeStore(store);
        return clone(store.assignments[index]);
      },
      delete(id) {
        const store = readStore();
        store.assignments = store.assignments.filter((item) => item.id !== id);
        store.assignment_status = store.assignment_status.filter((item) => item.assignment_id !== id);
        writeStore(store);
        return true;
      },
      getForStudent(studentId) {
        const user = database.users.get(studentId);
        if (!user) return [];
        const store = readStore();
        return clone(store.assignments.filter((item) => item.target_class === user.class || user.moving_subjects.includes(item.subject)));
      },
      getForTeacher(teacherId) {
        const store = readStore();
        return clone(store.assignments.filter((item) => item.created_by === teacherId));
      }
    },
    assignmentStatus: {
      get(assignmentId, studentId) {
        const store = readStore();
        return clone(store.assignment_status.find((item) => item.assignment_id === assignmentId && item.student_id === studentId));
      },
      set(assignmentId, studentId, status) {
        const store = readStore();
        const existing = store.assignment_status.find((item) => item.assignment_id === assignmentId && item.student_id === studentId);
        if (existing) {
          existing.status = status;
          existing.updated_at = new Date().toISOString();
        } else {
          store.assignment_status.push({ assignment_id: assignmentId, student_id: studentId, status, updated_at: new Date().toISOString() });
        }
        writeStore(store);
        return clone(store.assignment_status.find((item) => item.assignment_id === assignmentId && item.student_id === studentId));
      }
    },
    auth: {
      setActiveUser(userId, role) {
        localStorage.setItem(ACTIVE_USER_KEY, userId);
        localStorage.setItem(ACTIVE_ROLE_KEY, role);
      },
      getActiveUser() {
        const userId = localStorage.getItem(ACTIVE_USER_KEY);
        const role = localStorage.getItem(ACTIVE_ROLE_KEY);
        if (!userId || !role) return null;
        const user = database.users.get(userId);
        if (!user) return null;
        return { ...user, role };
      },
      clearActiveUser() {
        localStorage.removeItem(ACTIVE_USER_KEY);
        localStorage.removeItem(ACTIVE_ROLE_KEY);
      }
    },
    settings: {
      getTheme() {
        return localStorage.getItem('reciscare-demo-theme') || 'light';
      },
      setTheme(theme) {
        localStorage.setItem('reciscare-demo-theme', theme);
      }
    },
    reset() {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVE_ROLE_KEY);
      localStorage.removeItem(ACTIVE_USER_KEY);
      localStorage.removeItem('reciscare-demo-theme');
      return readStore();
    }
  };

  window.database = database;
  window.resetDemo = database.reset;
  window.formatDate = formatDate;
  window.formatTime = formatTime;

  window.enterDemo = function(role) {
    const roleMap = {
      admin: 'admin-demo',
      teacher: 'teacher-demo',
      classleader: 'classleader-demo',
      student: 'student-a'
    };

    const userId = roleMap[role];
    if (!userId) return false;
    database.auth.setActiveUser(userId, role);
    const targetPage = role === 'student' ? '../pages/student.html' : '../pages/teacher.html';
    window.location.href = targetPage;
    return true;
  };

  window.loginUser = function(email, password) {
    const store = readStore();
    const user = store.users.find((entry) => entry.email === email && entry.password === password);
    if (!user) return { ok: false, message: 'Kredensial demo tidak cocok.' };
    database.auth.setActiveUser(user.id, user.role);
    return { ok: true, user };
  };

  window.logout = function() {
    database.auth.clearActiveUser();
    window.location.href = '../index.html';
  };

  window.registerUser = function() {
    return { ok: false, message: 'Pendaftaran dinonaktifkan dalam demo portfolio.' };
  };

  window.checkAuth = function(requiredRole) {
    const active = database.auth.getActiveUser();
    if (!active) {
      window.location.href = '../index.html';
      return null;
    }

    if (requiredRole && requiredRole === 'teacher' && ['teacher', 'classleader', 'admin'].includes(active.role)) {
      return active;
    }

    if (requiredRole && active.role !== requiredRole) {
      window.location.href = active.role === 'student' ? '../pages/student.html' : '../pages/teacher.html';
      return null;
    }

    return active;
  };

  window.applyTheme = function() {
    const theme = database.settings.getTheme();
    document.body.classList.toggle('dark', theme === 'dark');
    const button = document.querySelector('.dark-mode-toggle');
    if (button) {
      button.innerHTML = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
  };
})();
