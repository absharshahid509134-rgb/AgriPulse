import React, { useMemo, useState } from 'react';
import {
  Landmark,
  Search,
  ExternalLink,
  CheckSquare,
  Info,
  FileText,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { GovernmentScheme, SchemeCategory } from '../types';

const SCHEME_CATEGORIES: ('All' | SchemeCategory)[] = [
  'All',
  'Farmer income support',
  'Crop insurance',
  'Agricultural credit',
  'Irrigation support',
  'Farm mechanization',
  'Soil testing',
  'Horticulture assistance',
  'Organic and sustainable agriculture',
  'Farmer-producer organizations',
  'State-specific agricultural assistance',
];

const STATE_OPTIONS = [
  'All States',
  'Haryana',
  'Punjab',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Rajasthan',
  'Maharashtra',
  'Gujarat',
  'Bihar',
  'Karnataka',
];

const BENEFICIARY_OPTIONS = [
  'All Groups',
  'Small & Marginal Farmers',
  'All Landholding Farmers',
  'Tenant / Sharecroppers',
  'Women Farmers',
  'FPOs & Cooperatives',
];

export const SchemesPage: React.FC = () => {
  const { schemes, profile } = useAgriPulse();

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedCategory, setSelectedCategory] = useState<'All' | SchemeCategory>('All');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string>('All Groups');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Interactive Questionnaire State
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [qState, setQState] = useState(profile.state || 'Haryana');
  const [qLandHolding, setQLandHolding] = useState<
    'Small & Marginal (< 2 Hectares)' | 'Medium / Large Holding' | 'Tenant / Sharecropper'
  >('Small & Marginal (< 2 Hectares)');
  const [qPrimaryNeed, setQPrimaryNeed] = useState<
    'All Needs' | 'Income & Credit' | 'Crop Insurance' | 'Drip / Sprinkler Irrigation' | 'Machinery & Soil Testing' | 'Horticulture & Organic'
  >('All Needs');
  const [questionnaireApplied, setQuestionnaireApplied] = useState(false);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      if (
        selectedState !== 'All States' &&
        s.applicability !== 'National (All India)' &&
        !s.applicableStates.includes(selectedState)
      ) {
        return false;
      }
      if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
      if (
        selectedBeneficiary !== 'All Groups' &&
        !s.beneficiaryGroups.includes(
          selectedBeneficiary as GovernmentScheme['beneficiaryGroups'][number]
        )
      ) {
        return false;
      }
      if (selectedStatus !== 'All' && s.applicationStatusLabel !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const hay = `${s.name} ${s.shortCode} ${s.department} ${s.category} ${s.shortExplanation}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // If questionnaire filter is active
      if (questionnaireApplied) {
        const stateMatch =
          s.applicability === 'National (All India)' || s.applicableStates.includes(qState);
        if (!stateMatch) return false;

        if (
          qLandHolding === 'Tenant / Sharecropper' &&
          !s.beneficiaryGroups.includes('Tenant / Sharecroppers')
        ) {
          return false;
        }

        if (qPrimaryNeed === 'Income & Credit') {
          if (
            s.category !== 'Farmer income support' &&
            s.category !== 'Agricultural credit'
          )
            return false;
        } else if (qPrimaryNeed === 'Crop Insurance') {
          if (s.category !== 'Crop insurance') return false;
        } else if (qPrimaryNeed === 'Drip / Sprinkler Irrigation') {
          if (s.category !== 'Irrigation support') return false;
        } else if (qPrimaryNeed === 'Machinery & Soil Testing') {
          if (s.category !== 'Farm mechanization' && s.category !== 'Soil testing')
            return false;
        } else if (qPrimaryNeed === 'Horticulture & Organic') {
          if (
            s.category !== 'Horticulture assistance' &&
            s.category !== 'Organic and sustainable agriculture'
          )
            return false;
        }
      }

      return true;
    });
  }, [
    schemes,
    selectedState,
    selectedCategory,
    selectedBeneficiary,
    selectedStatus,
    searchQuery,
    questionnaireApplied,
    qState,
    qLandHolding,
    qPrimaryNeed,
  ]);

  const handleRunQuestionnaire = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionnaireApplied(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Official Source & Non-Guarantee Disclosure */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            Government Schemes Discovery (Static Demo Reference Directory)
          </p>
          <p className="mt-0.5 text-amber-900 leading-relaxed">
            These records are provided as a demonstration reference directory for Indian farmers. AGRIPULSE does not claim government endorsement and never issues official eligibility approvals. Application windows and subsidy norms change periodically—always check the official <code>.gov.in</code> or <code>.nic.in</code> portal for current status.
          </p>
        </div>
      </div>

      {/* 2. Header & Eligibility Questionnaire Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-forest-800" />
            <span>National & State Agricultural Schemes Directory</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Explore income support, crop insurance, KCC credit, micro-irrigation, mechanization, soil testing, and FPO schemes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowQuestionnaire((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm shrink-0"
        >
          <CheckSquare className="w-4 h-4 text-leaf-300" />
          <span>
            {showQuestionnaire
              ? 'Hide Scheme Finder Questionnaire'
              : 'Open Farmer Scheme Finder Questionnaire'}
          </span>
        </button>
      </div>

      {/* 3. Farmer Questionnaire (Labels results strictly as "Potentially relevant schemes") */}
      {showQuestionnaire && (
        <form
          onSubmit={handleRunQuestionnaire}
          className="bg-forest-50/90 rounded-2xl border-2 border-forest-600 p-5 shadow-sm space-y-4 text-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-forest-200">
            <div>
              <h3 className="text-sm font-bold text-forest-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-forest-700" />
                <span>Farmer Scheme Discovery Questionnaire</span>
              </h3>
              <p className="text-slate-600 mt-0.5">
                Answer 3 simple questions to filter <strong>potentially relevant schemes</strong>. Note: Only the issuing government authority can confirm official eligibility.
              </p>
            </div>
            {questionnaireApplied && (
              <span className="px-2.5 py-1 rounded-full bg-forest-800 text-white font-bold">
                Showing {filteredSchemes.length} Potentially Relevant Schemes
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                1. Your Farming State
              </label>
              <select
                value={qState}
                onChange={(e) => setQState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                {STATE_OPTIONS.filter((s) => s !== 'All States').map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                2. Landholding / Cultivation Type
              </label>
              <select
                value={qLandHolding}
                onChange={(e) => setQLandHolding(e.target.value as typeof qLandHolding)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value="Small & Marginal (< 2 Hectares)">
                  Small & Marginal Landholder (&lt; 2 Hectares / 5 Acres)
                </option>
                <option value="Medium / Large Holding">
                  Other Landholding Farmer
                </option>
                <option value="Tenant / Sharecropper">
                  Tenant Farmer / Sharecropper
                </option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                3. Primary Farming Requirement
              </label>
              <select
                value={qPrimaryNeed}
                onChange={(e) => setQPrimaryNeed(e.target.value as typeof qPrimaryNeed)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value="All Needs">All Agricultural Categories</option>
                <option value="Income & Credit">Income Support & KCC Crop Credit</option>
                <option value="Crop Insurance">Crop Insurance (PMFBY)</option>
                <option value="Drip / Sprinkler Irrigation">
                  Drip / Sprinkler Micro-Irrigation
                </option>
                <option value="Machinery & Soil Testing">
                  Farm Mechanization & Soil Testing
                </option>
                <option value="Horticulture & Organic">
                  Horticulture & Organic Farming
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="text-[11px] text-amber-900 font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              Result Label: &ldquo;Potentially relevant schemes&rdquo; (Never an official eligibility guarantee)
            </span>
            <div className="flex gap-2">
              {questionnaireApplied && (
                <button
                  type="button"
                  onClick={() => setQuestionnaireApplied(false)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold"
                >
                  Clear Questionnaire
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold"
              >
                Show Potentially Relevant Schemes
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 4. Search & Filter Controls */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Search schemes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PM-KISAN, PMFBY, KCC, Drip, SMAM..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <select
            aria-label="Filter by state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
          >
            {STATE_OPTIONS.map((st) => (
              <option key={st} value={st}>
                State: {st}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by beneficiary group"
            value={selectedBeneficiary}
            onChange={(e) => setSelectedBeneficiary(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
          >
            {BENEFICIARY_OPTIONS.map((bg) => (
              <option key={bg} value={bg}>
                Beneficiary: {bg}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by application status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
          >
            <option value="All">Status: All Windows</option>
            <option value="Ongoing Enrollment">Ongoing Enrollment</option>
            <option value="Seasonal Window — Verify on Portal">
              Seasonal Window — Verify on Portal
            </option>
            <option value="Open — Check Official Portal for Cycle Dates">
              Open — Check Official Portal for Cycle Dates
            </option>
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {SCHEME_CATEGORIES.map((cat) => (
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

      {/* 5. Scheme Cards List */}
      <div className="space-y-4">
        {filteredSchemes.map((sch) => (
          <article
            key={sch.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      sch.applicability === 'National (All India)'
                        ? 'bg-forest-800 text-white'
                        : 'bg-harvest-600 text-white'
                    }`}
                  >
                    {sch.applicability}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-900 border border-forest-200">
                    {sch.category}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {sch.applicationStatusLabel}
                  </span>
                  {questionnaireApplied && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-leaf-100 text-leaf-900 border border-leaf-300">
                      Potentially Relevant Scheme
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {sch.name} ({sch.shortCode})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  <strong>Issuing Authority:</strong> {sch.department}
                </p>
              </div>

              <a
                href={sch.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-sm shrink-0"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {sch.shortExplanation}
            </p>

            {/* Beneficiaries */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-700 mr-1">Intended Beneficiaries:</span>
              {sch.beneficiaryGroups.map((bg) => (
                <span
                  key={bg}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 font-semibold"
                >
                  {bg}
                </span>
              ))}
            </div>

            {/* 2x2 Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1.5">Eligibility Summary</h4>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {sch.eligibilitySummary.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-leaf-50/60 border border-leaf-200">
                <h4 className="font-bold text-leaf-950 mb-1.5">
                  Benefits Summary (Verify Current Norms on Portal)
                </h4>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {sch.benefitsSummary.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-forest-700" />
                  <span>Important Documents Typically Required</span>
                </h4>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {sch.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1.5">Application Process</h4>
                <ol className="list-decimal list-inside text-slate-700 space-y-1">
                  {sch.applicationProcess.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>{sch.lastVerifiedLabel}</span>
              <span>Official URL: {sch.officialPortalUrl}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
