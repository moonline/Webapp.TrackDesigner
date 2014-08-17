import Point = require("Classes/Domain/Model/Point");

class Vector {
	length: number;
	angle: number;
	
	constructor(length: number, angle: number) {
		this.length = length;
		this.angle = angle;
	}
	
	public getEndPositionAngeled(startPosition: Point): Point {
		var totalAngle = startPosition.getAngle()+this.angle;
		var deltaX = this.length*Math.cos(totalAngle*2*Math.PI);
		var deltaY = this.length*Math.sin(totalAngle*2*Math.PI);
		return new Point(startPosition.getX()+deltaX, startPosition.getY()+deltaY, totalAngle);
	}
	
	public getEndPosition(startPosition: Point): Point {
		return new Point(
			startPosition.getX()+this.getDeltaX(), 
			startPosition.getY()+this.getDeltaY(), 
			startPosition.getAngle()
		);
	}
	
	public getDeltaX(): number {
		return this.length*Math.cos(this.angle*2*Math.PI);
	}
	
	public getDeltaY(): number {
		return this.length*Math.sin(this.angle*2*Math.PI);
	}
	
	public setVectorFromPoints(startPosition: Point, endPosition: Point) {
		var deltaX = endPosition.getX()-startPosition.getX();
		var deltaY = endPosition.getY()-startPosition.getY();
		
		this.length = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
		this.angle = Math.atan(deltaY/deltaX)/(2*Math.PI);
	}
}

export = Vector;