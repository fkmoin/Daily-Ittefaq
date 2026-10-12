import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Newspaper, 
  Sun, 
  Clock, 
  Menu, 
  X, 
  Globe, 
  Share2,
  Calendar,
  Volume2
} from 'lucide-react';
import { Language, CategoryKey } from '../types';
import { PRAYER_TIMES, CURRENT_WEATHER } from '../data/newsData';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  activeCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenEPaper: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  onOpenEPaper,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { key: CategoryKey; bn: string; en: string }[] = [
    { key: 'all', bn: 'প্রচ্ছদ', en: 'Home' },
    { key: 'national', bn: 'জাতীয়', en: 'National' },
    { key: 'politics', bn: 'রাজনীতি', en: 'Politics' },
    { key: 'country', bn: 'সারাদেশ', en: 'Districts' },
    { key: 'economy', bn: 'অর্থনীতি', en: 'Economy' },
    { key: 'international', bn: 'আন্তর্জাতিক', en: 'World' },
    { key: 'sports', bn: 'খেলাধুলা', en: 'Sports' },
    { key: 'entertainment', bn: 'বিনোদন', en: 'Entertainment' },
    { key: 'opinion', bn: 'মতামত', en: 'Opinion' },
    { key: 'tech', bn: 'প্রযুক্তি', en: 'Tech' },
    { key: 'lifestyle', bn: 'জীবনযাপন', en: 'Lifestyle' },
  ];

  return (
    <header className="w-full bg-[#FAF8F5] border-b border-stone-200">
      {/* 1. Top Operational Ribbon: Gregorian, Bangla, Hijri dates, Weather, Prayer times */}
      <div className="bg-[#1C1917] text-stone-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Multi-calendar Dateline */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-stone-100 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#C1121F]" />
              {language === 'bn' ? 'সোমবার, ১২ অক্টোবর ২০২৬' : 'Monday, October 12, 2026'}
            </span>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="text-stone-300 hidden md:inline">
              {language === 'bn' ? '২৭ আশ্বিন ১৪৩১ বঙ্গাব্দ' : '27 Ashwin 1431 BS'}
            </span>
            <span className="text-stone-500 hidden md:inline">|</span>
            <span className="text-stone-400 hidden lg:inline">
              {language === 'bn' ? '২৯ রবিউস সানি ১৪৪৮ হিজরি' : '29 Rabi al-Thani 1448 AH'}
            </span>
          </div>

          {/* Right: Weather, Prayer Times, Language Switcher */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            {/* Dhaka Weather */}
            <div className="hidden sm:flex items-center gap-1.5 text-stone-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'bn' ? CURRENT_WEATHER.cityBn : CURRENT_WEATHER.cityEn}: {CURRENT_WEATHER.tempCelsius}°C
              </span>
              <span className="text-stone-400">({language === 'bn' ? CURRENT_WEATHER.conditionBn : CURRENT_WEATHER.conditionEn})</span>
            </div>

            {/* Quick Prayer Time Pill */}
            <div className="hidden lg:flex items-center gap-1 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {language === 'bn' ? 'যোহর' : 'Dhuhr'}: ১১:৫৮
              </span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-medium border border-stone-700 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#C1121F]" />
              <span>{language === 'bn' ? 'English Edition' : 'বাংলা সংস্করণ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Authentic Ittefaq Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left Action Zone: E-Paper & Date Edition */}
          <div className="hidden md:flex flex-col items-start gap-1">
            <button
              onClick={onOpenEPaper}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#C1121F] hover:bg-[#A00E1A] text-white rounded text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer group"
            >
              <Newspaper className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>{language === 'bn' ? 'অনলাইন ই-পেপার' : 'Online E-Paper'}</span>
            </button>
            <span className="text-[11px] text-stone-500 font-serif">
              {language === 'bn' ? 'স্থাপিত: ১৯৫৩ খ্রিষ্টাব্দ' : 'Established: 1953'}
            </span>
          </div>

          {/* Centerpiece: The Daily Ittefaq Historic Masthead */}
          <div className="flex-1 text-center flex flex-col items-center">
            {/* Tagline / Motto */}
            <div className="text-[11px] sm:text-xs tracking-widest text-[#78350F] font-serif font-medium mb-1 uppercase">
              {language === 'bn' ? '— সত্যের সন্ধানে নির্ভীক —' : '— Fearless in Search of Truth —'}
            </div>

            {/* Main Logotype */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectCategory('all'); }}
              className="group block"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1C1917] tracking-tight hover:text-[#C1121F] transition-colors font-serif">
                {language === 'bn' ? 'দৈনিক ইত্তেফাক' : 'The Daily Ittefaq'}
              </h1>
            </a>

            {/* Founder credit */}
            <div className="text-[11px] sm:text-xs text-stone-600 font-serif mt-1">
              {language === 'bn' ? (
                <>প্রতিষ্ঠাতা: <strong className="text-stone-800">তফাজ্জল হোসেন মানিক মিয়া</strong></>
              ) : (
                <>Founder: <strong className="text-stone-800">Tofazzal Hossain Manik Miah</strong></>
              )}
            </div>
          </div>

          {/* Right Action Zone: Search & Bookmarks */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles"
              className="p-2 sm:px-3 sm:py-2 rounded border border-stone-300 hover:border-stone-400 bg-white text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-2xs"
            >
              <Search className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">{language === 'bn' ? 'অনুসন্ধান' : 'Search'}</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              aria-label="Saved articles"
              className="p-2 sm:px-3 sm:py-2 rounded border border-stone-300 hover:border-stone-400 bg-white text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer relative shadow-2xs"
            >
              <Bookmark className="w-4 h-4 text-[#C1121F]" />
              <span className="hidden sm:inline">{language === 'bn' ? 'সংরক্ষিত' : 'Saved'}</span>
              {savedCount > 0 && (
                <span className="bg-[#C1121F] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded border border-stone-300 text-stone-800 bg-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sticky Primary Category Navigation Bar */}
      <nav className="w-full bg-[#1C1917] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="hidden md:flex items-center justify-between overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1 lg:gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => onSelectCategory(cat.key)}
                    className={`px-3 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                      isActive
                        ? 'border-[#C1121F] text-white font-semibold bg-stone-800/60'
                        : 'border-transparent text-stone-300 hover:text-white hover:border-stone-400'
                    }`}
                  >
                    {language === 'bn' ? cat.bn : cat.en}
                  </button>
                );
              })}
            </div>

            {/* Dedicated E-Paper tab on nav bar */}
            <button
              onClick={onOpenEPaper}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C1121F] hover:bg-[#a10e1a] text-xs font-semibold text-white uppercase tracking-wider transition-colors ml-2 cursor-pointer shrink-0"
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ই-পেপার' : 'E-Paper'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-900 border-t border-stone-800 px-4 py-3 space-y-1">
            <button
              onClick={() => { onOpenEPaper(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 bg-[#C1121F] text-white rounded text-sm font-semibold mb-2"
            >
              <Newspaper className="w-4 h-4" />
              <span>{language === 'bn' ? 'অনলাইন ই-পেপার দেখুন' : 'View Online E-Paper'}</span>
            </button>
            <div className="grid grid-cols-2 gap-1 pt-1 border-t border-stone-800">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    onSelectCategory(cat.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm rounded ${
                    activeCategory === cat.key ? 'bg-stone-800 text-white font-semibold' : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {language === 'bn' ? cat.bn : cat.en}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
