'use client';

import React from 'react';
import Card from './Card';
import clsx from 'clsx';

interface DeckProps {
  cardCount: number;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Deck({
  cardCount,
  onClick,
  disabled = false,
  className = ''
}: DeckProps) {
  const isClickable = onClick && !disabled && cardCount > 0;

  return (
    <div className={clsx('relative w-20 h-28', className)}>
      {/* Stack effect - show multiple cards */}
      {cardCount > 2 && (
        <div className="absolute top-0 left-0 opacity-40" style={{ transform: 'translate(-2px, -2px)' }}>
          <Card
            card={{ id: 'deck-3', suit: 'spades', rank: 'A', faceUp: false }}
            size="medium"
            disabled
          />
        </div>
      )}
      {cardCount > 1 && (
        <div className="absolute top-0 left-0 opacity-70" style={{ transform: 'translate(-1px, -1px)' }}>
          <Card
            card={{ id: 'deck-2', suit: 'spades', rank: 'A', faceUp: false }}
            size="medium"
            disabled
          />
        </div>
      )}

      {/* Top card of deck */}
      <div className="absolute top-0 left-0">
        {cardCount > 0 ? (
          <Card
            card={{ id: 'deck-1', suit: 'spades', rank: 'A', faceUp: false }}
            onClick={isClickable ? onClick : undefined}
            disabled={disabled}
            size="medium"
            className={isClickable ? 'hover:scale-105 hover:shadow-xl transition-all' : ''}
          />
        ) : (
          <div className="w-20 h-28 rounded-lg border-2 border-dashed border-gray-400 opacity-30 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Empty</span>
          </div>
        )}
      </div>

      {/* Card count badge */}
      {cardCount > 0 && (
        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md z-10">
          {cardCount}
        </div>
      )}
    </div>
  );
}