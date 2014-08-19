import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import ShapeType = require("Classes/Domain/Model/ShapeType");

class Shape {
	center: Point;
	connectionPoints: ConnectionPoint[];
	type: ShapeType;

	constructor(type: ShapeType, center: Point, connectionPoints: ConnectionPoint[] = []) {
		this.type = type;
		this.center = center;
		this.connectionPoints = connectionPoints;
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
		return this.type.getName()+", position: "+this.center.toString();
	}
	
	public getPosition(): Point {
		return this.center;
	}
}

export = Shape;