import Vector = require("Classes/Domain/Model/Vector");

class ShapeType {
	name: string;
	imagePath: string;
	height: number;
	width: number;
	
	// connection points, position vector from center
	connectionPoints: Vector[];
	defaultFirstConnectionPointPosition: number;
	
	constructor(name: string, connectionPoints: Vector[] = [], width: number = 0, height: number = 0, imagePath: string = "") {
		this.name = name;
		this.connectionPoints = connectionPoints;
		this.defaultFirstConnectionPointPosition = 0;
		this.width = width;
		this.height = height;
		this.imagePath = imagePath;
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
	
	public getDefaultFirstConnectionPointPosition(): number {
		return this.defaultFirstConnectionPointPosition;
	}
	
	public getDefaultFirstConnectionPoint(): Vector {
		return this.connectionPoints[this.defaultFirstConnectionPointPosition];
	}	
	
	public moveDefaultFirstConnectionPointPositionToNext(): void {
		if(this.connectionPoints.length > 0) {
			if(this.defaultFirstConnectionPointPosition < this.connectionPoints.length-1) {
				this.defaultFirstConnectionPointPosition++;
			} else {
				this.defaultFirstConnectionPointPosition = 0;
			}
		}
	}
	
	public getHeight(): number {
		return this.height;
	}
	
	public getWidth(): number {
		return this.width;
	}
}

export = ShapeType;