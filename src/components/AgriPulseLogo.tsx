import React, { useState } from 'react';
import { Sprout, Activity } from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';

interface AgriPulseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
}

export const AgriPulseLogo: React.FC<AgriPulseLogoProps> = ({
  size = 'md',
  theme = 'dark',
  showTagline = false,
}) => {
  const { customLogoUrl } = useAgriPulse();
  const [staticLogoFailed, setStaticLogoFailed] = useState(true); // Default to clean text-logo placeholder unless customLogoUrl is uploaded or /logo.png is provided

  const heightClass =
    size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-9';

  const textColor =
    theme === 'light' ? 'text-white' : 'text-forest-900';
  const accentColor =
    theme === 'light' ? 'text-leaf-300' : 'text-leaf-600';
  const subColor =
    theme === 'light' ? 'text-forest-100' : 'text-slate-600';

  if (customLogoUrl) {
    return (
      <div className="inline-flex items-center gap-2.5 select-none">
        <img
          src={customLogoUrl}
          alt="AGRIPULSE Logo"
          className={`${heightClass} w-auto object-contain`}
        />
        {showTagline && (
          <div className="flex flex-col">
            <span className={`font-bold tracking-tight leading-none ${textColor}`}>
              AGRIPULSE
            </span>
            <span className={`text-[11px] font-medium mt-0.5 ${subColor}`}>
              Measure. Understand. Predict. Protect.
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      {!staticLogoFailed && (
        <img
          src="/logo.png"
          alt="AGRIPULSE"
          className={`${heightClass} w-auto object-contain`}
          onError={() => setStaticLogoFailed(true)}
        />
      )}
      <div className="flex items-center gap-2.5">
        <div
          className={`flex items-center justify-center rounded-xl border ${
            theme === 'light'
              ? 'bg-forest-800/90 border-forest-600 text-leaf-300'
              : 'bg-forest-800 border-forest-700 text-leaf-300'
          } ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9'} shadow-sm`}
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center">
            <Sprout className={size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
            <Activity className="w-3 h-3 absolute -bottom-1 -right-1 text-harvest-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-extrabold tracking-tight leading-none ${
                size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-base' : 'text-lg'
              } ${textColor}`}
            >
              AGRI<span className={accentColor}>PULSE</span>
            </span>
          </div>
          {showTagline ? (
            <span className={`text-[11px] font-medium mt-0.5 ${subColor}`}>
              Measure. Understand. Predict. Protect.
            </span>
          ) : (
            <span className={`text-[10px] font-medium tracking-wider uppercase ${subColor}`}>
              Farm Digital Twin
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
