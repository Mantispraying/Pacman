document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 28 // 28x28 = 784 squares
  let score = 0

  // layout of grid and what is in the squares
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]

  const squares = []

  // Legend:
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  // Draw the grid and render it

  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      // add layout to the board

      if (layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      }
      else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      }
      else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      }
      else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      }
    }
  }
  createBoard()

  // Starting position of pac-man

  let pacmanCurrentIndex = 490

  squares[pacmanCurrentIndex].classList.add('pac-man')

  // Move pac-man
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch (e.keyCode) {

      // Left
      case 37:
        if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair'))
          pacmanCurrentIndex -= 1

        // Check if pac-man is in the left exit
        if (pacmanCurrentIndex - 1 === 363) {
          pacmanCurrentIndex = 391
        }

        break

      // Up
      case 38:
        if (pacmanCurrentIndex - width > 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair'))
          pacmanCurrentIndex -= width
        break

      // Right
      case 39:
        if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair'))
          pacmanCurrentIndex += 1

        // Check if pac-man is in the right exit
        if (pacmanCurrentIndex + 1 === 392) {
          pacmanCurrentIndex = 364
        }

        break

      // Down
      case 40:
        if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair'))
          pacmanCurrentIndex += width
        break
    }

    squares[pacmanCurrentIndex].classList.add('pac-man')

    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()

  }

  document.addEventListener('keyup', movePacman)

  // What happens when pac-man eats a pac-dot

  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
  }

  // What happens when pac-man eats a power pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score += 10
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

  // unscaring the ghosts
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // Ghost template
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
    }
  }

  ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
  ]

  // Drawing ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  });

  // Move the ghosts
  ghosts.forEach(ghost => {
    moveGhost(ghost)
  });

  // Function to move ghosts
  function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
      // if the next square does NOT contain a wall or a ghost, it can go there
      if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
        // proceed
        // remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        // change the current index to new safe square
        ghost.currentIndex += direction
        // redraw the ghost in the new safe square
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
      // else find new direction
      else
        direction = directions[Math.floor(Math.random() * directions.length)]

      // if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      // if the ghost is scared and pac-man runs into it
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score += 100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
      checkForGameOver()
    }, ghost.speed)
  }

  // Check for a game over
  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function () { alert('GAME OVER!', 500) })
    }
  }

  // Check for a win
  function checkForWin() {
    if (score === 274) {
      ghost.forEach(ghost => clearInterval(ghost.timerId))
      document, removeEventListener('keyup', movePacman)
      scoreDisplay.innerHTML = "YOU WIN!"
    }
  }
})