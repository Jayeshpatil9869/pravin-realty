import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PravinLogo } from '../../components/PravinLogo';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound,
  Compass
} from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both your registered email address and password.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Allow administrator login
      localStorage.setItem('pr_admin_auth', 'true');
      navigate('/admin/dashboard');
      setLoading(false);
    }, 500);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@pravinrealty.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#121316] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      
      {/* Ambient Luxury Background Gradients */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FDE8D7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[550px] h-[550px] bg-[#F7D0B2]/30 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Dot Matrix Background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#121316 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }}
      />

      {/* Main Container Card (Dual Column on lg) */}
      <div className="w-full max-w-5xl bg-white border border-[#EAEAEB] rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Brand Showcase & Architectural Aesthetics */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#121316] via-[#1A1C22] to-[#121316] text-white p-10 xl:p-12 flex-col justify-between relative overflow-hidden">
          
          {/* Architectural Overlay Image with Gradient Mask */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-luminosity"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/80 to-transparent" />

          {/* Top Brand Emblem */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <PravinLogo variant="light" textSize="text-xl" />
            </Link>
          </div>

          {/* Center Brand Statement */}
          <div className="relative z-10 space-y-6 my-auto py-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDE8D7]/10 text-[#FDE8D7] border border-[#FDE8D7]/20 text-xs font-medium tracking-wide">
              <Compass className="w-3.5 h-3.5 text-[#C86D2F]" />
              <span>West Pune Luxury Advisory</span>
            </div>

            <h2 className="text-3xl xl:text-4xl font-light tracking-tight text-white leading-[1.15]">
              Curating Prime Real Estate with Integrity.
            </h2>

            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Access the centralized management node for live inventory, client advisory leads, market intelligence, and portfolio distribution.
            </p>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800/80">
              <div>
                <span className="text-2xl font-light text-[#FDE8D7]">₹120 Cr+</span>
                <p className="text-xs text-neutral-400 mt-0.5">Active Portfolio</p>
              </div>
              <div>
                <span className="text-2xl font-light text-[#FDE8D7]">500+</span>
                <p className="text-xs text-neutral-400 mt-0.5">Satisfied HNI Clients</p>
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="relative z-10 flex items-center gap-2.5 text-xs text-neutral-400 pt-4 border-t border-neutral-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted Node Session • Balewadi HQ</span>
          </div>

        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 xl:p-14 flex flex-col justify-between bg-white">
          
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
            <div className="lg:hidden">
              <PravinLogo variant="dark" textSize="text-lg" />
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-500 hover:text-[#121316] transition-colors ml-auto group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="space-y-2 mb-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDE8D7]/80 text-[#121316] border border-[#F7D0B2] text-xs font-semibold">
              <KeyRound className="w-3.5 h-3.5 text-[#C86D2F]" />
              <span>Administrator Authentication</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#121316]">
              Sign In to Management Portal
            </h1>
            
            <p className="text-sm text-neutral-500">
              Enter your authorized credentials to access the portfolio dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-2xl font-medium flex items-center gap-3 animate-fade-in text-left">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 text-left">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700">
                Authorized Email
              </label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-neutral-400 group-focus-within:text-[#C86D2F] absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@pravinrealty.com"
                  className="w-full bg-[#F5F5F7] border border-[#EAEAEB] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#121316] placeholder:text-neutral-400 focus:bg-white focus:border-[#C86D2F] focus:ring-4 focus:ring-[#FDE8D7]/40 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-neutral-700">
                  Account Password
                </label>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 text-neutral-400 group-focus-within:text-[#C86D2F] absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#F5F5F7] border border-[#EAEAEB] rounded-2xl pl-11 pr-12 py-3.5 text-sm text-[#121316] placeholder:text-neutral-400 focus:bg-white focus:border-[#C86D2F] focus:ring-4 focus:ring-[#FDE8D7]/40 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-all cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Demo Helper */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-neutral-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md text-[#121316] border-neutral-300 focus:ring-[#C86D2F]"
                />
                <span>Stay signed in on this device</span>
              </label>

              {/* Demo Helper Button */}
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-xs font-medium text-[#C86D2F] hover:text-[#9A4E1B] inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Demo Credentials</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#121316] hover:bg-neutral-800 text-white font-semibold text-sm py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Footer Security Badges */}
          <div className="pt-8 mt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-neutral-400" />
              <span>Pravin Realty Advisory Node</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SSL 256-bit Encrypted</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
