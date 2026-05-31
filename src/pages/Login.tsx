import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Activity,
  Chrome,
  Github,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent, role?: "patient" | "doctor" | "admin") => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === "doctor") {
        toast.success("Logged in as Specialist (Dr. Maya Patel)");
        localStorage.setItem("userRole", "doctor");
        localStorage.setItem("userName", "Dr. Maya Patel");
        navigate("/doctor/dashboard");
      } else if (role === "admin") {
        toast.success("Welcome, Administrator");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Admin Portal");
        navigate("/admin/dashboard");
      } else {
        toast.success("Successfully logged in!");
        localStorage.setItem("userRole", "patient");
        localStorage.setItem("userName", email.split("@")[0] || "Jane Doe");
        navigate("/patient/dashboard");
      }
    }, 800);
  };

  const quickLogin = (role: "patient" | "doctor" | "admin") => {
    setEmail(
      role === "doctor"
        ? "doctor@medora.com"
        : role === "admin"
          ? "admin@medora.com"
          : "patient@example.com",
    );
    setPassword("password123");
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleLogin(fakeEvent, role);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-hero -z-10" />
      <div className="absolute top-20 -left-40 size-[520px] rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 -right-40 size-[520px] rounded-full bg-teal/15 blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-glow border bg-card/85 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo / Header */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display font-bold text-2xl mx-auto justify-center"
            >
              <span className="grid place-items-center size-10 rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <Activity className="size-5" />
              </span>
              <span>
                Medora<span className="text-primary">.</span>
              </span>
            </Link>
            <h2 className="text-xl sm:text-2xl font-bold mt-4 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Secure access to your medical records & consultations.
            </p>
          </div>

          {/* Quick Demo Login Badges */}
          <div className="mb-6 bg-muted/50 rounded-2xl p-4 border">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-2">
              <Sparkles className="size-3 text-primary animate-pulse" />
              <span>One-Click Demo Roles</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin("patient")}
                className="py-2 px-1 text-xs font-bold rounded-xl border bg-card hover:bg-primary/5 hover:border-primary text-foreground transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <UserCheck className="size-3.5 text-blue-500" />
                Patient
              </button>
              <button
                onClick={() => quickLogin("doctor")}
                className="py-2 px-1 text-xs font-bold rounded-xl border bg-card hover:bg-primary/5 hover:border-primary text-foreground transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <Shield className="size-3.5 text-emerald-500" />
                Doctor
              </button>
              <button
                onClick={() => quickLogin("admin")}
                className="py-2 px-1 text-xs font-bold rounded-xl border bg-card hover:bg-primary/5 hover:border-primary text-foreground transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <Lock className="size-3.5 text-amber-500" />
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground pointer-events-none">
                  <Mail className="size-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 rounded-xl border bg-background/50 outline-none focus:ring-2 ring-primary/30 text-sm transition-all focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground pointer-events-none">
                  <Lock className="size-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 rounded-xl border bg-background/50 outline-none focus:ring-2 ring-primary/30 text-sm transition-all focus:border-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-xl bg-gradient-primary text-primary-foreground shadow-glow font-semibold transition-all hover:opacity-95 hover:scale-[1.01] cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Sign In <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Social Logins */}
          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
            <span className="bg-card px-3 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toast.info("Google Authentication is simulated.")}
              className="h-11 rounded-xl border bg-background/50 flex items-center justify-center gap-2 hover:bg-muted text-sm font-medium transition cursor-pointer"
            >
              <Chrome className="size-4 text-rose-500" /> Google
            </button>
            <button
              onClick={() => toast.info("GitHub Authentication is simulated.")}
              className="h-11 rounded-xl border bg-background/50 flex items-center justify-center gap-2 hover:bg-muted text-sm font-medium transition cursor-pointer"
            >
              <Github className="size-4 text-foreground" /> GitHub
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-muted-foreground">
            New to Medora?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
