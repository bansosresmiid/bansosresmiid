import React, { useState, useEffect } from 'react';
import { UserPlus, Landmark, ShieldCheck } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EAF4FF] text-[#0F5CC8] rounded-full text-xs font-bold uppercase tracking-wider border border-[#0F5CC8]/20">
          <ShieldCheck size={14} /> Pendaftaran Resmi DTKS Nasional
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0A2F73]">
          Registrasi Akun Penerima Bansos
        </h2>
        <p className="text-sm text-[#6B7280] max-w-lg mx-auto leading-relaxed">
          Lengkapi formulir pendaftaran di bawah ini secara teliti sesuai dokumen KTP asli untuk verifikasi data kependudukan awal Anda.
        </p>
      </div>

      <div className="card-official overflow-hidden">
        {/* Card Title Banner */}
        <div className="bg-[#0A2F73] text-white px-6 py-5 flex items-center gap-3 border-b border-[#0F5CC8]/30">
          <div className="p-2 bg-[#0F5CC8] text-white rounded-xl shadow-xs">
            <UserPlus size={20} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase">Formulir Pendaftaran Terpadu</h3>
            <p className="text-[10px] text-[#EAF4FF] tracking-wider uppercase">TAHAP 1: PORTAL WEB BANSOS NASIONAL</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* NIK Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider flex items-center gap-1">
                Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                placeholder="16 Digit NIK sesuai KTP"
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] font-mono text-sm tracking-widest text-[#1F2937] transition-all shadow-2xs"
                required
              />
            </div>

            {/* KK Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider flex items-center gap-1">
                Nomor Kartu Keluarga (KK) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={16}
                value={kk}
                onChange={(e) => setKk(e.target.value.replace(/\D/g, ''))}
                placeholder="16 Digit Nomor KK"
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] font-mono text-sm tracking-widest text-[#1F2937] transition-all shadow-2xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Nama Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider">
                Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Siti Rahmawati"
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] text-sm text-[#1F2937] transition-all shadow-2xs"
                required
              />
            </div>

            {/* HP Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider">
                Nomor Handphone Aktif <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={hp}
                onChange={(e) => setHp(e.target.value.replace(/\D/g, ''))}
                placeholder="Contoh: 0812XXXXXXXX"
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] text-sm font-mono text-[#1F2937] transition-all shadow-2xs"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider">
              Alamat Email Aktif <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contoh: sitirahma@email.com"
              className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] text-sm text-[#1F2937] transition-all shadow-2xs"
              required
            />
          </div>

          {/* Alamat Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#0A2F73] uppercase tracking-wider">
              Alamat Lengkap Sesuai KTP <span className="text-red-500">*</span>
            </label>
            <textarea
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Contoh: Jl. Salemba Raya No. 28, RT 01/RW 03, Kel. Kenari, Kec. Senen, Jakarta Pusat"
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] text-sm text-[#1F2937] transition-all shadow-2xs"
              required
            />
          </div>

          {/* Bank Account Fields */}
          <div className="bg-[#F5F7FA] border border-[#EAF4FF] p-5 rounded-[18px] space-y-4">
            <h4 className="text-xs font-extrabold text-[#0A2F73] uppercase tracking-widest flex items-center gap-2 border-b border-[#EAF4FF] pb-2">
              <Landmark size={16} className="text-[#0F5CC8]" />
              Rencana Bank Penerima Bansos (Tahap 2)
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Bank Penerima</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-xs text-[#1F2937] font-semibold"
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
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Nomor Rekening Bank</label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ''))}
                  placeholder="Contoh: 1234567890"
                  className="w-full px-3 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-xs font-mono text-[#1F2937]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Atas Nama Rekening</label>
                <input
                  type="text"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder="Nama pemilik rekening"
                  className="w-full px-3 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] text-xs text-[#1F2937]"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-extrabold text-xs uppercase tracking-wider rounded-[14px] btn-glow-blue cursor-pointer transition-all duration-300"
          >
            KIRIM PENDAFTARAN AKUN (TAHAP 1)
          </button>
        </form>
      </div>
    </div>
  );
              }
