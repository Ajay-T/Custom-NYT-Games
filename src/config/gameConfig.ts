// ============================================================
// GAME CONFIGURATION — Edit this file to customize all games
// ============================================================

// --- WORDLE ---
export const wordleConfig = {
  targetWord: "HEART", // Must be exactly 5 uppercase letters
  maxGuesses: 6,
};

// --- CONNECTIONS ---
export interface ConnectionGroup {
  name: string;
  words: [string, string, string, string];
  color: "yellow" | "green" | "blue" | "purple";
}

export const connectionsConfig = {
  groups: [
    {
      name: "Things That Are Red",
      words: ["ROSE", "FIRE", "RUBY", "MARS"],
      color: "yellow",
    },
    {
      name: "Terms of Endearment",
      words: ["HONEY", "SUGAR", "BABY", "ANGEL"],
      color: "green",
    },
    {
      name: "Love Songs",
      words: ["CRAZY", "ALWAYS", "ADORE", "DEVOTED"],
      color: "blue",
    },
    {
      name: "Valentine's Day",
      words: ["CUPID", "ARROW", "CARD", "CANDY"],
      color: "purple",
    },
  ] as ConnectionGroup[],
  maxMistakes: 4,
};

// --- CROSSWORD MINI ---
// Grid: null = black/blocked cell, "" = empty white cell
// Answers: null for black cells, uppercase letter for white cells
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
    ["H", "E", "A", "R", "T"],
    ["U", null, "D", null, "O"],
    ["K", "I", "O", "R", "E"],
    ["E", null, "R", null, "S"],
    ["S", "W", "E", "E", "T"],
  ] as (string | null)[][],
  clues: {
    across: [
      { number: 1, clue: "Symbol of love", row: 0, col: 0, length: 5 },
      { number: 3, clue: "Worship", row: 2, col: 0, length: 5 },
      { number: 5, clue: "Sugary, like candy", row: 4, col: 0, length: 5 },
    ] as CrosswordClue[],
    down: [
      { number: 1, clue: "Embrace tightly", row: 0, col: 0, length: 5 },
      { number: 2, clue: "Worship, revere", row: 0, col: 2, length: 5 },
      { number: 4, clue: "Feet appendages", row: 0, col: 4, length: 5 },
    ] as CrosswordClue[],
  },
};
