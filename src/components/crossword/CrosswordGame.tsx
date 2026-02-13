"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import CrosswordGrid from "./CrosswordGrid";
import ClueList from "./ClueList";
import Modal from "@/components/shared/Modal";
import { crosswordConfig, CrosswordClue } from "@/config/gameConfig";

function createEmptyGrid(): (string | null)[][] {
  const { size, grid } = crosswordConfig;
  return Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => (grid[r][c] === null ? null : "")),
  );
}

function findClueForCell(
  row: number,
  col: number,
  direction: "across" | "down",
): CrosswordClue | null {
  const clues = crosswordConfig.clues[direction];
  for (const clue of clues) {
    if (direction === "across") {
      if (row === clue.row && col >= clue.col && col < clue.col + clue.length) {
        return clue;
      }
    } else {
      if (col === clue.col && row >= clue.row && row < clue.row + clue.length) {
        return clue;
      }
    }
  }
  return null;
}

function getNextCell(
  row: number,
  col: number,
  direction: "across" | "down",
  forward: boolean,
): { row: number; col: number } | null {
  const { size, grid } = crosswordConfig;
  const dr = direction === "down" ? (forward ? 1 : -1) : 0;
  const dc = direction === "across" ? (forward ? 1 : -1) : 0;
  const nr = row + dr;
  const nc = col + dc;
  if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc] !== null) {
    return { row: nr, col: nc };
  }
  return null;
}

export default function CrosswordGame() {
  const { answers } = crosswordConfig;
  const [userGrid, setUserGrid] = useState<(string | null)[][]>(createEmptyGrid);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>({ row: 0, col: 0 });
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [incorrectCells, setIncorrectCells] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeClue = selectedCell
    ? findClueForCell(selectedCell.row, selectedCell.col, direction) ??
      findClueForCell(selectedCell.row, selectedCell.col, direction === "across" ? "down" : "across")
    : null;

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (crosswordConfig.grid[row][col] === null) return;
      if (selectedCell?.row === row && selectedCell?.col === col) {
        // Toggle direction on re-click
        setDirection((d) => (d === "across" ? "down" : "across"));
      } else {
        setSelectedCell({ row, col });
      }
      setIncorrectCells(new Set());
      // Focus hidden input to trigger mobile keyboard
      inputRef.current?.focus();
    },
    [selectedCell],
  );

  const handleClueClick = useCallback((clue: CrosswordClue) => {
    setSelectedCell({ row: clue.row, col: clue.col });
    // Determine direction from which clue list it's in
    const isAcross = crosswordConfig.clues.across.includes(clue);
    setDirection(isAcross ? "across" : "down");
    setIncorrectCells(new Set());
    // Focus hidden input to trigger mobile keyboard
    inputRef.current?.focus();
  }, []);

  const checkCompletion = useCallback(
    (grid: (string | null)[][]) => {
      const { size } = crosswordConfig;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (answers[r][c] !== null && grid[r][c] !== answers[r][c]) {
            return false;
          }
        }
      }
      return true;
    },
    [answers],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedCell || solved) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const { row, col } = selectedCell;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = getNextCell(row, col, "down", false);
        if (next) setSelectedCell(next);
        setDirection("down");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = getNextCell(row, col, "down", true);
        if (next) setSelectedCell(next);
        setDirection("down");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const next = getNextCell(row, col, "across", false);
        if (next) setSelectedCell(next);
        setDirection("across");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = getNextCell(row, col, "across", true);
        if (next) setSelectedCell(next);
        setDirection("across");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        setIncorrectCells(new Set());
        const newGrid = userGrid.map((r) => [...r]);
        if (newGrid[row][col]) {
          newGrid[row][col] = "";
        } else {
          const prev = getNextCell(row, col, direction, false);
          if (prev) {
            newGrid[prev.row][prev.col] = "";
            setSelectedCell(prev);
          }
        }
        setUserGrid(newGrid);
      } else if (e.key === "Tab") {
        e.preventDefault();
        setDirection((d) => (d === "across" ? "down" : "across"));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        setIncorrectCells(new Set());
        const newGrid = userGrid.map((r) => [...r]);
        newGrid[row][col] = e.key.toUpperCase();
        setUserGrid(newGrid);

        if (checkCompletion(newGrid)) {
          setSolved(true);
          setTimeout(() => setShowModal(true), 500);
          return;
        }

        const next = getNextCell(row, col, direction, true);
        if (next) setSelectedCell(next);
      }
    },
    [selectedCell, userGrid, direction, solved, checkCompletion],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCheck = useCallback(() => {
    const incorrect = new Set<string>();
    const { size } = crosswordConfig;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (
          answers[r][c] !== null &&
          userGrid[r][c] !== "" &&
          userGrid[r][c] !== answers[r][c]
        ) {
          incorrect.add(`${r}-${c}`);
        }
      }
    }
    setIncorrectCells(incorrect);
  }, [userGrid, answers]);

  const handleReveal = useCallback(() => {
    const { size } = crosswordConfig;
    const newGrid = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => answers[r][c]),
    );
    setUserGrid(newGrid);
    setSolved(true);
    setIncorrectCells(new Set());
    setTimeout(() => setShowModal(true), 500);
  }, [answers]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
      {/* Hidden input for mobile keyboard support */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        className="sr-only"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        onKeyDown={(e) => {
          // Convert to KeyboardEvent type for handleKeyDown
          handleKeyDown(e as unknown as KeyboardEvent);
        }}
      />
      
      <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
        {/* Grid */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <CrosswordGrid
            userGrid={userGrid}
            selectedCell={selectedCell}
            direction={direction}
            activeClue={activeClue}
            incorrectCells={incorrectCells}
            onCellClick={handleCellClick}
          />
        </div>

        {/* Clues */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <ClueList
            title="Across"
            clues={crosswordConfig.clues.across}
            activeClue={direction === "across" ? activeClue : null}
            onClueClick={handleClueClick}
          />
          <ClueList
            title="Down"
            clues={crosswordConfig.clues.down}
            activeClue={direction === "down" ? activeClue : null}
            onClueClick={handleClueClick}
          />
        </div>
      </div>

      {/* Action buttons */}
      {!solved && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCheck}
            className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-foreground hover:bg-gray-100 active:bg-gray-200 transition-all active:scale-95 touch-manipulation"
          >
            Check
          </button>
          <button
            onClick={handleReveal}
            className="px-5 py-2.5 rounded-full bg-rose text-white text-sm font-semibold hover:bg-rose-dark active:bg-rose-dark/80 transition-all active:scale-95 touch-manipulation"
          >
            Reveal
          </button>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Crossword Complete!"
      >
        <div>
          <p className="text-5xl mb-4">🎉✍️</p>
          <p className="text-warm-gray">You solved the mini crossword!</p>
        </div>
      </Modal>
    </div>
  );
}
