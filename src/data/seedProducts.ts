import { StoreProduct } from '../types';

export const SEED_STORE_PRODUCTS: StoreProduct[] = [
  // Category 1: Seeds and planting material (4 items)
  {
    id: 'prod-101',
    name: 'Pusa Yashasvi (HD-3226) Foundation Wheat Seed',
    category: 'Seeds and planting material',
    brand: 'AGRIPULSE SeedSelect (Sample Brand)',
    isSampleBrand: true,
    packSize: '40 kg Bag (1 Acre Seed Rate)',
    pricePaise: 148000, // ₹1,480
    mrpPaise: 165000,
    stockCount: 45,
    availability: 'In Stock',
    sellerName: 'Karnal Kisan Agro Cooperative (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat'],
    seasonTag: 'Rabi',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo Seasonal Offer: Save ₹170',
    shortDescription:
      'High-yielding irrigated timely-sown Rabi wheat seed lot bred for rust resistance and strong chapati quality.',
    detailedDescription:
      'Demonstration catalog listing for HD-3226 (Pusa Yashasvi) bread wheat seed. Suitable for timely irrigated sowing in Northwestern Plains. Features sturdy culms, high protein content, and genetic tolerance against yellow, brown, and black rusts.',
    usageInstructions:
      'Recommended seed rate: 40 kg per acre for timely line sowing using a Zero-Till or conventional seed-cum-fertilizer drill at 4–5 cm depth. Conduct a 100-seed germination check prior to sowing.',
    storageInstructions:
      'Store bags on wooden pallets in a cool, dry, rodent-free godown away from damp walls and fertilizers.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'seeds-wheat',
  },
  {
    id: 'prod-102',
    name: 'Pusa Basmati 1121 Graded Paddy Seed Lot',
    category: 'Seeds and planting material',
    brand: 'Narmada & Doab Seeds (Sample Brand)',
    isSampleBrand: true,
    packSize: '10 kg Bag',
    pricePaise: 92000, // ₹920
    mrpPaise: 105000,
    stockCount: 30,
    availability: 'In Stock',
    sellerName: 'Taraori Seed Hub (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Rice (Paddy)'],
    seasonTag: 'Kharif',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Extra-long slender aromatic Basmati paddy seed lot cleaned and graded for uniform nursery emergence.',
    detailedDescription:
      'Sample catalog listing for Pusa Basmati 1121 paddy seed. Renowned for exceptional kernel elongation upon cooking and strong market demand across GI-tagged Basmati districts.',
    usageInstructions:
      'Use 8–10 kg seed per acre for nursery raising. Soak seeds and treat with recommended bio-agents (Trichoderma / Pseudomonas) before sowing on raised nursery beds.',
    storageInstructions:
      'Keep below 12% seed moisture in breathable jute or woven sacks in a well-ventilated room.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'seeds-paddy',
  },
  {
    id: 'prod-103',
    name: 'Arka Rakshak F1 Hybrid Tomato Seed Packet',
    category: 'Seeds and planting material',
    brand: 'HortiPulse Genetics (Sample Brand)',
    isSampleBrand: true,
    packSize: '10 g Foil Pouch (~2,800 seeds)',
    pricePaise: 54000, // ₹540
    mrpPaise: 60000,
    stockCount: 60,
    availability: 'In Stock',
    sellerName: 'GreenHouse Inputs India (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Vegetables'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: false,
    isNewArrival: true,
    demoOfferLabel: 'Demo Bundle Eligible',
    shortDescription:
      'Triple-disease tolerant F1 hybrid tomato seed suitable for staked open-field and drip-irrigated beds.',
    detailedDescription:
      'Demonstration listing for high-yielding F1 hybrid tomato seeds bred for firm square-round deep-red fruits, good transport shelf life, and tolerance to leaf curl, bacterial wilt, and early blight.',
    usageInstructions:
      'Sow in 98-cavity pro-trays using sterilized cocopeat + vermicompost media. Transplant 25–28 day old seedlings onto raised beds at 60 x 45 cm spacing.',
    storageInstructions:
      'Keep hermetically sealed foil packet closed in a cool, dark place until nursery sowing day.',
    shippingEstimateDays: 'Estimated 2–3 days (Demo Delivery Estimate)',
    imageSvgType: 'seeds-vegetable',
  },
  {
    id: 'prod-104',
    name: 'Pusa Bold (RH-749) Indian Mustard Seed',
    category: 'Seeds and planting material',
    brand: 'AGRIPULSE SeedSelect (Sample Brand)',
    isSampleBrand: true,
    packSize: '2 kg Pack (1 Acre Pack)',
    pricePaise: 31000, // ₹310
    mrpPaise: 35000,
    stockCount: 50,
    availability: 'In Stock',
    sellerName: 'Karnal Kisan Agro Cooperative (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Mustard (Sarson)'],
    seasonTag: 'Rabi',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Bold-seeded Rabi mustard seed lot with high oil content (39–41%) and vigorous branching.',
    detailedDescription:
      'Sample listing for bold-seeded Indian mustard (Brassica juncea). Performs well under conserved soil moisture and limited irrigation regimes across northern and central India.',
    usageInstructions:
      'Sow 1.5 to 2.0 kg seed per acre in rows 30–45 cm apart at 3–4 cm depth. Thin seedlings 15–20 days after sowing to maintain 15 cm plant-to-plant distance.',
    storageInstructions:
      'Store in dry, airtight containers away from heat and moisture.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'seeds-mustard',
  },

  // Category 2: Fertilizers and soil nutrients (3 items)
  {
    id: 'prod-201',
    name: 'Water-Soluble NPK 19:19:19 + TE Foliar & Drip Grade',
    category: 'Fertilizers and soil nutrients',
    brand: 'NutriFlow Agro (Sample Brand)',
    isSampleBrand: true,
    packSize: '5 kg Moisture-Proof Bag',
    pricePaise: 68500, // ₹685
    mrpPaise: 76000,
    stockCount: 80,
    availability: 'In Stock',
    sellerName: 'Doab Crop Nutrition Center (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Wheat', 'Rice (Paddy)', 'Cotton', 'Vegetables', 'Pulses'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo Offer: 10% Off',
    shortDescription:
      '100% water-soluble balanced NPK fertilizer enriched with chelated trace elements for drip fertigation and foliar spray.',
    detailedDescription:
      'Demonstration listing for free-flowing crystalline NPK 19:19:19 fertilizer. Dissolves rapidly in water without clogging drip emitters or sprayer nozzles. Supports vigorous vegetative growth and root establishment.',
    usageInstructions:
      'Foliar spray: Dissolve 4–5 g per liter of clean water and spray during cool morning or evening hours. Drip fertigation: Apply 2–3 kg per acre according to crop stage and soil test recommendations.',
    storageInstructions:
      'Reseal inner liner tightly after opening to prevent caking from atmospheric humidity.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'fertilizer-npk',
  },
  {
    id: 'prod-202',
    name: 'Zinc Sulphate Heptahydrate (21% Zn) Agricultural Grade',
    category: 'Fertilizers and soil nutrients',
    brand: 'MicroShield Nutrients (Sample Brand)',
    isSampleBrand: true,
    packSize: '10 kg Bag',
    pricePaise: 59000, // ₹590
    mrpPaise: 65000,
    stockCount: 40,
    availability: 'In Stock',
    sellerName: 'Doab Crop Nutrition Center (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Rice (Paddy)', 'Wheat', 'Maize', 'Chickpea (Chana)'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Essential micronutrient supplement for preventing Khaira disease in paddy and boosting tillering in wheat.',
    detailedDescription:
      'Sample catalog listing for FCO-grade Zinc Sulphate (21% Zn, 10% S). Corrects zinc deficiency in alluvial and alkaline soils where intensive cereal cropping depletes micronutrient reserves.',
    usageInstructions:
      'Soil application: Broadcast 10 kg per acre mixed with dry soil or sand at field preparation. Do not mix directly with phosphatic fertilizers (DAP/SSP) as zinc phosphate precipitates.',
    storageInstructions:
      'Store in a cool, dry shed away from direct sunlight and livestock feed.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'fertilizer-zinc',
  },
  {
    id: 'prod-203',
    name: 'Chelated Micronutrient Mix (Zn, Fe, Mn, Cu, B, Mo)',
    category: 'Fertilizers and soil nutrients',
    brand: 'MicroShield Nutrients (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 kg Pouch',
    pricePaise: 46000, // ₹460
    mrpPaise: 52000,
    stockCount: 35,
    availability: 'In Stock',
    sellerName: 'GreenHouse Inputs India (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Vegetables', 'Wheat'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'EDTA-chelated multi-micronutrient powder for rapid correction of interveinal yellowing and flower drop.',
    detailedDescription:
      'Demonstration listing for balanced multi-micronutrient foliar mix. Chelation keeps Iron, Zinc, and Manganese plant-available even when spray water or soil is mildly alkaline.',
    usageInstructions:
      'Dissolve 1.0 to 1.5 g per liter of water for foliar spray during pre-flowering and fruit/pod setting stages, guided by leaf symptom check or Soil Health Card.',
    storageInstructions:
      'Keep pouch tightly zipped in a dry cabinet away from children.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'fertilizer-micro',
  },

  // Category 3: Crop protection products (3 items — IPM traps, botanical neem, and bio-fungicide)
  {
    id: 'prod-301',
    name: 'UV-Stable Yellow & Blue Sticky Traps (IPM Combo Pack)',
    category: 'Crop protection products',
    brand: 'EcoGuard IPM (Sample Brand)',
    isSampleBrand: true,
    packSize: 'Pack of 25 Sheets (20 Yellow + 5 Blue)',
    pricePaise: 34000, // ₹340
    mrpPaise: 42000,
    stockCount: 95,
    availability: 'In Stock',
    sellerName: 'BioAgri Solutions Hub (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Cotton', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Vegetables'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo IPM Best Seller',
    shortDescription:
      'Non-toxic waterproof adhesive trap sheets for early monitoring and mass trapping of whiteflies, aphids, jassids, and thrips.',
    detailedDescription:
      'Sample catalog listing for heavy-duty 6x8 inch polypropylene sticky traps coated on both sides with rain-resistant, non-drying entomological glue. Essential first line of defense in Integrated Pest Management (IPM).',
    usageInstructions:
      'Hang 8–10 traps per acre for monitoring or 20–25 traps per acre for mass trapping on bamboo stakes just 10–15 cm above the crop canopy. Raise trap height as the crop grows.',
    storageInstructions:
      'Store flat in original release-paper box away from dust and excessive heat.',
    safetyOrLegalNote:
      'Non-chemical physical monitoring tool. Safe for pollinators when hung at recommended canopy height.',
    shippingEstimateDays: 'Estimated 2–3 days (Demo Delivery Estimate)',
    imageSvgType: 'protection-traps',
  },
  {
    id: 'prod-302',
    name: 'Azadirachtin 1500 ppm Cold-Pressed Neem Oil Bio-Emulsion',
    category: 'Crop protection products',
    brand: 'Vanaspati BioCare (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Liter Bottle',
    pricePaise: 42500, // ₹425
    mrpPaise: 49000,
    stockCount: 55,
    availability: 'In Stock',
    sellerName: 'BioAgri Solutions Hub (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Rice (Paddy)', 'Wheat', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Cotton'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Botanical neem kernel extract formulation with natural emulsifiers for antifeedant and repellent action against sucking pests.',
    detailedDescription:
      'Demonstration listing for botanical Azadirachtin 0.15% EC (1500 ppm) neem oil formulation. Acts as an antifeedant, oviposition deterrent, and insect growth regulator while sparing beneficial ladybird beetles and spiders when sprayed in evening hours.',
    usageInstructions:
      'Follow product label directions carefully (typically 3–5 ml per liter of water with thorough under-leaf coverage during late afternoon). Consult local extension advisories for crop-specific intervals.',
    storageInstructions:
      'Store in original tightly capped container in a cool, shaded storehouse below 35°C.',
    safetyOrLegalNote:
      'Always read and follow the enclosed product label and wear protective gloves/mask during mixing and spraying.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'protection-neem',
  },
  {
    id: 'prod-303',
    name: 'Funnel Pheromone Trap Kit with Helicoverpa Lures',
    category: 'Crop protection products',
    brand: 'EcoGuard IPM (Sample Brand)',
    isSampleBrand: true,
    packSize: 'Pack of 5 Traps + 10 Septa Lures',
    pricePaise: 38000, // ₹380
    mrpPaise: 45000,
    stockCount: 42,
    availability: 'In Stock',
    sellerName: 'BioAgri Solutions Hub (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Chickpea (Chana)', 'Tomato', 'Cotton', 'Pigeonpea (Arhar)'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'Weather-resistant yellow-green funnel traps with pheromone septa for monitoring gram pod borer / fruit borer moth flights.',
    detailedDescription:
      'Sample catalog listing for reusable funnel pheromone traps with sealed rubber septa lures for Helicoverpa armigera. Helps farmers detect adult moth emergence early before larval damage begins.',
    usageInstructions:
      'Install 5 traps per acre at 50 meter grid spacing just above crop height from flower-bud initiation stage. Replace pheromone lure every 21–25 days without touching the lure with bare fingers.',
    storageInstructions:
      'Keep unused pheromone lures in sealed aluminum foil pouches inside a refrigerator or cool dark box.',
    shippingEstimateDays: 'Estimated 3–4 days (Demo Delivery Estimate)',
    imageSvgType: 'protection-pheromone',
  },

  // Category 4: Organic farming inputs (3 items)
  {
    id: 'prod-401',
    name: 'Enriched Granular Vermicompost (Earthworm Humus)',
    category: 'Organic farming inputs',
    brand: 'DhartiAmrit Organics (Sample Brand)',
    isSampleBrand: true,
    packSize: '50 kg HDPE Bag',
    pricePaise: 45000, // ₹450
    mrpPaise: 52000,
    stockCount: 120,
    availability: 'In Stock',
    sellerName: 'Satpura & Doab Organic Producer Co. (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Wheat', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Vegetables'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Sieved, odor-free organic vermicompost with high humus content and beneficial soil microbes.',
    detailedDescription:
      'Demonstration listing for mature Eisenia fetida earthworm compost with ~25–30% moisture, neutral pH, and rich humic substances. Improves soil tilth, water retention, and root nodulation.',
    usageInstructions:
      'Incorporate into topsoil during final bed preparation or apply 150–250 g around the root zone of vegetable plants before earthing up.',
    storageInstructions:
      'Store bags under shade and sprinkle light water if kept for long periods so beneficial microbes remain active.',
    shippingEstimateDays: 'Estimated 3–6 days (Demo Delivery Estimate)',
    imageSvgType: 'organic-vermi',
  },
  {
    id: 'prod-402',
    name: 'Trichoderma viride Bio-Control Seed & Soil Inoculant',
    category: 'Organic farming inputs',
    brand: 'DhartiAmrit Organics (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 kg Talc-Based Carrier Pack (CFU ≥ 2×10⁶/g)',
    pricePaise: 24000, // ₹240
    mrpPaise: 29000,
    stockCount: 65,
    availability: 'In Stock',
    sellerName: 'Satpura & Doab Organic Producer Co. (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Chickpea (Chana)', 'Tomato', 'Wheat', 'Rice (Paddy)', 'Mustard (Sarson)'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo Essential Bio-Input',
    shortDescription:
      'Beneficial antagonistic fungus for seed treatment and FYM enrichment against soil-borne root rot and wilt.',
    detailedDescription:
      'Sample catalog listing for Trichoderma viride biological formulation. Colonizes the rhizosphere around young roots and suppresses pathogenic Fusarium, Rhizoctonia, and Pythium fungi naturally.',
    usageInstructions:
      'Seed treatment: Mix 8–10 g per kg of seed with light moisture in shade before sowing. Soil application: Mix 1–2 kg in 100 kg moist well-decomposed FYM, cover with gunny bag under shade for 7 days, and broadcast over 1 acre.',
    storageInstructions:
      'Store in a cool, dry place below 30°C. Do not mix directly with chemical fungicides.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'organic-trichoderma',
  },
  {
    id: 'prod-403',
    name: 'Liquid Consortia Bio-Fertilizer (Rhizobium + PSB + KMB)',
    category: 'Organic farming inputs',
    brand: 'BioAgri Solutions (Sample Brand)',
    isSampleBrand: true,
    packSize: '500 ml Bottle',
    pricePaise: 29500, // ₹295
    mrpPaise: 34000,
    stockCount: 50,
    availability: 'In Stock',
    sellerName: 'BioAgri Solutions Hub (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Chickpea (Chana)', 'Wheat', 'Rice (Paddy)', 'Mustard (Sarson)', 'Soybean'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'Liquid microbial consortium combining nitrogen-fixing, phosphate-solubilizing, and potash-mobilizing bacteria.',
    detailedDescription:
      'Demonstration listing for liquid NPK bio-fertilizer consortium. Helps unlock insoluble soil phosphorus and potassium while fixing atmospheric nitrogen in the root zone.',
    usageInstructions:
      'Can be used for seed coating (5–10 ml per kg seed), seedling root dip, or drip/soil drenching mixed with compost.',
    storageInstructions:
      'Keep away from direct sunlight and chemical bactericides; use before expiry date.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'organic-biofert',
  },

  // Category 5: Soil testing and farm-monitoring kits (3 items)
  {
    id: 'prod-501',
    name: '3-in-1 Analog Soil Moisture, pH & Light Probe Meter',
    category: 'Soil testing and farm-monitoring kits',
    brand: 'AGRIPULSE FieldTools (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Unit (20 cm Dual-Electrode Probe)',
    pricePaise: 78000, // ₹780
    mrpPaise: 95000,
    stockCount: 28,
    availability: 'In Stock',
    sellerName: 'Precision Kisan Instruments (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat', 'Rice (Paddy)', 'Tomato', 'Mustard (Sarson)', 'Chickpea (Chana)'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo Smart Farm Pick',
    shortDescription:
      'Battery-free dual-needle field probe for quick root-zone moisture trend checks and approximate soil pH screening.',
    detailedDescription:
      'Sample catalog listing for a portable field probe used by farmers to check relative root-zone moisture at 10–18 cm depth before scheduling irrigation. Helps record field observations directly into AGRIPULSE.',
    usageInstructions:
      'Wipe probes clean with a dry cloth, insert 15 cm vertically into moist root-zone soil avoiding stones, wait 60 seconds, and read the scale. For certified nutrient decisions, always pair with a laboratory Soil Health Card.',
    storageInstructions:
      'Clean and dry electrodes after every field walk; do not leave inserted in soil permanently.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'kit-soilprobe',
  },
  {
    id: 'prod-502',
    name: 'Field Tensiometer Tube (30 cm Root-Zone Vacuum Gauge)',
    category: 'Soil testing and farm-monitoring kits',
    brand: 'AGRIPULSE FieldTools (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Complete Assembly with Ceramic Tip & Gauge',
    pricePaise: 165000, // ₹1,650
    mrpPaise: 190000,
    stockCount: 14,
    availability: 'Low Stock',
    sellerName: 'Precision Kisan Instruments (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Rice (Paddy)', 'Wheat', 'Tomato', 'Sugarcane'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'PAU-style color-coded vacuum gauge tensiometer for scientific irrigation scheduling in paddy and wheat.',
    detailedDescription:
      'Demonstration listing for an agricultural soil water tension meter featuring green (adequate moisture), yellow (irrigate now), and red (dry stress) dial zones.',
    usageInstructions:
      'Soak ceramic tip in clean boiled/cooled water overnight before installation. Auger a snug hole to 20–25 cm depth in a representative plot spot and top up tube with water.',
    storageInstructions:
      'Remove from field before mechanical harvesting and protect ceramic tip from freezing or impact.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'kit-tensiometer',
  },
  {
    id: 'prod-503',
    name: 'Rapid Soil NPK & pH Colorimetric Field Test Kit (25 Tests)',
    category: 'Soil testing and farm-monitoring kits',
    brand: 'KrishiLab Diagnostics (Sample Brand)',
    isSampleBrand: true,
    packSize: 'Carry Case with Reagents, Test Tubes & Color Charts',
    pricePaise: 129000, // ₹1,290
    mrpPaise: 149000,
    stockCount: 22,
    availability: 'In Stock',
    sellerName: 'Precision Kisan Instruments (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat', 'Rice (Paddy)', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Tomato'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Portable reagent test kit to estimate Low / Medium / High status of soil pH, Nitrogen, Phosphorus, and Potash on the farm.',
    detailedDescription:
      'Sample catalog listing for an educational and field-screening soil test box containing extraction tablets, capsules, distilled water dropper bottles, and laminated shade cards.',
    usageInstructions:
      'Collect a composite zig-zag soil sample from 8 spots at 15 cm depth, air-dry in shade, sieve, and follow the step-by-step color chart booklet.',
    storageInstructions:
      'Keep reagent bottles tightly capped in the foam carry case away from sunlight.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'kit-soiltest',
  },

  // Category 6: Irrigation equipment (3 items)
  {
    id: 'prod-601',
    name: '16mm Inline Drip Lateral Pipe Roll (40 cm Emitter Spacing)',
    category: 'Irrigation equipment',
    brand: 'JalDhara MicroIrrigation (Sample Brand)',
    isSampleBrand: true,
    packSize: '300 Meter Coil (2.0 LPH Cylindrical Drippers)',
    pricePaise: 245000, // ₹2,450
    mrpPaise: 280000,
    stockCount: 18,
    availability: 'In Stock',
    sellerName: 'Haryana Micro-Irrigation Supplies (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Vegetables', 'Cotton', 'Sugarcane'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo Water-Saver Pick',
    shortDescription:
      'UV-stabilized virgin LLDPE 16mm inline drip lateral with clog-resistant turbulent-flow emitters.',
    detailedDescription:
      'Demonstration listing for agricultural inline drip irrigation tubing. Delivers uniform 2 liters per hour per emitter across vegetable and row-crop beds.',
    usageInstructions:
      'Use with a 120-mesh screen or disc filter on the main header line. Flush lateral ends every 15 days by opening end-caps for 2 minutes.',
    storageInstructions:
      'Coil neatly after season harvest and store under shade away from rodents.',
    shippingEstimateDays: 'Estimated 4–6 days (Demo Delivery Estimate)',
    imageSvgType: 'irrigation-drip',
  },
  {
    id: 'prod-602',
    name: '3/4 Inch Brass Impact Sprinkler Nozzle Set with Riser Stand',
    category: 'Irrigation equipment',
    brand: 'JalDhara MicroIrrigation (Sample Brand)',
    isSampleBrand: true,
    packSize: 'Set of 2 Brass Heads + Tripod Risers',
    pricePaise: 138000, // ₹1,380
    mrpPaise: 155000,
    stockCount: 25,
    availability: 'In Stock',
    sellerName: 'Haryana Micro-Irrigation Supplies (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Mustard (Sarson)', 'Chickpea (Chana)', 'Wheat', 'Pulses'],
    seasonTag: 'Rabi',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Heavy-duty twin-nozzle brass rotary impact sprinklers for uniform rain-like irrigation in mustard, gram, and wheat.',
    detailedDescription:
      'Sample catalog listing for corrosion-resistant brass sprinkler heads with stainless steel fulcrum springs. Covers a 10–12 meter radius at 2.0–2.5 kg/cm² operating pressure.',
    usageInstructions:
      'Operate during calm morning or evening hours when wind speed is below 12 km/h for uniform water distribution.',
    storageInstructions:
      'Drain water and store nozzles in a dry toolbox after the irrigation season.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'irrigation-sprinkler',
  },
  {
    id: 'prod-603',
    name: '1 Inch Venturi Fertilizer Injector Assembly with Suction Hose',
    category: 'Irrigation equipment',
    brand: 'JalDhara MicroIrrigation (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Complete Kit (Injector + Filter Foot Valve + Metering Valve)',
    pricePaise: 112000, // ₹1,120
    mrpPaise: 130000,
    stockCount: 19,
    availability: 'In Stock',
    sellerName: 'Haryana Micro-Irrigation Supplies (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Cotton', 'Vegetables', 'Sugarcane'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'Differential-pressure venturi injector for smooth fertigation of water-soluble nutrients into drip systems.',
    detailedDescription:
      'Demonstration listing for chemical-resistant polypropylene venturi injector. Operates on main-line water pressure without requiring an external motor.',
    usageInstructions:
      'Dissolve water-soluble fertilizer in a clean plastic bucket, immerse the strainer foot valve, and run clean water through the drip line for 10 minutes after fertigation ends.',
    storageInstructions:
      'Flush suction tube with clean water immediately after each fertigation use.',
    shippingEstimateDays: 'Estimated 3–4 days (Demo Delivery Estimate)',
    imageSvgType: 'irrigation-venturi',
  },

  // Category 7: Sprayers and farm tools (2 items)
  {
    id: 'prod-701',
    name: '16L Dual-Mode (Battery + Manual) Knapsack Agricultural Sprayer',
    category: 'Sprayers and farm tools',
    brand: 'KisanShakti AgroTech (Sample Brand)',
    isSampleBrand: true,
    packSize: '16 Liter Tank + 12V 8Ah Battery + 4 Nozzle Set',
    pricePaise: 269000, // ₹2,690
    mrpPaise: 315000,
    stockCount: 15,
    availability: 'In Stock',
    sellerName: 'Karnal Farm Machinery Mart (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat', 'Rice (Paddy)', 'Tomato', 'Mustard (Sarson)', 'Chickpea (Chana)'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Demo Equipment Deal',
    shortDescription:
      'Ergonomic 16-liter knapsack sprayer with pressure regulator, telescopic brass lance, and interchangeable flat-fan / hollow-cone nozzles.',
    detailedDescription:
      'Sample catalog listing for a 2-in-1 rechargeable battery and manual lever knapsack sprayer. Includes padded shoulder straps, back cushion, inlet strainer, and 4 specialized nozzles.',
    usageInstructions:
      'Use the Flat-Fan nozzle for soil/weed sprays and the Hollow-Cone nozzle for foliar sprays. Triple-rinse tank with clean water after every spray session.',
    storageInstructions:
      'Charge battery once every 2 months during off-season storage to preserve battery health.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'sprayer-knapsack',
  },
  {
    id: 'prod-702',
    name: 'Wheel Hoe Inter-Row Weeder with Twin Tine & Sweep Blade',
    category: 'Sprayers and farm tools',
    brand: 'KisanShakti AgroTech (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Complete Adjustable Frame + 2 Blade Attachments',
    pricePaise: 185000, // ₹1,850
    mrpPaise: 210000,
    stockCount: 11,
    availability: 'Low Stock',
    sellerName: 'Karnal Farm Machinery Mart (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Mustard (Sarson)', 'Chickpea (Chana)', 'Tomato', 'Vegetables', 'Cotton'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'Push-pull manual wheel hoe that reduces inter-row weeding labor by 60% in line-sown crops.',
    detailedDescription:
      'Demonstration listing for a heavy-gauge powder-coated steel wheel hoe with height-adjustable handles and hardened carbon-steel V-sweep blade. Cuts shallow surface weeds and aerates crusted topsoil.',
    usageInstructions:
      'Operate 3–5 days after irrigation or rain when topsoil is at friable ("wattar") moisture.',
    storageInstructions:
      'Wipe soil off blades and apply a light coat of oil to prevent rust.',
    shippingEstimateDays: 'Estimated 4–6 days (Demo Delivery Estimate)',
    imageSvgType: 'tool-wheelhoe',
  },

  // Category 8: Hand tools and accessories (2 items)
  {
    id: 'prod-801',
    name: 'High-Carbon Steel Serrated Harvesting Sickle (Daranti) — Pack of 2',
    category: 'Hand tools and accessories',
    brand: 'GraminForge Tools (Sample Brand)',
    isSampleBrand: true,
    packSize: 'Pack of 2 Sickles with Seasoned Wooden Grips',
    pricePaise: 32000, // ₹320
    mrpPaise: 38000,
    stockCount: 70,
    availability: 'In Stock',
    sellerName: 'Karnal Farm Machinery Mart (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat', 'Rice (Paddy)', 'Mustard (Sarson)', 'Chickpea (Chana)'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Lightweight, balanced CIAE-pattern serrated sickles designed for low wrist fatigue during cereal and fodder harvesting.',
    detailedDescription:
      'Sample catalog listing for heat-treated serrated harvesting sickles. Finely milled teeth grip stems cleanly without pulling roots out of the soil.',
    usageInstructions:
      'Cut stems at a 30–45 degree upward pull angle. Keep blade dry after morning dew harvesting.',
    storageInstructions:
      'Hang in a dry tool shed out of reach of children.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'tool-sickle',
  },
  {
    id: 'prod-802',
    name: '10x Illuminated Pocket Magnifier Loupe for Field Pest Scouting',
    category: 'Hand tools and accessories',
    brand: 'AGRIPULSE FieldTools (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Folding Metal Loupe with Protective Case',
    pricePaise: 28000, // ₹280
    mrpPaise: 34000,
    stockCount: 40,
    availability: 'In Stock',
    sellerName: 'Precision Kisan Instruments (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Tomato', 'Cotton', 'Mustard (Sarson)', 'Wheat', 'Rice (Paddy)'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    shortDescription:
      'Folding 10x glass hand lens for spotting tiny red spider mites, thrips, whitefly nymphs, and fungal rust pustules on leaves.',
    detailedDescription:
      'Demonstration listing for a compact 21mm triplet optical glass magnifier used by progressive farmers and crop scouts to inspect the underside of leaves accurately.',
    usageInstructions:
      'Hold the lens 2.5 cm from the leaf surface in good daylight to distinguish mites and insect eggs from dust specs.',
    storageInstructions:
      'Fold lens into metal housing when in pocket to prevent scratches.',
    shippingEstimateDays: 'Estimated 2–3 days (Demo Delivery Estimate)',
    imageSvgType: 'tool-loupe',
  },

  // Category 9: Farm safety equipment (2 items)
  {
    id: 'prod-901',
    name: 'Complete Applicator Safety PPE Kit (Goggles, Respirator, Nitrile Gloves & Apron)',
    category: 'Farm safety equipment',
    brand: 'SurakshaKisan Safety (Sample Brand)',
    isSampleBrand: true,
    packSize: '5-Piece Reusable Safety Kit (Free Size)',
    pricePaise: 64000, // ₹640
    mrpPaise: 78000,
    stockCount: 60,
    availability: 'In Stock',
    sellerName: 'Suraksha Agro Safety Supplies (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat', 'Rice (Paddy)', 'Tomato', 'Mustard (Sarson)', 'Cotton', 'Chickpea (Chana)'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Farmer Safety Priority',
    shortDescription:
      'Essential personal protective equipment kit for safe handling, mixing, and spraying of agricultural inputs.',
    detailedDescription:
      'Sample catalog listing containing chemical-splash resistant Elbow-Length Nitrile Gloves, Anti-Fog Wrap-Around Goggles, Dual-Cartridge Particulate/Mist Half-Mask, PVC Apron, and Head Hood.',
    usageInstructions:
      'Wear before opening any crop-protection bottle or pouch. Always spray with wind at your back, never against the wind. Wash gloves with soap and water before removing them.',
    storageInstructions:
      'Wash, air-dry in shade, and store in a dedicated zipped bag separate from household clothing.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'safety-ppe',
  },
  {
    id: 'prod-902',
    name: 'High-Ankle Anti-Skid PVC Gumboots with Solar Rechargeable Torch',
    category: 'Farm safety equipment',
    brand: 'SurakshaKisan Safety (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Pair Gumboots (Size 8/9 Standard) + 1 Solar Field Torch',
    pricePaise: 89000, // ₹890
    mrpPaise: 105000,
    stockCount: 32,
    availability: 'In Stock',
    sellerName: 'Suraksha Agro Safety Supplies (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Rice (Paddy)', 'Wheat', 'Sugarcane', 'Mustard (Sarson)'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: false,
    shortDescription:
      'Knee-high waterproof irrigation boots paired with a bright solar-rechargeable LED torch for safe night canal turns.',
    detailedDescription:
      'Demonstration listing designed for farmers managing night-time canal irrigation ("warabandi") and wet field bund walks. Protects feet from snakebites, thorns, sharp stubble, and chemical spray drift.',
    usageInstructions:
      'Shake boots upside down before wearing. Charge torch via top solar panel or USB port.',
    storageInstructions:
      'Rinse mud off boots after field use and store upright in shade.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'safety-boots',
  },

  // Category 10: Harvesting and storage supplies (2 items)
  {
    id: 'prod-1001',
    name: 'Hermetic Multi-Layer Grain Storage Liner Bags (50 kg Capacity)',
    category: 'Harvesting and storage supplies',
    brand: 'AnnRakshak Storage (Sample Brand)',
    isSampleBrand: true,
    packSize: 'Pack of 10 Hermetic Liner Bags (90 Micron)',
    pricePaise: 75000, // ₹750
    mrpPaise: 88000,
    stockCount: 85,
    availability: 'In Stock',
    sellerName: 'Karnal Kisan Agro Cooperative (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Wheat', 'Rice (Paddy)', 'Chickpea (Chana)', 'Mustard (Sarson)'],
    seasonTag: 'All Season',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    demoOfferLabel: 'Chemical-Free Seed Storage',
    shortDescription:
      'Airtight gas-barrier inner liner bags that protect stored wheat, pulses, and seed lots from weevils and moisture without fumigants.',
    detailedDescription:
      'Sample catalog listing for co-extruded multi-layer hermetic grain storage bags. Placed inside standard jute or PP sacks, they lock out monsoon humidity and suffocate storage insects (bruchids/weevils) naturally.',
    usageInstructions:
      'Dry grain thoroughly to safe moisture (<12% for wheat/paddy, <10% for pulses/mustard), fill liner bag inside an outer jute sack, squeeze out excess air, and twist-tie securely.',
    storageInstructions:
      'Inspect liners for pinholes before filling; stack filled bags on wooden dunnage away from walls.',
    shippingEstimateDays: 'Estimated 2–4 days (Demo Delivery Estimate)',
    imageSvgType: 'storage-hermetic',
  },
  {
    id: 'prod-1002',
    name: 'Digital Portable Grain Moisture Meter (Paddy, Wheat, Mustard & Gram)',
    category: 'Harvesting and storage supplies',
    brand: 'AGRIPULSE FieldTools (Sample Brand)',
    isSampleBrand: true,
    packSize: '1 Handheld Digital Unit with Sampling Cup & Carry Pouch',
    pricePaise: 215000, // ₹2,150
    mrpPaise: 250000,
    stockCount: 16,
    availability: 'In Stock',
    sellerName: 'Precision Kisan Instruments (Demo Seller)',
    isDemoSeller: true,
    compatibleCrops: ['Rice (Paddy)', 'Wheat', 'Mustard (Sarson)', 'Chickpea (Chana)'],
    seasonTag: 'All Season',
    isFeatured: false,
    isPopular: true,
    isNewArrival: true,
    shortDescription:
      'Pre-calibrated digital grain moisture tester (8%–35% range) to verify harvest readiness and mandi procurement standards.',
    detailedDescription:
      'Demonstration listing for a microprocessor-based grain moisture meter with dedicated crop codes for Paddy, Wheat, Mustard, Chickpea, Maize, and Soybean. Helps prevent mandi moisture deductions and storage spoilage.',
    usageInstructions:
      'Select the crop code on the LCD screen, fill the measuring cup with clean threshed grain, screw down the compression cap until the indicator aligns, and read moisture percentage.',
    storageInstructions:
      'Empty grain cup immediately after testing and remove 9V battery if storing unused for over 30 days.',
    shippingEstimateDays: 'Estimated 3–5 days (Demo Delivery Estimate)',
    imageSvgType: 'storage-moisturemeter',
  },
];

