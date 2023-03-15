class Background {
  constructor(img) {
    this.img = img;
    this.x = 0;
    this.speed = -1;
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
const obstacles = [];
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.loaded = false;

    const img = new Image();
    img.addEventListener('load', () => {
      this.loaded = true;
      this.img = img;
      this.draw();
    });
    img.src = '/alien-in-spaceship.gif';
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

for (let i = 0; i < 10; i++) {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * canvas.height);
  obstacles.push(new Obstacle(x, y));
}
