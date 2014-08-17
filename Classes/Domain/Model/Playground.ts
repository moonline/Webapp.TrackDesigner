import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Shape = require("Classes/Domain/Model/Shape");

class Playground {
	canvas: CanvasRenderingContext2D;
	startElements: Shape[]; 
	shapes: Shape[];
	
	constructor(canvasElement: HTMLCanvasElement) {
		this.canvas = canvasElement.getContext('2d');
		this.startElements = [];
		this.shapes = [];
	}
	
	public draw(): void {
		for(var si in this.shapes) {
			var shape: Shape = this.shapes[si];
			var connectionPoints: ConnectionPoint[] = shape.getConnectionPoints();
			for(var cpi in connectionPoints) {
				var connectionPoint: ConnectionPoint = connectionPoints[cpi];
				
				var x:number = connectionPoint.getPosition().getX();
				var y:number = connectionPoint.getPosition().getY();
				
				this.canvas.beginPath();
				// Startposition festlegen (gleich dem Mittelpkt)
				this.canvas.moveTo(x, y);
				// Halbkreis um den Mittelpunkt (60, 60) zeichnen
				this.canvas.arc(x, y, 5, 0, Math.PI*2, false);
				this.canvas.closePath();
				
				this.canvas.fillStyle = "rgb(0,0,0)";
				this.canvas.strokeStyle = "rgb(0,0,0)";

				this.canvas.fill();
				this.canvas.stroke();
			}
		}
	}
	
	public addStartShape(shape: Shape): void {
		this.shapes.push(shape);
		this.startElements.push(shape);
	}
	
	public addShape(shape: Shape): void {		
		this.shapes.push(shape);
	}
}

export = Playground;