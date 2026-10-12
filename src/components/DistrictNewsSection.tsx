import React, { useState } from 'react';
import { MapPin, Filter, ArrowRight } from 'lucide-react';
import { Article, Language } from '../types';
import { BANGLADESH_DIVISIONS } from '../data/newsData';

interface DistrictNewsSectionProps {
  articles: Article[];
  language: Language;
  onSelectArticle: (article: Article) => void;
}

export const DistrictNewsSection: React.FC<DistrictNewsSectionProps> = ({
  articles,
  language,
  onSelectArticle,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('সকল বিভাগ');

  // Filter countrywide/regional articles
  const regionalArticles = articles.filter((a) => {
    if (a.category !== 'country' && a.category !== 'national') return false;
    if (selectedDivision === 'সকল বিভাগ') return true;
    return a.division === selectedDivision;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-stone-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#1C1917]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-[#C1121F] text-white rounded-xs">
            <MapPin className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              {language === 'bn' ? 'সারাদেশের খবর' : 'Countrywide & District News'}
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              {language === 'bn' ? '৬৪ জেলার তৃণমূল সংবাদ ও মাঠপর্যায়ের প্রতিবেদন' : 'Ground reporting across all 64 districts'}
            </p>
          </div>
        </div>

        {/* Division Filter Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {BANGLADESH_DIVISIONS.map((div) => {
            const isSelected = selectedDivision === div;
            return (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-white font-semibold shadow-2xs'
                    : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {div}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of regional news cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {regionalArticles.slice(0, 6).map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-white p-4 rounded border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div>
              {/* Photo */}
              {article.imageUrl && (
                <div className="overflow-hidden rounded mb-3 bg-stone-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-40 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Location Tag & Date */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-[#C1121F] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {article.district || article.division || 'বাংলাদেশ'}
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{language === 'bn' ? article.publishedAt.split(',')[1]?.trim() : article.publishedAtEn}</span>
              </div>

              {/* Headline */}
              <h4 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C1121F] transition-colors leading-snug line-clamp-2">
                {language === 'bn' ? article.title : article.titleEn}
              </h4>

              {/* Summary */}
              <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 font-serif leading-relaxed">
                {language === 'bn' ? article.summary : article.summaryEn}
              </p>
            </div>

            {/* Correspondent Byline */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-stone-700">{article.author}</span>
              <span className="text-[#C1121F] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                {language === 'bn' ? 'বিস্তারিত' : 'Read'} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
