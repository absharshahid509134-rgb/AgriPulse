import React from 'react';
import { AgriSenseLogo } from './AgriSenseLogo';

interface AgriPulseLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

export const AgriPulseLogo: React.FC<AgriPulseLogoProps> = (props) => {
  return <AgriSenseLogo {...props} />;
};
