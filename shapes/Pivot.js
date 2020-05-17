// Simple class example

function Pivot(posX, posY, radius) {
		this.x = posX;
		this.y = posY;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0;
		this.color = "#006600";
		this.aimColor = "#00FF00";
		this.radius = radius;
		this.destroySoon = false;
		this.isAiming = false;
		this.isDead = false;
}

Pivot.prototype.setIsAiming = function(isAiming) {
	this.isAiming = isAiming;
}

//A function for drawing the particle.
Pivot.prototype.drawToContext = function(theContext) {
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	if(this.isDead) {
		theContext.fillStyle = "#FF0000"
		theContext.strokeStyle = "#FF0000";
	} else if (this.isAiming) {
		theContext.fillStyle = this.aimColor;
		theContext.strokeStyle = "#006600";
	} else {
		theContext.fillStyle = this.color;
		theContext.strokeStyle = "#006600";
	}
	theContext.fill();
	theContext.lineWidth = 2;
	theContext.stroke();
}

Pivot.prototype.shouldDestroy = function(theContext) {
	return this.destroySoon || this.y >= 1000;
}