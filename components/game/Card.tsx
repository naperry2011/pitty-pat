'use client';

import React from 'react';
import { Card as CardType } from '@/types';
import clsx from 'clsx';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

export default function Card({
  card,
  onClick,
  disabled = false,
  size = 'medium',
  className = '',
  style
}: CardProps) {
  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };

  const suitColors = {
    hearts: 'text-red-500',
    diamonds: 'text-red-500',
    clubs: 'text-black',
    spades: 'text-black'
  };

  const sizeClasses = {
    small: 'w-14 h-20 text-lg',
    medium: 'w-20 h-28 text-2xl',
    large: 'w-24 h-36 text-3xl'
  };

  const isClickable = onClick && !disabled;

  if (!card.faceUp) {
    // Card back
    return (
      <div
        className={clsx(
          'rounded-lg bg-gradient-to-br from-blue-800 to-blue-600 border-2 border-blue-900 flex items-center justify-center card-shadow',
          sizeClasses[size],
          isClickable && 'card-hover cursor-pointer',
          className
        )}
        onClick={isClickable ? onClick : undefined}
        style={style}
      >
        <div className="text-white font-bold opacity-20 rotate-12">PP</div>
      </div>
    );
  }

  // Card front
  return (
    <div
      className={clsx(
        'rounded-lg bg-white border-2 border-gray-300 flex flex-col items-center justify-center card-shadow relative',
        sizeClasses[size],
        suitColors[card.suit],
        isClickable && 'card-hover cursor-pointer',
        className
      )}
      onClick={isClickable ? onClick : undefined}
      style={style}
    >
      <div className="absolute top-1 left-1 flex flex-col items-center leading-none">
        <span className="font-bold">{card.rank}</span>
        <span className="text-base">{suitSymbols[card.suit]}</span>
      </div>
      <div className="text-4xl">{suitSymbols[card.suit]}</div>
      <div className="absolute bottom-1 right-1 flex flex-col items-center leading-none rotate-180">
        <span className="font-bold">{card.rank}</span>
        <span className="text-base">{suitSymbols[card.suit]}</span>
      </div>
    </div>
  );
}