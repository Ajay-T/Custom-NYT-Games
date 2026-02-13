"use client";

import { cn } from "@/lib/utils";
import { crosswordConfig, CrosswordClue } from "@/config/gameConfig";

interface CrosswordGridProps {
  userGrid: (string | null)[][];
  selectedCell: { row: number; col: number } | null;
  direction: "across" | "down";
  activeClue: CrosswordClue | null;
  incorrectCells: Set<string>;
  onCellClick: (row: number, col: number) => void;
}

function getCellNumber(row: number, col: number): number | null {
  const { clues } = crosswordConfig;
  const allClues = [...clues.across, ...clues.down];
  const clue = allClues.find((c) => c.row === row && c.col === col);
  return clue ? clue.number : null;
}

function getHighlightedCells(clue: CrosswordClue | null, direction: "across" | "down"): Set<string> {
  const cells = new Set<string>();
  if (!clue) return cells;
  for (let i = 0; i < clue.length; i++) {
    const r = direction === "across" ? clue.row : clue.row + i;
    const c = direction === "across" ? clue.col + i : clue.col;
    cells.add(`${r}-${c}`);
  }
  return cells;
}

export default function CrosswordGrid({
  userGrid,
  selectedCell,
  direction,
  activeClue,
  incorrectCells,
  onCellClick,
}: CrosswordGridProps) {
  const { size, grid } = crosswordConfig;
  const highlightedCells = getHighlightedCells(activeClue, direction);

  return (
    <div
      className="grid gap-0 border-2 border-foreground"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: "fit-content" }}
    >
      {Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, col) => {
          const isBlack = grid[row][col] === null;
          const cellKey = `${row}-${col}`;
          const isSelected = selectedCell?.row === row && selectedCell?.col === col;
          const isHighlighted = highlightedCells.has(cellKey);
          const isIncorrect = incorrectCells.has(cellKey);
          const cellNumber = getCellNumber(row, col);
          const letter = userGrid[row]?.[col] ?? "";

          if (isBlack) {
            return (
              <div
                key={cellKey}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground border border-foreground"
              />
            );
          }

          return (
            <div
              key={cellKey}
              onClick={() => onCellClick(row, col)}
              className={cn(
                "w-12 h-12 sm:w-14 sm:h-14 border border-gray-300 relative cursor-pointer select-none flex items-center justify-center transition-colors duration-150 active:scale-95 touch-manipulation",
                isSelected && "bg-rose/30",
                !isSelected && isHighlighted && "bg-rose/10",
                !isSelected && !isHighlighted && "bg-white hover:bg-rose/5",
                isIncorrect && "bg-red-100",
              )}
            >
              {cellNumber && (
                <span className="absolute top-0.5 left-1 text-[10px] text-foreground/60 font-medium leading-none">
                  {cellNumber}
                </span>
              )}
              <span className={cn(
                "text-lg font-bold uppercase",
                isIncorrect ? "text-red-500" : "text-foreground",
              )}>
                {letter}
              </span>
            </div>
          );
        }),
      )}
    </div>
  );
}
