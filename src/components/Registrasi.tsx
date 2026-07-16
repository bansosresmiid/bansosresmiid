import React, { useState, useEffect } from 'react';
import { UserPlus, ShieldAlert, CheckCircle, FileText, Landmark } from 'lucide-react';
import { Penerima } from '../types';

interface RegistrasiProps {
  prefilledNik: string;
  onRegister: (newPenerima: Omit<Penerima, 'status' | 'stage' | 'createdAt' | 'lastActive'>) => void;
  onShowToast: (message: string, isError?: boolean) => void;
  onClearPrefilledNik: () => void;
}

export default function Registrasi({
  prefilledNik,
  onRegister,
  onShowToast,
  onClearPrefilledNik,
}: RegistrasiProps) {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kk, setKk] = useState('');
  const [bankName, setBankName] = useState('Bank Mandiri');
  const [bankAccount, setBankAccount] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');

  // Auto-fill NIK if redirected from Cek NIK
  useEffect(() => {
    if (prefilledNik) {
      setNik(prefilledNik);
      onShowToast(`NIK ${prefilledNik} diisi otomatis. Silakan lengkapi formulir registrasi.`);
      onClearPrefilledNik();
    }
  }, [prefilledNik]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanNik = nik.trim();
    const cleanNama = nama.trim();
    const cleanEmail = email.trim();
    const cleanHp = hp.trim();
    const cleanAlamat = alamat.trim();
    const cleanKk = kk.trim();
    const cleanBankAcc = bankAccount.trim();
    const cleanBankAccName = bankAccountName.trim();

    if (!cleanNik || !cleanNama || !cleanEmail || !cleanHp || !cleanAlamat || !cleanKk || !cleanBankAcc || !cleanBankAccName) {
      onShowToast('Semua kolom wajib diisi dengan benar termasuk Atas Nama Rekening!', true);
      return;
    }

    if (cleanNik.length !== 16 || isNaN(Number(cleanNik))) {
      onShowToast('NIK harus terdiri dari 16 digit angka!', true);
      return;
    }

    if (cleanKk.length !== 16 || isNaN(Number(cleanKk))) {
      onShowToast('Nomor Kartu Keluarga (KK) harus terdiri dari 16 digit angka!', true);
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      onShowToast('Format email tidak valid!', true);
      return;
    }

    if (cleanHp.length < 10 || isNaN(Number(cleanHp))) {
      onShowToast('Nomor HP tidak valid! Gunakan minimal 10 digit angka.', true);
      return;
    }

    // Call registration handler
    onRegister({
      nik: cleanNik,
      nama: cleanNama,
      email: cleanEmail,
      hp: cleanHp,
      alamat: cleanAlamat,
      kk: cleanKk,
      bankName,
      bankAccount: cleanBankAcc,
      bankAccountName: cleanBankAccName,
    });

    // Reset Form
    setNik('');
    setNama('');
    setEmail('');
    setHp('');
    setAlamat('');
    setKk('');
    setBankAccount('');
    setBankAccountName('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Registrasi Akun Penerima Bansos
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Lengkapi formulir pendaftaran di bawah ini secara teliti sesuai dokumen KTP asli untuk verifikasi data kependudukan awal Anda.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {/* Card Title Banner */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-slate-800 border border-slate-700 rounded text-white">
            <UserPlus size={18} />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase">Formulir Pendaftaran Terpadu</h3>
            <p className="text-[9px] text-slate-400 font-mono tracking-wider">TAHAP 1: PORTAL WEB BANSOS NASIONAL</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* NIK Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                placeholder="16 Digit NIK sesuai KTP"
                className="w-full px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono text-sm tracking-widest text-slate-950 bg-slate-50"
                required
              />
            </div>

            {/* KK Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                Nomor Kartu Keluarga (KK) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={16}
                value={kk}
                onChange={(e) => setKk(e.target.value.replace(/\D/g, ''))}
                placeholder="16 Digit Nomor KK"
                className="w-full px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono text-sm tracking-widest text-slate-950 bg-slate-50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Nama Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Siti Rahmawati"
                className="w-full px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm text-slate-950 bg-slate-50"
                required
              />
            </div>

            {/* HP Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Nomor Handphone Aktif <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={hp}
                onChange={(e) => setHp(e.target.value.replace(/\D/g, ''))}
                placeholder="Contoh: 0812XXXXXXXX"
                className="w-full px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm font-mono text-slate-950 bg-slate-50"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Alamat Email Aktif <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contoh: sitirahma@email.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm text-slate-950 bg-slate-50"
              required
            />
          </div>

          {/* Alamat Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Alamat Lengkap Sesuai KTP <span className="text-red-500">*</span>
            </label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Contoh: Jl. Salemba Raya No. 28, RT 01/RW 03, Kel. Kenari, Kec. Senen, Jakarta Pusat"
              rows={3}
              className="w-full px-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm text-slate-950 bg-slate-50"
              required
            />
          </div>

          {/* Bank Account Fields for Stage 2 */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded space-y-4">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Landmark size={14} className="text-slate-900" />
              Rencana Bank Penerima Bansos (Tahap 2)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Bank Penerima</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 bg-white rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs text-slate-800"
                >
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank BRI">Bank BRI (Bank Rakyat Indonesia)</option>
                  <option value="Bank BNI">Bank BNI (Bank Negara Indonesia)</option>
                  <option value="Bank BTN">Bank BTN (Bank Tabungan Negara)</option>
                  <option value="Bank BCA">Bank BCA (Bank Central Asia)</option>
                  <option value="Bank BSI">Bank BSI (Bank Syariah Indonesia)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Nomor Rekening Bank</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ''))}
                  placeholder="Contoh: 1234567890"
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs font-mono text-slate-800 bg-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Atas Nama Rekening</label>
                <input
                  type="text"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder="Nama pemilik rekening"
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs text-slate-800 bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded transition duration-150 cursor-pointer"
          >
            KIRIM PENDAFTARAN AKUN (TAHAP 1)
          </button>
        </form>
      </div>
    </div>
  );
  }
