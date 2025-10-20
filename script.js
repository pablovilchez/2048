const gridContainer = document.querySelector(".grid-container");
const scoreContainer = document.querySelector(".score-container");

let grid;
let score = 0;


function initGame() {
  grid = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  score = 0;
  updateScore();
  addRandomTile();
  addRandomTile();
  createGrid();
}

function createGrid() {
  gridContainer.innerHTML = "";
  grid.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      if (cell) {
        cellDiv.textContent = cell;
        cellDiv.classList.add(`tile-${cell}`);
      }
      gridContainer.appendChild(cellDiv);
    });
  });
}

function addRandomTile() {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  if (emptyCells.length === 0) return;
  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function slideCells(row) {
  row = row.filter((v) => v !== 0);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  row = row.filter((v) => v !== 0);
  while (row.length < 4) row.push(0);
  return row;
}




function updateScore() {
  scoreContainer.textContent = score;
}

function checkWin() {
  if (grid.some((row) => row.some((cell) => cell === 2048))) {
    return true;
  }
  return false;
}

function checkLoss() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) return false;
      if (j < 3 && grid[i][j] === grid[i][j + 1]) return false;
      if (i < 3 && grid[i][j] === grid[i + 1][j]) return false;
    }
  }
  return true;
}

function checkGameStatus() {
  if (checkWin()) {
    alert("You win!");
  } else if (checkLoss()) {
    alert("You lose!");
  }
}


document.addEventListener("keydown", (e) => {
  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    moveTiles(e.key.replace("Arrow", ""));
  }
});

document.querySelector("#restart-btn").addEventListener("click", initGame);

initGame();