'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  BedDouble,
  UtensilsCrossed,
  Search,
  Phone,
  MessageCircle,
  LogOut,
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Flame,
} from 'lucide-react';

export interface RoomBookingRecord {
  id: string;
  guestName: string;
  phone: string;
  roomType: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  totalPrice: string;
  bookedAt: string;
  status: 'Confirmed' | 'Checked In' | 'Completed' | 'Cancelled';
}

export interface TableReservationRecord {
  id: string;
  guestName: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  preference: string;
  bookedAt: string;
  status: 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
}

const DEFAULT_ROOMS: RoomBookingRecord[] = [
  {
    id: 'HH-R-101',
    guestName: 'Vikramaditya Rathore',
    phone: '+91 76220 75076',
    roomType: 'maharaja-suite',
    roomName: 'The Maharaja Haveli Suite',
    checkIn: '2026-10-15',
    checkOut: '2026-10-17',
    guests: '2 Guests',
    totalPrice: '₹11,600',
    bookedAt: 'Today, 09:15 AM',
    status: 'Confirmed',
  },
  {
    id: 'HH-R-102',
    guestName: 'Ananya Sharma',
    phone: '+91 98110 56789',
    roomType: 'jharokha-loft',
    roomName: 'The Jharokha Heritage Room',
    checkIn: '2026-10-15',
    checkOut: '2026-10-16',
    guests: '2 Guests',
    totalPrice: '₹4,600',
    bookedAt: 'Yesterday, 04:30 PM',
    status: 'Checked In',
  },
];

const DEFAULT_TABLES: TableReservationRecord[] = [
  {
    id: 'HH-T-501',
    guestName: 'Kunal Kapoor & Family',
    phone: '+91 76220 75076',
    date: '2026-10-15',
    time: '19:30 PM',
    guests: '6 Guests',
    preference: 'Private Family Section',
    bookedAt: 'Today, 10:20 AM',
    status: 'Confirmed',
  },
  {
    id: 'HH-T-502',
    guestName: 'Priya Mehra',
    phone: '+91 97170 33452',
    date: '2026-10-15',
    time: '20:00 PM',
    guests: '4 Guests',
    preference: 'Open Courtyard Under Trees',
    bookedAt: 'Today, 08:45 AM',
    status: 'Confirmed',
  },
  {
    id: 'HH-T-503',
    guestName: 'Arjun Singhania',
    phone: '+91 98100 44901',
    date: '2026-10-15',
    time: '13:00 PM',
    guests: '2 Guests',
    preference: 'Royal AC Dining Hall',
    bookedAt: 'Today, 11:00 AM',
    status: 'Seated',
  },
];

