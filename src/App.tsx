import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Beranda from './components/Beranda';
import CekBansos from './components/CekBansos';
import Registrasi from './components/Registrasi';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Kontak from './components/Kontak';

import { Penerima, ActivityLog } from './types';
import { initialPenerima, initialLogs } from './data/initialData';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeSection, setActiveSection] = useState<string>('beranda');

  // Core States (Loaded from localStorage or initialized with defaults)
  const [daftarPenerima, setDaftarPenerima] = useState<Penerima[]>(() => {
    const saved = localStorage.getItem('bansos_penerima');
    return saved ? JSON.parse(saved) : initialPenerima;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('bansos_logs');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [currentUser, setCurrentUser] = useState<Penerima | null>(() => {
    const saved = localStorage.getItem('bansos_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('bansos_admin_logged') === 'true';
  });

  // Cross-navigation states
  const [prefilledNik, setPrefilledNik] = useState<string>('');

  // Toast System
  const [toastMsg, setToastMsg] = useState<string>('');
  const [toastIsError, setToastIsError] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bansos_penerima', JSON.stringify(daftarPenerima));
  }, [daftarPenerima]);

  // Sync logs to localStorage
  useEffect(() => {
    localStorage.setItem('bansos_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Sync current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bansos_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bansos_current_user');
    }
  }, [currentUser]);

  // Sync Admin status
  useEffect(() => {
    localStorage.setItem('bansos_admin_logged', String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Trigger Toast Notification
  const triggerToast = (message: string, isError: boolean = false) => {
    setToastMsg(message);
    setToastIsError(isError);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Activity Log helper
  const addLog = (nik: string, nama: string, action: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const date = '2026-07-12'; // Fixed current local date per requirement

    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      nik,
      nama,
      action,
      timestamp,
      date,
    };

    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // HANDLERS

  // 1. Redirection from empty NIK Check to Registration as requested
  const handleRedirectToRegistrasi = (nik: string) => {
    setPrefilledNik(nik);
    setActiveSection('registrasi');
  };

  // 2. Complete Stage 1 Account Registration
  const handleRegister = (newClient: Omit<Penerima, 'status' | 'stage' | 'createdAt' | 'lastActive'>) => {
    // Check if duplicate
    if (daftarPenerima.some((p) => p.nik === newClient.nik)) {
      triggerToast(`NIK ${newClient.nik} sudah terdaftar dalam sistem!`, true);
      return;
    }

    const todayStr = '2026-07-12';
    const nowTimeStr = new Date().toTimeString().split(' ')[0];

    const fullClient: Penerima = {
      ...newClient,
      status: 'Berhak', // Approved immediately on completion of Stage 1
      stage: 1, // Only completed Stage 1
      createdAt: todayStr,
      lastActive: nowTimeStr,
    };

    setDaftarPenerima((prev) => [fullClient, ...prev]);
    addLog(fullClient.nik, fullClient.nama, 'Melakukan Registrasi Akun Bansos Online');
    triggerToast('Registrasi akun berhasil! Silakan masuk (login) ke portal.');
    setActiveSection('login');
  };

  // 3. Admin Login
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentUser(null);
    setActiveSection('dashboardAdmin');
    addLog('0000000000000000', 'Administrator', 'Melakukan Login Admin');
  };

  // 4. User Login
  const handleUserLoginSuccess = (user: Penerima) => {
    setCurrentUser(user);
    setIsAdminLoggedIn(false);
    setActiveSection('login'); // go to active user profile screen
    addLog(user.nik, user.nama, 'Melakukan Login Peserta');
  };

  // 5. Logout
  const handleLogout = () => {
    if (currentUser) {
      addLog(currentUser.nik, currentUser.nama, 'Melakukan Logout');
    } else if (isAdminLoggedIn) {
      addLog('0000000000000000', 'Administrator', 'Melakukan Logout Admin');
    }
    setCurrentUser(null);
    setIsAdminLoggedIn(false);
    setActiveSection('beranda');
    triggerToast('Anda berhasil keluar dari sistem.');
  };

  // Admin CRUD Actions

  // Add Penerima directly from admin panel
  const handleAdminAddPenerima = (newPenerima: Penerima) => {
    setDaftarPenerima((prev) => [newPenerima, ...prev]);
    addLog(newPenerima.nik, newPenerima.nama, 'Ditambahkan secara manual oleh Admin');
  };

  // Edit/Update Penerima directly from admin panel
  const handleAdminUpdatePenerima = (updated: Penerima) => {
    setDaftarPenerima((prev) =>
      prev.map((p) => (p.nik === updated.nik ? updated : p))
    );

    // If edited user is currently logged in, update their state
    if (currentUser && currentUser.nik === updated.nik) {
      setCurrentUser(updated);
    }

    addLog(updated.nik, updated.nama, 'Mengedit data detail profil KPM');
  };

  // Delete Penerima from admin panel
  const handleAdminDeletePenerima = (nik: string) => {
    const found = daftarPenerima.find((p) => p.nik === nik);
    const name = found ? found.nama : 'KPM';

    setDaftarPenerima((prev) => prev.filter((p) => p.nik !== nik));

    if (currentUser && currentUser.nik === nik) {
      setCurrentUser(null);
    }

    addLog(nik, name, 'Dihapus dari database oleh Admin');
    triggerToast(`Data pelanggan ${name} berhasil dihapus.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-red-200 selection:text-red-900">
      
      {/* Toast Notification Container */}
      {showToast && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] max-w-sm p-4 rounded-xl border shadow-xl flex items-start gap-3 animate-slide-in ${
            toastIsError
              ? 'bg-red-50 border-red-200 text-red-900'
              : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          {toastIsError ? (
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
          ) : (
            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
          )}
          <div className="space-y-1">
            <p className="text-xs font-bold font-sans uppercase tracking-wider">
              {toastIsError ? 'Gagal' : 'Notifikasi Sistem'}
            </p>
            <p className="text-xs leading-normal font-medium">{toastMsg}</p>
          </div>
        </div>
      )}

      {/* Main Header Component */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isAdminLoggedIn={isAdminLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Container Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic section selection */}
        {activeSection === 'beranda' && (
          <Beranda
            onCheckNikClick={() => setActiveSection('ceknik')}
            onShowToast={triggerToast}
          />
        )}

        {activeSection === 'ceknik' && (
          <CekBansos
            daftarPenerima={daftarPenerima}
            onRedirectToRegistrasi={handleRedirectToRegistrasi}
            onShowToast={triggerToast}
          />
        )}

        {activeSection === 'registrasi' && (
          <Registrasi
            prefilledNik={prefilledNik}
            onRegister={handleRegister}
            onShowToast={triggerToast}
            onClearPrefilledNik={() => setPrefilledNik('')}
          />
        )}

        {activeSection === 'login' && (
          <Login
            daftarPenerima={daftarPenerima}
            onAdminLoginSuccess={handleAdminLoginSuccess}
            onUserLoginSuccess={handleUserLoginSuccess}
            currentUser={currentUser}
            onLogout={handleLogout}
            onShowToast={triggerToast}
          />
        )}

        {activeSection === 'kontak' && (
          <Kontak
            onShowToast={triggerToast}
          />
        )}

        {activeSection === 'dashboardAdmin' && isAdminLoggedIn && (
          <AdminDashboard
            daftarPenerima={daftarPenerima}
            activityLogs={activityLogs}
            onAddPenerima={handleAdminAddPenerima}
            onUpdatePenerima={handleAdminUpdatePenerima}
            onDeletePenerima={handleAdminDeletePenerima}
            onLogout={handleLogout}
            onShowToast={triggerToast}
          />
        )}

      </main>

      {/* Main Footer Component */}
      <Footer />
    </div>
  );
        }
