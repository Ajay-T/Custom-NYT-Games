"use client";

import { ConnectionGroup } from "@/config/gameConfig";

interface SolvedGroupProps {
  group: ConnectionGroup;
}

const colorClasses: Record<string, string> = {
  yellow: "bg-conn-yellow",
  green: "bg-conn-green",
  blue: "bg-conn-blue",
  purple: "bg-conn-purple",
};

export default function SolvedGroup({ group }: SolvedGroupProps) {
  return (
    <div
      className={`${colorClasses[group.color]} rounded-lg p-3 sm:p-4 text-center animate-fade-in-up`}
    >
      <div className="font-bold text-foreground text-sm sm:text-base uppercase tracking-wide">
        {group.name}
      </div>
      <div className="text-foreground/70 text-xs sm:text-sm mt-1">
        {group.words.join(", ")}
      </div>
    </div>
  );
}
