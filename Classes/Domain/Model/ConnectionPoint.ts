import Shape = require("Classes/Domain/Model/Shape");
import Vector = require("Classes/Domain/Model/Vector");
import Point = require("Classes/Domain/Model/Point");

class ConnectionPoint {
	shape: Shape;
	distanceFromCenter: Vector;
	angle: number;
	connection: ConnectionPoint;

	constructor(shape: Shape, distanceFromCenter: Vector, angle: number = 0, connection: ConnectionPoint = null) {
		this.shape = shape;
		this.distanceFromCenter = distanceFromCenter;
		this.angle = angle;
		this.connection = connection;
	}
	
	public getConnection(): ConnectionPoint {
		return this.connection;
	}
	
	public setConnection(ConnectionPoint: ConnectionPoint):void {
		this.connection = ConnectionPoint;
	}
	
	public connectTo(ConnectionPoint: ConnectionPoint):void {
		this.connection = ConnectionPoint;
		ConnectionPoint.setConnection(this);
	}
	
	public removeConnection():void {
		this.connection.setConnection(null);
		this.connection = null;
	}
	
	public getShape(): Shape {
		return this.shape;
	}
	
	public setShape(shape: Shape): void {
		this.shape = shape;
	}
	
	public getPosition(): Point {
		return this.distanceFromCenter.getEndPositionAngeled(this.shape.getPosition());
	}
}

export = ConnectionPoint;