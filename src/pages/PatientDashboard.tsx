import { useState, useRef } from "react";
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
  Download,
  FileUp,
  X,
  Check,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "appointments" | "prescriptions" | "reports" | "settings"
  >("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Simulated Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      doctor: "Dr. Maya Patel",
      spec: "General Medicine",
      date: "Today, May 28",
      time: "03:40 PM",
      status: "Active",
      roomId: "doctor_45_patient_88_2026",
    },
    {
      id: "2",
      doctor: "Dr. Rajesh Sharma",
      spec: "Cardiology",
      date: "June 2, 2026",
      time: "10:00 AM",
      status: "Scheduled",
      roomId: "doctor_12_patient_88_2026",
    },
    {
      id: "3",
      doctor: "Dr. Aisha Khan",
      spec: "Pediatrics",
      date: "May 15, 2026",
      time: "11:30 AM",
      status: "Completed",
      roomId: "doctor_8_patient_88_2026",
    },
  ]);

  // Simulated Prescriptions State
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "P-101",
      date: "May 15, 2026",
      doctor: "Dr. Aisha Khan",
      diagnosis: "Allergic Rhinitis",
      medicines: ["Cetirizine 10mg (Once daily)", "Fluticasone Nasal Spray (Twice daily)"],
    },
    {
      id: "P-98",
      date: "April 2, 2026",
      doctor: "Dr. Maya Patel",
      diagnosis: "Acute Pharyngitis",
      medicines: ["Amoxicillin 500mg (Thrice daily)", "Paracetamol 650mg (As needed)"],
    },
  ]);

  // Simulated Reports State
  const [reports, setReports] = useState([
    {
      id: "R-501",
      name: "Blood_Panel_Report.pdf",
      type: "PDF",
      size: "1.2 MB",
      date: "May 14, 2026",
    },
    {
      id: "R-402",
      name: "Chest_XRay_Digital.jpg",
      type: "Image",
      size: "4.8 MB",
      date: "April 18, 2026",
    },
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      setUploadProgress(10);

      const interval = setInterval(() => {
        setUploadProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsUploading(false);
              setReports([
                {
                  id: `R-${Math.floor(Math.random() * 900 + 100)}`,
                  name: file.name,
                  type: file.name.endsWith(".pdf") ? "PDF" : "Image",
                  size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                  date: "Today, May 28, 2026",
                },
                ...reports,
              ]);
              toast.success(`${file.name} uploaded successfully!`);
            }, 400);
            return 100;
          }
          return p + 30;
        });
      }, 200);
    }
  };

  const downloadPrescription = (p: any) => {
    toast.success(`Downloading PDF Prescription: ${p.id}`);
  };

  const deleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id));
    toast.info("Report removed.");
  };

  const userName = localStorage.getItem("userName") || "Jane Doe";

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
            <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight truncate max-w-[140px]">
                {userName}
              </p>
              <span className="text-[10px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Patient
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "prescriptions", label: "Prescriptions", icon: FileText },
              { id: "reports", label: "Reports", icon: Upload },
              { id: "settings", label: "Settings", icon: Settings },
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
              Welcome back, {userName.split(" ")[0]}! <span className="text-xl">👋</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Medora HIPAA-secured patient consultation room dashboard.
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
                placeholder="Search records..."
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
                      Notifications
                    </p>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Mark read
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-primary/5 border text-xs">
                      <p className="font-semibold text-primary">Join Consultation Room</p>
                      <p className="text-muted-foreground mt-0.5">
                        Your video session with Dr. Maya Patel starts in 10 minutes!
                      </p>
                      <button
                        onClick={() => navigate("/doctor/consultation/doctor_45_patient_88_2026")}
                        className="mt-1.5 font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        Join Room Now <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="size-9 rounded-lg border bg-card grid place-items-center font-bold text-xs hover:bg-muted transition cursor-pointer"
              >
                {userName.charAt(0)}
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-card shadow-card p-1.5 z-30">
                  <div className="px-2 py-1.5 border-b mb-1">
                    <p className="text-xs font-semibold">{userName}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      patient@example.com
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-muted transition cursor-pointer"
                  >
                    Profile Settings
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
                    label: "Active Consultations",
                    val: "1 Call Today",
                    desc: "Dr. Maya Patel · 03:40 PM",
                    color: "border-primary bg-primary/5",
                  },
                  {
                    label: "Total Appointments",
                    val: "3 Booked",
                    desc: "1 today, 1 scheduled, 1 past",
                    color: "",
                  },
                  {
                    label: "Latest Prescription",
                    val: "Cetirizine 10mg",
                    desc: "Prescribed 13 days ago",
                    color: "",
                  },
                  {
                    label: "Uploaded Reports",
                    val: `${reports.length} Documents`,
                    desc: "X-ray, blood panel digital files",
                    color: "",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`p-4 bg-card border rounded-2xl shadow-card transition-all ${stat.color}`}
                  >
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold mt-1 text-foreground">{stat.val}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* CURRENT ACTIVE CALL WIDGET */}
              <div className="bg-gradient-primary rounded-3xl p-5 md:p-6 text-primary-foreground shadow-glow flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <span className="inline-flex text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full animate-pulse">
                    Live Meeting Available
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold mt-2">Consultation Room Is Open!</h2>
                  <p className="text-sm opacity-90 mt-1">
                    Your video visit with <b>Dr. Maya Patel</b> is ready. Collaborative whiteboard &
                    prescription tools initialized.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/doctor/consultation/doctor_45_patient_88_2026")}
                  className="bg-white text-primary px-6 h-12 rounded-xl font-bold shadow-soft hover:scale-105 transition-transform flex items-center gap-2 shrink-0 cursor-pointer text-sm"
                >
                  <Activity className="size-4 text-emerald-500 animate-pulse" /> Join Consultation
                  Room
                </button>
              </div>

              {/* APPOINTMENTS TABLE */}
              <div className="bg-card border rounded-3xl p-6 shadow-card">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">Scheduled Consultations</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Real-time schedule of your online clinic appointments.
                    </p>
                  </div>
                  <Link to="/booking">
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-primary text-primary-foreground"
                    >
                      Book New
                    </Button>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                        <th className="pb-3 pr-4">Doctor</th>
                        <th className="pb-3 px-4">Specialization</th>
                        <th className="pb-3 px-4">Date & Time</th>
                        <th className="pb-3 px-4 text-center">Status</th>
                        <th className="pb-3 pl-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="group hover:bg-muted/30 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-lg bg-primary/10 text-primary grid place-items-center font-bold text-xs">
                                {apt.doctor.split(" ")[1]?.[0]}
                              </div>
                              <span className="font-semibold">{apt.doctor}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{apt.spec}</td>
                          <td className="py-4 px-4 font-medium text-foreground/80">
                            {apt.date} · {apt.time}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                apt.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse"
                                  : apt.status === "Scheduled"
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 pl-4 text-right">
                            {apt.status === "Active" ? (
                              <button
                                onClick={() => navigate(`/doctor/consultation/${apt.roomId}`)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-bold hover:scale-105 transition-transform cursor-pointer"
                              >
                                Join Consult <ArrowRight className="size-3" />
                              </button>
                            ) : apt.status === "Scheduled" ? (
                              <span className="text-xs text-muted-foreground font-medium">
                                Link ready 10m before
                              </span>
                            ) : (
                              <button
                                onClick={() => setActiveTab("prescriptions")}
                                className="text-xs text-primary font-bold hover:underline cursor-pointer"
                              >
                                View Prescription
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-lg">Your Consultations Schedule</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Browse through upcoming, active and historical video consults.
                  </p>
                </div>
                <Link to="/booking">
                  <Button size="sm" className="rounded-full bg-gradient-primary">
                    Book Appointment
                  </Button>
                </Link>
              </div>

              {/* Table repeated with wider controls */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                      <th className="pb-3 pr-4">Doctor</th>
                      <th className="pb-3 px-4">Specialization</th>
                      <th className="pb-3 px-4">Date & Time</th>
                      <th className="pb-3 px-4">Room Identifier</th>
                      <th className="pb-3 px-4 text-center">Status</th>
                      <th className="pb-3 pl-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="group hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2.5">
                            <div className="size-9 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold text-sm shrink-0">
                              {apt.doctor.split(" ")[1]?.[0]}
                            </div>
                            <div>
                              <p className="font-bold">{apt.doctor}</p>
                              <p className="text-[10px] text-muted-foreground">Board certified</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground font-medium">{apt.spec}</td>
                        <td className="py-4 px-4 font-semibold text-foreground/80">
                          {apt.date} · {apt.time}
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-muted-foreground select-all">
                          {apt.roomId}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              apt.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse"
                                : apt.status === "Scheduled"
                                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-4 pl-4 text-right">
                          {apt.status === "Active" ? (
                            <button
                              onClick={() => navigate(`/doctor/consultation/${apt.roomId}`)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-bold hover:scale-105 transition"
                            >
                              Join Consult Room <ArrowRight className="size-3" />
                            </button>
                          ) : apt.status === "Scheduled" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => toast.success("Simulating call reschedule")}
                                className="text-xs text-primary hover:underline font-semibold"
                              >
                                Reschedule
                              </button>
                              <span className="text-muted-foreground">|</span>
                              <button
                                onClick={() => {
                                  setAppointments(appointments.filter((a) => a.id !== apt.id));
                                  toast.error("Appointment cancelled.");
                                }}
                                className="text-xs text-destructive hover:underline font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setActiveTab("prescriptions")}
                                className="text-xs text-primary font-bold hover:underline"
                              >
                                Prescription
                              </button>
                              <span className="text-muted-foreground">|</span>
                              <button
                                onClick={() => navigate(`/doctor/consultation/${apt.roomId}`)}
                                className="text-xs text-muted-foreground font-semibold hover:text-foreground"
                              >
                                Revisit Room
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "prescriptions" && (
            <motion.div
              key="prescriptions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Digital Prescription Records
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    HIPAA compliant electronic prescriptions generated by your doctor during
                    consultations.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {prescriptions.map((pr) => (
                  <div
                    key={pr.id}
                    className="bg-card border rounded-3xl p-6 shadow-card hover:shadow-glow transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-3xl -z-10 group-hover:bg-primary/8 transition-colors" />
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {pr.id}
                        </span>
                        <h4 className="font-bold text-lg mt-2 text-foreground">{pr.doctor}</h4>
                        <p className="text-xs text-muted-foreground">{pr.date}</p>
                      </div>
                      <button
                        onClick={() => downloadPrescription(pr)}
                        className="size-9 rounded-lg border bg-card hover:bg-muted grid place-items-center text-primary cursor-pointer shrink-0"
                      >
                        <Download className="size-4" />
                      </button>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Diagnosis
                      </p>
                      <p className="text-sm font-semibold text-foreground/80 mt-1">
                        {pr.diagnosis}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Prescribed Medicines
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {pr.medicines.map((med, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-foreground/80">
                            <Check className="size-4 text-emerald-500 shrink-0" /> {med}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => downloadPrescription(pr)}
                      className="mt-6 w-full flex items-center justify-center gap-1.5 h-10 border rounded-xl text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 transition cursor-pointer"
                    >
                      <FileText className="size-3.5" /> Download Digital PDF Prescription
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "reports" && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Drag-and-drop simulated area */}
              <div className="bg-card border rounded-3xl p-6 md:p-8 shadow-card text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-2xl pointer-events-none" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                <div className="max-w-md mx-auto">
                  <div className="size-16 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto mb-4 animate-bounce-subtle">
                    <FileUp className="size-8" />
                  </div>
                  <h3 className="font-bold text-lg">Upload Medical Reports</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    Share blood panels, X-rays, MRI scans or past records with your doctor. File
                    uploads are instantly shared in the active Consultation Room.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={triggerUpload}
                      disabled={isUploading}
                      className="inline-flex items-center gap-1.5 px-6 h-12 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-bold shadow-soft hover:scale-[1.02] transition cursor-pointer"
                    >
                      <Upload className="size-4" /> Select Digital File
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3">
                    Accepts PDF, PNG, JPG files up to 25MB. Fully encrypted.
                  </p>
                </div>

                {isUploading && (
                  <div className="mt-6 max-w-xs mx-auto space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-primary">
                        Uploading medical report...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* REPORT LIST */}
              <div className="bg-card border rounded-3xl p-6 shadow-card">
                <div className="mb-4">
                  <h3 className="font-semibold text-base">
                    Your Uploaded Documents ({reports.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Documents you uploaded that are accessible to doctors during consultations.
                  </p>
                </div>

                <div className="divide-y">
                  {reports.map((rep) => (
                    <div
                      key={rep.id}
                      className="py-3 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-teal/10 text-teal-600 grid place-items-center font-bold text-xs shrink-0">
                          {rep.type}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground/90 truncate max-w-[200px] sm:max-w-md">
                            {rep.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {rep.size} · Uploaded {rep.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast.info(`Viewing report: ${rep.name}`)}
                          className="px-2.5 py-1.5 rounded-lg border text-xs font-semibold hover:bg-muted transition cursor-pointer"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => deleteReport(rep.id)}
                          className="size-8 rounded-lg border bg-card hover:bg-destructive/5 text-destructive grid place-items-center cursor-pointer"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
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
              <h3 className="font-semibold text-lg mb-6">Profile Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                {[
                  { label: "Full Name", val: userName },
                  { label: "Email Address", val: "patient@example.com" },
                  { label: "Phone Number", val: "+91 98765 43210" },
                  { label: "Blood Group", val: "O-Positive" },
                  { label: "Allergies", val: "Sulfonamides, Peanuts" },
                  { label: "Emergency Contact", val: "+91 99999 88888" },
                ].map((s, i) => (
                  <div key={i} className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={s.val}
                      className="w-full h-11 px-4 rounded-xl border bg-background/50 outline-none focus:ring-1 ring-primary/40 focus:border-primary text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t pt-6">
                <button
                  onClick={() => toast.success("Profile saved successfully!")}
                  className="px-6 h-12 bg-gradient-primary text-primary-foreground font-bold rounded-xl shadow-soft hover:opacity-95 cursor-pointer text-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
