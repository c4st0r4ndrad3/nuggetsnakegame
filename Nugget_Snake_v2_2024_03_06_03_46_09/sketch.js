// Define variables
let snake;
let food;
let tileSize = 30; // Increase the size of each tile
let snakeImg, foodImg;
let score = 0; // Initialize score variable
let gameOver = false; // Initialize game over variable
let gameStarted = false; // Initialize game started variable

// Preload images
function preload() {
  snakeImg = loadImage('https://i.ibb.co/7tK7zbD/nuggetsnake.png');
  foodImg = loadImage('https://i.ibb.co/yfZ3VN6/sol.png');
}

// Setup function
function setup() {
  createCanvas(600, 600); // Increase canvas size
  snake = new Snake();
  food = createFood();
  frameRate(10);
}

// Draw function
function draw() {
  background(0);

  if (!gameStarted) {
    // Display start screen with instructions
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Press Enter to Start", width / 2, height / 2 - 50);
    textSize(24);
    text("Use Arrow Keys to Move", width / 2, height / 2);
    text("Eat Solana to Grow", width / 2, height / 2 + 30);
  } else if (!gameOver) {
    // Move and display snake
    snake.update();
    snake.show();

    // Check if snake eats food
    if (snake.eat(food)) {
      food = createFood();
      score++; // Increase score when snake eats food
    }

    // Display food image
    image(foodImg, food.x, food.y, tileSize, tileSize);

    // Display score
    fill(255);
    textSize(16);
    text("Score: " + score, 20, 30);
  } else {
    // Display game over screen
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Game Over", width / 2, height / 2 - 50);
    textSize(24);
    text("Score: " + score, width / 2, height / 2);
    textSize(16);
    text("Press 'R' to restart", width / 2, height / 2 + 50);
  }
}

// Create food at random position
function createFood() {
  let cols = floor(width / tileSize);
  let rows = floor(height / tileSize);
  let foodPos = createVector(floor(random(cols)), floor(random(rows)));
  foodPos.mult(tileSize);
  return foodPos;
}

// Snake class
class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xdir = 0;
    this.ydir = 0;
  }

  // Update snake position
  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir * tileSize;
    head.y += this.ydir * tileSize;
    this.body.push(head);

    // Check if snake hits walls or itself
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height || this.hitBody()) {
      gameOver = true;
    }
  }

  // Display snake
  show() {
    for (let i = 0; i < this.body.length; i++) {
      image(snakeImg, this.body[i].x, this.body[i].y, tileSize, tileSize);
    }
  }

  // Check if snake eats food
  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.body.push(createVector(pos.x, pos.y));
      return true;
    }
    return false;
  }

  // Check if snake hits itself
  hitBody() {
    let head = this.body[this.body.length - 1];
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (head.x === part.x && head.y === part.y) {
        return true;
      }
    }
    return false;
  }
}

// Control snake direction with arrow keys
function keyPressed() {
  if (!gameOver && gameStarted) {
    if (keyCode === UP_ARROW) {
      snake.xdir = 0;
      snake.ydir = -1;
    } else if (keyCode === DOWN_ARROW) {
      snake.xdir = 0;
      snake.ydir = 1;
    } else if (keyCode === LEFT_ARROW) {
      snake.xdir = -1;
      snake.ydir = 0;
    } else if (keyCode === RIGHT_ARROW) {
      snake.xdir = 1;
      snake.ydir = 0;
    }
  } else if (gameOver && (key === 'r' || key === 'R')) {
    resetGame();
  } else if (!gameStarted && (keyCode === ENTER || keyCode === RETURN)) {
    gameStarted = true;
  }
}

// Reset the game
function resetGame() {
  snake = new Snake();
  food = createFood();
  score = 0;
  gameOver = false;
  gameStarted = false;
}
