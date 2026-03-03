let currentLevel = 0;

function loadLevel(num) {
  blocks = []; // Clear existing blocks
  let data = levelData[num].blocks;

  for (let b of data) {
    blocks.push(
      new Block(b.x, b.y, b.w, b.h, color(b.col), b.isHoriz, b.isTarget),
    );
  }
}

// In your Win Condition check:
if (blocks[0].x >= 3) {
  currentLevel++;
  if (currentLevel < levelData.length) {
    loadLevel(currentLevel);
  } else {
    text("GAME COMPLETE!", width / 2, height / 2);
  }
}
