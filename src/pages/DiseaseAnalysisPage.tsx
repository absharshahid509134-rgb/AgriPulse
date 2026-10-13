import React, { useMemo, useState } from 'react';
import {
  Stethoscope,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sprout,
  SearchCheck,
  ShieldAlert,
  FileText,
  X,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { CropGrowthStage, DiseaseReport } from '../types';
import { analyzeCropSymptoms } from '../services/diseaseService';
import { formatDate } from '../utils/formatters';

const SYMPTOM_CATEGORY_OPTIONS = [
  'Yellowing / Chlorosis',
  'Leaf Curling / Cupping',
  'Brown / Black Leaf Spots',
  'Rusty Pustules / Powder',
  'Wilting / Drooping Stems',
  'Pinholes / Chewed Margins',
  'Sticky Honeydew / Sooty Mold',
  'Stunted Shoot Growth',
  'Root / Collar Discoloration',
];

const AFFECTED_PART_OPTIONS = [
  'Older / Lower Leaves',
  'Upper Young Shoots',
  'Whole Plant Canopy',
  'Stems / Tillers',
  'Flowers / Panicles / Pods',
  'Roots / Collar Base',
];

const GROWTH_STAGE_OPTIONS: CropGrowthStage[] = [
  'Sowing / Transplanting',
  'Germination & Emergence',
  'Vegetative Growth',
  'Flowering / Booting',
  'Grain Filling / Fruiting',
  'Maturation',
];

export const DiseaseAnalysisPage: React.FC = () => {
  const {
    farms,
    activeFarm,
    plots,
    crops,
    diseaseReports,
    addDiseaseReport,
    updateDiseaseReportStatus,
  } = useAgriPulse();

  const [selectedFarmId, setSelectedFarmId] = useState(
    activeFarm?.id || farms[0]?.id || 'farm-001'
  );
  const farmPlots = useMemo(
    () => plots.filter((p) => p.farmId === selectedFarmId),
    [plots, selectedFarmId]
  );
  const farmCrops = useMemo(
    () => crops.filter((c) => c.farmId === selectedFarmId),
    [crops, selectedFarmId]
  );

  const [cropName, setCropName] = useState(farmCrops[0]?.cropName || 'Tomato');
  const [variety, setVariety] = useState(farmCrops[0]?.variety || 'Arka Rakshak');
  const [plotName, setPlotName] = useState(
    farmPlots[0]?.name || 'Plot A3 — East Drip Vegetable Block'
  );
  const [growthStage, setGrowthStage] = useState<CropGrowthStage>('Flowering / Booting');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Yellowing / Chlorosis',
    'Leaf Curling / Cupping',
  ]);
  const [selectedParts, setSelectedParts] = useState<string[]>(['Older / Lower Leaves']);
  const [onsetDate, setOnsetDate] = useState('2026-10-11');
  const [affectedPct, setAffectedPct] = useState('8');
  const [weatherNotes, setWeatherNotes] = useState(
    'Warm afternoon (31°C) with morning dew; drip irrigated 2 days ago.'
  );
  const [description, setDescription] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(undefined);
  const [photoFileName, setPhotoFileName] = useState<string | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [selectedReport, setSelectedReport] = useState<DiseaseReport | null>(
    diseaseReports[0] || null
  );
  const [expertNoteInput, setExpertNoteInput] = useState('');

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const togglePart = (part: string) => {
    setSelectedParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid JPEG, PNG, or WebP photograph.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Image file size must be under 4 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoDataUrl(reader.result);
        setPhotoFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnalyzing) return;
    setFormError(null);

    if (!cropName.trim()) {
      setFormError('Please enter or select a crop name.');
      return;
    }
    if (selectedSymptoms.length === 0 && !description.trim()) {
      setFormError(
        'Please select at least one symptom category or provide a text description of the observed symptoms.'
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const targetFarm = farms.find((f) => f.id === selectedFarmId);
      const analysisOutput = await analyzeCropSymptoms({
        farmId: selectedFarmId,
        farmName: targetFarm?.name || 'Green Horizon Progressive Farm',
        plotName: plotName.trim() || 'General Plot',
        cropName: cropName.trim(),
        variety: variety.trim() || 'Not specified',
        growthStage,
        symptomCategories: selectedSymptoms,
        affectedParts: selectedParts,
        onsetDate,
        affectedAreaPct: Math.min(100, Math.max(1, parseFloat(affectedPct) || 5)),
        weatherIrrigationNotes: weatherNotes.trim(),
        farmerDescription:
          description.trim() ||
          `Observed ${selectedSymptoms.join(', ')} on ${selectedParts.join(', ')}.`,
        photoDataUrl,
        photoFileName,
      });

      const saved = addDiseaseReport(analysisOutput);
      setSelectedReport(saved);
      setDescription('');
      setPhotoDataUrl(undefined);
      setPhotoFileName(undefined);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Transparency & Scientific Integrity Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            Analysis Mode: Demo Symptom Guidance (Educational Rule-Based Workflow)
          </p>
          <p className="mt-0.5 text-amber-900 leading-relaxed">
            No external vision AI model is configured in this demo environment. Submissions (with or without photographs) are evaluated using transparent agronomy symptom-check rules and saved to your farm history. AgriPulse never fabricates AI confidence scores, never issues unsupported chemical pesticide dosages, and never marks a case &ldquo;Expert confirmed&rdquo; automatically.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Submission Form (5 cols) + Right Analysis Result & History (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Symptom Submission Form */}
        <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-forest-700" />
              <span>Submit Crop Symptoms for Guidance</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit a text description or attach a leaf/plant photograph for structured scouting guidance.
            </p>
          </div>

          {formError && (
            <div
              role="alert"
              className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitAnalysis} className="mt-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Farm</label>
                <select
                  value={selectedFarmId}
                  onChange={(e) => setSelectedFarmId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {farms.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Plot Name
                </label>
                <input
                  type="text"
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  placeholder="e.g., Plot A3"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Crop Name *
                </label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g., Tomato, Wheat, Rice, Mustard"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Crop Variety (If Known)
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g., HD-3226 / Arka Rakshak"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Growth Stage
                </label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value as CropGrowthStage)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {GROWTH_STAGE_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Symptom Onset Date
                </label>
                <input
                  type="date"
                  value={onsetDate}
                  onChange={(e) => setOnsetDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Symptom Categories Multi-Select */}
            <div>
              <span className="block font-semibold text-slate-700 mb-1.5">
                Symptom Categories (Select all observed)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SYMPTOM_CATEGORY_OPTIONS.map((sym) => {
                  const active = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                        active
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Affected Plant Parts Multi-Select */}
            <div>
              <span className="block font-semibold text-slate-700 mb-1.5">
                Affected Plant Parts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {AFFECTED_PART_OPTIONS.map((part) => {
                  const active = selectedParts.includes(part);
                  return (
                    <button
                      key={part}
                      type="button"
                      onClick={() => togglePart(part)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                        active
                          ? 'bg-leaf-700 text-white border-leaf-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {part}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Est. % of Plants / Area Affected
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={affectedPct}
                  onChange={(e) => setAffectedPct(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recent Weather / Irrigation Notes
                </label>
                <input
                  type="text"
                  value={weatherNotes}
                  onChange={(e) => setWeatherNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Farmer Text Description */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Symptom Description (Works with or without a photo)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe leaf color, pattern across rows, insect sightings, or soil condition..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            {/* Optional Image Upload with Validation */}
            <div>
              <span className="block font-semibold text-slate-700 mb-1">
                Optional Plant / Leaf Photograph (JPEG, PNG, WebP ≤ 4 MB)
              </span>
              {!photoDataUrl ? (
                <label className="cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-forest-50/40 hover:border-forest-400 transition-colors">
                  <Upload className="w-5 h-5 text-forest-700 mb-1" />
                  <span className="font-semibold text-slate-700">
                    Click to attach leaf, stem, or plant photo
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Optional — You can also submit a text-only report
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              ) : (
                <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={photoDataUrl}
                      alt="Uploaded symptom preview"
                      className="w-12 h-12 rounded-lg object-cover border border-forest-300"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{photoFileName}</p>
                      <p className="text-[10px] text-forest-800">
                        Validated image attached for report record
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoDataUrl(undefined);
                      setPhotoFileName(undefined);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {uploadError && <p className="mt-1 text-red-600 font-semibold">{uploadError}</p>}
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:bg-slate-400 text-white font-bold shadow-sm transition-colors"
            >
              {isAnalyzing
                ? 'Generating Demo Symptom Guidance...'
                : 'Generate Symptom Guidance & Save Report'}
            </button>
          </form>
        </section>

        {/* Right: Structured Guidance Output & Saved Reports History */}
        <section className="lg:col-span-7 space-y-5">
          {/* Selected Report Detailed Analysis */}
          {selectedReport && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                      {selectedReport.analysisMode}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        selectedReport.status === 'Expert confirmed'
                          ? 'bg-leaf-100 text-leaf-900 border border-leaf-300'
                          : selectedReport.status === 'Needs inspection'
                          ? 'bg-red-100 text-red-900 border border-red-300'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      Status: {selectedReport.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {selectedReport.cropName} ({selectedReport.variety}) —{' '}
                    {selectedReport.plotName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reported on {formatDate(selectedReport.createdAt)} • Onset:{' '}
                    {formatDate(selectedReport.onsetDate)} • Est. Area Affected:{' '}
                    {selectedReport.affectedAreaPct}%
                  </p>
                </div>

                {/* Manual Status Update Control */}
                <div className="flex items-center gap-2 text-xs">
                  <label htmlFor="report-status-select" className="font-semibold text-slate-600">
                    Update Status:
                  </label>
                  <select
                    id="report-status-select"
                    value={selectedReport.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as DiseaseReport['status'];
                      updateDiseaseReportStatus(selectedReport.id, nextStatus);
                      setSelectedReport({ ...selectedReport, status: nextStatus });
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-800"
                  >
                    <option value="Possible issue">Possible issue</option>
                    <option value="Needs inspection">Needs inspection</option>
                    <option value="Expert confirmed">
                      Expert confirmed (Manual KVK verification only)
                    </option>
                  </select>
                </div>
              </div>

              {/* Farmer's Reported Description & Photo */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row gap-3 justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Reported Field Symptoms:</p>
                  <p className="text-slate-700">{selectedReport.farmerDescription}</p>
                  <p className="text-[11px] text-slate-500">
                    Categories: {selectedReport.symptomCategories.join(', ') || 'General'} •
                    Parts: {selectedReport.affectedParts.join(', ') || 'Canopy'}
                  </p>
                </div>
                {selectedReport.photoDataUrl && (
                  <img
                    src={selectedReport.photoDataUrl}
                    alt="Submitted plant symptom"
                    className="w-24 h-24 rounded-xl object-cover border border-slate-300 shrink-0"
                  />
                )}
              </div>

              {/* Confidence Disclosure */}
              <div className="p-3 rounded-xl bg-forest-50/70 border border-forest-200 text-xs text-forest-950">
                <strong>Model Confidence Disclosure:</strong> Because this report uses{' '}
                <em>{selectedReport.analysisMode}</em> rather than a calibrated laboratory or computer-vision classifier, no synthetic percentage confidence score is shown. Review the distinguishing field checks below.
              </div>

              {/* 1. Possible Causes & Supporting Symptoms */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  1. Possible Causes & Distinguishing Checks
                </h4>
                {selectedReport.possibleCauses.map((cause, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h5 className="text-sm font-bold text-slate-900">{cause.name}</h5>
                      <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-900 text-[11px] font-bold">
                        {cause.type}
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block mb-1">
                        Supporting Symptoms:
                      </span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        {cause.matchingSymptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block mb-1">
                        How to Distinguish in the Field:
                      </span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        {cause.distinguishingChecks.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-leaf-50/70 border border-leaf-200">
                      <span className="font-bold text-leaf-950 block mb-1">
                        Non-Chemical & Field Management Guidance:
                      </span>
                      <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                        {cause.managementGuidance.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Alternative Explanations & Immediate Inspection Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <SearchCheck className="w-4 h-4 text-forest-700" />
                    <span>Suggested Immediate Inspection Steps</span>
                  </h4>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    {selectedReport.immediateInspectionSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-leaf-700" />
                    <span>Alternative Explanations & Preventive Care</span>
                  </h4>
                  <p className="font-semibold text-slate-700 mb-1">Alternative Possibilities:</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5 mb-2">
                    {selectedReport.alternativeExplanations.map((alt, i) => (
                      <li key={i}>{alt}</li>
                    ))}
                  </ul>
                  <p className="font-semibold text-slate-700 mb-1">Preventive Guidance:</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {selectedReport.preventiveGuidance.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. When to Consult an Agricultural Officer */}
              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 text-xs text-red-950">
                <h4 className="font-bold flex items-center gap-1.5 mb-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-700" />
                  <span>When to Consult a Qualified Agricultural Officer or Plant Pathologist</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-red-900">
                  {selectedReport.whenToConsultExpert.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Saved Disease Reports History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-forest-700" />
              <span>Saved Symptom Reports History ({diseaseReports.length})</span>
            </h3>
            <div className="space-y-2.5">
              {diseaseReports.map((rep) => {
                const isSelected = selectedReport?.id === rep.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedReport(rep);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                      isSelected
                        ? 'bg-forest-50 border-forest-700'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {rep.cropName} ({rep.variety})
                        </span>
                        <span className="text-slate-500">• {rep.plotName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            rep.status === 'Expert confirmed'
                              ? 'bg-leaf-100 text-leaf-900'
                              : rep.status === 'Needs inspection'
                              ? 'bg-red-100 text-red-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {rep.status}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 line-clamp-1">
                        {rep.symptomCategories.join(', ')} — {rep.farmerDescription}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-500 shrink-0">
                      {formatDate(rep.createdAt)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
