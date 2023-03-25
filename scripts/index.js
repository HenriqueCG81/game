showWelcomeMessage();

function showWelcomeMessage() {
  const name = prompt('Digite seu nome:');
  const message = 'Welcome to the experience River Space, ' + name + '!';
  document.getElementById('welcome-message').innerHTML = message;
}
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
  updateCanvas();
  startButton.classList.add('hidden');
});
const restartButton = document.getElementById('reset');
restartButton.addEventListener('click', () => {
  location.reload();
});
const canvas = document.getElementById('pacman');
const ctx = canvas.getContext('2d');
const ghost = new Plane();
const ammoSound = document.getElementById('ammoSound');
const bulletSound = document.getElementById('bulletSound');

let gameOver = false;
let secondsLeft = 60000;
let score = 0;
let bulletCount = 20;

function displayGameOver() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.font = '90px monospace';
  ctx.fillText(`Game Over`, canvas.width / 2 - 200, canvas.height / 2);

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
      if (ghost.y > 10) {
        ghost.moveUp();
        break;
      }

    case 'ArrowDown':
      if (ghost.y < 500) {
        ghost.moveDown();
        break;
      }
    case 'ArrowLeft':
      if (ghost.x > 0) {
        ghost.moveLeft();
        break;
      }
    case 'ArrowRight':
      ghost.moveRight();
      break;
    case ' ':
      if (bulletCount) {
        bullets.push(new Bullet(ghost.x, ghost.y));
        bulletCount--;
        tiro.currentTime = 0;
        tiro.play();
        document.getElementById(
          'bullet-count'
        ).textContent = `Bullets: ${bulletCount}.`;
      }
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
  ammoBoxes.forEach(ammobox => {
    ammobox.draw();
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
      Obstacle.x > 100 &&
      Obstacle.x < 750 &&
      Obstacle.y < 550
    );

    obstacles.push(new Obstacle(x, y));
  }
  for (let i = 0; i < 5; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * canvas.width + 80);
      y = Math.floor(Math.random() * canvas.height);
    } while (
      x < ghost.x + ghost.width &&
      x + AmmoBox.width > ghost.x &&
      y < ghost.y + ghost.height &&
      y + AmmoBox.height > ghost.y &&
      AmmoBox.x > 100 &&
      AmmoBox.x < 750 &&
      AmmoBox.y < 550
    );

    ammoBoxes.push(new AmmoBox(x, y));
  }
});

function updateBullets() {
  bullets.forEach(bullet => {
    bullet.move();
    0;
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
            bullet.hit = true;
            if (!bulletSound.paused) {
              bulletSound.pause();
              bulletSound.currentTime = 0;
            }
            bulletSound.play();
            bullets.splice(bullets.indexOf(bullet), 1);
            obstacles.splice(obstacles.indexOf(obstacle), 1);
            score += 10;
          }
        }
      });
    }
    ammoBoxes.forEach(ammobox => {
      if (
        bullet.x < ammobox.x + ammobox.width &&
        bullet.x + bullet.width > ammobox.x &&
        bullet.y < ammobox.y + ammobox.height &&
        bullet.y + bullet.height > ammobox.y
      ) {
        bullet.hit = true;
        if (!bulletSound.paused) {
          bulletSound.pause();
          bulletSound.currentTime = 0;
        }
        bulletSound.play();
        ammoSound.play();
        bullets.splice(bullets.indexOf(bullet), 1);
        ammoBoxes.splice(ammoBoxes.indexOf(ammobox), 1);
        bulletCount += 5;
        document.getElementById(
          'bullet-count'
        ).textContent = `Bullets: ${bulletCount}.`;
      }
    });
  });
}
