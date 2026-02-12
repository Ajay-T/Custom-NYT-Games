import Link from "next/link";

const games = [
  {
    title: "Wordle",
    description: "Guess the 5-letter word in 6 tries",
    href: "/wordle",
    emoji: "💝",
  },
  {
    title: "Connections",
    description: "Group 16 words into 4 categories",
    href: "/connections",
    emoji: "💘",
  },
  {
    title: "Crossword Mini",
    description: "Solve a mini crossword puzzle",
    href: "/crossword",
    emoji: "💌",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10 text-rose text-6xl overflow-hidden" aria-hidden="true">
        {["❤", "💕", "♥", "💗", "❤", "♥", "💕", "💗", "❤", "💕"].map((h, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${(i * 10) + 2}%`,
              top: `${(i * 7 + 15) % 90}%`,
              fontSize: `${1.5 + (i % 3)}rem`,
              transform: `rotate(${i * 36}deg)`,
            }}
          >
            {h}
          </span>
        ))}
      </div>

      <div className="text-center mb-12 relative z-10">
        <p className="text-5xl mb-4">💖</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-rose mb-3">
          Happy Valentine&apos;s Day!
        </h1>
        <p className="text-warm-gray text-lg max-w-md mx-auto">
          I made you some games. Pick one and play!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full relative z-10">
        {games.map((game) => (
          <Link
            key={game.title}
            href={game.href}
            className="group block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-light/20"
          >
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h2 className="text-xl font-bold text-foreground group-hover:text-rose transition-colors">
              {game.title}
            </h2>
            <p className="text-warm-gray text-sm mt-1">{game.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
