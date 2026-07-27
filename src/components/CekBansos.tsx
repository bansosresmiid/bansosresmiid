import React, { useState } from 'react';
import { Search, Lock, Smartphone, Clock, Check, Download, ShieldCheck } from 'lucide-react';
import { Penerima } from '../types';

interface CekBansosProps {
  daftarPenerima: Penerima[];
  onRedirectToRegistrasi: (nik: string) => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function CekBansos({
  daftarPenerima,
  onRedirectToRegistrasi,
  onShowToast,
}: CekBansosProps) {
  const [nikInput, setNikInput] = useState('');
  const [checkedPenerima, setCheckedPenerima] = useState<Penerima | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const apkDownloadUrl = "https://github.com/bansosresmiid/bansosresmiid/releases/download/v1.0/Bansos_2026.apk";

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNik = nikInput.trim();

    if (cleanNik.length !== 16 || isNaN(Number(cleanNik))) {
      onShowToast('NIK tidak valid! Harap masukkan 16 digit angka.', true);
      return;
    }

    setIsSearching(true);
    setCheckedPenerima(null);

    setTimeout(() => {
      setIsSearching(false);
      const found = daftarPenerima.find((p) => p.nik === cleanNik);

      if (found) {
        setCheckedPenerima(found);
        onShowToast('Data NIK ditemukan! Menampilkan status verifikasi.');
      } else {
        onShowToast('NIK Anda belum terdaftar. Mengalihkan Anda secara otomatis ke halaman Registrasi...', false);
        setTimeout(() => {
          onRedirectToRegistrasi(cleanNik);
        }, 1500);
      }
    }, 800);
  };

