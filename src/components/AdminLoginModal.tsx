import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertTriangle, X, KeyRound, CheckCircle } from 'lucide-react';
import { Language } from '../types';

export const AUTHORIZED_ADMIN_EMAIL = 'mdfazlulkabirmoin@gmail.com';
export const DEFAULT_ADMIN_PIN = '1953'; // Founding year of Daily Ittefaq

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
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const normalizedEmail = email.trim().toLowerCase();

    // STRICT CHECK: Only mdfazlulkabirmoin@gmail.com can log in!
    if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setErrorMessage(
        language === 'bn'
          ? `অননুমোদিত ইমেইল! শুধুমাত্র প্রধান সম্পাদক ও অ্যাডমিন (${AUTHORIZED_ADMIN_EMAIL}) এই প্যানেলে প্রবেশ করতে পারেন।`
          : `Unauthorized email! Only administrator (${AUTHORIZED_ADMIN_EMAIL}) can access this panel.`
      );
      return;
    }

    // Check PIN from localStorage or fallback
    const savedPin = localStorage.getItem('ittefaq_admin_pin') || DEFAULT_ADMIN_PIN;
    if (pin.trim() !== savedPin) {
      setErrorMessage(
        language === 'bn'
          ? 'ভুল অ্যাডমিন পিন! ডিফল্ট পিন "1953" ব্যবহার করুন অথবা সেটিংস থেকে পরিবর্তন করুন।'
          : 'Invalid admin PIN! Use default PIN "1953" or change in settings.'
      );
      return;
    }

    // Success!
    onLoginSuccess(AUTHORIZED_ADMIN_EMAIL);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF8F5] w-full max-w-md rounded-lg shadow-2xl border border-stone-300 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-5 flex items-center justify-between border-b-2 border-[#C1121F]">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#C1121F] rounded text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-base text-white">
                {language === 'bn' ? 'দৈনিক ইত্তেফাক কেন্দ্রীয় প্রশাসন' : 'Daily Ittefaq Admin Portal'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {language === 'bn' ? 'শুধুমাত্র অনুমোদিত প্রধান সম্পাদকের জন্য' : 'Restricted to Chief Editor & Admin'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Authorization Notice */}
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 font-serif space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <Lock className="w-3.5 h-3.5 text-[#C1121F]" />
              <span>{language === 'bn' ? 'সংরক্ষিত অ্যাক্সেস নিয়ন্ত্রণ' : 'Exclusive Access Control'}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-950">
              {language === 'bn'
                ? `এই প্যানেলটি কেবল মাত্র ${AUTHORIZED_ADMIN_EMAIL} এর জন্য সুরক্ষিত। অন্য কোনো ব্যবহারকারী এই প্যানেলে প্রবেশ করতে পারবেন না।`
                : `This control center is strictly restricted to ${AUTHORIZED_ADMIN_EMAIL}. Unauthorized attempts are blocked.`}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-serif leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-700 font-serif">
              {language === 'bn' ? 'অনুমোদিত অ্যাডমিন ইমেইল' : 'Authorized Admin Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mdfazlulkabirmoin@gmail.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded border border-stone-300 bg-white focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F]"
              />
            </div>
            <span className="text-[10px] text-stone-500 font-mono">
              অনুমোদিত: {AUTHORIZED_ADMIN_EMAIL}
            </span>
          </div>

          {/* PIN Input */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-700 font-serif">
              {language === 'bn' ? 'অ্যাডমিন গোপন পিন (Security PIN)' : 'Admin Security PIN'}
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded border border-stone-300 bg-white focus:outline-none focus:border-[#C1121F] focus:ring-1 focus:ring-[#C1121F] font-mono tracking-widest"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-serif">
              <span>{language === 'bn' ? 'ডিফল্ট পিন: 1953' : 'Default PIN: 1953'}</span>
              <button
                type="button"
                onClick={() => setPin(DEFAULT_ADMIN_PIN)}
                className="text-[#C1121F] hover:underline cursor-pointer"
              >
                {language === 'bn' ? 'ডিফল্ট পিন বসান' : 'Fill default'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'bn' ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Authenticate & Enter Admin'}</span>
            </button>
          </div>

        </form>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[10px] text-stone-500 font-serif">
          © দৈনিক ইত্তেফাক ডিজিটাল নিউজরুম কন্টেন্ট ম্যানেজমেন্ট সিস্টেম (CMS)
        </div>

      </div>
    </div>
  );
};
