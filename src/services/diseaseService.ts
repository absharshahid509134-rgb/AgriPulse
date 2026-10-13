import { CropGrowthStage, DiseaseCandidateCause, DiseaseReport } from '../types';

export interface SymptomSubmissionInput {
  farmId: string;
  farmName: string;
  plotName: string;
  cropName: string;
  variety: string;
  growthStage: CropGrowthStage;
  symptomCategories: string[];
  affectedParts: string[];
  onsetDate: string;
  affectedAreaPct: number;
  weatherIrrigationNotes: string;
  farmerDescription: string;
  photoDataUrl?: string;
  photoFileName?: string;
}

export async function analyzeCropSymptoms(
  input: SymptomSubmissionInput
): Promise<Omit<DiseaseReport, 'id' | 'createdAt' | 'updatedAt'>> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 450));

  const causes: DiseaseCandidateCause[] = [];
  const syms = input.symptomCategories.map((s) => s.toLowerCase());
  const desc = input.farmerDescription.toLowerCase();
  const crop = input.cropName.toLowerCase();

  // Rule 1: Yellowing / Chlorosis
  if (
    syms.some((s) => s.includes('yellow') || s.includes('chlorosis')) ||
    desc.includes('yellow')
  ) {
    causes.push({
      name:
        crop.includes('rice') || crop.includes('paddy')
          ? 'Zinc or Nitrogen Nutritional Stress (e.g., Khaira Check in Paddy)'
          : 'Nutrient Mobilization Stress (Nitrogen / Magnesium / Micronutrient Check)',
      type: 'Nutrient Deficiency',
      matchingSymptoms: [
        'Reported yellowing / chlorosis on foliage',
        `Observed during ${input.growthStage} when nutrient demand is active`,
      ],
      distinguishingChecks: [
        'Uniform pale yellowing of older bottom leaves often points toward Nitrogen scarcity or waterlogged roots.',
        'Green veins with yellow tissue between veins (interveinal chlorosis) on older leaves suggests Magnesium scarcity, whereas on newest top leaves it suggests Iron/Zinc lockup.',
      ],
      managementGuidance: [
        'Compare soil moisture and drainage in affected rows versus healthy rows before adding fertilizer.',
        'Check your plot Soil Health Card for pH and micronutrient (Zn, Fe, Mg) status.',
        'Avoid over-irrigating, which suffocates roots and blocks nutrient uptake.',
      ],
    });
  }

  // Rule 2: Leaf curling / cupping / sticky honeydew / whitefly or aphid cues
  if (
    syms.some((s) => s.includes('curl') || s.includes('sticky') || s.includes('stunt')) ||
    desc.includes('curl') ||
    desc.includes('whitefly') ||
    desc.includes('aphid')
  ) {
    causes.push({
      name: 'Sap-Sucking Insect Vector & Leaf-Curl Stress Possibility',
      type: 'Pest / Insect Damage',
      matchingSymptoms: [
        'Leaf curling, cupping, crinkling, or stunted new shoots reported',
        'Sucking insects (whiteflies, aphids, jassids, or thrips) feed on tender phloem sap under leaves',
      ],
      distinguishingChecks: [
        'Turn over 15–20 upper and middle leaves in early morning using a 10x hand lens to check for tiny whiteflies, aphids, or mites.',
        'Check whether yellow or blue sticky traps placed at canopy height capture flying vectors.',
      ],
      managementGuidance: [
        'Install 8–10 yellow sticky traps (for whiteflies/aphids) and blue sticky traps (for thrips) per acre just above canopy height.',
        'Remove parthenium and host weeds along field bunds.',
        'Avoid excessive nitrogen top-dressing that makes foliage soft and attractive to sucking insects.',
      ],
    });
  }

  // Rule 3: Brown/black spots, lesions, rust, or blight cues
  if (
    syms.some((s) => s.includes('spot') || s.includes('blight') || s.includes('rust')) ||
    desc.includes('spot') ||
    desc.includes('brown') ||
    desc.includes('blight') ||
    desc.includes('rust')
  ) {
    causes.push({
      name: 'Foliar Fungal Leaf Spot / Blight / Rust Possibility',
      type: 'Fungal Concern',
      matchingSymptoms: [
        'Brown, black, or rusty spots/lesions reported on leaves or stems',
        'Often favored by morning dew, high relative humidity (>70%), or dense wet canopy',
      ],
      distinguishingChecks: [
        'Check whether lesions have concentric target-like rings (typical of Alternaria early blight) or powdery rusty pustules that rub off on fingers (rust).',
        'Note whether spots begin on lower shaded leaves splashing from soil water.',
      ],
      managementGuidance: [
        'Avoid late-evening overhead sprinkler wetting; irrigate during morning hours so foliage dries before nightfall.',
        'Maintain proper plant spacing and remove heavily blighted basal leaves cleanly.',
        'Take an affected leaf in a sealed poly-bag to your nearest KVK plant clinic for microscopic verification.',
      ],
    });
  }

  // Rule 4: Wilting / root rot / collar rot
  if (
    syms.some((s) => s.includes('wilt') || s.includes('rot') || s.includes('droop')) ||
    desc.includes('wilt') ||
    desc.includes('dry') ||
    desc.includes('rot')
  ) {
    causes.push({
      name: 'Root-Zone Moisture Imbalance or Soil-Borne Vascular Wilt Possibility',
      type: 'Water / Environmental Stress',
      matchingSymptoms: [
        'Drooping, wilting, or basal stem/root discoloration reported',
        `Reported across ~${input.affectedAreaPct}% of the inspected area`,
      ],
      distinguishingChecks: [
        'Check root-zone moisture at 15 cm depth: if soil is dry, wilting may be moisture stress; if soil is wet/waterlogged, root asphyxiation or collar rot may be occurring.',
        'Uproot one dying plant and split the lower stem lengthwise—brown vascular browning inside the stem ring indicates possible Fusarium/bacterial wilt.',
      ],
      managementGuidance: [
        'Ensure excess rainwater drains immediately from low-lying plot corners.',
        'Do not flood-irrigate through patches showing soil-borne root rot, as flowing water carries fungal spores down the furrow.',
        'For future sowings, practice seed treatment and FYM enrichment with Trichoderma viride.',
      ],
    });
  }

  // Default fallback cause if none of the specific keywords matched
  if (causes.length === 0) {
    causes.push({
      name: 'Localized Environmental, Nutritional, or Early Biotic Stress',
      type: 'Water / Environmental Stress',
      matchingSymptoms: [
        `Reported symptoms (${input.symptomCategories.join(', ') || 'General field observation'}) on ${input.affectedParts.join(', ') || 'crop canopy'}`,
        `Crop is at ${input.growthStage} stage (${input.affectedAreaPct}% area noted)`,
      ],
      distinguishingChecks: [
        'Compare distribution pattern: straight lines or uniform borders often indicate irrigation/fertilizer/spray effects, whereas expanding circular patches often indicate pests or pathogens.',
        'Inspect both upper and lower leaf surfaces as well as the root collar zone.',
      ],
      managementGuidance: [
        'Record soil moisture at 10–15 cm depth and check recent temperature/humidity swings.',
        'Mark 5 representative plants and re-inspect in 48–72 hours to track whether symptoms are progressing.',
      ],
    });
  }

  const status: DiseaseReport['status'] =
    input.affectedAreaPct >= 8 || causes.length >= 2 ? 'Needs inspection' : 'Possible issue';

  return {
    farmId: input.farmId,
    farmName: input.farmName,
    plotName: input.plotName,
    cropName: input.cropName,
    variety: input.variety || 'Not specified',
    growthStage: input.growthStage,
    symptomCategories: input.symptomCategories,
    affectedParts: input.affectedParts,
    onsetDate: input.onsetDate,
    affectedAreaPct: input.affectedAreaPct,
    weatherIrrigationNotes: input.weatherIrrigationNotes,
    farmerDescription: input.farmerDescription,
    photoDataUrl: input.photoDataUrl,
    photoFileName: input.photoFileName,
    status,
    analysisMode: 'Demo symptom guidance',
    possibleCauses: causes,
    alternativeExplanations: [
      'Root-zone moisture deficit or localized waterlogging along uneven plot bunds.',
      'Secondary micronutrient lockup due to soil pH outside the 6.5–7.5 optimum window.',
      'Spray drift or residue effect from an adjacent plot or unwashed sprayer tank.',
    ],
    immediateInspectionSteps: [
      `Walk a diagonal 'W' pattern across ${input.plotName || 'the plot'} and inspect 20 plants at random.`,
      'Examine the underside of leaves with a 10x hand lens in morning light.',
      'Check root-zone moisture at 10–15 cm depth and verify irrigation emitter/furrow uniformity.',
      input.photoDataUrl
        ? 'Note on uploaded image: In Demo Mode, no external vision AI model was called; guidance above is generated transparently from your selected crop and symptom descriptors.'
        : 'Take clear close-up photos of the leaf top, leaf underside, and whole plant for your local KVK officer.',
    ],
    preventiveGuidance: [
      'Keep field bunds free of weeds that harbor insects and plant viruses.',
      'Use yellow/blue sticky traps and pheromone traps for early pest monitoring (IPM).',
      'Apply fertilizers strictly according to Soil Health Card recommendations rather than excess urea.',
    ],
    whenToConsultExpert: [
      'If symptoms spread to more than 5–10% of plants or affect the growing point/flowers.',
      'Before purchasing or spraying any chemical pesticide—always consult a qualified Krishi Vigyan Kendra (KVK) scientist, State Agriculture Officer, or licensed plant pathologist with fresh plant samples for verified crop-specific label directions.',
    ],
  };
}
