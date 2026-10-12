import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MARKET_DATA } from '../data/newsData';
import { Language } from '../types';

interface MarketStripProps {
  language: Language;
}

export const MarketStrip: React.FC<MarketStripProps> = ({ language }) => {
  return (
    <div className="bg-[#F5F2EB] border-b border-stone-200 text-xs py-1.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0 text-stone-700 font-semibold uppercase tracking-wider text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          <span>{language === 'bn' ? 'বাণিজ্য ও বাজার সূচক' : 'Market & Financial Rates'}</span>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          {MARKET_DATA.map((item) => (
            <div key={item.symbol} className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-medium text-stone-600">
                {language === 'bn' ? item.nameBn : item.nameEn}:
              </span>
              <span className="font-semibold text-stone-900 font-mono tabular-nums">
                {item.value}
              </span>
              <span 
                className={`flex items-center gap-0.5 text-[11px] font-mono tabular-nums ${
                  item.isPositive ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{item.change}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
