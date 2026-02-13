"use client";

import { useState, useEffect, useCallback } from "react";
import Grid, { getStatuses } from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "@/components/shared/Modal";
import { wordleConfig } from "@/config/gameConfig";
import { TileStatus } from "./Tile";

export default function WordleGame() {
  const { targetWord, maxGuesses } = wordleConfig;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [revealedRows, setRevealedRows] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shakeRow, setShakeRow] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  }, []);

  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;
      if (revealedRows < guesses.length) return; // still animating

      if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "ENTER") {
        if (currentGuess.length !== 5) {
          showToast("Not enough letters");
          setShakeRow(true);
          setTimeout(() => setShakeRow(false), 500);
          return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        // Reveal with animation delay
        setTimeout(() => {
          setRevealedRows(newGuesses.length);

          // Check win/loss after reveal
          setTimeout(() => {
            if (currentGuess === targetWord) {
              setGameStatus("won");
              setTimeout(() => setShowModal(true), 600);
            } else if (newGuesses.length >= maxGuesses) {
              setGameStatus("lost");
              setTimeout(() => setShowModal(true), 600);
            }
          }, 300);
        }, 100); // Reduced delay for snappier response

        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, guesses, gameStatus, targetWord, maxGuesses, revealedRows, showToast],
  );

  // Physical keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") handleKey("ENTER");
      else if (e.key === "Backspace") handleKey("BACKSPACE");
      else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  // Build keyboard letter status map
  const letterStatuses: Record<string, TileStatus> = {};
  for (let i = 0; i < revealedRows; i++) {
    const guess = guesses[i];
    const statuses = getStatuses(guess, targetWord);
    for (let j = 0; j < 5; j++) {
      const letter = guess[j];
      const s = statuses[j];
      const existing = letterStatuses[letter];
      // Priority: correct > present > absent
      if (s === "correct") letterStatuses[letter] = "correct";
      else if (s === "present" && existing !== "correct") letterStatuses[letter] = "present";
      else if (s === "absent" && !existing) letterStatuses[letter] = "absent";
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-foreground text-white px-6 py-3 rounded-lg font-bold text-sm z-40 shadow-lg">
          {toast}
        </div>
      )}

      <div className={shakeRow ? "animate-shake" : ""}>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          revealedRows={revealedRows}
          gameWon={gameStatus === "won"}
        />
      </div>

      <Keyboard letterStatuses={letterStatuses} onKey={handleKey} />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={gameStatus === "won" ? "You got it!" : "Better luck next time!"}
      >
        {gameStatus === "won" ? (
          <div>
            <p className="text-5xl mb-4">🎉 ♡</p>
            <p className="text-warm-gray">
              You guessed <span className="font-bold text-rose">{targetWord}</span> in {guesses.length} {guesses.length === 1 ? "try" : "tries"}!
            </p>
          </div>
        ) : (
          <div>
            <p className="text-5xl mb-4">😢</p>
            <p className="text-warm-gray">
              The word was <span className="font-bold text-rose">{targetWord}</span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
