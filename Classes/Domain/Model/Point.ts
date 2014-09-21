import Vector = require("Classes/Domain/Model/Vector");

class Point {
	public static getMinCoordinates(points: Point[]): { x: number; y: number; } {
		if(points.length > 0) {
			var x: number = points[0].getX();
			var y: number = points[0].getY();
			for(var pi in points) {
				if(points[pi].getX() < x) { x = points[pi].getX(); }
				if(points[pi].getY() < y) { y = points[pi].getY(); }
			}
			return { x: x, y: y };
		} else {
			return { x: 0, y: 0 };
		}
	}
	
	public static getMaxCoordinates(points: Point[]): { x: number; y: number; } {
		if(points.length > 0) {
			var x: number = points[0].getX();
			var y: number = points[0].getY();
			for(var pi in points) {
				if(points[pi].getX() > x) { x = points[pi].getX(); }
				if(points[pi].getY() > y) { y = points[pi].getY(); }
			}
			return { x: x, y: y };
		} else {
			return { x: 0, y: 0 };
		}
	}


	x: number;
	y: number;
	angle: number; // turn, 1=360°

	constructor(x: number = 0, y: number = 0, angle: number = 0) {
		this.x = x;
		this.y = y;
		this.angle = angle;
	}

	
	public getX(): number {
		return this.x;
	}
	
	public getY(): number {
		return this.y;
	}
	
	public getAngle(): number {
		return this.angle;
	}
	
	public turnAngle(deltaAngle: number) {
		this.angle = (this.angle+deltaAngle)%1;
	}
	
	public isInCircle(position: Point, radius: number):boolean {
		return (Math.abs(this.y - position.getY()) < radius && Math.abs(this.x - position.getX()) < radius);
	}
	
	public isInSquare(position: Point, length: number):boolean {
		return (Math.abs(this.y - position.getY()) < length/2 && Math.abs(this.x - position.getX()) < length/2);
	}
	
	/**
	 * check if point is inside a rectangle
	 * 
	 * @param Point position: The center of the rectangle
	 * @param number length: The length of the rectangle
	 * @param number width: The width of the rectangle
	 * @return boolean	 
	 */
	public isInRectangle(position: Point, length: number, width: number):boolean {
		// don't use vector: circular dependency
		var x: number = this.getX()-position.getX();
		var y: number = this.getY()-position.getY();
		var pointAngle: number = Math.atan(y/x)/(2*Math.PI);
		
		var pointDistance: number = x/Math.cos(pointAngle*2*Math.PI);
		var incrementalAngle: number = pointAngle-position.getAngle();
		
		var distanceLengthDirection: number = pointDistance*Math.cos(incrementalAngle*2*Math.PI);
		var distanceWidthDirection: number = pointDistance*Math.sin(incrementalAngle*2*Math.PI);
		
		return (Math.abs(distanceLengthDirection) < length/2 && Math.abs(distanceWidthDirection) < width/2);
	}
	
	public move(deltaX: number, deltyY: number): void {
		this.x += deltaX;
		this.y += deltyY;
	}
	
	public equals(point: Point) {
		return Math.round(point.getX()) == Math.round(this.x) && Math.round(point.getY()) == Math.round(this.y);
	}
	
	public toString(): string {
		return this.x+"/"+this.y+"/"+this.angle;
	}
}

export = Point;