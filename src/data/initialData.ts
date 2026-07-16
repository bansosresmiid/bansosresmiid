import { Penerima, ActivityLog, VisiMisi } from '../types';

// Seed data for registered clients
export const initialPenerima: Penerima[] = [
  {
    nik: '3273011205980001',
    nama: 'Ahmad Syahrul',
    email: 'ahmad.syahrul@gmail.com',
    hp: '081234567890',
    alamat: 'Jl. Salemba Raya No. 12, RT 03/RW 04, Kel. Kenari, Kec. Senen, Jakarta Pusat',
    kk: '3273010101010001',
    bankName: 'Bank BRI',
    bankAccount: '0123456789123',
    status: 'Berhak',
    stage: 1,
    createdAt: '2026-07-11',
    lastActive: '12:15:32',
  },
  {
    nik: '3273011205980002',
    nama: 'Siti Rahmawati',
    email: 'siti.rahma@yahoo.com',
    hp: '085678901234',
    alamat: 'Gg. Masjid Al-Ikhlas No. 45, RT 01/RW 02, Kel. Pasir Kaliki, Kec. Cicendo, Bandung',
    kk: '3273010202020002',
    bankName: 'Bank Mandiri',
    bankAccount: '123456789012',
    status: 'Berhak',
    stage: 1,
    createdAt: '2026-07-12',
    lastActive: '09:44:11',
  },
  {
    nik: '3273011205980003',
    nama: 'Budi Santoso',
    email: 'budi_santoso@outlook.com',
    hp: '089912345678',
    alamat: 'Perumahan Graha Indah Blok C5 No. 10, RT 08/RW 12, Kel. Sekarjati, Kec. Ngawi, Ngawi',
    kk: '3273010303030003',
    bankName: 'Bank BNI',
    bankAccount: '9876543210',
    status: 'Berhak',
    stage: 1,
    createdAt: '2026-07-12',
    lastActive: '14:22:05',
  },
  {
    nik: '3273011205980004',
    nama: 'Dewi Anggraini',
    email: 'dewi.anggr@gmail.com',
    hp: '081398765432',
    alamat: 'Jl. Pemuda No. 104, RT 05/RW 01, Kel. Ketabang, Kec. Genteng, Surabaya',
    kk: '3273010404040004',
    bankName: 'Bank BTN',
    bankAccount: '4455667788',
    status: 'Proses',
    stage: 1,
    createdAt: '2026-07-12',
    lastActive: '16:05:50',
  },
  {
    nik: '3273011205980005',
    nama: 'Eko Prasetyo',
    email: 'ekopras@gmail.com',
    hp: '087765432109',
    alamat: 'Kampung Baru RT 02/RW 05, Kel. Jagakarsa, Kec. Jagakarsa, Jakarta Selatan',
    kk: '3273010505050005',
    bankName: 'Bank Mandiri',
    bankAccount: '9988776655',
    status: 'Berhak',
    stage: 1,
    createdAt: '2026-07-10',
    lastActive: '18:12:14',
  }
];

export const initialLogs: ActivityLog[] = [
  {
    id: 'log_1',
    nik: '3273011205980002',
    nama: 'Siti Rahmawati',
    action: 'Mendaftar Bansos Online',
    timestamp: '09:40:15',
    date: '2026-07-12',
  },
  {
    id: 'log_2',
    nik: '3273011205980002',
    nama: 'Siti Rahmawati',
    action: 'Melakukan Cek Status NIK',
    timestamp: '09:44:11',
    date: '2026-07-12',
  },
  {
    id: 'log_3',
    nik: '3273011205980003',
    nama: 'Budi Santoso',
    action: 'Mendaftar Bansos Online',
    timestamp: '14:18:22',
    date: '2026-07-12',
  },
  {
    id: 'log_4',
    nik: '3273011205980003',
    nama: 'Budi Santoso',
    action: 'Melakukan Cek Status NIK',
    timestamp: '14:22:05',
    date: '2026-07-12',
  },
  {
    id: 'log_5',
    nik: '3273011205980004',
    nama: 'Dewi Anggraini',
    action: 'Mendaftar Bansos Online',
    timestamp: '16:02:11',
    date: '2026-07-12',
  }
];

export const visiMisiBansos: VisiMisi = {
  visi: 'Terwujudnya perlindungan sosial yang inklusif, transparan, dan berkeadilan bagi seluruh rakyat Indonesia guna mengentaskan kemiskinan dan membangun ketahanan sosial nasional.',
  misi: [
    'Meningkatkan akurasi data terpadu penerima bantuan sosial nasional melalui optimalisasi integrasi data kependudukan.',
    'Menjamin kelancaran dan ketepatan penyaluran bantuan sosial langsung kepada Keluarga Penerima Manfaat (KPM) tanpa perantara.',
    'Menyelenggarakan tata kelola program bansos yang bersih, transparan, akuntabel, serta bebas dari pungutan liar melalui sistem digitalisasi terpadu.',
    'Mendorong kemandirian ekonomi Keluarga Penerima Manfaat melalui program graduasi yang terintegrasi dengan pemberdayaan masyarakat.'
  ],
  tujuan: [
    'Menghapus kesenjangan sosial ekonomi di wilayah terluar, terdepan, dan tertinggal (3T).',
    'Menyediakan jaring pengaman sosial yang responsif terhadap dinamika krisis dan bencana ekonomi.',
    'Mengintegrasikan sistem verifikasi multi-level bersama Dukcapil, Kemenkeu, dan Pemerintah Daerah.'
  ]
};
