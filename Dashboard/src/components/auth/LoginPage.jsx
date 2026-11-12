import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Layers,
  LayoutGrid,
  Loader2,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import { loginWithMfa } from "@/lib/authMfa";
import { safeReturnTo } from "@/lib/authReturnTo";

export function LoginPage() {
  const returnTo = safeReturnTo();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@griffinconstruction.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const result = await loginWithMfa(email, password);
      if (result?.user) {
        // Successful login
        window.location.href = returnTo || "/dashboard";
      } else {
        window.location.href = returnTo || "/dashboard";
      }
    } catch (err) {
      setError(err?.message || "Invalid credentials. Please verify your email and password.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#071322] font-sans overflow-x-hidden selection:bg-[#E5A83B] selection:text-[#0B1D33]">
      {/* =========================================================================
          LEFT HALF: Hero Showcase (Griffin Executive at Dusk)
          ========================================================================= */}
      <div className="relative w-full lg:w-[52%] xl:w-[54%] min-h-[580px] lg:min-h-screen bg-[#071322] flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background Artwork */}
        <img
          src="/Griffin-Executive-at-Dusk.png"
          alt="Griffin Executive at Dusk"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90 scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Navy Gradient Overlays for High-Contrast Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061220]/95 via-[#071526]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061220] via-transparent to-[#061220]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Geometric Diagonal Gold Accent Stripes (Top Right) */}
        <div className="hidden sm:block absolute top-0 right-0 w-36 h-64 pointer-events-none overflow-hidden z-10">
          <div className="absolute top-0 right-[-30px] w-5 h-80 bg-gradient-to-b from-[#F2BC56] via-[#D99A26] to-transparent rotate-[32deg] shadow-lg shadow-amber-900/30" />
          <div className="absolute top-0 right-[-45px] w-2 h-72 bg-gradient-to-b from-[#F2BC56]/60 via-[#D99A26]/40 to-transparent rotate-[32deg]" />
        </div>

        {/* Geometric Diagonal Gold Accent Stripes (Bottom Right) */}
        <div className="hidden sm:block absolute bottom-0 right-0 w-36 h-64 pointer-events-none overflow-hidden z-10">
          <div className="absolute bottom-[-40px] right-[-20px] w-6 h-80 bg-gradient-to-t from-[#F2BC56] via-[#D99A26] to-transparent rotate-[32deg] shadow-lg shadow-amber-900/30" />
          <div className="absolute bottom-[-55px] right-[-35px] w-2.5 h-72 bg-gradient-to-t from-[#F2BC56]/70 via-[#D99A26]/40 to-transparent rotate-[32deg]" />
        </div>

        {/* --- Top Brand Logo Header --- */}
        <div className="relative z-20 flex items-center gap-3.5">
          {/* Golden Griffin Mythical Beast Emblem Icon */}
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 p-2 flex items-center justify-center backdrop-blur-md shadow-md shadow-amber-950/30">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[#E5A83B] filter drop-shadow"
            >
              <path
                d="M12 44C16 38 24 38 28 34C32 30 31 22 28 17C26 13 21 11 16 13C12 15 10 19 12 24C13 27 16 28 19 28C22 28 24 26 23 23M28 34C34 34 38 38 42 42C46 46 52 46 56 42M28 17C35 15 44 19 46 26C48 33 46 41 42 46M23 23C27 20 32 20 36 23C40 26 42 30 42 35"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48 18L56 14L52 22"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-serif font-bold text-xl tracking-[0.16em] leading-none drop-shadow-sm">
              GRIFFIN
            </span>
            <span className="text-[#E5A83B] text-[10px] font-bold tracking-[0.28em] uppercase mt-1 leading-none drop-shadow">
              CONSTRUCTION
            </span>
          </div>
        </div>

        {/* --- Hero Main Message & Value Pillars --- */}
        <div className="relative z-20 my-auto py-10 lg:py-16 max-w-lg">
          {/* Accent Gold Horizontal Dash */}
          <div className="w-14 h-1.5 bg-gradient-to-r from-[#F2BC56] to-[#D99A26] rounded-full mb-6 shadow-sm shadow-amber-500/30" />

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-serif font-bold text-white leading-[1.12] tracking-tight drop-shadow-md">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3C469] via-[#E5A83B] to-[#D49020] italic font-semibold">
              Griffin
            </span> <br />
            Construction
          </h1>

          {/* Paragraph */}
          <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-md font-normal drop-shadow">
            Manage your website, projects, services and digital presence from one powerful dashboard.
          </p>

          {/* 3 Value Badges */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-white/10 max-w-md">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-[#E5A83B]/30 flex items-center justify-center text-[#E5A83B] shadow-inner backdrop-blur-sm group-hover:border-[#E5A83B] group-hover:bg-[#E5A83B]/10 transition-all duration-300">
                <Layers className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="text-xs font-medium text-slate-200 mt-2.5 leading-snug">
                Projects <br />
                <span className="text-slate-400 font-normal">Management</span>
              </span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-[#E5A83B]/30 flex items-center justify-center text-[#E5A83B] shadow-inner backdrop-blur-sm group-hover:border-[#E5A83B] group-hover:bg-[#E5A83B]/10 transition-all duration-300">
                <LayoutGrid className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="text-xs font-medium text-slate-200 mt-2.5 leading-snug">
                Services <br />
                <span className="text-slate-400 font-normal">Management</span>
              </span>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-[#E5A83B]/30 flex items-center justify-center text-[#E5A83B] shadow-inner backdrop-blur-sm group-hover:border-[#E5A83B] group-hover:bg-[#E5A83B]/10 transition-all duration-300">
                <Users className="w-6 h-6 stroke-[1.75]" />
              </div>
              <span className="text-xs font-medium text-slate-200 mt-2.5 leading-snug">
                Team <br />
                <span className="text-slate-400 font-normal">Management</span>
              </span>
            </div>
          </div>
        </div>

        {/* --- Bottom Slogan With Vertical Gold Accent --- */}
        <div className="relative z-20 flex items-center gap-3 pt-4">
          <div className="w-1 h-7 bg-gradient-to-b from-[#F2BC56] to-[#D99A26] rounded-full shadow-sm shadow-amber-500/40" />
          <p className="text-white font-serif italic text-lg sm:text-xl font-light tracking-wide drop-shadow-sm">
            Building Tomorrow, Together.
          </p>
        </div>
      </div>

      {/* =========================================================================
          RIGHT HALF: Admin Login Form
          ========================================================================= */}
      <div className="relative w-full lg:w-[48%] xl:w-[46%] min-h-screen bg-[#FAF8F5] flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden">
        {/* Subtle Luxury Griffin Silhouette Watermark (Top Right) */}
        <img
          src="/Elegant-Monochrome-Griffin-Profile.png"
          alt=""
          aria-hidden="true"
          className="absolute -top-6 -right-6 w-72 sm:w-88 h-72 sm:h-88 object-contain opacity-[0.16] pointer-events-none select-none mix-blend-multiply"
        />

        {/* Top spacer */}
        <div className="w-full h-2" />

        {/* --- Login Form Box (Centered) --- */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-6 z-10">
          {/* Admin Dashboard Tag */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-7 h-[3.5px] bg-[#D49520] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A6A7E]">
              ADMIN DASHBOARD
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-[44px] font-serif font-bold text-[#0B1D33] tracking-tight leading-tight">
            Welcome Back
          </h2>
          <p className="text-[#5A6B7E] text-sm sm:text-base mt-2 mb-7 font-normal">
            Sign in to your administrator account.
          </p>

          {/* Error Notification */}
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl bg-rose-50 border border-rose-200/80 p-3.5 text-sm text-rose-800 flex items-start gap-3 shadow-xs animate-in fade-in slide-in-from-top-1"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-sm font-bold text-[#0F172A]"
              >
                Email Address
              </label>
              <div className="relative rounded-lg sm:rounded-xl border border-slate-200 bg-white transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-[#D99A26] focus-within:ring-3 focus-within:ring-[#D99A26]/15 hover:border-slate-300">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none stroke-[1.75]"
                  aria-hidden="true"
                />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-lg sm:rounded-xl bg-transparent pl-11 pr-4 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-sm font-bold text-[#0F172A]"
              >
                Password
              </label>
              <div className="relative rounded-lg sm:rounded-xl border border-slate-200 bg-white transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-[#D99A26] focus-within:ring-3 focus-within:ring-[#D99A26]/15 hover:border-slate-300">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none stroke-[1.75]"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-lg sm:rounded-xl bg-transparent pl-11 pr-11 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 stroke-[1.75]" />
                  ) : (
                    <EyeOff className="h-5 w-5 stroke-[1.75]" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    rememberMe
                      ? "bg-[#0B1D33] border-[#0B1D33] text-white"
                      : "border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span
                  onClick={() => setRememberMe(!rememberMe)}
                  className="text-sm font-medium text-[#1E293B]"
                >
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-[#D98A1D] hover:text-[#B87010] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full h-12 rounded-lg sm:rounded-xl bg-[#0B1D33] hover:bg-[#071324] text-white flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] transition-all duration-200 group disabled:opacity-75 disabled:pointer-events-none"
            >
              {busy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E5A83B]" />
                  <span className="font-serif font-bold text-base text-white">Signing In...</span>
                </>
              ) : (
                <>
                  <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                    Sign In
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#E5A83B] stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Security Badge Divider */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-[1px] bg-slate-200 flex-1" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D99A26] stroke-[2]" />
              <span className="text-xs sm:text-sm font-semibold text-[#334155]">
                Secure Admin Access
              </span>
            </div>
            <div className="h-[1px] bg-slate-200 flex-1" />
          </div>
        </div>

        {/* --- Footer Links & Copyright --- */}
        <div className="text-center pt-8 text-xs text-[#334155] space-y-2 z-10">
          <div className="flex items-center justify-center gap-3 font-medium">
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-slate-300">|</span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Terms &amp; Conditions
            </span>
          </div>
          <p className="text-[#475569] text-xs">
            &copy; 2026 Griffin Construction. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
