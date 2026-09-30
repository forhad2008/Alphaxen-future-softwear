import React from 'react';
import { AlphaxenFontStudio } from './AlphaxenFontStudio';

interface ProfessionalFontEditorProps {
  onBackToHome: () => void;
}

export const ProfessionalFontEditor: React.FC<ProfessionalFontEditorProps> = ({ onBackToHome }) => {
  return <AlphaxenFontStudio onBackToFoundry={onBackToHome} />;
};
