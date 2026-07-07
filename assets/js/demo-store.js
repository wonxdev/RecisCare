/**
 * RecisCare DemoStore
 *
 * A frontend-only, localStorage-backed data layer that stands in for a
 * real backend API. It exposes the same collection-style methods a REST
 * or Supabase/Firebase client would (getAll/get/create/update/delete),
 * so the UI code never needs to know it's talking to localStorage.
 *
 * @module demo-store
 * @requires demo/demo-data.js — must be loaded first, provides window.DEMO_SEED
 *
 * @global DemoStore    - Main data API object exposed to window
 * @global checkAuth    - Route-guard helper
 * @global enterDemo    - One-click demo role login
 * @global loginUser    - Email/password login against seed accounts
 * @global logout       - Session termination
 * @global registerUser - Disabled in demo mode
 * @global resetDemo    - Wipes and reseeds all demo data
 * @global formatDate / formatTime - Locale-aware formatting helpers
 *
 * Storage Keys:
 * - reciscare-demo-db: main JSON "database"
 * - reciscare-demo-role: active session role
 * - reciscare-demo-user: active session user id
 */

(() => {
  const STORAGE_KEY = 'reciscare-demo-db';
  const ACTIVE_ROLE_KEY = 'reciscare-demo-role';
  const ACTIVE_USER_KEY = 'reciscare-demo-user';
  const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // ============================================================================
  // Utility Functions
  // ============================================================================

  function createId(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function clone(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }

  function formatDate(value) {
    return new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function formatTime(value) {
    return new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  /** Resolve a root-relative path (e.g. 'pages/student.html') from any page. */
  function fromRoot(target) {
    const prefix = window.location.pathname.includes('/pages/') ? '../' : '';
    return prefix + target;
  }

  // ============================================================================
  // Storage Layer
  // ============================================================================

  function readStore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = window.DEMO_SEED();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  }

  function writeStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  // ============================================================================
  // DemoStore API
  // ============================================================================

  const DemoStore = {
    users: {
      getAll() {
        return clone(readStore().users);
      },
      get(id) {
        return clone(readStore().users.find((user) => user.id === id));
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
        const today = DAY_NAMES[new Date().getDay()];
        return clone(readStore().schedule.filter((item) => item.day === today && (!className || item.class === className)));
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

    auth: {
      setActiveUser(userId, role) {
        localStorage.setItem(ACTIVE_USER_KEY, userId);
        localStorage.setItem(ACTIVE_ROLE_KEY, role);
      },
      getActiveUser() {
        const userId = localStorage.getItem(ACTIVE_USER_KEY);
        const role = localStorage.getItem(ACTIVE_ROLE_KEY);
        if (!userId || !role) return null;
        const user = DemoStore.users.get(userId);
        if (!user) return null;
        return { ...user, role };
      },
      clearActiveUser() {
        localStorage.removeItem(ACTIVE_USER_KEY);
        localStorage.removeItem(ACTIVE_ROLE_KEY);
      }
    },

    /**
     * Wipe all demo data and session state, then reseed from demo-data.js.
     * @returns {object} Fresh seeded database
     */
    reset() {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ACTIVE_ROLE_KEY);
      localStorage.removeItem(ACTIVE_USER_KEY);
      return readStore();
    }
  };

  // ============================================================================
  // Global exposure
  // ============================================================================

  window.DemoStore = DemoStore;
  window.formatDate = formatDate;
  window.formatTime = formatTime;

  /** One-click demo login: loads a preset account for the chosen role. */
  window.enterDemo = function (role) {
    const roleMap = {
      admin: 'admin-demo',
      teacher: 'teacher-demo',
      classleader: 'classleader-demo',
      student: 'student-a'
    };
    const userId = roleMap[role];
    if (!userId) return false;
    DemoStore.auth.setActiveUser(userId, role);
    window.location.href = fromRoot(role === 'student' ? 'pages/student.html' : 'pages/teacher.html');
    return true;
  };

  /** Email/password login against the seeded demo accounts. */
  window.loginUser = function (email, password) {
    const store = readStore();
    const user = store.users.find((entry) => entry.email === email && entry.password === password);
    if (!user) return { ok: false, message: 'Kredensial demo tidak cocok.' };
    DemoStore.auth.setActiveUser(user.id, user.role);
    return { ok: true, user };
  };

  /** Clears the session and returns to the login screen. */
  window.logout = function () {
    DemoStore.auth.clearActiveUser();
    window.location.href = fromRoot('index.html');
  };

  /** Registration is intentionally disabled for this portfolio demo. */
  window.registerUser = function () {
    return { ok: false, message: 'Pendaftaran dinonaktifkan dalam demo portfolio.' };
  };

  /**
   * Route guard: redirects to login if no session, or to the correct
   * dashboard if the session role doesn't match what the page requires.
   */
  window.checkAuth = function (requiredRole) {
    const active = DemoStore.auth.getActiveUser();
    if (!active) {
      window.location.href = fromRoot('index.html');
      return null;
    }
    if (requiredRole === 'teacher' && ['teacher', 'classleader', 'admin'].includes(active.role)) {
      return active;
    }
    if (requiredRole && active.role !== requiredRole) {
      window.location.href = fromRoot(active.role === 'student' ? 'pages/student.html' : 'pages/teacher.html');
      return null;
    }
    return active;
  };

  /** Wipes and reseeds demo data, then returns to the login screen. */
  window.resetDemo = function () {
    DemoStore.reset();
    window.location.href = fromRoot('index.html');
  };
})();
