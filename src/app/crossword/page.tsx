import GameHeader from "@/components/shared/GameHeader";
import CrosswordGame from "@/components/crossword/CrosswordGame";

export default function CrosswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-8 pb-4 px-4">
      <GameHeader title="Crossword Mini" />
      <CrosswordGame />
    </main>
  );
}
