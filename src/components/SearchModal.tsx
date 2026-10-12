import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Article, Language } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  language: Language;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  language,
  onSelectArticle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const popularTags = [
    'বাণিজ্য',
    'মেট্রোরেল',
    'ক্রিকেট',
    'চট্টগ্রাম বন্দর',
    'অর্থনীতি',
    'মানিক মিয়া',
    'জলবায়ু',
    'প্রযুক্তি',
  ];

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase();

    return articles.filter((a) => {
      const matchBn = a.title.toLowerCase().includes(query) || 
                      a.summary.toLowerCase().includes(query) ||
                      a.tags.some(t => t.toLowerCase().includes(query)) ||
                      a.author.toLowerCase().includes(query);
      const matchEn = a.titleEn.toLowerCase().includes(query) || 
                      a.summaryEn.toLowerCase().includes(query);
      return matchBn || matchEn;
    });
  }, [searchTerm, articles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-lg shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C1121F] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={language === 'bn' ? 'সংবাদ, লেখক বা বিষয় অনুসন্ধান করুন...' : 'Search articles, topics or authors...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base sm:text-lg font-serif focus:outline-none bg-transparent text-stone-900 placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-4 py-3 bg-stone-100 border-b border-stone-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {language === 'bn' ? 'জনপ্রিয় অনুসন্ধান:' : 'Trending Tags:'}
          </span>
          {popularTags.map((t) => (
            <button
              key={t}
              onClick={() => setSearchTerm(t)}
              className="px-2 py-0.5 rounded bg-white text-stone-700 hover:text-[#C1121F] hover:border-[#C1121F] text-xs font-serif border border-stone-200 whitespace-nowrap transition-colors cursor-pointer"
            >
              #{t}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-12 text-stone-400 font-serif">
              <Search className="w-10 h-10 mx-auto mb-2 text-stone-300 stroke-1" />
              <p>{language === 'bn' ? 'কীওয়ার্ড লিখে অনুসন্ধান শুরু করুন' : 'Type to start searching headlines'}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-stone-500 font-serif">
              <p className="text-base font-semibold">
                {language === 'bn' ? `"${searchTerm}" সম্পর্কিত কোনো সংবাদ পাওয়া যায়নি` : `No reports found for "${searchTerm}"`}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {language === 'bn' ? 'ভিন্ন কোনো কীওয়ার্ড দিয়ে চেষ্টা করুন' : 'Try searching with alternative keywords'}
              </p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="bg-white p-3.5 rounded border border-stone-200 hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
                    <span className="font-serif text-[#C1121F] font-semibold">
                      {language === 'bn' ? article.categoryLabelBn : article.categoryLabelEn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.author}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#C1121F] transition-colors leading-snug">
                    {language === 'bn' ? article.title : article.titleEn}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-serif">
                    {language === 'bn' ? article.summary : article.summaryEn}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>{article.publishedAt}</span>
                  <span className="text-[#C1121F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {language === 'bn' ? 'পড়ুন' : 'Read'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
