import React, { useState } from 'react';
import { Users, FileText, Calendar, PlusCircle, Edit2, Trash2, Search, X, Check, Save, Shield, Clock, TrendingUp } from 'lucide-react';
import { Penerima, ActivityLog } from '../types';
import { visiMisiBansos } from '../data/initialData';

interface AdminDashboardProps {
  daftarPenerima: Penerima[];
  activityLogs: ActivityLog[];
  onAddPenerima: (p: Penerima) => void;
  onUpdatePenerima: (updated: Penerima) => void;
  onDeletePenerima: (nik: string) => void;
  onLogout: () => void;
  onShowToast: (message: string, isError?: boolean) => void;
}

export default function AdminDashboard({
  daftarPenerima,
  activityLogs,
  onAddPenerima,
  onUpdatePenerima,
  onDeletePenerima,
  onLogout,
  onShowToast,
}: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPenerima, setEditingPenerima] = useState<Penerima | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add/Edit
  const [formNik, setFormNik] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formHp, setFormHp] = useState('');
  const [formAlamat, setFormAlamat] = useState('');
  const [formKk, setFormKk] = useState('');
  const [formBankName, setFormBankName] = useState('Bank Mandiri');
  const [formBankAccount, setFormBankAccount] = useState('');
  const [formBankAccountName, setFormBankAccountName] = useState('');
  const [formStatus, setFormStatus] = useState<'Berhak' | 'Proses'>('Berhak');

  // Real-time calculation per day (Indonesia Local Time is 2026-07-12)
  const todayStr = '2026-07-12';
  const registeredToday = daftarPenerima.filter((p) => p.createdAt === todayStr);

  const filteredPenerima = daftarPenerima.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nik.includes(searchTerm)
  );

  const handleOpenEdit = (p: Penerima) => {
    setEditingPenerima(p);
    setFormNik(p.nik);
    setFormNama(p.nama);
    setFormEmail(p.email);
    setFormHp(p.hp);
    setFormAlamat(p.alamat);
    setFormKk(p.kk || '');
    setFormBankName(p.bankName || 'Bank Mandiri');
    setFormBankAccount(p.bankAccount || '');
    setFormBankAccountName(p.bankAccountName || p.nama);
    setFormStatus(p.status === 'Berhak' ? 'Berhak' : 'Proses');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPenerima) return;

    if (formNik.length !== 16 || formKk.length !== 16) {
      onShowToast('NIK dan KK wajib terdiri dari 16 digit angka!', true);
      return;
    }

    const updated: Penerima = {
      ...editingPenerima,
      nik: formNik.trim(),
      nama: formNama.trim(),
      email: formEmail.trim(),
      hp: formHp.trim(),
      alamat: formAlamat.trim(),
      kk: formKk.trim(),
      bankName: formBankName,
      bankAccount: formBankAccount.trim(),
      bankAccountName: formBankAccountName.trim(),
      status: formStatus,
    };

    onUpdatePenerima(updated);
    setEditingPenerima(null);
    onShowToast(`Data pelanggan ${formNama} berhasil diperbarui!`);
  };

  const handleOpenAdd = () => {
    setFormNik('');
    setFormNama('');
    setFormEmail('');
    setFormHp('');
    setFormAlamat('');
    setFormKk('');
    setFormBankName('Bank Mandiri');
    setFormBankAccount('');
    setFormBankAccountName('');
    setFormStatus('Berhak');
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formNik.length !== 16 || formKk.length !== 16) {
      onShowToast('NIK dan KK wajib terdiri dari 16 digit angka!', true);
      return;
    }

    // Check duplicated NIK
    if (daftarPenerima.some((p) => p.nik === formNik)) {
      onShowToast(`NIK ${formNik} sudah terdaftar sebelumnya!`, true);
      return;
    }

    const newPenerima: Penerima = {
      nik: formNik.trim(),
      nama: formNama.trim(),
      email: formEmail.trim(),
      hp: formHp.trim(),
      alamat: formAlamat.trim(),
      kk: formKk.trim(),
      bankName: formBankName,
      bankAccount: formBankAccount.trim(),
      bankAccountName: formBankAccountName.trim(),
      status: formStatus,
      stage: 1,
      createdAt: todayStr, // Mark created today
      lastActive: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    };

    onAddPenerima(newPenerima);
    setIsAddModalOpen(false);
    onShowToast(`Pelanggan baru ${formNama} berhasil ditambahkan ke database.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <Shield size={12} /> Administrator Secured Zone
          </span>
          <h2 className="font-sans text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-1">
            Dashboard Pengelolaan Bansos
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle size={14} /> TAMBAH PENERIMA KPM
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-widest rounded transition cursor-pointer"
          >
            KELUAR (LOGOUT)
          </button>
        </div>
      </div>

      {/* Grid Stats Per Hari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Registered */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Total Terdaftar</span>
            <div className="text-2xl font-mono font-bold text-slate-900">{daftarPenerima.length} KK</div>
            <p className="text-[10px] text-slate-500 font-semibold">Seluruh Wilayah NKRI</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-250 text-slate-900 rounded">
            <Users size={22} />
          </div>
        </div>

        {/* Stat 2: Real-time Today */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Registrasi Hari Ini</span>
            <div className="text-2xl font-mono font-bold text-emerald-600 flex items-center gap-1">
              +{registeredToday.length}
              <TrendingUp size={16} className="text-emerald-500 animate-bounce" />
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">Real-Time: {todayStr}</p>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
            <Calendar size={22} />
          </div>
        </div>

        {/* Stat 3: Total Budget Allocated */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Dana Alokasi KK</span>
            <div className="text-2xl font-mono font-bold text-slate-800">Rp3,4 Jt</div>
            <p className="text-[10px] text-slate-500 font-semibold">Per Keluarga Penerima</p>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <FileText size={22} />
          </div>
        </div>

        {/* Stat 4: Stage 1 Completed Ratio */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Tahap 1 Selesai</span>
            <div className="text-2xl font-mono font-bold text-slate-800">
              {daftarPenerima.filter((p) => p.stage === 1).length} KPM
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">100% Akun Valid</p>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid: Management Table + Log + Visi Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table Column - Spans 2 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Daftar Keluarga Penerima Manfaat (KPM)
            </h3>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari nama atau NIK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={12} />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[10px]">
                    <th className="p-3">NIK & KK</th>
                    <th className="p-3">Nama Lengkap</th>
                    <th className="p-3">Kontak & Rekening</th>
                    <th className="p-3">Tanggal Reg</th>
                    <th className="p-3">Kelayakan</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredPenerima.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                        Tidak ada data penerima yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  ) : (
                    filteredPenerima.map((p) => (
                      <tr key={p.nik} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 space-y-1">
                          <div className="font-mono font-semibold text-slate-900">{p.nik}</div>
                          <div className="text-[10px] text-slate-400 font-mono">KK: {p.kk || 'N/A'}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-900">{p.nama}</div>
                          <div className="text-[10px] text-slate-500 max-w-[150px] truncate">{p.alamat}</div>
                        </td>
                        <td className="p-3 space-y-1">
                          <div className="text-slate-600 font-medium">{p.email}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{p.hp}</div>
                          <div className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded inline-block font-mono">
                            🏢 {p.bankName} - {p.bankAccount || 'Belum diinput'}{p.bankAccountName ? ` (a.n. ${p.bankAccountName})` : ''}
                          </div>
                        </td>
                        <td className="p-3 font-mono font-medium text-slate-500">
                          {p.createdAt}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase text-[9px] font-mono border ${
                              p.status === 'Berhak'
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                                : 'bg-amber-50 border-amber-100 text-amber-700'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-950 rounded transition cursor-pointer"
                              title="Edit Data Pelanggan"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Apakah Anda yakin ingin menghapus data KPM ${p.nama}? Tindakan ini permanen.`)) {
                                  onDeletePenerima(p.nik);
                                }
                              }}
                              className="p-1.5 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded transition cursor-pointer"
                              title="Hapus Data Pelanggan"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Log & Visi Misi Column */}
        <div className="space-y-6">
          {/* Government Visi Misi Block */}
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              👑 Visi Misi Republik Indonesia
            </h4>
            
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="italic text-slate-300 font-sans font-semibold border-l-2 border-slate-400 pl-3">
                &ldquo;{visiMisiBansos.visi}&rdquo;
              </p>
              
              <div className="space-y-2">
                <span className="font-bold text-slate-200 font-mono tracking-wider uppercase text-[9px]">Misi Utama Kemensos:</span>
                <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-1">
                  {visiMisiBansos.misi.slice(0, 2).map((m, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Real-time Activity Log */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-sans text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={14} className="text-emerald-600" />
                Log Aktivitas Terkini (Hari Ini)
              </h4>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {activityLogs.map((log) => (
                <div key={log.id} className="text-[11px] leading-relaxed flex items-start gap-2 border-b border-slate-50 pb-2">
                  <div className="text-slate-400 font-mono mt-0.5 font-medium shrink-0">{log.timestamp}</div>
                  <div>
                    <span className="font-bold text-slate-900">{log.nama}</span>{' '}
                    <span className="text-slate-500">{log.action}</span>
                    <span className="text-[9px] text-slate-400 font-mono block">NIK: {log.nik}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {editingPenerima && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
              <h3 className="text-sm font-bold font-serif">✏️ Edit Data Pelanggan KPM</h3>
              <button
                onClick={() => setEditingPenerima(null)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK KTP (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formNik}
                    onChange={(e) => setFormNik(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs tracking-wider"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor KK (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formKk}
                    onChange={(e) => setFormKk(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs tracking-wider"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No HP</label>
                  <input
                    type="text"
                    value={formHp}
                    onChange={(e) => setFormHp(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                <textarea
                  value={formAlamat}
                  onChange={(e) => setFormAlamat(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bank Penerima</label>
                  <select
                    value={formBankName}
                    onChange={(e) => setFormBankName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 bg-white rounded text-xs"
                  >
                 <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BTN">Bank BTN</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank BSI">Bank BSI</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No Rekening</label>
                  <input
                    type="text"
                    value={formBankAccount}
                    onChange={(e) => setFormBankAccount(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Atas Nama</label>
                  <input
                    type="text"
                    value={formBankAccountName}
                    onChange={(e) => setFormBankAccountName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Status Kelayakan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      checked={formStatus === 'Berhak'}
                      onChange={() => setFormStatus('Berhak')}
                      className="accent-slate-900"
                    />
                    Berhak (Rp3.400.000)
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      checked={formStatus === 'Proses'}
                      onChange={() => setFormStatus('Proses')}
                      className="accent-slate-900"
                    />
                    Proses Verifikasi
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingPenerima(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <Save size={12} /> Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
              <h3 className="text-sm font-bold font-serif">➕ Tambah Pelanggan Baru (KPM)</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIK KTP (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formNik}
                    onChange={(e) => setFormNik(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 32730..."
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs tracking-wider"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor KK (16 Digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={formKk}
                    onChange={(e) => setFormKk(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 32730..."
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs tracking-wider"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Nama lengkap sesuai KTP"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No HP</label>
                  <input
                    type="text"
                    value={formHp}
                    onChange={(e) => setFormHp(e.target.value.replace(/\D/g, ''))}
                    placeholder="0812XXXXXXXX"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                <textarea
                  value={formAlamat}
                  onChange={(e) => setFormAlamat(e.target.value)}
                  placeholder="RT/RW Kelurahan, Kecamatan, Kota"
                  rows={2}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bank Penerima</label>
                  <select
                    value={formBankName}
                    onChange={(e) => setFormBankName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 bg-white rounded text-xs"
                  >
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BTN">Bank BTN</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank BSI">Bank BSI</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">No Rekening</label>
                  <input
                    type="text"
                    value={formBankAccount}
                    onChange={(e) => setFormBankAccount(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234XXXXXXXX"
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-mono text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Atas Nama</label>
                  <input
                    type="text"
                    value={formBankAccountName}
                    onChange={(e) => setFormBankAccountName(e.target.value)}
                    placeholder="Nama pemilik rekening"
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase block">Status Kelayakan</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      checked={formStatus === 'Berhak'}
                      onChange={() => setFormStatus('Berhak')}
                      className="accent-slate-900"
                    />
                    Berhak (Rp3.400.000)
                    </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      checked={formStatus === 'Proses'}
                      onChange={() => setFormStatus('Proses')}
                      className="accent-slate-900"
                    />
                    Proses Verifikasi
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <PlusCircle size={12} /> Tambah Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
