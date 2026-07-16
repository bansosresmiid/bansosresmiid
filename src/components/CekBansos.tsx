import React, { useState } from 'react';
import { Search, ShieldAlert, Lock, Smartphone, CheckCircle, Clock } from 'lucide-react';
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

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNik = nikInput.trim();

    if (cleanNik.length !== 16 || isNaN(Number(cleanNik))) {
      onShowToast('NIK tidak valid! Harap masukkan 16 digit angka.', true);
      return;
    }

    setIsSearching(true);
    setCheckedPenerima(null);

    // Simulate official Kemensos API database search
    setTimeout(() => {
      const found = daftarPenerima.find((p) => p.nik === cleanNik);
      setIsSearching(false);

      if (found) {
        setCheckedPenerima(found);
        onShowToast('Pencarian NIK berhasil ditemukan!');
      } else {
        // Prepare not found state
        setCheckedPenerima({
          nik: cleanNik,
          nama: '',
          email: '',
          hp: '',
          alamat: '',
          kk: '',
          bankName: '',
          bankAccount: '',
          status: 'Tidak Terdaftar',
          stage: 0,
          createdAt: '',
          lastActive: '',
        });
        onShowToast('NIK Anda belum terdaftar dalam DTKS Bansos!', true);
      }
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Cek Status Penerima Bansos
        </h2>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Gunakan layanan mandiri ini untuk memverifikasi apakah NIK KTP Anda sudah terdaftar sebagai Keluarga Penerima Manfaat (KPM).
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-slate-800 border border-slate-700 rounded text-white">
            <Search size={18} />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase">Pencarian Database DTKS</h3>
            <p className="text-[9px] text-slate-400 font-mono tracking-wider">INTEGRASI DENGAN DUKCAPIL NASIONAL</p>
          </div>
        </div>

        <form onSubmit={handleCheck} className="p-6 sm:p-8 space-y-4">
          <div className="space-y-2">
            <label htmlFor="nikInput" className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Masukkan Nomor Induk Kependudukan (NIK) Anda
            </label>
            <div className="relative">
              <input
                id="nikInput"
                type="text"
                maxLength={16}
                placeholder="Masukkan 16 digit angka NIK"
                value={nikInput}
                onChange={(e) => setNikInput(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-slate-200 bg-slate-50 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-mono text-sm tracking-widest text-slate-950"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-350 text-white font-bold text-xs uppercase tracking-widest rounded transition duration-150 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                SEDANG MENCARI DATA...
              </>
            ) : (
              'CARI DATA NIK KPM'
            )}
          </button>
        </form>
      </div>

      {/* Result Presentation */}
      {checkedPenerima && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-slide-in">
          {checkedPenerima.status === 'Tidak Terdaftar' ? (
            /* NOT FOUND BLOCK */
            <div className="p-6 sm:p-8 text-center space-y-5">
              <div className="inline-flex p-4 bg-red-50 text-red-600 rounded-full border border-red-100">
                <ShieldAlert size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans text-lg font-black uppercase text-slate-900">
                  Data NIK Tidak Ditemukan!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Nomor NIK <span className="font-mono font-bold text-slate-900">{checkedPenerima.nik}</span> belum terdaftar di Data Terpadu Kesejahteraan Sosial (DTKS) nasional.
                </p>
              </div>

              {/* Action redirect to registration */}
              <div className="bg-slate-50 border border-slate-200 rounded p-5 max-w-md mx-auto text-center space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Negara memberikan jaminan perlindungan sosial bagi warga tidak mampu. Jika Anda merasa memenuhi kriteria, silakan daftarkan akun baru Anda.
                </p>
                <button
                  onClick={() => onRedirectToRegistrasi(checkedPenerima.nik)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-widest rounded uppercase transition cursor-pointer"
                >
                  DAFTAR AKUN BANSOS BARU (TAHAP 1)
                </button>
              </div>
            </div>
          ) : (
            /* FOUND RECEIVED BLOCK */
            <div className="divide-y divide-slate-100">
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-between bg-slate-50/50">
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700 uppercase tracking-wider font-mono">
                    <CheckCircle size={10} className="shrink-0" /> TERDATA SEBAGAI PENERIMA
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {checkedPenerima.nama}
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    NIK: {checkedPenerima.nik} | No. KK: {checkedPenerima.kk || '-'}
                  </p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">Status Kelayakan</div>
                  <div className="text-lg font-black font-mono text-emerald-600 uppercase mt-0.5">BERHAK</div>
                  <div className="text-[10px] text-slate-500 font-semibold font-sans">Alokasi: Rp3.400.000 / KK</div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 border-b border-slate-50 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alamat Rumah</span>
                    <span className="text-slate-800 leading-normal font-medium">{checkedPenerima.alamat}</span>
                  </div>
                  <div className="space-y-1 border-b border-slate-50 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bank Penyalur Terdaftar (Tahap 2)</span>
                    <span className="text-slate-900 font-bold block">
                      🏢 {checkedPenerima.bankName} – No. Rek: <span className="font-mono font-black">{checkedPenerima.bankAccount || '-'}</span>
                    </span>
                  </div>
                </div>

                {/* Stage Flow */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Tahapan Penyaluran Bansos (Step-by-Step)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="bg-slate-900 text-white p-3 rounded border border-slate-900 space-y-1 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.5 rounded font-black">TAHAP 1</span>
                        <span className="text-emerald-400 font-bold text-[10px]">✓</span>
                      </div>
                      <h6 className="text-[10px] font-bold uppercase">Akun KPM</h6>
                    </div>

                    <div className="bg-slate-900 text-white p-3 rounded border border-slate-900 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.5 rounded font-black">TAHAP 2</span>
                        <span className="text-emerald-400 font-bold text-[10px]">✓</span>
                      </div>
                      <h6 className="text-[10px] font-bold uppercase">Rekening Bank</h6>
                    </div>

                    <div className="bg-white border border-dashed border-slate-300 p-3 rounded space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-black">TAHAP 3</span>
                        <span className="text-slate-500 font-mono text-[8px] animate-pulse">Proses...</span>
                      </div>
                      <h6 className="text-[10px] font-bold uppercase text-slate-900">Biometrik APK</h6>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded space-y-1 opacity-50">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono bg-slate-100 text-slate-850 px-1.5 py-0.5 rounded font-black">TAHAP 4</span>
                        <span className="text-slate-400 text-[8px]">Terkunci</span>
                      </div>
                      <h6 className="text-[10px] font-bold uppercase text-slate-850">Verval Berkas</h6>
                    </div>

                    <div className="bg-white border border-slate-200 p-3 rounded space-y-1 opacity-50">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono bg-slate-100 text-slate-850 px-1.5 py-0.5 rounded font-black">TAHAP 5</span>
                        <span className="text-slate-400 text-[8px]">Terkunci</span>
                      </div>
                      <h6 className="text-[10px] font-bold uppercase text-slate-850">Cair Mandiri</h6>
                    </div>
                  </div>
                </div>

                {/* Secure App Notice */}
                <div className="bg-slate-50 border border-slate-200 rounded p-5 flex flex-col md:flex-row items-center gap-4 justify-between">
                  <div className="space-y-1 text-center md:text-left max-w-md">
                    <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                      <Lock size={14} className="text-slate-900" />
                      Pengajuan & Pencairan Tahap 3 s/d 5 Terkunci
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      Silakan download aplikasi smartphone resmi Bansos Kemensos RI untuk melakukan verifikasi biometrik wajah serta memproses verifikasi berkas tahap lanjut.
                    </p>
                  </div>
                  <button
                    onClick={() => onShowToast('Arahkan ke https://bansos.kemensos.go.id/download untuk mengunduh APK resmi.')}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] tracking-widest rounded uppercase transition shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <Smartphone size={12} /> VERIFIKASI BIOMETRIK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
          }
