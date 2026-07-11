import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { api, setToken, formatApiError } from "@/lib/api";
import AtmanLogo from "@/components/AtmanLogo";

export default function AdminLogin() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) return toast.error("Please enter username & password.");
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", { username, password });
      setToken(data.token);
      toast.success("Welcome back.");
      nav("/admin/dashboard", { replace: true });
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F8F6F2] flex flex-col">
      <div className="p-6 lg:p-10 flex items-center justify-between">
        <AtmanLogo size={40} />
        <button
          onClick={() => nav("/")}
          data-testid="admin-back-to-site"
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#F8F6F2]/60 hover:text-[#C9A227] transition-colors"
        >
          <ArrowLeft size={14} /> Back to site
        </button>
      </div>

      <div className="flex-1 grid place-items-center px-6">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-[#1a1a1a] border border-[#C9A227]/20 p-8 lg:p-10"
          data-testid="admin-login-form"
        >
          <div className="flex items-center gap-3 text-[#C9A227]">
            <Lock size={18} />
            <span className="ornament !gap-0 !before:hidden">Admin Access</span>
          </div>
          <h1 className="mt-6 font-cinzel text-3xl lg:text-4xl leading-tight">
            Sign in to your <span className="italic font-cormorant gold-text">ATMAN</span> studio.
          </h1>
          <p className="mt-3 text-sm text-[#F8F6F2]/60">
            Update contact details, socials & performance videos anytime.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your admin username"
                autoComplete="username"
                data-testid="admin-username"
                className="w-full bg-transparent border-b border-[#C9A227]/25 focus:border-[#C9A227] outline-none py-3 text-[#F8F6F2] placeholder:text-[#F8F6F2]/40 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A227]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                data-testid="admin-password"
                className="w-full bg-transparent border-b border-[#C9A227]/25 focus:border-[#C9A227] outline-none py-3 text-[#F8F6F2] placeholder:text-[#F8F6F2]/40 text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="gold-btn mt-10 w-full inline-flex items-center justify-center gap-3 bg-[#C9A227] disabled:opacity-70 text-[#121212] font-cinzel tracking-[0.28em] uppercase text-xs px-8 py-4 rounded-none"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in…
              </>
            ) : (
              "Enter Studio"
            )}
          </button>
        </motion.form>
      </div>

      <div className="p-6 text-center text-[0.65rem] tracking-[0.3em] uppercase text-[#F8F6F2]/40">
        Protected area · Only authorised access
      </div>
    </div>
  );
}
