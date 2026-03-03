let blockSize = 80;
let blocks = [];
let draggingBlock = null;
let offsetX, offsetY;

function setup() {
  createCanvas(400, 400);

  // 1. The Yellow Block (Goal: Reach the right exit)
  // x, y, width(in cells), height(in cells), color, isHorizontal
  blocks.push(new Block(0, 2, 2, 1, color(255, 255, 0), true, true));

  // 2. Three White Starter Blocks (Strategic but simple placement)
  blocks.push(new Block(2, 0, 1, 2, color(255), false, false)); // Vertical
  blocks.push(new Block(3, 1, 2, 1, color(255), true, false)); // Horizontal
  blocks.push(new Block(4, 3, 1, 2, color(255), false, false)); // Vertical
}

function draw() {
  background(220);
  drawGrid();

  for (let b of blocks) {
    b.display();
  }

  // Check for Win Condition
  if (blocks[0].x >= 3) {
    fill(0, 150, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("LEVEL CLEARED!", width / 2, height / 2);
  }
}

function drawGrid() {
  stroke(200);
  for (let i = 0; i <= width; i += blockSize) {
    line(i, 0, i, height);
    line(0, i, width, i);
  }
  // Exit Marker
  noStroke();
  fill(255, 200, 0, 100);
  rect(width - 10, 2 * blockSize, 10, blockSize);
}

class Block {
  constructor(x, y, w, h, col, isHorizontal, isTarget) {
    this.x = x; // Grid units
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.isHorizontal = isHorizontal;
    this.isTarget = isTarget;
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(this.col);
    rect(
      this.x * blockSize + 5,
      this.y * blockSize + 5,
      this.w * blockSize - 10,
      this.h * blockSize - 10,
      5,
    );
  }

  contains(mx, my) {
    return (
      mx > this.x * blockSize &&
      mx < (this.x + this.w) * blockSize &&
      my > this.y * blockSize &&
      my < (this.y + this.h) * blockSize
    );
  }

  moveTo(nx, ny) {
    // Round to nearest grid slot
    let targetX = round(nx);
    let targetY = round(ny);

    // Boundary checks
    targetX = constrain(targetX, 0, 5 - this.w);
    targetY = constrain(targetY, 0, 5 - this.h);

    // Collision detection with other blocks
    if (!this.collides(targetX, targetY)) {
      this.x = targetX;
      this.y = targetY;
    }
  }

  collides(tx, ty) {
    for (let other of blocks) {
      if (other === this) continue;
      if (
        tx < other.x + other.w &&
        tx + this.w > other.x &&
        ty < other.y + other.h &&
        ty + this.h > other.y
      ) {
        return true;
      }
    }
    return false;
  }
}

function mousePressed() {
  for (let b of blocks) {
    if (b.contains(mouseX, mouseY)) {
      draggingBlock = b;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingBlock) {
    let newX = draggingBlock.x;
    let newY = draggingBlock.y;

    if (draggingBlock.isHorizontal) {
      newX = (mouseX - blockSize) / blockSize;
    } else {
      newY = (mouseY - blockSize) / blockSize;
    }
    draggingBlock.moveTo(newX, newY);
  }
}

function mouseReleased() {
  draggingBlock = null;
}

// Touch support
function touchStarted() {
  mousePressed();
  return false;
}
function touchMoved() {
  mouseDragged();
  return false;
}
function touchEnded() {
  mouseReleased();
  return false;
}
