/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  BreakingTicker 
} from './components/BreakingTicker';
import { 
  MarketStrip 
} from './components/MarketStrip';
import { 
  LeadStoriesSection 
} from './components/LeadStoriesSection';
import { 
  DistrictNewsSection 
} from './components/DistrictNewsSection';
import { 
  OpinionSection 
} from './components/OpinionSection';
import { 
  SportsWidget 
} from './components/SportsWidget';
import { 
  PollWidget 
} from './components/PollWidget';
import { 
  EPaperModal 
} from './components/EPaperModal';
import { 
  ArticleModal 
} from './components/ArticleModal';
import { 
  BookmarksDrawer 
} from './components/BookmarksDrawer';
import { 
  SearchModal 
} from './components/SearchModal';
import { 
  Footer 
} from './components/Footer';
import { 
  AdminLoginModal,
  AUTHORIZED_ADMIN_EMAIL 
} from './components/AdminLoginModal';
import { 
  AdminPanelModal 
} from './components/AdminPanelModal';
import { 
  ARTICLES,
  BREAKING_NEWS,
  MARKET_DATA,
  INITIAL_POLL 
} from './data/newsData';
import { 
  Article, 
  CategoryKey, 
  Language, 
  BreakingNewsItem, 
  MarketTickerItem, 
  Poll 
} from './types';
import { 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEPaperOpen, setIsEPaperOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Admin Portal & Security State (Restricted to mdfazlulkabirmoin@gmail.com)
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('ittefaq_admin_user');
      return stored && stored.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() ? stored : null;
    } catch {
      return null;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Dynamic CMS state persisted in localStorage
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem('ittefaq_cms_articles');
      return stored ? JSON.parse(stored) : ARTICLES;
    } catch {
      return ARTICLES;
    }
  });

  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>(() => {
    try {
      const stored = localStorage.getItem('ittefaq_cms_breaking');
      return stored ? JSON.parse(stored) : BREAKING_NEWS;
    } catch {
      return BREAKING_NEWS;
    }
  });

  const [marketData, setMarketData] = useState<MarketTickerItem[]>(() => {
    try {
      const stored = localStorage.getItem('ittefaq_cms_markets');
      return stored ? JSON.parse(stored) : MARKET_DATA;
    } catch {
      return MARKET_DATA;
    }
  });

  const [poll, setPoll] = useState<Poll>(() => {
    try {
      const stored = localStorage.getItem('ittefaq_cms_poll');
      return stored ? JSON.parse(stored) : INITIAL_POLL;
    } catch {
      return INITIAL_POLL;
    }
  });

  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('ittefaq_saved_articles');
      return saved ? new Set(JSON.parse(saved)) : new Set(['lead-national-treaty']);
    } catch {
      return new Set(['lead-national-treaty']);
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ittefaq_saved_articles', JSON.stringify(Array.from(savedArticleIds)));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [savedArticleIds]);

  // URL Hash / Path detection for #admin or /admin to launch CMS
  useEffect(() => {
    const handleUrlHash = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      
      if (
        hash === '#admin' || 
        hash === '#cms' || 
        hash.startsWith('#admin') || 
        path === '/admin' || 
        path === '/cms'
      ) {
        if (adminEmail) {
          setIsAdminPanelOpen(true);
          setIsAdminLoginOpen(false);
        } else {
          setIsAdminLoginOpen(true);
          setIsAdminPanelOpen(false);
        }
      }
    };

    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
    window.addEventListener('popstate', handleUrlHash);
    return () => {
      window.removeEventListener('hashchange', handleUrlHash);
      window.removeEventListener('popstate', handleUrlHash);
    };
  }, [adminEmail]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // CMS update persistence handlers
  const handleSaveArticles = (updated: Article[]) => {
    setArticles(updated);
    try {
      localStorage.setItem('ittefaq_cms_articles', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    showToast(language === 'bn' ? 'সংবাদ তালিকা হালনাগাদ করা হয়েছে' : 'Articles updated');
  };

  const handleSaveBreakingNews = (updated: BreakingNewsItem[]) => {
    setBreakingNews(updated);
    try {
      localStorage.setItem('ittefaq_cms_breaking', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const handleSaveMarketData = (updated: MarketTickerItem[]) => {
    setMarketData(updated);
    try {
      localStorage.setItem('ittefaq_cms_markets', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const handleSavePoll = (updated: Poll) => {
    setPoll(updated);
    try {
      localStorage.setItem('ittefaq_cms_poll', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  const handleResetAllData = () => {
    setArticles(ARTICLES);
    setBreakingNews(BREAKING_NEWS);
    setMarketData(MARKET_DATA);
    setPoll(INITIAL_POLL);
    try {
      localStorage.removeItem('ittefaq_cms_articles');
      localStorage.removeItem('ittefaq_cms_breaking');
      localStorage.removeItem('ittefaq_cms_markets');
      localStorage.removeItem('ittefaq_cms_poll');
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    showToast(language === 'bn' ? 'সকল ডাটা প্রাথমিক অবস্থায় ফিরিয়ে নেওয়া হয়েছে' : 'All CMS data restored to defaults');
  };

  // Admin authentication handlers
  const handleAdminLoginSuccess = (email: string) => {
    setAdminEmail(email);
    try {
      localStorage.setItem('ittefaq_admin_user', email);
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    setIsAdminPanelOpen(true);
    setIsAdminLoginOpen(false);
    window.location.hash = 'admin';
    showToast(
      language === 'bn' 
        ? 'স্বাগতম প্রধান সম্পাদক! সুপার অ্যাডমিন পোর্টাল সক্রিয় হয়েছে।' 
        : 'Welcome Chief Editor! Super Admin portal activated.'
    );
  };

  const handleAdminLogout = () => {
    setAdminEmail(null);
    try {
      localStorage.removeItem('ittefaq_admin_user');
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    setIsAdminPanelOpen(false);
    setIsAdminLoginOpen(false);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.hash.toLowerCase().includes('cms')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    showToast(language === 'bn' ? 'অ্যাডমিন সেশন সমাপ্ত হয়েছে।' : 'Logged out from admin.');
  };

  const handleCloseAdminLogin = () => {
    setIsAdminLoginOpen(false);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.hash.toLowerCase().includes('cms')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleCloseAdminPanel = () => {
    setIsAdminPanelOpen(false);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.hash.toLowerCase().includes('cms')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setSavedArticleIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
        showToast(language === 'bn' ? 'সংবাদটি বুকমার্ক থেকে সরানো হয়েছে' : 'Removed from bookmarks');
      } else {
        updated.add(id);
        showToast(language === 'bn' ? 'সংবাদটি পরবর্তীতে পড়ার জন্য সংরক্ষিত হয়েছে' : 'Saved for later reading');
      }
      return updated;
    });
  };

  const handleClearBookmarks = () => {
    setSavedArticleIds(new Set());
    showToast(language === 'bn' ? 'সকল সংরক্ষিত সংবাদ মুছে ফেলা হয়েছে' : 'All bookmarks cleared');
  };

  const handleSelectArticleById = (id: string) => {
    const art = articles.find((a) => a.id === id);
    if (art) {
      setSelectedArticle(art);
    }
  };

  const handleSelectBreaking = (title: string) => {
    const matched = articles.find(
      (a) => a.title.includes(title) || a.titleEn.includes(title)
    ) || articles[0];
    setSelectedArticle(matched);
  };

  // Filtered articles when in category view
  const categoryArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory, articles]);

  const savedArticlesList = useMemo(() => {
    return articles.filter((a) => savedArticleIds.has(a.id));
  }, [savedArticleIds, articles]);

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return articles.filter((a) => a.id !== selectedArticle.id);
  }, [selectedArticle, articles]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-4 py-2.5 rounded shadow-lg border border-stone-700 text-xs font-serif flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#C1121F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Newspaper Header */}
      <Header
        language={language}
        onToggleLanguage={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        savedCount={savedArticleIds.size}
        adminEmail={adminEmail}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          if (adminEmail) {
            setIsAdminPanelOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* Breaking News Ticker Strip */}
      <BreakingTicker
        language={language}
        onSelectBreaking={handleSelectBreaking}
        breakingNews={breakingNews}
      />

      {/* Financial & Market Strip */}
      <MarketStrip 
        language={language}
        marketData={marketData} 
      />

      {/* Main Editorial Content Area */}
      <main className="flex-1">
        {activeCategory === 'all' ? (
          // Comprehensive Front Page Experience
          <>
            {/* 3-Tier Front Page Lead Stories */}
            <LeadStoriesSection
              articles={articles}
              language={language}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={handleToggleBookmark}
              savedArticleIds={savedArticleIds}
            />

            {/* Grassroots 64 Districts Section */}
            <DistrictNewsSection
              articles={articles}
              language={language}
              onSelectArticle={setSelectedArticle}
            />

            {/* Editorial & Opinion Section (Heritage & Columnists) */}
            <OpinionSection
              articles={articles}
              language={language}
              onSelectArticle={setSelectedArticle}
            />

            {/* Sports & Live Cricket Section */}
            <SportsWidget
              articles={articles}
              language={language}
              onSelectArticle={setSelectedArticle}
            />

            {/* Daily Public Opinion Poll */}
            <PollWidget 
              language={language}
              poll={poll}
              onVote={handleSavePoll}
            />
          </>
        ) : (
          // Dedicated Category View
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
              <button
                onClick={() => setActiveCategory('all')}
                className="hover:text-[#C1121F] font-serif cursor-pointer"
              >
                {language === 'bn' ? 'প্রচ্ছদ' : 'Home'}
              </button>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="text-[#C1121F] font-bold font-serif uppercase">
                {language === 'bn' ? activeCategory : activeCategory}
              </span>
            </div>

            {/* Category Banner Title */}
            <div className="pb-4 border-b-2 border-stone-900 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black font-serif text-stone-900 capitalize">
                  {categoryArticles[0]
                    ? (language === 'bn' ? categoryArticles[0].categoryLabelBn : categoryArticles[0].categoryLabelEn)
                    : activeCategory}
                </h2>
                <p className="text-xs text-stone-500 font-serif mt-1">
                  {language === 'bn' 
                    ? `ইত্তেফাকের বিশেষায়িত সংবাদ ও বিশ্লেষণ · মোট ${categoryArticles.length}টি প্রতিবেদন`
                    : `Specialized news and analyses · ${categoryArticles.length} reports`}
                </p>
              </div>

              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs font-semibold text-[#C1121F] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{language === 'bn' ? 'প্রচ্ছদে ফিরে যান' : 'Back to Front Page'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category News Grid */}
            {categoryArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded border border-stone-200">
                <p className="font-serif text-stone-500">
                  {language === 'bn' ? 'এই বিভাগে বর্তমানে কোনো প্রতিবেদন নেই' : 'No articles currently in this section'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white p-4 rounded border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between shadow-2xs hover:shadow-xs"
                  >
                    <div>
                      {article.imageUrl && (
                        <div className="overflow-hidden rounded mb-3 bg-stone-100">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-44 object-cover group-hover:scale-103 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                        <span className="text-[#C1121F] font-serif font-bold">
                          {language === 'bn' ? article.categoryLabelBn : article.categoryLabelEn}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{language === 'bn' ? article.publishedAt.split(',')[1]?.trim() : article.publishedAtEn}</span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C1121F] transition-colors leading-snug line-clamp-2">
                        {language === 'bn' ? article.title : article.titleEn}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-3 font-serif leading-relaxed">
                        {language === 'bn' ? article.summary : article.summaryEn}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="font-medium text-stone-700">{article.author}</span>
                      <span className="text-[#C1121F] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        {language === 'bn' ? 'পড়ুন' : 'Read'} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Dedicated Admin Login Modal (Restricted to mdfazlulkabirmoin@gmail.com) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={handleCloseAdminLogin}
        onLoginSuccess={handleAdminLoginSuccess}
        language={language}
      />

      {/* Full Admin Panel / CMS Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={handleCloseAdminPanel}
        language={language}
        articles={articles}
        onSaveArticles={handleSaveArticles}
        breakingNews={breakingNews}
        onSaveBreakingNews={handleSaveBreakingNews}
        marketData={marketData}
        onSaveMarketData={handleSaveMarketData}
        poll={poll}
        onSavePoll={handleSavePoll}
        adminEmail={adminEmail || AUTHORIZED_ADMIN_EMAIL}
        onLogout={handleAdminLogout}
        onResetAllData={handleResetAllData}
      />

      {/* Newspaper Broadsheet E-Paper Modal */}
      <EPaperModal
        isOpen={isEPaperOpen}
        onClose={() => setIsEPaperOpen(false)}
        language={language}
        onSelectArticleById={handleSelectArticleById}
      />

      {/* Deep Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        language={language}
        isBookmarked={selectedArticle ? savedArticleIds.has(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        relatedArticles={relatedArticles}
        onSelectRelated={setSelectedArticle}
      />

      {/* Bookmarks & Saved Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={setSelectedArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearBookmarks}
        language={language}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        language={language}
        onSelectArticle={setSelectedArticle}
      />

      {/* Authentic Daily Ittefaq Footer */}
      <Footer
        language={language}
        onSelectCategory={setActiveCategory}
        onOpenEPaper={() => setIsEPaperOpen(true)}
      />

    </div>
  );
}
