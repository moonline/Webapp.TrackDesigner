import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");

class Shape {
	center: Point;
	connectionPoints: ConnectionPoint[];
	image: string;
	shapeName: string;

	constructor(center: Point, connectionPoints: ConnectionPoint[] = [], shapeName: string = "", image: string = "") {
		this.center = center;
		this.connectionPoints = connectionPoints;
		this.shapeName = shapeName;
		this.image = image;
	}
	
	public getConnectionPoints() {
		return this.connectionPoints;
	}
	
	public addConnectionPoint(point: ConnectionPoint): void {
		point.setShape(this);
		this.connectionPoints.push(point);
	}
	
	public createConnectionPoint(distanceFromCenter: Vector, angle: number = 0) {
		var connectionPoint: ConnectionPoint = new ConnectionPoint(
			this, distanceFromCenter, angle, null
		);
		this.addConnectionPoint(connectionPoint);
	}
	
	public toString(): string {
		return this.shapeName+", position: "+this.center.toString();
	}
	
	public getPosition(): Point {
		return this.center;
	}
}

export = Shape;