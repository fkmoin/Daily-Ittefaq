import React from 'react';
import { Trophy, Activity, ArrowRight } from 'lucide-react';
import { Article, Language } from '../types';

interface SportsWidgetProps {
  articles: Article[];
  language: Language;
  onSelectArticle: (article: Article) => void;
}

export const SportsWidget: React.FC<SportsWidgetProps> = ({
  articles,
  language,
  onSelectArticle,
}) => {
  const sportsArticles = articles.filter((a) => a.category === 'sports');
  const mainSports = sportsArticles[0] || articles[2];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-stone-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-stone-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-emerald-700 text-white rounded-xs">
            <Trophy className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              {language === 'bn' ? 'খেলাধুলা ও ক্রিকেট লাইভ' : 'Sports & Cricket Live'}
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              {language === 'bn' ? 'মাঠের লড়াই, স্কোরবোর্ড ও আন্তর্জাতিক ক্রীড়াঙ্গন' : 'Live scores, tournament reports and pitch updates'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cricket Live Score Matchbox (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#111827] to-[#1F2937] text-white p-5 rounded border border-stone-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-300 pb-3 border-b border-stone-700">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                {language === 'bn' ? 'লাইভ ম্যাচ' : 'Live Test Match'}
              </span>
              <span className="text-stone-400 text-[11px]">শেরে বাংলা স্টেডিয়াম, মিরপুর</span>
            </div>

            {/* Scorecard Teams */}
            <div className="my-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">BD</div>
                  <span className="font-semibold text-sm">বাংলাদেশ</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-lg text-emerald-400 tabular-nums">২৮৪/৫</span>
                  <span className="text-[11px] text-stone-400 font-mono ml-1">(৭৮.২ ওভার)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-stone-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-bold">SL</div>
                  <span className="font-medium text-sm text-stone-300">শ্রীলঙ্কা</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm tabular-nums text-stone-300">১৮৮ অলআউট</span>
                  <span className="text-[11px] text-stone-400 font-mono ml-1">(৫৬.৪ ওভার)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-800/80 rounded text-xs text-stone-300 space-y-1 border border-stone-700/60">
              <p className="text-amber-300 font-serif font-medium">
                {language === 'bn' ? 'বাংলাদেশ ৯৬ রানে এগিয়ে (২য় দিন, তৃতীয় সেশন)' : 'Bangladesh leads by 96 runs (Day 2, Session 3)'}
              </p>
              <p className="text-stone-400 text-[11px]">
                ক্রিজে অপরাজিত: সাকিব ৫৪* (৭২), মিরাজ ৩২* (৪৬)
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-700/80 flex items-center justify-between text-xs text-stone-400">
            <span>বিশ্ব টেস্ট চ্যাম্পিয়নশিপ</span>
            <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">
              {language === 'bn' ? 'পূর্ণাঙ্গ স্কোরকার্ড →' : 'Full Scorecard →'}
            </span>
          </div>
        </div>

        {/* Center & Right: Featured Sports News with Dynamic Photo (8 cols) */}
        <div 
          onClick={() => onSelectArticle(mainSports)}
          className="lg:col-span-8 bg-white p-5 rounded border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 shadow-2xs hover:shadow-xs"
        >
          <div className="md:w-1/2 overflow-hidden rounded bg-stone-100 shrink-0">
            <img
              src={mainSports.imageUrl}
              alt={mainSports.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/cricket_match_action_1791785189371.jpg';
              }}
              className="w-full h-56 md:h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="text-[#C1121F] font-serif font-bold uppercase">
                  {language === 'bn' ? mainSports.kicker : mainSports.kickerEn}
                </span>
                <span aria-hidden="true">·</span>
                <span>{language === 'bn' ? mainSports.publishedAt.split(',')[1]?.trim() : mainSports.publishedAtEn}</span>
              </div>

              <h4 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-[#C1121F] transition-colors leading-tight mb-3">
                {language === 'bn' ? mainSports.title : mainSports.titleEn}
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 font-serif line-clamp-3 leading-relaxed">
                {language === 'bn' ? mainSports.summary : mainSports.summaryEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="font-medium text-stone-800">{mainSports.author}</span>
              <span className="text-[#C1121F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{language === 'bn' ? 'প্রতিবেদন পড়ুন' : 'Read Report'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