  const stages = [
    {
      step: 1,
      title: 'Tahap 1: Registrasi Akun',
      description: 'Pembuatan akun portal dan integrasi awal NIK Anda.',
      isCompleted: true,
      isLocked: false,
    },
    {
      step: 2,
      title: 'Tahap 2: Verifikasi Data Mandiri',
      description: 'Unggah Dokumen KTP, Foto selfie KTP, verifikasi Nomor KK, dan input Rekening Bank Penerima.',
      isCompleted: false,
      isLocked: true,
    },
    {
      step: 3,
      title: 'Tahap 3: Verifikasi Sistem Dukcapil',
      description: 'Pengecekan keselarasan biometrik KTP langsung dengan server Dukcapil Kemendagri RI.',
      isCompleted: false,
      isLocked: true,
    },
    {
      step: 4,
      title: 'Tahap 4: Persetujuan Kelayakan (Kemensos)',
      description: 'Uji verifikasi kelayakan parameter kemiskinan dan DTKS oleh Tim Kurator Kementerian Sosial.',
      isCompleted: false,
      isLocked: true,
    },
    {
      step: 5,
      title: 'Tahap 5: Pencairan Dana Bantuan',
      description: 'Transfer tunai langsung senilai Rp3.400.000 ke rekening bank Keluarga Penerima Manfaat.',
      isCompleted: false,
      isLocked: true,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Search Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] text-[#0F5CC8] rounded-full text-xs font-bold uppercase tracking-wider border border-[#0F5CC8]/20">
          <ShieldCheck size={14} /> Layanan Pencarian Terpadu DTKS
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0A2F73]">
          Cek Status Penerima Bansos
        </h2>
        <p className="text-sm text-[#6B7280] max-w-lg mx-auto leading-relaxed">
          Masukkan 16 digit Nomor Induk Kependudukan (NIK) Anda untuk melihat status verifikasi terkini dan alur pencairan dana bansos.
        </p>
      </div>

      {/* Check Form Card */}
      <div className="card-official p-6 sm:p-8">
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nikInput" className="block text-xs font-bold uppercase tracking-wider text-[#0A2F73]">
              Nomor Induk Kependudukan (NIK)
            </label>
            <div className="relative">
              <input
                id="nikInput"
                type="text"
                placeholder="Contoh: 3273011205980002"
                maxLength={16}
                value={nikInput}
                onChange={(e) => setNikInput(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E5E7EB] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F5CC8] focus:border-[#0F5CC8] font-mono text-base tracking-widest text-[#1F2937] transition-all shadow-2xs"
                required
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F5CC8]">
                <Search size={20} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-3.5 bg-[#0F5CC8] hover:bg-[#0A2F73] disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-wider rounded-[14px] btn-glow-blue cursor-pointer flex items-center justify-center gap-2 transition-all duration-300"
          >
            {isSearching ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Menghubungkan ke Server Kemensos...
              </>
            ) : (
              '🔍 CEK STATUS VERIFIKASI SEKARANG'
            )}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {checkedPenerima && (
        <div className="card-official overflow-hidden animate-slide-up">
          {/* Result Card Header */}
          <div className="bg-[#0A2F73] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#0F5CC8]/30">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#F5C400] uppercase">Hasil Pencarian Resmi</span>
              <h3 className="text-lg font-extrabold uppercase tracking-tight font-sans text-white">{checkedPenerima.nama}</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#EAF4FF]">NIK: {checkedPenerima.nik}</span>
              <span className="text-xs px-3 py-1 bg-[#2E7D32] text-white rounded-full font-bold uppercase tracking-wider">
                {checkedPenerima.status}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div className="bg-[#EAF4FF] border-l-4 border-[#0F5CC8] p-4 rounded-r-2xl flex items-start gap-3">
              <Clock className="text-[#0F5CC8] mt-0.5 shrink-0" size={20} />
              <div className="text-xs text-[#1F2937] leading-relaxed">
                <p className="font-extrabold text-[#0A2F73]">Status Tahap 1: SELESAI</p>
                <p className="mt-1">
                  Akun Anda terdaftar pada sistem web portal. Untuk melanjutkan ke <span className="font-bold underline text-[#0F5CC8]">Tahap 2 hingga Tahap 5</span>, Anda wajib melakukan verifikasi aman menggunakan aplikasi mobile resmi.
                </p>
              </div>
            </div>

            {/* Verification & Disbursement Stages Timeline */}
            <div>
              <h4 className="font-sans text-[10px] font-extrabold tracking-widest text-[#0F5CC8] uppercase mb-6">
                Tahapan Proses Verifikasi & Pencairan Dana
              </h4>

              <div className="relative border-l-2 border-[#0F5CC8]/20 pl-6 ml-3 space-y-8">
                {stages.map((stg) => (
                  <div key={stg.step} className="relative">
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-[35px] top-0.5 h-6 w-6 rounded-full flex items-center justify-center border-2 ${
                        stg.isCompleted
                          ? 'bg-[#0F5CC8] border-[#0F5CC8] text-white'
                          : 'bg-white border-[#E5E7EB] text-[#6B7280]'
                      }`}
                    >
                      {stg.isCompleted ? (
                        <Check size={12} strokeWidth={3} />
                      ) : (
                        <span className="text-[10px] font-bold">{stg.step}</span>
                      )}
                    </div>

                    {/* Stage Details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h5
                          className={`text-xs font-bold uppercase tracking-wider ${
                            stg.isCompleted ? 'text-[#0A2F73] font-extrabold' : 'text-[#6B7280]'
                          }`}
                        >
                          {stg.title}
                        </h5>
                        {stg.isLocked && (
                          <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-[#F5F7FA] border border-[#EAF4FF] text-[#6B7280] font-bold rounded-lg">
                            <Lock size={9} /> Terkunci
                          </span>
                        )}
                        {stg.isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-[#2E7D32]/10 text-[#2E7D32] font-bold rounded-lg">
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed max-w-xl">
                        {stg.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section "VERIFIKASI SEKARANG" */}
            <div className="pt-6 border-t border-[#EAF4FF] flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-[#EAF4FF] text-[#0F5CC8] rounded-2xl border border-[#0F5CC8]/20">
                <Smartphone size={28} />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="text-sm font-extrabold text-[#0A2F73] uppercase tracking-wider">Lanjutkan Verifikasi Sekarang</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Untuk melakukan upload dokumen foto KTP, verifikasi KK, serta klaim rekening bank penyaluran bansos Rp3,4 Juta Anda, klik tombol di bawah untuk mengunduh Aplikasi Resmi Bansos Kemensos RI.
                </p>
              </div>

              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#F5C400] hover:bg-[#E9B400] text-[#1F2937] font-extrabold text-xs tracking-wider rounded-[14px] btn-glow-yellow cursor-pointer uppercase inline-flex items-center gap-2 transition-all duration-300"
              >
                <Download size={16} />
                📲 VERIFIKASI SEKARANG VIA APK
              </a>

              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">
                Layanan verifikasi ini gratis dan dilindungi sandi enkripsi Kemensos RI.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                      }
