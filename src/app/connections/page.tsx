import GameHeader from "@/components/shared/GameHeader";
import ConnectionsGame from "@/components/connections/ConnectionsGame";

export default function ConnectionsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-8 pb-4 px-4">
      <GameHeader title="Connections" />
      <ConnectionsGame />
    </main>
  );
}
