import React, { useState } from 'react';
import { Clock, Eye, MessageSquare, Bookmark, Volume2, Share2, Flame, ArrowUpRight } from 'lucide-react';
import { Article, Language } from '../types';

interface LeadStoriesSectionProps {
  articles: Article[];
  language: Language;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  savedArticleIds: Set<string>;
}

export const LeadStoriesSection: React.FC<LeadStoriesSectionProps> = ({
  articles,
  language,
  onSelectArticle,
  onToggleBookmark,
  savedArticleIds,
}) => {
  const [sidebarTab, setSidebarTab] = useState<'latest' | 'popular'>('latest');

  // Lead story
  const leadArticle = articles.find((a) => a.isLead) || articles[0];

  // Secondary sub-leads
  const subLeadArticles = articles.filter((a) => a.id !== leadArticle.id).slice(0, 2);

  // Latest news feed
  const latestArticles = [...articles].slice(0, 5);

  // Most read / trending
  const popularArticles = [...articles].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT & CENTER: Lead Story (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Kicker & Meta line */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="text-[#C1121F] font-serif font-bold uppercase tracking-wider text-xs">
                  {language === 'bn' ? leadArticle.kicker : leadArticle.kickerEn}
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{language === 'bn' ? leadArticle.categoryLabelBn : leadArticle.categoryLabelEn}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{language === 'bn' ? leadArticle.publishedAt : leadArticle.publishedAtEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(leadArticle.id)}
                  aria-label="Bookmark article"
                  className={`p-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
                    savedArticleIds.has(leadArticle.id) ? 'text-[#C1121F]' : 'text-stone-400'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Dominant Headline */}
            <h2 
              onClick={() => onSelectArticle(leadArticle)}
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#1C1917] hover:text-[#C1121F] transition-colors cursor-pointer leading-tight tracking-tight"
            >
              {language === 'bn' ? leadArticle.title : leadArticle.titleEn}
            </h2>

            {/* Lead Image with caption */}
            <div 
              onClick={() => onSelectArticle(leadArticle)}
              className="group cursor-pointer overflow-hidden rounded bg-stone-100 relative"
            >
              <img
                src={leadArticle.imageUrl}
                alt={leadArticle.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/lead_national_news_1791785161209.jpg';
                }}
                className="w-full h-[280px] sm:h-[360px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="p-2.5 bg-stone-900/85 text-stone-300 text-xs italic font-serif flex items-center justify-between">
                <span>{language === 'bn' ? leadArticle.caption : leadArticle.captionEn || leadArticle.caption}</span>
                <span className="text-stone-400 font-sans not-italic text-[11px] ml-2 shrink-0">
                  {language === 'bn' ? leadArticle.readTime : leadArticle.readTimeEn}
                </span>
              </div>
            </div>

            {/* Summary Deck */}
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-serif">
              {language === 'bn' ? leadArticle.summary : leadArticle.summaryEn}
            </p>

            {/* Author and Action footer */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 text-xs text-stone-500">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-800">{leadArticle.author}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.authorRole}</span>
              </div>
              <button
                onClick={() => onSelectArticle(leadArticle)}
                className="inline-flex items-center gap-1.5 text-[#C1121F] hover:text-[#900B16] font-semibold text-xs tracking-wider uppercase cursor-pointer"
              >
                <span>{language === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Full Story'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE / SUB-LEAD COLUMN: 2 Feature Stories (5 cols on lg, but split into 2 sub-leads or side stories) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {/* Section Heading */}
          <div className="hidden lg:flex items-center justify-between pb-2 border-b-2 border-stone-800">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {language === 'bn' ? 'বিশেষ ও আলোচিত প্রতিবেদন' : 'Featured Focus Stories'}
            </h3>
            <span className="text-xs text-stone-500 font-serif">ইত্তেফাক স্পেশাল</span>
          </div>

          {subLeadArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white p-4 rounded border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {article.imageUrl && (
                  <div 
                    onClick={() => onSelectArticle(article)}
                    className="overflow-hidden rounded cursor-pointer group"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/dhaka_metro_transit_1791785176659.jpg';
                      }}
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <span className="text-[#C1121F] font-serif font-semibold">
                    {language === 'bn' ? article.categoryLabelBn : article.categoryLabelEn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'bn' ? article.readTime : article.readTimeEn}</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(article)}
                  className="font-serif font-bold text-lg text-stone-900 hover:text-[#C1121F] transition-colors cursor-pointer leading-snug"
                >
                  {language === 'bn' ? article.title : article.titleEn}
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 font-serif leading-relaxed">
                  {language === 'bn' ? article.summary : article.summaryEn}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px] truncate max-w-[180px]">{article.author}</span>
                <button
                  onClick={() => onSelectArticle(article)}
                  className="text-[#C1121F] font-semibold hover:underline cursor-pointer"
                >
                  {language === 'bn' ? 'পড়ুন →' : 'Read →'}
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* 2-Tab Sidebar / Bottom Strip: Latest Live Stream & Most Read */}
      <div className="mt-8 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded">
            <button
              onClick={() => setSidebarTab('latest')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                sidebarTab === 'latest' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'bn' ? 'সর্বশেষ সংবাদ (২৪ ঘণ্টা)' : 'Latest Live Updates (24/7)'}
            </button>
            <button
              onClick={() => setSidebarTab('popular')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                sidebarTab === 'popular' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'bn' ? 'সর্বাধিক পঠিত (শীর্ষ ৫)' : 'Most Read (Top 5)'}
            </button>
          </div>
          <span className="text-xs text-stone-500 hidden sm:inline font-serif">
            {language === 'bn' ? 'আপডেট হচ্ছে প্রতি মিনিটে' : 'Updated Every Minute'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(sidebarTab === 'latest' ? latestArticles : popularArticles).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="bg-white p-3.5 rounded border border-stone-200/80 hover:border-stone-400 transition-colors cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
                  <span className="font-mono font-bold text-[#C1121F]">
                    {sidebarTab === 'popular' ? `#${idx + 1}` : item.publishedAt.split(',')[1]?.trim() || 'আজ'}
                  </span>
                  <span className="text-stone-400">
                    {language === 'bn' ? item.categoryLabelBn : item.categoryLabelEn}
                  </span>
                </div>
                <h5 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#C1121F] transition-colors line-clamp-3 leading-snug">
                  {language === 'bn' ? item.title : item.titleEn}
                </h5>
              </div>
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="tabular-nums font-mono">{item.viewsCount.toLocaleString()}</span>
                </span>
                <span>{language === 'bn' ? item.readTime : item.readTimeEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
