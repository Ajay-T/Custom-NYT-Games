"use client";

import Link from "next/link";

interface GameHeaderProps {
  title: string;
}

export default function GameHeader({ title }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto mb-6 px-4">
      <Link
        href="/"
        className="text-warm-gray hover:text-rose transition-colors text-sm font-medium"
      >
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold text-rose">{title}</h1>
      <div className="w-12" />
    </div>
  );
}
