import Point = require("Classes/Domain/Model/Point");
import Vector = require("Classes/Domain/Model/Vector");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Shape = require("Classes/Domain/Model/Shape");
import Layout = require("Classes/Domain/Model/Layout");

class DesignerView {
	viewConfig: any;
	factor: number;
	elements: { [index: string]: HTMLElement; } = {};	
	canvas: CanvasRenderingContext2D;
	layout: Layout;
	shapeTypes: { [index: string]: ShapeType; } = {};
	
	constructor(layout: Layout, shapeTypes: { [index: string]: ShapeType; }) {
		this.viewConfig = {
			shapePointSize: 50,
			connectionPointSize: 10,
			connectedPointSize: 2,
			freePointSize: 10
		}
	
		this.layout = layout;
		this.shapeTypes = shapeTypes;
		this.factor = 0.5;
		
		this.initializeView();
	}
	
	private initializeView(): void {
		var canvasElement: HTMLElement = <HTMLElement>document.getElementById('layoutArea');
		this.elements['canvas'] = canvasElement;
		canvasElement.addEventListener('click', function(event) {
			var x: number = event.pageX - canvasElement.offsetLeft;
			var y: number = event.pageY - canvasElement.offsetTop;

			this.layout.setCurrentElementByPosition(new Point(x/this.factor,y/this.factor),this.viewConfig);
			this.draw();
		}.bind(this));
		
		this.canvas = (<HTMLCanvasElement>this.elements['canvas']).getContext('2d');
		
		this.elements['shapeTypes'] = <HTMLElement>document.getElementById('shapeTypes');
		Object.keys(this.shapeTypes).forEach(function(key) {
			var shapeType: ShapeType = this.shapeTypes[key];
			var button = document.createElement('button');
			button.innerHTML = '<img class="track" src="'+shapeType.getImagePath()+'" alt="'+shapeType.getName()+'" />';
			
			button.addEventListener('click', function(event) {
				var shape: Shape;
				if(this.layout.getCurrentElement() instanceof Shape) {
					var shape: Shape = Shape.createFromShape(shapeType, this.layout.getCurrentElement());
				} else if(this.layout.getCurrentElement() instanceof Point) {
					var shape: Shape = Shape.createShape(shapeType, this.layout.getCurrentElement());
				}
				if(shape != null) {
					this.layout.addShape(shape);
					this.draw();
				}
			}.bind(this));
			
			this.elements['shapeTypes'].appendChild(button);
		}.bind(this));
		
		this.elements['buttonRemove'] = <HTMLElement>document.getElementById('buttonRemove');
		this.elements['buttonRemove'].addEventListener('click', function(event) {
			this.layout.removeCurrentShape();
			this.draw();
		}.bind(this));		
		
		document.body.addEventListener('keydown', function(event) {
			if (event.keyCode === event.DOM_VK_BACK_SPACE || event.keyCode === 8 || event.keyCode === event.DOM_VK_DELETE || event.keyCode === 46) {
				this.layout.removeCurrentShape();
				this.draw();
			}
		}.bind(this));
		
		this.elements['buttonRotate'] = <HTMLElement>document.getElementById('buttonRotate');
		this.elements['buttonRotate'].addEventListener('click', function(event) {
			this.layout.rotateCurrentShape();
			this.draw();
		}.bind(this));
		
		document.body.addEventListener('keypress', function(event) {
			if (String.fromCharCode(event.charCode) === 'r') {
				this.layout.rotateCurrentShape();
				this.draw();
			}
		}.bind(this));
		
		this.draw();
	}
	
	public draw(): void {
		this.canvas.clearRect(0, 0, (<HTMLCanvasElement>this.elements['canvas']).width, (<HTMLCanvasElement>this.elements['canvas']).height);
		
		if(this.layout.getCurrentElement() instanceof Point) {
			this.drawPoint(this.layout.getCurrentElement(), this.viewConfig.freePointSize, "rgb(255,140,0)", "rgb(255,140,0)");
		}
		
		for(var si in this.layout.shapes) {
			var shape: Shape = this.layout.shapes[si];
			
			if(shape.getType().getImagePath() != "") {
				var img: HTMLImageElement = new Image;
				img.src = shape.getType().getImagePath();
				
				this.drawRotatedImage(img, shape.getPosition(), shape.getType().getWidth(), shape.getType().getHeight());
			}
			
			if(shape === this.layout.getCurrentElement()) {				
				this.canvas.globalAlpha = 0.5;
				this.drawPoint(shape.getPosition(), this.viewConfig.shapePointSize, "rgb(255,255,0)", "rgb(255,255,0)");
				this.canvas.globalAlpha = 1;
			}
					
			
			var connectionPoints: ConnectionPoint[] = shape.getConnectionPoints();
			for(var cpi in connectionPoints) {
				if(connectionPoints[cpi].getConnection() == null) {
					this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectionPointSize, "rgb(0,255,0)", "rgb(0,255,0)");
				} else {					
					this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectedPointSize, "rgb(255,255,255)", "rgb(255,255,255)");
				}
			}
		}
	}
	
	private drawPoint(position: Point, radius: number, fillStyle: string = "rgb(0,0,0)", strokeStyle: string = "rgb(0,0,0)"): void {
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
	
	private drawRotatedImage(image: HTMLImageElement, position: Point, width: number, height: number): void {	
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

export = DesignerView;