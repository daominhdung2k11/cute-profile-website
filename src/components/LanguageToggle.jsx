import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="rounded-full gap-2 border-2 border-[var(--theme-primary)] bg-white hover:bg-[var(--theme-light)] transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold">{language === 'en' ? 'EN' : 'VI'}</span>
    </Button>
  );
};

export default LanguageToggle;