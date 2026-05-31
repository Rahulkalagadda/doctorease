import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Shield,
  Star,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Bone,
  Eye,
  Sparkles,
  Phone,
  MessageSquare,
  Activity,
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  Bell,
  Search,
  LogOut,
  DollarSign,
  Users,
  Award,
  Clock,
  ArrowUpRight,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "patients" | "appointments" | "earnings" | "settings"
  >("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Simulated Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patient: "Jane Doe",
      age: "28 yrs",
      time: "03:40 PM",
      status: "Active",
      reason: "Fever & severe headache",
      roomId: "doctor_45_patient_88_2026",
    },
    {
      id: "2",
      patient: "Rahul Gupta",
      age: "42 yrs",
      time: "04:30 PM",
      status: "Scheduled",
      reason: "Follow-up on ECG report",
      roomId: "doctor_45_patient_12_2026",
    },
    {
      id: "3",
      patient: "Priya Sen",
      age: "31 yrs",
      time: "05:15 PM",
      status: "Scheduled",
      reason: "Fatigue & thyroid review",
      roomId: "doctor_45_patient_19_2026",
    },
  ]);

  // Patients State
  const [patients, setPatients] = useState([
    {
      id: "P-88",
      name: "Jane Doe",
      sex: "Female",
      age: "28",
      email: "jane@example.com",
      phone: "+91 98765 43210",
      lastVisit: "Today",
    },
    {
      id: "P-12",
      name: "Rahul Gupta",
      sex: "Male",
      age: "42",
      email: "rahul@gupta.com",
      phone: "+91 99887 76655",
      lastVisit: "May 10, 2026",
    },
    {
      id: "P-19",
      name: "Priya Sen",
      sex: "Female",
      age: "31",
      email: "priya@sen.com",
      phone: "+91 88776 65544",
      lastVisit: "May 2, 2026",
    },
  ]);

  const userName = localStorage.getItem("userName") || "Dr. Maya Patel";

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-[#0B1B2B]/30 flex flex-col md:flex-row pt-0">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col justify-between py-6 md:sticky md:top-0 md:h-screen z-20">
        <div className="space-y-6 px-4">
          <div className="flex items-center gap-3 px-2">
            <div className="size-10 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center font-bold">
              MP
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight truncate max-w-[140px]">
                {userName}
              </p>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/8 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Specialist
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "patients", label: "Patients History", icon: Users },
              { id: "appointments", label: "Consultations", icon: Calendar },
              { id: "earnings", label: "Earnings Overview", icon: DollarSign },
              { id: "settings", label: "Room Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "text-foreground/75 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/5 transition cursor-pointer"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* TOP NAVBAR */}
        <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display tracking-tight text-foreground flex items-center gap-2">
              Hello, {userName}! <span className="text-xl">🩺</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Medora Consultation Room portal. View appointments and clinical analytics.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Search */}
            <div className="relative max-w-xs hidden md:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground pointer-events-none">
                <Search className="size-4" />
              </span>
              <input
                type="text"
                placeholder="Search patient record..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-9 pl-9 rounded-lg border bg-card text-xs outline-none focus:ring-1 ring-primary/40 focus:border-primary focus:w-60 transition-all"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative size-9 rounded-lg border bg-card grid place-items-center hover:bg-muted transition cursor-pointer text-foreground"
              >
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-card" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border bg-card/95 backdrop-blur-md shadow-glow p-3 z-30">
                  <div className="flex justify-between items-center pb-2 border-b mb-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Doctor alerts
                    </p>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs">
                      <p className="font-semibold text-emerald-600">Patient Joined Room</p>
                      <p className="text-muted-foreground mt-0.5">
                        Jane Doe is currently waiting in the video session room.
                      </p>
                      <button
                        onClick={() => navigate("/doctor/consultation/doctor_45_patient_88_2026")}
                        className="mt-1.5 inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline cursor-pointer"
                      >
                        Enter Consultation <PlayCircle className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="size-9 rounded-lg border bg-card grid place-items-center font-bold text-xs hover:bg-muted transition cursor-pointer"
              >
                MP
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-card shadow-card p-1.5 z-30">
                  <div className="px-2 py-1.5 border-b mb-1">
                    <p className="text-xs font-semibold">{userName}</p>
                    <p className="text-[10px] text-muted-foreground">doctor@medora.com</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-muted transition cursor-pointer"
                  >
                    Room Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-muted text-destructive font-semibold transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ACTIVE TAB CONTENTS */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* STATS SUMMARY */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Today's Consults",
                    val: "3 Appointments",
                    desc: "1 Active, 2 Scheduled",
                    color: "border-primary bg-primary/5",
                    icon: Clock,
                  },
                  {
                    label: "Total Patients",
                    val: "148 Cases",
                    desc: "Digital history stored",
                    color: "",
                    icon: Users,
                  },
                  {
                    label: "Consultation Revenue",
                    val: "₹18,500",
                    desc: "Monthly payouts active",
                    color: "",
                    icon: DollarSign,
                  },
                  {
                    label: "Pending Prescriptions",
                    val: "0 Pending",
                    desc: "All patient files generated",
                    color: "",
                    icon: FileText,
                  },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className={`p-5 bg-card border rounded-3xl shadow-card transition-all relative overflow-hidden group ${stat.color}`}
                    >
                      <div className="absolute top-2 right-2 text-primary/10 group-hover:text-primary/20 transition-colors">
                        <Icon className="size-12" />
                      </div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold mt-1.5 text-foreground">{stat.val}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* QUICK ACTIONS ROW */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 rounded-3xl border bg-gradient-to-br from-primary/10 to-primary/5 shadow-card flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/20 blur-2xl group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] font-bold text-primary bg-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Launch Room
                    </span>
                    <h3 className="font-bold text-lg mt-3">Start Active Consultation</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Open direct HIPAA video room with custom whiteboard, prescription tabs.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/doctor/consultation/doctor_45_patient_88_2026")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Open Active Meeting Room <ArrowRight className="size-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-3xl border bg-card shadow-card flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-emerald-500/10 blur-2xl group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Patient Care
                    </span>
                    <h3 className="font-bold text-lg mt-3">View Today's Patients</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Review medical records, reports, blood panel files, and diagnostic notes.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("patients")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Browse Clinical History <ArrowRight className="size-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-3xl border bg-card shadow-card flex flex-col justify-between h-48 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-amber-500/10 blur-2xl group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Earnings
                    </span>
                    <h3 className="font-bold text-lg mt-3">Consultation Analytics</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Track fee payouts, insurance billing claims, and daily clinic reports.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("earnings")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline cursor-pointer"
                  >
                    Review Earnings Payouts <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* SCHEDULE TODAY TABLE */}
              <div className="bg-card border rounded-3xl p-6 shadow-card">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">Today's Appointment Schedule</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Click "Launch Consult Room" to open the video call and Excalidraw session.
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Thursday, May 28
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                        <th className="pb-3 pr-4">Patient Name</th>
                        <th className="pb-3 px-4">Time Slot</th>
                        <th className="pb-3 px-4">Consultation Reason</th>
                        <th className="pb-3 px-4 text-center">Status</th>
                        <th className="pb-3 pl-4 text-right">Consultation Call</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="group hover:bg-muted/30 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-lg bg-primary/10 text-primary grid place-items-center font-bold text-xs">
                                {apt.patient.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-foreground">{apt.patient}</span>
                                <span className="text-[10px] text-muted-foreground ml-1.5">
                                  {apt.age}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-primary">{apt.time}</td>
                          <td className="py-4 px-4 text-muted-foreground text-xs">{apt.reason}</td>
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                apt.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse"
                                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 pl-4 text-right">
                            <button
                              onClick={() => navigate(`/doctor/consultation/${apt.roomId}`)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-soft transition hover:scale-102 cursor-pointer ${
                                apt.status === "Active"
                                  ? "bg-gradient-primary text-primary-foreground"
                                  : "border hover:bg-muted"
                              }`}
                            >
                              <PlayCircle className="size-3.5 shrink-0" />
                              Launch Consult Room
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "patients" && (
            <motion.div
              key="patients"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border rounded-3xl p-6 shadow-card"
            >
              <div className="mb-6">
                <h3 className="font-semibold text-lg">Patient Clinical History</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Digital health database of all patients registered with Medora.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                      <th className="pb-3 pr-4">Patient</th>
                      <th className="pb-3 px-4">Gender / Age</th>
                      <th className="pb-3 px-4">Email</th>
                      <th className="pb-3 px-4">Phone</th>
                      <th className="pb-3 px-4">Last Visit</th>
                      <th className="pb-3 pl-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {patients.map((pat) => (
                      <tr key={pat.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2.5">
                            <div className="size-9 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold text-sm shrink-0">
                              {pat.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold">{pat.name}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">
                                {pat.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {pat.sex} / {pat.age} yrs
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-xs">{pat.email}</td>
                        <td className="py-4 px-4 text-muted-foreground text-xs font-mono">
                          {pat.phone}
                        </td>
                        <td className="py-4 px-4 font-semibold text-foreground/80">
                          {pat.lastVisit}
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <button
                            onClick={() => toast.info(`Viewing records for ${pat.name}`)}
                            className="px-2.5 py-1.5 rounded-lg border text-xs font-bold hover:bg-muted transition cursor-pointer"
                          >
                            View Charts
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "appointments" && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border rounded-3xl p-6 shadow-card"
            >
              <div className="mb-6">
                <h3 className="font-semibold text-lg">Consultations Calendar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage details of upcoming clinic bookings.
                </p>
              </div>

              {/* Repeating simple table but with slot manager */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 border rounded-2xl bg-card hover:shadow-soft transition-all space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-primary">{apt.time}</p>
                        <h4 className="font-bold text-foreground mt-1">{apt.patient}</h4>
                        <p className="text-[10px] text-muted-foreground">Age: {apt.age}</p>
                      </div>
                      <span
                        className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          apt.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="border-t pt-3 space-y-2">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">
                        Consultation Reason
                      </p>
                      <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                        {apt.reason}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/doctor/consultation/${apt.roomId}`)}
                      className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xs shadow-soft hover:opacity-95 transition cursor-pointer"
                    >
                      <PlayCircle className="size-4" /> Start Consultation Session
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "earnings" && (
            <motion.div
              key="earnings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-card border rounded-3xl p-6 shadow-card">
                <h3 className="font-semibold text-lg">Earnings Overview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Breakdown of telemedicine payout summaries.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">
                      Daily Revenue
                    </p>
                    <p className="text-xl font-bold mt-1">₹4,500</p>
                  </div>
                  <div className="p-4 border rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">
                      Weekly Revenue
                    </p>
                    <p className="text-xl font-bold mt-1">₹31,500</p>
                  </div>
                  <div className="p-4 border rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">
                      Monthly Payout
                    </p>
                    <p className="text-xl font-bold mt-1">₹1,24,000</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border rounded-3xl p-6 shadow-card"
            >
              <h3 className="font-semibold text-lg mb-6">HIPAA Room Settings</h3>
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <div>
                    <p className="text-sm font-semibold">Self-Hosted Jitsi Meet Server</p>
                    <p className="text-xs text-muted-foreground">
                      Route through secure clinic network.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-xl">
                  <div>
                    <p className="text-sm font-semibold">Excalidraw Live Canvas</p>
                    <p className="text-xs text-muted-foreground">
                      Automated state sync via WebSockets.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
