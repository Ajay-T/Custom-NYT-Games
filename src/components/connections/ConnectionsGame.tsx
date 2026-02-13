"use client";

import { useState, useCallback, useEffect } from "react";
import WordGrid from "./WordGrid";
import SolvedGroup from "./SolvedGroup";
import Modal from "@/components/shared/Modal";
import { connectionsConfig, ConnectionGroup } from "@/config/gameConfig";
import { shuffle } from "@/lib/utils";

export default function ConnectionsGame() {
  const { groups, maxMistakes } = connectionsConfig;
  const allWords = groups.flatMap((g) => g.words);

  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<ConnectionGroup[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  // Initialize with shuffled words
  useEffect(() => {
    setRemainingWords(shuffle(allWords));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleToggle = useCallback(
    (word: string) => {
      if (gameStatus !== "playing") return;
      setSelected((prev) => {
        if (prev.includes(word)) return prev.filter((w) => w !== word);
        if (prev.length >= 4) return prev;
        return [...prev, word];
      });
    },
    [gameStatus],
  );

  const handleShuffle = useCallback(() => {
    setRemainingWords((prev) => shuffle(prev));
  }, []);

  const handleDeselect = useCallback(() => {
    setSelected([]);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selected.length !== 4) return;
    if (gameStatus !== "playing") return;

    // Check if selected words match any group
    const matchedGroup = groups.find(
      (g) =>
        !solvedGroups.includes(g) &&
        selected.every((w) => g.words.includes(w)),
    );

    if (matchedGroup) {
      const newSolved = [...solvedGroups, matchedGroup];
      setSolvedGroups(newSolved);
      setRemainingWords((prev) => prev.filter((w) => !selected.includes(w)));
      setSelected([]);

      if (newSolved.length === groups.length) {
        setGameStatus("won");
        setTimeout(() => setShowModal(true), 800);
      }
    } else {
      // Check for "one away"
      const oneAway = groups.some(
        (g) =>
          !solvedGroups.includes(g) &&
          selected.filter((w) => g.words.includes(w)).length === 3,
      );

      if (oneAway) {
        showToast("One away...");
      }

      setShaking(true);
      setTimeout(() => setShaking(false), 500);

      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setSelected([]);

      if (newMistakes >= maxMistakes) {
        setGameStatus("lost");
        // Reveal all remaining groups
        const unsolved = groups.filter((g) => !solvedGroups.includes(g));
        setSolvedGroups([...solvedGroups, ...unsolved]);
        setRemainingWords([]);
        setTimeout(() => setShowModal(true), 800);
      }
    }
  }, [selected, groups, solvedGroups, mistakes, maxMistakes, gameStatus, showToast]);

  const mistakeDots = Array(maxMistakes)
    .fill(0)
    .map((_, i) => (
      <span
        key={i}
        className={`inline-block w-3 h-3 rounded-full mx-0.5 ${
          i < mistakes ? "bg-foreground" : "bg-gray-300"
        }`}
      />
    ));

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-foreground text-white px-6 py-3 rounded-lg font-bold text-sm z-40 shadow-lg">
          {toast}
        </div>
      )}

      <p className="text-warm-gray text-sm mb-4 text-center">
        Find groups of four words that share something in common.
      </p>

      {/* Solved groups */}
      <div className="w-full flex flex-col gap-2 mb-2">
        {solvedGroups.map((group) => (
          <SolvedGroup key={group.name} group={group} />
        ))}
      </div>

      {/* Remaining words grid */}
      {remainingWords.length > 0 && (
        <WordGrid
          words={remainingWords}
          selected={selected}
          onToggle={handleToggle}
          shaking={shaking}
        />
      )}

      {/* Mistakes */}
      <div className="flex items-center gap-2 mt-4 mb-4">
        <span className="text-sm text-warm-gray">Mistakes remaining:</span>
        <div className="flex">{mistakeDots}</div>
      </div>

      {/* Action buttons */}
      {gameStatus === "playing" && (
        <div className="flex gap-3">
          <button
            onClick={handleShuffle}
            className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-foreground hover:bg-gray-100 active:bg-gray-200 transition-all active:scale-95 touch-manipulation"
          >
            Shuffle
          </button>
          <button
            onClick={handleDeselect}
            className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-foreground hover:bg-gray-100 active:bg-gray-200 transition-all active:scale-95 touch-manipulation"
          >
            Deselect All
          </button>
          <button
            onClick={handleSubmit}
            disabled={selected.length !== 4}
            className="px-5 py-2.5 rounded-full bg-foreground text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground/80 active:bg-foreground/70 transition-all active:scale-95 touch-manipulation"
          >
            Submit
          </button>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={gameStatus === "won" ? "Amazing!" : "Nice try!"}
      >
        {gameStatus === "won" ? (
          <div>
            <p className="text-5xl mb-4">🎉 ♡</p>
            <p className="text-warm-gray">You found all the connections!</p>
          </div>
        ) : (
          <div>
            <p className="text-5xl mb-4">♡</p>
            <p className="text-warm-gray">You ran out of mistakes, but check out the answers above!</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
