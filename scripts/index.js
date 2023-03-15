const canvas = document.getElementById('pacman');
const ctx = canvas.getContext('2d');

const ghost = new Plane();
const obstacle = new Obstacle();
// we'll listen to the keys being pressed and
// call the ghost methods accordingly
document.addEventListener('keydown', event => {
  event.preventDefault();
  switch (event.key) {
    case 'ArrowUp':
      if (ghost.y > 0) {
        ghost.moveUp();
      }
      break;
    case 'ArrowDown':
      ghost.moveDown();
      break;
    case 'ArrowLeft':
      ghost.moveLeft();
      break;
    case 'ArrowRight':
      ghost.moveRight();
      break;
    case ' ':
      bullets.push(new Bullet(ghost.x, ghost.y));
      break;
  }

  // updateCanvas();
});

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.updateBackground();

  if (ghost.loaded) {
    ghost.draw();
  }
  bullets.forEach(bullet => {
    bullet.draw();
  });

  obstacles.forEach(obstacle => {
    if (obstacle.loaded) {
      obstacle.draw();
    }
  });

  updateBullets();
  requestAnimationFrame(updateCanvas);
}

let background;
const backgroundImage = new Image();
backgroundImage.src =
  'https://static.vecteezy.com/system/resources/thumbnails/003/706/970/original/4k-3d-seamless-loop-of-traveling-to-glow-stars-filed-on-black-background-graphic-motion-overlay-effect-loop-with-galaxy-sky-twinkling-light-in-the-space-animation-galaxy-exploration-free-video.jpg';

backgroundImage.addEventListener('load', () => {
  background = new Background(backgroundImage);
  updateCanvas();
});

function updateBullets() {
  bullets.forEach(bullet => {
    bullet.move();
    if (bullet.x > canvas.width) {
      // remove a bala quando ela sai da tela
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  });
}
