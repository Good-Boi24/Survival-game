//Rewrite this letter to reset the game => 0

var canvas = document.getElementById("canvas");
var scoreP1 = document.getElementById("soreP1");
var scoreP2 = document.getElementById("soreP2");
var ctx = canvas.getContext("2d");
var PH = 80;
var PW = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballXdir = 1;
var ballYdir = 1;
var ballRadius = 10;
var paddleLeftX = 30;
var paddleLeftY = canvas.height / 2 - PH / 2;
var paddleRightX = canvas.width - paddleLeftX - PW;
var paddleRightY = canvas.height / 2 - PH / 2;
var paddleSpeed = 5;
var leftScore = 0;
var rightScore = 0;

window.addEventListener("keydown", function (e) {
  if (e.key == "w" && paddleLeftY >= 0) {
    paddleLeftY = paddleLeftY - paddleSpeed;
  } else if (e.key == "s" && paddleLeftY + PH <= canvas.height) {
    paddleLeftY = paddleLeftY + paddleSpeed;
  }

  if (e.key == "ArrowUp" && paddleRightY >= 0) {
    paddleRightY = paddleRightY - paddleSpeed;
  } else if (e.key == "ArrowDown" && paddleRightY + PH <= canvas.height) {
    paddleRightY = paddleRightY + paddleSpeed;
  }
});

const changeScore = () => {
  if (ballX == canvas.width - ballRadius) {
    leftScore = leftScore + 1;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  if (ballX == ballRadius) {
    rightScore = rightScore + 1;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }
};

const drawScore = () => {
  scoreP1.innerText = leftScore;
  scoreP2.innerText = rightScore;
};

const drawLeftPaddle = () => {
  // Draw the left paddle
  ctx.fillStyle = "red";
  //detect when the up and down arrow keys are being pressed and change the position of the paddles
  //paddleLeftY = paddleLeftY + 1

  ctx.fillRect(paddleLeftX, paddleLeftY, PW, PH);
};

const drawRightPaddle = () => {
  // Draw the right paddle
  ctx.fillStyle = "red";
  ctx.fillRect(paddleRightX, paddleRightY, PW, PH);
};
const drawCanvas = () => {
  // Colour the canvas
  try {
    ctx.fillStyle = "#3bd9b1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    moveBall();
    drawLeftPaddle();
    drawRightPaddle();
    drawScore();
    changeScore();
  } catch (e) {
    console.log(e);
  }
};

const moveBall = () => {
  // Change ball position
  //Draw the ball
  ctx.beginPath();
  ctx.fillStyle = "#dfff4f";
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  //ctx.drawImage(img, ballX, ballY, ballRadius, ballRadius);
  ctx.fill();
  ctx.stroke();

  if (ballY === canvas.height - ballRadius || ballY === ballRadius) {
    ballYdir = ballYdir * -1;
  }

  if (
    ballX === canvas.width - ballRadius ||
    ballX === ballRadius ||
    (ballX === paddleLeftX + PW + ballRadius &&
      ballY >= paddleLeftY &&
      ballY <= paddleLeftY + PH) ||
    (ballX === paddleRightX - ballRadius &&
      ballY >= paddleRightY &&
      ballY <= paddleRightY + PH)
  ) {
    ballXdir = ballXdir * -1;
  }

  ballX = ballX + ballXdir;
  ballY = ballY + ballYdir;
};

setInterval(drawCanvas, 10);

//if ballx is 0  then add 1 to score right if ballx is 400 then add 1 to score left
