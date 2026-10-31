import { useState } from 'react';
import {
  Box, Cpu, Camera, Laptop, Beaker, DoorOpen, Presentation, Printer, Wrench,
  Search, Calendar, Clock, User, CheckCircle2, AlertTriangle, FileText, Bell,
  Settings, Users, BarChart2, Layers, LogOut, ChevronRight, Plus, CheckSquare,
  Send, Sparkles, MapPin, Activity, History, Menu, X, Globe, ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// ==========================================
// SEED & INITIAL STATE
// ==========================================

const INITIAL_INSTITUTIONS = [
  { id: 'inst-1', name: 'Institute of Technology & Science', code: 'ITS' },
  { id: 'inst-2', name: 'School of Design & Media', code: 'SDM' },
  { id: 'inst-3', name: 'Faculty of Engineering', code: 'FOE' }
];

const INITIAL_DEPARTMENTS = [
  { id: 'dept-1', institutionId: 'inst-1', name: 'Computer Science & AI', code: 'CSAI' },
  { id: 'dept-2', institutionId: 'inst-1', name: 'Electronics & Communication', code: 'ECE' },
  { id: 'dept-3', institutionId: 'inst-2', name: 'Media & Communications', code: 'MC' },
  { id: 'dept-4', institutionId: 'inst-3', name: 'Mechanical & Workshop', code: 'MECH' }
];

const INITIAL_USERS = [
  { id: 'usr-student-1', name: 'Alex Chen', email: 'alex.chen@campusx.edu', role: 'Student', institutionId: 'inst-1', departmentId: 'dept-1', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', trainingRecords: ['Safety 101', 'Laser Cutter Basic'] },
  { id: 'usr-owner-1', name: 'Dr. Sarah Jenkins', email: 'sarah.jenkins@campusx.edu', role: 'Resource Owner', institutionId: 'inst-1', departmentId: 'dept-2', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', trainingRecords: ['All Admin'] },
  { id: 'usr-manager-1', name: 'Marcus Vance', email: 'marcus.vance@campusx.edu', role: 'Manager', institutionId: 'inst-1', departmentId: 'dept-1', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', trainingRecords: ['Lab Safety Certified'] },
  { id: 'usr-admin-1', name: 'Dean Robert Thorne', email: 'robert.thorne@campusx.edu', role: 'Administrator', institutionId: 'inst-1', departmentId: 'dept-1', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', trainingRecords: ['Master Access'] }
];

const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    name: 'Canon EOS R5 Professional DSLR Camera',
    category: 'Cameras and photography',
    description: 'High-resolution full-frame mirrorless camera with 45MP sensor, 8K video recording, and RF 24-105mm f/4L IS USM Lens kit.',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'],
    institutionId: 'inst-2',
    departmentId: 'dept-3',
    location: 'Media Center, Room 302',
    quantity: 3,
    availableCount: 2,
    schedule: 'Mon-Fri 8:00 AM - 8:00 PM',
    maxBookingDurationDays: 3,
    eligibilityRequirements: 'Media or Photography majors, or completed Media Safety Course.',
    requiredTraining: 'Media Safety Course',
    supervisionRequirement: false,
    usageInstructions: 'Always store with lens cap on. Do not expose to moisture or dust.',
    depositAmount: 50.00,
    approvalRequired: true,
    ownerId: 'usr-owner-1',
    condition: 'Excellent',
    totalUsageCount: 42,
    rating: 4.9
  },
  {
    id: 'res-2',
    name: 'Dell Precision 7760 Mobile Workstation',
    category: 'Computers and laptops',
    description: 'Intel Core i9, 64GB RAM, NVIDIA RTX A3000 graphics. Pre-configured with CAD, Blender, MATLAB, and Adobe Creative Suite.',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'],
    institutionId: 'inst-1',
    departmentId: 'dept-1',
    location: 'CS Lab 4B',
    quantity: 10,
    availableCount: 7,
    schedule: '24/7 Access',
    maxBookingDurationDays: 7,
    eligibilityRequirements: 'Enrolled in Computer Science, Engineering, or Design programs.',
    requiredTraining: 'None',
    supervisionRequirement: false,
    usageInstructions: 'Shut down fully after use. Do not install unauthorized software.',
    depositAmount: 0.00,
    approvalRequired: false,
    ownerId: 'usr-owner-1',
    condition: 'Good',
    totalUsageCount: 128,
    rating: 4.8
  },
  {
    id: 'res-3',
    name: 'Keysight InfiniiVision 1000 X-Series Oscilloscope',
    category: 'Electronics equipment',
    description: '100 MHz, 4-channel oscilloscope with WaveGenerator and protocol analysis capabilities.',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600'],
    institutionId: 'inst-1',
    departmentId: 'dept-2',
    location: 'ECE Lab, Bench 12',
    quantity: 5,
    availableCount: 3,
    schedule: 'Mon-Sat 9:00 AM - 6:00 PM',
    maxBookingDurationDays: 2,
    eligibilityRequirements: 'Electrical Engineering students past 2nd semester.',
    requiredTraining: 'Lab Safety 101',
    supervisionRequirement: true,
    usageInstructions: 'Check probe calibration before taking high-voltage measurements.',
    depositAmount: 25.00,
    approvalRequired: true,
    ownerId: 'usr-owner-1',
    condition: 'Excellent',
    totalUsageCount: 31,
    rating: 4.7
  },
  {
    id: 'res-4',
    name: 'UltiMaker S5 Industrial 3D Printer',
    category: '3D printers',
    description: 'Dual extrusion large-format 3D printer supporting PLA, ABS, Nylon, and composite filaments.',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600'],
    institutionId: 'inst-3',
    departmentId: 'dept-4',
    location: 'Innovation MakerSpace',
    quantity: 2,
    availableCount: 1,
    schedule: 'Mon-Fri 10:00 AM - 9:00 PM',
    maxBookingDurationDays: 1,
    eligibilityRequirements: 'Completed MakerSpace safety orientation and 3D printing badge.',
    requiredTraining: 'Laser Cutter Basic',
    supervisionRequirement: true,
    usageInstructions: 'Clean build plate with isopropyl alcohol before starting print jobs.',
    depositAmount: 15.00,
    approvalRequired: true,
    ownerId: 'usr-owner-1',
    condition: 'Good',
    totalUsageCount: 89,
    rating: 4.9
  },
  {
    id: 'res-5',
    name: 'Advanced Robotics & AI Kit (ROS Compatible)',
    category: 'Testing equipment',
    description: 'Modular robotic arm, LiDAR sensor, depth camera, and Jetson Nano controller board for autonomous robotics testing.',
    images: ['https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600'],
    institutionId: 'inst-1',
    departmentId: 'dept-1',
    location: 'Robotics Wing, Room 104',
    quantity: 4,
    availableCount: 2,
    schedule: 'Mon-Fri 9:00 AM - 5:00 PM',
    maxBookingDurationDays: 5,
    eligibilityRequirements: 'AI/Robotics specialization students or project leads.',
    requiredTraining: 'Safety 101',
    supervisionRequirement: false,
    usageInstructions: 'Handle delicate sensor arrays with extreme care.',
    depositAmount: 75.00,
    approvalRequired: true,
    ownerId: 'usr-owner-1',
    condition: 'Excellent',
    totalUsageCount: 19,
    rating: 5.0
  },
  {
    id: 'res-6',
    name: 'Immersive VR Studio & Motion Capture Room',
    category: 'Laboratories',
    description: 'OptiTrack motion capture cameras (12 units), HTC Vive Pro 2 headsets, and dedicated high-end rendering PC.',
    images: ['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600'],
    institutionId: 'inst-2',
    departmentId: 'dept-3',
    location: 'Media Block, Room 501',
    quantity: 1,
    availableCount: 1,
    schedule: 'Mon-Sun 8:00 AM - 10:00 PM',
    maxBookingDurationDays: 1,
    eligibilityRequirements: 'Must be accompanied by authorized faculty or senior lab assistant.',
    requiredTraining: 'Media Safety Course',
    supervisionRequirement: true,
    usageInstructions: 'Calibrate tracking suit before each session. No food or drinks.',
    depositAmount: 100.00,
    approvalRequired: true,
    ownerId: 'usr-owner-1',
    condition: 'Excellent',
    totalUsageCount: 65,
    rating: 4.9
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'bk-101',
    resourceId: 'res-1',
    userId: 'usr-student-1',
    startDate: '2026-03-10',
    endDate: '2026-03-12',
    status: 'Approved',
    purpose: 'Documentary shooting for final year project.',
    priorityScore: 85,
    eligibilityVerified: true,
    depositPaid: true,
    initialCondition: 'Mint condition, lens clean.',
    finalCondition: null,
    createdAt: '2026-03-01T10:30:00Z'
  },
  {
    id: 'bk-102',
    resourceId: 'res-4',
    userId: 'usr-student-1',
    startDate: '2026-03-15',
    endDate: '2026-03-15',
    status: 'Pending',
    purpose: 'Prototyping mechanical chassis enclosure.',
    priorityScore: 78,
    eligibilityVerified: true,
    depositPaid: false,
    initialCondition: null,
    finalCondition: null,
    createdAt: '2026-03-05T14:20:00Z'
  }
];

const INITIAL_INCIDENTS = [
  {
    id: 'inc-01',
    resourceId: 'res-3',
    bookingId: 'bk-099',
    reporterId: 'usr-student-1',
    description: 'Channel 2 probe connector was slightly bent upon inspection.',
    evidenceImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300',
    date: '2026-02-20T11:15:00Z',
    status: 'Resolved',
    assignedManagerId: 'usr-manager-1',
    resolutionNotes: 'Replaced probe tip. User cautioned.'
  }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'aud-1', action: 'RESOURCE_CREATED', actor: 'Dr. Sarah Jenkins', resource: 'Canon EOS R5 Professional DSLR Camera', timestamp: '2026-01-15 09:00 AM', prevState: 'None', newState: 'Active' },
  { id: 'aud-2', action: 'BOOKING_REQUESTED', actor: 'Alex Chen', resource: 'Canon EOS R5 Professional DSLR Camera', timestamp: '2026-03-01 10:30 AM', prevState: 'Draft', newState: 'Pending' },
  { id: 'aud-3', action: 'BOOKING_APPROVED', actor: 'Dr. Sarah Jenkins', resource: 'Canon EOS R5 Professional DSLR Camera', timestamp: '2026-03-02 02:15 PM', prevState: 'Pending', newState: 'Approved' }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', userId: 'usr-student-1', title: 'Booking Approved', message: 'Your booking for Canon EOS R5 Professional DSLR Camera has been approved.', timestamp: '2026-03-02 02:15 PM', read: false },
  { id: 'notif-2', userId: 'usr-student-1', title: 'Welcome to CAMPUSX', message: 'Explore shared resources across departments and enjoy streamlined access.', timestamp: '2026-02-10 08:00 AM', read: true }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'register', 'dashboard'
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]); // Default to Student (Alex Chen)
  const [activeDashboardTab, setActiveDashboardTab] = useState('overview');

  // Persistent Data States
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [users, setUsers] = useState(INITIAL_USERS);

  // UI Helpers
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedResourceForDetail, setSelectedResourceForDetail] = useState(null);
  const [selectedPassportResource, setSelectedPassportResource] = useState(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [isDemoSwitcherOpen, setIsDemoSwitcherOpen] = useState(false);

  // Helper for toasts
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const logAudit = (action, actorName, resourceName, prevState, newState, bookingId = null) => {
    const newLog = {
      id: 'aud-' + Date.now(),
      action,
      actor: actorName,
      resource: resourceName,
      bookingId,
      timestamp: new Date().toLocaleString(),
      prevState,
      newState
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addNotification = (userId, title, message) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      userId,
      title,
      message,
      timestamp: new Date().toLocaleString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-white transition-all transform animate-bounce ${
          toastMessage.type === 'error' ? 'bg-rose-600' : toastMessage.type === 'info' ? 'bg-indigo-600' : 'bg-emerald-600'
        }`}>
          {toastMessage.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <span className="font-medium text-sm">{toastMessage.msg}</span>
        </div>
      )}

      {/* Quick Demo Switcher Banner / Modal */}
      {isDemoSwitcherOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Switch Demo Role</h3>
                <p className="text-sm text-slate-500">Instantly test the platform across all four user experiences.</p>
              </div>
              <button onClick={() => setIsDemoSwitcherOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {users.map(u => (
                <div
                  key={u.id}
                  onClick={() => {
                    setCurrentUser(u);
                    setCurrentView('dashboard');
                    setActiveDashboardTab('overview');
                    setIsDemoSwitcherOpen(false);
                    showToast(`Switched to ${u.name} (${u.role})`, 'info');
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    currentUser.id === u.id ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover border" />
                    <div>
                      <h4 className="font-semibold text-slate-900">{u.name}</h4>
                      <p className="text-xs text-slate-500">{u.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-md">
                        {u.role}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={() => { setCurrentView('landing'); setIsDemoSwitcherOpen(false); }}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Go to Landing Page
              </button>
              <button
                onClick={() => setIsDemoSwitcherOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Demo Bar */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 text-xs flex justify-between items-center z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">CAMPUSX 2.6</span>
          <span className="hidden sm:inline">Smart College Resource-Sharing Network (Access More. Own Less.)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Current Role: <strong className="text-white">{currentUser.name} ({currentUser.role})</strong></span>
          <button
            onClick={() => setIsDemoSwitcherOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> Switch Demo Role
          </button>
        </div>
      </div>

      {/* Main App Switcher */}
      {currentView === 'landing' && (
        <LandingPage
          onExplore={() => { setCurrentView('dashboard'); setActiveDashboardTab('explore'); }}
          onListResource={() => {
            // Switch to owner or open add resource
            const owner = users.find(u => u.role === 'Resource Owner') || users[1];
            setCurrentUser(owner);
            setCurrentView('dashboard');
            setActiveDashboardTab('add-resource');
          }}
          onLogin={() => setCurrentView('login')}
          onRegister={() => setCurrentView('register')}
          resources={resources}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          users={users}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setCurrentView('dashboard');
            setActiveDashboardTab('overview');
            showToast(`Welcome back, ${user.name}!`);
          }}
          onBack={() => setCurrentView('landing')}
          onGoRegister={() => setCurrentView('register')}
        />
      )}

      {currentView === 'register' && (
        <RegistrationPage
          institutions={INITIAL_INSTITUTIONS}
          departments={INITIAL_DEPARTMENTS}
          onRegisterSuccess={(newUser) => {
            setUsers(prev => [...prev, newUser]);
            setCurrentUser(newUser);
            setCurrentView('dashboard');
            setActiveDashboardTab('overview');
            showToast('Registration successful! Welcome to CAMPUSX.');
          }}
          onBack={() => setCurrentView('landing')}
          onGoLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && (
        <DashboardLayout
          currentUser={currentUser}
          activeTab={activeDashboardTab}
          setActiveTab={setActiveDashboardTab}
          onLogout={() => setCurrentView('landing')}
          resources={resources}
          setResources={setResources}
          bookings={bookings}
          setBookings={setBookings}
          incidents={incidents}
          setIncidents={setIncidents}
          auditLogs={auditLogs}
          notifications={notifications}
          users={users}
          logAudit={logAudit}
          addNotification={addNotification}
          showToast={showToast}
          selectedResourceForDetail={selectedResourceForDetail}
          setSelectedResourceForDetail={setSelectedResourceForDetail}
          selectedPassportResource={selectedPassportResource}
          setSelectedPassportResource={setSelectedPassportResource}
          aiChatOpen={aiChatOpen}
          setAiChatOpen={setAiChatOpen}
        />
      )}
    </div>
  );
}

// ==========================================
// 1. LANDING PAGE
// ==========================================

function LandingPage({ onExplore, onListResource, onLogin, onRegister, resources }) {
  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">CAMPUSX</span>
              <span className="block text-[10px] font-semibold text-blue-600 uppercase tracking-widest">Smart Resource-Sharing</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
            <a href="#categories" className="hover:text-blue-600 transition">Categories</a>
            <a href="#benefits" className="hover:text-blue-600 transition">Benefits</a>
            <a href="#stats" className="hover:text-blue-600 transition">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition">
              Sign In
            </button>
            <button onClick={onRegister} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-600/20 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Tagline: Access More. Own Less.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Your Campus Has <span className="text-blue-500">More to Offer.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Discover, access and share valuable college equipment, laboratories, cameras, computers, and meeting spaces through one trusted institutional platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExplore}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
              >
                Explore Resources <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={onListResource}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-2xl font-bold transition flex items-center justify-center gap-2"
              >
                List Your Resources
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-6 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                <span className="text-sm font-semibold text-slate-300">Live Marketplace Feed</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 24 Active Assets
                </span>
              </div>
              <div className="space-y-3">
                {resources.slice(0, 3).map((r, i) => (
                  <div key={i} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-4">
                    <img src={r.images[0]} alt={r.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">{r.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{r.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-500/20 text-blue-300 rounded">
                          {r.category}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">{r.availableCount} Available</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-1">$450K+</div>
            <div className="text-sm font-medium text-slate-500">Equipment Value Shared</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black text-blue-600 mb-1">3,400+</div>
            <div className="text-sm font-medium text-slate-500">Successful Bookings</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-1">100%</div>
            <div className="text-sm font-medium text-slate-500">Audit Traceability</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-black text-emerald-600 mb-1">12 Mins</div>
            <div className="text-sm font-medium text-slate-500">Average Approval Time</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">How CAMPUSX Works</h2>
          <p className="text-slate-600">A structured, secure lifecycle from resource discovery to verified return.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-600/20">1</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Discover & Check Eligibility</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Search campus equipment across departments. Check real-time availability and confirm your safety training prerequisites.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-600/20">2</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">FairShare Booking & Approval</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Submit requests backed by priority score allocation. Resource owners review and approve bookings instantly without conflicts.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-blue-600/20">3</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Handover & Passport</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Check in with condition photo logging, complete your project, and return for automated equipment passport updates.</p>
          </div>
        </div>
      </section>

      {/* Resource Categories Grid */}
      <section id="categories" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">Explore Resource Categories</h2>
              <p className="text-slate-400">Everything your campus offers, available in one intelligent network.</p>
            </div>
            <button onClick={onExplore} className="hidden sm:flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300">
              View All Categories <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Laptop, name: 'Computers & Laptops' },
              { icon: Camera, name: 'Cameras & Photo' },
              { icon: Cpu, name: 'Electronics Equipment' },
              { icon: Beaker, name: 'Laboratories' },
              { icon: DoorOpen, name: 'Classrooms' },
              { icon: Presentation, name: 'Meeting Rooms' },
              { icon: Printer, name: '3D Printers' },
              { icon: Wrench, name: 'Workshop Tools' },
              { icon: Activity, name: 'Testing Equipment' },
              { icon: Globe, name: 'Projectors' }
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={onExplore}
                className="bg-slate-800/80 hover:bg-blue-600/20 border border-slate-700 p-6 rounded-2xl transition cursor-pointer text-center group"
              >
                <cat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition" />
                <h4 className="font-semibold text-sm">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Box className="w-5 h-5" />
            </div>
            <span className="text-white font-bold text-lg">CAMPUSX</span>
          </div>
          <p className="text-sm">© 2026 CAMPUSX Network. All institutional rights reserved. Access More. Own Less.</p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
            <a href="#security" className="hover:text-white transition">Security & RLS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 2. AUTHENTICATION & REGISTRATION
// ==========================================

function LoginPage({ users, onLoginSuccess, onBack, onGoRegister }) {
  const [email, setEmail] = useState('alex.chen@campusx.edu');
  const [password, setPassword] = useState('password');

  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      onLoginSuccess(found);
    } else {
      // Create a temporary user if email not found
      const newUser = {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: 'Student',
        institutionId: 'inst-1',
        departmentId: 'dept-1',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        trainingRecords: ['General Safety']
      };
      onLoginSuccess(newUser);
    }
  };

  return (
    <div className="flex-1 bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Sign In to CAMPUSX</h2>
            <p className="text-sm text-slate-500 mt-1">Smart College Resource-Sharing Network</p>
          </div>
          <button onClick={onBack} className="text-xs font-semibold text-blue-600 hover:underline">Back to Home</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Institutional Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
              placeholder="name@campus.edu"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition text-sm"
          >
            Sign In Securely
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <button onClick={onGoRegister} className="font-semibold text-blue-600 hover:underline">Register Now</button>
        </div>
      </div>
    </div>
  );
}

function RegistrationPage({ institutions, departments, onRegisterSuccess, onBack, onGoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [institutionId, setInstitutionId] = useState(institutions[0].id);
  const [departmentId, setDepartmentId] = useState(departments[0].id);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role,
      institutionId,
      departmentId,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      trainingRecords: ['Basic Safety']
    };
    onRegisterSuccess(newUser);
  };

  return (
    <div className="flex-1 bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Create CAMPUSX Account</h2>
            <p className="text-sm text-slate-500 mt-1">Access More. Own Less.</p>
          </div>
          <button onClick={onBack} className="text-xs font-semibold text-blue-600 hover:underline">Back</button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Dr. Jane Doe / Alex Smith"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Institutional Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="name@campus.edu"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Student">Student</option>
                <option value="Resource Owner">Resource Owner</option>
                <option value="Manager">Laboratory Manager</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Institution</label>
              <select
                value={institutionId}
                onChange={(e) => setInstitutionId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                {institutions.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Department</label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition text-sm mt-4"
          >
            Complete Registration
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button onClick={onGoLogin} className="font-semibold text-blue-600 hover:underline">Sign In</button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. DASHBOARD LAYOUT & NAVIGATION
// ==========================================

function DashboardLayout({
  currentUser, activeTab, setActiveTab, onLogout,
  resources, setResources, bookings, setBookings,
  incidents, setIncidents, auditLogs, notifications,
  users, logAudit, addNotification, showToast,
  selectedResourceForDetail, setSelectedResourceForDetail,
  selectedPassportResource, setSelectedPassportResource,
  aiChatOpen, setAiChatOpen
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define navigation items based on role
  const getNavItems = () => {
    switch(currentUser.role) {
      case 'Student':
        return [
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'explore', label: 'Explore Resources', icon: Search },
          { id: 'bookings', label: 'My Bookings', icon: Calendar },
          { id: 'waiting', label: 'Waiting List', icon: Clock },
          { id: 'history', label: 'Usage History', icon: History },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'My Profile', icon: User }
        ];
      case 'Resource Owner':
        return [
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'my-resources', label: 'My Resources', icon: Layers },
          { id: 'add-resource', label: 'Add Resource', icon: Plus },
          { id: 'booking-requests', label: 'Booking Requests', icon: Calendar },
          { id: 'availability', label: 'Availability', icon: Clock },
          { id: 'condition-reports', label: 'Condition Reports', icon: FileText },
          { id: 'resource-history', label: 'Resource History', icon: History }
        ];
      case 'Manager':
        return [
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'manager-resources', label: 'Assigned Resources', icon: Layers },
          { id: 'manager-bookings', label: 'Review Bookings', icon: Calendar },
          { id: 'handover', label: 'Check-In / Out', icon: CheckSquare },
          { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle }
        ];
      case 'Administrator':
        return [
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'admin-users', label: 'User Management', icon: Users },
          { id: 'admin-resources', label: 'Resource Management', icon: Layers },
          { id: 'admin-bookings', label: 'Booking Management', icon: Calendar },
          { id: 'admin-incidents', label: 'Incident Management', icon: AlertTriangle },
          { id: 'admin-fairshare', label: 'FairShare Analytics', icon: BarChart2 },
          { id: 'admin-audit', label: 'Audit Logs', icon: FileText },
          { id: 'admin-settings', label: 'Institution Settings', icon: Settings }
        ];
      default:
        return [{ id: 'overview', label: 'Overview', icon: Activity }];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-slate-100">
      {/* Sidebar - Dark Navy */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 z-20">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">CAMPUSX</span>
              <span className="block text-[10px] font-semibold text-blue-400 uppercase tracking-widest">{currentUser.role} Portal</span>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-400 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 mx-4 my-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover border border-slate-600" />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm text-white truncate">{currentUser.name}</h4>
            <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className={`flex-1 px-4 space-y-1.5 pb-6 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 h-20 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-xs text-slate-500">
              Welcome back, {currentUser.name} • Institution ID: {currentUser.institutionId}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAiChatOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" /> CampusAI Assistant
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
            </button>
          </div>
        </header>

        {/* Tab Content Router */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Detailed Resource Modal */}
          {selectedResourceForDetail && (
            <ResourceDetailModal
              resource={selectedResourceForDetail}
              currentUser={currentUser}
              onClose={() => setSelectedResourceForDetail(null)}
              onBookRequest={(bookingData) => {
                setBookings(prev => [bookingData, ...prev]);
                logAudit('BOOKING_REQUESTED', currentUser.name, selectedResourceForDetail.name, 'Draft', 'Pending', bookingData.id);
                addNotification(currentUser.id, 'Booking Request Submitted', `Your request for ${selectedResourceForDetail.name} is pending review.`);
                showToast('Booking request submitted successfully!');
                setSelectedResourceForDetail(null);
                setActiveTab('bookings');
              }}
              onOpenPassport={(res) => {
                setSelectedPassportResource(res);
              }}
            />
          )}

          {/* Equipment Passport Modal */}
          {selectedPassportResource && (
            <EquipmentPassportModal
              resource={selectedPassportResource}
              bookings={bookings}
              incidents={incidents}
              users={users}
              onClose={() => setSelectedPassportResource(null)}
            />
          )}

          {/* AI Assistant Drawer */}
          {aiChatOpen && (
            <CampusAIAssistantModal
              onClose={() => setAiChatOpen(false)}
            />
          )}

          {/* RENDER ACTIVE TAB */}
          {activeTab === 'overview' && (
            <OverviewTab
              currentUser={currentUser}
              resources={resources}
              bookings={bookings}
              incidents={incidents}
              setActiveTab={setActiveTab}
              setSelectedResourceForDetail={setSelectedResourceForDetail}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreResourcesTab
              resources={resources}
              onSelectResource={setSelectedResourceForDetail}
              onOpenPassport={setSelectedPassportResource}
            />
          )}

          {activeTab === 'bookings' && (
            <StudentBookingsTab
              bookings={bookings}
              resources={resources}
              currentUser={currentUser}
              setBookings={setBookings}
              logAudit={logAudit}
              showToast={showToast}
            />
          )}

          {activeTab === 'waiting' && (
            <WaitingListTab bookings={bookings} resources={resources} currentUser={currentUser} />
          )}

          {activeTab === 'history' || activeTab === 'resource-history' ? (
            <UsageHistoryTab bookings={bookings} resources={resources} currentUser={currentUser} />
          ) : null}

          {activeTab === 'notifications' && (
            <NotificationsTab notifications={notifications.filter(n => n.userId === currentUser.id || currentUser.role === 'Administrator')} />
          )}

          {activeTab === 'profile' && (
            <ProfileTab currentUser={currentUser} />
          )}

          {/* Owner Tabs */}
          {activeTab === 'my-resources' || activeTab === 'admin-resources' || activeTab === 'manager-resources' ? (
            <MyResourcesTab
              resources={resources}
              setResources={setResources}
              currentUser={currentUser}
              onOpenPassport={setSelectedPassportResource}
              showToast={showToast}
              logAudit={logAudit}
            />
          ) : null}

          {activeTab === 'add-resource' && (
            <AddResourceTab
              currentUser={currentUser}
              setResources={setResources}
              logAudit={logAudit}
              showToast={showToast}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'booking-requests' || activeTab === 'admin-bookings' || activeTab === 'manager-bookings' ? (
            <BookingRequestsTab
              bookings={bookings}
              setBookings={setBookings}
              resources={resources}
              users={users}
              currentUser={currentUser}
              logAudit={logAudit}
              addNotification={addNotification}
              showToast={showToast}
            />
          ) : null}

          {activeTab === 'availability' && (
            <AvailabilityManagementTab resources={resources} showToast={showToast} />
          )}

          {activeTab === 'condition-reports' && (
            <ConditionReportsTab bookings={bookings} resources={resources} users={users} />
          )}

          {activeTab === 'handover' && (
            <CheckInCheckOutTab
              bookings={bookings}
              setBookings={setBookings}
              resources={resources}
              users={users}
              logAudit={logAudit}
              showToast={showToast}
            />
          )}

          {activeTab === 'incidents' || activeTab === 'admin-incidents' ? (
            <IncidentManagementTab
              incidents={incidents}
              setIncidents={setIncidents}
              resources={resources}
              currentUser={currentUser}
              showToast={showToast}
            />
          ) : null}

          {/* Admin Tabs */}
          {activeTab === 'admin-users' && (
            <AdminUsersTab users={users} />
          )}

          {activeTab === 'admin-fairshare' && (
            <FairShareAnalyticsTab />
          )}

          {activeTab === 'admin-audit' && (
            <AuditLogsTab auditLogs={auditLogs} />
          )}

          {activeTab === 'admin-settings' && (
            <InstitutionSettingsTab showToast={showToast} />
          )}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 4. ROLE OVERVIEW TAB
// ==========================================

function OverviewTab({ currentUser, resources, bookings, incidents, setActiveTab, setSelectedResourceForDetail }) {
  const userBookings = bookings.filter(b => currentUser.role === 'Student' ? b.userId === currentUser.id : true);
  const activeCount = userBookings.filter(b => b.status === 'Approved' || b.status === 'Checked In').length;
  const pendingCount = userBookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Active Bookings</p>
            <h3 className="text-3xl font-black text-slate-900">{activeCount}</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">Ready or In-Use</span>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Calendar className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Pending Requests</p>
            <h3 className="text-3xl font-black text-slate-900">{pendingCount}</h3>
            <span className="text-xs text-amber-600 font-medium mt-1 inline-block">Awaiting approval</span>
          </div>
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <Clock className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Resources</p>
            <h3 className="text-3xl font-black text-slate-900">{resources.length}</h3>
            <span className="text-xs text-blue-600 font-medium mt-1 inline-block">Listed across campus</span>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Layers className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Open Incidents</p>
            <h3 className="text-3xl font-black text-slate-900">{incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Closed').length}</h3>
            <span className="text-xs text-rose-600 font-medium mt-1 inline-block">Require attention</span>
          </div>
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Analytics Chart Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Resource Utilisation & Demand</h3>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-lg">Last 30 Days</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { day: 'Mon', bookings: 12 },
                { day: 'Tue', bookings: 19 },
                { day: 'Wed', bookings: 15 },
                { day: 'Thu', bookings: 25 },
                { day: 'Fri', bookings: 32 },
                { day: 'Sat', bookings: 18 },
                { day: 'Sun', bookings: 10 }
              ]}>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.15} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Recommendations */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">CampusX Quick Actions</h3>
            <p className="text-xs text-slate-500 mb-6">Instantly access core network capabilities.</p>
            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('explore')}
                className="w-full p-3.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-2xl text-sm flex items-center justify-between transition"
              >
                <span>Explore Marketplace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              {currentUser.role === 'Resource Owner' && (
                <button
                  onClick={() => setActiveTab('add-resource')}
                  className="w-full p-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-2xl text-sm flex items-center justify-between transition"
                >
                  <span>List New Resource</span>
                  <Plus className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setActiveTab('bookings')}
                className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-2xl text-sm flex items-center justify-between transition"
              >
                <span>Check My Bookings</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
            <span>FairShare Engine Active</span>
            <span className="font-semibold text-emerald-600">Secure RLS</span>
          </div>
        </div>
      </div>

      {/* Featured Resources Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900 text-lg">Featured Campus Resources</h3>
          <button onClick={() => setActiveTab('explore')} className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.slice(0, 3).map(res => (
            <div key={res.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col bg-white">
              <img src={res.images[0]} alt={res.name} className="w-full h-44 object-cover" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">{res.category}</span>
                  <h4 className="font-bold text-slate-900 mt-2 mb-1">{res.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{res.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600">{res.availableCount} Available</span>
                  <button
                    onClick={() => setSelectedResourceForDetail(res)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. RESOURCE DISCOVERY & MARKETPLACE
// ==========================================

function ExploreResourcesTab({ resources, onSelectResource, onOpenPassport }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Computers and laptops', 'Cameras and photography', 'Electronics equipment', 'Laboratories', '3D printers', 'Testing equipment'];

  const filtered = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search equipment, cameras, laboratories, 3D printers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(res => (
          <div key={res.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition flex flex-col group">
            <div className="relative overflow-hidden h-52">
              <img src={res.images[0]} alt={res.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {res.availableCount} / {res.quantity} Ready
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{res.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{res.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{res.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <MapPin className="w-4 h-4 text-slate-400" /> {res.location}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenPassport(res)}
                  className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <History className="w-3.5 h-3.5" /> Passport
                </button>
                <button
                  onClick={() => onSelectResource(res)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition"
                >
                  Request Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. RESOURCE DETAIL MODAL & BOOKING ENGINE
// ==========================================

function ResourceDetailModal({ resource, currentUser, onClose, onBookRequest, onOpenPassport }) {
  const getDateValue = (offsetDays) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  };
  const [startDate, setStartDate] = useState(() => getDateValue(1));
  const [endDate, setEndDate] = useState(() => getDateValue(4));
  const [purpose, setPurpose] = useState('');
  const [eligibilityConfirmed, setEligibilityConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eligibilityConfirmed) {
      alert('Please confirm that you meet all eligibility and training requirements.');
      return;
    }
    const newBooking = {
      id: 'bk-' + Date.now(),
      resourceId: resource.id,
      userId: currentUser.id,
      startDate,
      endDate,
      status: 'Pending',
      purpose,
      priorityScore: 82,
      eligibilityVerified: true,
      depositPaid: resource.depositAmount === 0,
      initialCondition: null,
      finalCondition: null,
      createdAt: new Date().toISOString()
    };
    onBookRequest(newBooking);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">{resource.category}</span>
            <h2 className="text-xl font-black text-slate-900">{resource.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={resource.images[0]} alt={resource.name} className="w-full h-64 object-cover rounded-2xl shadow-md" />
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => onOpenPassport(resource)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                >
                  <History className="w-4 h-4" /> View Equipment Passport
                </button>
                <span className="text-xs font-semibold text-emerald-600">{resource.availableCount} Units Available</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Description</h4>
                <p>{resource.description}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Location</h4>
                <p className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-600" /> {resource.location}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Eligibility Requirements</h4>
                <p className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-medium">
                  {resource.eligibilityRequirements}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Required Training</h4>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                  {resource.requiredTraining}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Request Booking</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  min={getDateValue(0)}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (endDate < e.target.value) setEndDate(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">End Date</label>
                <input
                  type="date"
                  required
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Purpose / Project Description</label>
              <textarea
                required
                rows={3}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Describe your intended academic or research use..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="eligibility"
                checked={eligibilityConfirmed}
                onChange={(e) => setEligibilityConfirmed(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="eligibility" className="text-xs font-medium text-slate-700">
                I confirm I meet all eligibility requirements and agree to return the item in pristine condition.
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/25 transition text-sm mt-4"
            >
              Submit Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. STUDENT BOOKINGS & WAITING LIST
// ==========================================

function StudentBookingsTab({ bookings, resources, currentUser, setBookings, logAudit, showToast }) {
  const myBookings = bookings.filter(b => currentUser.role === 'Student' ? b.userId === currentUser.id : true);

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    logAudit('BOOKING_CANCELLED', currentUser.name, 'Resource ID: ' + id, 'Pending', 'Cancelled', id);
    showToast('Booking cancelled.', 'info');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">My Bookings</h3>
        <div className="space-y-4">
          {myBookings.map(bk => {
            const res = resources.find(r => r.id === bk.resourceId) || { name: 'Unknown Resource' };
            return (
              <div key={bk.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      bk.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      bk.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      bk.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {bk.status}
                    </span>
                    <span className="text-xs text-slate-400">ID: {bk.id}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{res.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">Duration: {bk.startDate} to {bk.endDate} • Purpose: {bk.purpose}</p>
                </div>
                <div className="flex items-center gap-3">
                  {bk.status === 'Pending' && (
                    <button
                      onClick={() => cancelBooking(bk.id)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition"
                    >
                      Cancel Request
                    </button>
                  )}
                  <span className="text-xs font-semibold px-3 py-2 bg-blue-50 text-blue-700 rounded-xl">
                    Priority Score: {bk.priorityScore}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WaitingListTab({ bookings, resources, currentUser }) {
  const waitlisted = bookings.filter(b => b.status === 'Waitlisted' && b.userId === currentUser.id);
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Waiting List & FairShare Priority</h3>
        <p className="text-xs text-slate-500 mb-6">Transparent allocation ranking based on usage frequency and wait duration.</p>
        <div className="space-y-4">
          {waitlisted.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No active waiting list entries.</div>
          ) : (
            waitlisted.map(w => {
              const res = resources.find(r => r.id === w.resourceId);
              return (
                <div key={w.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900">{res?.name}</h4>
                    <p className="text-xs text-slate-500">Requested for {w.startDate}</p>
                  </div>
                  <span className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-xl text-xs font-bold">
                    FairShare Priority Score: {w.priorityScore}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function UsageHistoryTab({ bookings, resources, currentUser }) {
  const completed = bookings.filter(b =>
    (b.status === 'Returned' || b.status === 'Approved') &&
    (currentUser.role !== 'Student' || b.userId === currentUser.id)
  );
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Usage History & Completed Bookings</h3>
        <div className="space-y-4">
          {completed.map(bk => {
            const res = resources.find(r => r.id === bk.resourceId);
            return (
              <div key={bk.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">{res?.name}</h4>
                  <p className="text-xs text-slate-500">{bk.startDate} to {bk.endDate}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Completed</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NotificationsTab({ notifications }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Notification Center</h3>
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 rounded-2xl border ${n.read ? 'bg-white border-slate-200' : 'bg-blue-50/60 border-blue-200'}`}>
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ currentUser }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-slate-100">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-600 shadow-md" />
          <div>
            <h2 className="text-2xl font-black text-slate-900">{currentUser.name}</h2>
            <p className="text-sm text-slate-500">{currentUser.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
              {currentUser.role}
            </span>
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Training & Safety Records</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentUser.trainingRecords?.map((tr, i) => (
                <span key={i} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> {tr}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. DIGITAL EQUIPMENT PASSPORT
// ==========================================

function EquipmentPassportModal({ resource, bookings, incidents, users, onClose }) {
  const resourceBookings = bookings.filter(b => b.resourceId === resource.id);
  const resourceIncidents = incidents.filter(i => i.resourceId === resource.id);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Permanent Equipment Passport</span>
            <h2 className="text-xl font-black text-slate-900">{resource.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block mb-1 font-semibold">Resource ID</span>
              <span className="font-bold text-slate-900 text-sm">{resource.id}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block mb-1 font-semibold">Condition</span>
              <span className="font-bold text-emerald-600 text-sm">{resource.condition}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block mb-1 font-semibold">Total Usage Count</span>
              <span className="font-bold text-slate-900 text-sm">{resource.totalUsageCount} Bookings</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-400 block mb-1 font-semibold">Rating</span>
              <span className="font-bold text-amber-500 text-sm">⭐ {resource.rating} / 5.0</span>
            </div>
          </div>

          {/* Chronological History Timeline */}
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-4">Chronological Activity History</h3>
            <div className="space-y-4 border-l-2 border-blue-600 pl-4 ml-2">
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                <h4 className="font-bold text-slate-900 text-sm">Asset Registered</h4>
                <p className="text-xs text-slate-500">Added to CAMPUSX institutional network inventory.</p>
              </div>
              {resourceBookings.map(bk => {
                const u = users.find(usr => usr.id === bk.userId);
                return (
                  <div key={bk.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-slate-100"></div>
                    <h4 className="font-bold text-slate-900 text-sm">Booked by {u?.name || 'Student'} ({bk.status})</h4>
                    <p className="text-xs text-slate-500">{bk.startDate} to {bk.endDate} • {bk.purpose}</p>
                  </div>
                );
              })}
              {resourceIncidents.map(inc => (
                <div key={inc.id} className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-100"></div>
                  <h4 className="font-bold text-rose-700 text-sm">Incident Reported: {inc.description}</h4>
                  <p className="text-xs text-slate-500">Status: {inc.status} • Resolution: {inc.resolutionNotes || 'Pending'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. OWNER & MANAGER MODULES
// ==========================================

function MyResourcesTab({ resources, setResources, currentUser, onOpenPassport, showToast, logAudit }) {
  const handleDelete = (id, name) => {
    setResources(prev => prev.filter(r => r.id !== id));
    logAudit('RESOURCE_DELETED', currentUser.name, name, 'Active', 'Deleted');
    showToast('Resource deleted successfully.');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">My Managed Resources</h3>
        <div className="space-y-4">
          {resources.map(res => (
            <div key={res.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={res.images[0]} alt={res.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{res.name}</h4>
                  <p className="text-xs text-slate-500">{res.location} • {res.availableCount} available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenPassport(res)}
                  className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Passport
                </button>
                <button
                  onClick={() => handleDelete(res.id, res.name)}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddResourceTab({ currentUser, setResources, logAudit, showToast, setActiveTab }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Computers and laptops');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [eligibilityRequirements, setEligibilityRequirements] = useState('');
  const requiredTraining = 'Safety 101';
  const depositAmount = 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRes = {
      id: 'res-' + Date.now(),
      name,
      category,
      description,
      images: ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600'],
      institutionId: currentUser.institutionId,
      departmentId: currentUser.departmentId,
      location,
      quantity: parseInt(quantity),
      availableCount: parseInt(quantity),
      schedule: 'Mon-Fri 9:00 AM - 5:00 PM',
      maxBookingDurationDays: 3,
      eligibilityRequirements,
      requiredTraining,
      supervisionRequirement: false,
      usageInstructions: 'Standard operating guidelines apply.',
      depositAmount: parseFloat(depositAmount),
      approvalRequired: true,
      ownerId: currentUser.id,
      condition: 'Mint',
      totalUsageCount: 0,
      rating: 5.0
    };
    setResources(prev => [newRes, ...prev]);
    logAudit('RESOURCE_CREATED', currentUser.name, name, 'None', 'Active');
    showToast('Resource added successfully!');
    setActiveTab('my-resources');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
        <h3 className="font-bold text-slate-900 text-xl mb-6">Add New Campus Resource</h3>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Resource Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              placeholder="e.g. Sony A7IV Mirrorless Camera"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Computers and laptops">Computers and laptops</option>
                <option value="Cameras and photography">Cameras and photography</option>
                <option value="Electronics equipment">Electronics equipment</option>
                <option value="Laboratories">Laboratories</option>
                <option value="3D printers">3D printers</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Quantity</label>
              <input
                type="number"
                min={1}
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              placeholder="Full technical specifications..."
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              placeholder="e.g. Media Center, Room 102"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Eligibility Requirements</label>
            <input
              type="text"
              required
              value={eligibilityRequirements}
              onChange={(e) => setEligibilityRequirements(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              placeholder="e.g. Media majors only"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition mt-6"
          >
            Publish Resource Listing
          </button>
        </form>
      </div>
    </div>
  );
}

function BookingRequestsTab({ bookings, setBookings, resources, users, currentUser, logAudit, addNotification, showToast }) {
  const updateStatus = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    const bk = bookings.find(b => b.id === id);
    const res = resources.find(r => r.id === bk?.resourceId);
    logAudit(`BOOKING_${newStatus.toUpperCase()}`, currentUser.name, res?.name || 'Resource', 'Pending', newStatus, id);
    if (bk) {
      addNotification(bk.userId, `Booking ${newStatus}`, `Your request for ${res?.name} has been ${newStatus.toLowerCase()}.`);
    }
    showToast(`Booking ${newStatus.toLowerCase()} successfully.`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Review Booking Requests</h3>
        <div className="space-y-4">
          {bookings.map(bk => {
            const res = resources.find(r => r.id === bk.resourceId);
            const usr = users.find(u => u.id === bk.userId);
            return (
              <div key={bk.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900">{usr?.name || 'Student'}</span>
                    <span className="text-xs text-slate-400">requested</span>
                    <span className="font-bold text-blue-600">{res?.name}</span>
                  </div>
                  <p className="text-xs text-slate-500">Duration: {bk.startDate} to {bk.endDate} • Purpose: {bk.purpose}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                    Status: {bk.status}
                  </span>
                </div>
                {bk.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStatus(bk.id, 'Approved')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(bk.id, 'Rejected')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AvailabilityManagementTab({ resources, showToast }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Availability Schedule Management</h3>
        <div className="space-y-4">
          {resources.map(res => (
            <div key={res.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900">{res.name}</h4>
                <p className="text-xs text-slate-500">Schedule: {res.schedule}</p>
              </div>
              <button
                onClick={() => showToast('Schedule updated successfully.')}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Edit Schedule
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConditionReportsTab({ bookings, resources, users }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Condition Reports & Handover Logs</h3>
        <div className="space-y-4">
          {bookings.filter(b => b.initialCondition).map(bk => {
            const res = resources.find(r => r.id === bk.resourceId);
            const usr = users.find(u => u.id === bk.userId);
            return (
              <div key={bk.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900">{res?.name} — Handover by {usr?.name}</h4>
                  <span className="text-xs text-slate-400">{bk.startDate}</span>
                </div>
                <p className="text-xs text-slate-600">Initial Condition: {bk.initialCondition}</p>
                {bk.finalCondition && <p className="text-xs text-emerald-700">Final Condition: {bk.finalCondition}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CheckInCheckOutTab({ bookings, setBookings, resources, users, logAudit, showToast }) {
  const [conditionNote, setConditionNote] = useState('');

  const handleCheckIn = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Checked In', initialCondition: conditionNote || 'Mint condition verified.' } : b));
    logAudit('CHECKED_IN', 'Facility Manager', 'Booking ID: ' + id, 'Approved', 'Checked In', id);
    showToast('Check-in completed successfully.');
    setConditionNote('');
  };

  const handleReturn = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Returned', finalCondition: conditionNote || 'Returned without damage.' } : b));
    logAudit('RESOURCE_RETURNED', 'Facility Manager', 'Booking ID: ' + id, 'Checked In', 'Returned', id);
    showToast('Return confirmed successfully.');
    setConditionNote('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Digital Handover System (Check-In & Check-Out)</h3>
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Condition Notes / Photo Logging</label>
          <input
            type="text"
            value={conditionNote}
            onChange={(e) => setConditionNote(e.target.value)}
            placeholder="e.g. Scuff mark on left bezel or pristine condition..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div className="space-y-4">
          {bookings.filter(b => b.status === 'Approved' || b.status === 'Checked In').map(bk => {
            const res = resources.find(r => r.id === bk.resourceId);
            const usr = users.find(u => u.id === bk.userId);
            return (
              <div key={bk.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">{res?.name} — {usr?.name}</h4>
                  <p className="text-xs text-slate-500">Status: {bk.status} • {bk.startDate} to {bk.endDate}</p>
                </div>
                <div>
                  {bk.status === 'Approved' && (
                    <button
                      onClick={() => handleCheckIn(bk.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      Confirm Check-In
                    </button>
                  )}
                  {bk.status === 'Checked In' && (
                    <button
                      onClick={() => handleReturn(bk.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      Confirm Return
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function IncidentManagementTab({ incidents, setIncidents, resources, currentUser, showToast }) {
  const [desc, setDesc] = useState('');

  const reportIncident = (e) => {
    e.preventDefault();
    if (!desc) return;
    const newInc = {
      id: 'inc-' + Date.now(),
      resourceId: resources[0].id,
      bookingId: 'bk-101',
      reporterId: currentUser.id,
      description: desc,
      evidenceImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300',
      date: new Date().toISOString(),
      status: 'Open',
      assignedManagerId: currentUser.id,
      resolutionNotes: null
    };
    setIncidents(prev => [newInc, ...prev]);
    showToast('Incident reported successfully.');
    setDesc('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Incident Management & Damage Reports</h3>
        <form onSubmit={reportIncident} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Report damage, missing components, or malfunction..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          <button type="submit" className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold">
            Submit Incident Report
          </button>
        </form>
        <div className="space-y-3">
          {incidents.map(inc => (
            <div key={inc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900">{inc.description}</h4>
                <p className="text-xs text-slate-500">Status: {inc.status} • Resolution: {inc.resolutionNotes || 'Under Review'}</p>
              </div>
              <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-lg text-xs font-bold">{inc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. ADMINISTRATOR MODULES
// ==========================================

function AdminUsersTab({ users }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">User Management & Role Assignment</h3>
        <div className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{u.name}</h4>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">{u.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FairShareAnalyticsTab() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">FairShare Engine & Allocation Analytics</h3>
        <p className="text-xs text-slate-500 mb-6">Ensuring transparent, equitable resource distribution across college departments.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { dept: 'CS & AI', allocation: 45 },
              { dept: 'ECE', allocation: 30 },
              { dept: 'Media Center', allocation: 60 },
              { dept: 'MECH Workshop', allocation: 25 }
            ]}>
              <XAxis dataKey="dept" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="allocation" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AuditLogsTab({ auditLogs }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Complete System Audit Logs</h3>
        <p className="text-xs text-slate-500 mb-6">Immutable record of state transitions, bookings, and administrative actions.</p>
        <div className="space-y-3">
          {auditLogs.map(log => (
            <div key={log.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-blue-600 mr-2">[{log.action}]</span>
                <span className="font-semibold text-slate-800">{log.actor}</span> interacted with <span className="text-slate-900 font-bold">{log.resource}</span>
              </div>
              <div className="text-slate-400">{log.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstitutionSettingsTab({ showToast }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-xl">
        <h3 className="font-bold text-slate-900 text-xl mb-6">Institution Fair-Use Policy Settings</h3>
        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Maximum Booking Duration (Days)</label>
            <input type="number" defaultValue={7} className="w-full px-4 py-2.5 rounded-xl border border-slate-200" />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Automatic Cancellation Window (Hours)</label>
            <input type="number" defaultValue={24} className="w-full px-4 py-2.5 rounded-xl border border-slate-200" />
          </div>
          <button
            onClick={() => showToast('Policy settings updated successfully.')}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. CAMPUS AI RESOURCE ASSISTANT
// ==========================================

function CampusAIAssistantModal({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am CampusAI, your intelligent resource assistant. How can I help you find equipment, cameras, or labs today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = "I found several items matching your request.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('camera') || lower.includes('dslr')) {
        reply = "Here is the Canon EOS R5 Professional DSLR Camera. It's available in the Media Center.";
      } else if (lower.includes('laptop') || lower.includes('computer')) {
        reply = "We have Dell Precision 7760 Mobile Workstations available in CS Lab 4B.";
      } else if (lower.includes('3d printer')) {
        reply = "The UltiMaker S5 Industrial 3D Printer is available at the Innovation MakerSpace.";
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full h-[600px] flex flex-col border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">CampusAI Assistant</h3>
              <p className="text-xs text-blue-100">Smart Resource Navigator</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-slate-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
          <input
            type="text"
            placeholder="Ask CampusAI about equipment or eligibility..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}