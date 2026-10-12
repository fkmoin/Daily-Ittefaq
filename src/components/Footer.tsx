import React from 'react';
import { Newspaper, Mail, Phone, MapPin, Globe, Shield, ArrowUp } from 'lucide-react';
import { Language, CategoryKey } from '../types';

interface FooterProps {
  language: Language;
  onSelectCategory: (cat: CategoryKey) => void;
  onOpenEPaper: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onSelectCategory,
  onOpenEPaper,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-12 pb-8 border-t-4 border-[#C1121F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Grid: Masthead, Sections, Editorial Office */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand & History (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-3xl font-black font-serif text-white tracking-tight">
              {language === 'bn' ? 'দৈনিক ইত্তেফাক' : 'The Daily Ittefaq'}
            </h2>
            <p className="text-xs text-amber-400 font-serif tracking-widest uppercase">
              {language === 'bn' ? '— সত্যের সন্ধানে নির্ভীক —' : '— Fearless in Search of Truth —'}
            </p>
            <p className="text-xs text-stone-400 font-serif leading-relaxed">
              {language === 'bn'
                ? '১৯৫৩ সালের ২৪ ডিসেম্বর তোফাজ্জল হোসেন মানিক মিয়ার হাত ধরে শুরু হওয়া দৈনিক ইত্তেফাক বাংলাদেশের স্বাধীনতা সংগ্রাম, স্বাধিকার আন্দোলন ও বস্তুনিষ্ঠ গণমাধ্যমের ঐতিহাসিক বাতিঘর।'
                : 'Founded on December 24, 1953 by Tofazzal Hossain Manik Miah, The Daily Ittefaq stands as an enduring beacon of independent journalism, democratic values, and historic nation-building in Bangladesh.'}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenEPaper}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <Newspaper className="w-4 h-4" />
                <span>{language === 'bn' ? 'ডিজিটাল ই-পেপার পড়ুন' : 'Read Digital E-Paper'}</span>
              </button>
            </div>
          </div>

          {/* Quick Categories Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              {language === 'bn' ? 'প্রধান বিভাগসমূহ' : 'Newspaper Sections'}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-serif">
              <button onClick={() => onSelectCategory('national')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'জাতীয় সংবাদ' : 'National News'}
              </button>
              <button onClick={() => onSelectCategory('politics')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'রাজনীতি' : 'Politics'}
              </button>
              <button onClick={() => onSelectCategory('country')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'সারাদেশ (৬৪ জেলা)' : 'Countrywide (64 Districts)'}
              </button>
              <button onClick={() => onSelectCategory('economy')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'অর্থনীতি ও বাণিজ্য' : 'Economy & Business'}
              </button>
              <button onClick={() => onSelectCategory('international')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'আন্তর্জাতিক' : 'World News'}
              </button>
              <button onClick={() => onSelectCategory('sports')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'খেলাধুলা ও ক্রিকেট' : 'Sports & Cricket'}
              </button>
              <button onClick={() => onSelectCategory('opinion')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'মতামত ও সম্পাদকীয়' : 'Editorial & Opinion'}
              </button>
              <button onClick={() => onSelectCategory('tech')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'বিজ্ঞান ও প্রযুক্তি' : 'Science & Tech'}
              </button>
              <button onClick={() => onSelectCategory('entertainment')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'বিনোদন' : 'Entertainment'}
              </button>
              <button onClick={() => onSelectCategory('lifestyle')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer">
                {language === 'bn' ? 'জীবনযাপন ও স্বাস্থ্য' : 'Lifestyle & Health'}
              </button>
            </div>
          </div>

          {/* Editorial Office & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              {language === 'bn' ? 'বার্তাকক্ষ ও প্রকাশনা কার্যালয়' : 'Editorial & Corporate Headquarters'}
            </h3>
            <div className="space-y-2 text-xs text-stone-400 font-serif">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C1121F] shrink-0 mt-0.5" />
                <span>
                  {language === 'bn' 
                    ? 'মানিক মিয়া ভবন, ১ আর কে মিশন রোড, মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১২০৩'
                    : 'Manik Miah Bhavan, 1 RK Mission Road, Motijheel C/A, Dhaka-1203, Bangladesh'}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="font-mono">+৮৮০-২-৭১২২৪০০-৫, ৭১২২৪০৬</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="font-mono">news@ittefaq.com.bd, editor@ittefaq.com.bd</span>
              </p>
            </div>

            <div className="pt-2 text-[11px] text-stone-500">
              <p>{language === 'bn' ? 'সম্পাদক ও প্রকাশক: তাসমিমা হোসেন' : 'Editor & Publisher: Tasmima Hossain'}</p>
              <p>{language === 'bn' ? 'প্রতিষ্ঠাতা: তফাজ্জল হোসেন মানিক মিয়া' : 'Founder: Tofazzal Hossain Manik Miah'}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="font-serif text-center sm:text-left">
            {language === 'bn' 
              ? '© ১৯৫৩-২০২৬ দৈনিক ইত্তেফাক। ইত্তেফাক হোল্ডিংস লিমিটেড কর্তৃক সর্বস্বত্ব সংরক্ষিত।'
              : '© 1953-2026 The Daily Ittefaq. All rights reserved by Ittefaq Holdings Ltd.'}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer font-serif"
          >
            <span>{language === 'bn' ? 'শীর্ষে চলুন' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
