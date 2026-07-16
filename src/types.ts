export interface Penerima {
  nik: string;
  nama: string;
  email: string;
  hp: string;
  alamat: string;
  kk: string;
  bankName: string;
  bankAccount: string;
  bankAccountName?: string;
  status: 'Berhak' | 'Proses' | 'Tidak Terdaftar';
  stage: number; // 1 to 5
  createdAt: string; // YYYY-MM-DD
  lastActive: string;
}

export interface ActivityLog {
  id: string;
  nik: string;
  nama: string;
  action: string;
  timestamp: string; // HH:MM:SS
  date: string; // YYYY-MM-DD
}

export interface VisiMisi {
  visi: string;
  misi: string[];
  tujuan: string[];
}
