var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2+Math.random();
var dy = Math.random()*2 - Math.random()*4;
var ballRadius = 10;
var paddleHeight = 75;
var paddleWidth = 10;
var paddleX = (canvas.width-paddleWidth) /2;
var paddleY = (canvas.height-paddleHeight) /2;
var upPressed = false;
var downPressed = false;
// localStorage.clear();
mStorage = window.localStorage;


class Paddle{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.score = mStorage.getItem("ai-score");
		if (!(mStorage.getItem("ai-score"))){this.score = 0;}
	}
	drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    if (mStorage.getItem("ai-score")) var s = mStorage.getItem("ai-score");
    else var s = 0;
    ctx.fillText("Score: "+s, 8, 20);
	}

	drawPaddle(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, paddleWidth, paddleHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
}
var player = new Paddle(5, (canvas.height-paddleHeight)/2);
var ai = new Paddle(canvas.width-paddleWidth-5, (canvas.height-paddleHeight)/2);




function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}



function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.drawPaddle();
	ai.drawPaddle();
	drawBall();
	ai.drawScore();
	
	if (x+dx<ballRadius+paddleWidth){
		if((y>player.y)&&(y<player.y+paddleHeight)){
			dx = -dx
		} else {
			ai.score = parseInt(ai.score) + 1;
			localStorage.setItem("ai-score", ai.score.toString())
			x = canvas.width/2;
			y = canvas.height/2;
			dx = 2+Math.random();
			dy = Math.random()*2 - Math.random()*4;
		}
	}
	if (x+dx>canvas.width-ballRadius-paddleWidth){
		if((y>ai.y)&&(y<ai.y+paddleHeight)){
			dx=-dx;
		} else {
		alert ("You Win");
		document.location.reload();
		clearInterval(interval);
		}
	}
	if ((y+dx<0)||(y+dx>canvas.height)){
		dy = -dy
	}


	// if (((x+dx+ballRadius) > canvas.width)|| (x+dx-ballRadius <0)) dx = -dx;
	x += dx;
	y += dy;
	ai.y = y-40;
	if (upPressed){
		player.y += 7;
		if (player.y + paddleHeight >= canvas.height){
			player.y = canvas.height - paddleHeight;
		}		
	}
	else if (downPressed){
		player.y-=7;
		
		if (player.y < 0){
			player.y=0;
		}
		
	}
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.getElementById("help").addEventListener("click", helper)
function keyDownHandler(e){
	if(e.key == "ArrowDown"){
		upPressed = true;
	}
	else if (e.key == "ArrowUp"){
		downPressed = true;
	}
}
function keyUpHandler(e){
	if(e.key == "ArrowDown"){
		upPressed = false;
	}
	else if (e.key == "ArrowUp"){
		downPressed = false;
	}
	else if (e.key == "Escape"){
		if (confirm("Game paused. Return to game?")){
			null;
		} else {
			window.close();
		}
	}
}
// function helper(e){
// 	document.getElementById("help-body").innerHTML = "Use the up and down arrow keys to control the left panel and keep the ball from entering the left side of the canvas."
// }
document.getElementById("reset-btn").addEventListener("click", resetScore);

function resetScore(){
	if (confirm("Are you sure you want to reset your score?")){
		mStorage.clear();
		location.reload();
	}
}



var interval = setInterval(draw, 10);
