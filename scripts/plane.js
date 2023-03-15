class Plane {
  // this will be the starting position of our ghost
  constructor() {
    this.x = 25;
    this.y = 25;
    this.loaded = false;

    const img = new Image();
    img.addEventListener('load', () => {
      // once the image is loaded, draw it
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
