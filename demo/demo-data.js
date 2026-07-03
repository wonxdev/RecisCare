/**
 * RecisCare Demo Seed Data
 *
 * Fictional sample data used to populate the DemoStore on first load.
 * No real people, schools, or records are represented here.
 *
 * @module demo-data
 * @exposes window.DEMO_SEED — factory that returns a fresh seed database
 */

(() => {
  /**
   * Calculate an ISO date offset from today.
   * @param {number} days - Number of days to offset (negative = past)
   * @returns {string} ISO 8601 date string
   */
  function getOffsetDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  }

  /**
   * Build a fresh copy of the seed database.
   * Called by DemoStore whenever localStorage is empty or reset.
   * @returns {{users: object[], schedule: object[], attendance: object[]}}
   */
  function buildSeedData() {
    const now = new Date().toISOString();

    const users = [
      {
        id: 'admin-demo',
        email: 'admin@reciscare.demo',
        password: 'admin123',
        role: 'admin',
        name: 'Demo Administrator',
        class: 'Admin',
        piket_day: 'Senin',
        moving_subjects: [],
        created_at: now
      },
      {
        id: 'teacher-demo',
        email: 'teacher@reciscare.demo',
        password: 'teacher123',
        role: 'teacher',
        name: 'Demo Teacher',
        class: 'Guru',
        piket_day: 'Rabu',
        moving_subjects: [],
        created_at: now
      },
      {
        id: 'classleader-demo',
        email: 'leader@reciscare.demo',
        password: 'leader123',
        role: 'classleader',
        name: 'Demo Class Leader',
        class: 'XII B',
        piket_day: 'Kamis',
        moving_subjects: [],
        created_at: now
      },
      {
        id: 'student-a',
        email: 'siswaa@reciscare.demo',
        password: 'student123',
        role: 'student',
        name: 'Demo Student A',
        class: 'XII B',
        piket_day: 'Kamis',
        moving_subjects: ['Informatika', 'Fisika', 'Bahasa Inggris Minat', 'Ekonomi'],
        created_at: now
      },
      {
        id: 'student-b',
        email: 'siswab@reciscare.demo',
        password: 'student123',
        role: 'student',
        name: 'Demo Student B',
        class: 'XII C',
        piket_day: 'Jumat',
        moving_subjects: ['Biologi', 'Sastra Indonesia'],
        created_at: now
      }
    ];

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

    return { users, schedule, attendance };
  }

  window.DEMO_SEED = buildSeedData;
})();
