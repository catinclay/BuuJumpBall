function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.particles = [];
	this.drawables.push(this.particles);
	this.imageManager = imageManager;
	this.soundManager = soundManager;
	

	this.pivots = [];
	this.pivots.push(new Pivot(this.getRandomPivotX(), this.canvasHeight*3/7, this.getRandomPivotRadius()));


	
	this.mainBalls = [];
	this.mainBall = new MainBall(this.pivots, this.canvasWidth/2, this.canvasHeight * 4/7, this.canvasWidth, this.canvasHeight, this.soundManager);
	this.mainBalls.push(this.mainBall);
	
	this.drawables.push(this.pivots);
	this.drawables.push(this.mainBalls);
	
	this.isMouseDown = false;

}

Game.prototype.update = function(dt) {
	this.mainBall.setIsMouseDown(this.isMouseDown);
	this.mainBall.update();
	if (this.pivots[this.pivots.length-1].y >= this.canvasWidth /25) {
		let lastY = this.pivots[this.pivots.length-1].y;
		let nextDis = Math.random() * this.canvasWidth *3/10 + this.canvasWidth / 25;
		this.pivots.push(new Pivot(this.getRandomPivotX(),  lastY - nextDis, this.getRandomPivotRadius()));
		if (nextDis >= this.canvasWidth/5) {
			this.pivots.push(new Pivot(this.getRandomPivotX(), lastY - nextDis, this.getRandomPivotRadius()));			
		}
	}

}

Game.prototype.getRandomPivotX = function() {
	return Math.random() * (this.canvasWidth*3/4) + this.canvasWidth / 8;
}

Game.prototype.getRandomPivotRadius = function() {
	return Math.random()* this.canvasWidth / 50+ Math.random() * this.canvasWidth / 50 + this.canvasWidth / 200;
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	this.isMouseDown = true;
	
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
	
}

Game.prototype.inputUpListener = function(touchX, touchY) {
	this.isMouseDown = false;
}