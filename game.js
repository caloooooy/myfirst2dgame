var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height -30;
var dx = 2;
var dy = -2;

var paddleHeight = 12;
var paddleWidth = 72; 
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 4; 
var brickColumnCount = 7;
var brickWidth = 80; 
var brickHeight = 24;
var brickPadding = 12;
var brickOffsetTop = 32;
var brickOffsetLeft = 32;
var score = 0;
var bricks = [];
for(i=0; i<brickColumnCount; i++){
    bricks[i] = [];
    for(j = 0; j<brickRowCount;j++){
        bricks[i][j] = { x:0, y: 0, status:1};
    }
}
document.addEventListener("keydown" , keyDownHandler, false);
document.addEventListener("keyup" , keyUpHandler, false);
document.addEventListener("mousemove",mouseMoveHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius,0,Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff9900";
    ctx.fill();
    ctx.closePath();
}
function drawBricks(){
    for(i=0; i <brickColumnCount; i++) {
        for(j = 0; j < brickRowCount; j++){
            if( bricks[i][j].status == 1 ) {
                var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#6600cc";
                ctx.fill();
                ctx.closePath();
            }
          
        }
    }
}
function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("score: "+score,8,20);
}
function collisionDetection() {
    for(i=0; i <brickColumnCount; i++){
        for(j = 0 ; j < brickRowCount; j++) {
            var b = bricks[i][j];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("Congratulation!! You have Won!");
                        document.location.reload()
                    }
                }
            }
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    
    
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx
        
    };
    if(y + dy < ballRadius){
        dy = -dy
    }
    else if (y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else {
            alert("GAME OVER!!!!");
            
            document.location.reload();
        }
    }
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7; 
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7; 
    }
    x += dx;
    y += dy;


  
}
setInterval(draw,10);