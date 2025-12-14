'use client';

import React from 'react';
import { CardBackStyle } from '@/contexts/CardStyleContext';
import clsx from 'clsx';

interface CardBackDesignProps {
  style: CardBackStyle;
  size: 'small' | 'medium' | 'large';
  className?: string;
}

export default function CardBackDesign({ style, size, className = '' }: CardBackDesignProps) {
  const sizeClasses = {
    small: 'w-14 h-20',
    medium: 'w-20 h-28',
    large: 'w-24 h-36'
  };

  const renderDesign = () => {
    switch (style) {
      case 'classic':
        // Classic playing card back with intricate pattern
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-900 rounded-lg overflow-hidden">
            <div className="absolute inset-2 border-2 border-yellow-400 rounded">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 opacity-40">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                </div>
              </div>
              <div className="absolute top-2 left-2 text-yellow-400 font-bold text-xs">♠</div>
              <div className="absolute top-2 right-2 text-yellow-400 font-bold text-xs">♥</div>
              <div className="absolute bottom-2 left-2 text-yellow-400 font-bold text-xs">♦</div>
              <div className="absolute bottom-2 right-2 text-yellow-400 font-bold text-xs">♣</div>
            </div>
          </div>
        );

      case 'geometric':
        // Modern geometric pattern
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-4 border-white rotate-45" />
              <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-white rotate-12" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-8 h-8 bg-white/30 rotate-45" />
                <div className="absolute inset-2 w-4 h-4 bg-white/40 rotate-45" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-white/60 text-xs font-mono">PP</div>
          </div>
        );

      case 'gradient':
        // Colorful gradient waves
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
                <path d="M0,30 Q25,10 50,30 T100,30 L100,100 L0,100 Z" fill="white" opacity="0.5" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-bold text-lg opacity-60 tracking-wider">PP</div>
            </div>
          </div>
        );

      case 'minimal':
        // Clean minimalist design
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-3 border border-gray-600 rounded">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-8 bg-gray-600" />
                  <div className="w-8 h-1 bg-gray-600 -mt-4" />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 border border-gray-600 rounded-full" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={clsx(
      'relative rounded-lg shadow-lg border-2 border-gray-800',
      sizeClasses[size],
      className
    )}>
      {renderDesign()}
    </div>
  );
}