const grid = document.getElementById('grid')
const pauseBtn = document.getElementById('pauseBtn')
const rows = 64
const cols = 64

let cells = Array.from({ length: rows }, () => Array(cols).fill(false))
let paused = false

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.dataset.row = row
    cell.dataset.col = col
    cell.addEventListener('click', () => {
      if (paused) {
        toggleTile(row, col)
      }
    })
    grid.appendChild(cell)
  }
}

function updateGridDisplay() {
  const cellElements = document.querySelectorAll('.cell')
  cellElements.forEach((cell) => {
    const row = +cell.dataset.row
    const col = +cell.dataset.col
    if (cells[row][col]) {
      cell.classList.add('on')
    } else {
      cell.classList.remove('on')
    }
  })
}

function randomizeGrid() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells[row][col] = Math.random() > 0.5
    }
  }
  updateGridDisplay()
}

function getLiveNeighbors(row, col) {
  let liveCount = 0
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if ((r === row && c === col) || r < 0 || r >= rows || c < 0 || c >= cols) {
        continue
      }
      if (cells[r][c]) {
        liveCount++
      }
    }
  }
  return liveCount
}

function nextGeneration() {
  const newCells = Array.from({ length: rows }, () => Array(cols).fill(false))

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const liveNeighbors = getLiveNeighbors(row, col)
      if (cells[row][col]) {
        newCells[row][col] = liveNeighbors === 2 || liveNeighbors === 3
      } else {
        newCells[row][col] = liveNeighbors === 3
      }
    }
  }
  cells = newCells
  updateGridDisplay()
}

function toggleTile(row, col) {
  cells[row][col] = !cells[row][col]
  updateGridDisplay()
}

pauseBtn.addEventListener('click', () => {
  paused = !paused
  pauseBtn.textContent = paused ? 'Resume' : 'Pause'
})

randomizeGrid()
setInterval(() => {
  if (!paused) {
    nextGeneration()
  }
}, 250)
