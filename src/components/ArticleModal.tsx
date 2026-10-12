import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Printer, 
  Facebook, 
  Twitter, 
  Copy, 
  Check, 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  Eye, 
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { Article, Language, ArticleComment } from '../types';
import { SAMPLE_COMMENTS } from '../data/newsData';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  relatedArticles: Article[];
  onSelectRelated: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  language,
  isBookmarked,
  onToggleBookmark,
  relatedArticles,
  onSelectRelated,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>(SAMPLE_COMMENTS);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Audio simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2 * playbackSpeed;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, playbackSpeed]);

  if (!isOpen || !article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newC: ArticleComment = {
      id: `c-${Date.now()}`,
      authorName: newCommentName.trim() || (language === 'bn' ? 'সচেতন পাঠক' : 'Reader'),
      timeAgo: language === 'bn' ? 'এইমাত্র' : 'Just now',
      comment: newCommentText.trim(),
      likes: 1,
    };

    setComments([newC, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const fontSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl my-auto rounded-lg shadow-2xl border border-stone-300 max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Sticky Article Header Bar */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'ফিরে যান' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-stone-100 rounded p-0.5 border border-stone-200 text-xs font-serif">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white font-bold shadow-2xs text-stone-900' : 'text-stone-500'}`}
              >
                অ
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded cursor-pointer text-sm ${fontSize === 'large' ? 'bg-white font-bold shadow-2xs text-stone-900' : 'text-stone-500'}`}
              >
                অ+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded cursor-pointer text-base ${fontSize === 'xlarge' ? 'bg-white font-bold shadow-2xs text-stone-900' : 'text-stone-500'}`}
              >
                অ++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              aria-label="Bookmark article"
              className={`p-1.5 rounded border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-rose-50 border-[#C1121F] text-[#C1121F]' 
                  : 'bg-white border-stone-300 text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Print */}
            <button
              onClick={() => window.print()}
              aria-label="Print article"
              className="p-1.5 rounded border border-stone-300 bg-white text-stone-600 hover:text-stone-900 transition-colors cursor-pointer hidden sm:block"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              aria-label="Close article"
              className="p-1.5 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* Top Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
              <span className="text-[#C1121F] font-serif font-bold uppercase tracking-wider text-xs">
                {language === 'bn' ? article.kicker : article.kickerEn}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{language === 'bn' ? article.categoryLabelBn : article.categoryLabelEn}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {language === 'bn' ? article.publishedAt : article.publishedAtEn}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif text-[#1C1917] leading-tight tracking-tight">
              {language === 'bn' ? article.title : article.titleEn}
            </h1>

            {/* Byline Deck */}
            <div className="pt-2 pb-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif font-bold text-xs">
                  ই
                </div>
                <div>
                  <p className="font-bold text-stone-900">{article.author}</p>
                  <p className="text-stone-500">{article.authorRole}</p>
                </div>
              </div>

              {/* Views and Read time */}
              <div className="flex items-center gap-3 text-stone-500 font-sans">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="font-mono tabular-nums">{article.viewsCount.toLocaleString()}</span> বার পঠিত
                </span>
                <span aria-hidden="true">·</span>
                <span>{language === 'bn' ? article.readTime : article.readTimeEn}</span>
              </div>
            </div>
          </div>

          {/* Audio Reader Widget (সংবাদটি শুনুন) */}
          <div className="bg-stone-100 p-4 rounded-md border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Pause reading' : 'Play reading'}
                className="w-10 h-10 rounded-full bg-[#C1121F] hover:bg-[#a10e1a] text-white flex items-center justify-center shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-bold text-stone-800 font-serif flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#C1121F]" />
                  <span>{language === 'bn' ? 'সংবাদটি অডিওতে শুনুন' : 'Listen to this report'}</span>
                </p>
                <p className="text-[11px] text-stone-500 font-sans">
                  {isPlayingAudio 
                    ? (language === 'bn' ? 'অডিও পাঠ চলছে...' : 'Audio playing...') 
                    : (language === 'bn' ? 'শুনতে প্লে বাটনে চাপুন' : 'Click play to listen')}
                </p>
              </div>
            </div>

            {/* Audio Progress Bar & Speed */}
            <div className="w-full sm:flex-1 sm:max-w-xs flex items-center gap-3">
              <div className="flex-1 bg-stone-300 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#C1121F] h-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1)}
                className="px-2 py-0.5 rounded bg-white text-stone-700 text-[10px] font-mono font-bold border border-stone-300 cursor-pointer"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="rounded overflow-hidden bg-stone-200 border border-stone-300">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[460px] object-cover"
              />
              <div className="p-3 bg-stone-100 border-t border-stone-200 text-xs italic font-serif text-stone-700">
                {language === 'bn' ? article.caption : article.captionEn || article.caption}
              </div>
            </div>
          )}

          {/* Summary Callout Deck */}
          <div className="p-4 bg-amber-50/60 rounded border-l-4 border-amber-600 italic font-serif text-stone-800 text-base sm:text-lg">
            {language === 'bn' ? article.summary : article.summaryEn}
          </div>

          {/* Article Prose Paragraphs with Drop Cap */}
          <div className={`space-y-5 text-stone-900 font-serif ${fontSizeClass}`}>
            {(language === 'bn' ? article.content : article.contentEn).map((para, idx) => (
              <p 
                key={idx} 
                className={idx === 0 ? 'newspaper-drop-cap' : ''}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 font-serif">বিষয়:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-stone-200 text-stone-700 rounded text-xs font-serif hover:bg-stone-300 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share Strip */}
          <div className="p-4 bg-white rounded border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-stone-700 font-serif">
              {language === 'bn' ? 'সংবাদটি শেয়ার করুন:' : 'Share this article:'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors font-medium cursor-pointer border border-stone-300"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
              </button>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="pt-6 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#C1121F]" />
                <span>{language === 'bn' ? `মন্তব্য সমূহ (${comments.length})` : `Reader Comments (${comments.length})`}</span>
              </h3>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleAddComment} className="bg-white p-4 rounded border border-stone-300 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'আপনার নাম (ঐচ্ছিক)' : 'Your Name (Optional)'}
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="px-3 py-2 text-xs rounded border border-stone-300 focus:outline-none focus:border-[#C1121F] bg-stone-50"
                />
              </div>
              <textarea
                rows={3}
                placeholder={language === 'bn' ? 'সংবাদের বিষয়ে আপনার মূল্যবান মতামত লিখুন...' : 'Write your comment on this story...'}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 focus:outline-none focus:border-[#C1121F] bg-stone-50"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-4 py-1.5 bg-[#C1121F] hover:bg-[#a10e1a] disabled:opacity-40 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'মন্তব্য প্রকাশ করুন' : 'Post Comment'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-3 bg-white rounded border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">{c.authorName}</span>
                    <span className="text-stone-400 font-mono text-[11px]">{c.timeAgo}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                    {c.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles Strip */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-stone-200">
              <h4 className="font-serif font-bold text-lg text-stone-900 mb-4">
                {language === 'bn' ? 'আরও পড়ুন' : 'Related Stories'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-white rounded border border-stone-200 hover:border-stone-400 transition-colors cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-[#C1121F] mb-1">
                        {language === 'bn' ? rel.categoryLabelBn : rel.categoryLabelEn}
                      </p>
                      <h5 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#C1121F] transition-colors line-clamp-2">
                        {language === 'bn' ? rel.title : rel.titleEn}
                      </h5>
                    </div>
                    <span className="text-[11px] text-stone-400 mt-2 font-mono">
                      {language === 'bn' ? rel.readTime : rel.readTimeEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
