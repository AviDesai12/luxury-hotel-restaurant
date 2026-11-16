'use client';

import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  BedDouble,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Menu as MenuIcon,
  X,
  Star,
  CheckCircle2,
  Calendar,
  Users,
  Flame,
  Coffee,
  Sparkles,
  ChevronRight,
  Compass,
  Navigation,
  Car,
  ShieldCheck,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  Lock,
  RefreshCw,
  Search,
  Check,
  AlertCircle,
} from 'lucide-react';

// Menu item structure with authentic high-res Indian food photos
interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  price: string;
  description: string;
  image: string;
  category: 'starters' | 'mains' | 'desserts';
  isVeg: boolean;
  badge?: string;
  popular?: boolean;
}

const menuItems: MenuItem[] = [
  // 1. Starters / Bhatti Kebabs
  {
    id: 'starter-1',
    name: 'Bhatti Da Murgh Tikka',
    hindiName: 'भट्टी दा मुर्ग टिक्का',
    price: '₹520',
    description: 'Tender boneless chicken steeped in hung curd, yellow chili, and smoked over sal wood coals in our charcoal tandoor.',
    image: '/images/murgh_tikka.jpg',
    category: 'starters',
    isVeg: false,
    badge: 'Tandoor Signature',
    popular: true,
  },
  {
    id: 'starter-2',
    name: 'Smoked Malai Paneer Tikka',
    hindiName: 'मलाई पनीर टिक्का',
    price: '₹460',
    description: 'Farm-fresh cottage cheese cubes infused with green cardamom, clotted cream, charred bell peppers, and fresh mint glaze.',
    image: '/images/paneer_tikka.jpg',
    category: 'starters',
    isVeg: true,
    badge: 'Chef Choice',
    popular: true,
  },
  {
    id: 'starter-3',
    name: 'Melt-in-Mouth Galouti Kebab',
    hindiName: 'गलोटी कबाब विथ परांठा',
    price: '₹580',
    description: 'Awadhi minced lamb medallions smoked with cloves and 32 heritage spices, served on warm mini Ulta Tawa parathas.',
    image: '/images/galouti_kebab.jpg',
    category: 'starters',
    isVeg: false,
    badge: 'Royal Heritage',
  },
  {
    id: 'starter-4',
    name: 'Crispy Dahi Ke Kebab',
    hindiName: 'दही के कबाब',
    price: '₹390',
    description: 'Panko-crusted spiced hung yogurt pockets filled with roasted cumin and pomegranate seeds, served with raw mango chutney.',
    image: '/images/dahi_kebab.jpg',
    category: 'starters',
    isVeg: true,
    badge: 'Crispy & Tangy',
  },
  {
    id: 'starter-5',
    name: 'Amritsari Tandoori Soya Chaap',
    hindiName: 'तंदूरी सोया चाप',
    price: '₹420',
    description: 'Marinated in cold-pressed mustard oil, crushed kasuri methi, roasted gram flour, and finished on the open tandoori skewer.',
    image: '/images/soya_chaap.jpg',
    category: 'starters',
    isVeg: true,
  },

  // 2. Wood-Fired Mains & Handi Curries
  {
    id: 'main-1',
    name: '24-Hour Slow-Simmered Dal Makhani',
    hindiName: 'दाल मखनी (२४ घंटे धीमी आंच)',
    price: '₹480',
    description: 'Black urad lentils and kidney beans slow-simmered overnight over charcoal embers, finished with organic white butter and fresh cream.',
    image: '/images/dal_makhani.jpg',
    category: 'mains',
    isVeg: true,
    badge: 'Highway Legend',
    popular: true,
  },
  {
    id: 'main-2',
    name: 'Old Delhi Aslam-Style Butter Chicken',
    hindiName: 'पुरानी दिल्ली बटर चिकन',
    price: '₹640',
    description: 'Clay-oven charred tandoori chicken immersed in a velvety tomato makhani gravy enriched with roasted fenugreek and churned butter.',
    image: '/images/butter_chicken.jpg',
    category: 'mains',
    isVeg: false,
    badge: 'All-Time Favorite',
    popular: true,
  },
  {
    id: 'main-3',
    name: 'Champaran Ahuna Mutton Handi',
    hindiName: 'चंपारण मटन हांडी',
    price: '₹740',
    description: 'Tender baby goat slow-steamed in a dough-sealed earthen clay handi over burning charcoal with whole garlic bulbs and mustard oil.',
    image: '/images/mutton_handi.jpg',
    category: 'mains',
    isVeg: false,
    badge: 'Clay Handi Special',
  },
  {
    id: 'main-4',
    name: 'Paneer Tikka Lababdar',
    hindiName: 'पनीर टिक्का लबाबदार',
    price: '₹490',
    description: 'Tandoor-charred cottage cheese chunks bathed in a rich, coarsely ground onion, cashew nut, and tomato reduction.',
    image: '/images/paneer_lababdar.jpg',
    category: 'mains',
    isVeg: true,
    badge: 'Vegetarian Classic',
  },
  {
    id: 'main-5',
    name: 'Nawabi Dum Gosht Biryani',
    hindiName: 'नवाबी दम गोश्त बिरयानी',
    price: '₹680',
    description: 'Aged long-grain basmati rice and marinated meat sealed under a wheat dough purdah with saffron, rose petals, and Burani raita.',
    image: '/images/dum_biryani.jpg',
    category: 'mains',
    isVeg: false,
    popular: true,
  },
  {
    id: 'main-6',
    name: 'Chur Chur Naan & Amritsari Kulcha',
    hindiName: 'चूर चूर नान / कुलचा बास्केट',
    price: '₹220',
    description: 'Crisp, multi-layered clay-oven tandoori breads crushed by hand with melting desi ghee, stuffed with seasoned potatoes and paneer.',
    image: '/images/chur_chur_naan.jpg',
    category: 'mains',
    isVeg: true,
  },

  // 3. Shahi Desserts & Mithai
  {
    id: 'dessert-1',
    name: 'Zafrani Matka Phirni',
    hindiName: 'ज़ाफ़रानी मटका फिरनी',
    price: '₹240',
    description: 'Slow-cooked ground rice pudding infused with Kashmiri saffron, crushed green cardamom, and California pistachios in clay matkas.',
    image: '/images/matka_phirni.jpg',
    category: 'desserts',
    isVeg: true,
    badge: 'Chilled Earthen Pot',
    popular: true,
  },
  {
    id: 'dessert-2',
    name: 'Wood-Smoked Shahi Tukda with Rabri',
    hindiName: 'शाही टुकड़ा विथ लच्छेदार रबड़ी',
    price: '₹280',
    description: 'Desi ghee toasted brioche steeped in saffron honey syrup, topped with thick slow-reduced lacchedar rabri and edible silver vark.',
    image: '/images/shahi_tukda.jpg',
    category: 'desserts',
    isVeg: true,
    badge: 'Royal Sweet',
    popular: true,
  },
  {
    id: 'dessert-3',
    name: 'Warm Gulab Jamun with Malai Dip',
    hindiName: 'गर्म गुलाब जामुन मलाई',
    price: '₹220',
    description: 'Hand-rolled khoya dumplings fried golden in desi ghee, soaked in warm rose-cardamom syrup, served with fresh clotted malai.',
    image: '/images/gulab_jamun.jpg',
    category: 'desserts',
    isVeg: true,
  },
];

