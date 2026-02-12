import GameHeader from "@/components/shared/GameHeader";
import WordleGame from "@/components/wordle/WordleGame";

export default function WordlePage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-8 pb-4 px-4">
      <GameHeader title="Wordle" />
      <WordleGame />
    </main>
  );
}
