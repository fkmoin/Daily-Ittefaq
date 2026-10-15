import React from 'react';
import { Feather, BookOpen, Quote, ArrowRight } from 'lucide-react';
import { Article, Language } from '../types';

interface OpinionSectionProps {
  articles: Article[];
  language: Language;
  onSelectArticle: (article: Article) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  articles,
  language,
  onSelectArticle,
}) => {
  // Find opinion pieces
  const opinionArticles = articles.filter((a) => a.category === 'opinion');
  const leadOpinion = opinionArticles[0] || articles[3];

  return (
    <section className="bg-[#F6F3EC] py-10 border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-stone-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-stone-900 text-amber-300 rounded-xs">
              <Feather className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                {language === 'bn' ? 'মতামত ও সম্পাদকীয়' : 'Editorial & Opinion'}
              </h3>
              <p className="text-xs text-stone-600 font-serif">
                {language === 'bn' ? 'মুক্তচিন্তা, নীতি-বিশ্লেষণ ও মুক্ত সাংবাদিকতার মঞ্চ' : 'Independent commentary, essays & civic dialogues'}
              </p>
            </div>
          </div>
          <span className="text-xs text-stone-500 font-serif italic hidden sm:inline">
            “মুসাফির”-এর ঐতিহাসিক উত্তরাধিকার
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Editorial Feature with Archival Image (7 cols) */}
          <div 
            onClick={() => onSelectArticle(leadOpinion)}
            className="lg:col-span-7 bg-white p-6 rounded border border-stone-300 shadow-xs cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                <span className="text-[#C1121F] font-serif font-bold uppercase tracking-wider">
                  {language === 'bn' ? 'সম্পাদকীয় প্রবন্ধ' : 'Editorial Essay'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{language === 'bn' ? leadOpinion.publishedAt : leadOpinion.publishedAtEn}</span>
              </div>

              <h4 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 group-hover:text-[#C1121F] transition-colors leading-tight mb-4">
                {language === 'bn' ? leadOpinion.title : leadOpinion.titleEn}
              </h4>

              {/* Archival Photo */}
              <div className="overflow-hidden rounded mb-4 bg-stone-100">
                <img
                  src={leadOpinion.imageUrl}
                  alt="ইত্তেফাক আর্কাইভ"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/editorial_manik_archive_1791785203555.jpg';
                  }}
                  className="w-full h-56 sm:h-64 object-cover sepia-[0.15] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="p-2 bg-stone-100 text-[11px] text-stone-600 italic font-serif border-t border-stone-200">
                  {language === 'bn' ? leadOpinion.caption : leadOpinion.captionEn}
                </div>
              </div>

              {/* Pull quote style excerpt */}
              <div className="my-4 py-3 border-y border-stone-200 italic font-serif text-stone-800 text-base sm:text-lg flex gap-3">
                <Quote className="w-6 h-6 text-stone-400 shrink-0 mt-1" />
                <p>
                  {language === 'bn' ? leadOpinion.summary : leadOpinion.summaryEn}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-serif font-bold text-stone-900 text-sm">{leadOpinion.author}</p>
                <p className="text-stone-500">{leadOpinion.authorRole}</p>
              </div>
              <button className="flex items-center gap-1 text-[#C1121F] font-bold uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform">
                <span>{language === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Full Essay'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Side Columns & Columnists (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Column 1: Musafir Heritage Box */}
            <div className="bg-stone-900 text-stone-100 p-5 rounded border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-serif font-semibold text-xs mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{language === 'bn' ? 'ঐতিহাসিক রাজনৈতিক মঞ্চ' : 'Historic Political Forum'}</span>
              </div>
              <h5 className="font-serif text-lg font-bold text-white mb-2">
                {language === 'bn' ? 'মানিক মিয়ার ‘মুসাফির’ কলাম ও সমকালীন গণতন্ত্র' : 'The Legacy of Manik Miah’s Musafir Column'}
              </h5>
              <p className="text-xs text-stone-300 font-serif leading-relaxed line-clamp-3">
                {language === 'bn'
                  ? '১৯৫০ ও ৬০-এর দশকের স্বৈরাচারবিরোধী গণআন্দোলনে নির্ভীক সাংবাদিকতার প্রতীক তফাজ্জল হোসেন মানিক মিয়ার আপসহীন কলম কীভাবে জাতিকে পথ দেখিয়েছিল।'
                  : 'How Tofazzal Hossain Manik Miah’s uncompromising pen guided a nation towards civil rights and democratic dignity.'}
              </p>
              <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <span>ইত্তেফাক হেরিটেজ আর্কাইভ</span>
                <span className="text-amber-400 font-medium">১৯৫৩ – ২০২৬</span>
              </div>
            </div>

            {/* Other opinion pieces */}
            <div className="space-y-4">
              {articles.slice(1, 3).map((art) => (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="bg-white p-4 rounded border border-stone-300 hover:border-stone-500 transition-colors cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
                    <span className="font-serif text-[#C1121F] font-semibold">
                      {language === 'bn' ? 'উপ-সম্পাদকীয়' : 'Sub-Editorial'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{language === 'bn' ? art.readTime : art.readTimeEn}</span>
                  </div>
                  <h5 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#C1121F] transition-colors line-clamp-2 leading-snug">
                    {language === 'bn' ? art.title : art.titleEn}
                  </h5>
                  <p className="mt-2 text-xs text-stone-600 line-clamp-2 font-serif">
                    {language === 'bn' ? art.summary : art.summaryEn}
                  </p>
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-stone-800">{art.author}</span>
                    <span className="text-[#C1121F] font-medium text-[11px]">পড়ুন →</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
