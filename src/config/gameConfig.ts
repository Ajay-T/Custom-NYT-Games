// ============================================================
// GAME CONFIGURATION — Edit this file to customize all games
// ============================================================

// --- WORDLE ---
export const wordleConfig = {
  targetWord: "BABBY", // Must be exactly 5 uppercase letters
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
    [null, "", null, "", null],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    [null, "", "", "", null],
    [null, null, "", null, null],
  ] as (string | null)[][],
  answers: [
    [null, "F", null, "U", null],
    ["B", "O", "I", "N", "K"],
    ["L", "I", "D", "D", "O"],
    [null, "D", "O", "O", null],
    [null, null, "L", null, null],
  ] as (string | null)[][],
  clues: {
    across: [
      { number: 3, clue: "seggs", row: 1, col: 0, length: 5 },
      { number: 6, clue: "sho _ baby", row: 2, col: 0, length: 5 },
      { number: 7, clue: "_doo", row: 3, col: 1, length: 3 },
    ] as CrosswordClue[],
    down: [
      { number: 1, clue: "scientific term for woman", row: 0, col: 1, length: 4 },
      { number: 2, clue: "reverse or cancel an action", row: 0, col: 3, length: 4 },
      { number: 4, clue: "a person or thing that is greatly admired or revered", row: 1, col: 2, length: 4 },
      { number: 5, clue: "knockout", row: 1, col: 4, length: 2 },
    ] as CrosswordClue[],
  },
};
