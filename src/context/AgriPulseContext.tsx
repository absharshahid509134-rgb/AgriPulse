import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  AuthSession,
  CartItem,
  ChatMessage,
  CheckoutAddressDraft,
  CropRecord,
  DemoOrder,
  DictionaryEntry,
  DiseaseReport,
  Farm,
  FarmActivity,
  FarmerProfile,
  FarmPlot,
  FieldObservation,
  GovernmentScheme,
  NewsArticle,
  RainfallLog,
  StoreProduct,
  WeatherSnapshot,
} from '../types';
import {
  INITIAL_CHAT_MESSAGES,
  loadInitialDataSnapshot,
  readAuthSession,
  resetAllDemoDataToSeed,
  safeWriteStorage,
  STORAGE_KEYS,
  writeAuthSession,
} from '../services/storageService';
import { SEED_DICTIONARY_ENTRIES } from '../data/seedDictionary';
import { SEED_GOVERNMENT_SCHEMES, SEED_NEWS_ARTICLES } from '../data/seedNewsAndSchemes';
import { VALID_DEMO_PROMO_CODES } from '../data/seedProducts';

export const DEMO_ACCOUNT_EMAIL = 'farmer.demo@AgriPulse.in';
export const DEMO_ACCOUNT_PASSWORD = 'Farm@2026!';

interface CartTotals {
  subtotalPaise: number;
  shippingPaise: number;
  discountPaise: number;
  totalPayablePaise: number;
  appliedPromoDescription?: string;
  itemCount: number;
}

interface AgriPulseContextValue {
  // Auth
  session: AuthSession | null;
  loginWithCredentials: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;

  // Profile & Preferences
  profile: FarmerProfile;
  updateProfile: (updated: FarmerProfile) => void;
  customLogoUrl: string | null;
  setCustomLogoUrl: (dataUrl: string | null) => void;
  resetAllDemoData: () => void;

  // Farms, Plots, Crops, Observations, Activities
  farms: Farm[];
  activeFarmId: string;
  activeFarm: Farm | undefined;
  setActiveFarmId: (farmId: string) => void;
  addFarm: (farm: Omit<Farm, 'id' | 'createdAt' | 'updatedAt'>) => Farm;
  updateFarm: (farm: Farm) => void;
  archiveFarm: (farmId: string, archive: boolean) => void;
  deleteFarm: (farmId: string) => void;

  plots: FarmPlot[];
  addPlot: (plot: Omit<FarmPlot, 'id'>) => FarmPlot;
  deletePlot: (plotId: string) => void;

  crops: CropRecord[];
  addCropRecord: (crop: Omit<CropRecord, 'id' | 'createdAt'>) => CropRecord;
  updateCropRecord: (crop: CropRecord) => void;
  deleteCropRecord: (cropId: string) => void;

  observations: FieldObservation[];
  addObservation: (obs: Omit<FieldObservation, 'id'>) => FieldObservation;
  deleteObservation: (obsId: string) => void;

  activities: FarmActivity[];
  addActivity: (act: Omit<FarmActivity, 'id'>) => FarmActivity;
  updateActivity: (act: FarmActivity) => void;
  toggleActivityComplete: (actId: string) => void;
  deleteActivity: (actId: string) => void;

  // Weather & Rainfall
  weather: WeatherSnapshot;
  setWeather: (w: WeatherSnapshot) => void;
  rainfallLogs: RainfallLog[];
  addRainfallLog: (log: Omit<RainfallLog, 'id'>) => void;
  deleteRainfallLog: (id: string) => void;

  // Disease Reports
  diseaseReports: DiseaseReport[];
  addDiseaseReport: (
    report: Omit<DiseaseReport, 'id' | 'createdAt' | 'updatedAt'>
  ) => DiseaseReport;
  updateDiseaseReportStatus: (
    reportId: string,
    status: DiseaseReport['status'],
    expertNotes?: string
  ) => void;

  // Dictionary
  dictionary: DictionaryEntry[];
  dictBookmarks: string[];
  toggleDictBookmark: (termId: string) => void;
  dictRecent: string[];
  recordDictView: (termId: string) => void;

