import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Shape = require("Classes/Domain/Model/Shape");

class Layout {
	canvas: CanvasRenderingContext2D;
	startElements: Shape[]; 
	shapes: Shape[];
	factor: number;
	currentElement: any = null;
	
	constructor(canvasElement: HTMLCanvasElement, factor: number = 1) {
		this.canvas = canvasElement.getContext('2d');
		this.startElements = [];
		this.shapes = [];
		this.factor = factor;
		this.currentElement = this;
	}
	
	public draw(): void {
		for(var si in this.shapes) {
			var shape: Shape = this.shapes[si];
			
			this.drawPoint(shape.getPosition(), 2);
			if(shape.getType().getImagePath() != "") {
				var img: HTMLImageElement = new Image;
				img.src = shape.getType().getImagePath();
				
				this.drawRotatedImage(img, shape.getPosition(), shape.getType().getWidth(), shape.getType().getHeight());
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
	
	private drawRotatedImage(image: HTMLImageElement, position: Point, width: number, height: number) {	
		// save the current co-ordinate system before we screw with it
		this.canvas.save(); 
	
		// move to the middle of where we want to draw our image
		this.canvas.translate(position.getX()*this.factor, position.getY()*this.factor);
	
		// rotate around that point, converting our angle from degrees to radians 
		this.canvas.rotate(position.getAngle()*Math.PI*2);
	
		// draw it up and to the left by half the width and height of the image 
		this.canvas.drawImage(image, -(width/2)*this.factor, -(height/2)*this.factor, width*this.factor, height*this.factor);
	
		// and restore the co-ords to how they were when we began
		this.canvas.restore(); 
	}
}

export = Layout;