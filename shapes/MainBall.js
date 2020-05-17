// Simple class example

function MainBall(pivots, posX, posY, canvasWidth, canvasHeight, soundManager) {
		this.x = posX;
		this.y = posY;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0;
		this.color = "#0000FF";
		this.radius = 10;
 		this.canvasWidth = canvasWidth;
 		this.canvasHeight = canvasHeight;
 		this.soundManager = soundManager;


		this.pivots = pivots;

		this.targetX = 0;
		this.targetY = 0;
		this.hasTarget = false;

		this.defaultChargingSpeed = 1;
		this.currentChargingSpeed = 1;
		this.isCharging = false;
		this.chargingDistance = 0;

		this.baseLine = posY+ 50;

		this.deadLine = posY + 150;

		this.score = 0;
		this.isGameOver = false;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
MainBall.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

MainBall.prototype.setIsMouseDown = function(isMouseDown) {
	if(isMouseDown) {
		this.isCharging = true;
	} else {
		if (this.isCharging) {
			this.fire();
		}
		this.isCharging = false;
	}
}

MainBall.prototype.fire = function(){
	this.chargingDistance = 0;
	this.currentChargingSpeed = this.defaultChargingSpeed;
	for (var i = 0; i < this.pivots.length - 1; i++) {
		let p = this.pivots[i];
		if (p.isAiming == true) {
			p.destroySoon = true;
			this.targetX = p.x;
			this.targetY =  p.y;
			this.hasTarget = true;
			this.soundManager.play("failedSound");
		}
		this.pivots[i].setIsAiming(false);
	}
}

MainBall.prototype.update = function() {
	if (this.isGameOver) return;
	let hasAiming = false;
	for (var i = this.pivots.length - 1; i >= 0; i--) {
		let p = this.pivots[i];
		if (p.y >= this.deadLine) {p.isDead = true; continue;}
		if (p.isDead) { continue; }
		if (this.isCharging) {
			var dist = this.dis(p);
			if (dist - p.radius <= this.chargingDistance && dist + p.radius >= this.chargingDistance && !hasAiming) {
				p.setIsAiming(true);
				hasAiming = true;
				
			} else {
				p.setIsAiming(false);
			}
		}
	}

	if (this.isCharging) {
		this.chargingDistance+=this.currentChargingSpeed;
		this.currentChargingSpeed = this.currentChargingSpeed >= 3.5 ? 3.5 : this.currentChargingSpeed * 1.03;
	}

	if (this.hasTarget) {
		if (this.dis({x:this.targetX, y:this.targetY}) <= 5) {
			this.x = this.targetX;
			this.y = this.targetY;
			this.hasTarget = false;
		} 
		this.x = (this.targetX + 2*this.x)/3;
		this.y = (this.targetY + 2*this.y)/3;
	}

	if(this.y - this.baseLine < 0) {
		this.camGoTo(this.y + (this.baseLine - this.y)/20 + 0.5);
	}

	this.deadLine -= 0.1 + Math.sqrt(this.score/500)*2/3;

	if (this.deadLine < this.y) {
		this.isGameOver = true;
		alert("Score: " + Math.floor(this.score/100));
	}
}

MainBall.prototype.camGoTo = function(line) {
	var dis = line - this.y;
	this.y += dis;
	for (var i in this.pivots) {
		var p = this.pivots[i];
		p.y += dis;
	}
	this.targetY += dis;
	this.deadLine += dis;
	if (this.deadLine > this.canvasHeight) {
		this.deadLine = this.canvasHeight;
	}
	this.score += dis;
}

MainBall.prototype.dis = function(p) {
	return Math.sqrt((this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y));
}

//A function for drawing the particle.
MainBall.prototype.drawToContext = function(theContext) {

	theContext.fillStyle = "#FF0000";
	theContext.fillRect(0, this.deadLine, this.canvasWidth, this.canvasHeight - this.deadLine);
	// theContext.fillRect(0, 0, 100, 100);

	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	if (this.isGameOver) {
		this.color = "#FF0000"
	}
	theContext.fillStyle = this.color;
	theContext.fill();
	if (this.isGameOver) {
		theContext.strokeStyle = "#FF0000";
	} else {
		theContext.strokeStyle = "#000000";
	}
	theContext.lineWidth = 2;
	theContext.stroke();

	if (this.isCharging) {
		theContext.beginPath();
		theContext.strokeStyle = "#00000066";
		theContext.arc(this.x, this.y, this.chargingDistance, 0, 2 * Math.PI);
		theContext.lineWidth = 4;
		theContext.stroke();
	}

}

MainBall.prototype.shouldDestroy = function(theContext) {
	return false;
}