export default function AdminPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminIdInput, setAdminIdInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Dashboard Data State
  const [roomBookings, setRoomBookings] = useState<RoomBookingRecord[]>(DEFAULT_ROOMS);
  const [tableReservations, setTableReservations] = useState<TableReservationRecord[]>(DEFAULT_TABLES);
  const [activeTab, setActiveTab] = useState<'rooms' | 'tables'>('rooms');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Manual Booking Modal State
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState<boolean>(false);
  const [newBookingType, setNewBookingType] = useState<'room' | 'table'>('table');
  const [manualForm, setManualForm] = useState({
    name: '',
    phone: '',
    date: '2026-10-15',
    time: '19:30',
    guests: '2',
    detail: 'Royal AC Dining Hall',
    price: '₹4,600',
  });

  // Check login session on client mount
  useEffect(() => {
    try {
      const session = sessionStorage.getItem('hh_admin_authenticated');
      if (session === 'true') {
        setIsAuthenticated(true);
      }
      // Load saved bookings
      const savedRooms = localStorage.getItem('hh_room_bookings');
      if (savedRooms) {
        setRoomBookings(JSON.parse(savedRooms));
      }
      const savedTables = localStorage.getItem('hh_table_bookings');
      if (savedTables) {
        setTableReservations(JSON.parse(savedTables));
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  // Sync to storage
  const saveRooms = (rooms: RoomBookingRecord[]) => {
    setRoomBookings(rooms);
    try {
      localStorage.setItem('hh_room_bookings', JSON.stringify(rooms));
    } catch {
      // ignore
    }
  };

  const saveTables = (tables: TableReservationRecord[]) => {
    setTableReservations(tables);
    try {
      localStorage.setItem('hh_table_bookings', JSON.stringify(tables));
    } catch {
      // ignore
    }
  };

  // Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedId = adminIdInput.trim().toLowerCase();
    const trimmedPass = passwordInput.trim();

    // Accepted Admin Credentials:
    // ID: admin or manager or 7622075076
    // Password: admin or haveli123 or 7622075076
    const validIds = ['admin', 'manager', '7622075076'];
    const validPasswords = ['admin', 'haveli123', '7622075076'];

    if (validIds.includes(trimmedId) && validPasswords.includes(trimmedPass)) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('hh_admin_authenticated', 'true');
      } catch {
        // ignore
      }
    } else {
      setLoginError('Invalid Admin ID or Password. Please verify your credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('hh_admin_authenticated');
    } catch {
      // ignore
    }
  };

  // Status updates
  const updateRoomStatus = (id: string, newStatus: RoomBookingRecord['status']) => {
    const updated = roomBookings.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    saveRooms(updated);
  };

  const updateTableStatus = (id: string, newStatus: TableReservationRecord['status']) => {
    const updated = tableReservations.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    saveTables(updated);
  };

  const deleteRoomBooking = (id: string) => {
    if (confirm('Are you sure you want to remove this room reservation?')) {
      const updated = roomBookings.filter((r) => r.id !== id);
      saveRooms(updated);
    }
  };

  const deleteTableReservation = (id: string) => {
    if (confirm('Are you sure you want to remove this table reservation?')) {
      const updated = tableReservations.filter((t) => t.id !== id);
      saveTables(updated);
    }
  };

  // Quick WhatsApp helper for contacting guest
  const getGuestWhatsAppUrl = (phone: string, guestName: string, id: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = `Namaste ${guestName}! This is the Management Desk at Haveli & Hearth Grand Trunk Inn regarding your booking (${id}).`;
    return `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Add Manual Booking
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookingType === 'room') {
      const newRec: RoomBookingRecord = {
        id: `HH-R-${Math.floor(100 + Math.random() * 900)}`,
        guestName: manualForm.name || 'Walk-in Guest',
        phone: manualForm.phone || '+91 76220 75076',
        roomType: 'maharaja-suite',
        roomName: manualForm.detail,
        checkIn: manualForm.date,
        checkOut: '2026-10-16',
        guests: `${manualForm.guests} Guests`,
        totalPrice: manualForm.price,
        bookedAt: 'Direct Desk Entry',
        status: 'Confirmed',
      };
      saveRooms([newRec, ...roomBookings]);
    } else {
      const newRec: TableReservationRecord = {
        id: `HH-T-${Math.floor(100 + Math.random() * 900)}`,
        guestName: manualForm.name || 'Phone Guest',
        phone: manualForm.phone || '+91 76220 75076',
        date: manualForm.date,
        time: manualForm.time,
        guests: `${manualForm.guests} Guests`,
        preference: manualForm.detail,
        bookedAt: 'Direct Desk Entry',
        status: 'Confirmed',
      };
      saveTables([newRec, ...tableReservations]);
    }

    setIsNewBookingModalOpen(false);
    setManualForm({
      name: '',
      phone: '',
      date: '2026-10-15',
      time: '19:30',
      guests: '2',
      detail: 'Royal AC Dining Hall',
      price: '₹4,600',
    });
  };

  // Filtered Lists
  const filteredRooms = roomBookings.filter((r) => {
    const matchesSearch =
      !searchQuery ||
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTables = tableReservations.filter((t) => {
    const matchesSearch =
      !searchQuery ||
      t.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Total Room Revenue calculation
  const totalRevenue = roomBookings
    .filter((r) => r.status !== 'Cancelled')
    .reduce((sum, r) => sum + (parseInt(r.totalPrice.replace(/[^0-9]/g, '')) || 0), 0);

  // Total Guests Covers
  const totalCovers = tableReservations
    .filter((t) => t.status !== 'Cancelled')
    .reduce((sum, t) => sum + (parseInt(t.guests) || 2), 0);

  // =========================================================================
  // VIEW 1: SECURE LOGIN GATE (Requires ID & Password)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#120b08] text-[#f4ede4] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e05320]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c2410c]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Top Brand Card */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#a9988b] hover:text-[#e05320] transition-colors mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Public Website</span>
            </Link>

            <div className="w-16 h-16 rounded-2xl bg-[#e05320] mx-auto flex items-center justify-center text-white shadow-2xl shadow-[#e05320]/30 mb-4">
              <ShieldCheck size={32} />
            </div>

            <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#faf7f2] tracking-wide">
              Haveli & Hearth
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-[#e05320] font-bold mt-1">
              Management & Admin Console
            </p>
            <p className="text-xs text-[#a18e80] mt-2 font-light">
              Restricted portal for front desk managers & room reservations.
            </p>
          </div>

          {/* Login Form Box */}
          <div className="bg-[#1b120c] border border-[#3e271a] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            {loginError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p>{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#9d897b] mb-1.5">
                  Staff Admin ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d6b5e]">
                    <Lock size={15} />
                  </div>
                  <input
                    type="text"
                    required
                    value={adminIdInput}
                    onChange={(e) => setAdminIdInput(e.target.value)}
                    placeholder="Enter Admin ID (e.g. admin)"
                    autoComplete="username"
                    className="w-full bg-[#110a07] border border-[#382419] rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#f4ede4] placeholder-[#6e5d50] focus:outline-none focus:border-[#e05320] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#9d897b] mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7d6b5e]">
                    <KeyRound size={15} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full bg-[#110a07] border border-[#382419] rounded-xl pl-10 pr-10 py-3 text-sm text-[#f4ede4] placeholder-[#6e5d50] focus:outline-none focus:border-[#e05320] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7d6b5e] hover:text-[#f4ede4] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#e05320] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#e05320]/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck size={17} />
                <span>Unlock Management Console</span>
              </button>
            </form>

            {/* Quick Access Credentials Hint */}
            <div className="mt-6 pt-5 border-t border-[#2e1d13] text-center">
              <p className="text-[11px] text-[#8e7a6d]">
                Manager Quick Access Credentials:
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono bg-[#140b07] py-2 px-3 rounded-lg border border-[#342015] text-[#bdae9f]">
                <span>ID: <strong className="text-[#e05320]">admin</strong></span>
                <span className="text-[#594334]">|</span>
                <span>Pass: <strong className="text-[#e05320]">admin</strong></span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-[#5e4c41]">
            Haveli & Hearth NH-44 • Authorized Staff Personnel Only
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#130b08] text-[#f4ede4]">
      {/* Top Admin Header */}
      <header className="bg-[#1b120c] border-b border-[#342116] sticky top-0 z-30 shadow-xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e05320] flex items-center justify-center text-white shadow-lg shadow-[#e05320]/30 shrink-0">
              <Flame size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-royal text-lg sm:text-xl font-bold text-[#faf7f2] leading-tight">
                  Haveli & Hearth
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  Manager Portal
                </span>
              </div>
              <p className="text-xs text-[#9d897b] font-light">
                Grand Trunk NH-44 Reception & Dining Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#241710] border border-[#432d20] text-xs font-semibold text-[#cfbfb2] hover:text-white hover:bg-[#2e1d14] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={14} className="text-[#e05320]" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-xs font-semibold text-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Lock Console & Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Real-time KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8">
          <div className="bg-[#1b120c] border border-[#3b2519] rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-[#a18f82] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Suites Booked</span>
              <BedDouble size={18} className="text-[#e05320]" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[#faf7f2]">
              {roomBookings.filter((r) => r.status !== 'Cancelled').length} <span className="text-sm font-normal text-[#8d796d]">/ 4 Rooms</span>
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 font-medium">
              Occupancy: {Math.round((roomBookings.filter((r) => r.status !== 'Cancelled').length / 4) * 100)}%
            </p>
          </div>

          <div className="bg-[#1b120c] border border-[#3b2519] rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-[#a18f82] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Table Bookings</span>
              <UtensilsCrossed size={18} className="text-[#e05320]" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-[#faf7f2]">
              {tableReservations.filter((t) => t.status !== 'Cancelled').length}
            </p>
            <p className="text-[11px] text-[#bdae9f] mt-1 font-medium">
              Expected Covers: <strong className="text-white">{totalCovers} guests</strong>
            </p>
          </div>

          <div className="bg-[#1b120c] border border-[#3b2519] rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-[#a18f82] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Room Revenue</span>
              <span className="text-xs font-bold text-emerald-400">INR</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#a9988b] mt-1">Confirmed bookings</p>
          </div>

          <div className="bg-[#1b120c] border border-[#3b2519] rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-[#a18f82] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Desk Hotline</span>
              <Phone size={18} className="text-emerald-400" />
            </div>
            <p className="text-base sm:text-lg font-bold font-mono text-[#faf7f2] mt-0.5">
              +91 76220 75076
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online & Answering</span>
            </div>
          </div>
        </div>

        {/* Tab Selector & Control Actions */}
        <div className="bg-[#1b120c] border border-[#392418] rounded-2xl p-4 sm:p-5 mb-6 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Main Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('rooms');
                setStatusFilter('all');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'rooms'
                  ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/30'
                  : 'bg-[#241710] text-[#a9988b] hover:text-white hover:bg-[#2c1d15]'
              }`}
            >
              <BedDouble size={16} />
              <span>Haveli Rooms ({roomBookings.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('tables');
                setStatusFilter('all');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'tables'
                  ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/30'
                  : 'bg-[#241710] text-[#a9988b] hover:text-white hover:bg-[#2c1d15]'
              }`}
            >
              <UtensilsCrossed size={16} />
              <span>Table Bookings ({tableReservations.length})</span>
            </button>
          </div>

          {/* Search, Filter & Add Entry */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:flex-initial">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7f6d60]" />
              <input
                type="text"
                placeholder="Search guest or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#120a07] border border-[#3b2519] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-[#f4ede4] placeholder-[#736154] focus:outline-none focus:border-[#e05320] w-full sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#120a07] border border-[#3b2519] rounded-xl px-3 py-2 text-xs font-semibold text-[#cfbfb2] focus:outline-none focus:border-[#e05320] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value={activeTab === 'rooms' ? 'Checked In' : 'Seated'}>
                {activeTab === 'rooms' ? 'Checked In' : 'Seated'}
              </option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => {
                setNewBookingType(activeTab === 'rooms' ? 'room' : 'table');
                setIsNewBookingModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#241710] hover:bg-[#e05320] text-white border border-[#442c1f] hover:border-[#e05320] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Manual Entry</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* LIST 1: HAVELI SUITE BOOKINGS                                    */}
        {/* ================================================================= */}
        {activeTab === 'rooms' && (
          <div className="space-y-3.5">
            {filteredRooms.length === 0 ? (
              <div className="bg-[#1b120c] border border-[#342116] rounded-2xl p-12 text-center text-[#9d897b]">
                <BedDouble size={40} className="mx-auto mb-3 text-[#5f493b]" />
                <p className="text-base font-bold text-[#faf7f2]">No Room Bookings Found</p>
                <p className="text-xs text-[#8f7d71] mt-1">Try clearing search or status filters.</p>
              </div>
            ) : (
              filteredRooms.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#1b120c] border border-[#392418] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#e05320]/60 transition-all shadow-md group"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#e05320] bg-[#291910] px-2.5 py-0.5 rounded-lg border border-[#4d3222]">
                        {booking.id}
                      </span>
                      <h3 className="font-bold text-base text-[#faf7f2]">{booking.guestName}</h3>
                      <span className="text-xs text-[#a9988b]">• {booking.guests}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {booking.totalPrice}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#e3d7cb] font-medium mb-1">
                      {booking.roomName}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9d897b]">
                      <span>
                        Dates: <strong className="text-[#f4ede4]">{booking.checkIn}</strong> to <strong className="text-[#f4ede4]">{booking.checkOut}</strong>
                      </span>
                      <span>
                        Phone: <strong className="text-[#f4ede4]">{booking.phone}</strong>
                      </span>
                      <span>Booked: {booking.bookedAt}</span>
                    </div>
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#2b1b12]">
                    {/* Status Pill Dropdown */}
                    <select
                      value={booking.status}
                      onChange={(e) => updateRoomStatus(booking.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                        booking.status === 'Confirmed'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                          : booking.status === 'Checked In'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                          : booking.status === 'Completed'
                          ? 'bg-[#291911] text-[#9d897b] border-[#4b3323]'
                          : 'bg-red-950/60 text-red-300 border-red-500/40'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Checked In">Checked In</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {/* Quick Call */}
                    <a
                      href={`tel:${booking.phone}`}
                      className="p-2 rounded-lg bg-[#241710] hover:bg-[#e05320] text-[#cfbfb2] hover:text-white border border-[#432c1f] hover:border-[#e05320] transition-colors"
                      title="Call Guest Directly"
                    >
                      <Phone size={14} />
                    </a>

                    {/* Quick WhatsApp */}
                    <a
                      href={getGuestWhatsAppUrl(booking.phone, booking.guestName, booking.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-colors"
                      title="Message Guest on WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => deleteRoomBooking(booking.id)}
                      className="p-2 rounded-lg bg-[#241710] hover:bg-red-900/60 text-[#8e7a6d] hover:text-red-200 border border-[#432c1f] hover:border-red-500/40 transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* LIST 2: TABLE RESERVATIONS                                       */}
        {/* ================================================================= */}
        {activeTab === 'tables' && (
          <div className="space-y-3.5">
            {filteredTables.length === 0 ? (
              <div className="bg-[#1b120c] border border-[#342116] rounded-2xl p-12 text-center text-[#9d897b]">
                <UtensilsCrossed size={40} className="mx-auto mb-3 text-[#5f493b]" />
                <p className="text-base font-bold text-[#faf7f2]">No Table Reservations Found</p>
                <p className="text-xs text-[#8f7d71] mt-1">Try clearing search or status filters.</p>
              </div>
            ) : (
              filteredTables.map((table) => (
                <div
                  key={table.id}
                  className="bg-[#1b120c] border border-[#392418] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#e05320]/60 transition-all shadow-md group"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#e05320] bg-[#291910] px-2.5 py-0.5 rounded-lg border border-[#4d3222]">
                        {table.id}
                      </span>
                      <h3 className="font-bold text-base text-[#faf7f2]">{table.guestName}</h3>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {table.guests}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#e3d7cb] font-medium mb-1">
                      Seating: {table.preference}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9d897b]">
                      <span>
                        Slot: <strong className="text-[#f4ede4]">{table.date} at {table.time}</strong>
                      </span>
                      <span>
                        Phone: <strong className="text-[#f4ede4]">{table.phone}</strong>
                      </span>
                      <span>Booked: {table.bookedAt}</span>
                    </div>
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#2b1b12]">
                    {/* Status Pill Dropdown */}
                    <select
                      value={table.status}
                      onChange={(e) => updateTableStatus(table.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                        table.status === 'Confirmed'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                          : table.status === 'Seated'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                          : table.status === 'Completed'
                          ? 'bg-[#291911] text-[#9d897b] border-[#4b3323]'
                          : 'bg-red-950/60 text-red-300 border-red-500/40'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Seated">Seated</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {/* Quick Call */}
                    <a
                      href={`tel:${table.phone}`}
                      className="p-2 rounded-lg bg-[#241710] hover:bg-[#e05320] text-[#cfbfb2] hover:text-white border border-[#432c1f] hover:border-[#e05320] transition-colors"
                      title="Call Guest Directly"
                    >
                      <Phone size={14} />
                    </a>

                    {/* Quick WhatsApp */}
                    <a
                      href={getGuestWhatsAppUrl(table.phone, table.guestName, table.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-colors"
                      title="Message Guest on WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => deleteTableReservation(table.id)}
                      className="p-2 rounded-lg bg-[#241710] hover:bg-red-900/60 text-[#8e7a6d] hover:text-red-200 border border-[#432c1f] hover:border-red-500/40 transition-colors cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* MODAL: MANUAL DESK / PHONE ENTRY                                 */}
      {/* ================================================================= */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#090604]/85 backdrop-blur-sm"
            onClick={() => setIsNewBookingModalOpen(false)}
          />

          <div className="relative bg-[#1c120c] border border-[#3e271a] rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-royal text-xl font-bold text-[#faf7f2]">
                New Desk / Phone Booking
              </h2>
              <button
                onClick={() => setIsNewBookingModalOpen(false)}
                className="text-[#8e7a6d] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2 mb-5">
              <button
                type="button"
                onClick={() => setNewBookingType('table')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  newBookingType === 'table'
                    ? 'bg-[#e05320] text-white shadow-md'
                    : 'bg-[#241710] text-[#9d897b]'
                }`}
              >
                Dining Table
              </button>
              <button
                type="button"
                onClick={() => setNewBookingType('room')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  newBookingType === 'room'
                    ? 'bg-[#e05320] text-white shadow-md'
                    : 'bg-[#241710] text-[#9d897b]'
                }`}
              >
                Haveli Room
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1">
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 76220 75076"
                  value={manualForm.phone}
                  onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                  className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={manualForm.date}
                    onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                    className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1">
                    {newBookingType === 'table' ? 'Time Slot' : 'Guests Count'}
                  </label>
                  {newBookingType === 'table' ? (
                    <input
                      type="text"
                      placeholder="19:30 PM"
                      value={manualForm.time}
                      onChange={(e) => setManualForm({ ...manualForm, time: e.target.value })}
                      className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="2 Guests"
                      value={manualForm.guests}
                      onChange={(e) => setManualForm({ ...manualForm, guests: e.target.value })}
                      className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1">
                  {newBookingType === 'table' ? 'Table Preference' : 'Room Category'}
                </label>
                <input
                  type="text"
                  placeholder={
                    newBookingType === 'table'
                      ? 'Royal AC Hall / Courtyard'
                      : 'The Maharaja Haveli Suite'
                  }
                  value={manualForm.detail}
                  onChange={(e) => setManualForm({ ...manualForm, detail: e.target.value })}
                  className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                />
              </div>

              {newBookingType === 'room' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    placeholder="₹5,800"
                    value={manualForm.price}
                    onChange={(e) => setManualForm({ ...manualForm, price: e.target.value })}
                    className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-[#e05320] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Record Booking In System
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
