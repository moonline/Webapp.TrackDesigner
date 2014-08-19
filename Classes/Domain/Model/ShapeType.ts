import Vector = require("Classes/Domain/Model/Vector");

class ShapeType {
	name: string;
	imagePath: string = "";
	height: number;
	width: number;
	
	// connection points, position vector from center
	connectionPoints: Vector[];
	
	constructor(name: string, connectionPoints: Vector[] = [], width: number = 0, height: number = 0) {
		this.name = name;
		this.connectionPoints = connectionPoints;
		this.width = width;
		this.height = height;
	}
	
	public getName(): string {
		return this.name;
	}
	
	public setImagePath(imagePath: string): void {
		this.imagePath = imagePath;
	}
	
	public getImagePath(): string {
		return this.imagePath;
	}
	
	public addConnectionPoint(point: Vector): void {
		this.connectionPoints.push(point);
	}
}

export = ShapeType;