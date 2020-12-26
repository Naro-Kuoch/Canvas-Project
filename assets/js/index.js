var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//ball property 
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;

var score=0;
//paddle property for user
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//controller property
var rightPressed = false;
var leftPressed = false;

//paddle property for game
var paddleGx= paddleX;
var paddleGy = 0;
var speed = 5;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
function drawPaddleGame() {
    ctx.beginPath();
    ctx.rect(paddleGx, paddleGy, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
var gameOver=0;

function draw() {
    if(gameOver==1){
        requestAnimationFrame(draw);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawPaddleGame();
    
    // if(paddleGx+speed>canvas.width-paddleWidth){
    //     speed=-speed;
    // }
    // if(paddleGx+speed<0){
    //     speed = -speed;
    // }
    // paddleGx+=speed;

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        if(x>paddleGx && x<paddleGx+paddleWidth){
            dy = -dy;
        }
        else{
            score++;
            console.log(score);
            gameOver=1
            // clearInterval(interval); // Needed for Chrome to end game
        }
        
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            gameOver=1;
            y=canvas.height/2;
            // document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    paddleGx+=dx;
    y += dy;
}


function drawBackground(color){    
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.closePath();
}

function assignFont(){
    ctx.font='18px sans-serif';
    ctx.fillStyle='white';
    ctx.textAlign='center';
    ctx.fillText("Welcome to our game", 240,100);
    ctx.fillText("Press ' Space Key ' to Start the Game", 240,150);
}

window.addEventListener("load",function(){
   
    drawBackground("#20761D");
    assignFont();
    
})

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        gameOver=1;
        draw();
    }
})
