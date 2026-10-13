import React from 'react';
import {
  Sprout,
  FlaskConical,
  ShieldAlert,
  Leaf,
  Gauge,
  Droplets,
  Wrench,
  Hammer,
  HardHat,
  PackageCheck,
} from 'lucide-react';
import { ProductCategory } from '../types';

interface ProductIllustrationProps {
  svgType: string;
  category: ProductCategory;
  name: string;
  className?: string;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  svgType,
  category,
  name,
  className = 'h-44',
}) => {
  const getVisualConfig = () => {
    switch (category) {
      case 'Seeds and planting material':
        return {
          bg: 'bg-gradient-to-br from-forest-50 to-leaf-100 border-leaf-200',
          badgeBg: 'bg-forest-800 text-white',
          iconColor: 'text-forest-700',
          accent: 'text-harvest-600',
          Icon: Sprout,
          tag: svgType.includes('wheat')
            ? 'CERTIFIED SEED LOT'
            : svgType.includes('paddy')
            ? 'GRADED PADDY SEED'
            : svgType.includes('vegetable')
            ? 'F1 HYBRID POUCH'
            : 'OILSEED PACK',
        };
      case 'Fertilizers and soil nutrients':
        return {
          bg: 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200',
          badgeBg: 'bg-emerald-800 text-white',
          iconColor: 'text-emerald-700',
          accent: 'text-forest-600',
          Icon: FlaskConical,
          tag: 'CROP NUTRITION',
        };
      case 'Crop protection products':
        return {
          bg: 'bg-gradient-to-br from-amber-50 to-harvest-100 border-harvest-200',
          badgeBg: 'bg-harvest-800 text-white',
          iconColor: 'text-harvest-700',
          accent: 'text-earth-700',
          Icon: ShieldAlert,
          tag: 'IPM & BIO-PROTECTION',
        };
      case 'Organic farming inputs':
        return {
          bg: 'bg-gradient-to-br from-earth-50 to-leaf-100 border-earth-200',
          badgeBg: 'bg-earth-800 text-white',
          iconColor: 'text-earth-700',
          accent: 'text-leaf-700',
          Icon: Leaf,
          tag: 'ORGANIC BIO-INPUT',
        };
      case 'Soil testing and farm-monitoring kits':
        return {
          bg: 'bg-gradient-to-br from-slate-50 to-forest-100 border-forest-200',
          badgeBg: 'bg-slate-800 text-white',
          iconColor: 'text-forest-700',
          accent: 'text-sky-700',
          Icon: Gauge,
          tag: 'FIELD DIAGNOSTIC KIT',
        };
      case 'Irrigation equipment':
        return {
          bg: 'bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200',
          badgeBg: 'bg-sky-800 text-white',
          iconColor: 'text-sky-700',
          accent: 'text-forest-700',
          Icon: Droplets,
          tag: 'MICRO-IRRIGATION',
        };
      case 'Sprayers and farm tools':
        return {
          bg: 'bg-gradient-to-br from-stone-100 to-amber-100 border-stone-200',
          badgeBg: 'bg-stone-800 text-white',
          iconColor: 'text-stone-700',
          accent: 'text-harvest-700',
          Icon: Wrench,
          tag: 'FARM EQUIPMENT',
        };
      case 'Hand tools and accessories':
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-earth-100 border-earth-200',
          badgeBg: 'bg-earth-800 text-white',
          iconColor: 'text-earth-700',
          accent: 'text-stone-700',
          Icon: Hammer,
          tag: 'FIELD HAND TOOL',
        };
      case 'Farm safety equipment':
        return {
          bg: 'bg-gradient-to-br from-yellow-50 to-amber-100 border-amber-200',
          badgeBg: 'bg-amber-900 text-white',
          iconColor: 'text-amber-700',
          accent: 'text-forest-800',
          Icon: HardHat,
          tag: 'APPLICATOR SAFETY PPE',
        };
      case 'Harvesting and storage supplies':
      default:
        return {
          bg: 'bg-gradient-to-br from-harvest-50 to-earth-100 border-harvest-200',
          badgeBg: 'bg-forest-900 text-white',
          iconColor: 'text-forest-800',
          accent: 'text-earth-700',
          Icon: PackageCheck,
          tag: 'POST-HARVEST & STORAGE',
        };
    }
  };

  const cfg = getVisualConfig();
  const IconComp = cfg.Icon;

  return (
    <div
      className={`relative w-full ${className} rounded-xl border ${cfg.bg} flex flex-col items-center justify-center p-4 overflow-hidden select-none`}
      role="img"
      aria-label={`Illustration for ${name}`}
    >
      {/* Subtle geometric background rings */}
      <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/40 pointer-events-none" />
      <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-white/30 pointer-events-none" />

      <span
        className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${cfg.badgeBg} mb-2.5 shadow-sm`}
      >
        {cfg.tag}
      </span>

      <div className="w-16 h-16 rounded-2xl bg-white/90 shadow-sm border border-white flex items-center justify-center mb-2">
        <IconComp className={`w-8 h-8 ${cfg.iconColor}`} />
      </div>

      <span className="text-[11px] font-semibold text-slate-700 text-center line-clamp-1 max-w-[90%]">
        {name.split('(')[0].trim()}
      </span>
      <span className="text-[10px] text-slate-500 mt-0.5">Demo Store Product Asset</span>
    </div>
  );
};
