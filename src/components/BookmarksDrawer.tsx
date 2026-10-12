import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article, Language } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
  language: Language;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-2xs flex justify-end">
      <div className="bg-[#FAF8F5] w-full max-w-md h-full shadow-2xl border-l border-stone-300 flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#C1121F] fill-current" />
            <h3 className="font-serif font-bold text-lg">
              {language === 'bn' ? `সংরক্ষিত সংবাদ (${savedArticles.length})` : `Saved Articles (${savedArticles.length})`}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bookmarks"
            className="p-1 hover:bg-stone-800 rounded text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
              <Bookmark className="w-12 h-12 stroke-1 text-stone-300" />
              <p className="font-serif text-stone-600 text-sm">
                {language === 'bn' 
                  ? 'আপনার কোনো সংরক্ষিত সংবাদ নেই। পরে পড়ার জন্য বুকমার্ক আইকনে চাপুন।'
                  : 'You have no saved articles. Click the bookmark icon on any story to save for later.'}
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white p-3.5 rounded border border-stone-200 hover:border-stone-400 transition-colors shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-serif text-[#C1121F] font-semibold">
                      {language === 'bn' ? article.categoryLabelBn : article.categoryLabelEn}
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(article.id)}
                      aria-label="Remove bookmark"
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 
                    onClick={() => { onSelectArticle(article); onClose(); }}
                    className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#C1121F] cursor-pointer leading-snug line-clamp-2"
                  >
                    {language === 'bn' ? article.title : article.titleEn}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="font-mono text-[11px]">{article.readTime}</span>
                  <button
                    onClick={() => { onSelectArticle(article); onClose(); }}
                    className="text-[#C1121F] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'পড়ুন' : 'Read'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-rose-700 hover:text-rose-900 font-semibold cursor-pointer"
            >
              {language === 'bn' ? 'সব মুছে ফেলুন' : 'Clear All'}
            </button>
            <span className="text-stone-400 font-serif">
              {language === 'bn' ? 'ব্রাউজারে সংরক্ষিত' : 'Stored locally'}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
