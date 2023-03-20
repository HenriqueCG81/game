class Plane {
  constructor() {
    this.x = 25;
    this.y = 25;
    this.loaded = false;

    const img = new Image();
    img.addEventListener('load', () => {
      this.loaded = true;
      this.img = img;
      this.draw();
    });

    img.src = '/aviao-e-aeronave-imagem-animada-0057.gif';
  }

  moveUp() {
    this.y -= 25;
  }

  moveDown() {
    this.y += 25;
  }

  moveLeft() {
    this.x -= 25;
  }

  moveRight() {
    this.x += 25;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x + 45;
    this.y = y + 25;
    this.speed = 3;
    this.width = 12;
    this.height = 3;
    this.hit = false;
  }

  move() {
    this.x += this.speed;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const bullets = [];

const obstacles = [];
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.loaded = false;
    this.direction = 'down';
    const img = new Image();
    img.addEventListener('load', () => {
      this.loaded = true;
      this.img = img;
      this.draw();
    });
    img.src = '/alien-in-spaceship.gif';
  }
  draw() {
    if (this.loaded) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.direction === 'down') {
      this.y += 2;
      if (this.y + this.height >= canvas.height) {
        this.direction = 'up';
      }
    } else {
      this.y -= 2;
      if (this.y <= 0) {
        this.direction = 'down';
      }
    }
  }
}
