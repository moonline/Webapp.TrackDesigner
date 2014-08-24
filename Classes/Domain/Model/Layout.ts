import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Shape = require("Classes/Domain/Model/Shape");

class Layout {
	shapes: Shape[];
	currentElement: any = null;
	
	constructor() {
		this.shapes = [];
		this.currentElement = this;
	}
	
	public getCurrentElement(): any {
		return this.currentElement;
	}
	
	public addShape(shape: Shape): void {
		this.shapes.push(shape);
		this.currentElement = shape;
		if(shape.getPosition().getX() < shape.getType().getWidth()/2+shape.getType().getHeight()/2) {
			this.moveShapes(shape.getType().getWidth()+shape.getType().getHeight(), 0);
		}
		if(shape.getPosition().getY() < shape.getType().getWidth()/2+shape.getType().getHeight()/2) {
			this.moveShapes(0, shape.getType().getWidth()+shape.getType().getHeight());
		}
		this.connectNearConnectionPoint(shape);
	}
	
	private moveShapes(deltaX: number, deltaY: number) {
		for(var spi in this.shapes) {
			this.shapes[spi].move(deltaX, deltaY);
		}
	}
	
	public rotateCurrentShape(): void {
		if(this.currentElement != null) {
			if(this.currentElement instanceof Shape) {
				this.currentElement.rotate();
			}
		}
	}
	
	public removeShape(shape: Shape): void {
		shape.removeConnectionPoints();
		var pos: number = this.shapes.indexOf(shape);
		// TODO
		this.shapes.splice(pos, 1);
		shape = null;
	}
	
	public removeCurrentShape(): void {
		if(this.currentElement != null) {
			if(this.currentElement instanceof Shape) {
				var firstNeighbor: Shape = this.currentElement.getFirstNeighbor();
				this.removeShape(this.currentElement);
				if(firstNeighbor != null) {
					this.currentElement = firstNeighbor;
				}
			}
		}
	}
	
	public setCurrentElementByPosition(position: Point, config: any): void {
		for(var spi in this.shapes) {
			if(position.isInCircle(this.shapes[spi].getPosition(), config['shapePointSize'])) {
				this.currentElement = this.shapes[spi];
				return;
			}
		}
		this.currentElement = position;
	}
	
	private connectNearConnectionPoint(shape: Shape): ConnectionPoint {
		var connectionPoints: ConnectionPoint[] = shape.getConnectionPoints();
		for(var cpi in connectionPoints) {
			if(connectionPoints[cpi].getConnection() == null) {
				for(var spi in this.shapes) {
					if(shape != this.shapes[spi]) {
						var shapeConnectionPoints: ConnectionPoint[] = this.shapes[spi].getConnectionPoints();
						for(var scpi in shapeConnectionPoints) {
							if(connectionPoints[cpi].getPosition().equals(shapeConnectionPoints[scpi].getPosition()) && shapeConnectionPoints[scpi].getConnection() == null) {
								connectionPoints[cpi].connectTo(shapeConnectionPoints[scpi]);
								return shapeConnectionPoints[scpi];
							}
						}
					}
				}
			}
		}
	}
}

export = Layout;