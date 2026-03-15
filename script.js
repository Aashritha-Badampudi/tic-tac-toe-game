// ─────────────────────────────────────────────
//  Tic Tac Toe – script.js
//  Beginner-friendly, heavily commented code
// ─────────────────────────────────────────────


// ── 1. Grab elements from the HTML ──────────────────────────────────────────

// The status paragraph (shows whose turn it is, or the result)
const statusText = document.getElementById("status");

// The game board div
const board = document.getElementById("board");

// All 9 cell divs (returns an array-like list)
const cells = document.querySelectorAll(".cell");

// The reset button
const resetBtn = document.getElementById("resetBtn");


// ── 2. Game State Variables ──────────────────────────────────────────────────

// Whose turn is it?  We start with "X"
let currentPlayer = "X";

// Track what is in each of the 9 cells ("X", "O", or "" for empty)
// Index matches data-index on each cell: 0-8
let gameState = ["", "", "", "", "", "", "", "", ""];

// Is the game still going?
let gameActive = true;


// ── 3. Winning Combinations ───────────────────────────────────────────────────
// Each inner array is a set of 3 cell indices that form a winning line

const winningCombinations = [
  [0, 1, 2],  // top row
  [3, 4, 5],  // middle row
  [6, 7, 8],  // bottom row
  [0, 3, 6],  // left column
  [1, 4, 7],  // middle column
  [2, 5, 8],  // right column
  [0, 4, 8],  // diagonal top-left → bottom-right
  [2, 4, 6],  // diagonal top-right → bottom-left
];


// ── 4. Handle a Cell Click ───────────────────────────────────────────────────

function handleCellClick(event) {
  // Which cell was clicked?
  const cell = event.target;

  // Read its index from the HTML attribute data-index
  const index = cell.dataset.index;

  // Ignore click if the cell is already filled OR game is over
  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  // Place the current player's mark
  placeMark(cell, index);

  // Check if the current player just won
  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  // Check if it's a draw (all cells filled, no winner)
  if (checkDraw()) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  // If game continues, switch to the other player
  switchPlayer();
}


// ── 5. Place a Mark on the Board ─────────────────────────────────────────────

function placeMark(cell, index) {
  // Record the move in our game state array
  gameState[index] = currentPlayer;

  // Display the mark in the cell
  cell.textContent = currentPlayer;

  // Add a CSS class ("x" or "o") so we can colour it differently
  cell.classList.add(currentPlayer.toLowerCase());

  // Add "taken" class so hover effect and re-click are blocked
  cell.classList.add("taken");
}


// ── 6. Switch the Current Player ─────────────────────────────────────────────

function switchPlayer() {
  // Toggle between "X" and "O"
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Update the status message
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}


// ── 7. Check for a Winner ─────────────────────────────────────────────────────

function checkWinner() {
  // Loop through every winning combination
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;

    // Check if all three cells have the same player's mark
    if (
      gameState[a] !== "" &&          // cell is not empty
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      // Highlight the three winning cells
      highlightWinners([a, b, c]);
      return true;  // there is a winner!
    }
  }

  return false;  // no winner yet
}


// ── 8. Highlight Winning Cells ───────────────────────────────────────────────

function highlightWinners(indices) {
  indices.forEach(function(index) {
    cells[index].classList.add("winner");
  });
}


// ── 9. Check for a Draw ───────────────────────────────────────────────────────

function checkDraw() {
  // If every cell is filled and we're still here (no winner), it's a draw
  return gameState.every(function(cell) {
    return cell !== "";
  });
}


// ── 10. Reset / Restart the Game ─────────────────────────────────────────────

function resetGame() {
  // Reset all variables to their starting values
  currentPlayer = "X";
  gameState     = ["", "", "", "", "", "", "", "", ""];
  gameActive    = true;

  // Clear each cell in the HTML
  cells.forEach(function(cell) {
    cell.textContent = "";
    cell.classList.remove("x", "o", "taken", "winner");
  });

  // Reset the status message
  statusText.textContent = "Player X's Turn";
}


// ── 11. Attach Event Listeners ───────────────────────────────────────────────

// Listen for clicks on every cell
cells.forEach(function(cell) {
  cell.addEventListener("click", handleCellClick);
});

// Listen for a click on the reset button
resetBtn.addEventListener("click", resetGame);