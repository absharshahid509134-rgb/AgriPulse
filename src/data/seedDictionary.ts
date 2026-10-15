import { DictionaryEntry } from '../types';

export const SEED_DICTIONARY_ENTRIES: DictionaryEntry[] = [
  // 1–4: Soil Science
  {
    id: 'dict-01',
    term: 'Alluvial Soil',
    hindiTerm: 'जलोढ़ मिट्टी (Jalodh Mitti)',
    pronunciation: 'uh-loo-vee-uhl soil',
    category: 'Soil Science',
    simpleDefinition: 'Fertile soil deposited by rivers over floodplains, rich in potash and lime.',
    hindiDefinition: 'नदियों द्वारा बहाकर लाई गई उपजाऊ मिट्टी, जिसमें पोटाश और चूने की अच्छी मात्रा होती है।',
    farmerFriendlyExplanation:
      'Alluvial soil is the soft, productive soil commonly found across the Indo-Gangetic plains. It is easy to plow, drains well, and responds well to irrigation and organic manure.',
    hindiExplanation:
      'यह उत्तर भारत के मैदानी इलाकों में पाई जाने वाली अत्यंत उपजाऊ मिट्टी है। इसमें जुताई आसान होती है और गेहूँ, धान, गन्ना व दलहन की फसलें बहुत अच्छी होती हैं।',
    practicalExample:
      'Farmers in Karnal and Kurukshetra grow sequential Rice–Wheat or Rice–Mustard crops on alluvial loam soil.',
    whyItMatters:
      'Because alluvial soils can be low in nitrogen and organic carbon after intensive cropping, regular green manuring or FYM keeps yields stable.',
    relatedTerms: ['Loam Soil', 'Soil Organic Carbon', 'Cation Exchange Capacity (CEC)'],
    relevantCrops: ['Wheat', 'Rice (Paddy)', 'Sugarcane', 'Mustard (Sarson)', 'Maize'],
  },
  {
    id: 'dict-02',
    term: 'Loam Soil',
    hindiTerm: 'दोमट मिट्टी (Domat Mitti)',
    pronunciation: 'lohm soil',
    category: 'Soil Science',
    simpleDefinition: 'A balanced soil texture containing roughly equal functional influence of sand, silt, and clay.',
    hindiDefinition: 'रेत, गाद (सिल्ट) और चिकनी मिट्टी का संतुलित मिश्रण वाली उपजाऊ मिट्टी।',
    farmerFriendlyExplanation:
      'Think of loam as the Goldilocks soil: sandy soil drains too fast, heavy clay holds water too tightly, and loam holds just the right moisture and nutrients while letting roots breathe.',
    hindiExplanation:
      'दोमट मिट्टी खेती के लिए सबसे उत्तम मानी जाती है क्योंकि इसमें पानी भी रुकता है और जड़ों को हवा भी मिलती रहती है।',
    practicalExample:
      'Sowing vegetables like tomato or potato on raised beds in sandy loam prevents tuber rot during winter showers.',
    whyItMatters:
      'Knowing whether your loam leans sandy or clayey helps you decide how frequently to irrigate.',
    relatedTerms: ['Alluvial Soil', 'Field Capacity', 'Soil Tilth'],
    relevantCrops: ['Wheat', 'Tomato', 'Potato', 'Cotton', 'Vegetables'],
  },
  {
    id: 'dict-03',
    term: 'Soil Organic Carbon (SOC)',
    hindiTerm: 'मृदा जैविक कार्बन (Mrida Jaivik Carbon)',
    pronunciation: 'soil or-gan-ik kar-buhn',
    category: 'Soil Science',
    simpleDefinition: 'The carbon component of decomposed plant and animal matter living in the soil.',
    hindiDefinition: 'मिट्टी में सड़े-गले पौधों और गोबर की खाद से बनने वाला जैविक कार्बन अंश।',
    farmerFriendlyExplanation:
      'Organic carbon is the life-sponge of your soil. When SOC is above 0.75%, the soil stays soft, holds more moisture during dry spells, and feeds beneficial earthworms and microbes.',
    hindiExplanation:
      'यह मिट्टी की ताकत और नमी पकड़ने की क्षमता का मुख्य आधार है। गोबर की खाद, वर्मीकम्पोस्ट और हरी खाद से इसे बढ़ाया जा सकता है।',
    practicalExample:
      'Incorporating dhaincha (green manure) before paddy transplanting helps raise SOC from 0.4% toward 0.65% over several seasons.',
    whyItMatters:
      'Chemical fertilizers work poorly when Soil Organic Carbon is depleted; improving SOC increases fertilizer efficiency.',
    relatedTerms: ['Vermicompost', 'Green Manuring', 'Soil Health Card'],
    relevantCrops: ['All Crops', 'Wheat', 'Rice (Paddy)', 'Pulses'],
  },
  {
    id: 'dict-04',
    term: 'Cation Exchange Capacity (CEC)',
    hindiTerm: 'धनायन विनिमय क्षमता (CEC)',
    pronunciation: 'kat-eye-on iks-cheynj kuh-pas-i-tee',
    category: 'Soil Science',
    simpleDefinition: 'A measure of how well soil particles can hold and exchange positively charged nutrients like potassium, calcium, and magnesium.',
    hindiDefinition: 'मिट्टी के कणों द्वारा पोटाश, कैल्शियम और मैग्नीशियम जैसे पोषक तत्वों को पकड़कर रखने की क्षमता।',
    farmerFriendlyExplanation:
      'CEC is like the size of your soil’s nutrient pantry. Clay and organic humus have a bigger pantry (high CEC), while pure sandy soil has a tiny pantry where fertilizer washes away quickly.',
    hindiExplanation:
      'जिस मिट्टी की CEC अधिक होती है, उसमें खाद के पोषक तत्व पानी के साथ बहकर नष्ट नहीं होते और पौधों को धीरे-धीरे मिलते रहते हैं।',
    practicalExample:
      'In sandy soils with low CEC, splitting nitrogen and potash into 3 smaller doses prevents leaching loss.',
    whyItMatters:
      'Helps determine whether to apply fertilizers in small split doses or standard applications.',
    relatedTerms: ['Soil Organic Carbon (SOC)', 'Split Application', 'Leaching'],
    relevantCrops: ['Wheat', 'Maize', 'Cotton', 'Vegetables'],
  },
  {
    id: 'dict-05',
    term: 'Soil Tilth',
    hindiTerm: 'मिट्टी की भुरभुरी अवस्था (Mitti ki Bhurbbhuri Avastha)',
    pronunciation: 'soil tilth',
    category: 'Soil Science',
    simpleDefinition: 'The physical condition of soil in relation to plant growth and ease of seedbed preparation.',
    hindiDefinition: 'जुताई के बाद बीज बोने के लिए मिट्टी की भुरभुरी और उपयुक्त भौतिक स्थिति।',
    farmerFriendlyExplanation:
      'Good tilth means the soil crumbles into small, soft granules without huge hard clods or dusty powder, giving seeds snug contact with moisture.',
    hindiExplanation:
      'जब मिट्टी में नमी सही हो ("बतर" अवस्था) और जुताई करने पर ढेले न बनें, तो उसे अच्छा टिल्थ कहा जाता है।',
    practicalExample:
      'Waiting 3–4 days after pre-sowing irrigation ("Rauni") until the soil reaches "wattar" condition produces ideal tilth for wheat sowing.',
    whyItMatters:
      'Poor tilth with large clods leads to uneven seed depth and patchy germination.',
    relatedTerms: ['Loam Soil', 'Seedbed Preparation', 'Zero Tillage'],
    relevantCrops: ['Wheat', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Soybean'],
  },

  // 6–9: Soil Moisture & pH
  {
    id: 'dict-06',
    term: 'Soil pH',
    hindiTerm: 'मिट्टी का पीएच मान (Mitti ka pH Maan)',
    pronunciation: 'soil pee-aych',
    category: 'Soil Moisture & pH',
    simpleDefinition: 'A scale from 0 to 14 that measures whether soil is acidic (below 7), neutral (7), or alkaline/saline (above 7).',
    hindiDefinition: 'मिट्टी की अम्लीयता (7 से कम), उदासीनता (7) या क्षारीयता (7 से अधिक) मापने का पैमाना।',
    farmerFriendlyExplanation:
      'Even if you apply plenty of fertilizer, your crop roots cannot absorb iron, zinc, or phosphorus if the soil pH is too high (alkaline/kallar) or too low (acidic). Most crops thrive between pH 6.5 and 7.5.',
    hindiExplanation:
      'यदि मिट्टी का pH 6.5 से 7.5 के बीच हो तो पौधे खाद को आसानी से सोख लेते हैं। 8.5 से ऊपर होने पर मिट्टी को ऊसर/कल्लर कहा जाता है जिसमें जिप्सम की जरूरत पड़ती है।',
    practicalExample:
      'When a Soil Health Card shows pH 8.6 in a Karnal plot, applying agricultural gypsum according to soil test advice helps reclaim the soil.',
    whyItMatters:
      'Checking soil pH prevents wasting money on micronutrients that get locked up in the soil.',
    relatedTerms: ['Electrical Conductivity (EC)', 'Gypsum Application', 'Micronutrients'],
    relevantCrops: ['All Crops', 'Rice (Paddy)', 'Wheat', 'Pulses'],
  },
  {
    id: 'dict-07',
    term: 'Field Capacity',
    hindiTerm: 'क्षेत्र जल धारण क्षमता (Field Capacity)',
    pronunciation: 'feeld kuh-pas-i-tee',
    category: 'Soil Moisture & pH',
    simpleDefinition: 'The amount of water remaining in the soil 2–3 days after heavy rain or irrigation, once excess gravity water has drained away.',
    hindiDefinition: 'सिंचाई या बारिश के 2–3 दिन बाद अतिरिक्त पानी रिस जाने पर मिट्टी में बची हुई आदर्श नमी।',
    farmerFriendlyExplanation:
      'At field capacity, the soil pores hold the maximum useful water without drowning the roots. Both water and air are available in balance.',
    hindiExplanation:
      'यह पौधों की जड़ों के लिए सबसे अच्छी स्थिति होती है क्योंकि इसमें पानी और हवा दोनों बराबर मात्रा में उपलब्ध होते हैं।',
    practicalExample:
      'Drip irrigation aims to keep root-zone moisture near field capacity instead of flooding and drying cycles.',
    whyItMatters:
      'Irrigating beyond field capacity wastes water and washes nitrogen below the root zone.',
    relatedTerms: ['Permanent Wilting Point', 'Tensiometer', 'Drip Irrigation'],
    relevantCrops: ['Tomato', 'Cotton', 'Wheat', 'Sugarcane'],
  },
  {
    id: 'dict-08',
    term: 'Permanent Wilting Point (PWP)',
    hindiTerm: 'स्थायी मुरझान बिंदु (Permanent Wilting Point)',
    pronunciation: 'pur-muh-nuhnt wil-ting point',
    category: 'Soil Moisture & pH',
    simpleDefinition: 'The minimum soil moisture level at which plant roots can no longer extract water, causing plants to wilt permanently.',
    hindiDefinition: 'मिट्टी में नमी का वह न्यूनतम स्तर जिसके नीचे पौधे जड़ों से पानी नहीं खींच पाते और मुरझा जाते हैं।',
    farmerFriendlyExplanation:
      'If soil dries down to the Permanent Wilting Point, plants do not recover even overnight in cool air unless irrigated immediately—and severe yield loss occurs.',
    hindiExplanation:
      'इस स्थिति तक मिट्टी को कभी सूखने नहीं देना चाहिए, वरना फूल और दाने बनने की प्रक्रिया को भारी नुकसान होता है।',
    practicalExample:
      'Farmers irrigate when roughly 50% of available water is used, long before reaching the Permanent Wilting Point.',
    whyItMatters:
      'Protects crops from irreversible drought stress during critical flowering and grain-filling stages.',
    relatedTerms: ['Field Capacity', 'Critical Irrigation Stage', 'Tensiometer'],
    relevantCrops: ['Wheat', 'Maize', 'Chickpea (Chana)', 'Mustard (Sarson)'],
  },
  {
    id: 'dict-09',
    term: 'Electrical Conductivity (EC)',
    hindiTerm: 'विद्युत चालकता / लवणता माप (EC)',
    pronunciation: 'i-lek-tri-kuhl kon-duhk-tiv-i-tee',
    category: 'Soil Moisture & pH',
    simpleDefinition: 'A measurement of dissolved salts in soil or irrigation water, usually expressed in dS/m.',
    hindiDefinition: 'मिट्टी या ट्यूबवेल के पानी में घुले हुए नमक (लवण) की मात्रा की माप।',
    farmerFriendlyExplanation:
      'High EC means salty soil or brackish borewell water. Excess salt makes it hard for roots to drink water and burns leaf tips.',
    hindiExplanation:
      'यदि मिट्टी या पानी का EC 2.0 dS/m से अधिक हो तो दलहन और सब्जियों के अंकुरण पर बुरा असर पड़ता है।',
    practicalExample:
      'Testing borewell water EC before using it in drip lines prevents salt crust buildup around tomato emitters.',
    whyItMatters:
      'Essential for choosing salt-tolerant crop varieties or mixing canal water with tubewell water.',
    relatedTerms: ['Soil pH', 'Drip Irrigation', 'Leaching'],
    relevantCrops: ['Pulses', 'Tomato', 'Wheat', 'Mustard (Sarson)'],
  },

  // 10–14: Irrigation
  {
    id: 'dict-10',
    term: 'Drip Irrigation',
    hindiTerm: 'टपक सिंचाई (Tapak Sinchai / Drip)',
    pronunciation: 'drip ir-i-gey-shuhn',
    category: 'Irrigation',
    simpleDefinition: 'A micro-irrigation system that delivers water and nutrients slowly in droplets directly to the plant root zone.',
    hindiDefinition: 'पाइप और ड्रिपर की सहायता से पौधों की जड़ों के पास बूंद-बूंद करके पानी पहुंचाने की आधुनिक विधि।',
    farmerFriendlyExplanation:
      'Instead of flooding the whole field and watering weeds, drip irrigation feeds only the crop roots—saving 40–60% water and keeping foliage dry so fungal diseases stay lower.',
    hindiExplanation:
      'इससे 40 से 60% पानी की बचत होती है, खरपतवार कम उगते हैं और घुलनशील खाद सीधे जड़ों तक पहुंचाई जा सकती है।',
    practicalExample:
      'Running inline drip lines for 45 minutes every second day in Tomato Plot A3.',
    whyItMatters:
      'Qualifies for micro-irrigation subsidies under PMKSY (Per Drop More Crop) and boosts water-use efficiency.',
    relatedTerms: ['Fertigation', 'Sprinkler Irrigation', 'Field Capacity'],
    relevantCrops: ['Tomato', 'Cotton', 'Sugarcane', 'Vegetables', 'Orchards'],
  },
  {
    id: 'dict-11',
    term: 'Alternate Wetting and Drying (AWD)',
    hindiTerm: 'वैकल्पिक गीला और सूखा सिंचाई (AWD)',
    pronunciation: 'awl-ter-nit wet-ing and dry-ing',
    category: 'Irrigation',
    simpleDefinition: 'A water-saving paddy irrigation method where fields are re-irrigated a few days after standing water disappears rather than kept continuously flooded.',
    hindiDefinition: 'धान के खेत में लगातार पानी भरा रखने के बजाय पानी सूखने के 2-3 दिन बाद दोबारा सिंचाई करने की वैज्ञानिक विधि।',
    farmerFriendlyExplanation:
      'Using a perforated PVC "pani pipe" sunk 15 cm into the paddy field, farmers wait until water drops 15 cm below the surface before turning on the pump. This saves 25% water and strengthens rice stems against lodging.',
    hindiExplanation:
      'खेत में छिद्रयुक्त पीवीसी पाइप लगाकर पानी का स्तर देखा जाता है। इससे पानी और बिजली दोनों बचते हैं और तना मजबूत बनता है।',
    practicalExample:
      'Practicing AWD in Pusa Basmati 1121 during vegetative tillering reduces brown planthopper buildup at the plant base.',
    whyItMatters:
      'Reduces groundwater depletion, pumping costs, and methane emissions without reducing paddy yield.',
    relatedTerms: ['Tensiometer', 'Crown Root Initiation (CRI)', 'Lodging'],
    relevantCrops: ['Rice (Paddy)'],
  },
  {
    id: 'dict-12',
    term: 'Fertigation',
    hindiTerm: 'फर्टिगेशन (सिंचाई के साथ खाद देना)',
    pronunciation: 'fur-ti-gey-shuhn',
    category: 'Irrigation',
    simpleDefinition: 'Injecting water-soluble fertilizers into an irrigation system (especially drip or sprinkler) so nutrients reach roots with water.',
    hindiDefinition: 'ड्रिप या फव्वारा सिंचाई के पानी में घुलनशील उर्वरक मिलाकर सीधे जड़ों तक पहुंचाना।',
    farmerFriendlyExplanation:
      'Fertigation is like spoon-feeding your crop small, balanced meals every week through the drip pipe using a venturi injector, rather than dumping heavy fertilizer bags all at once.',
    hindiExplanation:
      'वूंटूरी (Venturi) या फर्टिलाइजर टैंक की मदद से NPK 19:19:19 जैसी घुलनशील खाद देने से खाद की बर्बादी रुकती है।',
    practicalExample:
      'Injecting water-soluble NPK 19:19:19 during the middle 20 minutes of a 45-minute drip cycle, followed by 10 minutes of clean water flush.',
    whyItMatters:
      'Increases nutrient uptake efficiency up to 80–90% compared to 30–50% in broadcast soil application.',
    relatedTerms: ['Drip Irrigation', 'Water-Soluble Fertilizer', 'NPK Ratio'],
    relevantCrops: ['Tomato', 'Cotton', 'Sugarcane', 'Chilli', 'Fruits'],
  },
  {
    id: 'dict-13',
    term: 'Sprinkler Irrigation',
    hindiTerm: 'फव्वारा सिंचाई (Fawara Sinchai)',
    pronunciation: 'spring-kler ir-i-gey-shuhn',
    category: 'Irrigation',
    simpleDefinition: 'Applying irrigation water through pressurized nozzles that spray water into the air like natural rainfall.',
    hindiDefinition: 'पाइप और नोजल के माध्यम से बारिश की तरह फसलों पर पानी का छिड़काव करने की विधि।',
    farmerFriendlyExplanation:
      'Ideal for uneven sandy fields and closely spaced crops like mustard, chickpea, and wheat where leveling for flood irrigation is costly.',
    hindiExplanation:
      'रेतीली या ऊँची-नीची जमीन में सरसों, चना और गेहूँ की सिंचाई के लिए फव्वारा विधि बहुत कारगर है।',
    practicalExample:
      'Using mini-sprinklers in Mustard Plot B1 for light, uniform pre-flowering moisture.',
    whyItMatters:
      'Prevents deep percolation losses in sandy soils and protects winter crops from mild frost damage.',
    relatedTerms: ['Drip Irrigation', 'Critical Irrigation Stage', 'Evapotranspiration (ET)'],
    relevantCrops: ['Mustard (Sarson)', 'Chickpea (Chana)', 'Wheat', 'Groundnut'],
  },

  // 14–17: Seeds & Germination
  {
    id: 'dict-14',
    term: 'Germination Percentage',
    hindiTerm: 'अंकुरण प्रतिशत (Ankuran Pratishat)',
    pronunciation: 'jur-mi-ney-shuhn pur-sen-tij',
    category: 'Seeds & Germination',
    simpleDefinition: 'The percentage of seeds in a sample that sprout into healthy seedlings under favorable moisture and temperature.',
    hindiDefinition: 'सौ बीजों में से स्वस्थ रूप से उगने वाले पौधों की संख्या का प्रतिशत।',
    farmerFriendlyExplanation:
      'Before sowing farm-saved seed, wrapping 100 seeds in a damp jute cloth or newspaper for 5–7 days tells you how many actually sprout. If only 70 sprout instead of 85+, you must increase your seed rate or replace the seed lot.',
    hindiExplanation:
      'बुवाई से पहले घर पर गीले बोरे या अखबार में 100 दाने रखकर अंकुरण जांचने से खेत में खाली जगह (गैप) रहने का खतरा नहीं रहता।',
    practicalExample:
      'Testing wheat seed lot germination (found at 91%) before sowing 40 kg/acre with a seed drill.',
    whyItMatters:
      'Directly determines optimal plant population and prevents costly re-sowing.',
    relatedTerms: ['Seed Vigor', 'Seed Treatment', 'Seed Rate'],
    relevantCrops: ['Wheat', 'Soybean', 'Cotton', 'Maize', 'Chickpea (Chana)'],
  },
  {
    id: 'dict-15',
    term: 'Seed Treatment',
    hindiTerm: 'बीज उपचार (Beej Upchar)',
    pronunciation: 'seed treet-muhnt',
    category: 'Seeds & Germination',
    simpleDefinition: 'Coating seeds before sowing with bio-agents, fungicides, or microbial cultures to protect emerging seedlings and improve nutrient uptake.',
    hindiDefinition: 'बुवाई से पहले बीजों को ट्राइकोडर्मा, राइजोबियम या अनुशंसित फफूंदनाशक से उपचारित करने की प्रक्रिया।',
    farmerFriendlyExplanation:
      'Seed treatment is like a childhood vaccination for your crop. It costs very little per acre but guards tender roots against soil-borne collar rot and wilt during the first 30 days.',
    hindiExplanation:
      'यह कम खर्च में फसल को जड़ गलन और उकठा (Wilt) रोग से बचाने का सबसे आसान और प्रभावी तरीका है।',
    practicalExample:
      'Treating Chickpea (JG-11) seeds first with Trichoderma viride and then with Rhizobium culture in the shade before sowing.',
    whyItMatters:
      'Reduces early seedling mortality and builds biological nitrogen fixation in pulses.',
    relatedTerms: ['Rhizobium Inoculant', 'Trichoderma', 'Germination Percentage'],
    relevantCrops: ['Chickpea (Chana)', 'Wheat', 'Soybean', 'Rice (Paddy)', 'Mustard (Sarson)'],
  },
  {
    id: 'dict-16',
    term: 'Seed Vigor',
    hindiTerm: 'बीज ओज (Beej Oj / Shakti)',
    pronunciation: 'seed vig-er',
    category: 'Seeds & Germination',
    simpleDefinition: 'The strength and speed with which seeds emerge uniformly under real field conditions, including mild cold or crusted soil.',
    hindiDefinition: 'खेत की वास्तविक परिस्थितियों में बीज के तेजी और एकसमान रूप से उगने की अंदरूनी शक्ति।',
    farmerFriendlyExplanation:
      'Two seed bags might both have 85% lab germination, but high-vigor seeds pop out of the soil in 4 days together, while old low-vigor seeds struggle for 10 days.',
    hindiExplanation:
      'उच्च ओज वाले बीज खेत में जल्दी और एक साथ बाहर निकलते हैं, जिससे खरपतवारों से मुकाबला आसान होता है।',
    practicalExample:
      'Storing seed bags on wooden pallets away from damp walls preserves seed vigor through the monsoon.',
    whyItMatters:
      'Uniform emergence ensures all plants flower and mature at the same time.',
    relatedTerms: ['Germination Percentage', 'Seed Treatment', 'Hybrid Seed'],
    relevantCrops: ['Soybean', 'Maize', 'Cotton', 'Wheat'],
  },
  {
    id: 'dict-17',
    term: 'Hybrid vs. Open-Pollinated Variety (OPV)',
    hindiTerm: 'संकर (हाइब्रिड) बनाम देसी/उन्नत किस्म (OPV)',
    pronunciation: 'hy-brid vs oh-pee-vee',
    category: 'Seeds & Germination',
    simpleDefinition: 'Hybrids (F1) are first-generation crosses bred for high vigor that must be bought fresh each season; OPVs breed true so farmers can save seed.',
    hindiDefinition: 'हाइब्रिड (F1) बीज हर साल नया खरीदना पड़ता है जबकि उन्नत किस्म (Variety/OPV) का बीज किसान अगले साल के लिए बचा सकते हैं।',
    farmerFriendlyExplanation:
      'Knowing whether your crop is an F1 hybrid (like Arka Rakshak tomato) or a stable variety (like HD-3226 wheat or JG-11 gram) tells you whether saving harvested grain for next year’s seed will work or segregate.',
    hindiExplanation:
      'गेहूँ, धान, चना और सरसों की कई उन्नत किस्मों का बीज साफ करके अगले साल बोया जा सकता है, लेकिन F1 हाइब्रिड सब्जियों या मक्का का बीज दोबारा बोने पर पैदावार घट जाती है।',
    practicalExample:
      'Saving graded HD-3226 wheat seed for next Rabi while purchasing fresh F1 hybrid tomato seed packets.',
    whyItMatters:
      'Prevents yield drops caused by accidentally sowing F2 grain harvested from an F1 hybrid.',
    relatedTerms: ['Germination Percentage', 'Seed Vigor', 'Seed Rate'],
    relevantCrops: ['Tomato', 'Maize', 'Wheat', 'Rice (Paddy)', 'Mustard (Sarson)'],
  },

  // 18–21: Crop Growth Stages
  {
    id: 'dict-18',
    term: 'Crown Root Initiation (CRI)',
    hindiTerm: 'मुकुट जड़ अवस्था / पहली सिंचाई अवस्था (CRI)',
    pronunciation: 'krown root in-ish-ee-ay-shuhn',
    category: 'Crop Growth Stages',
    simpleDefinition: 'The critical growth stage in wheat occurring 20–25 days after sowing when permanent crown roots form just below the soil surface.',
    hindiDefinition: 'गेहूँ की बुवाई के 20–25 दिन बाद आने वाली सबसे महत्वपूर्ण अवस्था जब पौधे में स्थायी जड़ें और कल्ले निकलते हैं।',
    farmerFriendlyExplanation:
      'If you only have water for one irrigation in wheat, CRI (21 days after sowing) is the non-negotiable stage. Moisture stress here permanently reduces crown roots and tillers.',
    hindiExplanation:
      'गेहूँ में बुवाई के 21वें दिन के आसपास पहली सिंचाई (कोर पानी) करना बेहद जरूरी होता है; इसमें देरी होने से कल्ले कम बनते हैं।',
    practicalExample:
      'Scheduling first light irrigation in HD-3226 wheat exactly 21 days after October/November sowing.',
    whyItMatters:
      'Missing the CRI irrigation can reduce final wheat grain yield by 15–25%.',
    relatedTerms: ['Tillering', 'Booting Stage', 'Critical Irrigation Stage'],
    relevantCrops: ['Wheat', 'Barley'],
  },
  {
    id: 'dict-19',
    term: 'Tillering Stage',
    hindiTerm: 'कल्ले फूटने की अवस्था (Tillering)',
    pronunciation: 'til-er-ing steyj',
    category: 'Crop Growth Stages',
    simpleDefinition: 'The production of side shoots (tillers) from the base of cereal grasses like rice, wheat, and sugarcane.',
    hindiDefinition: 'धान, गेहूँ और गन्ने के मुख्य तने के निचले हिस्से से नई शाखाएं (कल्ले) निकलने की अवस्था।',
    farmerFriendlyExplanation:
      'More productive tillers per plant mean more grain-bearing panicles or ears at harvest. Adequate sunlight, shallow planting depth, and timely nitrogen boost healthy tillering.',
    hindiExplanation:
      'जितने अधिक स्वस्थ और बराबर कल्ले निकलेंगे, उतनी ही अधिक बालियाँ आएंगी और पैदावार बढ़ेगी।',
    practicalExample:
      'Applying first top-dressing of urea and zinc in paddy during active tillering.',
    whyItMatters:
      'Establishes the number of productive heads per square meter.',
    relatedTerms: ['Crown Root Initiation (CRI)', 'Panicle Initiation', 'Top Dressing'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Sugarcane', 'Barley'],
  },
  {
    id: 'dict-20',
    term: 'Booting & Panicle Initiation',
    hindiTerm: 'गोभ अवस्था / बाली बनने की शुरुआत (Gabh Avastha)',
    pronunciation: 'boo-ting and pan-i-kuhl',
    category: 'Crop Growth Stages',
    simpleDefinition: 'The stage when the developing grain head swells inside the upper leaf sheath ("boot") before emerging for flowering.',
    hindiDefinition: 'वह अवस्था जब बाली तने की ऊपरी पत्ती के अंदर बनती और फूलती है तथा बाहर निकलने की तैयारी करती है।',
    farmerFriendlyExplanation:
      'During booting, the baby grain head is rapidly forming inside the flag leaf sheath. Water stress, extreme heat, or stem borer injury at this stage directly causes empty chaffy grains.',
    hindiExplanation:
      'गोभ अवस्था में खेत में नमी की कमी बिल्कुल नहीं होनी चाहिए और तना छेदक कीट की निगरानी रखनी चाहिए।',
    practicalExample:
      'Maintaining 3–5 cm moisture in Basmati rice during booting and flag-leaf emergence.',
    whyItMatters:
      'Determines spikelet fertility and number of grains per panicle/ear.',
    relatedTerms: ['Tillering Stage', 'Physiological Maturity', 'Stem Borer'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Barley'],
  },
  {
    id: 'dict-21',
    term: 'Physiological Maturity',
    hindiTerm: 'शारीरिक परिपक्वता (Pakav Avastha)',
    pronunciation: 'fiz-ee-uh-loj-i-kuhl muh-toor-i-tee',
    category: 'Crop Growth Stages',
    simpleDefinition: 'The point when dry matter accumulation in the grain ends and no more water or nutrients flow from the plant into the seed.',
    hindiDefinition: 'वह अवस्था जब दानों में पूरा भोजन भर चुका होता है और पौधा दानों में पोषण भेजना बंद कर देता है।',
    farmerFriendlyExplanation:
      'Once a crop reaches physiological maturity, further irrigation only delays drying and risks lodging. Now the grain simply needs sunny days to lose excess moisture for safe storage.',
    hindiExplanation:
      'इस अवस्था के बाद सिंचाई बंद कर देनी चाहिए ताकि खेत सूख सके और कटाई समय पर हो सके।',
    practicalExample:
      'Draining Plot A1 10–12 days before harvest once 85% of Basmati panicles turn golden yellow.',
    whyItMatters:
      'Helps time irrigation cutoff and harvesting to minimize grain shattering and milling breakage.',
    relatedTerms: ['Grain Moisture Content', 'Lodging', 'Booting & Panicle Initiation'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Maize', 'Soybean', 'Mustard (Sarson)'],
  },

  // 22–25: Fertilizers
  {
    id: 'dict-22',
    term: 'NPK Ratio',
    hindiTerm: 'एनपीके अनुपात (नत्रजन : फास्फोरस : पोटाश)',
    pronunciation: 'en-pee-key rey-shee-oh',
    category: 'Fertilizers',
    simpleDefinition: 'The percentage by weight of Nitrogen (N), Phosphorus (P2O5), and Potassium (K2O) contained in a fertilizer.',
    hindiDefinition: 'किसी उर्वरक में नाइट्रोजन (N), फास्फोरस (P) और पोटाश (K) की प्रतिशत मात्रा का अनुपात।',
    farmerFriendlyExplanation:
      'Nitrogen builds green leafy growth, Phosphorus builds strong roots and flowers, and Potassium fills grains and boosts disease resistance. Balancing all three prevents weak, lodging-prone crops.',
    hindiExplanation:
      'केवल यूरिया (N) डालने से पौधा लंबा और कमजोर हो जाता है; मजबूत जड़ों के लिए फास्फोरस (DAP/SSP) और चमकदार दानों व रोग प्रतिरोधकता के लिए पोटाश (MOP) का संतुलन जरूरी है।',
    practicalExample:
      'Using NPK 19:19:19 water-soluble foliar/drip feed during vegetative-to-flowering transition in vegetables.',
    whyItMatters:
      'Balanced NPK nutrition prevents nutrient lockup, pest susceptibility, and soil exhaustion.',
    relatedTerms: ['Basal Dose', 'Top Dressing', 'Soil Health Card'],
    relevantCrops: ['All Crops'],
  },
  {
    id: 'dict-23',
    term: 'Basal Dose',
    hindiTerm: 'बेसल डोज़ (बुवाई के समय की खाद)',
    pronunciation: 'bey-suhl dohs',
    category: 'Fertilizers',
    simpleDefinition: 'Fertilizers and manures applied to the soil just before or during sowing/transplanting.',
    hindiDefinition: 'बुवाई या रोपाई के समय मिट्टी में आखिरी जुताई या सीड ड्रिल के माध्यम से दी जाने वाली शुरुआती खाद।',
    farmerFriendlyExplanation:
      'Phosphorus (like DAP or SSP) and potash move very little in soil, so placing them in the root zone at sowing ensures young roots find them immediately.',
    hindiExplanation:
      'फास्फोरस और पोटाश की पूरी मात्रा तथा नत्रजन का एक हिस्सा बुवाई के समय देने से जड़ें गहरी और मजबूत बनती हैं।',
    practicalExample:
      'Drilling DAP + MOP as a basal dose at sowing depth using a seed-cum-fertilizer drill in wheat.',
    whyItMatters:
      'Broadcasting phosphorus late on a standing crop wastes money because phosphorus stays near the surface away from deep roots.',
    relatedTerms: ['Top Dressing', 'NPK Ratio', 'Single Super Phosphate (SSP)'],
    relevantCrops: ['Wheat', 'Mustard (Sarson)', 'Chickpea (Chana)', 'Rice (Paddy)', 'Maize'],
  },
  {
    id: 'dict-24',
    term: 'Top Dressing',
    hindiTerm: 'टॉप ड्रेसिंग (खड़ी फसल में खाद देना)',
    pronunciation: 'top dres-ing',
    category: 'Fertilizers',
    simpleDefinition: 'Applying readily available fertilizer—usually nitrogen—to a standing crop during active growth stages.',
    hindiDefinition: 'खड़ी फसल में वानस्पतिक बढ़वार या कल्ले निकलते समय ऊपर से खाद (जैसे यूरिया) देने की विधि।',
    farmerFriendlyExplanation:
      'Because nitrogen easily washes down with water or escapes into the air, splitting it into 2 or 3 timely top dressings feeds the crop right when its appetite peaks.',
    hindiExplanation:
      'यूरिया को एक साथ देने के बजाय सिंचाई के अनुसार 2-3 किस्तों में देने से पौधे उसका पूरा उपयोग कर पाते हैं।',
    practicalExample:
      'Applying split nitrogen top dressing in wheat right after first irrigation at Crown Root Initiation.',
    whyItMatters:
      'Reduces nitrogen leaching and volatilization while improving grain protein and yield.',
    relatedTerms: ['Basal Dose', 'Neem-Coated Urea', 'Nano Urea'],
    relevantCrops: ['Wheat', 'Rice (Paddy)', 'Maize', 'Mustard (Sarson)'],
  },
  {
    id: 'dict-25',
    term: 'Single Super Phosphate (SSP)',
    hindiTerm: 'सिंगल सुपर फास्फेट (SSP खाद)',
    pronunciation: 'sing-guhl soo-per fos-feyt',
    category: 'Fertilizers',
    simpleDefinition: 'A multi-nutrient basal fertilizer containing 16% Phosphorus, 11% Sulphur, and 19–21% Calcium.',
    hindiDefinition: 'फास्फोरस (16%), सल्फर (11%) और कैल्शियम प्रदान करने वाला बहु-पोषक उर्वरक।',
    farmerFriendlyExplanation:
      'For oilseeds like mustard and soybean or pulses like chickpea, SSP is often superior to plain DAP because its built-in 11% sulphur directly boosts oil content and protein synthesis.',
    hindiExplanation:
      'सरसों, सोयाबीन, मूंगफली और चने जैसी फसलों के लिए SSP बहुत लाभकारी है क्योंकि इसमें फास्फोरस के साथ तेल बढ़ाने वाला सल्फर भी मुफ्त मिलता है।',
    practicalExample:
      'Using SSP as basal phosphorus source in Mustard Plot B1 to supply both P and Sulphur.',
    whyItMatters:
      'Addresses widespread sulphur deficiency in Indian soils cost-effectively.',
    relatedTerms: ['Sulphur Nutrition', 'Basal Dose', 'NPK Ratio'],
    relevantCrops: ['Mustard (Sarson)', 'Soybean', 'Groundnut', 'Chickpea (Chana)'],
  },

  // 26–29: Plant Nutrients
  {
    id: 'dict-26',
    term: 'Micronutrients',
    hindiTerm: 'सूक्ष्म पोषक तत्व (जिंक, बोरोन, आयरन आदि)',
    pronunciation: 'my-kroh-noo-tree-uhnts',
    category: 'Plant Nutrients',
    simpleDefinition: 'Essential plant nutrients needed in small quantities—such as Zinc, Boron, Iron, Manganese, Copper, and Molybdenum.',
    hindiDefinition: 'पौधों को कम मात्रा में किंतु अनिवार्य रूप से चाहिए जाने वाले तत्व जैसे जिंक, बोरोन, लोहा (आयरन), मैंगनीज और तांबा।',
    farmerFriendlyExplanation:
      'Micronutrients are like vitamins for crops. You only need a few kilograms per acre, yet without Zinc rice gets Khaira disease, and without Boron cauliflower curds turn hollow and flowers drop.',
    hindiExplanation:
      'भले ही इनकी मात्रा कम लगती है, लेकिन जिंक या बोरोन की कमी होने पर यूरिया-डीएपी डालने के बावजूद पूरी पैदावार नहीं मिलती।',
    practicalExample:
      'Applying Zinc Sulphate (21% or 33%) in paddy-wheat rotation once every 2–3 crop cycles based on soil test.',
    whyItMatters:
      'Prevents hidden hunger, flower drop, and poor grain setting.',
    relatedTerms: ['Zinc Deficiency (Khaira)', 'Boron in Pollination', 'Chelated Micronutrients'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Tomato', 'Vegetables', 'Mustard (Sarson)'],
  },
  {
    id: 'dict-27',
    term: 'Zinc Deficiency (Khaira Disease in Rice)',
    hindiTerm: 'जिंक की कमी / धान का खैरा रोग',
    pronunciation: 'zingk di-fish-uhn-see',
    category: 'Plant Nutrients',
    simpleDefinition: 'A nutrient disorder causing dusty brown-rust blotches on lower rice leaves and stunted tillering 2–4 weeks after transplanting.',
    hindiDefinition: 'जिंक की कमी से धान की पत्तियों पर कत्थई-भूरे धब्बे पड़ना और पौधों की बढ़वार रुक जाना (खैरा रोग)।',
    farmerFriendlyExplanation:
      'Farmers sometimes mistake Khaira for a fungal blight and spray fungicides needlessly. Look for rusty brown patches starting on middle/lower leaves with stunted roots in alkaline or continuously flooded soil.',
    hindiExplanation:
      'यह कोई फफूंद रोग नहीं बल्कि मिट्टी में जिंक की कमी है। रोपाई से पहले जिंक सल्फेट डालने से इसकी रोकथाम होती है।',
    practicalExample:
      'Distinguishing Khaira zinc deficiency from bacterial leaf blight during early tillering.',
    whyItMatters:
      'Saves farmers from unnecessary pesticide expenses by identifying a nutritional cause.',
    relatedTerms: ['Micronutrients', 'Soil pH', 'Tillering Stage'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Maize'],
  },
  {
    id: 'dict-28',
    term: 'Interveinal Chlorosis',
    hindiTerm: 'शिराओं के बीच पीलापन (Interveinal Chlorosis)',
    pronunciation: 'in-ter-vey-nuhl klaw-roh-sis',
    category: 'Plant Nutrients',
    simpleDefinition: 'Yellowing of leaf tissue between the leaf veins while the veins themselves remain green.',
    hindiDefinition: 'पत्ती की नसें (शिराएं) हरी रहना और उनके बीच का भाग पीला पड़ जाना।',
    farmerFriendlyExplanation:
      'Where the yellowing starts gives a big clue: if it appears on older bottom leaves (like in fruiting tomatoes), think Magnesium deficiency; if it starts on brand-new top leaves, think Iron or Zinc deficiency.',
    hindiExplanation:
      'यदि निचली पुरानी पत्तियों में नसें हरी और बीच का भाग पीला हो तो यह मैग्नीशियम की कमी हो सकती है; यदि नई ऊपरी पत्तियों में हो तो आयरन (लोहे) की कमी का संकेत है।',
    practicalExample:
      'Observing interveinal chlorosis on older basal leaves in Tomato Plot A3 during heavy fruit load.',
    whyItMatters:
      'Helps distinguish nutrient deficiencies from uniform nitrogen yellowing or viral mosaic.',
    relatedTerms: ['Micronutrients', 'Soil pH', 'Foliar Spray'],
    relevantCrops: ['Tomato', 'Citrus', 'Groundnut', 'Soybean', 'Cotton'],
  },
  {
    id: 'dict-29',
    term: 'Boron in Pollination & Fruit Set',
    hindiTerm: 'परागकण और फल बनने में बोरोन की भूमिका',
    pronunciation: 'bawr-on in pol-uh-ney-shuhn',
    category: 'Plant Nutrients',
    simpleDefinition: 'A micronutrient critical for pollen tube growth, flower retention, sugar transport, and cell wall strength.',
    hindiDefinition: 'फूलों के परागण, फल टिकने और फलों को फटने से बचाने के लिए आवश्यक सूक्ष्म पोषक तत्व।',
    farmerFriendlyExplanation:
      'When boron is low, crops produce plenty of flowers that fail to turn into pods or fruits, and vegetables like tomato or pomegranate crack open easily.',
    hindiExplanation:
      'बोरोन की कमी से फूल झड़ जाते हैं, सरसों/चने की फलियों में दाने कम बनते हैं और टमाटर के फल फटने लगते हैं।',
    practicalExample:
      'Checking boron levels before flowering in tomato and mustard plots.',
    whyItMatters:
      'Prevents flower drop, hollow stem in brassicas, and fruit cracking.',
    relatedTerms: ['Micronutrients', 'Flowering / Booting', 'Soil Health Card'],
    relevantCrops: ['Tomato', 'Mustard (Sarson)', 'Cauliflower', 'Chickpea (Chana)'],
  },

  // 30–34: Pest Management
  {
    id: 'dict-30',
    term: 'Integrated Pest Management (IPM)',
    hindiTerm: 'एकीकृत कीट प्रबंधन (IPM)',
    pronunciation: 'in-ti-grey-tid pest man-ij-muhnt',
    category: 'Pest Management',
    simpleDefinition: 'A smart, step-by-step pest control strategy combining resistant varieties, clean cultivation, biological allies, traps, and last-resort targeted sprays.',
    hindiDefinition: 'फसल चक्र, खेत की सफाई, मित्र कीटों के संरक्षण, फेरोमोन/चिपचिपे ट्रैप और आवश्यकता पड़ने पर ही सुरक्षित दवाओं के संतुलित उपयोग की विधि।',
    farmerFriendlyExplanation:
      'IPM means not reaching for a chemical spray bottle the moment you see a single insect. First use sticky traps, neem oil, bird perches, and beneficial ladybugs; use chemicals only if pests cross the Economic Threshold Level.',
    hindiExplanation:
      'IPM से खेती की लागत घटती है, मित्र कीट बचते हैं और कीटों में दवाओं के प्रति सहनशक्ति (Resistance) नहीं बनती।',
    practicalExample:
      'Installing yellow sticky traps and neem kernel extract sprays in Tomato Plot A3 before considering chemical options.',
    whyItMatters:
      'Lowers input cost, protects pollinators, and keeps harvest residue safe.',
    relatedTerms: ['Economic Threshold Level (ETL)', 'Yellow Sticky Traps', 'Pheromone Trap'],
    relevantCrops: ['All Crops', 'Tomato', 'Cotton', 'Rice (Paddy)', 'Chickpea (Chana)'],
  },
  {
    id: 'dict-31',
    term: 'Economic Threshold Level (ETL)',
    hindiTerm: 'आर्थिक क्षति स्तर (ETL)',
    pronunciation: 'ek-uh-nom-ik thresh-hohld lev-uhl',
    category: 'Pest Management',
    simpleDefinition: 'The pest population density at which control measures should be taken to prevent the pest from causing economic crop loss greater than the cost of control.',
    hindiDefinition: 'कीटों की वह संख्या जिसके पार जाने पर फसल को होने वाला आर्थिक नुकसान नियंत्रण के खर्च से अधिक हो सकता है।',
    farmerFriendlyExplanation:
      'Seeing 1 or 2 bugs in a field does not justify spending ₹1,200/acre on spraying. ETL tells you the scientific count (for example, number of bugs per meter row or per trap) where action actually pays off.',
    hindiExplanation:
      'जब तक कीटों की संख्या ETL से नीचे रहती है, मित्र कीट स्वयं उन्हें नियंत्रित कर लेते हैं और महंगे छिड़काव की आवश्यकता नहीं होती।',
    practicalExample:
      'Scouting 10 random plants across a plot to check if aphid or whitefly counts have reached the KVK-advised ETL.',
    whyItMatters:
      'Prevents panic spraying and preserves beneficial predator insects.',
    relatedTerms: ['Integrated Pest Management (IPM)', 'Beneficial Insects', 'Yellow Sticky Traps'],
    relevantCrops: ['Cotton', 'Rice (Paddy)', 'Mustard (Sarson)', 'Tomato', 'Chickpea (Chana)'],
  },
  {
    id: 'dict-32',
    term: 'Yellow & Blue Sticky Traps',
    hindiTerm: 'पीले और नीले चिपचिपे प्रपंच (Sticky Traps)',
    pronunciation: 'stik-ee traps',
    category: 'Pest Management',
    simpleDefinition: 'Colored plastic cards coated with non-drying adhesive hung just above crop canopy to attract and trap flying sucking pests.',
    hindiDefinition: 'सफेद मक्खी, माहू (एफिड) और थ्रिप्स जैसे रस चूसक कीटों को आकर्षित करके चिपकाने वाले रंगीन गत्ते/शीट।',
    farmerFriendlyExplanation:
      'Yellow traps attract whiteflies, aphids, and leaf miners; blue traps attract thrips. Hanging 8–10 traps per acre gives an instant visual dashboard of what pests are flying into your field.',
    hindiExplanation:
      'पीले ट्रैप सफेद मक्खी व माहू के लिए और नीले ट्रैप थ्रिप्स के लिए लगाए जाते हैं। इन्हें फसल की ऊँचाई से 6 इंच ऊपर बांधना चाहिए।',
    practicalExample:
      'Placing yellow sticky traps in Tomato Plot A3 to monitor whitefly vectors.',
    whyItMatters:
      'Provides early warning of virus-carrying insects without any chemical residue.',
    relatedTerms: ['Integrated Pest Management (IPM)', 'Whitefly Vector', 'Pheromone Trap'],
    relevantCrops: ['Tomato', 'Chilli', 'Cotton', 'Vegetables', 'Pulses'],
  },
  {
    id: 'dict-33',
    term: 'Pheromone Trap',
    hindiTerm: 'फेरोमोन ट्रैप (गंध पाश)',
    pronunciation: 'fer-uh-mohn trap',
    category: 'Pest Management',
    simpleDefinition: 'An insect trap using a species-specific synthetic scent lure to attract and capture adult male moths of borers and bollworms.',
    hindiDefinition: 'मादा कीट की गंध (ल्यूर) की सहायता से नर पतंगों को आकर्षित करके पकड़ने वाला ट्रैप।',
    farmerFriendlyExplanation:
      'When adult moths start appearing inside the funnel trap for 3 consecutive nights, you know egg-laying has begun in the field—allowing you to time neem sprays or Trichogramma cards accurately.',
    hindiExplanation:
      'चना फली छेदक (Helicoverpa), धान तना छेदक और बैंगन फल छेदक की निगरानी व नियंत्रण के लिए 5 ट्रैप प्रति एकड़ लगाए जाते हैं।',
    practicalExample:
      'Installing Helicoverpa armigera pheromone lures in Chickpea Plot B2 prior to pod formation.',
    whyItMatters:
      'Detects hidden borer moth flights before caterpillars tunnel inside pods or stems.',
    relatedTerms: ['Integrated Pest Management (IPM)', 'Economic Threshold Level (ETL)', 'Neem Seed Kernel Extract (NSKE)'],
    relevantCrops: ['Chickpea (Chana)', 'Rice (Paddy)', 'Cotton', 'Tomato', 'Maize'],
  },
  {
    id: 'dict-34',
    term: 'Beneficial Insects (Natural Enemies)',
    hindiTerm: 'मित्र कीट (लेडीबर्ड बीटल, क्राइसोपर्ला, मकड़ी)',
    pronunciation: 'ben-uh-fish-uhl in-sekts',
    category: 'Pest Management',
    simpleDefinition: 'Predatory and parasitic insects living on farms that naturally eat or parasitize crop-damaging pests.',
    hindiDefinition: 'खेत में पाए जाने वाले वे लाभकारी कीट जो फसलों को नुकसान पहुँचाने वाले शत्रु कीटों और उनके अंडों को खाते हैं।',
    farmerFriendlyExplanation:
      'Ladybird beetles (red with black spots), green lacewings, spiders, and dragonflies are your unpaid farm guards. One ladybird beetle can eat dozens of aphids a day! Broad-spectrum chemical sprays wipe out these guards first.',
    hindiExplanation:
      'लेडीबर्ड बीटल (इंद्रगोप), मकड़ी और ट्राइकोग्रामा किसान के सच्चे मित्र हैं। अंधाधुंध कीटनाशक छिड़कने से मित्र कीट मर जाते हैं और शत्रु कीट दोगुनी तेजी से बढ़ते हैं।',
    practicalExample:
      'Holding off on chemical spray in mustard when ladybird beetles are actively feeding on early aphid colonies.',
    whyItMatters:
      'Provides free biological pest suppression when conserved.',
    relatedTerms: ['Integrated Pest Management (IPM)', 'Economic Threshold Level (ETL)', 'Neem Seed Kernel Extract (NSKE)'],
    relevantCrops: ['All Crops'],
  },

  // 35–38: Plant Diseases
  {
    id: 'dict-35',
    term: 'Trichoderma viride / harzianum',
    hindiTerm: 'ट्राइकोडर्मा (मित्र फफूंद)',
    pronunciation: 'try-koh-dur-muh',
    category: 'Plant Diseases',
    simpleDefinition: 'A beneficial soil fungus used for seed and soil treatment that suppresses root-rot and wilt-causing pathogenic fungi.',
    hindiDefinition: 'एक लाभकारी मित्र फफूंद जो मिट्टी में रहने वाली हानिकारक फफूंदों (जड़ गलन, उकठा) को नष्ट करती है।',
    farmerFriendlyExplanation:
      'Multiplying 1–2 kg of Trichoderma in 100 kg of moist, well-rotted FYM under shade for 7–10 days and broadcasting it before sowing colonizes the root zone with good fungi that crowd out Fusarium wilt.',
    hindiExplanation:
      'सड़ी हुई गोबर की खाद में ट्राइकोडर्मा मिलाकर खेत में डालने से चना, सब्जी और मसालों में उकठा (Wilt) रोग से दीर्घकालीन सुरक्षा मिलती है।',
    practicalExample:
      'Enriching farmyard manure with Trichoderma viride before sowing Chickpea JG-11 in Plot B2.',
    whyItMatters:
      'Safe, biological protection against soil-borne vascular wilts and damping-off.',
    relatedTerms: ['Seed Treatment', 'Fusarium Wilt', 'Soil Organic Carbon (SOC)'],
    relevantCrops: ['Chickpea (Chana)', 'Tomato', 'Vegetables', 'Pulses', 'Spices'],
  },
  {
    id: 'dict-36',
    term: 'Fusarium Wilt',
    hindiTerm: 'उकठा रोग (Uktha Rog / Wilt)',
    pronunciation: 'fyoo-zair-ee-uhm wilt',
    category: 'Plant Diseases',
    simpleDefinition: 'A soil-borne fungal disease that blocks water-conducting vessels inside the stem, causing yellowing and sudden wilting.',
    hindiDefinition: 'मिट्टी जनित फफूंद रोग जिसमें पौधे की जड़ और तने की नलिकाएं बंद हो जाती हैं और पौधा हरी या पीली अवस्था में सूख जाता है।',
    farmerFriendlyExplanation:
      'Unlike drought wilting where the whole plot droops, Fusarium wilt often hits scattered patches. If you split the lower stem lengthwise with a knife, you will see dark brown discoloration inside the central vascular ring.',
    hindiExplanation:
      'उकठा ग्रस्त पौधे को उखाड़कर तने को बीच से चीरने पर अंदर भूरे-काले रंग की धारी दिखाई देती है, जबकि जड़ की बाहरी छाल सही दिखती है।',
    practicalExample:
      'Growing wilt-tolerant chickpea varieties (like JG-11) and practicing Trichoderma seed treatment.',
    whyItMatters:
      'Once a plant wilts from Fusarium in standing crop, curatives rarely save that plant—prevention via seed treatment and crop rotation is key.',
    relatedTerms: ['Trichoderma viride / harzianum', 'Seed Treatment', 'Crop Rotation'],
    relevantCrops: ['Chickpea (Chana)', 'Pigeonpea (Arhar)', 'Tomato', 'Cotton'],
  },
  {
    id: 'dict-37',
    term: 'Blight (Early & Late Blight)',
    hindiTerm: 'झुलसा रोग (अगेती व पछेती झुलसा)',
    pronunciation: 'blyt',
    category: 'Plant Diseases',
    simpleDefinition: 'Fungal or oomycete leaf and stem diseases causing brown-black target-ring spots or water-soaked lesions that rapidly brown foliage.',
    hindiDefinition: 'पत्तियों और तनों पर भूरे-काले छल्लेदार या जले हुए जैसे धब्बे पड़ने वाला रोग जो नमी व कोहरे में तेजी से फैलता है।',
    farmerFriendlyExplanation:
      'Early blight (Alternaria) usually forms concentric "bull’s-eye" rings on older bottom leaves first during warm-humid days. Late blight (Phytophthora) spreads explosively during cool, foggy, wet weather with pale mold under leaf margins.',
    hindiExplanation:
      'अगेती झुलसा में पुरानी पत्तियों पर गोल छल्लेदार निशान बनते हैं, जबकि पछेती झुलसा ठंडे और कोहरे वाले मौसम में कुछ ही दिनों में पूरी फसल को झुलसा सकता है।',
    practicalExample:
      'Avoiding evening overhead irrigation in tomato and potato during cloudy, humid weather.',
    whyItMatters:
      'Early detection of lower-leaf lesions allows timely canopy sanitation and expert consultation.',
    relatedTerms: ['Relative Humidity', 'Drip Irrigation', 'Canopy Ventilation'],
    relevantCrops: ['Tomato', 'Potato', 'Mustard (Sarson)'],
  },
  {
    id: 'dict-38',
    term: 'Rogueing',
    hindiTerm: 'रोगिंग (अवांछित व रोगग्रस्त पौधों को उखाड़ना)',
    pronunciation: 'roh-ging',
    category: 'Plant Diseases',
    simpleDefinition: 'Removing off-type, weeds, or virus-infected plants from a crop field to prevent disease spread or maintain seed purity.',
    hindiDefinition: 'खेत से विषाणु (वायरस) ग्रस्त या अन्य किस्म के मिले हुए पौधों को जड़ सहित उखाड़कर बाहर नष्ट करने की प्रक्रिया।',
    farmerFriendlyExplanation:
      'A single severe leaf-curl virus plant in your tomato plot acts as a virus factory for whiteflies to infect healthy neighbors. Carefully uprooting early viral plants and burying them away from the field stops the chain.',
    hindiExplanation:
      'शुरुआती अवस्था में ही मोज़ेक या पर्ण कुंचन (Leaf Curl) से ग्रस्त इक्का-दुक्का पौधों को उखाड़कर दबा देने से पूरा खेत संक्रमित होने से बच जाता है।',
    practicalExample:
      'Inspecting seed plots before flowering to remove tall off-type plants and severely virus-stunted seedlings.',
    whyItMatters:
      'Essential for viral disease containment and pure farm-saved seed production.',
    relatedTerms: ['Yellow & Blue Sticky Traps', 'Seed Vigor', 'Integrated Pest Management (IPM)'],
    relevantCrops: ['Tomato', 'Potato', 'Wheat', 'Rice (Paddy)', 'Pulses'],
  },

  // 39–42: Weather & Rainfall
  {
    id: 'dict-39',
    term: 'Evapotranspiration (ET)',
    hindiTerm: 'वाष्पोत्सर्जन (Evapotranspiration)',
    pronunciation: 'i-vap-oh-tran-spi-rey-shuhn',
    category: 'Weather & Rainfall',
    simpleDefinition: 'The combined loss of water from soil surface evaporation plus moisture transpired through plant leaves.',
    hindiDefinition: 'मिट्टी की सतह से भाप बनकर उड़ने वाले पानी और पौधों की पत्तियों से निकलने वाली नमी का कुल योग।',
    farmerFriendlyExplanation:
      'On a hot, windy, dry afternoon (35°C with 20 km/h wind), ET is high—your crop drinks twice as much water as on a mild, calm day. Mulching cuts soil evaporation so more water stays for the roots.',
    hindiExplanation:
      'गर्मी और तेज हवा वाले दिनों में ET बढ़ जाता है। मल्चिंग (पुआल या प्लास्टिक मल्च) बिछाने से मिट्टी से पानी का उड़ना कम हो जाता है।',
    practicalExample:
      'Using crop residue mulch between vegetable rows to lower daily evapotranspiration loss.',
    whyItMatters:
      'Guides how much irrigation water needs to be replenished each week.',
    relatedTerms: ['Mulching', 'Field Capacity', 'Relative Humidity'],
    relevantCrops: ['All Crops'],
  },
  {
    id: 'dict-40',
    term: 'Western Disturbance',
    hindiTerm: 'पश्चिमी विक्षोभ (Pashchimi Vikshobh)',
    pronunciation: 'wes-tern dis-tur-buhns',
    category: 'Weather & Rainfall',
    simpleDefinition: 'Weather systems originating over the Mediterranean region that bring winter/post-monsoon cloudiness and rain to northwestern India.',
    hindiDefinition: 'उत्तर-पश्चिम भारत में अक्टूबर से मार्च के बीच बादल, हल्की से मध्यम बारिश और कभी-कभी तेज हवा लाने वाला मौसमी तंत्र।',
    farmerFriendlyExplanation:
      'Light winter rain from a Western Disturbance acts like liquid gold ("mahawat") for growing wheat and mustard, saving an irrigation—unless accompanied by high winds or hail during crop maturity.',
    hindiExplanation:
      'रबी की खड़ी फसल (गेहूँ, चना, सरसों) के लिए पश्चिमी विक्षोभ की हल्की बारिश ("मावठ") बहुत लाभदायक होती है, पर तेज हवा की संभावना हो तो सिंचाई रोक देनी चाहिए।',
    practicalExample:
      'Postponing wheat irrigation when a Western Disturbance forecast predicts 15–20 mm rain in Karnal.',
    whyItMatters:
      'Prevents waterlogging and wheat lodging caused by irrigating right before a rain event.',
    relatedTerms: ['Lodging', 'Rain Gauge', 'Relative Humidity'],
    relevantCrops: ['Wheat', 'Mustard (Sarson)', 'Chickpea (Chana)'],
  },
  {
    id: 'dict-41',
    term: 'Lodging',
    hindiTerm: 'फसल का गिरना (Lodging)',
    pronunciation: 'loj-ing',
    category: 'Weather & Rainfall',
    simpleDefinition: 'The bending over or flattening of tall cereal stems near the ground due to high winds, heavy rain, excess nitrogen, or over-irrigation.',
    hindiDefinition: 'तेज हवा, भारी बारिश या सिंचाई के बाद गेहूँ व धान जैसी फसलों का जमीन पर गिर या बिछ जाना।',
    farmerFriendlyExplanation:
      'If you irrigate wheat or mature paddy on a windy afternoon, wet soil loosens root grip and wind pushes the heavy grain heads flat—slashing grain weight and making combine harvesting difficult.',
    hindiExplanation:
      'जब हवा तेज चल रही हो या मौसम विभाग ने आंधी-बारिश की चेतावनी दी हो, तब गेहूँ व धान में सिंचाई बिल्कुल नहीं करनी चाहिए।',
    practicalExample:
      'Checking wind speed forecast (<12 km/h) before scheduling late-season irrigation in wheat.',
    whyItMatters:
      'Lodging during grain filling can cut yield by 20–40% and degrade grain quality.',
    relatedTerms: ['Western Disturbance', 'NPK Ratio', 'Physiological Maturity'],
    relevantCrops: ['Wheat', 'Rice (Paddy)', 'Sugarcane', 'Mustard (Sarson)'],
  },
  {
    id: 'dict-42',
    term: 'Relative Humidity (RH)',
    hindiTerm: 'सापेक्षिक आर्द्रता (हवा में नमी का प्रतिशत)',
    pronunciation: 'rel-uh-tiv hyoo-mid-i-tee',
    category: 'Weather & Rainfall',
    simpleDefinition: 'The percentage of moisture currently held in the air compared to the maximum moisture the air could hold at that temperature.',
    hindiDefinition: 'हवा में मौजूद नमी की प्रतिशत मात्रा।',
    farmerFriendlyExplanation:
      'Sustained high humidity above 80% with cloudy skies is the main trigger for fungal spores (like blight, rust, and mildew) and sucking pests. Low humidity below 40% speeds up grain drying.',
    hindiExplanation:
      'जब हवा में नमी 80% से ऊपर लगातार बनी रहती है, तो झुलसा व फफूंद रोगों तथा माहू कीट के पनपने की संभावना बढ़ जाती है।',
    practicalExample:
      'Monitoring morning and evening RH on the AGRIPULSE Weather dashboard to schedule preventive field scouting.',
    whyItMatters:
      'Key environmental indicator for early disease-risk forecasting and harvest drying.',
    relatedTerms: ['Blight (Early & Late Blight)', 'Evapotranspiration (ET)', 'Grain Moisture Content'],
    relevantCrops: ['Tomato', 'Potato', 'Mustard (Sarson)', 'Rice (Paddy)', 'Wheat'],
  },

  // 43–45: Farm Machinery
  {
    id: 'dict-43',
    term: 'Happy Seeder / Super Seeder',
    hindiTerm: 'हैप्पी सीडर / सुपर सीडर',
    pronunciation: 'hap-ee see-der',
    category: 'Farm Machinery',
    simpleDefinition: 'Tractor-mounted conservation agriculture machines that sow wheat directly into paddy residue without burning stubble.',
    hindiDefinition: 'धान की पराली जलाए बिना सीधे खेत में गेहूँ की बुवाई करने वाली आधुनिक कृषि मशीनें।',
    farmerFriendlyExplanation:
      'Instead of burning paddy straw and losing precious soil organic carbon and beneficial microbes, a Happy Seeder cuts and spreads the straw as a moisture-conserving mulch while drilling wheat seeds in rows.',
    hindiExplanation:
      'इससे पराली जलाने की जरूरत नहीं पड़ती, गेहूँ की बुवाई 7–10 दिन अगेती हो जाती है और पराली मल्च का काम करके पानी बचाती है।',
    practicalExample:
      'Booking a Super SMS combine harvester followed by Happy Seeder sowing in Plot A1 after Basmati harvest.',
    whyItMatters:
      'Eliminates crop residue burning, conserves soil moisture, and qualifies for SMAM / CRM machinery subsidies.',
    relatedTerms: ['Zero Tillage', 'Mulching', 'Soil Organic Carbon (SOC)'],
    relevantCrops: ['Wheat', 'Rice (Paddy)'],
  },
  {
    id: 'dict-44',
    term: 'Laser Land Leveler',
    hindiTerm: 'लेजर लैंड लेवलर (कंप्यूटर गोडी / कराहा)',
    pronunciation: 'ley-zer land lev-uh-ler',
    category: 'Farm Machinery',
    simpleDefinition: 'A laser-guided drag bucket pulled by a tractor that levels agricultural fields to an even grade within ±2 cm accuracy.',
    hindiDefinition: 'लेजर किरणों की सहायता से खेत को बिल्कुल समतल करने वाली मशीन।',
    farmerFriendlyExplanation:
      'In an uneven field, low spots drown in standing water while high spots stay dry and weedy. Laser leveling once every 3–4 years cuts irrigation time by 25–30% and gives uniform germination everywhere.',
    hindiExplanation:
      'लेजर लेवलिंग कराने से पूरे खेत में पानी एकसमान और तेजी से फैलता है, जिससे 25-30% पानी और समय की बचत होती है।',
    practicalExample:
      'Laser leveling Plot A1 in May before the Kharif paddy season.',
    whyItMatters:
      'One of the highest-return foundational improvements for surface-irrigated farms.',
    relatedTerms: ['Alternate Wetting and Drying (AWD)', 'Field Capacity', 'Soil Tilth'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Mustard (Sarson)', 'Sugarcane'],
  },
  {
    id: 'dict-45',
    term: 'Knapsack & Battery Sprayer Nozzles',
    hindiTerm: 'स्प्रेयर नोजल के प्रकार (फ्लैट फैन व हॉलो कोन)',
    pronunciation: 'nap-sak sprey-er noz-uhls',
    category: 'Farm Machinery',
    simpleDefinition: 'Specialized spray tips that control droplet size and spray pattern—Flat Fan for soil/weed sprays and Hollow Cone for foliage/insect/disease sprays.',
    hindiDefinition: 'स्प्रे पंप के आगे लगने वाले नोजल: खरपतवारनाशक के लिए फ्लैट फैन (कट नोजल) और कीटनाशक/फफूंदनाशक के लिए हॉलो कोन (गोल फुहार नोजल)।',
    farmerFriendlyExplanation:
      'Using the wrong nozzle wastes half your spray! Always use a Flat Fan (cut) nozzle for herbicides so droplets hit weeds evenly without drifting, and a Hollow Cone nozzle for fine mist coverage on crop leaves.',
    hindiExplanation:
      'खरपतवार की दवा छिड़कते समय हमेशा फ्लैट फैन (कट) नोजल और पत्तियों पर कीट/रोग की दवा के लिए गोल कोन नोजल का प्रयोग करना चाहिए।',
    practicalExample:
      'Fitting a Hollow Cone nozzle on a 16L battery sprayer for foliar micronutrient application.',
    whyItMatters:
      'Improves spray efficacy, prevents herbicide drift injury, and saves water and chemical cost.',
    relatedTerms: ['Integrated Pest Management (IPM)', 'Foliar Spray', 'Personal Protective Equipment (PPE)'],
    relevantCrops: ['All Crops'],
  },

  // 46–49: Sustainable Farming
  {
    id: 'dict-46',
    term: 'Crop Rotation',
    hindiTerm: 'फसल चक्र (Fasal Chakra)',
    pronunciation: 'krop roh-tey-shuhn',
    category: 'Sustainable Farming',
    simpleDefinition: 'Growing different types of crops—especially alternating cereals with legumes or oilseeds—in planned sequence on the same plot.',
    hindiDefinition: 'एक ही खेत में लगातार एक जैसी फसल बोने के बजाय अदल-बदल कर (विशेषकर दलहन व तिलहन शामिल करके) फसलें उगाना।',
    farmerFriendlyExplanation:
      'Growing Rice–Wheat year after year mines the same soil layer and builds stubborn weeds like Phalaris minor (Gulli danda). Rotating with Chickpea, Moong, or Mustard breaks pest cycles and adds natural nitrogen.',
    hindiExplanation:
      'फसल चक्र में चना, मूंग या सरसों शामिल करने से मिट्टी की उर्वरा शक्ति लौट आती है और गुल्ली-डंडा जैसे खरपतवार व रोग स्वतः कम हो जाते हैं।',
    practicalExample:
      'Growing short-duration summer Moong between Wheat harvest and Basmati transplanting.',
    whyItMatters:
      'Improves soil structure, fixes atmospheric nitrogen, and lowers pest/weed buildup.',
    relatedTerms: ['Rhizobium Inoculant', 'Green Manuring', 'Soil Organic Carbon (SOC)'],
    relevantCrops: ['Chickpea (Chana)', 'Mustard (Sarson)', 'Wheat', 'Rice (Paddy)', 'Pulses'],
  },
  {
    id: 'dict-47',
    term: 'Vermicompost',
    hindiTerm: 'केंचुआ खाद (Vermicompost)',
    pronunciation: 'vur-mi-kom-post',
    category: 'Sustainable Farming',
    simpleDefinition: 'Nutrient-rich organic humus produced by earthworms (such as Eisenia fetida) digesting farm waste and cattle dung.',
    hindiDefinition: 'केंचुओं द्वारा गोबर और कृषि अपशिष्ट को पचाकर बनाई गई दानेदार, पोषक तत्वों से भरपूर जैविक खाद।',
    farmerFriendlyExplanation:
      'Vermicompost contains 3–5 times more available NPK, beneficial hormones, and microbes than raw farmyard manure, without carrying live weed seeds.',
    hindiExplanation:
      'केंचुआ खाद सामान्य गोबर खाद से अधिक प्रभावशाली होती है और इसमें खरपतवार के बीज नहीं होते। सब्जियों व बागवानी में यह तुरंत असर दिखाती है।',
    practicalExample:
      'Applying 1.5 tonnes/acre of vermicompost in Tomato Plot A3 prior to bed preparation.',
    whyItMatters:
      'Boosts soil water-holding capacity, root development, and microbial diversity.',
    relatedTerms: ['Soil Organic Carbon (SOC)', 'Trichoderma viride / harzianum', 'Loam Soil'],
    relevantCrops: ['Tomato', 'Vegetables', 'Wheat', 'Pulses', 'Orchards'],
  },
  {
    id: 'dict-48',
    term: 'Mulching',
    hindiTerm: 'पलवार / मल्चिंग (Mulching)',
    pronunciation: 'muhl-ching',
    category: 'Sustainable Farming',
    simpleDefinition: 'Covering the topsoil around crop plants with crop residue (straw/leaves) or agricultural mulch film.',
    hindiDefinition: 'पौधों के आसपास की मिट्टी को पराली, सूखी पत्तियों या प्लास्टिक शीट से ढकने की विधि।',
    farmerFriendlyExplanation:
      'Mulching acts like an umbrella over bare soil: it blocks sunlight from sprouting weeds, stops moisture from evaporating in hot wind, and keeps root temperatures steady.',
    hindiExplanation:
      'मल्चिंग से सिंचाई का पानी लंबे समय तक टिकता है, खरपतवार नहीं उगते और फलों पर मिट्टी नहीं लगती।',
    practicalExample:
      'Using silver-black mulch film on raised drip beds for hybrid tomato cultivation.',
    whyItMatters:
      'Conserves 30–50% soil moisture and suppresses early weed competition.',
    relatedTerms: ['Evapotranspiration (ET)', 'Drip Irrigation', 'Happy Seeder / Super Seeder'],
    relevantCrops: ['Tomato', 'Vegetables', 'Wheat', 'Sugarcane', 'Fruits'],
  },
  {
    id: 'dict-49',
    term: 'Rhizobium Inoculant',
    hindiTerm: 'राइजोबियम कल्चर (जीवाणु खाद)',
    pronunciation: 'ry-zoh-bee-uhm in-ok-yuh-luhnt',
    category: 'Sustainable Farming',
    simpleDefinition: 'Beneficial bacteria applied to legume seeds that form root nodules and convert atmospheric nitrogen into plant-usable ammonia.',
    hindiDefinition: 'दलहनी फसलों के बीजों में मिलाया जाने वाला जीवाणु कल्चर जो जड़ों में गांठें बनाकर हवा से नत्रजन (नाइट्रोजन) इकट्ठा करता है।',
    farmerFriendlyExplanation:
      'Pulses like Chickpea, Moong, and Soybean can manufacture their own nitrogen fertilizer for free—if their roots have pink, active Rhizobium nodules! A ₹50 packet of Rhizobium culture jumpstarts this natural factory.',
    hindiExplanation:
      'चना, मूंग, उड़द और सोयाबीन के बीज को राइजोबियम से उपचारित करने पर जड़ों में गुलाबी गांठें बनती हैं जो फसल और मिट्टी दोनों को नाइट्रोजन देती हैं।',
    practicalExample:
      'Inoculating Chickpea JG-11 seeds with crop-specific Mesorhizobium culture before sowing.',
    whyItMatters:
      'Saves nitrogen fertilizer and leaves residual nitrogen in the soil for the next cereal crop.',
    relatedTerms: ['Seed Treatment', 'Crop Rotation', 'Soil Organic Carbon (SOC)'],
    relevantCrops: ['Chickpea (Chana)', 'Soybean', 'Pulses'],
  },

  // 50–52: Digital Farming & Sensors
  {
    id: 'dict-50',
    term: 'Tensiometer',
    hindiTerm: 'टेंशियोमीटर (मिट्टी की नमी मापने का यंत्र)',
    pronunciation: 'ten-see-om-i-ter',
    category: 'Digital Farming & Sensors',
    simpleDefinition: 'A water-filled tube with a porous ceramic tip and vacuum gauge pushed into the root zone to measure how hard roots must pull to absorb soil moisture.',
    hindiDefinition: 'जड़ों की गहराई में मिट्टी के सूखेपन और सिंचाई की वास्तविक आवश्यकता बताने वाला सरल यंत्र।',
    farmerFriendlyExplanation:
      'Instead of guessing by looking at dry surface dust while the soil 15 cm down is still moist, a tensiometer gauge (with green, yellow, and red bands) shows exactly when roots start feeling thirsty.',
    hindiExplanation:
      'जब टेंशियोमीटर की सुई हरे रंग से पीले निशान पर आती है, तभी सिंचाई करने से पानी की बचत होती है और पैदावार पूरी मिलती है।',
    practicalExample:
      'Installing a tensiometer at 20 cm depth in Plot A1 to schedule paddy and wheat irrigations scientifically.',
    whyItMatters:
      'Bridges simple field tools with precision irrigation scheduling.',
    relatedTerms: ['Field Capacity', 'Alternate Wetting and Drying (AWD)', 'Farm Digital Twin'],
    relevantCrops: ['Rice (Paddy)', 'Wheat', 'Tomato', 'Sugarcane'],
  },
  {
    id: 'dict-51',
    term: 'Farm Digital Twin',
    hindiTerm: 'फार्म डिजिटल ट्विन (खेत का डिजिटल प्रतिरूप)',
    pronunciation: 'farm dij-i-tuhl twin',
    category: 'Digital Farming & Sensors',
    simpleDefinition: 'A structured digital record of a real farm—combining plot boundaries, crop stages, soil tests, weather forecasts, and field observations in one living workspace.',
    hindiDefinition: 'खेत के प्लॉट, बोई गई फसल, मिट्टी की जांच, मौसम और दैनिक निरीक्षणों का कंप्यूटर/मोबाइल पर व्यवस्थित लाइव रिकॉर्ड।',
    farmerFriendlyExplanation:
      'Just as keeping a ledger tracks farm finances, a Farm Digital Twin (like AGRIPULSE) remembers every plot’s sowing date, moisture reading, symptom note, and upcoming irrigation so you can anticipate stress early.',
    hindiExplanation:
      'यह आपके खेत की डिजिटल डायरी और सलाहकार की तरह काम करता है, जिसमें हर प्लॉट की फसल, सिंचाई और मौसम का हिसाब एक जगह सुरक्षित रहता है।',
    practicalExample:
      'Viewing Plot A1, A2, and A3 crop stages alongside Karnal 7-day weather warnings on the AGRIPULSE dashboard.',
    whyItMatters:
      'Turns scattered field observations into timely, preventive farming decisions.',
    relatedTerms: ['Tensiometer', 'Soil Health Card', 'Economic Threshold Level (ETL)'],
    relevantCrops: ['All Crops'],
  },
  {
    id: 'dict-52',
    term: 'Soil Health Card (SHC)',
    hindiTerm: 'मृदा स्वास्थ्य कार्ड (Soil Health Card)',
    pronunciation: 'soil helth kard',
    category: 'Digital Farming & Sensors',
    simpleDefinition: 'A laboratory report issued after testing a composite farm soil sample for 12 key parameters (pH, EC, OC, N, P, K, S, Zn, Fe, Cu, Mn, B).',
    hindiDefinition: 'मिट्टी के नमूने की प्रयोगशाला जांच के बाद मिलने वाला रिपोर्ट कार्ड जिसमें 12 मुख्य पोषक तत्वों की स्थिति और फसल अनुसार खाद की सिफारिश लिखी होती है।',
    farmerFriendlyExplanation:
      'Taking a zig-zag soil sample from 15 cm depth after harvest and getting a Soil Health Card tells you exactly which nutrients your plot lacks—stopping blind fertilizer spending.',
    hindiExplanation:
      'फसल कटने के बाद खेत के 8-10 स्थानों से V-आकार का 6 इंच गहरा गड्ढा खोदकर मिट्टी का नमूना जांच कराने से सही खाद की मात्रा पता चलती है।',
    practicalExample:
      'Using Soil Health Card pH (7.1) and Zinc status to plan basal fertilization for Green Horizon Progressive Farm.',
    whyItMatters:
      'Reduces input costs by 10–15% while correcting hidden micronutrient deficiencies.',
    relatedTerms: ['Soil pH', 'Soil Organic Carbon (SOC)', 'Micronutrients'],
    relevantCrops: ['All Crops'],
  },
];
