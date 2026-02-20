// ============================================================
// GAME CONFIGURATION — Edit this file to customize all games
// ============================================================

// --- WORDLE ---
// targetWord must be exactly 5 uppercase letters.
export const wordleConfig = {
  targetWord: "GAMES", // Change this to any 5-letter uppercase word
  maxGuesses: 6,
};

// --- CONNECTIONS ---
// Define 4 groups of 4 words each.
// Each group needs a name, exactly 4 words, and a color tier:
//   yellow = easiest, green = medium, blue = hard, purple = hardest
export interface ConnectionGroup {
  name: string;
  words: [string, string, string, string];
  color: "yellow" | "green" | "blue" | "purple";
}

export const connectionsConfig = {
  groups: [
    {
      name: "Primary Colors",
      words: ["RED", "BLUE", "YELLOW", "GREEN"],
      color: "yellow",
    },
    {
      name: "Animals",
      words: ["LION", "TIGER", "BEAR", "WOLF"],
      color: "green",
    },
    {
      name: "___ Ball",
      words: ["FIRE", "BASE", "BASKET", "FOOT"],
      color: "blue",
    },
    {
      name: "Fruits",
      words: ["APPLE", "MANGO", "PEACH", "PLUM"],
      color: "purple",
    },
  ] as ConnectionGroup[],
  maxMistakes: 4,
};

// --- CROSSWORD MINI ---
// Grid is a 5×5 array. Use null for black/blocked cells, "" for white cells.
// Answers mirrors the grid: null for black cells, uppercase letter for white cells.
// Clues list each word by its number, clue text, starting row/col, and length.
//
// This example puzzle:
//   Across — 1: PRINT, 3: APING, 5: DIRER
//   Down   — 1: PLAID, 2: ICIER, 4: TIGER
export interface CrosswordClue {
  number: number;
  clue: string;
  row: number;
  col: number;
  length: number;
}

export const crosswordConfig = {
  size: 5,
  grid: [
    ["", "", "", "", ""],
    ["", null, "", null, ""],
    ["", "", "", "", ""],
    ["", null, "", null, ""],
    ["", "", "", "", ""],
  ] as (string | null)[][],
  answers: [
    ["P", "R", "I", "N", "T"],
    ["L", null, "C", null, "I"],
    ["A", "P", "I", "N", "G"],
    ["I", null, "E", null, "E"],
    ["D", "I", "R", "E", "R"],
  ] as (string | null)[][],
  clues: {
    across: [
      { number: 1, clue: "Output text", row: 0, col: 0, length: 5 },
      { number: 3, clue: "Mimicking", row: 2, col: 0, length: 5 },
      { number: 5, clue: "More serious or urgent", row: 4, col: 0, length: 5 },
    ] as CrosswordClue[],
    down: [
      { number: 1, clue: "Checked fabric pattern", row: 0, col: 0, length: 5 },
      { number: 2, clue: "More icy", row: 0, col: 2, length: 5 },
      { number: 4, clue: "Striped big cat", row: 0, col: 4, length: 5 },
    ] as CrosswordClue[],
  },
};
