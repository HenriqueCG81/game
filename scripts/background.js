class Background {
  constructor(img, score) {
    this.img = img;
    this.x = 0;
    this.speed = -1;
    this.score = 0;
  }

  move() {
    this.x += this.speed;
    this.x %= canvas.width;
  }

  draw() {
    ctx.drawImage(this.img, this.x, 0);

    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }

  updateBackground() {
    this.move();
    this.draw();
  }
}