import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark,
  Volume2,
  Sprout,
  Languages,
  ArrowRight,
  Clock,
  X,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { DictionaryCategory, DictionaryEntry } from '../types';

const DICTIONARY_CATEGORIES: ('All' | DictionaryCategory)[] = [
  'All',
  'Soil Science',
  'Soil Moisture & pH',
  'Irrigation',
  'Seeds & Germination',
  'Crop Growth Stages',
  'Fertilizers',
  'Plant Nutrients',
  'Pest Management',
  'Plant Diseases',
  'Weather & Rainfall',
  'Farm Machinery',
  'Sustainable Farming',
  'Digital Farming & Sensors',
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const DictionaryPage: React.FC = () => {
  const {
    dictionary,
    dictBookmarks,
    toggleDictBookmark,
    dictRecent,
    recordDictView,
    profile,
    updateProfile,
  } = useAgriPulse();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<'All' | DictionaryCategory>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'all' | 'bookmarks' | 'recent'>('all');
  const [langMode, setLangMode] = useState<'bilingual' | 'en' | 'hi'>(
    profile.preferences.language === 'hi' ? 'hi' : 'bilingual'
  );
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(
    dictionary[0] || null
  );

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);

  const filteredEntries = useMemo(() => {
    return dictionary.filter((entry) => {
      if (viewMode === 'bookmarks' && !dictBookmarks.includes(entry.id)) return false;
      if (viewMode === 'recent' && !dictRecent.includes(entry.id)) return false;
      if (selectedCategory !== 'All' && entry.category !== selectedCategory) return false;
      if (
        selectedLetter !== 'All' &&
        !entry.term.toUpperCase().startsWith(selectedLetter)
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const hay = `${entry.term} ${entry.hindiTerm || ''} ${entry.simpleDefinition} ${
          entry.farmerFriendlyExplanation
        } ${entry.category} ${entry.relevantCrops.join(' ')} ${entry.relatedTerms.join(
          ' '
        )}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    dictionary,
    viewMode,
    dictBookmarks,
    dictRecent,
    selectedCategory,
    selectedLetter,
    searchQuery,
  ]);

  const handleSelectEntry = (entry: DictionaryEntry) => {
    setSelectedEntry(entry);
    recordDictView(entry.id);
  };

  const handleRelatedTermClick = (relatedName: string) => {
    const exactMatch = dictionary.find(
      (d) =>
        d.term.toLowerCase() === relatedName.toLowerCase() ||
        d.term.toLowerCase().includes(relatedName.toLowerCase()) ||
        relatedName.toLowerCase().includes(d.term.toLowerCase().split('(')[0].trim())
    );
    if (exactMatch) {
      setSelectedCategory('All');
      setSelectedLetter('All');
      setViewMode('all');
      setSearchQuery('');
      handleSelectEntry(exactMatch);
    } else {
      setSelectedCategory('All');
      setSelectedLetter('All');
      setViewMode('all');
      setSearchQuery(relatedName);
    }
  };

  const handleLanguageChange = (nextLang: 'bilingual' | 'en' | 'hi') => {
    setLangMode(nextLang);
    if (nextLang === 'en' || nextLang === 'hi') {
      updateProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          language: nextLang,
        },
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Language Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200 mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{dictionary.length} Farmer-Friendly Agronomy Terms</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Agricultural Learning Dictionary (English & हिंदी)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Simple definitions, practical field examples, and why each concept matters on your farm.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 self-start lg:self-auto">
          <Languages className="w-4 h-4 text-forest-700 ml-2" />
          {[
            { id: 'bilingual', label: 'English + हिंदी' },
            { id: 'en', label: 'English Only' },
            { id: 'hi', label: 'हिंदी (Hindi)' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleLanguageChange(opt.id as typeof langMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                langMode === opt.id
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search, View Tabs (All / Bookmarks / Recent), Category & Alphabet Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Instant Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search agricultural dictionary terms"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (searchParams.has('q')) setSearchParams({});
              }}
              placeholder="Search terms (e.g., Soil pH, CRI, Drip, Tensiometer, IPM, Khaira, उकठा)..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* All / Bookmarks / Recently Viewed Filter */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                viewMode === 'all'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({dictionary.length})
            </button>
            <button
              type="button"
              onClick={() => setViewMode('bookmarks')}
              className={`px-3 py-1.5 rounded-lg font-bold inline-flex items-center gap-1 transition-colors ${
                viewMode === 'bookmarks'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-harvest-600" />
              <span>Bookmarked ({dictBookmarks.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('recent')}
              className={`px-3 py-1.5 rounded-lg font-bold inline-flex items-center gap-1 transition-colors ${
                viewMode === 'recent'
                  ? 'bg-white text-forest-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              <span>Recent ({dictRecent.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {DICTIONARY_CATEGORIES.map((cat) => (
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

        {/* Alphabetical Bar */}
        <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">A–Z:</span>
          <button
            type="button"
            onClick={() => setSelectedLetter('All')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              selectedLetter === 'All'
                ? 'bg-forest-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={`w-6 h-6 rounded text-[11px] font-bold flex items-center justify-center ${
                selectedLetter === letter
                  ? 'bg-forest-800 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dictionary Master-Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List of Matching Terms (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col max-h-[680px]">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-800">
              Showing {filteredEntries.length} Term(s)
            </span>
            {(selectedCategory !== 'All' ||
              selectedLetter !== 'All' ||
              searchQuery ||
              viewMode !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLetter('All');
                  setSearchQuery('');
                  setViewMode('all');
                }}
                className="text-forest-800 font-bold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No dictionary entries match your current filter. Try clearing the search or letter filter.
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const isSelected = selectedEntry?.id === entry.id;
                const isBookmarked = dictBookmarks.includes(entry.id);
                return (
                  <div
                    key={entry.id}
                    onClick={() => handleSelectEntry(entry)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSelectEntry(entry);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-forest-50 border-forest-700 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-forest-100 text-forest-800">
                          {entry.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">
                          {entry.term}
                        </h3>
                        {entry.hindiTerm && (langMode === 'bilingual' || langMode === 'hi') && (
                          <p className="text-xs font-semibold text-forest-800 mt-0.5">
                            {entry.hindiTerm}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDictBookmark(entry.id);
                        }}
                        aria-label={
                          isBookmarked
                            ? `Remove ${entry.term} from bookmarks`
                            : `Bookmark ${entry.term}`
                        }
                        className={`p-1.5 rounded-lg border ${
                          isBookmarked
                            ? 'bg-harvest-100 border-harvest-300 text-harvest-800'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                      {langMode === 'hi' && entry.hindiDefinition
                        ? entry.hindiDefinition
                        : entry.simpleDefinition}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detailed Entry View (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {!selectedEntry ? (
            <div className="h-full flex items-center justify-center text-xs text-slate-500 py-16">
              Select any term on the left to read its full explanation, practical farm example, and related terms.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-forest-800 text-white">
                      {selectedEntry.category}
                    </span>
                    {selectedEntry.pronunciation && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        <Volume2 className="w-3.5 h-3.5 text-forest-700" />
                        <span>Pronunciation: {selectedEntry.pronunciation}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {selectedEntry.term}
                  </h3>
                  {selectedEntry.hindiTerm && (
                    <p className="text-base font-bold text-forest-800 mt-1">
                      {selectedEntry.hindiTerm}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleDictBookmark(selectedEntry.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors shrink-0 ${
                    dictBookmarks.includes(selectedEntry.id)
                      ? 'bg-harvest-100 border-harvest-400 text-harvest-950'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>
                    {dictBookmarks.includes(selectedEntry.id) ? 'Bookmarked' : 'Bookmark Term'}
                  </span>
                </button>
              </div>

              {/* Simple Definition */}
              <div className="p-4 rounded-xl bg-forest-50/70 border border-forest-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900">
                  Simple Definition
                </h4>
                {(langMode === 'en' || langMode === 'bilingual') && (
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {selectedEntry.simpleDefinition}
                  </p>
                )}
                {(langMode === 'hi' || langMode === 'bilingual') && (
                  <p className="text-sm font-medium text-forest-950 leading-relaxed pt-1 border-t border-forest-200/60">
                    <strong>हिंदी परिभाषा:</strong>{' '}
                    {selectedEntry.hindiDefinition ||
                      'इस शब्द का हिंदी अनुवाद शीघ्र जोड़ा जाएगा (English definition shown above).'}
                  </p>
                )}
              </div>

              {/* Farmer-Friendly Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Explanation in Farmer-Friendly Language
                </h4>
                {(langMode === 'en' || langMode === 'bilingual') && (
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {selectedEntry.farmerFriendlyExplanation}
                  </p>
                )}
                {(langMode === 'hi' || langMode === 'bilingual') && (
                  <p className="text-sm text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                    <strong>किसान-सुलभ व्याख्या:</strong>{' '}
                    {selectedEntry.hindiExplanation ||
                      'हिंदी व्याख्या उपलब्ध नहीं है; कृपया अंग्रेजी विवरण देखें।'}
                  </p>
                )}
              </div>

              {/* Practical Example & Why It Matters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 mb-1.5">
                    Practical Farm Example
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {selectedEntry.practicalExample}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-leaf-50/70 border border-leaf-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-leaf-950 mb-1.5">
                    Why This Concept Matters
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {selectedEntry.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Relevant Crops */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Relevant Crops & Farming Situations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEntry.relevantCrops.map((crop) => (
                    <span
                      key={crop}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
                    >
                      <Sprout className="w-3.5 h-3.5 text-leaf-600" />
                      <span>{crop}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Terms Navigation */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Related Terms (Click to Navigate)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.relatedTerms.map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => handleRelatedTermClick(rel)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 text-xs font-bold transition-colors"
                    >
                      <span>{rel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
