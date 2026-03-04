let blockSize = 80;
let blocks = [];
let draggingBlock = null;
let currentLevel = 0;
let gameCleared = false;

function setup() {
  createCanvas(500, windowHeight);
  loadLevel(currentLevel);
}

function loadLevel(idx) {
  blocks = [];
  gameCleared = false;
  let data = levels[idx].blocks;
  for (let b of data) {
    blocks.push(
      new Block(b.x, b.y, b.w, b.h, color(b.col), b.isHoriz, b.isTarget),
    );
  }
}

function runGame() {
  noStroke();
  background(40);

  fill(30, 100, 200);
  rect(0, 0, width, height);

  if (currentLevel === 0 && !gameCleared) {
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(25);
    text("TUTORIAL", width / 2, 40);

    textStyle(NORMAL);
    textSize(14);
    text("Slide the blocks to clear a path.", width / 2, 70);
    text("Drag the yellow block to the exit!", width / 2, 85);
  } else if (!gameCleared) {
    fill(255);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textSize(25);
    text("LEVEL " + currentLevel, width / 2, 60);
  }

  push();
  let xOffset = (width - 400) / 2;
  let yOffset = (height - 400) / 2;
  translate(xOffset, yOffset);

  fill(220);
  rect(0, 0, 400, 400);

  drawGrid();

  for (let b of blocks) {
    b.display();
  }
  pop();

  if (blocks[0].isTarget && blocks[0].x >= 3) {
    gameCleared = true;

    if (currentLevel === 0) {
      overlayMessage("TUTORIAL CLEARED!");
    } else {
      overlayMessage("LEVEL " + currentLevel + " CLEARED!");
    }
  }
}

function drawGrid() {
  // Stroke is only activated here for the lines
  stroke(190);
  strokeWeight(2);

  for (let i = 0; i <= 400; i += blockSize) {
    line(i, 0, i, 400);
    line(0, i, 400, i);
  }

  // Exit Marker - reset to noStroke so the yellow box has no border
  noStroke();
  fill(255, 200, 0, 150);
  rect(400 - 14, 2 * blockSize, 15, blockSize);
}

function overlayMessage(msg) {
  fill(0, 150);
  rect(0, 0, width, height);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(msg, width / 2, height / 2);
  textSize(16);
  text("Click to continue", width / 2, height / 2 + 40);
}

// --- Input Handling ---

let topOffset = 100;

function handleGameMousePressed() {
  // We must use the same dynamic offsets as the draw function
  let xOffset = (width - 400) / 2;
  let yOffset = (height - 400) / 2;

  let adjustedX = mouseX - xOffset;
  let adjustedY = mouseY - yOffset;

  if (gameCleared) {
    currentLevel++;
    loadLevel(currentLevel % levels.length);
    return;
  }

  for (let b of blocks) {
    if (b.contains(adjustedX, adjustedY)) {
      draggingBlock = b;
      return;
    }
  }
}

function mouseDragged() {
  if (draggingBlock) {
    let xOffset = (width - 400) / 2;
    let yOffset = (height - 400) / 2;

    let mouseGridX = (mouseX - xOffset) / blockSize;
    let mouseGridY = (mouseY - yOffset) / blockSize;

    draggingBlock.moveTo(mouseGridX, mouseGridY);
  }
}

function mouseReleased() {
  draggingBlock = null;
}

// Touch support stays the same as it calls the updated mouse functions
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
