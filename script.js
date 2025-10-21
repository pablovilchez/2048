const gridContainer = document.querySelector(".grid-container");
const scoreContainer = document.querySelector(".score-container");

let grid;
let score = 0;
let gridDivs = Array(4)
  .fill()
  .map(() => Array(4).fill(null));

function initGame() {
  grid = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  score = 0;
  updateScore();
  gridContainer.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      const x = j * 90;
      const y = i * 90;
      cellDiv.style.transform = `translate(${x}px, ${y}px)`;
      gridContainer.appendChild(cellDiv);
      gridDivs[i][j] = cellDiv;
    }
  }

  addRandomTile();
  addRandomTile();
}

function updateGrid(newTilePos = null) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const value = grid[i][j];
      const cellDiv = gridDivs[i][j];

      cellDiv.className = "cell";
      if (value) {
        cellDiv.classList.add(`tile-${value}`);
      }

      cellDiv.textContent = value || "";

      const x = j * 90;
      const y = i * 90;

      cellDiv.style.transform = `translate(${x}px, ${y}px)`;


      if (newTilePos && newTilePos.row === i && newTilePos.col === j) {
        cellDiv.style.setProperty(
          "--final-position",
          `translate(${x}px, ${y}px)`
        );
        cellDiv.style.transform = `translate(${x}px, ${y}px)`;
        cellDiv.classList.add("new-tile");

        setTimeout(() => {
          cellDiv.classList.remove("new-tile");
        }, 300);
      } else {
        cellDiv.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  }
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

  const { row, col } =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[row][col] = Math.random() < 0.9 ? 2 : 4;

  updateGrid({ row, col });
}

function compressRow(row) {
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

function handleKeyPressed(direction) {
  if (direction === "Up") {
    grid = rotateGrid(false);
  } else if (direction === "Down") {
    grid = rotateGrid(true);
  } else if (direction === "Right") {
    grid = grid.map((row) => row.reverse());
  }

  const previousGrid = JSON.stringify(grid);
  grid = grid.map(compressRow);
  const hasChanged = JSON.stringify(grid) !== previousGrid;

  if (direction === "Up") {
    grid = rotateGrid(true);
  } else if (direction === "Down") {
    grid = rotateGrid(false);
  } else if (direction === "Right") {
    grid = grid.map((row) => row.reverse());
  }

  if (hasChanged) {
    addRandomTile();
    updateScore();
    checkGameStatus();
  }
}

function rotateGrid(clockwise) {
  const newGrid = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[j][i] = clockwise ? grid[3 - i][j] : grid[i][3 - j];
    }
  }
  return newGrid;
}

function updateScore() {
  document.getElementById("score").textContent = score;
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

function showGameOverModal(won) {
  const existingModal = document.querySelector(".game-over");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "game-over";

  const content = document.createElement("div");
  content.className = "game-over-content";

  const title = document.createElement("h2");
  title.textContent = won ? "You Win! 🎉" : "Game Over";

  const message = document.createElement("p");
  message.textContent = won
    ? "Congratulations! You've reached 2048!"
    : "No more moves available.";

  const finalScore = document.createElement("div");
  finalScore.className = "final-score";
  finalScore.textContent = `Final Score: ${score}`;

  const restartButton = document.createElement("button");
  restartButton.className = "restart-button";
  restartButton.textContent = "Try Again";
  restartButton.addEventListener("click", () => {
    modal.remove();
    initGame();
  });

  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(finalScore);
  content.appendChild(restartButton);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

function checkGameStatus() {
  if (checkWin()) {
    showGameOverModal(true);
  } else if (checkLoss()) {
    showGameOverModal(false);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    handleKeyPressed(e.key.replace("Arrow", ""));
  }
});

document.querySelector("#restart-btn").addEventListener("click", initGame);

initGame();
