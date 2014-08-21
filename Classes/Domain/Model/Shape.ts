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
	
	public canRotate(): boolean {
		var numberOfConnectedPoints: number = 0;
		for(var i in this.connectionPoints) {
			if(this.connectionPoints[i].connection != null) {
				numberOfConnectedPoints++;
			}
		}
		return numberOfConnectedPoints == 1;
		
	}
	
	/*public remove(): void {
	
	}*/
	
	/*public rotate(): void {
		if(this.canRotate()) {
			
		}
	}*/
	
	/**
	 * iterate through connection points, starting by the position of the given ConnectionPoint or 0
	 * @return ConnectionPoint first element without a connection
	 */
	private getNextFreeConnectionPoint(connectionPoint: ConnectionPoint = null): ConnectionPoint {
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