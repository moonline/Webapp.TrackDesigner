import Point = require("Classes/Domain/Model/Point");
import Vector = require("Classes/Domain/Model/Vector");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Shape = require("Classes/Domain/Model/Shape");
import Layout = require("Classes/Domain/Model/Layout");
import VariantType = require("Classes/Domain/Model/VariantType");
import Variant = require("Classes/Domain/Model/Variant");

import Observer = require("Classes/Utility/Observer");
import Observable = require("Classes/Utility/Observable");
import EventType = require("Classes/Utility/EventType");

class DesignerView implements Observer {
	viewConfig: any;
	factor: number;
	elements: { [index: string]: HTMLElement; } = {};	
	canvas: CanvasRenderingContext2D;
	layout: Layout;
	shapeTypes: { [index: string]: ShapeType; } = {};
	variantTypes: { [index: string]: VariantType; } = {};
	
	constructor(layout: Layout, shapeTypes: { [index: string]: ShapeType; }, variantTypes: { [index: string]: VariantType; }) {
		this.viewConfig = {
			shapePointSize: 50,
			connectionPointSize: 15,
			connectedPointSize: 2,
			freePointSize: 15
		}
	
		this.layout = layout;
		this.layout.addObserver(this);
		this.shapeTypes = shapeTypes;
		this.variantTypes = variantTypes
		this.factor = 0.5;
		
		this.initializeView();
	}
	
	private createShapeTypesMenu(): void {
		this.elements['shapeTypes'].innerHTML = '';
		
		var selectElement: HTMLSelectElement = (<HTMLSelectElement>this.elements['variantTypes']);
		var selectedVariantIndex: number = selectElement.selectedIndex;
		var variantType: VariantType = this.variantTypes[selectElement.options[selectedVariantIndex].value];		
		var shapeTypesButtons: HTMLButtonElement[] = [];
	
		Object.keys(this.shapeTypes).forEach(function(key) {
			var shapeType: ShapeType = this.shapeTypes[key];
			if(shapeType.hasVariant(variantType)) {
				var variant: Variant = shapeType.getVariantByType(variantType);
				
				var button = document.createElement('button');
				button.innerHTML = '<img class="track" src="'+variant.getImage()+'" alt="'+shapeType.getName()+'" />';
				
				button.addEventListener('click', function(event) {
					this.layout.createShape(shapeType, variant);
				}.bind(this));
				
				this.elements['shapeTypes'].appendChild(button);
			}
		}.bind(this));
	}
	
	private initializeView(): void {
		var canvasElement: HTMLElement = <HTMLElement>document.getElementById('layoutArea');
		this.elements['canvas'] = canvasElement;
		canvasElement.addEventListener('click', function(event) {
			var x: number = event.pageX - canvasElement.offsetLeft;
			var y: number = event.pageY - canvasElement.offsetTop;

			this.layout.setCurrentElementByPosition(new Point(x/this.factor,y/this.factor),this.viewConfig);
		}.bind(this));
		(<HTMLCanvasElement>this.elements['canvas']).width = this.layout.getWidth()*this.factor;
		(<HTMLCanvasElement>this.elements['canvas']).height = this.layout.getHeight()*this.factor;
		
		
		this.canvas = (<HTMLCanvasElement>this.elements['canvas']).getContext('2d');
		
		this.elements['variantTypes'] = <HTMLElement>document.getElementById('variantTypes');
		Object.keys(this.variantTypes).forEach(function(key) {
			var variantType: VariantType = this.variantTypes[key];
			var option = document.createElement('option');
			if(variantType.getName() == "Default") {
				option.selected = true;
			}
			option.value = key;
			option.text = variantType.getName();
			
			this.elements['variantTypes'].appendChild(option);
		}.bind(this));
		
		this.elements['shapeTypes'] = <HTMLElement>document.getElementById('shapeTypes');
		this.elements['variantTypes'].addEventListener('change', function(event) {
			this.createShapeTypesMenu();
		}.bind(this));		
		this.createShapeTypesMenu();
		
		this.elements['buttonRemove'] = <HTMLElement>document.getElementById('buttonRemove');
		this.elements['buttonRemove'].addEventListener('click', function(event) {
			this.layout.removeCurrentShape();
		}.bind(this));		
		
		document.body.addEventListener('keydown', function(event) {
			if (event.keyCode === event.DOM_VK_BACK_SPACE || event.keyCode === 8 || event.keyCode === event.DOM_VK_DELETE || event.keyCode === 46) {
				this.layout.removeCurrentShape();
			}
		}.bind(this));
		
		this.elements['buttonRotate'] = <HTMLElement>document.getElementById('buttonRotate');
		this.elements['buttonRotate'].addEventListener('click', function(event) {
			this.layout.rotateCurrentShape();
		}.bind(this));
		
		document.body.addEventListener('keypress', function(event) {
			if (String.fromCharCode(event.charCode) === 'r') {
				this.layout.rotateCurrentShape();
			}
		}.bind(this));
		
		this.elements['buttonExport'] = <HTMLElement>document.getElementById('buttonExport');
		this.elements['buttonExport'].addEventListener('click', function(event) {
			this.exportLayout();
		}.bind(this));
		
		this.elements['moveToFront'] = <HTMLElement>document.getElementById('moveToFront');
		this.elements['moveToFront'].addEventListener('click', function(event) {
			if(this.layout.getCurrentElement() instanceof Shape) {
				this.layout.moveShapeToFront(this.layout.getCurrentElement());
			}
		}.bind(this));
		
		this.draw();
	}
	
