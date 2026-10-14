import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  TrendingUp, 
  Bell, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Check, 
  Search, 
  Star, 
  RefreshCw, 
  Download, 
  LogOut,
  Sliders,
  Image,
  ArrowRight,
  Eye
} from 'lucide-react';
import { 
  Article, 
  CategoryKey, 
  Language, 
  BreakingNewsItem, 
  MarketTickerItem, 
  Poll 
} from '../types';
import { BANGLADESH_DIVISIONS } from '../data/newsData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  articles: Article[];
  onSaveArticles: (updated: Article[]) => void;
  breakingNews: BreakingNewsItem[];
  onSaveBreakingNews: (updated: BreakingNewsItem[]) => void;
  marketData: MarketTickerItem[];
  onSaveMarketData: (updated: MarketTickerItem[]) => void;
  poll: Poll;
  onSavePoll: (updated: Poll) => void;
  adminEmail: string;
  onLogout: () => void;
  onResetAllData: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  language,
  articles,
  onSaveArticles,
  breakingNews,
  onSaveBreakingNews,
  marketData,
  onSaveMarketData,
  poll,
  onSavePoll,
  adminEmail,
  onLogout,
  onResetAllData,
}) => {
  const [activeTab, setActiveTab] = useState<
    'articles' | 'create_article' | 'breaking' | 'markets' | 'poll' | 'settings'
  >('articles');

  // Article Search & Filter
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Editing article state
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Article Form State
  const [formTitle, setFormTitle] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formKicker, setFormKicker] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryKey>('national');
  const [formDivision, setFormDivision] = useState('ঢাকা');
  const [formDistrict, setFormDistrict] = useState('ঢাকা');
  const [formAuthor, setFormAuthor] = useState('নিজস্ব প্রতিবেদক, ঢাকা');
  const [formAuthorRole] = useState('জ্যেষ্ঠ বার্তা প্রতিবেদক');
  const [formImageUrl, setFormImageUrl] = useState('/src/assets/images/lead_national_news_1791785161209.jpg');
  const [formCaption, setFormCaption] = useState('সংবাদের বিশেষ স্থিরচিত্র। ছবি: ইত্তেফাক');
  const [formSummary, setFormSummary] = useState('');
  const [formSummaryEn, setFormSummaryEn] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTags, setFormTags] = useState('ইত্তেফাক, খবর, বাংলাদেশ');
  const [formIsLead, setFormIsLead] = useState(false);
  const [formIsBreaking, setFormIsBreaking] = useState(false);

  // New Breaking Alert State
  const [newBrkTextBn, setNewBrkTextBn] = useState('');
  const [newBrkTextEn, setNewBrkTextEn] = useState('');

  // Market Rates Editor State
  const [tempMarketData, setTempMarketData] = useState<MarketTickerItem[]>(marketData);

  // Poll Editor State
  const [pollQuestionBn, setPollQuestionBn] = useState(poll.questionBn);
  const [pollQuestionEn, setPollQuestionEn] = useState(poll.questionEn);

  // Security PIN change
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Feedback banner
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Preset high-res images for quick picking
  const presetImages = [
    { label: 'কূটনৈতিক/জাতীয়', url: '/src/assets/images/lead_national_news_1791785161209.jpg' },
    { label: 'মেট্রোরেল/নগর', url: '/src/assets/images/dhaka_metro_transit_1791785176659.jpg' },
    { label: 'খেলাধুলা/ক্রিকেট', url: '/src/assets/images/cricket_match_action_1791785189371.jpg' },
    { label: 'আর্কাইভ/মুদ্রণ', url: '/src/assets/images/editorial_manik_archive_1791785203555.jpg' },
  ];

  const categoryMap: { [key in CategoryKey]: { bn: string; en: string } } = {
    all: { bn: 'প্রচ্ছদ', en: 'All' },
    lead: { bn: 'শীর্ষ সংবাদ', en: 'Lead' },
    national: { bn: 'জাতীয়', en: 'National' },
    politics: { bn: 'রাজনীতি', en: 'Politics' },
    country: { bn: 'সারাদেশ', en: 'Countrywide' },
    economy: { bn: 'অর্থনীতি', en: 'Economy' },
    international: { bn: 'আন্তর্জাতিক', en: 'International' },
    sports: { bn: 'খেলাধুলা', en: 'Sports' },
    entertainment: { bn: 'বিনোদন', en: 'Entertainment' },
    opinion: { bn: 'মতামত', en: 'Opinion' },
    tech: { bn: 'বিজ্ঞান ও প্রযুক্তি', en: 'Tech' },
    lifestyle: { bn: 'জীবনযাপন', en: 'Lifestyle' },
  };

  const handleOpenCreateForm = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormTitleEn('');
    setFormKicker('জরুরি সংবাদ');
    setFormCategory('national');
    setFormDivision('ঢাকা');
    setFormDistrict('ঢাকা');
    setFormAuthor('নিজস্ব প্রতিবেদক, ঢাকা');
    setFormImageUrl('/src/assets/images/lead_national_news_1791785161209.jpg');
    setFormCaption('সংবাদের বিশেষ স্থিরচিত্র। ছবি: ইত্তেফাক');
    setFormSummary('');
    setFormSummaryEn('');
    setFormContent('');
    setFormTags('ইত্তেফাক, খবর, বাংলাদেশ');
    setFormIsLead(false);
    setFormIsBreaking(false);
    setActiveTab('create_article');
  };

  const handleOpenEditForm = (article: Article) => {
    setEditingArticleId(article.id);
    setFormTitle(article.title);
    setFormTitleEn(article.titleEn);
    setFormKicker(article.kicker || '');
    setFormCategory(article.category);
    setFormDivision(article.division || 'ঢাকা');
    setFormDistrict(article.district || 'ঢাকা');
    setFormAuthor(article.author);
    setFormImageUrl(article.imageUrl);
    setFormCaption(article.caption);
    setFormSummary(article.summary);
    setFormSummaryEn(article.summaryEn);
    setFormContent(article.content.join('\n\n'));
    setFormTags(article.tags.join(', '));
    setFormIsLead(!!article.isLead);
    setFormIsBreaking(!!article.isBreaking);
    setActiveTab('create_article');
  };

  const handleSaveArticleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim()) {
      showNotice('অনুগ্রহ করে সংবাদের শিরোনাম এবং সংক্ষেপ পূরণ করুন');
      return;
    }

    const paragraphs = formContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const contentArray = paragraphs.length > 0 ? paragraphs : [formSummary];

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let updatedArticles = [...articles];

    // If making this story the Lead Story, demote other leads
    if (formIsLead) {
      updatedArticles = updatedArticles.map((a) => ({
        ...a,
        isLead: false,
      }));
    }

    if (editingArticleId) {
      // Update existing
      updatedArticles = updatedArticles.map((a) => {
        if (a.id === editingArticleId) {
          return {
            ...a,
            title: formTitle,
            titleEn: formTitleEn || formTitle,
            kicker: formKicker,
            category: formCategory,
            categoryLabelBn: categoryMap[formCategory]?.bn || 'জাতীয়',
            categoryLabelEn: categoryMap[formCategory]?.en || 'National',
            division: formDivision,
            district: formDistrict,
            author: formAuthor,
            imageUrl: formImageUrl,
            caption: formCaption,
            summary: formSummary,
            summaryEn: formSummaryEn || formSummary,
            content: contentArray,
            contentEn: [formSummaryEn || formSummary],
            tags: tagsArray,
            isLead: formIsLead,
            isBreaking: formIsBreaking,
          };
        }
        return a;
      });
      showNotice('সংবাদটি সফলভাবে আপডেট করা হয়েছে!');
    } else {
      // Create new
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: formTitle,
        titleEn: formTitleEn || formTitle,
        kicker: formKicker,
        category: formCategory,
        categoryLabelBn: categoryMap[formCategory]?.bn || 'জাতীয়',
        categoryLabelEn: categoryMap[formCategory]?.en || 'National',
        division: formDivision,
        district: formDistrict,
        author: formAuthor,
        authorRole: formAuthorRole,
        publishedAt: '১২ অক্টোবর ২০২৬, এইমাত্র',
        publishedAtEn: 'October 12, 2026, Just now',
        readTime: '৩ মিনিট পাঠ',
        readTimeEn: '3 min read',
        imageUrl: formImageUrl,
        caption: formCaption,
        summary: formSummary,
        summaryEn: formSummaryEn || formSummary,
        content: contentArray,
        contentEn: [formSummaryEn || formSummary],
        tags: tagsArray,
        isLead: formIsLead,
        isBreaking: formIsBreaking,
        viewsCount: 1,
        commentsCount: 0,
      };
      updatedArticles = [newArticle, ...updatedArticles];
      showNotice('নতুন সংবাদ সফলভাবে প্রকাশিত হয়েছে!');
    }

    onSaveArticles(updatedArticles);
    setActiveTab('articles');
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই সংবাদটি চিরতরে মুছে ফেলতে চান?')) {
      const updated = articles.filter((a) => a.id !== id);
      onSaveArticles(updated);
      showNotice('সংবাদটি মুছে ফেলা হয়েছে।');
    }
  };

  const handleToggleLead = (id: string) => {
    const updated = articles.map((a) => ({
      ...a,
      isLead: a.id === id,
    }));
    onSaveArticles(updated);
    showNotice('শীর্ষ সংবাদ সফলভাবে নির্ধারিত হয়েছে!');
  };

  const handleToggleBreaking = (id: string) => {
    const updated = articles.map((a) => {
      if (a.id === id) {
        return { ...a, isBreaking: !a.isBreaking };
      }
      return a;
    });
    onSaveArticles(updated);
    showNotice('ব্রেকিং স্ট্যাটাস আপডেট করা হয়েছে।');
  };

  // Breaking ticker handlers
  const handleAddBreaking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrkTextBn.trim()) return;

    const newItem: BreakingNewsItem = {
      id: `brk-${Date.now()}`,
      textBn: newBrkTextBn.trim(),
      textEn: newBrkTextEn.trim() || newBrkTextBn.trim(),
      timeBn: 'এইমাত্র',
      timeEn: 'Just now',
    };

    onSaveBreakingNews([newItem, ...breakingNews]);
    setNewBrkTextBn('');
    setNewBrkTextEn('');
    showNotice('নতুন ব্রেকিং নিউজ টিকারে যুক্ত হয়েছে!');
  };

  const handleDeleteBreaking = (id: string) => {
    const updated = breakingNews.filter((b) => b.id !== id);
    onSaveBreakingNews(updated);
    showNotice('ব্রেকিং আইটেম সরানো হয়েছে।');
  };

  // Market Rates handlers
  const handleSaveMarkets = () => {
    onSaveMarketData(tempMarketData);
    showNotice('বাজার ও মুদ্রার হার সফলভাবে সংরক্ষিত হয়েছে!');
  };

  // Poll handlers
  const handleSavePoll = () => {
    onSavePoll({
      ...poll,
      questionBn: pollQuestionBn,
      questionEn: pollQuestionEn,
    });
    showNotice('জনমত জরিপ প্রশ্ন আপডেট করা হয়েছে!');
  };

  const handleResetPollVotes = () => {
    if (window.confirm('আপনি কি জনমত জরিপের সকল ভোট শূন্য করতে চান?')) {
      onSavePoll({
        ...poll,
        totalVotes: 0,
        options: poll.options.map((o) => ({ ...o, votes: 0 })),
      });
      showNotice('জনমত জরিপ ভোট রিসেট করা হয়েছে।');
    }
  };

  // PIN change handler
  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      alert('পিন কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }
    localStorage.setItem('ittefaq_admin_pin', newPin.trim());
    localStorage.setItem('ittefaq_admin_password', newPin.trim());
    setPinChangeSuccess(true);
    setNewPin('');
    showNotice('অ্যাডমিন পাসওয়ার্ড/পিন সফলভাবে পরিবর্তন করা হয়েছে!');
    setTimeout(() => setPinChangeSuccess(false), 3000);
  };

  // Export JSON backup
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify({ articles, breakingNews, marketData, poll }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ittefaq_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered articles list
  const filteredArticles = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                          a.author.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || a.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#FAF8F5] w-full max-w-6xl h-[94vh] rounded-lg shadow-2xl border border-stone-300 flex flex-col overflow-hidden">
        
        {/* Top Operational Bar */}
        <div className="bg-[#1C1917] text-white px-4 py-3 flex items-center justify-between gap-3 border-b-2 border-[#C1121F] shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#C1121F] rounded text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold font-serif text-white flex items-center gap-2">
                <span>দৈনিক ইত্তেফাক প্রধান সম্পাদকীয় ও অ্যাডমিন পোর্টাল</span>
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-700">
                  সক্রিয় সেশন
                </span>
              </h2>
              <p className="text-[11px] text-stone-400 font-mono">
                অনুমোদিত ইউজার: <strong className="text-amber-300">{adminEmail}</strong> (প্রধান সম্পাদক / Super Admin)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-stone-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Action Notice Toast */}
        {actionNotice && (
          <div className="bg-emerald-700 text-white text-xs py-2 px-4 text-center font-serif flex items-center justify-center gap-2 animate-fadeIn shrink-0">
            <Check className="w-4 h-4" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-stone-300 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'articles'
                ? 'border-[#C1121F] text-[#C1121F] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>📰 সংবাদ তালিকা ({articles.length})</span>
          </button>

          <button
            onClick={handleOpenCreateForm}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'create_article'
                ? 'border-[#C1121F] text-[#C1121F] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{editingArticleId ? 'সংবাদ সম্পাদনা' : 'নতুন সংবাদ প্রকাশ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('breaking')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'breaking'
                ? 'border-[#C1121F] text-[#C1121F] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>ব্রেকিং নিউজ টিকার ({breakingNews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('markets')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'markets'
                ? 'border-[#C1121F] text-[#C1121F] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>বাণিজ্য ও শেয়ার বাজার</span>
          </button>

          <button
            onClick={() => setActiveTab('poll')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'poll'
                ? 'border-[#C1121F] text-[#C1121F] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>জনমত জরিপ</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#C1121F] text-[#C1121F] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>নিরাপত্তা ও সেটিংস</span>
          </button>
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
          
          {/* TAB 1: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              {/* Action Ribbon & Filters */}
              <div className="bg-white p-4 rounded border border-stone-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs">
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="শিরোনাম বা লেখক খুঁজুন..."
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-stone-300 focus:outline-none focus:border-[#C1121F]"
                    />
                  </div>

                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 text-xs rounded border border-stone-300 bg-white focus:outline-none focus:border-[#C1121F]"
                  >
                    <option value="all">সকল বিভাগ ({articles.length})</option>
                    <option value="national">জাতীয়</option>
                    <option value="politics">রাজনীতি</option>
                    <option value="country">সারাদেশ</option>
                    <option value="economy">অর্থনীতি</option>
                    <option value="international">আন্তর্জাতিক</option>
                    <option value="sports">খেলাধুলা</option>
                    <option value="entertainment">বিনোদন</option>
                    <option value="opinion">মতামত</option>
                    <option value="tech">প্রযুক্তি</option>
                  </select>
                </div>

                <button
                  onClick={handleOpenCreateForm}
                  className="px-4 py-2 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন সংবাদ প্রকাশ</span>
                </button>
              </div>

              {/* Articles Table */}
              <div className="bg-white rounded border border-stone-300 shadow-2xs overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 border-b border-stone-300 text-stone-700 font-serif">
                    <tr>
                      <th className="p-3 w-12">ছবি</th>
                      <th className="p-3">শিরোনাম ও কিট</th>
                      <th className="p-3 w-28">বিভাগ</th>
                      <th className="p-3 w-36">লেখক / তারিখ</th>
                      <th className="p-3 w-32 text-center">স্ট্যাটাস</th>
                      <th className="p-3 w-28 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-stone-50 transition-colors">
                        <td className="p-3">
                          <img
                            src={article.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded object-cover border border-stone-200"
                          />
                        </td>
                        <td className="p-3">
                          {article.kicker && (
                            <span className="text-[10px] text-[#C1121F] font-bold font-serif uppercase block">
                              {article.kicker}
                            </span>
                          )}
                          <span className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                            {article.title}
                          </span>
                          <span className="text-[11px] text-stone-500 line-clamp-1 font-serif mt-0.5">
                            {article.summary}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-800 font-serif text-[11px] border border-stone-200">
                            {article.categoryLabelBn}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap text-stone-600">
                          <p className="font-semibold text-stone-800 truncate max-w-[130px]">{article.author}</p>
                          <p className="text-[10px] text-stone-400">{article.publishedAt.split(',')[0]}</p>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleToggleLead(article.id)}
                              title="শীর্ষ সংবাদ হিসেবে সেট করুন"
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                                article.isLead
                                  ? 'bg-amber-100 text-amber-900 border-amber-400'
                                  : 'bg-stone-50 text-stone-400 border-stone-200 hover:border-amber-400'
                              }`}
                            >
                              {article.isLead ? '★ শীর্ষ সংবাদ' : '☆ সাধারণ'}
                            </button>

                            <button
                              onClick={() => handleToggleBreaking(article.id)}
                              title="ব্রেকিং নিউজ টগল করুন"
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                                article.isBreaking
                                  ? 'bg-rose-100 text-rose-900 border-rose-400'
                                  : 'bg-stone-50 text-stone-400 border-stone-200 hover:border-rose-400'
                              }`}
                            >
                              {article.isBreaking ? '● ব্রেকিং' : 'সাধারণ'}
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditForm(article)}
                              title="সম্পাদনা করুন"
                              className="p-1.5 rounded hover:bg-stone-100 text-stone-700 hover:text-[#C1121F] border border-stone-200 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              title="মুছে ফেলুন"
                              className="p-1.5 rounded hover:bg-rose-50 text-stone-400 hover:text-rose-600 border border-stone-200 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CREATE / EDIT ARTICLE FORM */}
          {activeTab === 'create_article' && (
            <div className="max-w-4xl mx-auto bg-white p-6 rounded border border-stone-300 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {editingArticleId ? 'সংবাদ সম্পাদনা করুন' : 'নতুন সংবাদ প্রকাশনা ফর্ম'}
                  </h3>
                  <p className="text-xs text-stone-500 font-serif">
                    ইত্তেফাকের বস্তুনিষ্ঠ সাংবাদিকতার নীতি অনুসরণ করে তথ্য প্রকাশ করুন
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  বাতিল করুন ✕
                </button>
              </div>

              <form onSubmit={handleSaveArticleForm} className="space-y-5">
                {/* Headlines */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      সংবাদের মূল শিরোনাম (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ঢাকায় আন্তর্জাতিক অর্থনৈতিক সহযোগিতা চুক্তি স্বাক্ষরিত"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded border border-stone-300 font-serif focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      শিরোনাম (English Headline - ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Historic International Economic Partnership Accords Formalized in Dhaka"
                      value={formTitleEn}
                      onChange={(e) => setFormTitleEn(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Kicker & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      উপশিরোনাম / কিট (Kicker)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: বিশেষ প্রতিবেদন"
                      value={formKicker}
                      onChange={(e) => setFormKicker(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      সংবাদ বিভাগ (Category)
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as CategoryKey)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:border-[#C1121F] focus:outline-none"
                    >
                      <option value="national">জাতীয় (National)</option>
                      <option value="politics">রাজনীতি (Politics)</option>
                      <option value="country">সারাদেশ (Districts)</option>
                      <option value="economy">অর্থনীতি (Economy)</option>
                      <option value="international">আন্তর্জাতিক (World)</option>
                      <option value="sports">খেলাধুলা (Sports)</option>
                      <option value="entertainment">বিনোদন (Entertainment)</option>
                      <option value="opinion">মতামত ও সম্পাদকীয় (Opinion)</option>
                      <option value="tech">বিজ্ঞান ও প্রযুক্তি (Tech)</option>
                      <option value="lifestyle">জীবনযাপন (Lifestyle)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      বিভাগীয় অঞ্চল (Division)
                    </label>
                    <select
                      value={formDivision}
                      onChange={(e) => setFormDivision(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 bg-white focus:border-[#C1121F] focus:outline-none"
                    >
                      {BANGLADESH_DIVISIONS.map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Author & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      প্রতিবেদক / লেখকের নাম (Author)
                    </label>
                    <input
                      type="text"
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                      জেলা / এলাকা (District)
                    </label>
                    <input
                      type="text"
                      value={formDistrict}
                      onChange={(e) => setFormDistrict(e.target.value)}
                      placeholder="যেমন: ঢাকা / চট্টগ্রাম / সিলেট"
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Image Selection & URL */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-800 font-serif">
                    সংবাদের স্থিরচিত্র (Image URL)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded border border-stone-300 font-mono focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  {/* Preset quick picks */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] text-stone-500 font-serif">দ্রুত বাছাই:</span>
                    {presetImages.map((img) => (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => setFormImageUrl(img.url)}
                        className={`px-2 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                          formImageUrl === img.url
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-600 font-serif mt-2">
                      ছবির ক্যাপশন ও ক্রেডিট
                    </label>
                    <input
                      type="text"
                      value={formCaption}
                      onChange={(e) => setFormCaption(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Summary / Deck */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                    সংবাদ সংক্ষেপ / ডেক (Summary) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="সংবাদের মূল সারমর্ম ২-৩ বাক্যে লিখুন..."
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-serif focus:border-[#C1121F] focus:outline-none"
                  />
                </div>

                {/* Full Content */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                    বিস্তারিত সংবাদ অনুচ্ছেদ (প্যারাগ্রাফ আলাদা করতে জোড়া এন্টার দিন)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="বিস্তারিত সংবাদ লিখুন..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-serif focus:border-[#C1121F] focus:outline-none"
                  />
                </div>

                {/* Flags: Lead Story & Breaking */}
                <div className="p-4 bg-stone-100 rounded border border-stone-200 flex flex-wrap items-center gap-6 text-xs font-serif">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-900">
                    <input
                      type="checkbox"
                      checked={formIsLead}
                      onChange={(e) => setFormIsLead(e.target.checked)}
                      className="w-4 h-4 accent-[#C1121F]"
                    />
                    <span>★ প্রধান শীর্ষ সংবাদ (Lead Story) হিসেবে প্রচ্ছদে প্রদর্শন করুন</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-900">
                    <input
                      type="checkbox"
                      checked={formIsBreaking}
                      onChange={(e) => setFormIsBreaking(e.target.checked)}
                      className="w-4 h-4 accent-[#C1121F]"
                    />
                    <span>● ব্রেকিং নিউজ ফ্ল্যাশে দেখান</span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab('articles')}
                    className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded text-xs font-bold uppercase tracking-wider shadow-2xs transition-colors cursor-pointer"
                  >
                    {editingArticleId ? 'সংবাদ আপডেট করুন' : 'সংবাদ প্রকাশ করুন'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: BREAKING NEWS TICKER */}
          {activeTab === 'breaking' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Add new breaking news alert */}
              <div className="bg-white p-5 rounded border border-stone-300 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                  <Bell className="w-5 h-5 text-[#C1121F]" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    নতুন ব্রেকিং নিউজ যুক্ত করুন
                  </h3>
                </div>

                <form onSubmit={handleAddBreaking} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 font-serif mb-1">
                      ব্রেকিং অ্যালার্ট টেক্সট (বাংলা) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: বঙ্গোপসাগরে সৃষ্ট গভীর নিম্নচাপের প্রভাবে সমুদ্রবন্দরে ৩ নম্বর সতর্ক সংকেত"
                      value={newBrkTextBn}
                      onChange={(e) => setNewBrkTextBn(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-serif focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 font-serif mb-1">
                      English Text (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cautionary signal 3 issued for maritime ports due to deep depression in Bay"
                      value={newBrkTextEn}
                      onChange={(e) => setNewBrkTextEn(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>টিকারে ফ্ল্যাশ করুন</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List of active breaking news */}
              <div className="bg-white p-5 rounded border border-stone-300 shadow-2xs space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-800 pb-2 border-b border-stone-200">
                  বর্তমানে চলমান ব্রেকিং নিউজ তালিকা ({breakingNews.length})
                </h4>

                <div className="space-y-2">
                  {breakingNews.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 rounded border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-serif font-bold text-xs sm:text-sm text-stone-900">
                            {item.textBn}
                          </p>
                          <p className="text-[11px] text-stone-400 font-mono">
                            {item.timeBn} · {item.textEn}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteBreaking(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MARKET RATES */}
          {activeTab === 'markets' && (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded border border-stone-300 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    বাণিজ্য ও শেয়ার বাজার সূচক আপডেট
                  </h3>
                </div>
                <button
                  onClick={handleSaveMarkets}
                  className="px-4 py-2 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  সংরক্ষণ করুন
                </button>
              </div>

              <div className="space-y-4">
                {tempMarketData.map((item, index) => (
                  <div
                    key={item.symbol}
                    className="p-4 bg-stone-50 rounded border border-stone-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
                  >
                    <div>
                      <span className="font-bold text-stone-900 text-sm font-serif">{item.nameBn}</span>
                      <span className="text-[11px] text-stone-500 font-mono block">{item.symbol}</span>
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-500 block">বর্তমান মান / রেট</label>
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => {
                          const updated = [...tempMarketData];
                          updated[index].value = e.target.value;
                          setTempMarketData(updated);
                        }}
                        className="w-full px-2 py-1 text-xs rounded border border-stone-300 bg-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-500 block">পরিবর্তন (Change)</label>
                      <input
                        type="text"
                        value={item.change}
                        onChange={(e) => {
                          const updated = [...tempMarketData];
                          updated[index].change = e.target.value;
                          setTempMarketData(updated);
                        }}
                        className="w-full px-2 py-1 text-xs rounded border border-stone-300 bg-white font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-3 sm:pt-0">
                      <label className="flex items-center gap-1.5 text-xs font-serif cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isPositive}
                          onChange={(e) => {
                            const updated = [...tempMarketData];
                            updated[index].isPositive = e.target.checked;
                            setTempMarketData(updated);
                          }}
                          className="accent-emerald-600 w-4 h-4"
                        />
                        <span className={item.isPositive ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                          {item.isPositive ? '▲ বৃদ্ধি (Green)' : '▼ পতন (Red)'}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: POLL MANAGEMENT */}
          {activeTab === 'poll' && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded border border-stone-300 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#C1121F]" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    ইত্তেফাক জনমত জরিপ নিয়ন্ত্রণ
                  </h3>
                </div>
                <button
                  onClick={handleSavePoll}
                  className="px-4 py-2 bg-[#C1121F] hover:bg-[#a10e1a] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  আপডেট করুন
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                    আজকের জরিপের মূল প্রশ্ন (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={pollQuestionBn}
                    onChange={(e) => setPollQuestionBn(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-serif focus:border-[#C1121F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 font-serif mb-1">
                    English Translation (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={pollQuestionEn}
                    onChange={(e) => setPollQuestionEn(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-stone-300 focus:border-[#C1121F] focus:outline-none"
                  />
                </div>

                {/* Poll Results overview */}
                <div className="p-4 bg-stone-50 rounded border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-600 font-serif">
                    <span>মোট সংগৃহীত ভোট: <strong className="text-stone-900 font-mono">{poll.totalVotes.toLocaleString()}</strong></span>
                    <button
                      onClick={handleResetPollVotes}
                      className="text-rose-700 hover:underline text-xs cursor-pointer font-serif"
                    >
                      ভোট শূন্য (Reset) করুন
                    </button>
                  </div>
                  {poll.options.map((opt) => (
                    <div key={opt.id} className="flex justify-between text-xs text-stone-700 font-serif">
                      <span>• {opt.labelBn}</span>
                      <span className="font-mono tabular-nums">{opt.votes.toLocaleString()} ভোট</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SECURITY & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Identity Box */}
              <div className="bg-white p-5 rounded border border-stone-300 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-stone-200 text-stone-900 font-serif font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#C1121F]" />
                  <span>অনুমোদিত অ্যাডমিন পরিচিতি</span>
                </div>
                <div className="text-xs text-stone-700 font-serif space-y-1">
                  <p>অনুমোদিত প্রধান সম্পাদক: <strong className="text-[#C1121F]">{adminEmail}</strong></p>
                  <p>ভূমিকা: <strong>সুপার অ্যাডমিন / প্রধান সম্পাদক (Super Admin & Editor-in-Chief)</strong></p>
                  <p>আইপি নিরাপত্তা স্তর: <strong>এনক্রিপ্টেড সেশন (Active)</strong></p>
                </div>
              </div>

              {/* Change PIN */}
              <div className="bg-white p-5 rounded border border-stone-300 shadow-2xs space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-800 pb-2 border-b border-stone-200">
                  অ্যাডমিন পিন পরিবর্তন (Change Security PIN)
                </h4>

                {pinChangeSuccess && (
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs rounded font-serif">
                    ✓ নতুন পিন সফলভাবে সংরক্ষিত হয়েছে!
                  </div>
                )}

                <form onSubmit={handleSavePin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 font-serif mb-1">
                      নতুন গোপন পিন (কমপক্ষে ৪ সংখ্যা)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="যেমন: 2026"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-stone-300 font-mono tracking-widest focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1C1917] hover:bg-stone-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    পিন আপডেট করুন
                  </button>
                </form>
              </div>

              {/* Backup & Reset */}
              <div className="bg-white p-5 rounded border border-stone-300 shadow-2xs space-y-3">
                <h4 className="font-serif font-bold text-sm text-stone-800 pb-2 border-b border-stone-200">
                  ডাটা ব্যাকআপ ও রিকভারি
                </h4>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-1.5 px-4 py-2 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-serif font-bold cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4 text-stone-600" />
                    <span>ব্যাকআপ JSON ডাউনলোড</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('আপনি কি সকল পরিবর্তন মুছে মূল প্রাথমিক সংবাদে ফিরে যেতে চান?')) {
                        onResetAllData();
                        showNotice('সকল ডাটা সফলভাবে প্রাথমিক রূপ পেয়েছে।');
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-serif font-bold cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-rose-600" />
                    <span>প্রাথমিক ডাটা রিস্টোর করুন</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
