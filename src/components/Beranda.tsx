import React from 'react';
import { Calendar, Award, Users, Download, ArrowRight, ShieldCheck, FileText, CheckCircle2, Smartphone, Lock, Sparkles, Check } from 'lucide-react';
import { visiMisiBansos } from '../data/initialData';
import GaleriArsip from './GaleriArsip';
import VisiMisiUUSection from './VisiMisiUUSection';

interface BerandaProps {
  onCheckNikClick: () => void;
  onShowToast: (message: string) => void;
}

export default function Beranda({ onCheckNikClick }: BerandaProps) {
  const apkDownloadUrl = "https://github.com/bansosresmiid/bansosresmiid/releases/download/v1.0/Bansos_2026.apk";

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section with Wave & Geometric Elements */}
      <div className="relative overflow-hidden bg-white rounded-[24px] border border-[#EAF4FF] p-6 sm:p-10 lg:p-12 shadow-md shadow-[#0F5CC8]/5">
        {/* Background Decorative Soft Blue Geometric Circles */}
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-[#EAF4FF]/80 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#0F5CC8]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Decorative Wave Pattern SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200C300 120 600 280 900 180C1050 130 1150 150 1200 170V600H0V200Z" fill="#EAF4FF" fillOpacity="0.5"/>
            <path d="M0 350C250 280 550 420 850 320C1000 270 1120 310 1200 330V600H0V350Z" fill="#0F5CC8" fillOpacity="0.04"/>
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Press Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EAF4FF] border border-[#0F5CC8]/20 rounded-full text-xs font-bold text-[#0F5CC8] uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#0F5CC8] animate-ping"></span>
              Siaran Pers Resmi Kemensos RI
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2F73] tracking-tight leading-[1.15]">
              Bantuan Sosial Negara <br />
              <span className="text-[#0F5CC8]">Untuk Kesejahteraan Rakyat</span>
            </h2>

            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-xl">
              Wujud nyata kehadiran Negara Kesatuan Republik Indonesia dalam menjamin perlindungan sosial dan kesejahteraan masyarakat yang rentan secara ekonomi. Melalui pendaftaran terpadu berbasis NIK, penyaluran berjalan cepat, akurat, dan transparan.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
              <div className="bg-[#F5F7FA] border border-[#EAF4FF] rounded-[18px] p-4 flex items-center gap-3.5 hover:border-[#0F5CC8]/30 transition-all">
                <div className="p-3 bg-white text-[#0F5CC8] rounded-xl shadow-xs border border-[#EAF4FF]">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Tanggal Dimulai</div>
                  <div className="text-sm font-extrabold text-[#0A2F73] mt-0.5">28 Juli 2026</div>
                </div>
              </div>

              <div className="bg-[#F5F7FA] border border-[#EAF4FF] rounded-[18px] p-4 flex items-center gap-3.5 hover:border-[#0F5CC8]/30 transition-all">
                <div className="p-3 bg-white text-[#0F5CC8] rounded-xl shadow-xs border border-[#EAF4FF]">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Nominal Bantuan</div>
                  <div className="text-sm font-extrabold text-[#0A2F73] mt-0.5">Rp3.400.000 / KK</div>
                </div>
              </div>

              <div className="bg-[#F5F7FA] border border-[#EAF4FF] rounded-[18px] p-4 flex items-center gap-3.5 hover:border-[#0F5CC8]/30 transition-all">
                <div className="p-3 bg-white text-[#0F5CC8] rounded-xl shadow-xs border border-[#EAF4FF]">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Target Penerima</div>
                  <div className="text-sm font-extrabold text-[#0A2F73] mt-0.5">700.000 KK</div>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onCheckNikClick}
                className="px-6 py-3.5 bg-[#0F5CC8] hover:bg-[#0A2F73] text-white font-bold text-xs uppercase tracking-wider rounded-[14px] btn-glow-blue flex items-center gap-2 cursor-pointer transition-all duration-300"
              >
                🔍 Cek NIK Sekarang
                <ArrowRight size={16} />
              </button>
              
              <a
                href={apkDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#F5C400] hover:bg-[#E9B400] text-[#1F2937] font-extrabold text-xs uppercase tracking-wider rounded-[14px] btn-glow-yellow inline-flex items-center gap-2 cursor-pointer transition-all duration-300"
              >
                <Download size={16} />
                📲 Unduh APK Bansos
              </a>
            </div>

            <p className="text-xs text-[#6B7280] mt-3 flex items-center gap-2 bg-[#EAF4FF]/50 p-2.5 rounded-xl border border-[#EAF4FF]">
              <ShieldCheck size={16} className="text-[#0F5CC8] shrink-0" />
              Pengajuan verifikasi dan pencairan dana wajib dilakukan melalui aplikasi resmi Bansos Kemensos RI demi keamanan data perbankan Anda.
            </p>
          </div>

          {/* Right Column: Smartphone Mockup & Official Badges */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            {/* Phone Frame Container */}
            <div className="relative w-full max-w-[290px] bg-[#0A2F73] p-3 rounded-[38px] shadow-2xl border-4 border-[#0F5CC8]/30 animate-float">
              {/* Phone Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-800"></div>
              </div>

              {/* Phone Inner Screen Display */}
              <div className="bg-white rounded-[30px] overflow-hidden pt-8 pb-6 px-4 space-y-4 border border-slate-100 min-h-[460px] flex flex-col justify-between">
                {/* Header in App */}
                <div className="bg-[#0A2F73] text-white p-3.5 rounded-2xl text-center shadow-sm">
                  <div className="flex items-center justify-center gap-2">
                    <img src="https://i.ibb.co.com/1fvdTbzz/Logo-Kemensos.png" alt="Logo" className="h-6 w-auto brightness-200" />
                    <span className="text-xs font-bold tracking-tight">Cek Bansos RI</span>
                  </div>
                  <p className="text-[9px] text-[#EAF4FF] mt-1">Versi Resmi Mobile v1.0 2026</p>
                </div>

                {/* App Screen Content Preview */}
                <div className="space-y-3">
                  <div className="p-3 bg-[#EAF4FF] rounded-xl border border-[#0F5CC8]/20">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#0A2F73]">
                      <span>STATUS PENERIMA:</span>
                      <span className="px-2 py-0.5 bg-[#2E7D32] text-white rounded-full font-extrabold text-[9px]">BERHAK</span>
                    </div>
                    <p className="text-[11px] font-bold text-[#1F2937] mt-1">Ahmad Syahrul</p>
                    <p className="text-[9px] text-[#6B7280]">NIK: 3273011205980001</p>
                  </div>

                  <div className="p-3 bg-white border border-[#EAF4FF] rounded-xl shadow-2xs space-y-2">
                    <div className="flex justify-between text-[10px] font-semibold text-[#6B7280]">
                      <span>Dana Bantuan:</span>
                      <span className="font-bold text-[#0F5CC8]">Rp 3.400.000</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-[#6B7280]">
                      <span>Bank Penyalur:</span>
                      <span className="font-bold text-[#0A2F73]">Bank BRI</span>
                    </div>
                    <div className="w-full bg-[#2E7D32] text-white text-[10px] font-bold py-1.5 text-center rounded-lg">
                      Pencairan Siap Diterima
                    </div>
                  </div>
                </div>

                {/* Download App Promo inside phone */}
                <a 
                  href={apkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#F5C400] hover:bg-[#E9B400] text-[#1F2937] text-[11px] font-extrabold py-2.5 rounded-xl uppercase tracking-wider transition-all"
                >
                  Unduh APK Sekarang
                </a>
              </div>
            </div>

            {/* Requested Floating Badges Around Phone */}
            {/* Badge 1: Data Aman */}
            <div className="absolute -top-2 -left-2 sm:-left-6 bg-white border border-[#EAF4FF] shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 z-20 animate-slide-up">
              <span className="h-6 w-6 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <span className="text-xs font-bold text-[#0A2F73]">Data Aman Enkripsi</span>
            </div>

            {/* Badge 2: Mudah Digunakan */}
            <div className="absolute top-1/2 -right-2 sm:-right-6 bg-white border border-[#EAF4FF] shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 z-20 animate-slide-up">
              <span className="h-6 w-6 rounded-full bg-[#0F5CC8]/10 text-[#0F5CC8] flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <span className="text-xs font-bold text-[#0A2F73]">Mudah Digunakan</span>
            </div>

            {/* Badge 3: Simulasi Pembelajaran */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-[#F5C400]/40 shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 z-20 animate-slide-up">
              <span className="h-6 w-6 rounded-full bg-[#F5C400] text-[#1F2937] flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <span className="text-xs font-bold text-[#1F2937]">Simulasi Pembelajaran</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alur Kerja & Purpose Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Purpose Card */}
        <div className="lg:col-span-1 card-official p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF4FF] border border-[#0F5CC8]/20 rounded-full text-[10px] font-bold text-[#0F5CC8] uppercase tracking-wider">
              Tujuan & Manfaat Program
            </div>
            <h3 className="font-sans text-xl font-extrabold text-[#0A2F73] uppercase tracking-tight leading-tight">
              Untuk Apa Bantuan Sosial Ini Disalurkan?
            </h3>
            <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
              Program Bantuan Sosial (Bansos) Negara dirancang secara terintegrasi oleh Kementerian Sosial Republik Indonesia dengan misi mulia kemanusiaan.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <span className="text-[#2E7D32] font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-[#1F2937] leading-normal font-medium">
                  <strong>Mengurangi Beban Pengeluaran:</strong> Membantu keluarga rentan dalam memenuhi kebutuhan pokok hidup sehari-hari.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#2E7D32] font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-[#1F2937] leading-normal font-medium">
                  <strong>Meningkatkan Gizi & Kesehatan:</strong> Memastikan akses pangan bergizi dan pelayanan kesehatan dasar anak serta ibu hamil.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#2E7D32] font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-[#1F2937] leading-normal font-medium">
                  <strong>Pemberantasan Kemiskinan:</strong> Menjadi jaring pengaman sosial untuk memutus rantai kemiskinan ekstrem di Indonesia.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#2E7D32] font-bold text-sm shrink-0">✓</span>
                <p className="text-xs text-[#1F2937] leading-normal font-medium">
                  <strong>Inklusi Finansial:</strong> Mendorong transaksi nontunai masyarakat melalui pembukaan rekening bank penyalur resmi.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F7FA] border border-[#EAF4FF] rounded-[14px] p-4 text-[11px] text-[#6B7280] leading-relaxed font-sans uppercase">
            ⚠️ <strong>Dana bansos murni hak KPM:</strong> Disalurkan penuh Rp3.400.000 tanpa potongan biaya administrasi apa pun oleh pihak mana pun.
          </div>
        </div>

        {/* Workflow Card */}
        <div className="lg:col-span-2 card-official p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAF4FF] pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#0F5CC8] uppercase tracking-widest block">Workflow Pelayanan</span>
              <h3 className="font-sans text-xl font-extrabold text-[#0A2F73] uppercase tracking-tight">
                Alur Kerja Penyaluran Bansos Step-by-Step
              </h3>
            </div>
          </div>

          <div className="relative border-l-2 border-[#0F5CC8]/20 pl-6 ml-3 space-y-8 py-2">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-[#0F5CC8] border-4 border-white text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                1
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-[#0A2F73] uppercase tracking-wider">
                  Pendaftaran Akun KPM (Tahap 1)
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Calon Keluarga Penerima Manfaat (KPM) melakukan pendaftaran akun secara online di portal ini dengan menginput NIK, No. KK, Email, No. HP, dan Alamat rumah yang sesuai dengan data Dukcapil.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-[#0F5CC8] border-4 border-white text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                2
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-[#0A2F73] uppercase tracking-wider">
                  Pengisian Rekening Rencana Penerimaan
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Pendaftar memilih salah satu Bank Penyalur resmi (seperti Bank Mandiri, BRI, BNI, BTN, BCA, atau BSI) dan memasukkan nomor rekening aktif atas nama sendiri guna persiapan pencairan nontunai secara langsung.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-[#F5C400] border-4 border-white text-[#1F2937] flex items-center justify-center text-[10px] font-black shadow-xs">
                3
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-[#0A2F73] uppercase tracking-wider flex items-center gap-2">
                  Verifikasi Biometrik (Melalui Aplikasi Smartphone / APK)
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Untuk menjaga validitas kependudukan, pendaftar mengunduh APK resmi Kemensos RI dan melakukan verifikasi biometrik wajah (face recognition) serta swafoto dengan memegang KTP asli.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-[#0A2F73] border-4 border-white text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                4
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-[#0A2F73] uppercase tracking-wider">
                  Verifikasi & Validasi (Verval) Berkas Kemensos
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Pihak verifikator Kementerian Sosial melakukan verifikasi administratif berlapis dan mencocokkan kelayakan pendaftar dengan Data Terpadu Kesejahteraan Sosial (DTKS) nasional.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-[#2E7D32] border-4 border-white text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                5
              </span>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-[#0A2F73] uppercase tracking-wider">
                  Pencairan Dana Langsung ke Rekening KPM
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Setelah lolos seluruh tahapan verifikasi, dana bantuan sosial sebesar Rp3.400.000 ditransfer langsung dari kas negara secara otomatis ke nomor rekening masing-masing KPM yang sah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galeri Arsip Dokumentasi Program Kemasyarakatan */}
      <GaleriArsip />

      {/* Visi Misi & UU Section */}
      <VisiMisiUUSection />
    </div>
  );
}
