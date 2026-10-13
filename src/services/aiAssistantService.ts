import {
  ChatMessage,
  CropRecord,
  DictionaryEntry,
  Farm,
  FarmActivity,
  FarmerProfile,
  FieldObservation,
  GovernmentScheme,
  StoreProduct,
  WeatherSnapshot,
} from '../types';
import { formatPaiseToINR } from '../utils/formatters';

export interface AssistantContext {
  profile: FarmerProfile;
  activeFarm?: Farm;
  farms: Farm[];
  crops: CropRecord[];
  observations: FieldObservation[];
  activities: FarmActivity[];
  weather: WeatherSnapshot;
  dictionary: DictionaryEntry[];
  products: StoreProduct[];
  schemes: GovernmentScheme[];
  recentMessages: ChatMessage[];
}

export async function generateAssistantReply(
  userQuery: string,
  ctx: AssistantContext
): Promise<Omit<ChatMessage, 'id' | 'timestamp'>> {
  await new Promise((resolve) => setTimeout(resolve, 420));

  const q = userQuery.trim().toLowerCase();
  const activeFarm = ctx.activeFarm || ctx.farms.find((f) => !f.isArchived) || ctx.farms[0];
  const farmCrops = activeFarm
    ? ctx.crops.filter((c) => c.farmId === activeFarm.id)
    : ctx.crops;
  const pendingActivities = ctx.activities.filter((a) => a.status === 'Pending');
  const latestObs = activeFarm
    ? ctx.observations.filter((o) => o.farmId === activeFarm.id)
    : ctx.observations;

  // 1. Farm check / "what should I check on my farm today?"
  if (
    q.includes('check on my farm') ||
    q.includes('my farm') ||
    q.includes('farm today') ||
    q.includes('status') ||
    q.includes('activity')
  ) {
    if (!activeFarm) {
      return {
        sender: 'assistant',
        modeLabel: 'Demo Rule-Based Guidance',
        text: 'You currently have no active farms saved in your AgriPulse records. Click "Go to Farm Management" below to register your first farm and plots so I can summarize your crops and field tasks.',
        suggestedLinks: [{ label: 'Go to Farm Management', route: '/farm' }],
      };
    }

    const cropSummary =
      farmCrops.length > 0
        ? farmCrops
            .map((c) => `${c.cropName} (${c.variety}) in ${c.plotName} [${c.growthStage} — ${c.healthStatus}]`)
            .join('; ')
        : 'No crop records registered on this farm yet';

    const latestMoistureObs = latestObs.find((o) => typeof o.soilMoisturePct === 'number');
    const moistureNote = latestMoistureObs
      ? `Last recorded soil moisture (${latestMoistureObs.sourceLabel}) was ${latestMoistureObs.soilMoisturePct}% in ${latestMoistureObs.plotName || 'your plot'}. (No live physical sensor is currently connected.)`
      : 'No soil moisture observation is saved yet for this farm.';

    const topTasks =
      pendingActivities.length > 0
        ? pendingActivities
            .slice(0, 3)
            .map((a) => `• ${a.title} (${a.scheduledDate}, Priority: ${a.priority})`)
            .join('\n')
        : '• No pending activities scheduled in your calendar.';

    return {
      sender: 'assistant',
      modeLabel: 'Demo Rule-Based Guidance',
      text: `[Demo Guidance from Your Saved Records]\nActive Farm: ${activeFarm.name} (${activeFarm.totalArea} ${activeFarm.areaUnit}, ${activeFarm.district}, ${activeFarm.state})\n\n1. Active Crops (${farmCrops.length}): ${cropSummary}\n2. Moisture & Field Record: ${moistureNote}\n3. Priority Tasks to Check Today:\n${topTasks}`,
      suggestedLinks: [
        { label: 'Open Farm Workspace', route: '/farm' },
        { label: 'View Dashboard Calendar', route: '/home' },
        { label: 'Log Symptom Check', route: '/disease' },
      ],
    };
  }

  // 2. Weather explanation / "explain today's weather for my crop"
  if (q.includes('weather') || q.includes('rain') || q.includes('temperature') || q.includes('forecast')) {
    const w = ctx.weather;
    const rainyDay = w.daily.find((d) => d.rainProbPct >= 50);
    const cropNames =
      farmCrops.length > 0
        ? farmCrops.map((c) => c.cropName).join(', ')
        : ctx.profile.preferences.defaultCrop || 'your crops';

    return {
      sender: 'assistant',
      modeLabel: 'Demo Rule-Based Guidance',
      text: `[${w.sourceType} for ${w.locationLabel}]\n• Current Condition: ${w.tempC}°C (${w.condition}), Humidity ${w.humidityPct}%, Wind ${w.windSpeedKmh} km/h, Today's Rain Probability ${w.rainProbabilityPct}%.\n• 7-Day Outlook for ${cropNames}: ${
        rainyDay
          ? `Notice that ${rainyDay.dayLabel} (${rainyDay.date}) shows a ${rainyDay.rainProbPct}% chance of rain (~${rainyDay.expectedRainMm} mm) with ${rainyDay.windKmh} km/h winds. Consider completing urgent scouting early, keeping plot drainage bunds open, and avoiding non-essential irrigation right before expected rain.`
          : 'Dry and stable conditions expected over the coming days—favorable for morning irrigation and field scouting.'
      }\n\nNote: This guidance is educational and based on the displayed ${w.sourceType.toLowerCase()}; always cross-check local IMD/KVK advisories.`,
      suggestedLinks: [
        { label: 'Open Weather Intelligence', route: '/weather' },
        { label: 'Manage Farm Irrigation Tasks', route: '/farm' },
      ],
    };
  }

  // 3. Yellow leaves / disease / symptoms
  if (
    q.includes('yellow') ||
    q.includes('leaf') ||
    q.includes('leaves') ||
    q.includes('disease') ||
    q.includes('symptom') ||
    q.includes('pest') ||
    q.includes('curl')
  ) {
    return {
      sender: 'assistant',
      modeLabel: 'Demo Rule-Based Guidance',
      text: `[Educational Symptom Scouting Guide]\nWhen investigating yellow leaves (chlorosis) on your farm, check three clues first:\n1. Which leaves turned yellow first?\n   • Older bottom leaves (uniform pale yellow) → Often Nitrogen scarcity or waterlogged roots.\n   • Older bottom leaves (green veins, yellow between veins) → Often Magnesium deficiency (common in fruiting tomatoes).\n   • Youngest top leaves (interveinal yellowing or rusty spots) → Often Iron or Zinc lockup (such as Khaira in paddy when soil pH > 7.5).\n2. Check under the leaf with a 10x lens: Look for whiteflies, aphids, or mites that cause yellow stippling and leaf curl.\n3. Check root-zone moisture at 15 cm depth: Over-watering suffocates roots and causes yellowing just like drought.\n\nFor a crop-specific checklist, use the Crop Disease & Symptom Analysis workspace and consult your local KVK officer before applying chemical sprays.`,
      suggestedLinks: [
        { label: 'Open Disease & Symptom Analysis', route: '/disease' },
        { label: 'Read "Interveinal Chlorosis" in Dictionary', route: '/dictionary' },
        { label: 'Browse Sticky Traps & Micronutrients', route: '/store' },
      ],
    };
  }

  // 4. Soil pH / Dictionary terms
  if (q.includes('ph') || q.includes('dictionary') || q.includes('explain ') || q.includes('what is')) {
    const matchedDict = ctx.dictionary.find(
      (d) =>
        q.includes(d.term.toLowerCase()) ||
        (q.includes('ph') && d.id === 'dict-06') ||
        (q.includes('cri') && d.id === 'dict-18') ||
        (q.includes('ipm') && d.id === 'dict-30') ||
        (q.includes('tensiometer') && d.id === 'dict-50')
    );

    if (matchedDict) {
      return {
        sender: 'assistant',
        modeLabel: 'Demo Rule-Based Guidance',
        text: `[AgriPulse Dictionary: ${matchedDict.term} / ${matchedDict.hindiTerm || ''}]\n• Simple Definition: ${matchedDict.simpleDefinition}\n• Farmer-Friendly Explanation: ${matchedDict.farmerFriendlyExplanation}\n• Practical Farm Example: ${matchedDict.practicalExample}\n• Why It Matters: ${matchedDict.whyItMatters}`,
        suggestedLinks: [
          { label: 'Explore Agricultural Dictionary (52 Terms)', route: '/dictionary' },
          { label: 'Browse Soil Testing Kits in Store', route: '/store' },
        ],
      };
    }
  }

  // 5. Government schemes
  if (q.includes('scheme') || q.includes('subsidy') || q.includes('pm-kisan') || q.includes('insurance') || q.includes('government')) {
    const state = ctx.profile.state || 'Haryana';
    const matchingSchemes = ctx.schemes.filter(
      (s) => s.applicability === 'National (All India)' || s.applicableStates.includes(state)
    );
    const listText = matchingSchemes
      .slice(0, 4)
      .map((s) => `• ${s.shortCode} (${s.category}): ${s.shortExplanation}`)
      .join('\n');

    return {
      sender: 'assistant',
      modeLabel: 'Demo Rule-Based Guidance',
      text: `[Demo Scheme Discovery for ${state}]\nHere are potentially relevant schemes from our sample directory (${matchingSchemes.length} found):\n${listText}\n\nImportant: AgriPulse provides educational discovery only and does not issue official eligibility approvals. Please use the Eligibility Finder on the Schemes page and verify deadlines on the official ".gov.in" portals.`,
      suggestedLinks: [{ label: 'Open Government Schemes & Eligibility Finder', route: '/schemes' }],
    };
  }

  // 6. Store products / "show me products for my selected crop"
  if (
    q.includes('product') ||
    q.includes('store') ||
    q.includes('buy') ||
    q.includes('seed') ||
    q.includes('fertilizer') ||
    q.includes('selected crop') ||
    q.includes('shop')
  ) {
    const preferredCrop =
      farmCrops[0]?.cropName || ctx.profile.preferences.defaultCrop || 'Wheat';
    const matchingProducts = ctx.products.filter((p) =>
      p.compatibleCrops.some((c) =>
        preferredCrop.toLowerCase().includes(c.toLowerCase()) ||
        c.toLowerCase().includes(preferredCrop.toLowerCase().split(' ')[0])
      )
    );
    const topProducts = (matchingProducts.length > 0 ? matchingProducts : ctx.products).slice(0, 4);
    const prodText = topProducts
      .map((p) => `• ${p.name} (${p.packSize}) — ${formatPaiseToINR(p.pricePaise)} [${p.category}]`)
      .join('\n');

    return {
      sender: 'assistant',
      modeLabel: 'Demo Rule-Based Guidance',
      text: `[Demo Store Recommendations for ${preferredCrop}]\nHere are matching agricultural supplies from the AgriPulse Demo Store:\n${prodText}\n\nYou can filter by crop compatibility, compare specifications, and test the complete demo checkout workflow in the Store.`,
      suggestedLinks: [
        { label: 'Browse Agricultural Store', route: '/store' },
        { label: 'View Shopping Cart', route: '/cart' },
      ],
    };
  }

  // 7. Follow-up or general fallback using context
  return {
    sender: 'assistant',
    modeLabel: 'Demo Rule-Based Guidance',
    text: `[Demo Rule-Based Assistant]\nI received your question: "${userQuery}".\n\nBased on your saved profile (${ctx.profile.name}, ${ctx.profile.district}, ${ctx.profile.state}), you currently have ${ctx.farms.filter((f) => !f.isArchived).length} active farm(s), ${ctx.crops.length} crop record(s), and ${pendingActivities.length} pending farm activity item(s).\n\nTry asking me:\n• "What should I check on my farm today?"\n• "Explain today's weather for my crop."\n• "How do I investigate yellow leaves?"\n• "Explain soil pH in simple language."\n• "Help me find suitable agricultural schemes."\n• "Show me products for my selected crop."`,
    suggestedLinks: [
      { label: 'Dashboard Overview', route: '/home' },
      { label: 'Agricultural Dictionary', route: '/dictionary' },
      { label: 'Agricultural Store', route: '/store' },
    ],
  };
}
