"use client";

import { cn } from "@/lib/utils";
import { TileStatus } from "./Tile";

interface KeyboardProps {
  letterStatuses: Record<string, TileStatus>;
  onKey: (key: string) => void;
}

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const statusColors: Record<string, string> = {
  correct: "bg-correct text-white border-correct",
  present: "bg-present text-white border-present",
  absent: "bg-absent text-white border-absent",
};

export default function Keyboard({ letterStatuses, onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center w-full max-w-lg px-2">
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1 sm:gap-1.5 justify-center w-full">
          {row.map((key) => {
            const status = letterStatuses[key];
            const isWide = key === "ENTER" || key === "⌫";
            return (
              <button
                key={key}
                onClick={() => onKey(key === "⌫" ? "BACKSPACE" : key)}
                className={cn(
                  "h-14 rounded-md font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-150 select-none active:scale-95 touch-manipulation",
                  isWide ? "px-2 sm:px-4 min-w-[52px] sm:min-w-[65px]" : "min-w-[28px] sm:min-w-[40px] flex-1",
                  status
                    ? statusColors[status]
                    : "bg-gray-200 text-foreground hover:bg-gray-300 active:bg-gray-400 border border-gray-300",
                )}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
