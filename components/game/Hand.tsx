'use client';

import React from 'react';
import { Card as CardType } from '@/types';
import Card from './Card';
import clsx from 'clsx';

interface HandProps {
  cards: CardType[];
  onCardClick?: (cardId: string) => void;
  isPlayerHand?: boolean;
  disabled?: boolean;
  className?: string;
  playableCardIds?: string[];
}

export default function Hand({
  cards,
  onCardClick,
  isPlayerHand = true,
  disabled = false,
  className = '',
  playableCardIds = []
}: HandProps) {
  // Calculate overlap based on number of cards
  const overlapAmount = cards.length > 4 ? -10 : 4;

  return (
    <div className={clsx('flex justify-center items-center', className)}>
      {cards.map((card, index) => {
        const isPlayable = playableCardIds?.includes(card.id);

        return (
          <div
            key={card.id}
            className="transition-all duration-300"
            style={{
              marginLeft: index === 0 ? 0 : `${overlapAmount}px`,
              transform: isPlayerHand ? `translateY(${index * 1}px)` : '',
              zIndex: cards.length - index
            }}
          >
            <Card
              card={isPlayerHand ? card : { ...card, faceUp: false }}
              onClick={onCardClick && isPlayable ? () => onCardClick(card.id) : undefined}
              disabled={disabled}
              size="medium"
              className={clsx(
                onCardClick && isPlayable && 'hover:-translate-y-2 ring-2 ring-yellow-400 shadow-lg',
                !isPlayable && isPlayerHand && onCardClick && playableCardIds.length > 0 && 'opacity-60'
              )}
            />
          </div>
        );
      })}
    </div>
  );
}