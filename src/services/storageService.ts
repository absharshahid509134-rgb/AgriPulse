import {
  AuthSession,
  CartItem,
  ChatMessage,
  CheckoutAddressDraft,
  CropRecord,
  DemoOrder,
  DiseaseReport,
  Farm,
  FarmActivity,
  FarmerProfile,
  FarmPlot,
  FieldObservation,
  RainfallLog,
  StoreProduct,
  WeatherSnapshot,
} from '../types';
import {
  DEMO_FARMER_PROFILE,
  SEED_ACTIVITIES,
  SEED_CROPS,
  SEED_DISEASE_REPORTS,
  SEED_FARMS,
  SEED_OBSERVATIONS,
  SEED_PLOTS,
  SEED_RAINFALL_LOGS,
  SEED_WEATHER_SNAPSHOT,
} from '../data/seedFarmData';
import { SEED_STORE_PRODUCTS } from '../data/seedProducts';
import { SEED_DEMO_ORDERS } from '../data/seedNewsAndSchemes';

export const STORAGE_KEYS = {
  SESSION: 'AgriPulse:v1:session',
  PROFILE: 'AgriPulse:v1:profile',
  FARMS: 'AgriPulse:v1:farms',
  PLOTS: 'AgriPulse:v1:plots',
  CROPS: 'AgriPulse:v1:crops',
  OBSERVATIONS: 'AgriPulse:v1:observations',
  ACTIVITIES: 'AgriPulse:v1:activities',
  WEATHER: 'AgriPulse:v1:weather',
  RAINFALL_LOGS: 'AgriPulse:v1:rainfallLogs',
  DISEASE_REPORTS: 'AgriPulse:v1:diseaseReports',
  DICT_BOOKMARKS: 'AgriPulse:v1:dictionaryBookmarks',
  DICT_RECENT: 'AgriPulse:v1:dictionaryRecent',
  PRODUCTS: 'AgriPulse:v1:products',
  CART: 'AgriPulse:v1:cart',
  WISHLIST: 'AgriPulse:v1:wishlist',
  RECENT_PRODUCTS: 'AgriPulse:v1:recentProducts',
  CHECKOUT_DRAFT: 'AgriPulse:v1:checkoutDraft',
  ORDERS: 'AgriPulse:v1:orders',
  NEWS_BOOKMARKS: 'AgriPulse:v1:newsBookmarks',
  CHAT_HISTORY: 'AgriPulse:v1:chatHistory',
  CUSTOM_LOGO: 'AgriPulse:v1:customLogo',
  RECOVERY_NOTICE: 'AgriPulse:v1:recoveryNotice',
} as const;

export function safeReadStorage<T>(
  key: string,
  fallbackValue: T,
  validator?: (val: unknown) => val is T
): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      window.localStorage.setItem(key, JSON.stringify(fallbackValue));
      return fallbackValue;
    }
    const parsed: unknown = JSON.parse(raw);
    if (validator && !validator(parsed)) {
      window.localStorage.setItem(key, JSON.stringify(fallbackValue));
      window.localStorage.setItem(
        STORAGE_KEYS.RECOVERY_NOTICE,
        `Recovered malformed record in ${key} using default demo data.`
      );
      return fallbackValue;
    }
    return parsed as T;
  } catch {
    try {
      window.localStorage.setItem(key, JSON.stringify(fallbackValue));
      window.localStorage.setItem(
        STORAGE_KEYS.RECOVERY_NOTICE,
        `Recovered corrupted browser storage for ${key}.`
      );
    } catch {
      // Ignore quota errors
    }
    return fallbackValue;
  }
}

