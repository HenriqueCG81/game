const restartButton = document.querySelector('button');
restartButton.addEventListener('click', () => {
  location.reload();
});

const canvas = document.getElementById('pacman');
const ctx = canvas.getContext('2d');

let secondsLeft = 30000;
const ghost = new Plane();
let score = 0;
let gameOver = false;

function displayGameOver() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.font = '90px monospace';
  ctx.fillText('Game Over', canvas.width / 2 - 200, canvas.height / 2);
  clearInterval(intervalId);
}

let intervalId;
function startTimer() {
  intervalId = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft -= 1;
      document.getElementById('timer').textContent = `Timer: ${Math.floor(
        secondsLeft / 1000
      )}`;
    } else {
      clearInterval(intervalId);
      gameOver = true;
      displayGameOver();
    }
  }, 1000);
  obstacles.forEach(obstacle => {
    if (obstacle.loaded) {
      obstacle.draw();
    }
    if (
      ghost.x < obstacle.x + obstacle.width &&
      ghost.x + 50 > obstacle.x &&
      ghost.y < obstacle.y + obstacle.height &&
      ghost.y + 50 > obstacle.y
    ) {
      clearInterval(intervalId);
      gameOver = true;
      displayGameOver();
    }
  });
}

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

  updateBullets();

  obstacles.forEach(obstacle => {
    obstacle.move();
    obstacle.draw();
  });
  document.getElementById('score').textContent = `Score: ${score}`;
  startTimer();
  if (!gameOver) {
    requestAnimationFrame(updateCanvas);
  }
}

let background;
const backgroundImage = new Image();
backgroundImage.src =
  'https://static.vecteezy.com/system/resources/thumbnails/003/706/970/original/4k-3d-seamless-loop-of-traveling-to-glow-stars-filed-on-black-background-graphic-motion-overlay-effect-loop-with-galaxy-sky-twinkling-light-in-the-space-animation-galaxy-exploration-free-video.jpg';

backgroundImage.addEventListener('load', () => {
  background = new Background(backgroundImage);

  for (let i = 0; i < 25; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * canvas.width + 80);
      y = Math.floor(Math.random() * canvas.height);
    } while (
      x < ghost.x + ghost.width &&
      x + Obstacle.width > ghost.x &&
      y < ghost.y + ghost.height &&
      y + Obstacle.height > ghost.y &&
      Obstacle.x > 100
    );
    {
    }

    obstacles.push(new Obstacle(x, y));
  }

  updateCanvas();
});

function updateBullets() {
  bullets.forEach(bullet => {
    bullet.move();
    if (bullet.x > canvas.width) {
      bullets.splice(bullets.indexOf(bullet), 1);
    } else {
      obstacles.forEach(obstacle => {
        if (obstacle.loaded) {
          if (
            bullet.x < obstacle.x + obstacle.width &&
            bullet.x + bullet.width > obstacle.x &&
            bullet.y < obstacle.y + obstacle.height &&
            bullet.y + bullet.height > obstacle.y
          ) {
            bullets.splice(bullets.indexOf(bullet), 1);
            obstacles.splice(obstacles.indexOf(obstacle), 1);
            score += 10;
          }
        }
      });
    }
  });
}
