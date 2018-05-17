var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var size = 100;
var sizeOfSquares = 25;
var ant = {
  x: size/2,
  y: size/2,
  dir: 0
};
var steps = 0;

var board = [];

function startUp() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  for (var j = 0; j < size; j++) {
    var tempArray = [];
    for (var m = 0; m < size; m++) {
      tempArray.push(false);
    }
    board.push(tempArray);
  }

  context.fillStyle = "blue";

  for (var i = 0; i < board.length; i++) {
    for (var n = 0; n < board[i].length; n++) {
      context.fillRect(n * (sizeOfSquares + 5), i * (sizeOfSquares + 5), sizeOfSquares, sizeOfSquares);
    }
  }

  draw();
}

function draw() {
  // Change Direction

  if (board[ant.y][ant.x]) {
    ant.dir -= 90;
    context.fillStyle = "blue"; // Have this here so that I don't have to make a seperate if statement and slow down the computer
  } else {
    ant.dir += 90;
    context.fillStyle = "red"; // They are opposites the usual because it changes the state later
  }

  // Make direction in between 0 and 360

  ant.dir %= 360;
  if (ant.dir < 0) {
    ant.dir += 360;
  }

  // Change state of square ant is on

  board[ant.y][ant.x] = !board[ant.y][ant.x];

  // Draw the change in state

  // if (board[ant.y][ant.x]) {
  //   context.fillStyle = "red";
  // } else {
  //   context.fillStyle = "blue";
  // }
  context.fillRect(ant.x * (sizeOfSquares + 5), ant.y * (sizeOfSquares + 5), sizeOfSquares, sizeOfSquares);

  // Move the ant according to direction

  if (ant.dir == 0) {
    ant.y--;
  } else if (ant.dir == 90) {
    ant.x++;
  } else if (ant.dir == 180) {
    ant.y++;
  } else {
    ant.x--;
  }

  // Draw the change in ant's position

  context.fillStyle = "yellow";
  context.fillRect(ant.x * (sizeOfSquares + 5), ant.y * (sizeOfSquares + 5), sizeOfSquares, sizeOfSquares);

  // Make the ant move again if the ant didn't reach the edge

  if (ant.x >= 0 && ant.y >= 0 && ant.x < board.length && ant.y < board.length) {
    steps++;
    setTimeout(draw, 1);
  }
}

startUp();