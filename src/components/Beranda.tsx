import React from 'react';
import { Calendar, Award, Users, Download, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { visiMisiBansos } from '../data/initialData';

interface BerandaProps {
  onCheckNikClick: () => void;
  onShowToast: (message: string) => void;
}

export default function Beranda({ onCheckNikClick, onShowToast }: BerandaProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white rounded-xl border border-slate-200 p-8 sm:p-10 shadow-xs">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-slate-100/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-900 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Siaran Pers Resmi Kemensos RI
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] uppercase">
            Bantuan Sosial Negara <br />
            <span className="text-slate-400">Untuk Kesejahteraan Rakyat</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Wujud nyata kehadiran Negara Kesatuan Republik Indonesia dalam menjamin perlindungan sosial dan kesejahteraan masyarakat yang rentan secara ekonomi. Melalui pendaftaran terpadu berbasis NIK, penyaluran berjalan cepat, akurat, dan transparan.
          </p>

          {/* Program Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="bg-slate-50 border border-slate-200 rounded p-5 flex items-start gap-4">
              <div className="p-3 bg-white border border-slate-200 text-slate-900 rounded">
                <Calendar size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal Dimulai</div>
                <div className="text-sm font-bold text-slate-900 mt-1">09 Juli 2026</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-5 flex items-start gap-4">
              <div className="p-3 bg-white border border-slate-200 text-slate-900 rounded">
                <Award size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nominal Bantuan</div>
                <div className="text-sm font-bold text-slate-900 mt-1">Rp3.400.000 / KK</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded p-5 flex items-start gap-4">
              <div className="p-3 bg-white border border-slate-200 text-slate-900 rounded">
                <Users size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Penerima</div>
                <div className="text-sm font-bold text-slate-900 mt-1">700.000 KK Nasional</div>
              </div>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onCheckNikClick}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-150 flex items-center gap-2 cursor-pointer"
            >
              🔍 Cek NIK Sekarang
              <ArrowRight size={14} />
            </button>
            
            <button
              onClick={() => onShowToast('Silakan unduh APK resmi di https://bansos.kemensos.go.id/download')}
              className="px-6 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-widest rounded transition-all duration-150 flex items-center gap-2 cursor-pointer"
            >
              <Download size={14} />
              📲 Unduh APK Bansos
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-2">
            <ShieldCheck size={14} className="text-slate-900 shrink-0" />
            Pengajuan verifikasi and pencairan dana wajib dilakukan melalui aplikasi resmi Bansos Kemensos RI demi keamanan data perbankan Anda.
          </p>
        </div>
      </div>

      {/* Alur Kerja & Tujuan Bansos Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tujuan Bansos */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-950 uppercase tracking-wider">
              Tujuan & Manfaat
            </div>
            <h3 className="font-sans text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              Untuk Apa Bantuan Sosial Ini Disalurkan?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Program Bantuan Sosial (Bansos) Negara dirancang secara terintegrasi oleh Kementerian Sosial Republik Indonesia dengan misi mulia kemanusiaan.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <span className="text-emerald-500 font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  <strong>Mengurangi Beban Pengeluaran:</strong> Membantu keluarga rentan dalam memenuhi kebutuhan pokok hidup sehari-hari.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-500 font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  <strong>Meningkatkan Gizi & Kesehatan:</strong> Memastikan akses pangan bergizi dan pelayanan kesehatan dasar anak serta ibu hamil.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-500 font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  <strong>Pemberantasan Kemiskinan:</strong> Menjadi jaring pengaman sosial untuk memutus rantai kemiskinan ekstrem di Indonesia.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-500 font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-slate-700 leading-normal font-medium">
                  <strong>Inklusi Finansial:</strong> Mendorong transaksi nontunai masyarakat melalui pembukaan rekening bank penyalur resmi.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-[11px] text-slate-500 leading-relaxed font-sans uppercase">
            ⚠️ <strong>Dana bansos murni hak KPM:</strong> Disalurkan penuh Rp3.400.000 tanpa potongan biaya administrasi apa pun oleh pihak mana pun.
          </div>
        </div>

        {/* Step-by-Step Alur Kerja */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Workflow Pelayanan</span>
              <h3 className="font-sans text-xl font-black text-slate-900 uppercase tracking-tight">
                Alur Kerja Penyaluran Bansos Step-by-Step
              </h3>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-8 py-2">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-slate-900 border-4 border-white text-white flex items-center justify-center font-mono text-[10px] font-black">
                1
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Pendaftaran Akun KPM (Tahap 1)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calon Keluarga Penerima Manfaat (KPM) melakukan pendaftaran akun secara online di portal ini dengan menginput NIK, No. KK, Email, No. HP, dan Alamat rumah yang sesuai dengan data Dukcapil.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-slate-900 border-4 border-white text-white flex items-center justify-center font-mono text-[10px] font-black">
                2
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Pengisian Rekening Rencana Penerimaan
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pendaftar memilih salah satu Bank Penyalur resmi (seperti Bank Mandiri, BRI, BNI, BTN, BCA, atau BSI) dan memasukkan nomor rekening aktif atas nama sendiri guna persiapan pencairan nontunai secara langsung.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-slate-400 border-4 border-white text-white flex items-center justify-center font-mono text-[10px] font-black">
                3
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  Verifikasi Biometrik (Melalui Aplikasi Smartphone / APK)
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Untuk menjaga validitas kependudukan, pendaftar mengunduh APK resmi Kemensos RI dan melakukan verifikasi biometrik wajah (face recognition) serta swafoto dengan memegang KTP asli.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-slate-400 border-4 border-white text-white flex items-center justify-center font-mono text-[10px] font-black">
                4
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verifikasi & Validasi (Verval) Berkas Kemensos
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pihak verifikator Kementerian Sosial melakukan verifikasi administratif berlapis dan mencocokkan kelayakan pendaftar dengan Data Terpadu Kesejahteraan Sosial (DTKS) nasional.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-slate-400 border-4 border-white text-white flex items-center justify-center font-mono text-[10px] font-black">
                5
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pencairan Dana Langsung ke Rekening KPM
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Setelah lolos seluruh tahapan verifikasi, dana bantuan sosial sebesar Rp3.400.000 ditransfer langsung dari kas negara secara otomatis ke nomor rekening masing-masing KPM yang sah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visi Misi Section */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Banner header of Visi Misi */}
        <div className="bg-slate-900 px-6 py-8 text-center border-b border-slate-850">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded text-[9px] font-bold text-white uppercase tracking-widest mb-3">
            Garuda Pancasila Sinergi
          </div>
          <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Visi & Misi Bantuan Sosial RI
          </h3>
          <p className="text-[10px] text-slate-400 font-mono tracking-widest mt-1 uppercase">
            Pemerintah Republik Indonesia – Kementerian Sosial
          </p>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          {/* Visi Card */}
          <div className="relative bg-slate-50 border-l-4 border-slate-900 p-6 rounded-r">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-450 mb-2 flex items-center gap-2">
              <FileText size={14} className="text-slate-900" />
              Visi Utama
            </h4>
            <p className="font-sans text-base sm:text-lg italic text-slate-800 leading-relaxed font-semibold">
              &ldquo;{visiMisiBansos.visi}&rdquo;
            </p>
          </div>

          {/* Misi & Tujuan Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Misi Column */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-2">
                Misi Pembangunan Sosial
              </h4>
              <ul className="space-y-3">
                {visiMisiBansos.misi.map((m, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 h-5 w-5 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-[10px] font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tujuan Column */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-2">
                Tujuan Strategis Nasional
              </h4>
              <div className="space-y-4">
                {visiMisiBansos.tujuan.map((t, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded flex gap-3">
                    <CheckCircle2 size={18} className="text-slate-900 mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-600 leading-normal">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        }