export const VALID_DEMO_PROMO_CODES: {
  code: string;
  discountPct: number;
  maxDiscountPaise: number;
  minSubtotalPaise: number;
  description: string;
}[] = [
  {
    code: 'KISAN10',
    discountPct: 10,
    maxDiscountPaise: 50000, // Max ₹500
    minSubtotalPaise: 50000, // Min ₹500
    description: 'Farmer First: 10% off on orders above ₹500 (up to ₹500 discount)',
  },
  {
    code: 'HARVEST15',
    discountPct: 15,
    maxDiscountPaise: 75000, // Max ₹750
    minSubtotalPaise: 100000, // Min ₹1,000
    description: 'Harvest Festival Special: 15% off on orders above ₹1,000 (up to ₹750 discount)',
  },
  {
    code: 'RABISEASON',
    discountPct: 15,
    maxDiscountPaise: 75000, // Max ₹750
    minSubtotalPaise: 150000, // Min ₹1,500
    description: 'Rabi Season Special: 15% off on Rabi inputs above ₹1,500 (up to ₹750 discount)',
  },
  {
    code: 'AGRI500',
    discountPct: 20,
    maxDiscountPaise: 50000, // Max ₹500
    minSubtotalPaise: 200000, // Min ₹2,000
    description: 'Mega Agri Voucher: 20% off up to ₹500 on orders above ₹2,000',
  },
];

