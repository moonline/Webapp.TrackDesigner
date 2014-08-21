import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import ShapeType = require("Classes/Domain/Model/ShapeType");

class Shape {
	public static createFromConnectionPoint(type: ShapeType, connectionPoint: ConnectionPoint): Shape {
		var position: Point = connectionPoint.getPosition();
		position.turnAngle(0.5);
		var newCenter: Point = type.connectionPoints[0].getStartPosition(position);
		var newShape: Shape = new Shape(type, newCenter);
		for(var i in type.connectionPoints) {
			newShape.createConnectionPoint(type.connectionPoints[i]);
		}
		newShape.getConnectionPoints()[0].connectTo(connectionPoint);
		return newShape;
	}
	
	public static createFromShape(type: ShapeType, shape: Shape): Shape {
		var connectionPoint: ConnectionPoint = shape.getNextFreeConnectionPoint();
		if(connectionPoint != null) {
			return Shape.createFromConnectionPoint(type, connectionPoint);
		} else {
			return null;
		}
	}
	

	center: Point;
	connectionPoints: ConnectionPoint[];
	type: ShapeType;

	constructor(type: ShapeType, center: Point, connectionPoints: ConnectionPoint[] = []) {
		this.type = type;
		this.center = center;
		this.connectionPoints = connectionPoints;
	}	
	
	public getConnectionPoints(): ConnectionPoint[] {
		return this.connectionPoints;
	}
	
	public addConnectionPoint(point: ConnectionPoint): void {
		point.setShape(this);
		this.connectionPoints.push(point);
	}
	
	public createConnectionPoint(position: Vector, connection: ConnectionPoint = null) {
		var connectionPoint: ConnectionPoint = new ConnectionPoint(
			this, position, connection
		);
		this.addConnectionPoint(connectionPoint);
	}
	
	public toString(): string {
		return this.type.getName()+", position: "+this.center.toString();
	}
	
	public getPosition(): Point {
		return this.center;
	}
	
	public getType(): ShapeType {
		return this.type;
	}
	
	private canRotate(): boolean {
		return this.getConnectedPoints().length == 1;
	}
	
	private getConnectedPoints(): ConnectionPoint[] {
		var connectedPoints: ConnectionPoint[] = [];
		for(var i in this.connectionPoints) {
			if(this.connectionPoints[i].connection != null) {
				connectedPoints.push(this.connectionPoints[i]);
			}
		}
		return connectedPoints;
	}
	
	/*public remove(): void {
	
	}*/
	
	/**
	 * unbind old connectionPoint and bind new point
	 */
	public rotate(): void {
		var connectedPoints: ConnectionPoint[] = this.getConnectedPoints();
		if(connectedPoints.length == 1) {
			// unbind old point
			var currentConnectionPoint: ConnectionPoint = connectedPoints[0];
			var connectedNeighbor = currentConnectionPoint.getConnection();
			var newConnectionPoint: ConnectionPoint = this.getNextFreeConnectionPoint(currentConnectionPoint);
			currentConnectionPoint.removeConnection();
			
			// recalc new center, set new connection
			var position: Point = connectedNeighbor.getPosition();
			position.turnAngle(0.5);
			this.center = newConnectionPoint.getIncrementalPosition().getStartPosition(position);
			newConnectionPoint.connectTo(connectedNeighbor);
		}
	}
	
	/**
	 * iterate through connection points, starting by the position of the given ConnectionPoint or 0
	 * @return ConnectionPoint first element without a connection
	 */
	public getNextFreeConnectionPoint(connectionPoint: ConnectionPoint = null): ConnectionPoint {
		var startPosition: number;
		if(connectionPoint == null) {
			startPosition = 0;
		} else {
			var pos: number = this.connectionPoints.indexOf(connectionPoint);
			startPosition = (pos >= 0) ? pos : 0;
		}		
		
		var rotatePosition: number = startPosition;
		for(var i = 0; i<this.connectionPoints.length; i++) {
			// TODO return of empty place found
			if(this.connectionPoints[rotatePosition].connection == null) {
				return this.connectionPoints[rotatePosition];
			}			
			if(rotatePosition < this.connectionPoints.length-1) {
				rotatePosition++;
			} else {
				rotatePosition = 0;
			}			
		}
		return null;
	}
}

export = Shape;