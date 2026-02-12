"use client";

import Tile, { TileStatus } from "./Tile";
import { wordleConfig } from "@/config/gameConfig";

interface GridProps {
  guesses: string[];
  currentGuess: string;
  revealedRows: number;
  gameWon: boolean;
}

function getStatuses(guess: string, target: string): TileStatus[] {
  const statuses: TileStatus[] = Array(5).fill("absent");
  const targetLetters = target.split("");
  const guessLetters = guess.split("");

  // First pass: mark correct (green)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      statuses[i] = "correct";
      targetLetters[i] = "#"; // mark as used
      guessLetters[i] = "*"; // mark as matched
    }
  }

  // Second pass: mark present (yellow)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === "*") continue;
    const idx = targetLetters.indexOf(guessLetters[i]);
    if (idx !== -1) {
      statuses[i] = "present";
      targetLetters[idx] = "#";
    }
  }

  return statuses;
}

export { getStatuses };

export default function Grid({ guesses, currentGuess, revealedRows, gameWon }: GridProps) {
  const { maxGuesses, targetWord } = wordleConfig;
  const rows: { letters: string[]; statuses: TileStatus[]; isRevealed: boolean; isCurrentRow: boolean }[] = [];

  for (let i = 0; i < maxGuesses; i++) {
    if (i < guesses.length) {
      const guess = guesses[i];
      const statuses = getStatuses(guess, targetWord);
      const isRevealed = i < revealedRows;
      rows.push({
        letters: guess.split(""),
        statuses: isRevealed ? statuses : Array(5).fill("tbd"),
        isRevealed,
        isCurrentRow: false,
      });
    } else if (i === guesses.length) {
      const letters = currentGuess.padEnd(5, " ").split("").slice(0, 5);
      rows.push({
        letters,
        statuses: letters.map((l) => (l.trim() ? "tbd" : "empty")),
        isRevealed: false,
        isCurrentRow: true,
      });
    } else {
      rows.push({
        letters: Array(5).fill(""),
        statuses: Array(5).fill("empty"),
        isRevealed: false,
        isCurrentRow: false,
      });
    }
  }

  return (
    <div className="flex flex-col gap-1.5 items-center mb-6">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1.5">
          {row.letters.map((letter, colIdx) => (
            <Tile
              key={`${rowIdx}-${colIdx}`}
              letter={letter.trim()}
              status={row.statuses[colIdx]}
              animated={row.isRevealed && rowIdx === revealedRows - 1}
              delay={colIdx * 300}
              bounce={gameWon && rowIdx === guesses.length - 1 && revealedRows === guesses.length}
              bounceDelay={colIdx * 100}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
