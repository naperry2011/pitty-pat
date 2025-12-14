'use client';

import React from 'react';
import { Card as CardType } from '@/types';
import Card from './Card';
import clsx from 'clsx';

interface DiscardPileProps {
  cards: CardType[];
  className?: string;
}

export default function DiscardPile({ cards, className = '' }: DiscardPileProps) {
  const topCards = cards.slice(-3); // Show last 3 cards for depth

  return (
    <div className={clsx('relative w-20 h-28', className)}>
      {/* Placeholder for empty pile or base reference */}
      {cards.length === 0 ? (
        <div className="w-20 h-28 rounded-lg border-2 border-dashed border-gray-400 opacity-30 flex items-center justify-center">
          <span className="text-gray-500 text-xs">Discard</span>
        </div>
      ) : (
        <>
          {/* Invisible base card to maintain container size */}
          <div className="w-20 h-28 opacity-0" />

          {/* Actual cards */}
          {topCards.map((card, index) => {
            const isTop = index === topCards.length - 1;
            const offset = index * 4;
            const rotation = index * 5 - 5;

            return (
              <div
                key={card.id}
                className={clsx(
                  'absolute top-0 left-0 transition-all duration-300',
                  !isTop && 'opacity-70'
                )}
                style={{
                  transform: `translate(${offset}px, ${offset}px) rotate(${rotation}deg)`,
                  zIndex: index + 1
                }}
              >
                <Card
                  card={{ ...card, faceUp: true }}
                  size="medium"
                />
              </div>
            );
          })}
        </>
      )}

      {/* Card count badge */}
      {cards.length > 1 && (
        <div className="absolute -bottom-2 -right-2 bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
          {cards.length}
        </div>
      )}
    </div>
  );
}