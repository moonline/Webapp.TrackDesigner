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
		this.currentElement = null;
	}
}

export = Layout;