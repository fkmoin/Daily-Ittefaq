import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  ExternalLink,
  Layers,
  Calendar,
  Eye
} from 'lucide-react';
import { EPAPER_PAGES } from '../data/newsData';
import { Language, Article } from '../types';

interface EPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectArticleById: (id: string) => void;
}

export const EPaperModal: React.FC<EPaperModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectArticleById,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredClipping, setHoveredClipping] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPage = EPAPER_PAGES[currentPageIndex];

  const handlePrevPage = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPageIndex((prev) => (prev < EPAPER_PAGES.length - 1 ? prev + 1 : prev));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Container Box */}
      <div className="bg-[#FAF8F5] w-full max-w-6xl h-[92vh] rounded-md shadow-2xl flex flex-col overflow-hidden border border-stone-300">
        
        {/* Top Control Bar */}
        <div className="bg-[#1C1917] text-stone-200 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-1 bg-[#C1121F] text-white rounded text-xs font-bold px-2 uppercase tracking-wider">
              {language === 'bn' ? 'ই-পেপার' : 'E-Paper'}
            </span>
            <div className="hidden sm:block">
              <h3 className="text-sm font-bold text-white font-serif">
                {language === 'bn' ? 'দৈনিক ইত্তেফাক মুদ্রিত সংস্করণ' : 'The Daily Ittefaq Broadsheet Edition'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {currentPage.date} · {language === 'bn' ? currentPage.nameBn : currentPage.nameEn}
              </p>
            </div>
          </div>

          {/* Center: Page Jump controls */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="p-1 rounded hover:bg-stone-800 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 py-0.5 bg-stone-800 rounded text-stone-100 tabular-nums">
              {language === 'bn' ? `পৃষ্ঠা ${currentPage.pageNumber}/${EPAPER_PAGES.length}` : `Page ${currentPage.pageNumber}/${EPAPER_PAGES.length}`}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === EPAPER_PAGES.length - 1}
              className="p-1 rounded hover:bg-stone-800 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Zoom & Close Tools */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomOut}
              aria-label="Zoom out"
              className="p-1.5 hover:bg-stone-800 rounded transition-colors text-stone-300 cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-stone-400 w-10 text-center tabular-nums">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              aria-label="Zoom in"
              className="p-1.5 hover:bg-stone-800 rounded transition-colors text-stone-300 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-stone-700 mx-1" />
            <button
              onClick={() => window.print()}
              aria-label="Print edition"
              className="p-1.5 hover:bg-stone-800 rounded transition-colors text-stone-300 cursor-pointer hidden sm:inline-flex"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close E-Paper reader"
              className="p-1.5 hover:bg-stone-800 text-stone-400 hover:text-white rounded transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: Thumbnails Sidebar + Interactive Broadsheet Viewer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Thumbnails Rail */}
          <div className="w-32 sm:w-44 bg-stone-100 border-r border-stone-300 p-2 overflow-y-auto space-y-2 shrink-0 hidden md:block">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block px-1 mb-1">
              {language === 'bn' ? 'সকল পাতা' : 'Pages'}
            </span>
            {EPAPER_PAGES.map((page, idx) => (
              <button
                key={page.pageNumber}
                onClick={() => {
                  setCurrentPageIndex(idx);
                  setZoomLevel(1);
                }}
                className={`w-full text-left p-1.5 rounded transition-all cursor-pointer block border ${
                  currentPageIndex === idx
                    ? 'border-[#C1121F] bg-white shadow-xs'
                    : 'border-stone-300 hover:border-stone-400 bg-stone-50'
                }`}
              >
                <div className="h-28 overflow-hidden rounded bg-stone-200 mb-1 border border-stone-200">
                  <img
                    src={page.imageUrl}
                    alt={page.nameBn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] font-bold text-stone-800 truncate font-serif">
                  {language === 'bn' ? page.nameBn : page.nameEn}
                </p>
                <p className="text-[10px] text-stone-500 font-mono">পৃষ্ঠা {page.pageNumber}</p>
              </button>
            ))}
          </div>

          {/* Central Broadsheet Paper Canvas */}
          <div className="flex-1 bg-stone-200/90 overflow-auto p-4 sm:p-8 flex items-center justify-center">
            <div 
              className="bg-white shadow-2xl border border-stone-400 max-w-3xl w-full p-6 sm:p-8 relative transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            >
              {/* Authentic Printed Broadsheet Header Header */}
              <div className="border-b-2 border-stone-900 pb-3 mb-4 text-center">
                <div className="flex items-center justify-between text-[10px] text-stone-600 font-serif border-b border-stone-300 pb-1 mb-2">
                  <span>বর্ষ ৭৩ · সংখ্যা ২৯৪</span>
                  <span className="font-bold text-[#C1121F]">ঢাকা, ১২ অক্টোবর ২০২৬</span>
                  <span>দাম: ৮ টাকা</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-serif text-stone-950 tracking-tight">
                  {language === 'bn' ? 'দৈনিক ইত্তেফাক' : 'The Daily Ittefaq'}
                </h1>
                <p className="text-[11px] text-stone-600 font-serif mt-1">
                  প্রতিষ্ঠাতা: তোফাজ্জল হোসেন মানিক মিয়া · {language === 'bn' ? currentPage.nameBn : currentPage.nameEn}
                </p>
              </div>

              {/* Broadsheet Page Image with Clickable Article Hotspots */}
              <div className="relative border border-stone-300 bg-stone-100 rounded overflow-hidden">
                <img
                  src={currentPage.imageUrl}
                  alt={currentPage.nameBn}
                  className="w-full h-auto object-cover max-h-[520px]"
                />

                {/* Interactive Hotspot Overlays */}
                {currentPage.clippings.map((clip) => {
                  const isHovered = hoveredClipping === clip.id;
                  return (
                    <div
                      key={clip.id}
                      onMouseEnter={() => setHoveredClipping(clip.id)}
                      onMouseLeave={() => setHoveredClipping(null)}
                      onClick={() => {
                        if (clip.articleId) {
                          onSelectArticleById(clip.articleId);
                          onClose();
                        }
                      }}
                      style={{
                        position: 'absolute',
                        top: clip.box.top,
                        left: clip.box.left,
                        width: clip.box.width,
                        height: clip.box.height,
                      }}
                      className={`cursor-pointer transition-all border ${
                        isHovered
                          ? 'border-[#C1121F] bg-[#C1121F]/20 shadow-md ring-2 ring-[#C1121F]'
                          : 'border-amber-400/60 bg-amber-200/10 hover:border-[#C1121F]'
                      }`}
                    >
                      <div className="absolute bottom-1 left-1 bg-stone-900/90 text-white text-[10px] font-serif px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                        <Eye className="w-3 h-3 text-amber-300" />
                        <span className="truncate max-w-[140px]">
                          {language === 'bn' ? clip.titleBn : clip.titleEn}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Broadsheet Columns Footer */}
              <div className="mt-4 pt-3 border-t border-stone-300 flex items-center justify-between text-[11px] text-stone-500 font-serif">
                <span>১ আর কে মিশন রোড, মতিঝিল, ঢাকা থেকে প্রকাশিত</span>
                <span className="text-[#C1121F] font-semibold">
                  {language === 'bn' ? 'ক্লিক করে যেকোনো সংবাদ পড়তে পারেন' : 'Click any highlighted section to read'}
                </span>
                <span>পৃষ্ঠা নং: {currentPage.pageNumber}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