// Helper to enrich base products with complete ecommerce metadata
function enrichProducts(base: StoreProduct[]): StoreProduct[] {
  return base.map((p, idx) => {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sku = `AGRI-${p.id.toUpperCase()}`;
    const rating = Number((4.6 + ((idx % 4) * 0.1)).toFixed(1));
    const reviewCount = 28 + ((idx * 7) % 75);

    // Sample product content; no listing claim is verified in the prototype.
    const highlights = [
      'Illustrative product description only; manufacturer and certifications are not verified.',
      'Confirm crop fit, directions, and safety information against an authorized product label.',
      'No independent testing, performance evidence, or warranty is connected to this sample listing.',
      'Price, stock, delivery, and return details are simulated for interface preview.',
    ];

    // Contextual specifications
    const specifications = [
      { label: 'Category', value: p.category },
      { label: 'Brand', value: p.brand },
      { label: 'Model / SKU', value: sku },
      { label: 'Packaging', value: p.packSize },
      { label: 'Target Crops', value: p.compatibleCrops.join(', ') || 'All Major Agricultural Crops' },
      { label: 'Seasonal Suitability', value: p.seasonTag },
      { label: 'Country of Origin', value: 'Not verified in this prototype' },
      { label: 'Quality Standard', value: 'Not verified in this prototype' },
      { label: 'Storage Condition', value: p.storageInstructions },
      { label: 'Application Method', value: p.usageInstructions.slice(0, 100) + '...' },
    ];

    // Contextual FAQs
    const faqs = [
      {
        question: `How should ${p.name} be applied on my farm?`,
        answer: p.usageInstructions,
      },
      {
        question: `How should I safely store unused quantities?`,
        answer: p.storageInstructions,
      },
      {
        question: 'Is this eligible for demo discounts and free delivery?',
        answer: 'Yes! All demo orders above ₹999 qualify for Free Demo Shipping. You can also apply coupon KISAN10 at checkout for an instant 10% discount.',
      },
      {
        question: 'What is the return or replacement policy for this product?',
        answer: 'AGRIPULSE sample listings include an illustrative 7-day replacement window if the delivered packaging is damaged, broken, or does not match specifications.',
      },
    ];

    // Customer reviews
    const reviews = [
      {
        id: `rev-${p.id}-1`,
        userName: 'Demo Farmer (Sample)',
        rating: 5,
        title: 'Illustrative review placeholder',
        comment: `Sample review content for interface preview only. This is not a customer testimonial or a report of product performance.`,
        date: '2026-10-08',
        verifiedPurchase: false,
      },
      {
        id: `rev-${p.id}-2`,
        userName: 'Demo Farmer (Sample)',
        rating: 4,
        title: 'Sample product feedback placeholder',
        comment: `Placeholder review for interface preview. No purchase, batch verification, or product outcome is represented.`,
        date: '2026-09-29',
        verifiedPurchase: false,
      },
    ];

    // Related products (picking 3 other products in same category or adjacent)
    const relatedProductIds = base
      .filter((other) => other.id !== p.id && (other.category === p.category || other.seasonTag === p.seasonTag))
      .slice(0, 4)
      .map((o) => o.id);

    return {
      ...p,
      slug,
      sku,
      rating: p.rating ?? rating,
      reviewCount: p.reviewCount ?? reviewCount,
      highlights: p.highlights ?? highlights,
      specifications: p.specifications ?? specifications,
      manufacturer: p.manufacturer ?? {
        name: `${p.brand.replace(/ \(.*\)/, '')} (sample manufacturer record)`,
        originCountry: 'India',
        address: 'Not provided — sample record only',
        supportContact: 'No support channel connected in this demo',
      },
      seller: p.seller ?? {
        name: p.sellerName,
        businessType: 'Demo seller record — not verified',
        returnPolicy: 'Illustrative only; no active return policy is connected.',
        sellerRating: 0,
      },
      warranty: p.warranty ?? {
        durationMonths: 0,
        warrantyType: 'Not configured in this prototype',
        coverage: 'No warranty or quality guarantee is active in this demo.',
        claimProcedure: 'No support service is connected in this prototype.',
      },
      faqs: p.faqs ?? faqs,
      reviews: p.reviews ?? reviews,
      relatedProductIds: p.relatedProductIds ?? (relatedProductIds.length > 0 ? relatedProductIds : ['prod-101', 'prod-201', 'prod-501']),
      offers: p.offers ?? [
        { code: 'KISAN10', title: 'Farmer First 10% Off', discountText: 'Save 10% on orders above ₹500 (up to ₹500)' },
        { code: 'HARVEST15', title: 'Harvest Festival 15% Off', discountText: 'Save 15% on orders above ₹1,000' },
        { code: 'AGRI500', title: 'Mega Crop Care Voucher', discountText: 'Save ₹500 on orders above ₹2,000' },
      ],
      gallery: [
        'Main Front View',
        'Packaging & FCO Label',
        'Batch & Analytical Spec',
        'Field Application Guide',
      ],
    };
  });
}

// Export the enriched product catalog
export const ENRICHED_STORE_PRODUCTS: StoreProduct[] = enrichProducts(SEED_STORE_PRODUCTS);

