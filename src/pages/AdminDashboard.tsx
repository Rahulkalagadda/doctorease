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
  ShieldAlert,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "doctors" | "users" | "payments">(
    "dashboard",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Simulated Doctors State
  const [doctorsList, setDoctorsList] = useState([
    {
      id: "D-201",
      name: "Dr. Maya Patel",
      spec: "General Medicine",
      status: "Active",
      experience: "12 yrs",
      rating: "4.9",
      consultations: "84",
    },
    {
      id: "D-202",
      name: "Dr. Rajesh Sharma",
      spec: "Cardiology",
      status: "Active",
      experience: "18 yrs",
      rating: "5.0",
      consultations: "112",
    },
    {
      id: "D-203",
      name: "Dr. Priya Nair",
      spec: "Neurology",
      status: "Pending Approval",
      experience: "11 yrs",
      rating: "N/A",
      consultations: "0",
    },
  ]);

  // Simulated Users State
  const [usersList, setUsersList] = useState([
    {
      id: "U-1001",
      name: "Jane Doe",
      role: "Patient",
      email: "jane@example.com",
      joined: "May 2026",
      status: "Active",
    },
    {
      id: "U-1002",
      name: "Rahul Gupta",
      role: "Patient",
      email: "rahul@gupta.com",
      joined: "April 2026",
      status: "Active",
    },
    {
      id: "U-1003",
      name: "Spam User",
      role: "Patient",
      email: "spam@bot.com",
      joined: "May 2026",
      status: "Suspended",
    },
  ]);

  const userName = localStorage.getItem("userName") || "Admin Portal";

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const handleDoctorApprove = (id: string, name: string) => {
    setDoctorsList(doctorsList.map((doc) => (doc.id === id ? { ...doc, status: "Active" } : doc)));
    toast.success(`${name}'s clinical credentials verified and approved!`);
  };

  const handleUserStatusToggle = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsersList(
      usersList.map((user) => (user.id === id ? { ...user, status: nextStatus } : user)),
    );
    toast.info(`User status updated to ${nextStatus}.`);
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-[#0B1B2B]/30 flex flex-col md:flex-row pt-0">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col justify-between py-6 md:sticky md:top-0 md:h-screen z-20">
        <div className="space-y-6 px-4">
          <div className="flex items-center gap-3 px-2">
            <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 grid place-items-center font-bold">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight truncate max-w-[140px]">
                Medora Admin
              </p>
              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/8 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Super Administrator
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Overview", icon: LayoutDashboard },
              { id: "doctors", label: "Manage Doctors", icon: Stethoscope },
              { id: "users", label: "User Accounts", icon: Users },
              { id: "payments", label: "Revenue Payments", icon: DollarSign },
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
              Super Admin Console <span className="text-xl">🛡️</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Control center for doctor verification, consultation analytics, and system
              configurations.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
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
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border bg-card shadow-glow p-3 z-30">
                  <div className="flex justify-between items-center pb-2 border-b mb-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Admin Notifications
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
                      <p className="font-semibold text-amber-600">Pending Doctor Verification</p>
                      <p className="text-muted-foreground mt-0.5">
                        Dr. Priya Nair uploaded credentials for review.
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab("doctors");
                          setShowNotifications(false);
                        }}
                        className="mt-1 font-bold text-primary hover:underline"
                      >
                        Verify Documents
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
                AP
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-card shadow-card p-1.5 z-30">
                  <div className="px-2 py-1.5 border-b mb-1">
                    <p className="text-xs font-semibold">{userName}</p>
                    <p className="text-[10px] text-muted-foreground">admin@medora.com</p>
                  </div>
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
                    label: "Active Doctors",
                    val: `${doctorsList.filter((d) => d.status === "Active").length} Certified`,
                    desc: "1 pending review",
                    color: "border-primary bg-primary/5",
                    icon: Stethoscope,
                  },
                  {
                    label: "Total Registered Patients",
                    val: "1,240 Users",
                    desc: "Digital profiles encrypted",
                    color: "",
                    icon: Users,
                  },
                  {
                    label: "Platform Revenue",
                    val: "₹4,28,000",
                    desc: "Commission: 15% active",
                    color: "",
                    icon: DollarSign,
                  },
                  {
                    label: "Consultation Calls",
                    val: "354 Rooms",
                    desc: "99.98% uptime Jitsi",
                    color: "",
                    icon: Activity,
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

              {/* QUICK REVIEWS TABLE */}
              <div className="bg-card border rounded-3xl p-6 shadow-card">
                <h3 className="font-semibold text-base mb-4">
                  Urgent Approvals: Doctor Registrations
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                        <th className="pb-3 pr-4">Doctor Name</th>
                        <th className="pb-3 px-4">Specialization</th>
                        <th className="pb-3 px-4">Experience</th>
                        <th className="pb-3 px-4 text-center">Credential Status</th>
                        <th className="pb-3 pl-4 text-right">Verification Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {doctorsList
                        .filter((doc) => doc.status === "Pending Approval")
                        .map((doc) => (
                          <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="size-8 rounded-lg bg-amber-500/10 text-amber-600 grid place-items-center font-bold text-xs">
                                  {doc.name.charAt(4)}
                                </div>
                                <span className="font-bold text-foreground">{doc.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{doc.spec}</td>
                            <td className="py-4 px-4 font-semibold text-foreground/85">
                              {doc.experience}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-amber-500/10 text-amber-600 animate-pulse">
                                {doc.status}
                              </span>
                            </td>
                            <td className="py-4 pl-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleDoctorApprove(doc.id, doc.name)}
                                  className="px-3 h-8 bg-gradient-primary text-white text-xs font-bold rounded-lg shadow-soft hover:opacity-95 cursor-pointer flex items-center gap-1"
                                >
                                  <Check className="size-3.5" /> Approve Credentials
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {doctorsList.filter((doc) => doc.status === "Pending Approval").length ===
                        0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-6 text-center text-xs text-muted-foreground"
                          >
                            ✓ All doctor applications verified and approved! No pending tasks.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "doctors" && (
            <motion.div
              key="doctors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border rounded-3xl p-6 shadow-card"
            >
              <h3 className="font-semibold text-lg mb-6">Manage Clinical Specialist Registries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                      <th className="pb-3 pr-4">Doctor Registry</th>
                      <th className="pb-3 px-4">Specialization</th>
                      <th className="pb-3 px-4">Experience</th>
                      <th className="pb-3 px-4">Average Rating</th>
                      <th className="pb-3 px-4 text-center">Account Status</th>
                      <th className="pb-3 pl-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {doctorsList.map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2.5">
                            <div className="size-9 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold text-sm shrink-0">
                              {doc.name.charAt(4)}
                            </div>
                            <div>
                              <p className="font-bold">{doc.name}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">
                                {doc.id} · Consultations: {doc.consultations}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground font-medium">{doc.spec}</td>
                        <td className="py-4 px-4 font-semibold text-foreground/80">
                          {doc.experience}
                        </td>
                        <td className="py-4 px-4 text-amber-500 font-bold">★ {doc.rating}</td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              doc.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-600"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-4 pl-4 text-right">
                          {doc.status !== "Active" ? (
                            <button
                              onClick={() => handleDoctorApprove(doc.id, doc.name)}
                              className="px-2.5 h-8 bg-gradient-primary text-white text-xs font-bold rounded-lg shadow-soft hover:opacity-95 cursor-pointer"
                            >
                              Verify & Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setDoctorsList(
                                  doctorsList.map((d) =>
                                    d.id === doc.id ? { ...d, status: "Deactivated" } : d,
                                  ),
                                );
                                toast.error(`Deactivated Account: ${doc.name}`);
                              }}
                              className="px-2.5 h-8 border border-slate-200 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-xs font-semibold cursor-pointer"
                            >
                              Deactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border rounded-3xl p-6 shadow-card"
            >
              <h3 className="font-semibold text-lg mb-6">User Accounts Directory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b text-muted-foreground font-bold text-xs uppercase tracking-wider">
                      <th className="pb-3 pr-4">User Registry</th>
                      <th className="pb-3 px-4">Role</th>
                      <th className="pb-3 px-4">Email</th>
                      <th className="pb-3 px-4">Joined Date</th>
                      <th className="pb-3 px-4 text-center">Status</th>
                      <th className="pb-3 pl-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {usersList.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2.5">
                            <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-foreground grid place-items-center font-bold text-sm shrink-0">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold">{user.name}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">
                                {user.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground font-medium">{user.role}</td>
                        <td className="py-4 px-4 text-muted-foreground text-xs">{user.email}</td>
                        <td className="py-4 px-4 font-semibold text-foreground/80">
                          {user.joined}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              user.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <button
                            onClick={() => handleUserStatusToggle(user.id, user.status)}
                            className={`px-2.5 h-8 border rounded-lg text-xs font-semibold cursor-pointer ${
                              user.status === "Active"
                                ? "hover:bg-red-500/10 hover:text-red-500"
                                : "hover:bg-emerald-500/10 hover:text-emerald-500"
                            }`}
                          >
                            {user.status === "Active" ? "Suspend Account" : "Activate Account"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "payments" && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border rounded-3xl p-6 shadow-card"
            >
              <h3 className="font-semibold text-lg mb-4">Financial Payouts & Subscriptions</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Digital record of consultations, insurance commissions and doctor balance payouts.
              </p>
              <div className="space-y-4">
                {[
                  {
                    label: "Commission Payout Vashi Clinic",
                    val: "₹12,450",
                    date: "Today",
                    status: "Settled",
                  },
                  {
                    label: "Doctor Maya Patel - Consultation Fees Payout",
                    val: "₹18,500",
                    date: "Yesterday",
                    status: "Settled",
                  },
                  {
                    label: "Doctor Rajesh Sharma - Payout Transferred",
                    val: "₹24,000",
                    date: "May 25",
                    status: "Settled",
                  },
                ].map((pay, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-3 border rounded-xl bg-slate-50 dark:bg-card"
                  >
                    <div>
                      <p className="text-sm font-semibold">{pay.label}</p>
                      <p className="text-xs text-muted-foreground">{pay.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{pay.val}</p>
                      <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold uppercase">
                        {pay.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
