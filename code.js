# script
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const startButton = document.getElementById('start-button');
  const scoreDisplay = document.getElementById('score');
  const width = 10;
  const height = 10;
  let squares = [];
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let appleIndex = 0;
  let score = 0;
  let intervalTime = 1000;
  let intervalId = 0;

  function createGrid() {
    for (let i = 0; i < width * height; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createGrid();

  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(intervalId);
    currentSnake = [2, 1, 0];
    score = 0;
    direction = 1;
    scoreDisplay.textContent = score;
    intervalTime = 1000;
    generateApple();
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    intervalId = setInterval(move, intervalTime);
  }

  function move() {
    if (
      (currentSnake[0] % width === width - 1 && direction === 1) || // hitting right wall
      (currentSnake[0] % width === 0 && direction === -1) || // hitting left wall
      (currentSnake[0] - width < 0 && direction === -width) || // hitting top wall
      (currentSnake[0] + width >= width * height && direction === width) || // hitting bottom wall
      squares[currentSnake[0] + direction].classList.contains('snake') // hitting self
    ) {
      return clearInterval(intervalId);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      generateApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(intervalId);
      intervalTime *= 0.9;
      intervalId = setInterval(move, intervalTime);
    }

    squares[currentSnake[0]].classList.add('snake');
  }

  function generateApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
  }

  function control(e) {
    if (e.keyCode === 39) {
      direction = 1; // right
    } else if (e.keyCode === 38) {
      direction = -width; // up
    } else if (e.keyCode === 37) {
      direction = -1; // left
    } else if (e.keyCode === 40) {
      direction = width; // down
    }
  }

  document.addEventListener('keydown', control);
  startButton.addEventListener('click', startGame);
});