// Boutique Haveli Rooms
const roomsData = [
  {
    id: 'maharaja-suite',
    name: 'The Maharaja Haveli Suite',
    tagline: 'Hand-carved teakwood, private courtyard balcony',
    price: '₹5,800',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: 'A lavish 540 sq.ft. royal retreat directly above the restaurant. Features a handcrafted four-poster king bed, private jharokha balcony, antique brass fittings, and quiet acoustic soundproofing from highway sounds.',
    features: ['Teakwood King Bed', 'Private Jharokha Balcony', 'Brass Rainfall Shower', 'Complimentary Morning Nashta & Kulhad Chai'],
  },
  {
    id: 'jharokha-loft',
    name: 'The Jharokha Heritage Room',
    tagline: 'Warm ambient lighting and high arch ceilings',
    price: '₹4,600',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    description: 'Intimate boutique room crafted with red sandstone arches, plush orthopaedic mattress, copper drinkware, and morning sun views over the roadside garden.',
    features: ['Orthopaedic King Bed', 'Acoustic Triple-Pane Glass', 'Artisan Copper Bar', 'Desi Ghee Paratha Breakfast'],
  },
  {
    id: 'courtyard-room',
    name: 'The Courtyard Deluxe',
    tagline: 'Quiet sanctuary facing the mango orchard',
    price: '₹3,900',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    description: 'Relax after a long road trip in a peaceful haven overlooking our rear garden. Enjoy hot kulhad ginger chai brought to your room anytime.',
    features: ['Comfort Queen Bed', '24/7 Hot Water Geyser', 'Garden View Verandah', 'Express Highway Check-in'],
  },
];

// Types for Bookings in Admin Panel
interface RoomBookingRecord {
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

interface TableReservationRecord {
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

export default function IndianRestaurantLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState<'all' | 'starters' | 'mains' | 'desserts'>('all');
  const [vegFilterOnly, setVegFilterOnly] = useState(false);

  // Modal States
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('maharaja-suite');
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [roomBookingSubmitted, setRoomBookingSubmitted] = useState(false);
  const [latestBookingRef, setLatestBookingRef] = useState('');

  // Dish photo lightbox preview
  const [previewDish, setPreviewDish] = useState<MenuItem | null>(null);

  // Form State
  const [resForm, setResForm] = useState({
    name: '',
    phone: '',
    guests: '4',
    date: '2026-10-15',
    time: '19:30',
    preference: 'Royal AC Dining Hall',
  });

  const [roomForm, setRoomForm] = useState({
    name: '',
    phone: '',
    checkIn: '2026-10-15',
    checkOut: '2026-10-16',
    guests: '2',
    roomType: 'maharaja-suite',
  });

