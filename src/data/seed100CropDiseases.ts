export interface CropDiseaseItem {
  id: number;
  cropGroup: 'Rice' | 'Wheat & Barley' | 'Maize & Millets' | 'Pulses' | 'Oilseeds & Commercial' | 'Vegetables' | 'Fruits';
  crop: string;
  disease: string;
  pathogenType: 'Fungi' | 'Bacteria' | 'Viruses' | 'Oomycetes' | 'Phytoplasmas' | 'Protists';
  scientificName: string;
  primarySymptoms: string;
  favorableConditions: string;
  managementIdm: string;
}

export const SEED_100_CROP_DISEASES: CropDiseaseItem[] = [
  // 1. Rice Diseases (1–8)
  {
    id: 1,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Rice blast',
    pathogenType: 'Fungi',
    scientificName: 'Magnaporthe oryzae (Pyricularia oryzae)',
    primarySymptoms: 'Spindle-shaped elliptical lesions with gray-white centers and brown margins on leaves; black necrotic lesions on panicle neck leading to empty panicles.',
    favorableConditions: 'High relative humidity (>90%), night temp 18–24°C, excess nitrogen fertilizer, overcast weather.',
    managementIdm: 'Use resistant varieties; balance nitrogen with potassium; avoid excess urea; seed treatment with Trichoderma or label-approved bio-agents.'
  },
  {
    id: 2,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Bacterial leaf blight (BLB)',
    pathogenType: 'Bacteria',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    primarySymptoms: 'Water-soaked translucent stripes along leaf margins turning yellow-white; bacterial ooze droplets in early morning; "kresek" systemic seedling wilt.',
    favorableConditions: 'High temperature (25–34°C), strong winds with rain storms, deep standing water, heavy nitrogenous top-dressing.',
    managementIdm: 'Drain excess water; delay nitrogen top-dressing during active leaf injury; maintain field hygiene along field bunds.'
  },
  {
    id: 3,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Sheath blight',
    pathogenType: 'Fungi',
    scientificName: 'Rhizoctonia solani',
    primarySymptoms: 'Oval or greenish-gray water-soaked spots on leaf sheaths near water line; snake-skin patterned lesions with dark brown borders spreading up canopy.',
    favorableConditions: 'Dense plant canopy, high humidity (>95%), warm temperatures (28–32°C), high soil organic matter/urea.',
    managementIdm: 'Adopt wider spacing (20x15 cm); manage nitrogen in 3 splits; apply neem cake in soil; avoid dense transplanting.'
  },
  {
    id: 4,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Brown spot',
    pathogenType: 'Fungi',
    scientificName: 'Bipolaris oryzae (Helminthosporium oryzae)',
    primarySymptoms: 'Circular to oval brown spots with yellow halos uniformly scattered across leaf blades; discolored grains and poor panicle emergence.',
    favorableConditions: 'Nutrient-deficient sandy soils, drought stress, potash deficiency, unsterilized seed lots.',
    managementIdm: 'Soil testing for potassium, zinc, and silica balance; certified seed treatment; maintain uniform irrigation during tillering.'
  },
  {
    id: 5,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'False smut',
    pathogenType: 'Fungi',
    scientificName: 'Ustilaginoidea virens',
    primarySymptoms: 'Individual rice grains transformed into large velvety green-yellow fungal balls turning olive-black with powdery chlamydospores.',
    favorableConditions: 'High humidity (>90%) and rain during flowering/booting stage, moderate temperature (25–28°C), high nitrogen.',
    managementIdm: 'Avoid late nitrogen application; destroy smutted balls during harvest; treat seeds before nursery sowing.'
  },
  {
    id: 6,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Rice tungro disease',
    pathogenType: 'Viruses',
    scientificName: 'Rice tungro bacilliform virus & spherical virus',
    primarySymptoms: 'Stunted plants, reduced tillering, yellow to orange-yellow leaf discoloration starting from tip, delayed flowering.',
    favorableConditions: 'High population of green leafhopper (Nephotettix virescens) vector, staggered planting in contiguous tracts.',
    managementIdm: 'Monitor and control leafhopper vectors using yellow sticky traps; synchronized planting across blocks; rogue infected stools.'
  },
  {
    id: 7,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Bakanae disease (Foolish seedling)',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium fujikuroi (Gibberella fujikuroi)',
    primarySymptoms: 'Abnormally elongated, tall, pale-thin seedlings in nursery; adventitious roots produced on lower stem nodes; sterile empty heads.',
    favorableConditions: 'Seed-borne transmission, warm nursery soil temperatures (30–35°C).',
    managementIdm: 'Seed treatment with bio-control agents; rogue out tall pale seedlings before transplanting; certified foundation seed.'
  },
  {
    id: 8,
    cropGroup: 'Rice',
    crop: 'Rice (Paddy)',
    disease: 'Sheath rot',
    pathogenType: 'Fungi',
    scientificName: 'Sarocladium oryzae',
    primarySymptoms: 'Oblong or irregular gray-brown lesions on uppermost flag leaf sheath enclosing the panicle; panicles fail to emerge completely.',
    favorableConditions: 'Associated with stem borer or mite injuries, high canopy humidity, dense planting.',
    managementIdm: 'Control stem borers and mites; maintain optimal potassium nutrition; avoid canopy crowding.'
  },

  // 2. Wheat and Barley Diseases (9–18)
  {
    id: 9,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Leaf rust (Brown rust)',
    pathogenType: 'Fungi',
    scientificName: 'Puccinia triticina',
    primarySymptoms: 'Small round to oval orange-brown powdery pustules scattered randomly across upper leaf surfaces; leaves turn chlorotic.',
    favorableConditions: 'Moderate temperatures (15–25°C), morning dew lasting 6+ hours, warm humid spring days.',
    managementIdm: 'Grow rust-resistant varieties like HD-3226, PBW-725; early timely line sowing; balanced potash nutrition.'
  },
  {
    id: 10,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Stem rust (Black rust)',
    pathogenType: 'Fungi',
    scientificName: 'Puccinia graminis f. sp. tritici',
    primarySymptoms: 'Elongated reddish-brown to black pustules rupturing stem and leaf sheaths; stems lodge easily due to vascular damage.',
    favorableConditions: 'Warm weather (>20–30°C), moisture and dew late in the wheat season (February–March in Central/Peninsular India).',
    managementIdm: 'Plant genetically resistant wheat varieties; avoid late delayed sowings; monitor wheat stem bases in early spring.'
  },
  {
    id: 11,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Stripe rust (Yellow rust)',
    pathogenType: 'Fungi',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    primarySymptoms: 'Bright yellow-orange powdery pustules arranged in distinct narrow parallel linear stripes along leaf veins.',
    favorableConditions: 'Cool weather (10–15°C), high humidity, frequent winter showers and dense morning fog in Northwestern Plains.',
    managementIdm: 'Timely sowing of resistant varieties (HD-3086, HD-3226); scout field borders facing north; avoid over-irrigating during foggy weeks.'
  },
  {
    id: 12,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Karnal bunt',
    pathogenType: 'Fungi',
    scientificName: 'Tilletia indica (Neovossia indica)',
    primarySymptoms: 'Grains partially converted into a black powdery mass with distinct fishy rotten odor (trimethylamine); embryo intact.',
    favorableConditions: 'Cool rainy weather and high humidity during wheat anthesis/flowering stage in January–February.',
    managementIdm: 'Use Karnal-bunt free certified seed; avoid excess irrigation during heading; crop rotation with non-host legume crops.'
  },
  {
    id: 13,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Loose smut',
    pathogenType: 'Fungi',
    scientificName: 'Ustilago tritici',
    primarySymptoms: 'Entire wheat head converted into a dark brown-black loose powdery mass of spores, leaving bare rachis after wind dispersal.',
    favorableConditions: 'Internally seed-borne infection initiated during previous crop flowering in humid conditions.',
    managementIdm: 'Solar heat seed treatment during hot May/June days; use certified foundation seed; rogue smutted heads inside poly-bags.'
  },
  {
    id: 14,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Powdery mildew',
    pathogenType: 'Fungi',
    scientificName: 'Blumeria graminis f. sp. tritici',
    primarySymptoms: 'White to grayish powdery fungal growth patches on upper leaf surface, later developing tiny black cleistothecia.',
    favorableConditions: 'Dense plant canopy, cool dry weather with high relative humidity (15–20°C), shady field sections.',
    managementIdm: 'Avoid excessive nitrogen; ensure proper row spacing (20–22 cm); maintain field ventilation.'
  },
  {
    id: 15,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Fusarium head blight (Scab)',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium graminearum',
    primarySymptoms: 'Bleached, premature straw-colored spikelets on green heads; pinkish-orange fungal sporodochia on glume margins; shriveled "tombstone" grains.',
    favorableConditions: 'Warm rainy weather (22–28°C) and high humidity during wheat flowering stage.',
    managementIdm: 'Rotate with non-cereal crops; manage crop residues on soil surface; sow certified pathogen-free seed.'
  },
  {
    id: 16,
    cropGroup: 'Wheat & Barley',
    crop: 'Wheat',
    disease: 'Spot blotch',
    pathogenType: 'Fungi',
    scientificName: 'Bipolaris sorokiniana',
    primarySymptoms: 'Small brown elliptical lesions with chlorotic halos merging to cause extensive foliar blight; black tip discoloration on grains.',
    favorableConditions: 'Warm humid temperatures (24–30°C) late in the season; predominant in Eastern Gangetic Plains.',
    managementIdm: 'Adopt zero-till timely sowing to escape late season heat; seed bio-treatment; soil health card potassium application.'
  },
  {
    id: 17,
    cropGroup: 'Wheat & Barley',
    crop: 'Barley',
    disease: 'Stripe disease (Leaf stripe)',
    pathogenType: 'Fungi',
    scientificName: 'Pyrenophora graminea',
    primarySymptoms: 'Long continuous yellow stripes along leaf blades turning brown and shredding longitudinally into dry fibrous ribbons.',
    favorableConditions: 'Seed-borne pathogen activated by cool early soil conditions followed by warm vegetative stage.',
    managementIdm: 'Use certified disease-free seed; hot water seed treatment; rotate with pulses or mustard.'
  },
  {
    id: 18,
    cropGroup: 'Wheat & Barley',
    crop: 'Barley',
    disease: 'Covered smut',
    pathogenType: 'Fungi',
    scientificName: 'Ustilago hordei',
    primarySymptoms: 'Grains replaced by compact hard dark-brown spore masses enclosed by a persistent silvery-gray membrane until threshing.',
    favorableConditions: 'Externally seed-borne spores adhering to seed coat germinate in cool moist soil at sowing.',
    managementIdm: 'Seed treatment before sowing; use disease-free certified foundation barley seed.'
  },

  // 3. Maize, Sorghum and Millet Diseases (19–30)
  {
    id: 19,
    cropGroup: 'Maize & Millets',
    crop: 'Maize',
    disease: 'Northern corn leaf blight (Turcicum)',
    pathogenType: 'Fungi',
    scientificName: 'Exserohilum turcicum',
    primarySymptoms: 'Long cigar-shaped or elliptical grayish-green to tan lesions (2–15 cm) running parallel to leaf veins.',
    favorableConditions: 'Moderate temperatures (18–27°C), heavy dews, frequent rain during vegetative and silking stages.',
    managementIdm: 'Plant resistant hybrids; plow under infected crop residue; avoid continuous maize monoculture.'
  },
  {
    id: 20,
    cropGroup: 'Maize & Millets',
    crop: 'Maize',
    disease: 'Southern corn leaf blight (Maydis)',
    pathogenType: 'Fungi',
    scientificName: 'Bipolaris maydis',
    primarySymptoms: 'Smaller rectangular tan lesions with reddish-brown borders restricted between lateral veins.',
    favorableConditions: 'Warm temperatures (20–32°C) and high humidity; common in warm maize belts.',
    managementIdm: 'Resistant hybrid selection; crop rotation; field sanitation of post-harvest stalk debris.'
  },
  {
    id: 21,
    cropGroup: 'Maize & Millets',
    crop: 'Maize',
    disease: 'Common rust',
    pathogenType: 'Fungi',
    scientificName: 'Puccinia sorghi',
    primarySymptoms: 'Small circular to elongate cinnamon-brown powdery pustules scattered on both upper and lower leaf surfaces.',
    favorableConditions: 'Cool to warm humid days (16–25°C), morning dew, dense plant canopies.',
    managementIdm: 'Sow tolerant hybrid cultivars; balanced fertilization without excessive nitrogen.'
  },
  {
    id: 22,
    cropGroup: 'Maize & Millets',
    crop: 'Maize',
    disease: 'Common smut',
    pathogenType: 'Fungi',
    scientificName: 'Ustilago maydis',
    primarySymptoms: 'Prominent fleshy white-silver galls on ears, tassels, or stems that rupture into powdery black soot.',
    favorableConditions: 'Hail, mechanical damage, or borer wounds; dry periods followed by rain.',
    managementIdm: 'Avoid plant mechanical damage during cultivation; remove and bury galls before rupture.'
  },
  {
    id: 23,
    cropGroup: 'Maize & Millets',
    crop: 'Maize',
    disease: 'Downy mildew (Crazy top)',
    pathogenType: 'Oomycetes',
    scientificName: 'Peronosclerospora sorghi / Sclerophthora macrospora',
    primarySymptoms: 'Chlorotic striping on leaves, proliferation of leafy shoots replacing tassels (crazy top), stunted growth.',
    favorableConditions: 'Early seedling waterlogging, heavy rains shortly after sowing, high relative humidity.',
    managementIdm: 'Ensure ridge sowing with good drainage; seed treatment with metalaxyl-based formulations; rogue crazy tops.'
  },
  {
    id: 24,
    cropGroup: 'Maize & Millets',
    crop: 'Maize',
    disease: 'Maize lethal necrosis (MLN)',
    pathogenType: 'Viruses',
    scientificName: 'MCMV + Potyvirus coinfection',
    primarySymptoms: 'Severe chlorotic mottling, dead heart, drying leaf margins, premature plant death, barren deformed cobs.',
    favorableConditions: 'Presence of thrips and beetle vectors, continuous cultivation without maize-free break.',
    managementIdm: 'Strict quarantine on seed movement; control insect vectors; rogue infected plants promptly.'
  },
  {
    id: 25,
    cropGroup: 'Maize & Millets',
    crop: 'Sorghum (Jowar)',
    disease: 'Anthracnose',
    pathogenType: 'Fungi',
    scientificName: 'Colletotrichum sublineolum',
    primarySymptoms: 'Circular to elliptical spots with red-purple margins; central black fruiting acervuli with hair-like setae; stalk rot.',
    favorableConditions: 'Warm wet weather (>28°C), frequent rainfall during mid-vegetative growth.',
    managementIdm: 'Use resistant sorghum hybrids; deep plowing of infected crop residues; seed bio-treatment.'
  },
  {
    id: 26,
    cropGroup: 'Maize & Millets',
    crop: 'Sorghum (Jowar)',
    disease: 'Grain mold',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium, Curvularia, Alternaria complex',
    primarySymptoms: 'Discolored, pink, white, or black fungal colonization on developing grains; brittle shriveled caryopses.',
    favorableConditions: 'Wet rainy periods persisting between flowering and grain maturity.',
    managementIdm: 'Sow photoperiod-sensitive cultivars that mature after rainy season ends; harvest promptly once mature.'
  },
  {
    id: 27,
    cropGroup: 'Maize & Millets',
    crop: 'Sorghum (Jowar)',
    disease: 'Ergot (Sugary disease)',
    pathogenType: 'Fungi',
    scientificName: 'Claviceps africana / Claviceps sorghi',
    primarySymptoms: 'Sticky sweet honeydew droplets exuding from infected florets, attracting flies and turning white-crusted.',
    favorableConditions: 'Cool night temperatures (<12°C) causing male sterility, high morning humidity during flowering.',
    managementIdm: 'Plant fertile pollen-shedding parent cultivars; adjust sowing date to escape flowering in cool foggy weather.'
  },
  {
    id: 28,
    cropGroup: 'Maize & Millets',
    crop: 'Pearl millet (Bajra)',
    disease: 'Downy mildew (Green ear)',
    pathogenType: 'Oomycetes',
    scientificName: 'Sclerospora graminicola',
    primarySymptoms: 'Chlorosis on lower leaves; floral heads transformed into leafy green vegetative structures ("green ear").',
    favorableConditions: 'High humidity (>85%), night temperatures 15–20°C with free moisture on leaves.',
    managementIdm: 'Grow resistant hybrids (ICMH-451, etc.); treat seed with metalaxyl; rogue green-ear tillers early.'
  },
  {
    id: 29,
    cropGroup: 'Maize & Millets',
    crop: 'Pearl millet (Bajra)',
    disease: 'Ergot',
    pathogenType: 'Fungi',
    scientificName: 'Claviceps fusiformis',
    primarySymptoms: 'Amber-colored honeydew exudation from earheads followed by hard dark sclerotia replacing grain.',
    favorableConditions: 'Rain and cloudiness during flowering, delayed pollination.',
    managementIdm: 'Salt water seed flotation (10% brine) to remove floating sclerotia; intercrop with mung bean; prompt harvest.'
  },
  {
    id: 30,
    cropGroup: 'Maize & Millets',
    crop: 'Finger millet (Ragi)',
    disease: 'Blast disease',
    pathogenType: 'Fungi',
    scientificName: 'Magnaporthe grisea',
    primarySymptoms: 'Spindle-shaped lesions on leaves; neck blast causing choked panicle emergence and finger blast with empty grains.',
    favorableConditions: 'Cloudy weather, relative humidity >90%, intermittent drizzles, high nitrogen.',
    managementIdm: 'Sow resistant varieties (GPU-28, ML-365); seed treatment with bio-agents; balanced fertilizer schedule.'
  },

  // 4. Pulse Crop Diseases (31–45)
  {
    id: 31,
    cropGroup: 'Pulses',
    crop: 'Chickpea (Gram)',
    disease: 'Fusarium wilt',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium oxysporum f. sp. ciceris',
    primarySymptoms: 'Drooping of petioles and leaves, pale green wilting; brown-black vascular discoloration inside split taproot.',
    favorableConditions: 'Soil temperatures 25–30°C, dry topsoil with warm weather; soil-borne chlamydospores.',
    managementIdm: 'Plant wilt-resistant varieties (JG-315, WR-315); deep summer plowing; seed treatment with Trichoderma viride.'
  },
  {
    id: 32,
    cropGroup: 'Pulses',
    crop: 'Chickpea (Gram)',
    disease: 'Ascochyta blight',
    pathogenType: 'Fungi',
    scientificName: 'Ascochyta rabiei',
    primarySymptoms: 'Circular to elongated lesions with concentric rings of tiny black pycnidia on leaves, stems, and pods; stem girdling.',
    favorableConditions: 'Cool rainy weather (15–20°C), dense foliage, continuous wet canopy for 12+ hours.',
    managementIdm: 'Grow resistant varieties; destroy infected crop residues; follow 3-year crop rotation; seed treatment.'
  },
  {
    id: 33,
    cropGroup: 'Pulses',
    crop: 'Chickpea (Gram)',
    disease: 'Dry root rot',
    pathogenType: 'Fungi',
    scientificName: 'Rhizoctonia bataticola (Macrophomina phaseolina)',
    primarySymptoms: 'Sudden drying of plants during pod filling; roots become brittle, dry, and shredded with tiny black sclerotial bodies.',
    favorableConditions: 'High temperature (>30°C) combined with soil moisture deficit at flowering/podding.',
    managementIdm: 'Provide one light irrigation at pod initiation to relieve moisture stress; enrich soil with FYM and Trichoderma.'
  },
  {
    id: 34,
    cropGroup: 'Pulses',
    crop: 'Chickpea (Gram)',
    disease: 'Collar rot',
    pathogenType: 'Fungi',
    scientificName: 'Sclerotium rolfsii',
    primarySymptoms: 'Water-soaked lesion at ground collar level covered with white cottony mycelium and mustard-seed-like sclerotia.',
    favorableConditions: 'High soil moisture, undecomposed crop residue near surface, warm soil (28–30°C).',
    managementIdm: 'Ensure well-decomposed manure; avoid water stagnation around seedling collar; apply bio-fungicide in seed furrow.'
  },
  {
    id: 35,
    cropGroup: 'Pulses',
    crop: 'Chickpea (Gram)',
    disease: 'Botrytis gray mold',
    pathogenType: 'Fungi',
    scientificName: 'Botrytis cinerea',
    primarySymptoms: 'Soft rot on flowers, pods, and branches covered with grayish hairy spore mass; branch breakage.',
    favorableConditions: 'High humidity (>95%), cool temperatures (18–22°C), dense leafy vegetative canopy.',
    managementIdm: 'Adopt wider spacing (30x10 cm); avoid excessive irrigation; cultivate erect open-canopy varieties.'
  },
  {
    id: 36,
    cropGroup: 'Pulses',
    crop: 'Pigeonpea (Arhar/Tur)',
    disease: 'Sterility mosaic disease',
    pathogenType: 'Viruses',
    scientificName: 'Pigeonpea sterility mosaic virus (PPSMV)',
    primarySymptoms: 'Bushy stunted plants, severe mosaic mottling on leaves, complete cessation of flowering (sterility).',
    favorableConditions: 'Transmitted by eriophyid mites (Aceria cajani); hot dry spells favor mite multiplication.',
    managementIdm: 'Plant SMD-resistant varieties (BSMR-736, Asha); control mite vector early with wettable sulfur.'
  },
  {
    id: 37,
    cropGroup: 'Pulses',
    crop: 'Pigeonpea (Arhar/Tur)',
    disease: 'Fusarium wilt',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium udum',
    primarySymptoms: 'Gradual yellowing and wilting of branches; characteristic purple vertical band on stem base; split xylem is black.',
    favorableConditions: 'Soil-borne pathogen, soil temperatures 20–25°C, continuous pigeonpea monoculture.',
    managementIdm: 'Long crop rotation with sorghum or tobacco; cultivate resistant lines (Maruti, Asha); seed bio-treatment.'
  },
  {
    id: 38,
    cropGroup: 'Pulses',
    crop: 'Pigeonpea (Arhar/Tur)',
    disease: 'Phytophthora blight',
    pathogenType: 'Oomycetes',
    scientificName: 'Phytophthora cajani',
    primarySymptoms: 'Circular water-soaked lesions on leaves; purplish-dark cankers girdling stems causing sudden snapping.',
    favorableConditions: 'Temporary waterlogging after torrential rains, warm cloudy weather (25–30°C).',
    managementIdm: 'Sow on raised beds or ridges; ensure quick drainage channels; avoid poorly drained clay plots.'
  },
  {
    id: 39,
    cropGroup: 'Pulses',
    crop: 'Green gram (Mung bean)',
    disease: 'Yellow mosaic disease (MYMV)',
    pathogenType: 'Viruses',
    scientificName: 'Mungbean yellow mosaic virus',
    primarySymptoms: 'Bright yellow scattered flecks on leaves expanding into complete golden-yellow chlorosis; stunted pods.',
    favorableConditions: 'Whitefly (Bemisia tabaci) vector activity during warm sunny summer and Kharif days.',
    managementIdm: 'Grow MYMV-resistant varieties (IPM-02-03, Pusa Vishal); install yellow sticky traps; manage whitefly vectors.'
  },
  {
    id: 40,
    cropGroup: 'Pulses',
    crop: 'Green gram (Mung bean)',
    disease: 'Leaf crinkle disease',
    pathogenType: 'Viruses',
    scientificName: 'Urdbean leaf crinkle virus (ULCV)',
    primarySymptoms: 'Extreme enlargement, crinkling, puckering, and rugosity of trifoliate leaves; malformed floral parts.',
    favorableConditions: 'Seed transmission and aphid vector movement.',
    managementIdm: 'Use virus-free certified seeds; rogue out crinkled seedlings 15 days after emergence; monitor aphid colonies.'
  },
  {
    id: 41,
    cropGroup: 'Pulses',
    crop: 'Black gram (Urad)',
    disease: 'Powdery mildew',
    pathogenType: 'Fungi',
    scientificName: 'Erysiphe polygoni',
    primarySymptoms: 'White powdery patches on leaves, stems, and pods; leaves turn dull yellow and drop prematurely.',
    favorableConditions: 'Cool dry nights with morning dew (20–25°C), shady conditions, late Kharif/Rabi season.',
    managementIdm: 'Sow resistant varieties; timely spray of wettable sulfur bio-formulation upon first white patch detection.'
  },
  {
    id: 42,
    cropGroup: 'Pulses',
    crop: 'Lentil (Masoor)',
    disease: 'Rust',
    pathogenType: 'Fungi',
    scientificName: 'Uromyces viciae-fabae',
    primarySymptoms: 'Small brown-yellow pustules on leaflets, petioles, and pods; leaves dry up and defoliate rapidly.',
    favorableConditions: 'High relative humidity, cool cloudy conditions (17–22°C), frequent winter drizzles.',
    managementIdm: 'Early sowing; cultivate rust-resistant varieties (PL-4, K-75); avoid waterlogged furrow ends.'
  },
  {
    id: 43,
    cropGroup: 'Pulses',
    crop: 'Pea',
    disease: 'Downy mildew',
    pathogenType: 'Oomycetes',
    scientificName: 'Peronospora viciae',
    primarySymptoms: 'Yellowish blotches on upper leaf surface with corresponding purplish-gray downy fungal felt on underside.',
    favorableConditions: 'Cool moist weather (10–18°C) with persistent fog or dews.',
    managementIdm: 'Field drainage; clean seedbeds; destroy crop residue; seed bio-treatment.'
  },
  {
    id: 44,
    cropGroup: 'Pulses',
    crop: 'Common bean (Rajma)',
    disease: 'Anthracnose',
    pathogenType: 'Fungi',
    scientificName: 'Colletotrichum lindemuthianum',
    primarySymptoms: 'Brick-red to dark-purple angular lesions along leaf veins on underside; sunken circular cankers on pods.',
    favorableConditions: 'Cool wet weather (13–26°C), rain splashing spores across rows.',
    managementIdm: 'Use certified pathogen-free seed; avoid overhead irrigation; maintain crop rotation.'
  },
  {
    id: 45,
    cropGroup: 'Pulses',
    crop: 'Cowpea (Lobia)',
    disease: 'Bacterial blight',
    pathogenType: 'Bacteria',
    scientificName: 'Xanthomonas axonopodis pv. vignicola',
    primarySymptoms: 'Small water-soaked circular spots with yellow borders; stem cracking with red-brown cankers.',
    favorableConditions: 'Warm wet storms, rain splash, soil-borne inoculum.',
    managementIdm: 'Hot water seed treatment (52°C for 10 min); rogue infected seedlings; rotate with cereals.'
  },

  // 5. Oilseed and Commercial Crop Diseases (46–65)
  {
    id: 46,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Groundnut',
    disease: 'Early leaf spot (Tikka)',
    pathogenType: 'Fungi',
    scientificName: 'Cercospora arachidicola',
    primarySymptoms: 'Circular reddish-brown to dark spots with prominent bright yellow chlorotic halos on upper leaf surface.',
    favorableConditions: 'Warm humid weather (24–28°C), prolonged leaf wetness, high rainfall.',
    managementIdm: 'Crop rotation; intercrop with pearl millet; timely bio-fungicide sprays on lower foliage.'
  },
  {
    id: 47,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Groundnut',
    disease: 'Late leaf spot (Tikka)',
    pathogenType: 'Fungi',
    scientificName: 'Phaeoisariopsis personata',
    primarySymptoms: 'Small circular carbon-black spots on both leaf surfaces with faint or absent yellow halos; severe defoliation.',
    favorableConditions: 'Low night temperatures (20–22°C), high relative humidity (>85%), late Kharif season.',
    managementIdm: 'Cultivate tolerant cultivars (ICGV series); apply bio-agents; burn infected plant debris post-harvest.'
  },
  {
    id: 48,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Groundnut',
    disease: 'Rust',
    pathogenType: 'Fungi',
    scientificName: 'Puccinia arachidis',
    primarySymptoms: 'Pustules on lower leaf surface rupture exposing chestnut-brown powdery urediniospores; leaves remain attached.',
    favorableConditions: 'Warm humid conditions (22–25°C), morning dews, presence of early leaf spot co-infection.',
    managementIdm: 'Grow rust-resistant cultivars; eradicate volunteer groundnut plants; apply wettable sulfur formulation.'
  },
  {
    id: 49,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Groundnut',
    disease: 'Stem rot (Sclerotium rot)',
    pathogenType: 'Fungi',
    scientificName: 'Sclerotium rolfsii',
    primarySymptoms: 'White fan-like mycelial growth at soil line around main stem and pegs; rotting of pods in soil.',
    favorableConditions: 'High soil moisture, dense crop canopy, deep seed planting, unrotted crop residues.',
    managementIdm: 'Plant on ridges; apply Trichoderma enriched farmyard manure; avoid throwing soil against plant crowns during weeding.'
  },
  {
    id: 50,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Soybean',
    disease: 'Soybean rust',
    pathogenType: 'Fungi',
    scientificName: 'Phakopsora pachyrhizi',
    primarySymptoms: 'Tiny volcanic-like tan to dark brown pustules on lower leaf surface; rapid yellowing and premature leaf fall.',
    favorableConditions: 'Continuous canopy wetness for 6–8 hours, temperatures 15–28°C, cloudy rainy days.',
    managementIdm: 'Scout lower canopy regularly; timely early foliar spray with label-approved fungicides; cultivate tolerant varieties.'
  },
  {
    id: 51,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Soybean',
    disease: 'Bacterial pustule',
    pathogenType: 'Bacteria',
    scientificName: 'Xanthomonas axonopodis pv. glycines',
    primarySymptoms: 'Small yellow-green spots with raised pustule-like blister in center, unlike fungal rust blisters do not have powdery spores.',
    favorableConditions: 'Warm rainy weather (30–35°C), heavy storm splash.',
    managementIdm: 'Resistant varieties (carrying rxp gene); deep plowing of crop residues; certified seed.'
  },
  {
    id: 52,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Mustard (Sarson)',
    disease: 'Alternaria blight',
    pathogenType: 'Fungi',
    scientificName: 'Alternaria brassicae / brassicicola',
    primarySymptoms: 'Concentric target-board circular brown-black lesions on leaves, stems, and siliquae; premature pod shattering.',
    favorableConditions: 'High humidity (>70%), cool foggy mornings (15–25°C), intermittent drizzles in January.',
    managementIdm: 'Timely early sowing (by 15–20 October); destroy infected brassica crop residues; seed treatment.'
  },
  {
    id: 53,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Mustard (Sarson)',
    disease: 'White rust',
    pathogenType: 'Oomycetes',
    scientificName: 'Albugo candida',
    primarySymptoms: 'Raised white to creamy porcelain-like pustules on lower leaf surface; floral staghead malformation and pod sterility.',
    favorableConditions: 'Humid cool weather (12–18°C), prolonged morning dew.',
    managementIdm: 'Grow resistant varieties; remove and burn staghead floral malformations; seed bio-treatment.'
  },
  {
    id: 54,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Mustard (Sarson)',
    disease: 'Downy mildew',
    pathogenType: 'Oomycetes',
    scientificName: 'Hyaloperonospora brassicae',
    primarySymptoms: 'Chlorotic yellow patches on upper leaf surface with corresponding white downy growth underneath.',
    favorableConditions: 'Cool wet mornings, dense canopy, often co-occurs with white rust.',
    managementIdm: 'Avoid over-irrigation during foggy winter months; maintain adequate row spacing.'
  },
  {
    id: 55,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Mustard (Sarson)',
    disease: 'Sclerotinia stem rot',
    pathogenType: 'Fungi',
    scientificName: 'Sclerotinia sclerotiorum',
    primarySymptoms: 'Elongated bleached water-soaked lesions on stems; white cottony mycelium inside hollowed stem filled with black sclerotial bodies.',
    favorableConditions: 'High soil moisture, dense crop canopy, cool temperatures (15–20°C).',
    managementIdm: 'Crop rotation with non-host wheat or barley; avoid flood irrigation; deep summer plowing.'
  },
  {
    id: 56,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sunflower',
    disease: 'Alternaria blight',
    pathogenType: 'Fungi',
    scientificName: 'Alternaria helianthi',
    primarySymptoms: 'Dark brown to black angular necrotic spots on leaves and petals; premature defoliation and poor seed filling.',
    favorableConditions: 'Frequent rain, temperatures 25–28°C, cloudy weather.',
    managementIdm: 'Clean certified seed; wider spacing; destroy volunteer sunflowers; spray bio-agents at bud stage.'
  },
  {
    id: 57,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sunflower',
    disease: 'Sclerotinia head rot',
    pathogenType: 'Fungi',
    scientificName: 'Sclerotinia sclerotiorum',
    primarySymptoms: 'Water-soaked soft rot on back of flower head; head disintegrates into shredded fibers with large black sclerotia.',
    favorableConditions: 'Prolonged wet weather and rainfall during flowering and seed development.',
    managementIdm: 'Avoid overhead irrigation during flowering; clean seed lots of sclerotia; 4-year crop rotation.'
  },
  {
    id: 58,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Cotton',
    disease: 'Bacterial blight (Blackarm)',
    pathogenType: 'Bacteria',
    scientificName: 'Xanthomonas citri pv. malvacearum',
    primarySymptoms: 'Angular water-soaked leaf spots between veins; black elongated cankers on branches (blackarm); boll rot.',
    favorableConditions: 'High temperature (28–32°C), high humidity (>85%), wind-driven heavy monsoon rain.',
    managementIdm: 'Acid delinting of cottonseed; grow resistant cultivars; avoid overhead furrow splashing.'
  },
  {
    id: 59,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Cotton',
    disease: 'Cotton leaf curl disease (CLCuD)',
    pathogenType: 'Viruses',
    scientificName: 'Cotton leaf curl virus (Begomovirus)',
    primarySymptoms: 'Upward or downward leaf curling, vein thickening, enation (leaf-like outgrowths on underside of main veins), severe stunting.',
    favorableConditions: 'High population of whitefly (Bemisia tabaci) vectors in Northwestern Cotton Belt.',
    managementIdm: 'Grow CLCuD-resistant hybrids; install yellow sticky traps; manage whitefly vectors; eradicate weed hosts.'
  },
  {
    id: 60,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Cotton',
    disease: 'Fusarium wilt',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium oxysporum f. sp. vasinfectum',
    primarySymptoms: 'Yellowing of leaf margins between veins; drooping and defoliation; brown to black rings inside vascular cylinder.',
    favorableConditions: 'Acidic to neutral soils, presence of root-knot nematodes, soil temperatures 25–30°C.',
    managementIdm: 'Grow tolerant varieties; apply potash fertilizer according to soil test; seed treatment with Trichoderma.'
  },
  {
    id: 61,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sugarcane',
    disease: 'Red rot',
    pathogenType: 'Fungi',
    scientificName: 'Colletotrichum falcatum',
    primarySymptoms: 'Third and fourth leaves wither and droop; split cane shows longitudinal red tissues with crosswise white patches and alcoholic odor.',
    favorableConditions: 'Infected seed setts, waterlogged clay soils, warm humid monsoon months (28–32°C).',
    managementIdm: 'Use certified disease-free seed setts from nursery; hot water treatment of setts (52°C for 30 min); avoid ratoon crop in infected fields.'
  },
  {
    id: 62,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sugarcane',
    disease: 'Smut',
    pathogenType: 'Fungi',
    scientificName: 'Sporisorium scitamineum',
    primarySymptoms: 'Terminal meristem develops into a long whip-like curved structure covered with black powdery chlamydospores.',
    favorableConditions: 'Warm dry weather favoring spore dissemination, ratooning of infected stools.',
    managementIdm: 'Rogue out smutted whips in polythene bags; hot water seed treatment; avoid ratooning infected fields.'
  },
  {
    id: 63,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sugarcane',
    disease: 'Grassy shoot disease',
    pathogenType: 'Phytoplasmas',
    scientificName: 'Sugarcane grassy shoot phytoplasma',
    primarySymptoms: 'Proliferation of numerous thin chlorotic tillers giving stool a dense grassy bushy appearance; no millable canes formed.',
    favorableConditions: 'Transmitted by aphid vectors and infected vegetative setts.',
    managementIdm: 'Moist hot air treatment of setts (54°C for 2.5 hours); rogue grassy clumps; certified seed nurseries.'
  },
  {
    id: 64,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sugarcane',
    disease: 'Pokkah boeng',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium moniliforme',
    primarySymptoms: 'Chlorosis at base of young leaves; wrinkling, twisting, and knife-cut necrosis of the spindle leaf; top rot.',
    favorableConditions: 'Hot dry weather followed by cloudy humid monsoon showers.',
    managementIdm: 'Cultivate tolerant varieties; avoid excess nitrogen; field sanitation.'
  },
  {
    id: 65,
    cropGroup: 'Oilseeds & Commercial',
    crop: 'Sugarcane',
    disease: 'Ratoon stunting disease',
    pathogenType: 'Bacteria',
    scientificName: 'Leifsonia xyli subsp. xyli',
    primarySymptoms: 'Stunted unthrifty growth, pinkish-orange discoloration of nodal vascular bundles seen upon slicing cane node longitudinally.',
    favorableConditions: 'Transmitted mechanically by unsterilized harvesting sickles and cane knives.',
    managementIdm: 'Disinfect harvesting knives in antiseptic solution; hot water sett treatment (50°C for 2 hours).'
  },

  // 6. Vegetable Crop Diseases (66–90)
  {
    id: 66,
    cropGroup: 'Vegetables',
    crop: 'Tomato',
    disease: 'Early blight',
    pathogenType: 'Fungi',
    scientificName: 'Alternaria solani',
    primarySymptoms: 'Concentric ring "target-board" brown lesions on older bottom leaves; stem collar cankers; dark sunken leathery fruit rots.',
    favorableConditions: 'High humidity, warm temperatures (24–29°C), alternating wet and dry canopy periods.',
    managementIdm: 'Stake tomato plants; prune bottom 30 cm leaves touching soil; avoid overhead irrigation; bio-fungicide sprays.'
  },
  {
    id: 67,
    cropGroup: 'Vegetables',
    crop: 'Tomato',
    disease: 'Late blight',
    pathogenType: 'Oomycetes',
    scientificName: 'Phytophthora infestans',
    primarySymptoms: 'Rapidly expanding water-soaked dark lesions on leaves with white cottony mold underneath in humid morning; firm brown greasy fruit rot.',
    favorableConditions: 'Cool wet weather (15–20°C), relative humidity >90%, persistent drizzle or heavy dew.',
    managementIdm: 'Grow resistant hybrids; ensure raised-bed drip irrigation; avoid overhead sprinklers; spray approved protectants early.'
  },
  {
    id: 68,
    cropGroup: 'Vegetables',
    crop: 'Tomato',
    disease: 'Bacterial wilt',
    pathogenType: 'Bacteria',
    scientificName: 'Ralstonia solanacearum',
    primarySymptoms: 'Rapid wilting of entire green plant without prior yellowing; stem cut in water exudes white milky bacterial threads (streaming).',
    favorableConditions: 'Warm wet soils (28–35°C), acidic to neutral pH, root injuries.',
    managementIdm: 'Use resistant rootstocks (grafting); crop rotation with maize/paddy; avoid flood irrigation from infected patches.'
  },
  {
    id: 69,
    cropGroup: 'Vegetables',
    crop: 'Tomato',
    disease: 'Fusarium wilt',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium oxysporum f. sp. lycopersici',
    primarySymptoms: 'Yellowing of leaves on one side of shoot; daytime wilting with night recovery; dark brown vascular browning in split stem.',
    favorableConditions: 'Warm soil temperatures (27–30°C), sandy soils with low pH, root-knot nematodes.',
    managementIdm: 'Plant resistant F1 hybrids; lime acidic soils; soil application of Trichoderma and neem cake.'
  },
  {
    id: 70,
    cropGroup: 'Vegetables',
    crop: 'Tomato',
    disease: 'Tomato yellow leaf curl disease (TYLCV)',
    pathogenType: 'Viruses',
    scientificName: 'Tomato yellow leaf curl virus (Begomovirus)',
    primarySymptoms: 'Severe upward leaf cupping, curling, interveinal chlorosis, bushiness, blossom abortion, total fruit yield loss.',
    favorableConditions: 'High whitefly (Bemisia tabaci) populations in nursery and early vegetative field stages.',
    managementIdm: 'Grow in 40-mesh insect-proof nursery tunnels; use TYLCV-resistant hybrids; install yellow sticky traps.'
  },
  {
    id: 71,
    cropGroup: 'Vegetables',
    crop: 'Tomato',
    disease: 'Septoria leaf spot',
    pathogenType: 'Fungi',
    scientificName: 'Septoria lycopersici',
    primarySymptoms: 'Numerous small circular spots with gray centers, dark borders, and tiny black fruiting specks; begins on basal foliage.',
    favorableConditions: 'Moderate temperatures (20–25°C), high humidity, rain splash from bare soil.',
    managementIdm: 'Mulch beds with straw or silver-black plastic; remove infected basal leaves; avoid sprinkler wetting.'
  },
  {
    id: 72,
    cropGroup: 'Vegetables',
    crop: 'Potato',
    disease: 'Common scab',
    pathogenType: 'Bacteria',
    scientificName: 'Streptomyces scabies',
    primarySymptoms: 'Rough, corky, pitted, or raised lesions on tuber skin; reduces market value without rotting tuber flesh.',
    favorableConditions: 'Warm dry soil during tuber initiation (20–22°C), alkaline soils (pH > 5.5).',
    managementIdm: 'Maintain adequate soil moisture during 4–6 weeks of tuber initiation; avoid liming potato beds; green manuring.'
  },
  {
    id: 73,
    cropGroup: 'Vegetables',
    crop: 'Potato',
    disease: 'Black scurf (Stem canker)',
    pathogenType: 'Fungi',
    scientificName: 'Rhizoctonia solani',
    primarySymptoms: 'Hard irregular black dirt-like sclerotia adhering tightly to tuber skin ("dirt that won\'t wash off"); brown cankers on underground sprouts.',
    favorableConditions: 'Cold wet soil at planting time, continuous potato cultivation.',
    managementIdm: 'Plant certified seed tubers; treat seed tubers with bio-control agent; delay planting if soil is cold and waterlogged.'
  },
  {
    id: 74,
    cropGroup: 'Vegetables',
    crop: 'Potato',
    disease: 'Bacterial wilt (Brown rot)',
    pathogenType: 'Bacteria',
    scientificName: 'Ralstonia solanacearum',
    primarySymptoms: 'Rapid wilting of foliage; brown ring in cut tuber vascular ring oozing white bacterial slime when squeezed.',
    favorableConditions: 'Warm temperatures (25–30°C), heavy soil moisture, infected seed tubers.',
    managementIdm: 'Plant certified disease-free seed tubers; follow 3-year rotation with non-solanaceous crops; clean equipment.'
  },
  {
    id: 75,
    cropGroup: 'Vegetables',
    crop: 'Potato',
    disease: 'Potato leafroll disease (PLRV)',
    pathogenType: 'Viruses',
    scientificName: 'Potato leafroll virus (Polerovirus)',
    primarySymptoms: 'Upward rolling and leathery thickening of leaflets, rattling sound when brushed, net necrosis inside tubers.',
    favorableConditions: 'Persistent transmission by green peach aphid (Myzus persicae).',
    managementIdm: 'Seed Plot Technique (sow in low-aphid window); rogue infected plants; certified virus-free seed tubers.'
  },
  {
    id: 76,
    cropGroup: 'Vegetables',
    crop: 'Cucumber',
    disease: 'Downy mildew',
    pathogenType: 'Oomycetes',
    scientificName: 'Pseudoperonospora cubensis',
    primarySymptoms: 'Angular yellow chlorotic lesions delimited strictly by leaf veins on upper surface; purplish-gray downy mold underneath.',
    favorableConditions: 'High humidity, free leaf moisture, temperatures 15–20°C; severe in polyhouse and open-field drip beds.',
    managementIdm: 'Ensure good ventilation in polyhouses; water plants at soil level; apply copper/bio-fungicide protectants.'
  },
  {
    id: 77,
    cropGroup: 'Vegetables',
    crop: 'Cucumber',
    disease: 'Powdery mildew',
    pathogenType: 'Fungi',
    scientificName: 'Podosphaera xanthii (Erysiphe cichoracearum)',
    primarySymptoms: 'Talcum-powder-like white spots on both leaf surfaces, petioles, and stems; leaves turn brown and crisp.',
    favorableConditions: 'Warm dry days (20–28°C), high humidity at night, shady dense foliage.',
    managementIdm: 'Cultivate resistant hybrid lines; spray bio-formulation (neem oil or Bacillus subtilis); avoid water stress.'
  },
  {
    id: 78,
    cropGroup: 'Vegetables',
    crop: 'Cucumber',
    disease: 'Cucumber mosaic disease (CMV)',
    pathogenType: 'Viruses',
    scientificName: 'Cucumber mosaic virus (Cucumovirus)',
    primarySymptoms: 'Yellow mosaic mottling, distorted "shoestring" leaves, severe stunting, warty bumpy fruit.',
    favorableConditions: 'Transmitted by numerous aphid species non-persistently.',
    managementIdm: 'Control aphids with sticky traps; eliminate surrounding weeds; rogue out infected vines early.'
  },
  {
    id: 79,
    cropGroup: 'Vegetables',
    crop: 'Watermelon',
    disease: 'Fusarium wilt',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium oxysporum f. sp. niveum',
    primarySymptoms: 'Dull green wilting of one or more runners during fruiting; brown vascular discoloration in crown.',
    favorableConditions: 'Soil temperatures 25–28°C, repetitive watermelon cultivation in same sandy riverbed.',
    managementIdm: 'Rotate riverbed patches; graft on resistant gourd rootstocks; apply Trichoderma at sowing.'
  },
  {
    id: 80,
    cropGroup: 'Vegetables',
    crop: 'Chilli',
    disease: 'Anthracnose and fruit rot (Dieback)',
    pathogenType: 'Fungi',
    scientificName: 'Colletotrichum capsici',
    primarySymptoms: 'Necrotic twigs drying from top downwards (dieback); circular sunken lesions on ripe red fruits with concentric rings of black acervuli.',
    favorableConditions: 'High relative humidity (>80%), warm temperatures (28–30°C), heavy dews at fruit ripening.',
    managementIdm: 'Seed treatment; collect and destroy diseased fruits; avoid overhead sprinkler wetting during ripening.'
  },
  {
    id: 81,
    cropGroup: 'Vegetables',
    crop: 'Chilli',
    disease: 'Bacterial wilt',
    pathogenType: 'Bacteria',
    scientificName: 'Ralstonia solanacearum',
    primarySymptoms: 'Sudden wilting of healthy green foliage without preliminary yellowing; bacterial streaming from cut stem in water.',
    favorableConditions: 'High soil moisture, warm temperature (30–35°C), poorly drained beds.',
    managementIdm: 'Plant on raised beds with drip; crop rotation; use disease-tolerant hybrid rootstocks.'
  },
  {
    id: 82,
    cropGroup: 'Vegetables',
    crop: 'Chilli',
    disease: 'Chilli leaf curl disease',
    pathogenType: 'Viruses',
    scientificName: 'Chilli leaf curl virus (Begomovirus complex)',
    primarySymptoms: 'Severe upward leaf curling, crinkling, shortened internodes, bushy stunted plants, aborted flowers.',
    favorableConditions: 'High vector pressure of whiteflies (Bemisia tabaci) and thrips (Scirtothrips dorsalis).',
    managementIdm: 'Install yellow and blue sticky traps (10/acre); nursery net protection; barrier crops like maize around plot.'
  },
  {
    id: 83,
    cropGroup: 'Vegetables',
    crop: 'Brinjal (Eggplant)',
    disease: 'Phomopsis blight and fruit rot',
    pathogenType: 'Fungi',
    scientificName: 'Phomopsis vexans',
    primarySymptoms: 'Brown circular spots on leaves; large pale sunken rotten spots on fruits with numerous black pycnidia.',
    favorableConditions: 'Warm wet weather (28–32°C), continuous rain showers.',
    managementIdm: 'Use certified seed; treat seeds before sowing; remove and bury rotten fallen fruits.'
  },
  {
    id: 84,
    cropGroup: 'Vegetables',
    crop: 'Brinjal (Eggplant)',
    disease: 'Little leaf disease',
    pathogenType: 'Phytoplasmas',
    scientificName: 'Brinjal little leaf phytoplasma',
    primarySymptoms: 'Phyllody where leaves become extremely tiny, thin, pale and crowded into a dense broom-like bush; no fruits set.',
    favorableConditions: 'Transmitted by leafhopper vector (Hishimonus phycitis).',
    managementIdm: 'Rogue out infected plants immediately; control leafhopper vectors with yellow sticky traps; maintain field sanitation.'
  },
  {
    id: 85,
    cropGroup: 'Vegetables',
    crop: 'Cabbage',
    disease: 'Black rot',
    pathogenType: 'Bacteria',
    scientificName: 'Xanthomonas campestris pv. campestris',
    primarySymptoms: 'V-shaped yellow lesions with base at leaf margin pointing inwards along veins; veins turn black; foul cabbage odor.',
    favorableConditions: 'Warm humid weather (25–30°C), sprinkler wetting, rain splash.',
    managementIdm: 'Hot water seed treatment (50°C for 30 min); avoid overhead sprinkler irrigation; 3-year brassica rotation.'
  },
  {
    id: 86,
    cropGroup: 'Vegetables',
    crop: 'Cabbage',
    disease: 'Clubroot',
    pathogenType: 'Protists',
    scientificName: 'Plasmodiophora brassicae',
    primarySymptoms: 'Swollen distorted spindle-shaped "club" galls on roots; plants wilt during hot sunshine and fail to form heads.',
    favorableConditions: 'Acidic poorly drained soils (pH < 6.5), cool wet soil conditions.',
    managementIdm: 'Apply agricultural lime to raise soil pH above 7.2; improve drainage; long 5-year crop rotation.'
  },
  {
    id: 87,
    cropGroup: 'Vegetables',
    crop: 'Onion',
    disease: 'Purple blotch',
    pathogenType: 'Fungi',
    scientificName: 'Alternaria porri',
    primarySymptoms: 'Small sunken water-soaked spots on leaves expanding into elliptical lesions with dark purple centers and yellow halos.',
    favorableConditions: 'Warm humid weather (21–30°C), relative humidity 80–90%, persistent dew.',
    managementIdm: 'Balanced nutrition with adequate potassium; avoid waterlogging; spray approved protectants with sticker.'
  },
  {
    id: 88,
    cropGroup: 'Vegetables',
    crop: 'Onion',
    disease: 'Downy mildew',
    pathogenType: 'Oomycetes',
    scientificName: 'Peronospora destructor',
    primarySymptoms: 'Pale oval chlorotic patches on leaves covered with violet-gray downy mold; leaf tips collapse.',
    favorableConditions: 'Cool moist weather (10–15°C) with morning fog and high humidity.',
    managementIdm: 'Ensure good field air circulation; plant on raised beds; destroy volunteer onion bulbs.'
  },
  {
    id: 89,
    cropGroup: 'Vegetables',
    crop: 'Okra (Lady\'s finger)',
    disease: 'Yellow vein mosaic disease (YVMD)',
    pathogenType: 'Viruses',
    scientificName: 'Bhendi yellow vein mosaic virus (Begomovirus)',
    primarySymptoms: 'Network of bright yellow veins contrasting with green leaf tissue; stunted yellow fibrous inedible fruits.',
    favorableConditions: 'Whitefly (Bemisia tabaci) vector transmission during hot humid monsoon months.',
    managementIdm: 'Grow YVMD-resistant varieties (Arka Anamika, Parbhani Kranti); manage whiteflies; rogue infected plants.'
  },
  {
    id: 90,
    cropGroup: 'Vegetables',
    crop: 'Garlic',
    disease: 'White rot',
    pathogenType: 'Fungi',
    scientificName: 'Stromatinia cepivora (Sclerotium cepivorum)',
    primarySymptoms: 'Yellowing and wilting of older leaves; white fluffy fungal mycelium at bulb base studded with tiny black poppy-seed sclerotia.',
    favorableConditions: 'Cool moist soils (10–20°C); sclerotia persist in soil for 15+ years.',
    managementIdm: 'Plant certified clean cloves; avoid moving contaminated soil; practice long-term non-allium crop rotation.'
  },

  // 7. Fruit Crop Diseases (91–100)
  {
    id: 91,
    cropGroup: 'Fruits',
    crop: 'Mango',
    disease: 'Anthracnose',
    pathogenType: 'Fungi',
    scientificName: 'Colletotrichum gloeosporioides',
    primarySymptoms: 'Black irregular spots on leaves, blossom blight with drop of panicles; tear-streak black lesions on ripening fruits.',
    favorableConditions: 'High humidity (>95%), cloudy weather, frequent rains during flowering and fruit set.',
    managementIdm: 'Prune dead twigs after harvest; spray bio-formulation at panicle emergence; hot water fruit dip (52°C for 5 min).'
  },
  {
    id: 92,
    cropGroup: 'Fruits',
    crop: 'Mango',
    disease: 'Powdery mildew',
    pathogenType: 'Fungi',
    scientificName: 'Oidium mangiferae',
    primarySymptoms: 'White powdery felt covering inflorescence panicles, tender leaves, and pea-sized fruits; severe fruit drop.',
    favorableConditions: 'Cool nights and warm sunny days (10–30°C) with morning fog during January–March flowering.',
    managementIdm: 'Apply wettable sulfur at panicle emergence and fruit set; ensure orchard canopy pruning for sunlight penetration.'
  },
  {
    id: 93,
    cropGroup: 'Fruits',
    crop: 'Mango',
    disease: 'Malformation disease',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium mangiferae',
    primarySymptoms: 'Vegetative bunches of crowded dwarfed shoots ("witch\'s broom"); floral panicles become compact, green, and sterile.',
    favorableConditions: 'Associated with mango bud mite (Aceria mangiferae) vectors; higher in northern subtropical zones.',
    managementIdm: 'Prune malformed panicles along with 15 cm healthy branch wood; spray acaricide for mite control.'
  },
  {
    id: 94,
    cropGroup: 'Fruits',
    crop: 'Citrus (Orange/Lemon)',
    disease: 'Citrus canker',
    pathogenType: 'Bacteria',
    scientificName: 'Xanthomonas citri pv. citri',
    primarySymptoms: 'Raised corky rough brown crater-like lesions with yellow water-soaked halos on leaves, twigs, and fruit peel.',
    favorableConditions: 'Wind-driven rain, leafminer insect feeding tunnels that create bacterial entry points.',
    managementIdm: 'Control citrus leafminer larvae; prune and burn infected twigs before monsoon; spray copper oxychloride.'
  },
  {
    id: 95,
    cropGroup: 'Fruits',
    crop: 'Citrus (Orange/Lemon)',
    disease: 'Citrus greening (Huanglongbing)',
    pathogenType: 'Bacteria',
    scientificName: 'Candidatus Liberibacter asiaticus',
    primarySymptoms: 'Asymmetrical blotchy yellowing on leaves, yellow shoots, small lopsided bitter fruits that remain green at bottom.',
    favorableConditions: 'Asian citrus psyllid (Diaphorina citri) vector transmission; vegetative grafting.',
    managementIdm: 'Plant certified pathogen-free budded saplings; monitor and control psyllid vectors with sticky traps; remove declining trees.'
  },
  {
    id: 96,
    cropGroup: 'Fruits',
    crop: 'Banana',
    disease: 'Panama disease (Fusarium wilt)',
    pathogenType: 'Fungi',
    scientificName: 'Fusarium oxysporum f. sp. cubense (TR4 / Race 1)',
    primarySymptoms: 'Yellowing of lower leaf margins progressing inward, collapse of petioles ("skirt" of dead leaves); brown vascular rings in pseudostem.',
    favorableConditions: 'Acidic sandy loam soils, continuous Cavendish monoculture, movement of contaminated suckers and water.',
    managementIdm: 'Strict quarantine on suckers; plant tissue-cultured certified plants; flood-fallow infected land; liming.'
  },
  {
    id: 97,
    cropGroup: 'Fruits',
    crop: 'Banana',
    disease: 'Black Sigatoka',
    pathogenType: 'Fungi',
    scientificName: 'Pseudocercospora fijiensis',
    primarySymptoms: 'Small dark reddish-brown streaks parallel to leaf veins merging into large black necrotic patches; rapid canopy destruction.',
    favorableConditions: 'High temperatures (25–28°C), continuous rain and relative humidity >90%.',
    managementIdm: 'De-leafing of infected leaves; improve plantation drainage; cultivate resistant banana hybrids.'
  },
  {
    id: 98,
    cropGroup: 'Fruits',
    crop: 'Grapes',
    disease: 'Downy mildew',
    pathogenType: 'Oomycetes',
    scientificName: 'Plasmopara viticola',
    primarySymptoms: 'Yellow translucent "oil-spot" lesions on upper leaf surface with delicate white downy mold underneath; berry shriveling.',
    favorableConditions: 'The 10-10-10 rule: 10 mm rainfall, 10°C minimum temperature, shoot length 10 cm.',
    managementIdm: 'Prune vines to facilitate canopy aeration; spray copper-based protectants before rain events; manage vine nutrition.'
  },
  {
    id: 99,
    cropGroup: 'Fruits',
    crop: 'Apple',
    disease: 'Apple scab',
    pathogenType: 'Fungi',
    scientificName: 'Venturia inaequalis',
    primarySymptoms: 'Olive-green to brown velvety spots on leaves; corky, scabby, cracked brown lesions on apple fruits.',
    favorableConditions: 'Cool wet spring weather with prolonged leaf wetness (Mills table: 9+ hours of wetness at 18–24°C).',
    managementIdm: 'Urea spray (5%) on fallen autumn leaves to accelerate leaf breakdown; prune for open canopy; timely protectant sprays.'
  },
  {
    id: 100,
    cropGroup: 'Fruits',
    crop: 'Papaya',
    disease: 'Papaya ringspot disease (PRSV)',
    pathogenType: 'Viruses',
    scientificName: 'Papaya ringspot virus (Potyvirus)',
    primarySymptoms: 'Yellow mosaic mottling on leaves, oily dark green streaks on petioles and upper trunk; prominent circular ringspots on fruit skin.',
    favorableConditions: 'Non-persistent transmission by several aphid species visiting papaya plants.',
    managementIdm: 'Intercrop with barrier crops (maize); isolate orchards from cucurbits; rogue infected trees early; grow PRSV-tolerant lines.'
  }
];
