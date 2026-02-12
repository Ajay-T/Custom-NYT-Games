"use client";

import { CrosswordClue } from "@/config/gameConfig";
import { cn } from "@/lib/utils";

interface ClueListProps {
  title: string;
  clues: CrosswordClue[];
  activeClue: CrosswordClue | null;
  onClueClick: (clue: CrosswordClue) => void;
}

export default function ClueList({ title, clues, activeClue, onClueClick }: ClueListProps) {
  return (
    <div>
      <h3 className="font-bold text-sm text-rose mb-2 uppercase tracking-wide">{title}</h3>
      <div className="flex flex-col gap-1">
        {clues.map((clue) => (
          <button
            key={`${title}-${clue.number}`}
            onClick={() => onClueClick(clue)}
            className={cn(
              "text-left text-sm py-1.5 px-2 rounded transition-colors",
              activeClue?.number === clue.number &&
                activeClue?.clue === clue.clue
                ? "bg-rose/10 text-rose font-medium"
                : "text-foreground hover:bg-gray-100",
            )}
          >
            <span className="font-bold mr-1.5">{clue.number}.</span>
            {clue.clue}
          </button>
        ))}
      </div>
    </div>
  );
}
