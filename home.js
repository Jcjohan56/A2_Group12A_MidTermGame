let gameState = "home"; // "home" or "game"
let playBtn = { x: 0, y: 0, w: 200, h: 60 };

function drawHome() {
  background(40);

  noStroke();
  fill(30, 100, 200);
  rect(0, 0, width, height);

  // Title
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  textStyle(BOLD);
  text("Let Me Out!", width / 2, height * 0.3);

  // Button logic
  playBtn.x = width / 2 - playBtn.w / 2;
  playBtn.y = height * 0.6;

  let hovering =
    mouseX > playBtn.x &&
    mouseX < playBtn.x + playBtn.w &&
    mouseY > playBtn.y &&
    mouseY < playBtn.y + playBtn.h;

  // Draw Button
  stroke(255);
  strokeWeight(2);
  fill(hovering ? 60 : 40);
  rect(playBtn.x, playBtn.y, playBtn.w, playBtn.h, 10);

  noStroke();
  fill(255);
  textSize(24);
  text("START GAME", width / 2, playBtn.y + playBtn.h / 2);
}

function setup() {
  createCanvas(500, 800);
  loadLevel(currentLevel);
}

function draw() {
  if (gameState === "home") {
    drawHome();
  } else {
    // This calls the game logic from your sketch.js
    runGame();
  }
}

function mousePressed() {
  if (gameState === "home") {
    if (
      mouseX > playBtn.x &&
      mouseX < playBtn.x + playBtn.w &&
      mouseY > playBtn.y &&
      mouseY < playBtn.y + playBtn.h
    ) {
      gameState = "game";
    }
  } else {
    handleGameMousePressed();
  }
}

