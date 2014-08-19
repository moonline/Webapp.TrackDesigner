import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Shape = require("Classes/Domain/Model/Shape");

class Layout {
	canvas: CanvasRenderingContext2D;
	startElements: Shape[]; 
	shapes: Shape[];
	factor: number;
	
	constructor(canvasElement: HTMLCanvasElement, factor: number = 1) {
		this.canvas = canvasElement.getContext('2d');
		this.startElements = [];
		this.shapes = [];
		this.factor = factor;
	}
	
	public draw(): void {
		for(var si in this.shapes) {
			var shape: Shape = this.shapes[si];
			
			this.drawPoint(shape.getPosition(), 2);
			if(shape.getType().getImagePath() != "") {
				//var img: Image = new Image;
				//img.src = shape.getType().getImagePath();
				
				// TODO: calc image startPosition and angle
				// http://stackoverflow.com/questions/3793397/html5-canvas-drawimage-with-at-an-angle
				
				//canvas.drawImage(img,10,10,100,100)
			}			
			
			var connectionPoints: ConnectionPoint[] = shape.getConnectionPoints();
			for(var cpi in connectionPoints) {				
				this.drawPoint(connectionPoints[cpi].getPosition(), 4, "rgb(255,0,0)", "rgb(255,0,0)");
			}
		}
	}
	
	private drawPoint(position: Point, radius: number, fillStyle: string = "rgb(0,0,0)", strokeStyle: string = "rgb(0,0,0)") {
		this.canvas.beginPath();
		// Startposition festlegen (gleich dem Mittelpkt)
		this.canvas.moveTo(position.getX()*this.factor, position.getY()*this.factor);
		// Kreis um den Mittelpunkt zeichnen
		this.canvas.arc(position.getX()*this.factor, position.getY()*this.factor, radius*this.factor, 0, Math.PI*2, false);
		this.canvas.closePath();
		
		this.canvas.fillStyle = fillStyle;
		this.canvas.strokeStyle = strokeStyle;

		this.canvas.fill();
		this.canvas.stroke();
	}
	
	public addStartShape(shape: Shape): void {
		this.shapes.push(shape);
		this.startElements.push(shape);
	}
	
	public addShape(shape: Shape): void {		
		this.shapes.push(shape);
	}
}

export = Layout;