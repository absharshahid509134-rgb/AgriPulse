import { AreaUnit } from '../types';

/**
 * Formats integer paise into Indian Rupees (₹) string.
 * Uses integer arithmetic to avoid floating-point rounding errors.
 */
export function formatPaiseToINR(paise: number): string {
  const safePaise = Math.round(Number.isFinite(paise) ? paise : 0);
  const isNegative = safePaise < 0;
  const absPaise = Math.abs(safePaise);
  const rupees = Math.floor(absPaise / 100);
  const remainderPaise = absPaise % 100;

  const formattedRupees = rupees.toLocaleString('en-IN');
  const prefix = isNegative ? '-₹' : '₹';

  if (remainderPaise === 0) {
    return `${prefix}${formattedRupees}`;
  }
  return `${prefix}${formattedRupees}.${String(remainderPaise).padStart(2, '0')}`;
}

export const REGIONAL_BIGHA_FACTORS: {
  id: string;
  label: string;
  bighaToAcre: number;
  description: string;
}[] = [
  {
    id: 'up-west-rj',
    label: 'Western UP / Rajasthan (Pucca Bigha = 0.625 Acre)',
    bighaToAcre: 0.625,
    description: '1 Pucca Bigha ≈ 0.625 Acre (1.6 Bigha per Acre)',
  },
  {
    id: 'mp-guj',
    label: 'Madhya Pradesh / Gujarat (Standard Bigha = 0.40 Acre)',
    bighaToAcre: 0.4,
    description: '1 Bigha ≈ 0.40 Acre (2.5 Bigha per Acre)',
  },
  {
    id: 'pb-hr',
    label: 'Punjab / Haryana (Kachha Bigha = 0.25 Acre)',
    bighaToAcre: 0.25,
    description: '1 Bigha ≈ 0.25 Acre (4 Bigha per Acre)',
  },
  {
    id: 'wb-br-as',
    label: 'West Bengal / Bihar / Assam (1 Bigha = 0.33 Acre)',
    bighaToAcre: 0.3306,
    description: '1 Bigha ≈ 0.33 Acre (3.025 Bigha per Acre)',
  },
  {
    id: 'hp-uk',
    label: 'Himachal Pradesh / Uttarakhand (1 Bigha = 0.20 Acre)',
    bighaToAcre: 0.2,
    description: '1 Bigha ≈ 0.20 Acre (5 Bigha per Acre)',
  },
];

const ACRE_TO_HECTARE = 0.404686;

export function convertArea(
  value: number,
  fromUnit: AreaUnit,
  toUnit: AreaUnit,
  bighaToAcreFactor = 0.4
): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  if (fromUnit === toUnit) return Number(value.toFixed(2));

  const safeBighaFactor = bighaToAcreFactor > 0 ? bighaToAcreFactor : 0.4;

  // Step 1: Convert fromUnit to Acres
  let valueInAcres = value;
  if (fromUnit === 'hectare') {
    valueInAcres = value / ACRE_TO_HECTARE;
  } else if (fromUnit === 'bigha') {
    valueInAcres = value * safeBighaFactor;
  }

  // Step 2: Convert Acres to toUnit
  let result = valueInAcres;
  if (toUnit === 'hectare') {
    result = valueInAcres * ACRE_TO_HECTARE;
  } else if (toUnit === 'bigha') {
    result = valueInAcres / safeBighaFactor;
  }

  return Number(result.toFixed(2));
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
