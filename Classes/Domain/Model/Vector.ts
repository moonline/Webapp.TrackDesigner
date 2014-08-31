import Point = require("Classes/Domain/Model/Point");

class Vector {
	public static createVectorFromPoints(startPosition: Point, endPosition: Point): Vector {
		var deltaX = endPosition.getX()-startPosition.getX();
		var deltaY = endPosition.getY()-startPosition.getY();
		
		var length: number = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
		var angle: number = Math.atan(deltaY/deltaX)/(2*Math.PI);
		return new Vector(length, angle, endPosition.getAngle()-startPosition.getAngle());
	}

	length: number;
	angle: number;
	pointOrientation: number;
	
	constructor(length: number, angle: number, pointOrientation: number = 0) {
		this.length = length;
		this.angle = angle;
		this.pointOrientation = pointOrientation;
	}
	
	public getLength(): number {
		return this.length;
	}
	
	public getAngle(): number {
		return this.angle;
	}
	
	public getPointOrientation(): number {
		return this.pointOrientation;
	}
	
	public getEndPosition(startPosition: Point): Point {
		return new Point(
			startPosition.getX()+this.getDeltaX(startPosition.getAngle()), 
			startPosition.getY()+this.getDeltaY(startPosition.getAngle()), 
			startPosition.getAngle()+this.pointOrientation
		);
	}
	
	public getStartPosition(endPosition: Point): Point {
		var startAngleAbs: number = endPosition.getAngle()-this.pointOrientation;
		return new Point(
			endPosition.getX()-this.getDeltaX(startAngleAbs), 
			endPosition.getY()-this.getDeltaY(startAngleAbs), 
			startAngleAbs
		);
	}
	
	public getDeltaX(startAngle: number = 0): number {
		return this.length*Math.cos((startAngle+this.angle)*2*Math.PI);
	}
	
	public getDeltaY(startAngle: number = 0): number {
		return this.length*Math.sin((startAngle+this.angle)*2*Math.PI);
	}
}

export = Vector;