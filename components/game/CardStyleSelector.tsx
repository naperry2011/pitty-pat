'use client';

import React from 'react';
import { useCardStyle, CardBackStyle } from '@/contexts/CardStyleContext';
import CardBackDesign from './CardBackDesign';
import clsx from 'clsx';

export default function CardStyleSelector() {
  const { cardBackStyle, setCardBackStyle } = useCardStyle();

  const styles: { value: CardBackStyle; name: string; description: string }[] = [
    { value: 'classic', name: 'Classic', description: 'Traditional card design' },
    { value: 'geometric', name: 'Geometric', description: 'Modern angular pattern' },
    { value: 'gradient', name: 'Gradient', description: 'Colorful wave design' },
    { value: 'minimal', name: 'Minimal', description: 'Clean and simple' }
  ];

  return (
    <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
      <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Card Style</h3>
      <div className="grid grid-cols-2 gap-3">
        {styles.map(({ value, name, description }) => (
          <button
            key={value}
            onClick={() => setCardBackStyle(value)}
            className={clsx(
              'relative flex flex-col items-center p-2 rounded-lg transition-all transform hover:scale-105',
              cardBackStyle === value
                ? 'bg-gradient-to-br from-yellow-500/40 to-orange-500/40 ring-2 ring-yellow-400 shadow-lg'
                : 'bg-white/5 hover:bg-white/15 border border-white/10'
            )}
          >
            <CardBackDesign style={value} size="small" className="mb-2" />
            <div className="text-xs text-white font-medium">{name}</div>
            <div className="text-xs text-white/60 mt-0.5">{description}</div>
            {cardBackStyle === value && (
              <div className="absolute top-1 right-1 text-yellow-400">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}