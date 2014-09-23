import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Variant = require("Classes/Domain/Model/Variant");

import Observable = require("Classes/Utility/Observable");
import EventType = require("Classes/Utility/EventType");

class Shape extends Observable {
	public static createFromConnectionPoint(type: ShapeType, variant: Variant, connectionPoint: ConnectionPoint): Shape {
		var position: Point = connectionPoint.getPosition();
		position.turnAngle(0.5);
		var newCenter: Point = type.getDefaultFirstConnectionPoint().getStartPosition(position);
		var newShape: Shape = new Shape(type, variant, newCenter);
		for(var i in type.connectionPoints) {
			newShape.createConnectionPoint(type.connectionPoints[i]);
		}
		newShape.getConnectionPoints()[newShape.getType().getDefaultFirstConnectionPointPosition()].connectTo(connectionPoint);
		return newShape;
	}
	
	public static createFromShape(type: ShapeType, variant: Variant, shape: Shape): Shape {
		var connectionPoint: ConnectionPoint = shape.getNextFreeConnectionPoint();
		if(connectionPoint != null) {
			return Shape.createFromConnectionPoint(type, variant, connectionPoint);
		} else {
			return null;
		}
	}
	
	public static createShape(type: ShapeType, variant: Variant, center: Point) {
		var newShape: Shape = new Shape(type, variant, center);
		for(var i in type.connectionPoints) {
			newShape.createConnectionPoint(type.connectionPoints[i]);
		}
		return newShape;
	}
	

	center: Point;
	connectionPoints: ConnectionPoint[];
	type: ShapeType;
	variant: Variant;

	constructor(type: ShapeType, variant: Variant, center: Point, connectionPoints: ConnectionPoint[] = []) {
		super();
		this.type = type;
		this.variant = variant;
		this.center = center;
		this.connectionPoints = connectionPoints;
	}
	
	public getPosition(): Point {
		return this.center;
	}
	
	public getType(): ShapeType {
		return this.type;
	}
	
	public getVariant(): Variant {
		return this.variant;
	}
	
	public getConnectionPoints(): ConnectionPoint[] {
		return this.connectionPoints;
	}
	
	public getCorners(): Point[] {
		var cornerVector: Vector = Vector.createVectorFromPoints(new Point(0,0), new Point(this.variant.getWidth()/2, this.variant.getHeight()/2));
		return [
			cornerVector.getEndPosition(this.center),
			(new Vector(cornerVector.getLength(), 0.5-cornerVector.getAngle())).getEndPosition(this.center),
			(new Vector(cornerVector.getLength(), 0.5+cornerVector.getAngle())).getEndPosition(this.center),
			(new Vector(cornerVector.getLength(), 1-cornerVector.getAngle())).getEndPosition(this.center)	
		];
	}
	
	
	
	public move(deltaX: number, deltaY: number): void {
		this.center.move(deltaX, deltaY);
		this.notifyObservers(EventType.objectMoved, this);
	}
	
	public addConnectionPoint(point: ConnectionPoint): void {
		point.setShape(this);
		this.connectionPoints.push(point);
	}
	
	public removeConnectionPoints(): void {
		for(var i in this.connectionPoints) {
			this.connectionPoints[i].removeConnection();
		}
		this.connectionPoints = null;
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
	
	private canRotate(): boolean {
		return this.getConnectedPoints().length <= 1;
	}
	
	private getConnectedPoints(): ConnectionPoint[] {
		var connectedPoints: ConnectionPoint[] = [];
		for(var i in this.connectionPoints) {
			if(this.connectionPoints[i].getConnection() != null) {
				connectedPoints.push(this.connectionPoints[i]);
			}
		}
		return connectedPoints;
	}
	
	public getFreePoints(): ConnectionPoint[] {
		var freePoints: ConnectionPoint[] = [];
		for(var i in this.connectionPoints) {
			if(this.connectionPoints[i].getConnection() == null) {
				freePoints.push(this.connectionPoints[i]);
			}
		}
		return freePoints;
	}
	
	public getFirstNeighbor(): Shape {
		for(var i in this.connectionPoints) {
			if(this.connectionPoints[i].connection != null) {
				return this.connectionPoints[i].getConnection().getShape();
			}
		}
		return null;
	}
	
	public getNeighbors(): Shape[] {
		var neighbors: Shape[] = [];
		for(var i in this.connectionPoints) {
			if(this.connectionPoints[i].connection != null) {
				neighbors.push(this.connectionPoints[i].getConnection().getShape());
			}
		}
		return neighbors;
	}
	
	/**
	 * unbind old connectionPoint and bind new point
	 */
	public rotate(): void {
		var connectedPoints: ConnectionPoint[] = this.getConnectedPoints();
		if(connectedPoints.length < 1) {
			this.center.turnAngle(1/32);
		} else if(connectedPoints.length == 1) {
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
			
		// rotate shape connected with 2points only if angles are the same direction
		} else if(connectedPoints.length == 2) {
			if(connectedPoints[0].getIncrementalPosition().getPointOrientation()+0.5 == connectedPoints[1].getIncrementalPosition().getPointOrientation()) {
				var connectionPoint1: ConnectionPoint = connectedPoints[0];
				var connectionPoint2: ConnectionPoint = connectedPoints[1];
				
				// unbind old point
				var connectedNeighbor1: ConnectionPoint = connectionPoint1.getConnection();
				var connectedNeighbor2: ConnectionPoint = connectionPoint2.getConnection();
				connectedNeighbor1.removeConnection();
				connectedNeighbor2.removeConnection();
				
				// recalc new center, set new connection
				var position: Point = connectedNeighbor2.getPosition();
				position.turnAngle(0.5);
				this.center = connectionPoint1.getIncrementalPosition().getStartPosition(position);
				connectionPoint1.connectTo(connectedNeighbor2);
				connectionPoint2.connectTo(connectedNeighbor1);
			}
		}
		this.notifyObservers(EventType.propertyChanged, this);
	}
	
	/**
	 * iterate through connection points, starting by the position of the given ConnectionPoint or 0
	 * @return ConnectionPoint first element without a connection
	 */
	public getNextFreeConnectionPoint(connectionPoint: ConnectionPoint = null): ConnectionPoint {
		if(this.connectionPoints != null) {
			var startPosition: number;
			if(connectionPoint == null) {
				startPosition = 0;
			} else {
				var pos: number = this.connectionPoints.indexOf(connectionPoint);
				startPosition = (pos >= 0) ? pos : 0;
			}		
			
			var rotatePosition: number = startPosition;
			for(var i = 0; i < this.connectionPoints.length; i++) {
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
		}
		return null;
	}

	public serialize(): Object {
		return {
			class: 'Classes/Domain/Model/Shape',
			type: this.type.getName(),
			variant: this.variant.getType().getName(),
			center: this.center.serialize()
		};
	}
}

export = Shape;