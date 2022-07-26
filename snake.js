class Snake {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.tail = [{ x: this.x, y: this.y }]
    this.rotateX = 0
    this.rotateY = 1
  }

  move() {
    let newRect

    if (this.rotateX === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateX === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y
      }
    } else if (this.rotateY === 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size
      }
    } else if (this.rotateY === -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size
      }
    }

    this.tail.shift()
    this.tail.push(newRect)
  }
}

class Apple {
  constructor() {
    let isTouching

    while(true) {
      isTouching = false

      this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
      this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size

      for (let i = 0; i < snake.tail.length; i++) {
        if (this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
          isTouching = true;
        }
      }

      this.color = 'yellow'
      this.size = snake.size

      if (!isTouching) {
        break
      }
    }
  }
}

const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')

const snake = new Snake(20, 20, 20)
let apple = new Apple()

const eatApple = () => {
  if (
    snake.tail[snake.tail.length - 1].x === apple.x &&
    snake.tail[snake.tail.length - 1].y === apple.y
  ) {
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
    apple = new Apple()
  }
}

const checkHitWall = () => {
  let headTail = snake.tail[snake.tail.length - 1]

  if (headTail.x === -snake.size) {
    headTail.x = canvas.width - snake.size
  } else if (headTail.x === canvas.width) {
    headTail.x = 0
  } else if (headTail.y === -snake.size) {
    headTail.y = canvas.height - snake.size
  } else if (headTail.y === canvas.height) {
    headTail.y = 0
  }
}

const update = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  snake.move()
  eatApple()
  checkHitWall()
}

const createRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color
  canvasContext.fillRect(x, y, width, height)
}

const draw = () => {
  createRect(0, 0, canvas.width, canvas.height, 'green')
  createRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < snake.tail.length; i++) {
    createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, 'red')
  }

  canvasContext.font = '20px Arial'
  canvasContext.fillStyle = '#ffffff'
  canvasContext.fillText(`Score: ${(snake.tail.length - 1)}`, (canvas.width - 120), 18)
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

const show = () => {
  update()
  draw()
}

const gameLoop = () => {
  setInterval(show, 1000 / 10) // 15 é o valor dos fps
}

window.addEventListener('keydown', (event) => {
  setTimeout(() => {
    if (event.keyCode === 37 && snake.rotateX !== 1) {
      snake.rotateX = -1
      snake.rotateY = 0
    } else if (event.keyCode === 38 && snake.rotateY !== 1) {
      snake.rotateX = 0
      snake.rotateY = -1
    } else if (event.keyCode === 39 && snake.rotateX !== -1) {
      snake.rotateX = 1
      snake.rotateY = 0
    } else if (event.keyCode === 40 && snake.rotateY !== -1) {
      snake.rotateX = 0
      snake.rotateY = 1
    }
  }, 1)
})

window.onload = () => {
  gameLoop()
}
