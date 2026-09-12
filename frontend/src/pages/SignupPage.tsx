import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your official email.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await signup({ fullName, email, password });
      navigate("/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create account. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header: SECURE REGISTRATION with Cyan/Blue horizontal line */}
      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#0066cc] uppercase">
        <span className="flex items-center gap-1">
          <ShieldCheck size={13} className="text-[#0066cc]" />
          Secure Registration
        </span>
        <span className="h-[1.5px] w-24 bg-[#66a3e0]/50 rounded-full" />
      </div>

      <h1 className="text-[23px] sm:text-[25px] font-bold text-slate-800 tracking-tight leading-snug">
        Create Your <span className="text-[#1976D2]">Account</span>
      </h1>
      <p className="mt-1 text-xs text-slate-500 font-normal leading-relaxed">
        Join RakshaPath to access road safety intelligence and decision tools.
      </p>

      {error && (
        <div role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs font-medium text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
        <div>
          <label htmlFor="signup-name" className="mb-1 block text-xs font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <User size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Kavitha Raman"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1 block text-xs font-semibold text-slate-700">
            Official Email
          </label>
          <div className="relative">
            <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. kavitha.raman@tn.gov.in"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1 block text-xs font-semibold text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="signup-confirm-password" className="mb-1 block text-xs font-semibold text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-10 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              aria-pressed={showConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-600 pt-0.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-slate-300 accent-[#1976D2]"
          />
          <span>I agree to the Terms & Conditions</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1976D2] text-xs sm:text-sm font-semibold text-white transition hover:bg-[#1565C0] active:bg-[#0D47A1] disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
        >
          {loading ? "Creating account..." : "Continue"}
          {!loading && <ArrowRight size={15} />}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-500 font-normal">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[#1976D2] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
