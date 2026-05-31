import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import PatientDashboard from "@/pages/PatientDashboard";
import DoctorDashboard from "@/pages/DoctorDashboard";
import ConsultationRoom from "@/pages/ConsultationRoom";
import AdminDashboard from "@/pages/AdminDashboard";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Patient Workspace */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          {/* Doctor Workspace */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/consultation/:id" element={<ConsultationRoom />} />

          {/* Admin Workspace */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="*"
            element={
              <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
                <div className="max-w-md text-center">
                  <h1 className="text-7xl font-bold text-gradient">404</h1>
                  <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The page you're looking for doesn't exist or has been moved.
                  </p>
                  <a
                    href="/"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-medium cursor-pointer"
                  >
                    Go home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
