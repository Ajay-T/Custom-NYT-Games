"use client";

import { cn } from "@/lib/utils";

interface WordGridProps {
  words: string[];
  selected: string[];
  onToggle: (word: string) => void;
  shaking: boolean;
}

export default function WordGrid({ words, selected, onToggle, shaking }: WordGridProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-2 sm:gap-3", shaking && "animate-shake")}>
      {words.map((word) => {
        const isSelected = selected.includes(word);
        return (
          <button
            key={word}
            onClick={() => onToggle(word)}
            className={cn(
              "h-14 sm:h-16 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wide transition-all duration-200 select-none active:scale-95 touch-manipulation",
              isSelected
                ? "bg-foreground text-white"
                : "bg-white border border-gray-200 text-foreground hover:bg-blush shadow-sm active:shadow-none",
            )}
          >
            {word}
          </button>
        );
      })}
    </div>
  );
}
