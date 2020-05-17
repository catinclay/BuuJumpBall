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
	this.pivots.push(new Pivot(Math.random() * (canvasWidth-100) + 50, this.canvasHeight - 400, this.getRandomPivotRadius()));


	
	this.mainBalls = [];
	this.mainBall = new MainBall(this.pivots, this.canvasWidth/2, this.canvasHeight - 300, this.canvasWidth, this.canvasHeight, this.soundManager);
	this.mainBalls.push(this.mainBall);
	
	this.drawables.push(this.mainBalls);
	this.drawables.push(this.pivots);

	this.isMouseDown = false;

}

Game.prototype.update = function(dt) {
	this.mainBall.setIsMouseDown(this.isMouseDown);
	this.mainBall.update();
	if (this.pivots[this.pivots.length-1].y >= 15) {
		let lastY = this.pivots[this.pivots.length-1].y;
		let nextDis = Math.random()*120 + 15;
		this.pivots.push(new Pivot(Math.random() * (this.canvasWidth-100) + 50, lastY - Math.random()*120 - 15, this.getRandomPivotRadius()));
		if (nextDis >= 80) {
			this.pivots.push(new Pivot(Math.random() * (this.canvasWidth-100) + 50, lastY - Math.random()*120 - 15, this.getRandomPivotRadius()));			
		}
	}

}

Game.prototype.getRandomPivotRadius = function() {
	return Math.random()*8 + Math.random()*8 + 2;
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