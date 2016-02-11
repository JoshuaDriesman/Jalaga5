// Copyright 2013 - 2015 Joshua Driesman
// JavaScript Document
function initiate() {
	var elem = document.getElementById("canvas");
	var imgPlayer = new Image();
	imgPlayer.src = "images/player.png";
	var imgEnemy = new Image();
	
	//Define global veriables
	canvas = elem.getContext("2d");
	gameRunning = true;
	player = new GameObject(250,530,canvas,3,imgPlayer);
	objectArray = [];
	bulletArray = [];
	enemyBulletArray = [];
	leftKeyDown = false;
	rightKeyDown = false;
	spaceBarDown = false;
	reverse = false;
	score = 0;
	
	document.addEventListener("keydown", keyDown, false);
	document.addEventListener("keyup", keyUp, false);
		
	for (var i = 0; i<6; i++) {
		imgEnemy.src = "images/enemy.png"; 
		
		var enemy = new GameObject(i*70+75,20,canvas,1,imgEnemy);
		
		
		objectArray.push(enemy);
	}
	for (i = 0; i<4; i++) {
		imgEnemy.src = "images/enemy.png"; 
		
		var enemy = new GameObject(i*70+140,100,canvas,1,imgEnemy);
		
		objectArray.push(enemy);
	}
	for (i = 0; i<2; i++) {
		imgEnemy.src = "images/enemy.png"; 
		
		var enemy = new GameObject(i*70+210,180,canvas,1,imgEnemy);
		
		
		objectArray.push(enemy);
	}
	setInterval(gameLoop, 33);
}
window.addEventListener("load",initiate,false);

//Main game loop
function gameLoop() {
	canvas.clearRect(0,0,600,600);
	
	//Updates enemies
	for (i = 0; i<objectArray.length; i++){
		var object = objectArray[i];
		if (object.getXCord() > 500) {
			reverse = true;
		} 
		if(object.getXCord() < 40) {
			reverse = false;
		}
		if(reverse) {
			object.setXCord(object.getXCord() - 2);
		} else {
			object.setXCord(object.getXCord() + 2);
		}
		if(object.getHealth() <= 0){
			delete objectArray[i];
			objectArray.splice(i,1);
			console.log("Removing object");
		}
		object.update();
	}
	
	//Updates player
	if (player.getXCord() < 40) {
		if (rightKeyDown) {
			player.setXCord(player.getXCord() + 4);
		}	
		if(spaceBarDown) {
			var imgBullet = new Image();
			imgBullet.src = "images/bullet.png";
			var bullet = new Bullet (player.getXCord()+17,player.getYCord()+20,canvas,1,imgBullet);
			bulletArray.push(bullet);
			bullet.update();
			spaceBarDown = false;
		}
	} else if (player.getXCord() > 500) {
		if (leftKeyDown) {
			player.setXCord(player.getXCord() - 4);
		}
		if(spaceBarDown) {
			var imgBullet = new Image();
			imgBullet.src = "images/bullet.png";
			var bullet = new Bullet (player.getXCord()+17,player.getYCord()+10,canvas,1,imgBullet);
			bulletArray.push(bullet);
			bullet.update();
			spaceBarDown = false;
		}
	} else {
		if (leftKeyDown) {
			player.setXCord(player.getXCord() - 4);
		} else if (rightKeyDown) {
			player.setXCord(player.getXCord() + 4);
		}
		if(spaceBarDown) {
			var imgBullet = new Image();
			imgBullet.src = "images/bullet.png";
			var bullet = new Bullet (player.getXCord()+20,player.getYCord()-20,canvas,1,imgBullet);
			bulletArray.push(bullet);
			bullet.update();
			spaceBarDown = false;
		}
	}
	
	player.update();
	
	//Updates bullet
	for (i = 0; i<bulletArray.length; i++) {
			var currentBullet = bulletArray[i];
			currentBullet.setYCord(currentBullet.getYCord() - 4);
			
			if(currentBullet.getYCord() < 5){
				delete bulletArray[i];
				bulletArray.splice(i,1);
			}
			for (x = 0; x<objectArray.length; x++){
				var currentEnemy = objectArray[x];
				var xcord = currentEnemy.getXCord();
				var xedge = xcord + 50;
				var ycord = currentEnemy.getYCord();
				var yedge = ycord + 50;
				if ((currentBullet.getXCord() > xcord) && (currentBullet.getXCord() < xedge) && (currentBullet.getYCord() > ycord) && (currentBullet.getYCord() < yedge)){
					delete bulletArray[i];
					bulletArray.splice(i,1);
					currentEnemy.takeDamage();
					score++;
				}
			}
			currentBullet.update();
		}
	//Updates score
	var output = document.getElementById("output");
	output.innerHTML = "Your score: " + score;
}
//End of game
function exit() {
	
}
//Event handeling
function keyDown(e) {
	var keyCode = e.keyCode;
	
	switch (keyCode){
		case 37:
			leftKeyDown = true;
			break;
		case 39:
			rightKeyDown = true;
			break;
		case 32:
			spaceBarDown = true;
			break;
	}
}
function keyUp(e) {
	var keyCode = e.keyCode;
	switch (keyCode){
		case 37:
			leftKeyDown = false;
			break;
		case 39:
			rightKeyDown = false;
			break;
		case 32:
			spaceBarDown = false;
			setTimeout(keyDown, 20);
			break;
	}
}
//Objects
function GameObject (x, y, c, hp, i) {
	this.xcord = x;
	this.ycord = y;
	this.oldxcord = 0;
	this.canvas = c;
	this.health = hp;
	this.image = i;
}
GameObject.prototype.setXCord = function(x) {
	if (x <= 600 && x >= 0) {
		this.oldxcord = this.xcord;
		this.xcord = x;
	} else {
		console.error("Error: invalid x cord.");
	}
};
GameObject.prototype.getXCord = function() {
	return this.xcord;
};
GameObject.prototype.setYCord = function(y) {
	if (y <= 600 && y >= 0) {
		this.oldycord = this.ycord;
		this.ycord = y;
	} else {
		console.error("Error: invalid y cord.");
	}
};
GameObject.prototype.getYCord = function() {
	return this.ycord;
};
GameObject.prototype.setHealth = function(h) {
	if(h >= 0){
		this.health = h;
	}
};
GameObject.prototype.getHealth = function () {
	return this.health;
};
GameObject.prototype.takeDamage = function () {
	this.health = this.health - 1;
};
GameObject.prototype.update = function () {
	this.canvas.drawImage(this.image,this.xcord,this.ycord,50,50);
};

function Bullet (x,y,c,hp,i) {
	GameObject.call(x,y,c,hp,i);
	this.xcord = x;
	this.ycord = y;
	this.canvas = c;
	this.health = hp;
	this.image = i;
}
Bullet.prototype = new GameObject();
Bullet.prototype.update = function () {
	this.canvas.drawImage(this.image,this.xcord,this.ycord,10,10);
};