import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  GraduationCap,
  ListOrdered,
  FileText,
  HelpCircle,
  Cpu,
  Share2,
} from 'lucide-react';
import { CropDiseaseItem, SEED_100_CROP_DISEASES } from '../data/seed100CropDiseases';
import {
  CropDiseaseDocumentary,
  getDiseaseDocumentary,
  formatDiseaseAsMarkdown,
  HEADING_TITLES,
} from '../data/diseaseDocumentaryService';

export const DiseaseAnalysisPage: React.FC = () => {
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('All');
  const [selectedPathogenFilter, setSelectedPathogenFilter] = useState<string>('All');
  const [selectedModalDisease, setSelectedModalDisease] = useState<CropDiseaseItem | null>(null);

  // View mode: 'grid' or 'documentary'
  const [viewMode, setViewMode] = useState<'grid' | 'documentary'>('grid');
  // For documentary reader mode
  const [currentDocIndex, setCurrentDocIndex] = useState<number>(0);
  const [examFocusMode, setExamFocusMode] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const filteredDiseases = useMemo(() => {
    return SEED_100_CROP_DISEASES.filter((d) => {
      if (selectedGroupFilter !== 'All' && d.cropGroup !== selectedGroupFilter) return false;
      if (selectedPathogenFilter !== 'All' && d.pathogenType !== selectedPathogenFilter) return false;
      if (diseaseSearch.trim()) {
        const q = diseaseSearch.trim().toLowerCase();
        const str = `${d.crop} ${d.disease} ${d.scientificName} ${d.primarySymptoms}`.toLowerCase();
        if (!str.includes(q)) return false;
      }
      return true;
    });
  }, [diseaseSearch, selectedGroupFilter, selectedPathogenFilter]);

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SEED_100_CROP_DISEASES.length };
    SEED_100_CROP_DISEASES.forEach((d) => {
      counts[d.cropGroup] = (counts[d.cropGroup] || 0) + 1;
    });
    return counts;
  }, []);

  // Safe current disease for documentary mode
  const activeDocumentaryItem = useMemo(() => {
    if (filteredDiseases.length === 0) return null;
    const safeIdx = Math.min(Math.max(0, currentDocIndex), filteredDiseases.length - 1);
    return filteredDiseases[safeIdx];
  }, [filteredDiseases, currentDocIndex]);

  const activeDocumentary: CropDiseaseDocumentary | null = useMemo(() => {
    if (!activeDocumentaryItem) return null;
    return getDiseaseDocumentary(activeDocumentaryItem);
  }, [activeDocumentaryItem]);

  const modalDocumentary: CropDiseaseDocumentary | null = useMemo(() => {
    if (!selectedModalDisease) return null;
    return getDiseaseDocumentary(selectedModalDisease);
  }, [selectedModalDisease]);

  const handleCopyMarkdown = (doc: CropDiseaseDocumentary) => {
    const md = formatDiseaseAsMarkdown(doc);
    navigator.clipboard.writeText(md).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    });
  };

  // Exam high-yield heading numbers: 1, 2, 3, 6, 8, 11, 14, 17, 20
  const isHighYield = (num: number) => [1, 2, 3, 6, 8, 11, 14, 17, 20].includes(num);

  const render25Headings = (doc: CropDiseaseDocumentary, containerIdPrefix: string) => {
    return (
      <div className="space-y-4">
        {/* 1. Disease Name */}
        <div
          id={`${containerIdPrefix}-h1`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(1)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
                1
              </span>
              Disease Name
            </span>
            {isHighYield(1) && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Exam Key
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">{doc.diseaseName}</h2>
        </div>

        {/* 2. Definition */}
        <div
          id={`${containerIdPrefix}-h2`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(2)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            Definition
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.definition}</p>
        </div>

        {/* 3. Causal Organism / Pathogen */}
        <div
          id={`${containerIdPrefix}-h3`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(3)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-emerald-50/60 border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
                3
              </span>
              Causal Organism / Pathogen
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
              Taxonomy
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 font-mono italic">{doc.causalOrganism}</p>
        </div>

        {/* 4. Affected Crops */}
        <div
          id={`${containerIdPrefix}-h4`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              4
            </span>
            Affected Crops
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.affectedCrops}</p>
        </div>

        {/* 5. Causes */}
        <div
          id={`${containerIdPrefix}-h5`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              5
            </span>
            Causes
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.causes}</p>
        </div>

        {/* 6. Symptoms and Signs */}
        <div
          id={`${containerIdPrefix}-h6`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(6)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-rose-50/40 border-rose-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-800 text-white flex items-center justify-center text-[11px] font-bold">
                6
              </span>
              Symptoms and Signs
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900">
              Field Diagnostics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {doc.symptomsAndSigns}
          </p>
        </div>

        {/* 7. Disease Cycle */}
        <div
          id={`${containerIdPrefix}-h7`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              7
            </span>
            Disease Cycle
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.diseaseCycle}</p>
        </div>

        {/* 8. Mode of Transmission / Spread */}
        <div
          id={`${containerIdPrefix}-h8`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(8)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              8
            </span>
            Mode of Transmission / Spread
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.modeOfTransmission}</p>
        </div>

        {/* 9. Favourable Conditions */}
        <div
          id={`${containerIdPrefix}-h9`}
          className="p-4 rounded-xl border bg-sky-50/40 border-sky-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-sky-950 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-sky-800 text-white flex items-center justify-center text-[11px] font-bold">
              9
            </span>
            Favourable Conditions
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.favourableConditions}</p>
        </div>

        {/* 10. Effects and Crop Losses */}
        <div
          id={`${containerIdPrefix}-h10`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              10
            </span>
            Effects and Crop Losses
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.effectsAndCropLosses}</p>
        </div>

        {/* 11. Diagnosis and Identification */}
        <div
          id={`${containerIdPrefix}-h11`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(11)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              11
            </span>
            Diagnosis and Identification
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {doc.diagnosisAndIdentification}
          </p>
        </div>

        {/* 12. Prevention */}
        <div
          id={`${containerIdPrefix}-h12`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              12
            </span>
            Prevention
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.prevention}</p>
        </div>

        {/* 13. Control and Treatment */}
        <div
          id={`${containerIdPrefix}-h13`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              13
            </span>
            Control and Treatment
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.controlAndTreatment}</p>
        </div>

        {/* 14. Resistant Varieties */}
        <div
          id={`${containerIdPrefix}-h14`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(14)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-emerald-50/60 border-emerald-200'
          }`}
        >
          <span className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
              14
            </span>
            Resistant Varieties
          </span>
          <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
            {doc.resistantVarieties}
          </p>
        </div>

        {/* 15. Biological Control */}
        <div
          id={`${containerIdPrefix}-h15`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              15
            </span>
            Biological Control
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.biologicalControl}</p>
        </div>

        {/* 16. Chemical Control */}
        <div
          id={`${containerIdPrefix}-h16`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              16
            </span>
            Chemical Control
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.chemicalControl}</p>
        </div>

        {/* 17. Integrated Disease Management */}
        <div
          id={`${containerIdPrefix}-h17`}
          className={`p-4 rounded-xl border transition-all ${
            examFocusMode && isHighYield(17)
              ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400'
              : 'bg-emerald-50/80 border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
                17
              </span>
              Integrated Disease Management
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-950">
              Core Agronomic Protocol
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
            {doc.integratedDiseaseManagement}
          </p>
        </div>

        {/* 18. Season of Occurrence */}
        <div
          id={`${containerIdPrefix}-h18`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              18
            </span>
            Season of Occurrence
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.seasonOfOccurrence}</p>
        </div>

        {/* 19. Geographical Distribution */}
        <div
          id={`${containerIdPrefix}-h19`}
          className="p-4 rounded-xl border bg-white border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              19
            </span>
            Geographical Distribution
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.geographicalDistribution}</p>
        </div>

        {/* 20. Important Facts for Exams */}
        <div
          id={`${containerIdPrefix}-h20`}
          className="p-4 rounded-xl border bg-amber-50/80 border-amber-300 ring-1 ring-amber-400"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-[11px] font-bold">
                20
              </span>
              Important Facts for Exams
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-950">
              ICAR JRF / UPSC / AFO
            </span>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
            {doc.importantFactsForExams}
          </div>
        </div>

        {/* 21. Frequently Asked Questions (FAQs) */}
        <div
          id={`${containerIdPrefix}-h21`}
          className="p-4 rounded-xl border bg-white border-slate-200 space-y-3"
        >
          <span className="text-xs font-black uppercase tracking-wider text-forest-800 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-800 text-white flex items-center justify-center text-[11px] font-bold">
              21
            </span>
            Frequently Asked Questions (FAQs)
          </span>
          <div className="space-y-2.5">
            {doc.frequentlyAskedQuestions.map((faq, fIdx) => (
              <div key={fIdx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1">
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>{faq.question}</span>
                </p>
                <p className="text-xs text-slate-700 leading-relaxed pl-5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 22. Interesting Facts */}
        <div
          id={`${containerIdPrefix}-h22`}
          className="p-4 rounded-xl border bg-purple-50/40 border-purple-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-purple-950 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-purple-800 text-white flex items-center justify-center text-[11px] font-bold">
              22
            </span>
            Interesting Facts
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{doc.interestingFacts}</p>
        </div>

        {/* 23. Real-Life Case Study */}
        <div
          id={`${containerIdPrefix}-h23`}
          className="p-4 rounded-xl border bg-slate-50 border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[11px] font-bold">
              23
            </span>
            Real-Life Case Study
          </span>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
            "{doc.realLifeCaseStudy}"
          </p>
        </div>

        {/* 24. Latest Research and AI-Based Detection */}
        <div
          id={`${containerIdPrefix}-h24`}
          className="p-4 rounded-xl border bg-indigo-50/50 border-indigo-200"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-800 text-white flex items-center justify-center text-[11px] font-bold">
                24
              </span>
              Latest Research and AI-Based Detection
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> Drone & Deep Learning
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            {doc.latestResearchAndAiDetection}
          </p>
        </div>

        {/* 25. References and Sources */}
        <div
          id={`${containerIdPrefix}-h25`}
          className="p-4 rounded-xl border bg-slate-50 border-slate-200"
        >
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-2">
            <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[11px] font-bold">
              25
            </span>
            References and Sources
          </span>
          <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
            {doc.referencesAndSources.map((ref, rIdx) => (
              <li key={rIdx}>{ref}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-forest-700" />
            <span>Crop Disease Documentary & Plant Pathology System</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            100 Crop Diseases Encyclopedia & Documentary
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Authoritative plant pathology database covering 100 major economic crop diseases. Every entry follows the standardized <strong>25 Short Heading Format</strong> for comprehensive field management and competitive exam study.
          </p>
        </div>

        {/* View Mode Switch and Quick Badges */}
        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2.5 shrink-0">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-forest-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Grid Index</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('documentary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'documentary'
                  ? 'bg-white text-forest-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>25-Heading Reader</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-forest-900 bg-forest-50 px-3 py-1 rounded-lg border border-forest-200">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
            <span>Standard 25 Headings Applied</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={diseaseSearch}
              onChange={(e) => {
                setDiseaseSearch(e.target.value);
                setCurrentDocIndex(0);
              }}
              placeholder="Search across all 100 diseases (e.g. Wheat rust, Late blight, Xanthomonas, Blast)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
            />
            {diseaseSearch && (
              <button
                type="button"
                onClick={() => setDiseaseSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setExamFocusMode(!examFocusMode)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                examFocusMode
                  ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>Exam Focus Mode {examFocusMode ? 'ON' : 'OFF'}</span>
            </button>

            <span className="text-xs font-bold text-slate-700 shrink-0">
              {filteredDiseases.length} of {SEED_100_CROP_DISEASES.length}
            </span>
          </div>
        </div>

        {/* Crop Group Filter Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <Layers className="w-3.5 h-3.5 text-forest-700" />
            <span>Crop Category:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'All',
              'Rice',
              'Wheat & Barley',
              'Maize & Millets',
              'Pulses',
              'Oilseeds & Commercial',
              'Vegetables',
              'Fruits',
            ].map((grp) => {
              const count = groupCounts[grp] || 0;
              return (
                <button
                  key={grp}
                  type="button"
                  onClick={() => {
                    setSelectedGroupFilter(grp);
                    setCurrentDocIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedGroupFilter === grp
                      ? 'bg-forest-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{grp}</span>
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedGroupFilter === grp
                        ? 'bg-forest-950 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pathogen Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-600 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pathogen Type:</span>
          </span>
          {['All', 'Fungi', 'Bacteria', 'Viruses', 'Oomycetes', 'Phytoplasmas'].map((path) => (
            <button
              key={path}
              type="button"
              onClick={() => {
                setSelectedPathogenFilter(path);
                setCurrentDocIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                selectedPathogenFilter === path
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {path}
            </button>
          ))}
        </div>
      </div>

      {/* DOCUMENTARY READER VIEW */}
      {viewMode === 'documentary' && activeDocumentaryItem && activeDocumentary && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Fast Heading Navigator */}
          <div className="lg:col-span-3 space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-20 max-h-[80vh] overflow-y-auto space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-forest-700" />
                  <span>25 Documentary Headings</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Jump To</span>
              </div>

              <div className="space-y-1">
                {HEADING_TITLES.map((h) => {
                  const high = isHighYield(h.number);
                  return (
                    <button
                      key={h.number}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`doc-reader-h${h.number}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        examFocusMode && high
                          ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">
                        {h.number}. {h.title}
                      </span>
                      {high && (
                        <span className="text-[9px] px-1 rounded bg-amber-200 text-amber-900 shrink-0">
                          Exam
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Copy Markdown Quick Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleCopyMarkdown(activeDocumentary)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold transition-colors"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied 25 Headings!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy 25 Headings (MD)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Full 25-Heading Dossier */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Navigation Bar between diseases */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={currentDocIndex <= 0}
                  onClick={() => setCurrentDocIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous disease"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Disease #{String(activeDocumentary.id).padStart(2, '0')} of {filteredDiseases.length}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {activeDocumentary.diseaseName} ({activeDocumentaryItem.crop})
                  </div>
                </div>

                <button
                  type="button"
                  disabled={currentDocIndex >= filteredDiseases.length - 1}
                  onClick={() =>
                    setCurrentDocIndex((prev) => Math.min(filteredDiseases.length - 1, prev + 1))
                  }
                  className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next disease"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Jump dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="disease-jump" className="text-xs font-medium text-slate-500">
                  Select:
                </label>
                <select
                  id="disease-jump"
                  value={currentDocIndex}
                  onChange={(e) => setCurrentDocIndex(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-forest-800"
                >
                  {filteredDiseases.map((d, idx) => (
                    <option key={d.id} value={idx}>
                      #{d.id} - {d.disease} ({d.crop})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Render 25 Headings in Main Reader */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              {render25Headings(activeDocumentary, 'doc-reader')}
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedModalDisease(d)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedModalDisease(d);
              }}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-forest-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    #{String(d.id).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      d.pathogenType === 'Fungi'
                        ? 'bg-amber-100 text-amber-900'
                        : d.pathogenType === 'Bacteria'
                        ? 'bg-blue-100 text-blue-900'
                        : d.pathogenType === 'Viruses'
                        ? 'bg-rose-100 text-rose-900'
                        : d.pathogenType === 'Oomycetes'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {d.pathogenType}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-forest-800 uppercase tracking-wider">
                  {d.crop}
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-forest-700 transition-colors mt-0.5">
                  {d.disease}
                </h2>

                <p className="text-[11px] font-mono italic text-slate-500 mt-0.5">
                  {d.scientificName}
                </p>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1.5 border border-slate-100">
                  <p className="line-clamp-2 leading-relaxed">
                    <strong className="text-slate-900">Symptoms:</strong> {d.primarySymptoms}
                  </p>
                  <p className="line-clamp-2 text-slate-600 text-[11px]">
                    <strong>Favorable:</strong> {d.favorableConditions}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-500">{d.cropGroup}</span>
                <span className="font-bold text-forest-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View 25 Headings <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredDiseases.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-900">No matching diseases found.</p>
          <p className="text-xs text-slate-500">Try clearing your search query or reset the category filters.</p>
          <button
            type="button"
            onClick={() => {
              setDiseaseSearch('');
              setSelectedGroupFilter('All');
              setSelectedPathogenFilter('All');
            }}
            className="text-xs font-bold px-4 py-2 bg-forest-800 text-white rounded-xl hover:bg-forest-900 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 25-HEADING SCIENTIFIC PROFILE MODAL */}
      {selectedModalDisease && modalDocumentary && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedModalDisease(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    #{String(modalDocumentary.id).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                    {selectedModalDisease.crop} • {selectedModalDisease.cropGroup}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                    {selectedModalDisease.pathogenType}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                    Crop Disease Documentary
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">{modalDocumentary.diseaseName}</h3>
                <p className="text-xs font-mono italic text-slate-600 mt-0.5">
                  Pathogen: {modalDocumentary.causalOrganism}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyMarkdown(modalDocumentary)}
                  className="p-2 text-xs font-bold rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition-colors"
                  title="Copy 25 Headings as Markdown"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" />
                      <span className="hidden sm:inline">Copy 25 Headings</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedModalDisease(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Navigation Pills inside Modal */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-forest-700" />
                  <span>25 Standard Headings</span>
                </span>
                <span className="text-[11px] text-slate-500">Click any heading to scroll</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {HEADING_TITLES.map((h) => (
                  <button
                    key={h.number}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(`modal-h${h.number}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white hover:bg-forest-100 text-slate-700 hover:text-forest-900 border border-slate-200"
                  >
                    {h.number}. {h.short}
                  </button>
                ))}
              </div>
            </div>

            {/* Render all 25 Headings */}
            <div className="py-2">
              {render25Headings(modalDocumentary, 'modal')}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Official 25-Heading Plant Pathology Reference • ICAR & SAU Aligned
              </span>
              <button
                type="button"
                onClick={() => setSelectedModalDisease(null)}
                className="text-xs font-bold bg-slate-800 text-white px-5 py-2.5 rounded-xl hover:bg-slate-900 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
