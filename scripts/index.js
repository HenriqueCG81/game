const canvas = document.getElementById('pacman');
const ctx = canvas.getContext('2d');

const ghost = new Plane();

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
  }

  // updateCanvas();
});

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.updateBackground();

  if (ghost.loaded) {
    ghost.draw();
  }

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
const game = new Game(ghost);
game.start();
