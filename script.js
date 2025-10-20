const gridContainer = document.querySelector(".grid-container");
const scoreContainer = document.querySelector(".score-container");

let grid = Array(4)
  .fill()
  .map(() => Array(4).fill(0));

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

createGrid();