  // Admin State & Seeded Bookings
  const [roomBookings, setRoomBookings] = useState<RoomBookingRecord[]>([
    {
      id: 'HH-R-101',
      guestName: 'Vikramaditya Rathore',
      phone: '+91 98290 12345',
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
  ]);

  const [tableReservations, setTableReservations] = useState<TableReservationRecord[]>([
    {
      id: 'HH-T-501',
      guestName: 'Kunal Kapoor & Family',
      phone: '+91 99200 88210',
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
  ]);

  const [adminTab, setAdminTab] = useState<'rooms' | 'tables'>('rooms');
  const [adminSearch, setAdminSearch] = useState('');

  // Hydrate from localStorage on load if available
  useEffect(() => {
    try {
      const savedRooms = localStorage.getItem('hh_room_bookings');
      if (savedRooms) setRoomBookings(JSON.parse(savedRooms));
      const savedTables = localStorage.getItem('hh_table_bookings');
      if (savedTables) setTableReservations(JSON.parse(savedTables));
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  // Save to localStorage when state updates
  const saveRoomBookings = (newBookings: RoomBookingRecord[]) => {
    setRoomBookings(newBookings);
    try {
      localStorage.setItem('hh_room_bookings', JSON.stringify(newBookings));
    } catch {
      // Ignore
    }
  };

  const saveTableReservations = (newRes: TableReservationRecord[]) => {
    setTableReservations(newRes);
    try {
      localStorage.setItem('hh_table_bookings', JSON.stringify(newRes));
    } catch {
      // Ignore
    }
  };

  // Scroll listener for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openReserveTable = () => {
    setReservationSubmitted(false);
    setIsReserveModalOpen(true);
  };

  const openBookRoom = (roomId?: string) => {
    if (roomId) setSelectedRoom(roomId);
    setRoomBookingSubmitted(false);
    setIsRoomModalOpen(true);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `HH-T-${Math.floor(100 + Math.random() * 900)}`;
    setLatestBookingRef(ref);

    const newRec: TableReservationRecord = {
      id: ref,
      guestName: resForm.name || 'Valued Guest',
      phone: resForm.phone,
      date: resForm.date,
      time: resForm.time,
      guests: `${resForm.guests} Guests`,
      preference: resForm.preference,
      bookedAt: 'Just Now',
      status: 'Confirmed',
    };

    saveTableReservations([newRec, ...tableReservations]);
    setReservationSubmitted(true);
  };

  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `HH-R-${Math.floor(100 + Math.random() * 900)}`;
    setLatestBookingRef(ref);

    const targetRoom = roomsData.find((r) => r.id === selectedRoom) || roomsData[0];

    const newRec: RoomBookingRecord = {
      id: ref,
      guestName: roomForm.name || 'Valued Guest',
      phone: roomForm.phone,
      roomType: selectedRoom,
      roomName: targetRoom.name,
      checkIn: roomForm.checkIn,
      checkOut: roomForm.checkOut,
      guests: `${roomForm.guests} Guests`,
      totalPrice: targetRoom.price,
      bookedAt: 'Just Now',
      status: 'Confirmed',
    };

    saveRoomBookings([newRec, ...roomBookings]);
    setRoomBookingSubmitted(true);
  };

  // WhatsApp Link Handler
  const getWhatsAppUrl = (customText?: string) => {
    const defaultText =
      'Namaste Haveli & Hearth! I am traveling on NH-44 and would like to inquire about table availability & room booking.';
    return `https://wa.me/917622075076?text=${encodeURIComponent(customText || defaultText)}`;
  };

  const filteredMenuItems = menuItems
    .filter((item) => activeMenuCategory === 'all' || item.category === activeMenuCategory)
    .filter((item) => !vegFilterOnly || item.isVeg);

  return (
    <div className="min-h-screen bg-[#140e0b] text-[#f4ede4] selection:bg-[#e05320]/30 selection:text-white pb-24 md:pb-0">
      {/* ========================================================= */}
      {/* TOP ANNOUNCEMENT STRIP (PHONE & DESKTOP)                  */}
      {/* ========================================================= */}
      <div className="bg-[#1e130d] border-b border-[#342217] py-2.5 px-4 text-xs text-[#c4b5a6]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-[#f4ede4] text-xs sm:text-sm">
              Open 7 Days: 11:30 AM – 11:30 PM
            </span>
            <span className="hidden md:inline text-[#8a766a]">• Grand Trunk Road NH-44, Milepost 58</span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <a
              href="tel:+917622075076"
              className="text-[#e05320] font-bold hover:underline flex items-center gap-1.5"
            >
              <Phone size={13} />
              <span>+91 76220 75076</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* NAVIGATION BAR                                            */}
      {/* ========================================================= */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-espresso shadow-2xl py-3 border-b border-[#38251b]'
            : 'bg-[#140e0b]/95 backdrop-blur-md py-4 border-b border-[#291b14]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand with Grand Royal Font */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-full bg-[#e05320] flex items-center justify-center text-white shadow-xl shadow-[#e05320]/30 shrink-0 group-hover:bg-[#c2410c] transition-colors">
              <Flame size={24} className="text-white" />
            </div>
            <div>
              <span className="font-royal text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide text-[#faf7f2] block leading-tight">
                Haveli & Hearth
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#e05320] font-bold block">
                Grand Trunk Dining & Heritage Inn
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Big Readable Text */}
          <nav className="hidden md:flex items-center space-x-10 text-base font-semibold">
            <a href="#menu" className="text-[#f4ede4] hover:text-[#e05320] transition-colors">
              Our Menu
            </a>
            <a href="#story" className="text-[#f4ede4] hover:text-[#e05320] transition-colors">
              Our Story
            </a>
            <a href="#stay" className="text-[#f4ede4] hover:text-[#e05320] transition-colors">
              Stay (Suites)
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3.5">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={openReserveTable}
              className="px-6 py-2.5 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#e05320]/30 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <UtensilsCrossed size={15} />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Right Action Bar */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#25D366] text-black shadow-md flex items-center justify-center"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#22150f] border border-[#3b261b] text-[#f4ede4] hover:bg-[#2a1d17] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1a110c] border-b border-[#3b271d] px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#2d1e16]">
              <span className="text-xs uppercase tracking-widest text-[#a89788]">Highway Landmark</span>
              <span className="text-xs text-[#e05320] font-mono font-bold">NH-44 Milepost 58</span>
            </div>
            <a
              href="#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-lg font-semibold text-[#f4ede4] hover:text-[#e05320] py-2"
            >
              <span>Our Indian Menu</span>
              <ChevronRight size={18} className="text-[#8d796c]" />
            </a>
            <a
              href="#story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-lg font-semibold text-[#f4ede4] hover:text-[#e05320] py-2"
            >
              <span>Our Story & Tandoor</span>
              <ChevronRight size={18} className="text-[#8d796c]" />
            </a>
            <a
              href="#stay"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-lg font-semibold text-[#f4ede4] hover:text-[#e05320] py-2"
            >
              <span>Stay with Us (Suites)</span>
              <ChevronRight size={18} className="text-[#8d796c]" />
            </a>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openReserveTable();
                }}
                className="w-full py-4 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-center text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <UtensilsCrossed size={17} />
                Reserve a Table
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookRoom();
                }}
                className="w-full py-3.5 rounded-full border border-[#4d3427] bg-[#22140d] text-[#f4ede4] text-center text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <BedDouble size={17} className="text-[#e05320]" />
                Book a Suite Upstairs
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 sm:px-8 overflow-hidden">
        {/* Visual Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt="Authentic Grand Trunk highway dining atmosphere at Haveli & Hearth"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#140e0b]/95 via-[#18100c]/85 to-[#140e0b]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140e0b]/95 via-[#18100c]/75 to-[#140e0b]/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-4 sm:mt-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2a1b13]/90 border border-[#523727] text-[#f4ede4] text-xs sm:text-sm uppercase tracking-[0.2em] mb-6 shadow-xl backdrop-blur-md">
            <Compass size={15} className="text-[#e05320]" />
            <span className="font-semibold">Grand Trunk Highway • Milepost 58</span>
          </div>

          {/* Exact Required Headline in Large Royal Typography */}
          <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#faf7f2] leading-[1.1] mb-6 drop-shadow-md">
            Exceptional Dining, <br />
            <span className="text-[#e05320] italic font-serif font-normal">Right on the Highway.</span>
          </h1>

          <p className="text-base sm:text-xl lg:text-2xl text-[#ded3c5] max-w-2xl mx-auto font-light leading-relaxed mb-10 px-2">
            24-hour slow-cooked Dal Makhani, clay tandoori kebabs, and Awadhi dum handis. Rest the night in royal boutique suites upstairs.
          </p>

          {/* Two Required CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 mb-12 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={openReserveTable}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-[#e05320]/40 hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
            >
              <UtensilsCrossed size={19} />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={() => openBookRoom()}
              className="w-full sm:w-auto px-9 py-4 rounded-full border-2 border-[#5c4031] hover:border-[#e05320] bg-[#1d130e]/80 hover:bg-[#2a1a13] text-[#faf7f2] text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
            >
              <BedDouble size={19} className="text-[#e05320]" />
              <span>Book a Room</span>
            </button>
          </div>

          {/* Highway Quick Action Ribbon */}
          <div className="bg-[#1f140e]/90 border border-[#3e291e] rounded-2xl p-4 sm:p-5 max-w-xl mx-auto flex items-center justify-around gap-4 text-left backdrop-blur-md shadow-2xl">
            <a
              href="tel:+917622075076"
              className="flex items-center gap-3.5 group hover:opacity-90 transition-opacity"
            >
              <div className="w-11 h-11 rounded-full bg-[#2d1c14] border border-[#523626] flex items-center justify-center text-[#e05320] group-hover:bg-[#e05320] group-hover:text-white transition-colors shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[11px] text-[#a18e80] uppercase tracking-wider font-semibold">Instant Call</p>
                <p className="text-sm sm:text-base font-bold text-[#faf7f2]">+91 76220 75076</p>
              </div>
            </a>

            <div className="h-10 w-[1px] bg-[#3a261c]" />

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 group hover:opacity-90 transition-opacity"
            >
              <div className="w-11 h-11 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-[11px] text-[#a18e80] uppercase tracking-wider font-semibold">WhatsApp Chat</p>
                <p className="text-sm sm:text-base font-bold text-[#faf7f2]">Instant Reply</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MENU HIGHLIGHTS WITH FOOD IMAGES & CATEGORIES             */}
      {/* ========================================================= */}
      <section id="menu" className="py-24 px-4 sm:px-8 bg-[#17100c] relative border-t border-[#2d1e16]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#e05320] font-bold block mb-2">
              Clay Fire & Authentic Spices
            </span>
            <h2 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-bold text-[#faf7f2] tracking-tight mb-4">
              Menu Highlights
            </h2>
            <p className="text-sm sm:text-base text-[#c4b4a5] font-light leading-relaxed">
              Every dish is cooked fresh over sal wood coals and sealed earthen handis. Pure desi ghee, stone-ground spices, and recipes passed down generations.
            </p>

            {/* Veg / Non-Veg Legend + Pure Veg Mode Toggle */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm border border-emerald-500 flex items-center justify-center p-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-medium text-[#f4ede4]">Vegetarian</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm border border-red-500 flex items-center justify-center p-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                </span>
                <span className="font-medium text-[#f4ede4]">Non-Vegetarian</span>
              </div>

              <button
                onClick={() => setVegFilterOnly(!vegFilterOnly)}
                className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  vegFilterOnly
                    ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300'
                    : 'bg-[#221610] border-[#452e21] text-[#bdae9f] hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${vegFilterOnly ? 'bg-emerald-400' : 'bg-transparent border border-white'}`} />
                <span>{vegFilterOnly ? 'Pure Veg Mode (Active)' : 'Switch to Pure Veg'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Tabs - Fully Visible Grid (Never Cut Off on Mobile or Desktop) */}
          <div className="max-w-4xl mx-auto mb-12 px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-2 bg-[#1d120b] border border-[#3c261a] rounded-2xl sm:rounded-full shadow-2xl">
              <button
                onClick={() => setActiveMenuCategory('all')}
                className={`w-full py-3 sm:py-3.5 px-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center text-center ${
                  activeMenuCategory === 'all'
                    ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/30'
                    : 'bg-transparent text-[#bcaea0] hover:text-white hover:bg-[#281810]'
                }`}
              >
                All Offerings
              </button>
              <button
                onClick={() => setActiveMenuCategory('starters')}
                className={`w-full py-3 sm:py-3.5 px-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center text-center ${
                  activeMenuCategory === 'starters'
                    ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/30'
                    : 'bg-transparent text-[#bcaea0] hover:text-white hover:bg-[#281810]'
                }`}
              >
                Starters & Kebabs
              </button>
              <button
                onClick={() => setActiveMenuCategory('mains')}
                className={`w-full py-3 sm:py-3.5 px-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center text-center ${
                  activeMenuCategory === 'mains'
                    ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/30'
                    : 'bg-transparent text-[#bcaea0] hover:text-white hover:bg-[#281810]'
                }`}
              >
                Handi Mains
              </button>
              <button
                onClick={() => setActiveMenuCategory('desserts')}
                className={`w-full py-3 sm:py-3.5 px-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center text-center ${
                  activeMenuCategory === 'desserts'
                    ? 'bg-[#e05320] text-white shadow-lg shadow-[#e05320]/30'
                    : 'bg-transparent text-[#bcaea0] hover:text-white hover:bg-[#281810]'
                }`}
              >
                Shahi Desserts
              </button>
            </div>
          </div>

          {/* 3 Categories Grid with Food Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e140f] border border-[#3b271d] rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-[#e05320]/70 transition-all duration-300"
              >
                {/* Food Image Card */}
                <div
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                  onClick={() => setPreviewDish(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e140f] via-transparent to-transparent opacity-80" />

                  {/* Veg / Non-Veg Indicator Badge */}
                  <div className="absolute top-3 left-3 bg-[#110a07]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#3b261b] flex items-center gap-1.5 shadow-md">
                    <span
                      className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center p-0.5 ${
                        item.isVeg ? 'border-emerald-500' : 'border-red-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    </span>
                    <span className="text-[10px] font-bold text-[#f4ede4] uppercase">
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#e05320] text-white text-xs sm:text-sm font-bold font-mono shadow-lg">
                    {item.price}
                  </div>

                  {/* Quick Preview Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                      <Eye size={13} />
                      <span>View Dish</span>
                    </span>
                  </div>
                </div>

                {/* Dish Details with Bigger Text */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#faf7f2] group-hover:text-[#e05320] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {item.hindiName && (
                      <p className="text-xs text-[#a9988b] mb-2 font-serif font-medium">
                        {item.hindiName}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#c4b5a6] font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2e1d14] flex items-center justify-between">
                    {item.badge ? (
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#2a1b12] text-[#e05320] border border-[#482f22]">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#8a776a]">Fresh Highway Catch</span>
                    )}

                    <button
                      onClick={openReserveTable}
                      className="text-xs uppercase tracking-wider text-[#e05320] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Reserve Table</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Under Menu Call to Action Banner */}
          <div className="mt-14 bg-gradient-to-r from-[#22150f] via-[#2c1a13] to-[#22150f] border border-[#432d20] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl">
            <div>
              <h4 className="font-royal text-2xl sm:text-3xl font-bold text-[#faf7f2] mb-2">
                Traveling with Family or Private Party?
              </h4>
              <p className="text-sm sm:text-base text-[#c4b4a5] font-light max-w-xl">
                We offer separate Royal AC family halls, sparkling luxury restrooms, and highway express thalis prepared in under 12 minutes.
              </p>
            </div>
            <button
              onClick={openReserveTable}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-sm font-bold uppercase tracking-wider transition-colors shadow-xl flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <UtensilsCrossed size={17} />
              <span>Book Table In Advance</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* OUR STORY SECTION                                         */}
      {/* ========================================================= */}
      <section id="story" className="py-24 px-4 sm:px-8 bg-[#140e0a] relative border-t border-[#261811]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-[#3b271d]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Haveli & Hearth Courtyard Dining"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-[#140e0a]">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
                alt="Fresh Clay Tandoori Breads"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#e05320] font-bold block mb-2">
              Our Heritage & Clay Fire
            </span>
            <h2 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-bold text-[#faf7f2] tracking-tight mb-6 leading-tight">
              A Highway Haveli <br />
              <span className="text-[#e05320] italic font-serif font-normal">Born for True Travellers.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#c5b5a6] font-light leading-relaxed mb-4">
              Highway journeys in India have always been incomplete without a legendary roadside meal. Established on the historic Grand Trunk corridor, Haveli & Hearth began with a simple promise: to elevate highway dining into a luxurious culinary pilgrimage.
            </p>
            <p className="text-sm sm:text-base text-[#c5b5a6] font-light leading-relaxed mb-8">
              Our dal simmers for a full 24 hours over slow coals. Our paneer is churned fresh every morning from local dairy buffaloes, and our spices are hand-ground on stone silbattas. When night falls, tired road-trippers don&apos;t have to drive back in the dark—our royal heritage suites upstairs welcome you to restful sleep.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#311f16]">
              <div>
                <p className="font-royal text-2xl sm:text-4xl font-extrabold text-[#e05320]">100% Desi Ghee</p>
                <p className="text-xs sm:text-sm text-[#a9988b] uppercase tracking-wider mt-1 font-semibold">Slow Wood-Fire Cooking</p>
              </div>
              <div>
                <p className="font-royal text-2xl sm:text-4xl font-extrabold text-[#faf7f2]">Haveli Suites</p>
                <p className="text-xs sm:text-sm text-[#a9988b] uppercase tracking-wider mt-1 font-semibold">Directly Upstairs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* STAY WITH US SECTION (DARK BANNER)                        */}
      {/* ========================================================= */}
      <section id="stay" className="py-24 px-4 sm:px-8 bg-[#0c0806] relative border-t border-[#24160f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130d] border border-[#3b251a] text-[#e05320] text-xs uppercase tracking-[0.2em] mb-4 font-semibold">
              <BedDouble size={14} />
              <span>Boutique Haveli Inn Upstairs</span>
            </div>

            {/* Exact User Text */}
            <h2 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-bold text-[#faf7f2] tracking-tight mb-4 leading-tight">
              Turn a great dinner into a weekend getaway.
            </h2>
            <p className="text-base sm:text-lg text-[#cfbfb1] font-light leading-relaxed max-w-xl mx-auto">
              We offer boutique rooms right above the restaurant.
            </p>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {roomsData.map((room) => (
              <div
                key={room.id}
                className="bg-[#170e0a] border border-[#2d1c14] rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-[#e05320]/70 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#170e0a] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-[#0c0806]/95 border border-[#3c261b] text-[#e05320] text-xs sm:text-sm font-bold font-mono shadow-md">
                    {room.price} / night
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#faf7f2] mb-1">
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#e05320] font-semibold tracking-wide mb-3">
                      {room.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#b09e90] font-light leading-relaxed mb-6">
                      {room.description}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {room.features.map((feat, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[#d2c3b6] flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-[#e05320] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openBookRoom(room.id)}
                    className="w-full py-3.5 rounded-xl border border-[#442c20] hover:border-[#e05320] bg-[#22140e] hover:bg-[#e05320] text-[#faf7f2] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
                  >
                    <span>Book This Suite</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Button */}
          <div className="bg-gradient-to-r from-[#1f130d] via-[#2a1a11] to-[#1f130d] border border-[#3f271a] rounded-2xl p-6 sm:p-10 text-center max-w-3xl mx-auto shadow-2xl">
            <h4 className="font-royal text-2xl sm:text-3xl font-bold text-[#faf7f2] mb-2">
              Avoid Night Highway Driving. Sleep Like Royalty.
            </h4>
            <p className="text-xs sm:text-base text-[#b6a495] font-light mb-6 max-w-lg mx-auto">
              Enjoy tandoori kebabs, slow handi mutton, and sweet phirni at leisure. Wake up to warm Amritsari parathas and ginger kulhad chai on your private balcony.
            </p>
            <button
              onClick={() => openBookRoom()}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#e05320]/30 hover:scale-[1.02] inline-flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
            >
              <BedDouble size={17} />
              <span>Check Room Availability</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER                                                    */}
      {/* ========================================================= */}
      <footer id="footer" className="bg-[#090604] border-t border-[#22130c] pt-20 pb-12 px-4 sm:px-8 text-[#a9988a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#e05320] flex items-center justify-center text-white">
                <Flame size={18} />
              </div>
              <span className="font-royal text-2xl font-bold text-[#faf7f2]">Haveli & Hearth</span>
            </div>
            <p className="text-xs sm:text-sm text-[#8f7c6e] leading-relaxed mb-6 font-light">
              Grand Trunk highway destination dining and four royal haveli suites. Authentic slow-fire handi cuisine, clay tandoor delicacies, and peaceful overnight stays for travelers.
            </p>
            <p className="text-xs text-[#e05320] font-mono font-bold">FSSAI Lic: 10022011000492</p>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#faf7f2] mb-5 flex items-center gap-2">
              <MapPin size={16} className="text-[#e05320]" />
              <span>Highway Location</span>
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-[#c7b7aa] font-light">
              Haveli & Hearth Highway Inn <br />
              Milepost 58, National Highway 44 (NH-44) <br />
              Near Heritage Toll Plaza, Grand Trunk Road
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#e05320] font-medium">
              <Car size={15} />
              <span>Dedicated 80-Car Parking & EV Fast Charger</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#faf7f2] mb-5 flex items-center gap-2">
              <Clock size={16} className="text-[#e05320]" />
              <span>Dining & Stay Hours</span>
            </h4>
            <ul className="text-xs sm:text-sm space-y-2.5 text-[#c7b7aa] font-light">
              <li className="flex justify-between">
                <span>Lunch & Thali:</span>
                <span className="text-white font-medium">11:30 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Dinner & Tandoor:</span>
                <span className="text-white font-medium">6:30 PM – 11:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Boutique Check-In:</span>
                <span className="text-white font-medium">2:00 PM Onwards</span>
              </li>
              <li className="flex justify-between text-emerald-400 font-medium">
                <span>Open 7 Days a Week:</span>
                <span>Including Holidays</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base font-bold uppercase tracking-wider text-[#faf7f2] mb-5 flex items-center gap-2">
              <Phone size={16} className="text-[#e05320]" />
              <span>Instant Contact</span>
            </h4>
            <ul className="text-xs sm:text-sm space-y-3 text-[#c7b7aa] font-light mb-6">
              <li>
                <a href="tel:+917622075076" className="hover:text-white flex items-center gap-2 font-medium">
                  <Phone size={14} className="text-[#e05320]" />
                  <span>+91 76220 75076 (Direct Call)</span>
                </a>
              </li>
              <li>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] flex items-center gap-2 font-medium">
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>+91 76220 75076 (WhatsApp Chat)</span>
                </a>
              </li>
              <li>
                <a href="mailto:namaste@havelihearth.com" className="hover:text-white flex items-center gap-2">
                  <Mail size={14} className="text-[#e05320]" />
                  <span>namaste@havelihearth.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#1a0f0a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6d5b4f]">
          <p>© 2026 Haveli & Hearth Grand Trunk Inn. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 items-center">
            <a href="#" className="hover:text-[#e05320]">Privacy Policy</a>
            <a href="#" className="hover:text-[#e05320]">Terms of Booking</a>
            <a href="#" className="hover:text-[#e05320]">FSSAI Compliance</a>
            <a href="/admin" className="hover:text-[#a9988b] text-[#544133] transition-colors">Staff Portal</a>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* FLOATING WHATSAPP CHAT BUTTON (WITH PULSE EFFECT)         */}
      {/* ========================================================= */}
      <aside aria-label="WhatsApp quick chat" className="fixed bottom-24 md:bottom-8 right-5 z-40">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all pulse-whatsapp group"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle size={28} className="fill-black text-black group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      </aside>

      {/* ========================================================= */}
      {/* STICKY MOBILE BOTTOM ACTION BAR                           */}
      {/* ========================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#160f0b]/98 backdrop-blur-lg border-t border-[#3c271b] px-3 py-3 flex items-center justify-between gap-2 shadow-[0_-12px_30px_rgba(0,0,0,0.8)]">
        <a
          href="tel:+917622075076"
          className="flex-1 py-3 px-2 rounded-xl bg-[#241710] border border-[#442b1f] text-[#f4ede4] hover:bg-[#2d1e16] flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-transform"
        >
          <Phone size={15} className="text-[#e05320]" />
          <span>Call</span>
        </a>

        <button
          onClick={() => openBookRoom()}
          className="flex-1 py-3 px-2 rounded-xl bg-[#241710] border border-[#442b1f] text-[#f4ede4] hover:bg-[#2d1e16] flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-transform cursor-pointer"
        >
          <BedDouble size={15} className="text-[#e05320]" />
          <span>Rooms</span>
        </button>

        <button
          onClick={openReserveTable}
          className="flex-[1.5] py-3 px-3 rounded-xl bg-[#e05320] text-white flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wide shadow-xl shadow-[#e05320]/30 active:scale-95 transition-transform cursor-pointer"
        >
          <UtensilsCrossed size={15} />
          <span>Reserve Table</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* DISH PREVIEW LIGHTBOX MODAL                               */}
      {/* ========================================================= */}
      {previewDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setPreviewDish(null)} />
          <div className="relative bg-[#1c120d] border border-[#3f2a1e] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewDish(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#e05320] transition-colors"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-[16/11]">
              <img src={previewDish.image} alt={previewDish.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-sm border shrink-0 flex items-center justify-center p-0.5 ${
                    previewDish.isVeg ? 'border-emerald-500' : 'border-red-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${previewDish.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                </span>
                <span className="text-xs font-bold uppercase">{previewDish.isVeg ? 'Vegetarian' : 'Non-Veg'}</span>
              </div>
              <div className="absolute bottom-4 right-4 px-4 py-1.5 rounded-full bg-[#e05320] text-white text-base font-bold font-mono shadow-xl">
                {previewDish.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-[#faf7f2] mb-1">{previewDish.name}</h3>
              {previewDish.hindiName && <p className="text-sm text-[#e05320] font-medium mb-3">{previewDish.hindiName}</p>}
              <p className="text-sm text-[#cfbfb0] font-light leading-relaxed mb-6">{previewDish.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPreviewDish(null);
                    openReserveTable();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UtensilsCrossed size={16} />
                  <span>Reserve Table For This Dish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: RESERVE A TABLE                                  */}
      {/* ========================================================= */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-[#090604]/85 backdrop-blur-sm" onClick={() => setIsReserveModalOpen(false)} />

          <div className="relative bg-[#1a110c] border border-[#3e291e] rounded-t-3xl sm:rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200">
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-5 right-5 text-[#8f7c6e] hover:text-white transition-colors p-1"
            >
              <X size={22} />
            </button>

            {!reservationSubmitted ? (
              <>
                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#281911] text-[#e05320] text-xs font-semibold uppercase tracking-wider mb-2">
                    <UtensilsCrossed size={13} />
                    <span>Table Reservation</span>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-[#faf7f2]">
                    Reserve at Haveli & Hearth
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a9988b] font-light mt-1">
                    Authentic highway dining. Free cancellation up to 1 hour before arrival.
                  </p>
                </div>

                <form onSubmit={handleReserveSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={resForm.date}
                        onChange={(e) => setResForm({ ...resForm, date: e.target.value })}
                        required
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Time Slot
                      </label>
                      <select
                        value={resForm.time}
                        onChange={(e) => setResForm({ ...resForm, time: e.target.value })}
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      >
                        <option value="12:30">12:30 PM (Lunch)</option>
                        <option value="13:30">1:30 PM (Lunch)</option>
                        <option value="19:00">7:00 PM (Dinner)</option>
                        <option value="19:30">7:30 PM (Popular)</option>
                        <option value="20:00">8:00 PM (Popular)</option>
                        <option value="20:30">8:30 PM (Dinner)</option>
                        <option value="21:30">9:30 PM (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Number of Guests
                      </label>
                      <select
                        value={resForm.guests}
                        onChange={(e) => setResForm({ ...resForm, guests: e.target.value })}
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      >
                        <option value="2">2 Guests (Couple Table)</option>
                        <option value="4">4 Guests (Standard Table)</option>
                        <option value="6">6 Guests (Family Table)</option>
                        <option value="8">8+ Guests (Large Family Hall)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Rajesh Kumar"
                        value={resForm.name}
                        onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                        required
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                      Mobile Number (For WhatsApp Confirmation)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 76220 75076"
                      value={resForm.phone}
                      onChange={(e) => setResForm({ ...resForm, phone: e.target.value })}
                      required
                      className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                      Seating Preference
                    </label>
                    <select
                      value={resForm.preference}
                      onChange={(e) => setResForm({ ...resForm, preference: e.target.value })}
                      className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                    >
                      <option value="Royal AC Dining Hall">Royal AC Dining Hall</option>
                      <option value="Open Courtyard Under Trees">Open Courtyard Under Trees</option>
                      <option value="Private Family Section">Private Family Section</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#e05320]/30 mt-3 cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                  <CheckCircle2 size={36} />
                </div>
                <span className="font-mono text-xs font-bold text-[#e05320] bg-[#2a1b12] px-3 py-1 rounded-full border border-[#4d3222] mb-2 inline-block">
                  Booking ID: {latestBookingRef}
                </span>
                <h3 className="font-royal text-2xl font-bold text-[#faf7f2] mb-2">
                  Namaste, Table Confirmed!
                </h3>
                <p className="text-sm text-[#bdae9f] leading-relaxed mb-6 max-w-sm mx-auto">
                  Thank you, <span className="text-white font-bold">{resForm.name || 'Guest'}</span>. Your table is reserved for {resForm.guests} on {resForm.date} at {resForm.time}. It is now recorded in our Manager Admin Portal.
                </p>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={getWhatsAppUrl(`Namaste! My Table Booking ID is ${latestBookingRef} under the name of ${resForm.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    <span>Send to Restaurant WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsReserveModalOpen(false)}
                    className="w-full py-2.5 rounded-full bg-[#271811] hover:bg-[#342017] text-[#faf7f2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: BOOK A ROOM                                      */}
      {/* ========================================================= */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-[#090604]/85 backdrop-blur-sm" onClick={() => setIsRoomModalOpen(false)} />

          <div className="relative bg-[#1a110c] border border-[#3e291e] rounded-t-3xl sm:rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200">
            <button
              onClick={() => setIsRoomModalOpen(false)}
              className="absolute top-5 right-5 text-[#8f7c6e] hover:text-white transition-colors p-1"
            >
              <X size={22} />
            </button>

            {!roomBookingSubmitted ? (
              <>
                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#281911] text-[#e05320] text-xs font-semibold uppercase tracking-wider mb-2">
                    <BedDouble size={13} />
                    <span>Boutique Haveli Stay</span>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-[#faf7f2]">
                    Book a Suite Upstairs
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a9988b] font-light mt-1">
                    Fresh kulhad chai and hot Amritsari breakfast included with every stay.
                  </p>
                </div>

                <form onSubmit={handleRoomSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                      Select Suite
                    </label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                    >
                      <option value="maharaja-suite">The Maharaja Haveli Suite (₹5,800/night)</option>
                      <option value="jharokha-loft">The Jharokha Heritage Room (₹4,600/night)</option>
                      <option value="courtyard-room">The Courtyard Deluxe (₹3,900/night)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        value={roomForm.checkIn}
                        onChange={(e) => setRoomForm({ ...roomForm, checkIn: e.target.value })}
                        required
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        value={roomForm.checkOut}
                        onChange={(e) => setRoomForm({ ...roomForm, checkOut: e.target.value })}
                        required
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Guests
                      </label>
                      <select
                        value={roomForm.guests}
                        onChange={(e) => setRoomForm({ ...roomForm, guests: e.target.value })}
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      >
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">2 Adults + 1 Child</option>
                        <option value="4">4 Guests (Family Suite)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                        Guest Name
                      </label>
                      <input
                        type="text"
                        placeholder="Vikramaditya"
                        value={roomForm.name}
                        onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                        required
                        className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9d897b] font-bold mb-1.5">
                      Phone Number (For Highway Directions)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 76220 75076"
                      value={roomForm.phone}
                      onChange={(e) => setRoomForm({ ...roomForm, phone: e.target.value })}
                      required
                      className="w-full bg-[#110a07] border border-[#3b261b] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#f4ede4] focus:outline-none focus:border-[#e05320]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#e05320] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#e05320]/30 mt-3 cursor-pointer"
                  >
                    Confirm Suite Stay
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                  <CheckCircle2 size={36} />
                </div>
                <span className="font-mono text-xs font-bold text-[#e05320] bg-[#2a1b12] px-3 py-1 rounded-full border border-[#4d3222] mb-2 inline-block">
                  Booking ID: {latestBookingRef}
                </span>
                <h3 className="font-royal text-2xl font-bold text-[#faf7f2] mb-2">
                  Haveli Suite Reserved!
                </h3>
                <p className="text-sm text-[#bdae9f] leading-relaxed mb-6 max-w-sm mx-auto">
                  Thank you, <span className="text-white font-bold">{roomForm.name || 'Guest'}</span>. Your suite is reserved from {roomForm.checkIn} to {roomForm.checkOut}. The front desk has registered your booking in the Manager Portal.
                </p>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={getWhatsAppUrl(`Namaste! My Suite Booking Reference is ${latestBookingRef} under ${roomForm.name}. Please confirm express keyless check-in.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    <span>Confirm on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsRoomModalOpen(false)}
                    className="w-full py-2.5 rounded-full bg-[#271811] hover:bg-[#342017] text-[#faf7f2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}