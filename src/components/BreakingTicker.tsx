import React, { useState, useEffect } from 'react';
import { Bell, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { BREAKING_NEWS } from '../data/newsData';
import { Language, BreakingNewsItem } from '../types';

interface BreakingTickerProps {
  language: Language;
  onSelectBreaking: (title: string) => void;
  breakingNews?: BreakingNewsItem[];
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  language,
  onSelectBreaking,
  breakingNews = BREAKING_NEWS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeNews = breakingNews.length > 0 ? breakingNews : BREAKING_NEWS;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeNews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, activeNews.length]);

  const currentItem = activeNews[currentIndex % activeNews.length] || activeNews[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeNews.length) % activeNews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeNews.length);
  };

  return (
    <div 
      className="bg-white border-b border-stone-200 shadow-2xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
        {/* Red Live Pill Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#C1121F] text-white text-xs font-bold uppercase tracking-wider rounded-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <Bell className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ব্রেকিং' : 'Breaking'}</span>
          </span>
        </div>

        {/* Ticker Content text */}
        <div className="flex-1 overflow-hidden">
          <button
            onClick={() => onSelectBreaking(language === 'bn' ? currentItem.textBn : currentItem.textEn)}
            className="text-left w-full text-xs sm:text-sm font-medium text-stone-800 hover:text-[#C1121F] transition-colors truncate block cursor-pointer"
          >
            <span className="text-[#C1121F] font-serif mr-2 font-semibold">
              [{language === 'bn' ? currentItem.timeBn : currentItem.timeEn}]
            </span>
            <span>
              {language === 'bn' ? currentItem.textBn : currentItem.textEn}
            </span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0 text-stone-500">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
            className="p-1 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            aria-label="Previous breaking news"
            className="p-1 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-stone-400 px-1 tabular-nums">
            {currentIndex + 1}/{activeNews.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next breaking news"
            className="p-1 hover:text-stone-900 rounded hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
