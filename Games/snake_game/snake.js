
//board
let blockSize = 15
let rows = 20;
let cols = 20;
let board;
let context; 

//variables for score
let score = document.getElementById('point');
var score_value = 0;

//variables for game over
const over = document.getElementById('game_over');
const p = document.createElement("p");


//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//food
let foodX;
let foodY;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    p.textContent = "Press any arrow key to continue...";
    if(gameOver === false){
        over.appendChild(p);        
    }
    placeFood();

    function handelArrowPress(event){
        if(event.key.includes("Arrow")){
            over.textContent = ""; // Remove the text content of the 'over' element
            // Remove the event listener
            document.removeEventListener("keyup", handelArrowPress); 
        }
    }

    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keyup", handelArrowPress);

    // update();
    setInterval(update, (1000/10)); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        increase_score();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        p.textContent = "GAME OVER!!!!"
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        p.textContent = "GAME OVER!!!!"
        }
    }
    if(gameOver){
        over.appendChild(p);
    }
}

let lastDirection;

function changeDirection(e) {
    if (e.code == "ArrowUp" && lastDirection != "down") {
        velocityX = 0;
        velocityY = -1;
        lastDirection = "up";
    }
    else if (e.code == "ArrowDown" && lastDirection != "up") {
        velocityX = 0;
        velocityY = 1;
        lastDirection = "down";
    }
    else if (e.code == "ArrowLeft" && lastDirection != "right") {
        velocityX = -1;
        velocityY = 0;
        lastDirection = "left";
    }
    else if (e.code == "ArrowRight" && lastDirection != "left") {
        velocityX = 1;
        velocityY = 0;
        lastDirection = "right";
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function increase_score() {
    // Increase the score value by 10
    score_value += 10;
    
    // Update the score text content
    score.textContent = score_value;

}