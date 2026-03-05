class Block {
  constructor(x, y, w, h, col, isHorizontal, isTarget) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.isHorizontal = isHorizontal;
    this.isTarget = isTarget;
    this.cooldownUntil = 0; // For levels 2 and 3
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

    // Optional: Add a small icon to the target block
    if (this.isTarget) {
      fill(0, 50);
      noStroke();
      ellipse(
        this.x * blockSize + (this.w * blockSize) / 2,
        this.y * blockSize + (this.h * blockSize) / 2,
        20,
      );
    }
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
    if (frameCount < this.cooldownUntil) return;

    const hesProb = currentLevel === 2 ? 0.006 : currentLevel === 3 ? 0.012 : 0;
    if (hesProb > 0 && random(1) < hesProb) {
      this.cooldownUntil = frameCount + (currentLevel === 2 ? 10 : 16);
      return;
    }

    const startX = this.x;
    const startY = this.y;

    // 1. Find the grid cell the mouse is hovering over
    let targetX = floor(nx);
    let targetY = floor(ny);

    if (this.isHorizontal) {
      // If the mouse is to the right of the block's current X
      if (targetX > this.x && !this.collides(this.x + 1, this.y)) {
        if (this.x + this.w < 5) this.x += 1; // Boundary check + move
      }
      // If the mouse is to the left of the block's current X
      else if (targetX < this.x && !this.collides(this.x - 1, this.y)) {
        if (this.x > 0) this.x -= 1; // Boundary check + move
      }
    } else {
      // If the mouse is below the block's current Y
      if (targetY > this.y && !this.collides(this.x, this.y + 1)) {
        if (this.y + this.h < 5) this.y += 1;
      }
      // If the mouse is above the block's current Y
      else if (targetY < this.y && !this.collides(this.x, this.y - 1)) {
        if (this.y > 0) this.y -= 1;
      }
    }

    const moved = this.x !== startX || this.y !== startY;

    if (moved) {
      if (currentLevel === 2) this.cooldownUntil = frameCount + 15;
      if (currentLevel === 3) this.cooldownUntil = frameCount + 20;
      if (currentLevel === 4) this.cooldownUntil = frameCount + 30;
      if (currentLevel === 5) this.cooldownUntil = frameCount + 40;
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
