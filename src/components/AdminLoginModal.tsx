import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  AlertTriangle, 
  X, 
  KeyRound, 
  CheckCircle2,
  Eye,
  EyeOff,
  LogIn,
  Info,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../types';
import { signInWithGoogleReal, loginWithEmailPass, logoutFirebase } from '../firebase';

export const AUTHORIZED_ADMIN_EMAIL = 'mdfazlulkabirmoin@gmail.com';
export const MASTER_ADMIN_PASSWORD = 'I4I59265@3.14m';

// Session verification helper
export const createAdminAuthToken = (email: string): string => {
  return `ittefaq_token_${btoa(email.toLowerCase())}_${Date.now()}`;
};

export const isValidAdminSession = (): boolean => {
  try {
    const user = localStorage.getItem('ittefaq_admin_user');
    const token = localStorage.getItem('ittefaq_admin_auth_token');
    if (!user || !token) return false;
    if (user.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) return false;
    return token.startsWith('ittefaq_token_');
  } catch {
    return false;
  }
};

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  language: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language,
}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Username & Password handler
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);

    const input = usernameOrEmail.trim().toLowerCase();
    const authorized = AUTHORIZED_ADMIN_EMAIL.toLowerCase();

    // Valid usernames/emails for the super admin
    const isValidIdentity = 
      input === authorized || 
      input === 'admin' || 
      input === 'mdfazlulkabirmoin' ||
      input === 'superadmin';

    if (!isValidIdentity) {
      setIsLoading(false);
      setErrorMessage(
        language === 'bn'
          ? `অননুমোদিত পরিচিতি! শুধুমাত্র সুপার অ্যাডমিন (${AUTHORIZED_ADMIN_EMAIL}) এই প্যানেলে প্রবেশ করতে পারবেন।`
          : `Unauthorized identity! Only Super Admin (${AUTHORIZED_ADMIN_EMAIL}) has access.`
      );
      return;
    }

    const enteredPass = password.trim();

    // Check Firebase Email/Password directly if password provided
    if (input === authorized && enteredPass.length >= 6) {
      try {
        const fbUser = await loginWithEmailPass(input, enteredPass);
        if (fbUser.email && fbUser.email.toLowerCase() === authorized) {
          setIsLoading(false);
          const token = createAdminAuthToken(authorized);
          localStorage.setItem('ittefaq_admin_auth_token', token);
          onLoginSuccess(AUTHORIZED_ADMIN_EMAIL);
          onClose();
          return;
        }
      } catch {
        // Fallback to strict master password check
      }
    }

    // Check strict master password
    const savedPassword = localStorage.getItem('ittefaq_admin_password') || MASTER_ADMIN_PASSWORD;

    const isPasswordValid = enteredPass === savedPassword || enteredPass === MASTER_ADMIN_PASSWORD;

    setIsLoading(false);

    if (!isPasswordValid) {
      setErrorMessage(
        language === 'bn'
          ? 'ভুল পাসওয়ার্ড! অ্যাডমিন প্যানেলে প্রবেশের সঠিক পাসওয়ার্ড প্রদান করুন।'
          : 'Invalid password! Please enter the authorized master admin password.'
      );
      return;
    }

    // Success! Save session token
    const token = createAdminAuthToken(AUTHORIZED_ADMIN_EMAIL);
    try {
      localStorage.setItem('ittefaq_admin_user', AUTHORIZED_ADMIN_EMAIL);
      localStorage.setItem('ittefaq_admin_auth_token', token);
    } catch {}

    onLoginSuccess(AUTHORIZED_ADMIN_EMAIL);
    onClose();
  };

  // Google Login popup strictly verifying authorized super admin email
  const handleInitiateGoogleSignIn = async () => {
    setErrorMessage(null);
    setInfoMessage(null);
    setIsLoading(true);

    try {
      const user = await signInWithGoogleReal();
      setIsLoading(false);

      if (user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        const token = createAdminAuthToken(AUTHORIZED_ADMIN_EMAIL);
        try {
          localStorage.setItem('ittefaq_admin_user', AUTHORIZED_ADMIN_EMAIL);
          localStorage.setItem('ittefaq_admin_auth_token', token);
        } catch {}
        onLoginSuccess(AUTHORIZED_ADMIN_EMAIL);
        onClose();
      } else {
        await logoutFirebase();
        setErrorMessage(
          language === 'bn'
            ? `অননুমোদিত গুগল একাউন্ট (${user.email || 'Unknown'})! শুধুমাত্র ${AUTHORIZED_ADMIN_EMAIL} সুপার অ্যাডমিন হিসেবে প্রবেশ করতে পারবেন। অন্য কোনো একাউন্ট অনুমোদিত নয়।`
            : `Unauthorized Google account (${user.email || 'Unknown'})! Only ${AUTHORIZED_ADMIN_EMAIL} is authorized.`
        );
      }
    } catch (err: any) {
      setIsLoading(false);
      console.warn('Google Popup error:', err);
      
      if (err?.code === 'auth/unauthorized-domain') {
        setInfoMessage(
          language === 'bn'
            ? 'Firebase Domain নোটিশ: আপনার Vercel ডোমেনটি Firebase Authorized Domains তালিকায় যুক্ত করতে হবে। তবে আপনি নিচের ফর্মটিতে সরাসরি পাসওয়ার্ড দিয়ে এই মুহূর্তে প্রবেশ করতে পারবেন।'
            : 'Firebase Domain Notice: Add domain to Firebase Authorized Domains. You can log in using your Master Password below.'
        );
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setInfoMessage(
          language === 'bn'
            ? 'গুগল সাইন-ইন পপআপ বন্ধ করা হয়েছে। আপনি পাসওয়ার্ড দিয়েও সরাসরি লগইন করতে পারেন।'
            : 'Google popup was closed. You can also sign in with your password below.'
        );
      } else {
        setInfoMessage(
          language === 'bn'
            ? 'গুগল লগইনে সংযোগ পাওয়া যায়নি। অনুগ্রহ করে নিচে আপনার গোপন পাসওয়ার্ড দিয়ে লগইন করুন।'
            : 'Unable to connect to Google Auth. Please enter your admin password below.'
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-md rounded-lg shadow-2xl border border-stone-300 overflow-hidden relative my-auto">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-5 flex items-center justify-between border-b-2 border-[#C1121F]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#C1121F] rounded text-white shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                {language === 'bn' ? 'দৈনিক ইত্তেফাক বার্তাকক্ষ প্রশাসন' : 'Daily Ittefaq Newsroom CMS'}
              </h3>
              <p className="text-[11px] text-amber-300 font-mono">
                অনুমোদিত সুপার অ্যাডমিন: <strong className="text-white">{AUTHORIZED_ADMIN_EMAIL}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Security Alert Badge */}
          <div className="p-3 bg-stone-100 rounded border border-stone-200 text-xs text-stone-700 font-serif flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#C1121F] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-900">
                {language === 'bn' ? 'সুরক্ষিত প্রশাসনিক প্রবেশাধিকার' : 'Protected Administrative Access'}
              </p>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                {language === 'bn'
                  ? `শুধুমাত্র ${AUTHORIZED_ADMIN_EMAIL} আইডি অথবা অনুমোদিত গোপন পাসওয়ার্ড দিয়ে প্রবেশ করা যাবে। কোনো সাধারণ ব্যবহারকারী প্রবেশ করতে পারবে না।`
                  : `Restricted exclusively to ${AUTHORIZED_ADMIN_EMAIL} or with authorized password.`}
              </p>
            </div>
          </div>

          {/* Info Banner if any */}
          {infoMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span className="font-serif leading-relaxed">{infoMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-serif leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* METHOD 1: GOOGLE AUTHENTICATION */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider font-serif">
              {language === 'bn' ? '১. গুগল একাউন্ট দিয়ে সাইন ইন (শুধুমাত্র সুপার অ্যাডমিন)' : '1. Sign in with Google (Super Admin Only)'}
            </label>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleInitiateGoogleSignIn}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 rounded-lg border-2 border-stone-300 hover:border-stone-400 font-medium text-xs sm:text-sm transition-all shadow-2xs flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-60"
            >
              {/* Google Multicolored SVG Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="font-sans font-semibold">
                {isLoading ? 'যাচাই করা হচ্ছে...' : (language === 'bn' ? 'Google একাউন্ট দিয়ে যাচাই করুন' : 'Sign in with Google')}
              </span>
            </button>
            <p className="text-[10px] text-stone-500 font-serif text-center pt-0.5">
              {language === 'bn'
                ? `গুগল একাউন্টে ${AUTHORIZED_ADMIN_EMAIL} ব্যতীত অন্য কোনো আইডি গৃহীত হবে না`
                : `Only ${AUTHORIZED_ADMIN_EMAIL} is allowed to enter via Google`}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 text-stone-400 text-xs font-serif pt-1">
            <div className="flex-1 h-px bg-stone-300" />
            <span>{language === 'bn' ? 'অথবা পাসওয়ার্ড দিয়ে প্রবেশ' : 'or enter with password'}</span>
            <div className="flex-1 h-px bg-stone-300" />
          </div>

          {/* METHOD 2: USERNAME & MASTER PASSWORD FORM */}
          <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
            {/* Username or Email Input */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-serif">
                {language === 'bn' ? 'অ্যাডমিন ইউজারনেম / ইমেইল' : 'Admin Username / Email'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="mdfazlulkabirmoin@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded border border-stone-300 bg-white focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F] font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 font-serif">
                {language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড (Admin Password)' : 'Admin Password'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'bn' ? 'গোপন পাসওয়ার্ড লিখুন...' : 'Enter master password...'}
                  className="w-full pl-9 pr-10 py-2 text-xs sm:text-sm rounded border border-stone-300 bg-white focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F] font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-stone-500 font-serif pt-0.5">
                {language === 'bn'
                  ? 'সঠিক পাসওয়ার্ড ছাড়া অন্য কোনো ব্যবহারকারী এই সিস্টেমে ঢুকতে পারবে না।'
                  : 'Access is strictly prohibited without the correct master password.'}
              </p>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoading ? 'যাচাই করা হচ্ছে...' : (language === 'bn' ? 'পাসওয়ার্ড দিয়ে প্রবেশ করুন' : 'Verify & Open CMS')}</span>
              </button>
            </div>
          </form>

        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-500 font-serif">
          © দৈনিক ইত্তেফাক ডিজিটাল নিউজরুম কন্টেন্ট ম্যানেজমেন্ট সিস্টেম • সুরক্ষিত গেটওয়ে
        </div>

      </div>
    </div>
  );
};
