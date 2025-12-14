'use client';

import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import Hand from './Hand';
import Deck from './Deck';
import DiscardPile from './DiscardPile';
import { findPlayableCards } from '@/lib/game-engine';
import clsx from 'clsx';

export default function GameBoard() {
  const { gameState, handleDrawCard, handlePlayCard, handleRestartRound } = useGameState('easy');

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const humanPlayer = gameState.players.find(p => !p.isAI);
  const aiPlayer = gameState.players.find(p => p.isAI);
  const topDiscard = gameState.discardPile[gameState.discardPile.length - 1];

  const playableCards = humanPlayer && topDiscard
    ? findPlayableCards(humanPlayer.hand, topDiscard)
    : [];

  const isPlayerTurn = currentPlayer && !currentPlayer.isAI;
  const canDraw = isPlayerTurn && gameState.turnAction === 'draw';
  const canPlay = isPlayerTurn && playableCards.length > 0;

  // Show loading state while game initializes
  if (gameState.phase === 'waiting' && gameState.deck.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Starting game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-900 via-green-800 to-green-700">
      {/* Game Title */}
      <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Pitty Pat</h1>

      {/* Game Status */}
      <div className="mb-4 text-center min-h-[80px] flex flex-col justify-center">
        {gameState.phase === 'roundEnd' && gameState.winner ? (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-lg shadow-xl animate-bounce">
            <div className="text-3xl font-bold text-white">
              {gameState.winner === humanPlayer?.id ? '🎉 You Win! 🎉' : '🤖 Computer Wins!'}
            </div>
          </div>
        ) : (
          <div className="text-white text-lg font-medium drop-shadow bg-black/20 px-4 py-2 rounded-lg inline-block mx-auto">
            {gameState.message}
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="flex gap-6 mb-4">
        <div className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-2 rounded-lg shadow-md border border-green-500/30">
          <div className="text-white font-medium flex items-center gap-2">
            <span className="text-yellow-300 font-bold">You</span>
            <span className="text-2xl font-bold">{humanPlayer?.wins || 0}</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-2 rounded-lg shadow-md border border-green-500/30">
          <div className="text-white font-medium flex items-center gap-2">
            <span className="text-blue-300 font-bold">CPU</span>
            <span className="text-2xl font-bold">{aiPlayer?.wins || 0}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-600 rounded-xl p-4 md:p-8 shadow-2xl max-w-4xl w-full border border-green-800">
        {/* AI Hand (top) */}
        <div className="mb-8">
          <div className={clsx(
            "text-center mb-3 font-semibold transition-all duration-300",
            currentPlayer?.isAI ? "text-yellow-300 text-lg" : "text-white"
          )}>
            Computer's Hand
            {currentPlayer?.isAI && <span className="ml-2 animate-pulse">🤔</span>}
          </div>
          <div className="flex justify-center">
            {aiPlayer && (
              <Hand
                cards={aiPlayer.hand}
                isPlayerHand={false}
                disabled
              />
            )}
          </div>
        </div>

        {/* Middle Section - Deck and Discard Pile */}
        <div className="flex justify-center items-start gap-16 mb-6 min-h-[140px]">
          <div className="flex flex-col items-center">
            <div className="text-white text-center mb-3 text-sm font-medium">Draw Pile</div>
            <Deck
              cardCount={gameState.deck.length}
              onClick={canDraw ? handleDrawCard : undefined}
              disabled={!canDraw}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="text-white text-center mb-3 text-sm font-medium">Discard Pile</div>
            <div className="relative">
              <DiscardPile cards={gameState.discardPile} />
            </div>
          </div>
        </div>

        {/* Action Hints - Between deck and player hand */}
        {isPlayerTurn && (
          <div className="mb-6 flex justify-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-2 rounded-full shadow-lg">
              <div className="text-white text-sm font-semibold flex items-center gap-2">
                {canPlay && playableCards.length > 0 ? (
                  <>
                    <span className="animate-bounce">👇</span>
                    <span>Play your <span className="text-yellow-100 font-bold">{playableCards[0].rank}</span></span>
                  </>
                ) : canDraw ? (
                  <>
                    <span className="animate-pulse">👆</span>
                    <span>Draw from deck</span>
                  </>
                ) : (
                  <span className="opacity-75">Waiting...</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Player Hand (bottom) */}
        <div>
          <div className={clsx(
            "text-center mb-3 font-semibold transition-all duration-300",
            isPlayerTurn ? "text-yellow-300 text-lg" : "text-white"
          )}>
            Your Hand
            {isPlayerTurn && <span className="ml-2">👈 Your turn!</span>}
          </div>
          <div className="flex justify-center">
            {humanPlayer && (
              <Hand
                cards={humanPlayer.hand}
                onCardClick={isPlayerTurn ? handlePlayCard : undefined}
                isPlayerHand
                playableCardIds={playableCards.map(c => c.id)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Restart Button */}
      {gameState.phase === 'roundEnd' && (
        <button
          onClick={handleRestartRound}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          New Round
        </button>
      )}

      {/* Instructions */}
      <div className="mt-6 text-white text-center max-w-md">
        <p className="text-sm opacity-80">
          Match the rank of the top discard card. If you can't match, draw a card.
          First to empty their hand wins!
        </p>
      </div>
    </div>
  );
}