export function safeWriteStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Unable to write ${key} to localStorage`, err);
  }
}

const isArray = <T>(val: unknown): val is T[] => Array.isArray(val);
const isObject = <T extends object>(val: unknown): val is T =>
  typeof val === 'object' && val !== null && !Array.isArray(val);

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome-01',
    sender: 'assistant',
    text: 'Namaste! I am AGRIPULSE AI (running in Demo Rule-Based Guidance mode). I have access to your saved farms in Karnal & Kurukshetra, your 5 active crop records, field observations, 7-day weather forecast, 52-term agricultural dictionary, store catalog, and government schemes. How can I help you today?',
    timestamp: '2026-10-13T06:00:00.000Z',
    modeLabel: 'Demo Rule-Based Guidance',
    suggestedLinks: [
      { label: 'View Farm Plots', route: '/farm' },
      { label: 'Check Weather Forecast', route: '/weather' },
      { label: 'Inspect Crop Symptoms', route: '/disease' },
    ],
  },
];

export const INITIAL_CHECKOUT_DRAFT: CheckoutAddressDraft = {
  customerName: DEMO_FARMER_PROFILE.name,
  mobileNumber: '9812456780',
  deliveryAddress: 'Green Horizon Progressive Farm, Near Canal Rest House, Taraori Road',
  village: DEMO_FARMER_PROFILE.village,
  district: DEMO_FARMER_PROFILE.district,
  state: DEMO_FARMER_PROFILE.state,
  pinCode: '132116',
  deliveryInstructions: 'Demo delivery — Call before reaching farm gate.',
  promoCode: '',
};

export function loadInitialDataSnapshot() {
  const profile = safeReadStorage<FarmerProfile>(
    STORAGE_KEYS.PROFILE,
    DEMO_FARMER_PROFILE,
    (v): v is FarmerProfile => isObject<FarmerProfile>(v) && typeof (v as FarmerProfile).name === 'string'
  );
  const farms = safeReadStorage<Farm[]>(STORAGE_KEYS.FARMS, SEED_FARMS, isArray);
  const plots = safeReadStorage<FarmPlot[]>(STORAGE_KEYS.PLOTS, SEED_PLOTS, isArray);
  const crops = safeReadStorage<CropRecord[]>(STORAGE_KEYS.CROPS, SEED_CROPS, isArray);
  const observations = safeReadStorage<FieldObservation[]>(
    STORAGE_KEYS.OBSERVATIONS,
    SEED_OBSERVATIONS,
    isArray
  );
  const activities = safeReadStorage<FarmActivity[]>(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES, isArray);
  const weather = safeReadStorage<WeatherSnapshot>(
    STORAGE_KEYS.WEATHER,
    SEED_WEATHER_SNAPSHOT,
    (v): v is WeatherSnapshot =>
      isObject<WeatherSnapshot>(v) && Array.isArray((v as WeatherSnapshot).daily)
  );
  const rainfallLogs = safeReadStorage<RainfallLog[]>(
    STORAGE_KEYS.RAINFALL_LOGS,
    SEED_RAINFALL_LOGS,
    isArray
  );
  const diseaseReports = safeReadStorage<DiseaseReport[]>(
    STORAGE_KEYS.DISEASE_REPORTS,
    SEED_DISEASE_REPORTS,
    isArray
  );
  const dictBookmarks = safeReadStorage<string[]>(
    STORAGE_KEYS.DICT_BOOKMARKS,
    ['dict-06', 'dict-18', 'dict-30', 'dict-50'],
    isArray
  );
  const dictRecent = safeReadStorage<string[]>(
    STORAGE_KEYS.DICT_RECENT,
    ['dict-51', 'dict-18', 'dict-28'],
    isArray
  );
  const products = safeReadStorage<StoreProduct[]>(
    STORAGE_KEYS.PRODUCTS,
    SEED_STORE_PRODUCTS,
    (v): v is StoreProduct[] => Array.isArray(v) && v.length >= 24
  );
  const cart = safeReadStorage<CartItem[]>(
    STORAGE_KEYS.CART,
    [
      {
        productId: 'prod-201',
        quantity: 1,
        addedAt: '2026-10-12T18:00:00.000Z',
      },
    ],
    isArray
  );
  const wishlist = safeReadStorage<string[]>(
    STORAGE_KEYS.WISHLIST,
    ['prod-101', 'prod-601'],
    isArray
  );
  const recentProducts = safeReadStorage<string[]>(
    STORAGE_KEYS.RECENT_PRODUCTS,
    ['prod-501', 'prod-301', 'prod-201'],
    isArray
  );
  const checkoutDraft = safeReadStorage<CheckoutAddressDraft>(
    STORAGE_KEYS.CHECKOUT_DRAFT,
    INITIAL_CHECKOUT_DRAFT,
    isObject
  );
  const orders = safeReadStorage<DemoOrder[]>(STORAGE_KEYS.ORDERS, SEED_DEMO_ORDERS, isArray);
  const newsBookmarks = safeReadStorage<string[]>(
    STORAGE_KEYS.NEWS_BOOKMARKS,
    ['news-01', 'news-03'],
    isArray
  );
  const chatHistory = safeReadStorage<ChatMessage[]>(
    STORAGE_KEYS.CHAT_HISTORY,
    INITIAL_CHAT_MESSAGES,
    isArray
  );
  const customLogo = safeReadStorage<string | null>(STORAGE_KEYS.CUSTOM_LOGO, null);

  return {
    profile,
    farms,
    plots,
    crops,
    observations,
    activities,
    weather,
    rainfallLogs,
    diseaseReports,
    dictBookmarks,
    dictRecent,
    products,
    cart,
    wishlist,
    recentProducts,
    checkoutDraft,
    orders,
    newsBookmarks,
    chatHistory,
    customLogo,
  };
}

export function readAuthSession(): AuthSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (
      parsed &&
      parsed.version === 'v1' &&
      typeof parsed.email === 'string' &&
      parsed.email.length > 0
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession | null): void {
  try {
    if (!session) {
      window.localStorage.removeItem(STORAGE_KEYS.SESSION);
    } else {
      window.localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    }
  } catch (err) {
    console.warn('Unable to update auth session in localStorage', err);
  }
}

export function resetAllDemoDataToSeed(): void {
  safeWriteStorage(STORAGE_KEYS.PROFILE, DEMO_FARMER_PROFILE);
  safeWriteStorage(STORAGE_KEYS.FARMS, SEED_FARMS);
  safeWriteStorage(STORAGE_KEYS.PLOTS, SEED_PLOTS);
  safeWriteStorage(STORAGE_KEYS.CROPS, SEED_CROPS);
  safeWriteStorage(STORAGE_KEYS.OBSERVATIONS, SEED_OBSERVATIONS);
  safeWriteStorage(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES);
  safeWriteStorage(STORAGE_KEYS.WEATHER, SEED_WEATHER_SNAPSHOT);
  safeWriteStorage(STORAGE_KEYS.RAINFALL_LOGS, SEED_RAINFALL_LOGS);
  safeWriteStorage(STORAGE_KEYS.DISEASE_REPORTS, SEED_DISEASE_REPORTS);
  safeWriteStorage(STORAGE_KEYS.DICT_BOOKMARKS, ['dict-06', 'dict-18', 'dict-30', 'dict-50']);
  safeWriteStorage(STORAGE_KEYS.DICT_RECENT, ['dict-51', 'dict-18', 'dict-28']);
  safeWriteStorage(STORAGE_KEYS.PRODUCTS, SEED_STORE_PRODUCTS);
  safeWriteStorage(STORAGE_KEYS.CART, [
    {
      productId: 'prod-201',
      quantity: 1,
      addedAt: '2026-10-12T18:00:00.000Z',
    },
  ]);
  safeWriteStorage(STORAGE_KEYS.WISHLIST, ['prod-101', 'prod-601']);
  safeWriteStorage(STORAGE_KEYS.RECENT_PRODUCTS, ['prod-501', 'prod-301', 'prod-201']);
  safeWriteStorage(STORAGE_KEYS.CHECKOUT_DRAFT, INITIAL_CHECKOUT_DRAFT);
  safeWriteStorage(STORAGE_KEYS.ORDERS, SEED_DEMO_ORDERS);
  safeWriteStorage(STORAGE_KEYS.NEWS_BOOKMARKS, ['news-01', 'news-03']);
  safeWriteStorage(STORAGE_KEYS.CHAT_HISTORY, INITIAL_CHAT_MESSAGES);
}
