import React, { useMemo, useState } from 'react';
import {
  Newspaper,
  Search,
  Bookmark,
  ExternalLink,
  Share2,
  Calendar,
  ArrowLeft,
  Info,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { NewsArticle, NewsCategory } from '../types';
import { formatDate } from '../utils/formatters';

const NEWS_CATEGORIES: ('All' | NewsCategory)[] = [
  'All',
  'Agriculture policy',
  'Crop advisories',
  'Weather and seasonal alerts',
  'Agricultural markets and prices',
  'Farming technology',
  'Research and innovation',
  'Soil and water conservation',
  'Government announcements',
  'Livestock and allied agriculture',
];

export const NewsPage: React.FC = () => {
  const { newsArticles, newsBookmarks, toggleNewsBookmark } = useAgriPulse();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | NewsCategory>('All');
  const [dateFilterFrom, setDateFilterFrom] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return newsArticles.filter((art) => {
      if (showSavedOnly && !newsBookmarks.includes(art.id)) return false;
      if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
      if (dateFilterFrom && art.publishedDate < dateFilterFrom) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const hay = `${art.headline} ${art.summary} ${art.category} ${art.tags.join(
          ' '
        )} ${art.publisher}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [newsArticles, showSavedOnly, newsBookmarks, selectedCategory, dateFilterFrom, searchQuery]);

  const handleShare = (art: NewsArticle) => {
    const shareText = `${art.headline} — ${art.summary} (${art.sourceAttribution})`;
    if (navigator.share) {
      void navigator.share({ title: art.headline, text: shareText });
    } else {
      void navigator.clipboard?.writeText(shareText);
      setShareFeedback(`Copied summary of "${art.headline.slice(0, 42)}..." to clipboard.`);
      setTimeout(() => setShareFeedback(null), 3000);
    }
  };

  // --- ARTICLE DETAIL VIEW ---
  if (activeArticle) {
    const relatedArticles = newsArticles
      .filter((a) => a.id !== activeArticle.id && a.category === activeArticle.category)
      .concat(
        newsArticles.filter(
          (a) => a.id !== activeArticle.id && a.category !== activeArticle.category
        )
      )
      .slice(0, 3);

    const isSaved = newsBookmarks.includes(activeArticle.id);

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Agricultural News</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleShare(activeArticle)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => toggleNewsBookmark(activeArticle.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border ${
                isSaved
                  ? 'bg-harvest-100 border-harvest-400 text-harvest-950'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Article'}</span>
            </button>
          </div>
        </div>

        {shareFeedback && (
          <div className="p-3 rounded-xl bg-leaf-50 border border-leaf-300 text-forest-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-leaf-600" />
            <span>{shareFeedback}</span>
          </div>
        )}

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-forest-800 text-white">
              {activeArticle.category}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
              Demo Educational Article
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(activeArticle.publishedDate)}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {activeArticle.headline}
          </h2>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Publisher:</strong> {activeArticle.publisher}
            </span>
            <span>
              <strong>Attribution:</strong> {activeArticle.sourceAttribution}
            </span>
          </div>

          <div className="space-y-3.5 text-sm text-slate-800 leading-relaxed">
            {activeArticle.fullContent.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-950'
                    : ''
                }
              >
                {para}
              </p>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {activeArticle.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                >
                  #{t}
                </span>
              ))}
            </div>

            {activeArticle.sourceUrl && (
              <a
                href={activeArticle.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold"
              >
                <span>Open Official Reference Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setActiveArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-forest-400 cursor-pointer flex flex-col justify-between gap-2 text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-forest-800">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-slate-900 mt-1 line-clamp-2">
                    {rel.headline}
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-forest-800">Read More →</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // --- MAIN NEWS FEED VIEW ---
  return (
    <div className="space-y-6">
      {/* Data Integrity Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            News Feed Mode: Demo Agronomy & Policy Educational Articles (Offline Demo Ready)
          </p>
          <p className="mt-0.5 text-amber-900">
            No live external news API is configured in this demo environment. Below are clearly labelled educational articles covering policy, crop advisories, weather preparedness, and market grading, with links to official reference portals. AGRIPULSE never invents breaking news, live market prices, or fake quotes.
          </p>
        </div>
      </div>

      {shareFeedback && (
        <div className="p-3 rounded-xl bg-leaf-50 border border-leaf-300 text-forest-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-leaf-600" />
          <span>{shareFeedback}</span>
        </div>
      )}

      {/* Search, Date Filter, Saved Toggle & Category Pills */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search agricultural news"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by crop, topic, Soil Health Card, IPM, moisture..."
              className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <label htmlFor="news-date-from" className="font-semibold text-slate-600 shrink-0">
              From Date:
            </label>
            <input
              id="news-date-from"
              type="date"
              value={dateFilterFrom}
              onChange={(e) => setDateFilterFrom(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowSavedOnly((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold border transition-colors ${
                showSavedOnly
                  ? 'bg-harvest-100 border-harvest-400 text-harvest-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarked ({newsBookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-white'
                  : 'bg-slate-100 hover:bg-forest-50 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-xs text-slate-500">
          No news articles match your active search or date filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((art) => {
            const isSaved = newsBookmarks.includes(art.id);
            return (
              <article
                key={art.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-forest-300 transition-all"
              >
                <div>
                  {/* Visual Category Banner Thumbnail */}
                  <div className="h-28 rounded-xl bg-gradient-to-br from-forest-900 to-forest-800 text-white p-3.5 flex flex-col justify-between mb-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-leaf-500/20 text-leaf-300 border border-leaf-400/30">
                        {art.category}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-200">
                        Demo Article
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-forest-200">
                      <span className="inline-flex items-center gap-1">
                        <Newspaper className="w-3.5 h-3.5 text-leaf-400" />
                        {art.publisher.split('(')[0].trim()}
                      </span>
                      <span>{formatDate(art.publishedDate)}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setActiveArticle(art)}
                    className="text-sm font-bold text-slate-900 hover:text-forest-800 cursor-pointer leading-snug"
                  >
                    {art.headline}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(art)}
                    className="font-bold text-forest-800 hover:underline"
                  >
                    Read More →
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleShare(art)}
                      aria-label={`Share ${art.headline}`}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleNewsBookmark(art.id)}
                      aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
                      className={`p-1.5 rounded-lg border ${
                        isSaved
                          ? 'bg-harvest-100 border-harvest-300 text-harvest-900'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
