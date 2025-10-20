import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="rounded-full gap-2 border-2 border-[var(--theme-primary)] bg-white hover:bg-[var(--theme-light)] transition-colors"
    >
      <Palette className="h-4 w-4" />
      <span className="font-semibold capitalize">{theme}</span>
    </Button>
  );
};

export default ThemeToggle;