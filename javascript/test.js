// JavaScript Document
function initiate() {
	var elem = document.getElementById("canvas");
	canvas = elem.getContext("2d");
	
	elem.addEventListener("mousedown",click,false);
	elem.addEventListener("mousemove",positionUpdate,false);
	
	ship = new Object();
	
	array = new Array();
	
	array[0] = ship;
	
	setInterval(update, 33);
	
	i=0;
	
	oldx = 250;
	oldy = 250;
}
function click(e) {
	var xmouse = e.x;
	var ymouse = e.y;
	
	canvas.beginPath();
	canvas.moveTo(xmouse,ymouse);
	canvas.lineTo(xmouse,ymouse);
	canvas.stroke();
	
	alert(movedTo);
	
}
function positionUpdate(e) {
	var img = new Image();
	img.src = "images/ship.gif";
	
	canvas.clearRect(oldx,oldy,50,50);
	canvas.drawImage(img, e.x,e.y, 50,50);
	
	oldx = e.x;
	oldy = e.y;
	
	output.innerHTML = e.x + "," + e.y;
}
function update() {
	
	
	if(i>500) {
		i=0;
	}
	array[0].update();
	
	i++;
	
}
function Object() {
	this.img = new Image();
	this.img.src = "images/ship.gif";
}
Object.prototype.update = function () {
	canvas.clearRect(i-1,i-1,50,50);
	canvas.drawImage(this.img,i,i,50,50);
};
window.addEventListener("load",initiate,false);
