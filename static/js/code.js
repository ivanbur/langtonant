var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var size = 50;
var sizeOfSquares = 25;
var ant = {
  x: size/2,
  y: size/2,
  dir: 0
};

var board = [];

function startUp() {
  // for (var i = 0; i < board.length; i++) {
  //   for (var n = 0; n < board.length; n++) {
  //     board[i][n] = false;
  //   }
  // }

  for (var j = 0; j < size; j++) {
    var tempArray = [];
    for (var m = 0; m < size; m++) {
      tempArray.push(false);
    }
    board.push(tempArray);
  }
  draw();
}

function draw() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  for (var i = 0; i < board.length; i++) {
    for (var n = 0; n < board.length; n++) {
      if (board[i][n]) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "blue";
      }
      context.fillRect(i * (sizeOfSquares + 5), n * (sizeOfSquares + 5), sizeOfSquares, sizeOfSquares);
    }
  }
  console.log(board);
  console.log(ant);

  if (!board[ant.y][ant.x]) {
    ant.dir += 90;
  } else {
    ant.dir -= 90;
  }

  ant.dir %= 360;
  ant.dir = Math.abs(ant.dir);
  board[ant.y][ant.x] = !board[ant.y][ant.x];

  if (ant.dir == 0) {
    ant.y--;
  } else if (ant.dir == 90) {
    ant.x++;
  } else if (ant.dir == 180) {
    ant.y++;
  } else {
    ant.x--;
  }

  console.log(board);
  console.log(ant);

  if (ant.x >= 0 && ant.y >= 0 && ant.x <= board.length && ant.y <= board.length) {
    setTimeout(draw, 1);
  }
}

startUp();