	public draw(): void {
		this.canvas.clearRect(0, 0, (<HTMLCanvasElement>this.elements['canvas']).width, (<HTMLCanvasElement>this.elements['canvas']).height);
		this.drawBackground();
		
		for(var si in this.layout.shapes) {
			var shape: Shape = this.layout.shapes[si];
			
			if(shape.getVariant().getImage() != "") {
				var img: HTMLImageElement = new Image;
				img.src = shape.getVariant().getImage();
				
				this.drawRotatedImage(img, shape.getPosition(), shape.getVariant().getWidth(), shape.getVariant().getHeight());
			}
			
			if(shape === this.layout.getCurrentElement()) {				
				this.canvas.globalAlpha = 0.4;
				this.drawRectangle(shape.getCorners(), "rgb(255,255,0)", "rgb(255,255,0)");
				this.canvas.globalAlpha = 1;
			}
					
			
			var connectionPoints: ConnectionPoint[] = shape.getConnectionPoints();
			for(var cpi in connectionPoints) {
				if(connectionPoints[cpi].getConnection() == null) {
					if(connectionPoints[cpi] === this.layout.getCurrentElement()) {
						this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectionPointSize, "rgb(255,140,0)", "rgb(255,140,0)");
					} else {
						this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectionPointSize, "rgb(0,255,0)", "rgb(0,255,0)");
					}
				} else {					
					this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectedPointSize, "rgb(255,255,255)", "rgb(255,255,255)");
				}
			}
		}		
		
		if(this.layout.getCurrentElement() instanceof Point) {
			this.drawPoint(this.layout.getCurrentElement(), this.viewConfig.freePointSize, "rgb(255,140,0)", "rgb(255,140,0)");
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
	
	private drawRectangle(points: Point[], fillStyle: string = null, strokeStyle: string = null, lineWidth: number = 1): void {
		if(points.length > 2) {
			this.canvas.beginPath();
			this.canvas.moveTo(points[0].getX()*this.factor, points[0].getY()*this.factor);
			for(var pi = 1; pi < points.length; pi++) {
				this.canvas.lineTo(points[pi].getX()*this.factor, points[pi].getY()*this.factor);
			}
			this.canvas.lineTo(points[0].getX()*this.factor, points[0].getY()*this.factor);
			
			if(fillStyle) {
				this.canvas.fillStyle = fillStyle;
				this.canvas.fill();
			}
			if(strokeStyle) {
				this.canvas.lineWidth = lineWidth;
				this.canvas.strokeStyle = strokeStyle;
				this.canvas.stroke();
			}
		}
	}
	
	private drawBackground(): void {
		this.canvas.beginPath();
		this.canvas.rect(0, 0, (<HTMLCanvasElement>this.elements['canvas']).width, (<HTMLCanvasElement>this.elements['canvas']).height);
		this.canvas.fillStyle = 'white';
		this.canvas.fill();
	}
	
	private exportLayout(): void {
		window.open(
			(<HTMLCanvasElement>this.elements['canvas']).toDataURL("image/png"),
			'_blank'
		);
	}
	
	public notify(event: EventType, notifier: Observable, subject: any) {
		if(event === EventType.objectResized && subject instanceof Layout) {
			(<HTMLCanvasElement>this.elements['canvas']).width = this.layout.getWidth()*this.factor;
			(<HTMLCanvasElement>this.elements['canvas']).height = this.layout.getHeight()*this.factor;
		}
	
		this.draw();
	}
}

export = DesignerView;