  // Store, Cart, Wishlist, Orders
  products: StoreProduct[];
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => { ok: boolean; message: string };
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  calculateCartTotals: (promoCode?: string) => CartTotals;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  recentProducts: string[];
  recordProductView: (productId: string) => void;

  checkoutDraft: CheckoutAddressDraft;
  updateCheckoutDraft: (draft: Partial<CheckoutAddressDraft>) => void;

  orders: DemoOrder[];
  placeDemoOrder: (
    paymentMode: DemoOrder['paymentMode'],
    promoCode?: string
  ) => { ok: boolean; order?: DemoOrder; error?: string };
  cancelDemoOrder: (orderId: string) => void;

  // News & Schemes
  newsArticles: NewsArticle[];
  newsBookmarks: string[];
  toggleNewsBookmark: (articleId: string) => void;
  schemes: GovernmentScheme[];

  // AI Chatbox
  chatHistory: ChatMessage[];
  appendChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatHistory: () => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  pendingChatPrompt: string | null;
  openChatWithPrompt: (prompt?: string) => void;
  clearPendingChatPrompt: () => void;
}

const AgriPulseContext = createContext<AgriPulseContextValue | undefined>(undefined);

export const AgriPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialSnapshot = useMemo(() => loadInitialDataSnapshot(), []);

  const [session, setSession] = useState<AuthSession | null>(() => readAuthSession());
  const [profile, setProfile] = useState<FarmerProfile>(initialSnapshot.profile);
  const [farms, setFarms] = useState<Farm[]>(initialSnapshot.farms);
  const [plots, setPlots] = useState<FarmPlot[]>(initialSnapshot.plots);
  const [crops, setCrops] = useState<CropRecord[]>(initialSnapshot.crops);
  const [observations, setObservations] = useState<FieldObservation[]>(
    initialSnapshot.observations
  );
  const [activities, setActivities] = useState<FarmActivity[]>(initialSnapshot.activities);
  const [weather, setWeatherState] = useState<WeatherSnapshot>(initialSnapshot.weather);
  const [rainfallLogs, setRainfallLogs] = useState<RainfallLog[]>(initialSnapshot.rainfallLogs);
  const [diseaseReports, setDiseaseReports] = useState<DiseaseReport[]>(
    initialSnapshot.diseaseReports
  );
  const [dictBookmarks, setDictBookmarks] = useState<string[]>(initialSnapshot.dictBookmarks);
  const [dictRecent, setDictRecent] = useState<string[]>(initialSnapshot.dictRecent);
  const [products, setProducts] = useState<StoreProduct[]>(initialSnapshot.products);
  const [cart, setCart] = useState<CartItem[]>(initialSnapshot.cart);
  const [wishlist, setWishlist] = useState<string[]>(initialSnapshot.wishlist);
  const [recentProducts, setRecentProducts] = useState<string[]>(initialSnapshot.recentProducts);
  const [checkoutDraft, setCheckoutDraft] = useState<CheckoutAddressDraft>(
    initialSnapshot.checkoutDraft
  );
  const [orders, setOrders] = useState<DemoOrder[]>(initialSnapshot.orders);
  const [newsBookmarks, setNewsBookmarks] = useState<string[]>(initialSnapshot.newsBookmarks);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialSnapshot.chatHistory);
  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(
    initialSnapshot.customLogo
  );

  const [activeFarmId, setActiveFarmIdState] = useState<string>(() => {
    const defId = initialSnapshot.profile.preferences.defaultFarmId;
    const exists = initialSnapshot.farms.some((f) => f.id === defId && !f.isArchived);
    if (exists) return defId;
    return initialSnapshot.farms.find((f) => !f.isArchived)?.id || initialSnapshot.farms[0]?.id || '';
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [pendingChatPrompt, setPendingChatPrompt] = useState<string | null>(null);

  // Sync activeFarmId if farms list changes
  useEffect(() => {
    const activeExists = farms.some((f) => f.id === activeFarmId && !f.isArchived);
    if (!activeExists) {
      const next = farms.find((f) => !f.isArchived) || farms[0];
      setActiveFarmIdState(next ? next.id : '');
    }
  }, [farms, activeFarmId]);

  const activeFarm = useMemo(
    () => farms.find((f) => f.id === activeFarmId) || farms.find((f) => !f.isArchived),
    [farms, activeFarmId]
  );

  // Auth handlers
  const loginWithCredentials = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 380));

    const trimmedEmail = email.trim();
    const isDemoMatch =
      trimmedEmail.toLowerCase() === DEMO_ACCOUNT_EMAIL.toLowerCase() &&
      password === DEMO_ACCOUNT_PASSWORD;

    if (!isDemoMatch) {
      return {
        ok: false,
        error:
          'Invalid email or password. For the demonstration farmer account, please use farmer.demo@AgriPulse.in and Farm@2026! (or click "Use Demo Account").',
      };
    }

    const newSession: AuthSession = {
      version: 'v1',
      userId: profile.id,
      email: DEMO_ACCOUNT_EMAIL,
      farmerName: profile.name,
      isDemo: true,
      rememberMe,
      loggedInAt: new Date().toISOString(),
    };

    writeAuthSession(newSession);
    setSession(newSession);
    return { ok: true };
  };

  const logout = () => {
    writeAuthSession(null);
    setSession(null);
    setIsChatOpen(false);
  };

  // Profile & Logo
  const updateProfile = (updated: FarmerProfile) => {
    setProfile(updated);
    safeWriteStorage(STORAGE_KEYS.PROFILE, updated);
    if (session) {
      const nextSession: AuthSession = {
        ...session,
        farmerName: updated.name,
      };
      setSession(nextSession);
      writeAuthSession(nextSession);
    }
  };

  const setCustomLogoUrl = (dataUrl: string | null) => {
    setCustomLogoUrlState(dataUrl);
    safeWriteStorage(STORAGE_KEYS.CUSTOM_LOGO, dataUrl);
  };

  const resetAllDemoData = () => {
    resetAllDemoDataToSeed();
    const fresh = loadInitialDataSnapshot();
    setProfile(fresh.profile);
    setFarms(fresh.farms);
    setPlots(fresh.plots);
    setCrops(fresh.crops);
    setObservations(fresh.observations);
    setActivities(fresh.activities);
    setWeatherState(fresh.weather);
    setRainfallLogs(fresh.rainfallLogs);
    setDiseaseReports(fresh.diseaseReports);
    setDictBookmarks(fresh.dictBookmarks);
    setDictRecent(fresh.dictRecent);
    setProducts(fresh.products);
    setCart(fresh.cart);
    setWishlist(fresh.wishlist);
    setRecentProducts(fresh.recentProducts);
    setCheckoutDraft(fresh.checkoutDraft);
    setOrders(fresh.orders);
    setNewsBookmarks(fresh.newsBookmarks);
    setChatHistory(fresh.chatHistory);
    setActiveFarmIdState(fresh.profile.preferences.defaultFarmId);
  };

  // Farm CRUD
  const setActiveFarmId = (farmId: string) => {
    setActiveFarmIdState(farmId);
  };

  const addFarm = (farmInput: Omit<Farm, 'id' | 'createdAt' | 'updatedAt'>): Farm => {
    const now = new Date().toISOString();
    const newFarm: Farm = {
      ...farmInput,
      id: `farm-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    const next = [newFarm, ...farms];
    setFarms(next);
    safeWriteStorage(STORAGE_KEYS.FARMS, next);
    setActiveFarmIdState(newFarm.id);
    return newFarm;
  };

  const updateFarm = (updatedFarm: Farm) => {
    const next = farms.map((f) =>
      f.id === updatedFarm.id ? { ...updatedFarm, updatedAt: new Date().toISOString() } : f
    );
    setFarms(next);
    safeWriteStorage(STORAGE_KEYS.FARMS, next);
  };

  const archiveFarm = (farmId: string, archive: boolean) => {
    const next = farms.map((f) =>
      f.id === farmId ? { ...f, isArchived: archive, updatedAt: new Date().toISOString() } : f
    );
    setFarms(next);
    safeWriteStorage(STORAGE_KEYS.FARMS, next);
  };

  const deleteFarm = (farmId: string) => {
    const nextFarms = farms.filter((f) => f.id !== farmId);
    const nextPlots = plots.filter((p) => p.farmId !== farmId);
    const nextCrops = crops.filter((c) => c.farmId !== farmId);
    const nextObs = observations.filter((o) => o.farmId !== farmId);
    const nextActs = activities.filter((a) => a.farmId !== farmId);

    setFarms(nextFarms);
    setPlots(nextPlots);
    setCrops(nextCrops);
    setObservations(nextObs);
    setActivities(nextActs);

    safeWriteStorage(STORAGE_KEYS.FARMS, nextFarms);
    safeWriteStorage(STORAGE_KEYS.PLOTS, nextPlots);
    safeWriteStorage(STORAGE_KEYS.CROPS, nextCrops);
    safeWriteStorage(STORAGE_KEYS.OBSERVATIONS, nextObs);
    safeWriteStorage(STORAGE_KEYS.ACTIVITIES, nextActs);
  };

  // Plot CRUD
  const addPlot = (plotInput: Omit<FarmPlot, 'id'>): FarmPlot => {
    const newPlot: FarmPlot = {
      ...plotInput,
      id: `plot-${Date.now()}`,
    };
    const next = [...plots, newPlot];
    setPlots(next);
    safeWriteStorage(STORAGE_KEYS.PLOTS, next);
    return newPlot;
  };

  const deletePlot = (plotId: string) => {
    const next = plots.filter((p) => p.id !== plotId);
    setPlots(next);
    safeWriteStorage(STORAGE_KEYS.PLOTS, next);
  };

  // Crop CRUD
  const addCropRecord = (cropInput: Omit<CropRecord, 'id' | 'createdAt'>): CropRecord => {
    const newCrop: CropRecord = {
      ...cropInput,
      id: `crop-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [newCrop, ...crops];
    setCrops(next);
    safeWriteStorage(STORAGE_KEYS.CROPS, next);
    return newCrop;
  };

  const updateCropRecord = (updated: CropRecord) => {
    const next = crops.map((c) => (c.id === updated.id ? updated : c));
    setCrops(next);
    safeWriteStorage(STORAGE_KEYS.CROPS, next);
  };

  const deleteCropRecord = (cropId: string) => {
    const next = crops.filter((c) => c.id !== cropId);
    setCrops(next);
    safeWriteStorage(STORAGE_KEYS.CROPS, next);
  };

  // Observation CRUD
  const addObservation = (obsInput: Omit<FieldObservation, 'id'>): FieldObservation => {
    const newObs: FieldObservation = {
      ...obsInput,
      id: `obs-${Date.now()}`,
    };
    const next = [newObs, ...observations];
    setObservations(next);
    safeWriteStorage(STORAGE_KEYS.OBSERVATIONS, next);
    return newObs;
  };

  const deleteObservation = (obsId: string) => {
    const next = observations.filter((o) => o.id !== obsId);
    setObservations(next);
    safeWriteStorage(STORAGE_KEYS.OBSERVATIONS, next);
  };

  // Activity CRUD
  const addActivity = (actInput: Omit<FarmActivity, 'id'>): FarmActivity => {
    const newAct: FarmActivity = {
      ...actInput,
      id: `act-${Date.now()}`,
    };
    const next = [newAct, ...activities];
    setActivities(next);
    safeWriteStorage(STORAGE_KEYS.ACTIVITIES, next);
    return newAct;
  };

  const updateActivity = (updated: FarmActivity) => {
    const next = activities.map((a) => (a.id === updated.id ? updated : a));
    setActivities(next);
    safeWriteStorage(STORAGE_KEYS.ACTIVITIES, next);
  };

  const toggleActivityComplete = (actId: string) => {
    const next = activities.map((a) => {
      if (a.id !== actId) return a;
      const isNowComplete = a.status !== 'Completed';
      return {
        ...a,
        status: isNowComplete ? ('Completed' as const) : ('Pending' as const),
        completedAt: isNowComplete ? new Date().toISOString() : undefined,
      };
    });
    setActivities(next);
    safeWriteStorage(STORAGE_KEYS.ACTIVITIES, next);
  };

  const deleteActivity = (actId: string) => {
    const next = activities.filter((a) => a.id !== actId);
    setActivities(next);
    safeWriteStorage(STORAGE_KEYS.ACTIVITIES, next);
  };

  // Weather & Rainfall
  const setWeather = (w: WeatherSnapshot) => {
    setWeatherState(w);
    safeWriteStorage(STORAGE_KEYS.WEATHER, w);
  };

  const addRainfallLog = (logInput: Omit<RainfallLog, 'id'>) => {
    const newLog: RainfallLog = {
      ...logInput,
      id: `rain-${Date.now()}`,
    };
    const next = [newLog, ...rainfallLogs];
    setRainfallLogs(next);
    safeWriteStorage(STORAGE_KEYS.RAINFALL_LOGS, next);
  };

  const deleteRainfallLog = (id: string) => {
    const next = rainfallLogs.filter((r) => r.id !== id);
    setRainfallLogs(next);
    safeWriteStorage(STORAGE_KEYS.RAINFALL_LOGS, next);
  };

  // Disease reports
  const addDiseaseReport = (
    input: Omit<DiseaseReport, 'id' | 'createdAt' | 'updatedAt'>
  ): DiseaseReport => {
    const now = new Date().toISOString();
    const newReport: DiseaseReport = {
      ...input,
      id: `dis-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    const next = [newReport, ...diseaseReports];
    setDiseaseReports(next);
    safeWriteStorage(STORAGE_KEYS.DISEASE_REPORTS, next);
    return newReport;
  };

  const updateDiseaseReportStatus = (
    reportId: string,
    status: DiseaseReport['status'],
    expertNotes?: string
  ) => {
    const next = diseaseReports.map((r) =>
      r.id === reportId
        ? {
            ...r,
            status,
            expertNotes: expertNotes !== undefined ? expertNotes : r.expertNotes,
            updatedAt: new Date().toISOString(),
          }
        : r
    );
    setDiseaseReports(next);
    safeWriteStorage(STORAGE_KEYS.DISEASE_REPORTS, next);
  };

  // Dictionary
  const toggleDictBookmark = (termId: string) => {
    const next = dictBookmarks.includes(termId)
      ? dictBookmarks.filter((id) => id !== termId)
      : [termId, ...dictBookmarks];
    setDictBookmarks(next);
    safeWriteStorage(STORAGE_KEYS.DICT_BOOKMARKS, next);
  };

  const recordDictView = (termId: string) => {
    const next = [termId, ...dictRecent.filter((id) => id !== termId)].slice(0, 8);
    setDictRecent(next);
    safeWriteStorage(STORAGE_KEYS.DICT_RECENT, next);
  };

  // Store & Cart (all calculations in integer paise!)
  const addToCart = (
    productId: string,
    quantity = 1
  ): { ok: boolean; message: string } => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return { ok: false, message: 'Product not found in catalog.' };
    }
    if (product.availability === 'Out of Stock' || product.stockCount <= 0) {
      return { ok: false, message: `${product.name} is currently out of stock.` };
    }

    const existing = cart.find((item) => item.productId === productId);
    const currentQty = existing ? existing.quantity : 0;
    const targetQty = currentQty + quantity;

    if (targetQty > product.stockCount) {
      return {
        ok: false,
        message: `Maximum available demo stock for ${product.name} is ${product.stockCount} units.`,
      };
    }

    const nextCart: CartItem[] = existing
      ? cart.map((item) =>
          item.productId === productId ? { ...item, quantity: targetQty } : item
        )
      : [
          ...cart,
          {
            productId,
            quantity,
            addedAt: new Date().toISOString(),
          },
        ];

    setCart(nextCart);
    safeWriteStorage(STORAGE_KEYS.CART, nextCart);
    return { ok: true, message: `Added ${product.name} to cart.` };
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    const maxStock = product ? product.stockCount : 99;
    const clampedQty = Math.min(Math.max(1, Math.round(quantity)), maxStock);

    const nextCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: clampedQty } : item
    );
    setCart(nextCart);
    safeWriteStorage(STORAGE_KEYS.CART, nextCart);
  };

  const removeFromCart = (productId: string) => {
    const nextCart = cart.filter((item) => item.productId !== productId);
    setCart(nextCart);
    safeWriteStorage(STORAGE_KEYS.CART, nextCart);
  };

  const clearCart = () => {
    setCart([]);
    safeWriteStorage(STORAGE_KEYS.CART, []);
  };

  const calculateCartTotals = (promoCode?: string): CartTotals => {
    let subtotalPaise = 0;
    let itemCount = 0;

    for (const item of cart) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        const linePaise = Math.round(prod.pricePaise) * Math.round(item.quantity);
        subtotalPaise += linePaise;
        itemCount += Math.round(item.quantity);
      }
    }

    if (subtotalPaise === 0) {
      return {
        subtotalPaise: 0,
        shippingPaise: 0,
        discountPaise: 0,
        totalPayablePaise: 0,
        itemCount: 0,
      };
    }

    // Demo shipping rule: Free shipping on subtotal >= ₹999 (99900 paise); otherwise ₹65 (6500 paise)
    const shippingPaise = subtotalPaise >= 99900 ? 0 : 6500;

    let discountPaise = 0;
    let appliedPromoDescription: string | undefined;

    if (promoCode && promoCode.trim().length > 0) {
      const matchedPromo = VALID_DEMO_PROMO_CODES.find(
        (p) => p.code.toLowerCase() === promoCode.trim().toLowerCase()
      );
      if (matchedPromo && subtotalPaise >= matchedPromo.minSubtotalPaise) {
        const rawDiscount = Math.round((subtotalPaise * matchedPromo.discountPct) / 100);
        discountPaise = Math.min(rawDiscount, matchedPromo.maxDiscountPaise);
        appliedPromoDescription = matchedPromo.description;
      }
    }

    const totalPayablePaise = Math.max(0, subtotalPaise + shippingPaise - discountPaise);

    return {
      subtotalPaise,
      shippingPaise,
      discountPaise,
      totalPayablePaise,
      appliedPromoDescription,
      itemCount,
    };
  };

  const toggleWishlist = (productId: string) => {
    const next = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [productId, ...wishlist];
    setWishlist(next);
    safeWriteStorage(STORAGE_KEYS.WISHLIST, next);
  };

  const recordProductView = (productId: string) => {
    const next = [productId, ...recentProducts.filter((id) => id !== productId)].slice(0, 8);
    setRecentProducts(next);
    safeWriteStorage(STORAGE_KEYS.RECENT_PRODUCTS, next);
  };

  const updateCheckoutDraft = (draft: Partial<CheckoutAddressDraft>) => {
    const next = { ...checkoutDraft, ...draft };
    setCheckoutDraft(next);
    safeWriteStorage(STORAGE_KEYS.CHECKOUT_DRAFT, next);
  };

  const placeDemoOrder = (
    paymentMode: DemoOrder['paymentMode'],
    promoCode?: string
  ): { ok: boolean; order?: DemoOrder; error?: string } => {
    if (cart.length === 0) {
      return { ok: false, error: 'Your shopping cart is empty.' };
    }

    const totals = calculateCartTotals(promoCode);
    const lineItems = cart
      .map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        if (!prod) return null;
        return {
          productId: prod.id,
          productName: prod.name,
          packSize: prod.packSize,
          category: prod.category,
          unitPricePaise: prod.pricePaise,
          quantity: item.quantity,
          lineTotalPaise: Math.round(prod.pricePaise) * Math.round(item.quantity),
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const uniqueSuffix = String(Math.floor(1000 + Math.random() * 9000));
    const newOrder: DemoOrder = {
      id: `ORD-DEMO-2026-${uniqueSuffix}`,
      createdAt: new Date().toISOString(),
      items: lineItems,
      subtotalPaise: totals.subtotalPaise,
      shippingPaise: totals.shippingPaise,
      discountPaise: totals.discountPaise,
      promoCodeApplied: totals.discountPaise > 0 ? promoCode?.trim().toUpperCase() : undefined,
      totalPayablePaise: totals.totalPayablePaise,
      paymentMode,
      demoPaymentStatus:
        paymentMode === 'Cash on Delivery (Demo)'
          ? 'Demo Pending on Delivery'
          : 'Simulated UPI Authorized (No Real Charge)',
      orderStatus: 'Placed',
      isDemoOrder: true,
      deliveryDetails: {
        customerName: checkoutDraft.customerName.trim(),
        mobileNumber: checkoutDraft.mobileNumber.trim(),
        deliveryAddress: checkoutDraft.deliveryAddress.trim(),
        village: checkoutDraft.village.trim(),
        district: checkoutDraft.district.trim(),
        state: checkoutDraft.state.trim(),
        pinCode: checkoutDraft.pinCode.trim(),
        deliveryInstructions: checkoutDraft.deliveryInstructions.trim() || undefined,
      },
    };

    const nextOrders = [newOrder, ...orders];
    setOrders(nextOrders);
    safeWriteStorage(STORAGE_KEYS.ORDERS, nextOrders);

    // Clear cart after successful demo order
    setCart([]);
    safeWriteStorage(STORAGE_KEYS.CART, []);

    return { ok: true, order: newOrder };
  };

  const cancelDemoOrder = (orderId: string) => {
    const next = orders.map((o) =>
      o.id === orderId && (o.orderStatus === 'Placed' || o.orderStatus === 'Processing')
        ? { ...o, orderStatus: 'Cancelled' as const }
        : o
    );
    setOrders(next);
    safeWriteStorage(STORAGE_KEYS.ORDERS, next);
  };

  // News
  const toggleNewsBookmark = (articleId: string) => {
    const next = newsBookmarks.includes(articleId)
      ? newsBookmarks.filter((id) => id !== articleId)
      : [articleId, ...newsBookmarks];
    setNewsBookmarks(next);
    safeWriteStorage(STORAGE_KEYS.NEWS_BOOKMARKS, next);
  };

  // AI Chat
  const appendChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setChatHistory((prev) => {
      const newMsg: ChatMessage = {
        ...msg,
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
      };
      const next = [...prev, newMsg];
      safeWriteStorage(STORAGE_KEYS.CHAT_HISTORY, next);
      return next;
    });
  };

  const clearChatHistory = () => {
    setChatHistory(INITIAL_CHAT_MESSAGES);
    safeWriteStorage(STORAGE_KEYS.CHAT_HISTORY, INITIAL_CHAT_MESSAGES);
  };

  const openChatWithPrompt = (prompt?: string) => {
    setIsChatOpen(true);
    if (prompt) {
      setPendingChatPrompt(prompt);
    }
  };

  const clearPendingChatPrompt = () => {
    setPendingChatPrompt(null);
  };

  const value: AgriPulseContextValue = {
    session,
    loginWithCredentials,
    logout,
    profile,
    updateProfile,
    customLogoUrl,
    setCustomLogoUrl,
    resetAllDemoData,
    farms,
    activeFarmId,
    activeFarm,
    setActiveFarmId,
    addFarm,
    updateFarm,
    archiveFarm,
    deleteFarm,
    plots,
    addPlot,
    deletePlot,
    crops,
    addCropRecord,
    updateCropRecord,
    deleteCropRecord,
    observations,
    addObservation,
    deleteObservation,
    activities,
    addActivity,
    updateActivity,
    toggleActivityComplete,
    deleteActivity,
    weather,
    setWeather,
    rainfallLogs,
    addRainfallLog,
    deleteRainfallLog,
    diseaseReports,
    addDiseaseReport,
    updateDiseaseReportStatus,
    dictionary: SEED_DICTIONARY_ENTRIES,
    dictBookmarks,
    toggleDictBookmark,
    dictRecent,
    recordDictView,
    products,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    calculateCartTotals,
    wishlist,
    toggleWishlist,
    recentProducts,
    recordProductView,
    checkoutDraft,
    updateCheckoutDraft,
    orders,
    placeDemoOrder,
    cancelDemoOrder,
    newsArticles: SEED_NEWS_ARTICLES,
    newsBookmarks,
    toggleNewsBookmark,
    schemes: SEED_GOVERNMENT_SCHEMES,
    chatHistory,
    appendChatMessage,
    clearChatHistory,
    isChatOpen,
    setIsChatOpen,
    pendingChatPrompt,
    openChatWithPrompt,
    clearPendingChatPrompt,
  };

  return <AgriPulseContext.Provider value={value}>{children}</AgriPulseContext.Provider>;
};

export function useAgriPulse(): AgriPulseContextValue {
  const ctx = useContext(AgriPulseContext);
  if (!ctx) {
    throw new Error('useAgriPulse must be used within an AgriPulseProvider');
  }
  return ctx;
}
