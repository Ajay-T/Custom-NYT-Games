"use client";

import { cn } from "@/lib/utils";

export type TileStatus = "empty" | "tbd" | "correct" | "present" | "absent";

interface TileProps {
  letter: string;
  status: TileStatus;
  animated: boolean;
  delay?: number;
  bounce?: boolean;
  bounceDelay?: number;
}

const statusClasses: Record<TileStatus, string> = {
  empty: "border-2 border-tile-border bg-white",
  tbd: "border-2 border-tile-active bg-white text-foreground",
  correct: "bg-correct text-white border-0",
  present: "bg-present text-white border-0",
  absent: "bg-absent text-white border-0",
};

export default function Tile({ letter, status, animated, delay = 0, bounce, bounceDelay = 0 }: TileProps) {
  return (
    <div
      className={cn(
        "w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-2xl font-bold uppercase select-none",
        statusClasses[status],
        letter && status === "tbd" && "animate-pop",
        animated && "animate-flip",
        bounce && "animate-bounce-tile",
      )}
      style={{
        animationDelay: animated ? `${delay}ms` : bounce ? `${bounceDelay}ms` : undefined,
        animationFillMode: "both",
      }}
    >
      {letter}
    </div>
  );
}
