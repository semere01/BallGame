document.getElementById("start-game-btn").addEventListener("click", startGame);

function startGame(){
	window.open("index.html")
}
document.getElementById("help-btn").addEventListener("click", help);

function help(){
	if (document.getElementById("help-btn").tagName != "A"){window.open("help.html")}
}
document.getElementById("exit-btn").addEventListener("click", exit);

function exit(){
	if (confirm("Are you sure you want to exit?")){window.close();}
}
