class Point {
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
		this.angle += deltaAngle;
	}
	
	public toString(): string {
		return this.x+"/"+this.y+"/"+this.angle;
	}
}

export = Point;