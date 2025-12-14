'use client';

import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import Hand from './Hand';
import Deck from './Deck';
import DiscardPile from './DiscardPile';
import CardStyleSelector from './CardStyleSelector';
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700">
        <div className="text-white text-2xl animate-pulse">Starting game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-teal-900 felt-texture noise-overlay relative p-4">
      {/* Centered Container */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Game Title - Centered */}
        <div className="w-full text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl inline-block">
            Pitty Pat
          </h1>
        </div>

        {/* Game Status Message - Above everything */}
        <div className="mb-4 min-h-[60px] flex items-center justify-center w-full">
          {gameState.phase === 'roundEnd' && gameState.winner ? (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl shadow-2xl animate-bounce">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {gameState.winner === humanPlayer?.id ? '🎉 You Win! 🎉' : '🤖 Computer Wins!'}
              </div>
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full">
              <div className="text-white text-lg font-medium">
                {gameState.message}
              </div>
            </div>
          )}
        </div>

        {/* Score Display - Centered above main content */}
        <div className="flex gap-8 mb-6 justify-center">
          <div className="bg-gradient-to-r from-amber-800 to-amber-700 px-6 py-3 rounded-xl shadow-lg border border-amber-600/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-400/10 to-transparent"></div>
            <div className="text-center relative z-10">
              <div className="text-amber-300 text-sm font-bold mb-1 tracking-wider">YOU</div>
              <div className="text-white text-3xl font-bold drop-shadow-lg">{humanPlayer?.wins || 0}</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-800 to-amber-700 px-6 py-3 rounded-xl shadow-lg border border-amber-600/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-400/10 to-transparent"></div>
            <div className="text-center relative z-10">
              <div className="text-cyan-300 text-sm font-bold mb-1 tracking-wider">CPU</div>
              <div className="text-white text-3xl font-bold drop-shadow-lg">{aiPlayer?.wins || 0}</div>
            </div>
          </div>
        </div>

        {/* Main Game Layout - Game board and sidebar aligned */}
        <div className="flex flex-col lg:flex-row gap-6 w-full items-start">

          {/* Left Spacer (hidden on mobile) */}
          <div className="hidden lg:block lg:w-72"></div>

          {/* Center - Game Board */}
          <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full">

            {/* Game Board */}
            <div className="relative poker-table felt-grain rounded-2xl p-6 md:p-8 w-full overflow-hidden">

              {/* AI Hand (top) */}
              <div className="mb-8">
                <div className={clsx(
                  "text-center mb-3 font-bold transition-all duration-300",
                  currentPlayer?.isAI ? "text-amber-400 text-lg scale-105" : "text-white/90"
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
              <div className="flex justify-center items-start gap-12 md:gap-20 mb-6">
                <div className="flex flex-col items-center">
                  <div className="text-white/90 text-center mb-2 text-sm font-semibold uppercase tracking-wider">
                    Draw Pile
                  </div>
                  <Deck
                    cardCount={gameState.deck.length}
                    onClick={canDraw ? handleDrawCard : undefined}
                    disabled={!canDraw}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-white/90 text-center mb-2 text-sm font-semibold uppercase tracking-wider">
                    Discard Pile
                  </div>
                  <DiscardPile cards={gameState.discardPile} />
                </div>
              </div>

              {/* Action Hints */}
              {isPlayerTurn && (
                <div className="mb-6 flex justify-center">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-2.5 rounded-full shadow-xl transform hover:scale-105 transition-transform border border-amber-400/30">
                    <div className="text-white text-sm font-bold flex items-center gap-2 drop-shadow">
                      {canPlay && playableCards.length > 0 ? (
                        <>
                          <span className="text-lg animate-bounce">👇</span>
                          <span>Play your <span className="text-amber-100 font-black">{playableCards[0].rank}</span></span>
                        </>
                      ) : canDraw ? (
                        <>
                          <span className="text-lg animate-pulse">👆</span>
                          <span>Draw from deck</span>
                        </>
                      ) : (
                        <span className="opacity-90">Waiting...</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Player Hand (bottom) */}
              <div>
                <div className={clsx(
                  "text-center mb-3 font-bold transition-all duration-300",
                  isPlayerTurn ? "text-amber-400 text-lg scale-105" : "text-white/90"
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
                className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                New Round
              </button>
            )}
          </div>

          {/* Right Side - Card Style Selector and Instructions */}
          <div className="w-full lg:w-72 flex flex-col gap-4 mt-6 lg:mt-0">
            {/* Card Style Selector */}
            <CardStyleSelector />

            {/* Game Instructions */}
            <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">How to Play</h3>
              <div className="text-white/80 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Match the rank of the top discard card</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Can't match? Draw a card from the deck</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Drawn cards that don't match are discarded</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>First to empty their hand wins!</span>
                </div>
              </div>
            </div>

            {/* Quick Stats (optional enhancement) */}
            <div className="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Game Info</h3>
              <div className="text-white/80 text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Cards in deck:</span>
                  <span className="font-bold text-white">{gameState.deck.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Your cards:</span>
                  <span className="font-bold text-white">{humanPlayer?.hand.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>CPU cards:</span>
                  <span className="font-bold text-white">{aiPlayer?.hand.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}