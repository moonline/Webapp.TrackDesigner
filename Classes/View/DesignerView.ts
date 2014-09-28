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

class DesignerView extends Observable implements Observer {
	viewConfig: any;
	factor: number;
	elements: { [index: string]: HTMLElement; } = {};	
	canvas: CanvasRenderingContext2D;
	layout: Layout;
	shapeTypes: { [index: string]: ShapeType; } = {};
	variantTypes: { [index: string]: VariantType; } = {};
	
	constructor(layout: Layout, shapeTypes: { [index: string]: ShapeType; }, variantTypes: { [index: string]: VariantType; }) {
		super();
		this.viewConfig = {
			shapePointSize: 50,
			connectionPointSize: 15,
			connectedPointSize: 2,
			freePointSize: 15
		};
		this.setLayout(layout);
		this.shapeTypes = shapeTypes;
		this.variantTypes = variantTypes
		this.factor = 0.5;
	}

	public setLayout(layout: Layout): void {
		this.layout = layout;
		this.layout.addObserver(this);
	}

	private initializeUiElement(elementId: string): HTMLElement {
		this.elements[elementId] = <HTMLElement>document.getElementById(elementId);
		return this.elements[elementId];
	}
	
	private createShapeTypesMenu(): void {
		this.elements['shapeTypes'].innerHTML = '';
		
		var selectElement: HTMLSelectElement = (<HTMLSelectElement>this.elements['variantTypes']);
		var selectedVariantIndex: number = selectElement.selectedIndex;
		if(selectedVariantIndex > 0) {
			var variantType: VariantType = this.variantTypes[selectElement.options[selectedVariantIndex].value];
			var shapeTypesButtons: HTMLButtonElement[] = [];

			Object.keys(this.shapeTypes).forEach(function(key) {
				var shapeType: ShapeType = this.shapeTypes[key];
				if(shapeType.hasVariant(variantType)) {
					var variant: Variant = shapeType.getVariantByType(variantType);

					var button = document.createElement('button');
					button.innerHTML = '<img class="track" src="'+variant.getImage()+'" alt="'+shapeType.getName()+'" />';
					button.title = shapeType.getName();

					button.addEventListener('click', function(event) {
						this.layout.createShape(shapeType, variant);
						if(this.layout.getCurrentElement() instanceof Shape) {
							this.scrollToCenter(this.layout.getCurrentElement().getPosition());
						}
					}.bind(this));

					this.elements['shapeTypes'].appendChild(button);
				}
			}.bind(this));
		} else {
			Object.keys(this.shapeTypes).forEach(function(key) {
				var shapeType: ShapeType = this.shapeTypes[key];

				Object.keys(this.variantTypes).forEach(function(vtKey) {
					var variantType: VariantType = this.variantTypes[vtKey];

					if(shapeType.hasVariant(variantType)) {
						var variant: Variant = shapeType.getVariantByType(variantType);

						var button = document.createElement('button');
						button.innerHTML = '<img class="track" src="'+variant.getImage()+'" alt="'+shapeType.getName()+'" />';
						button.title = shapeType.getName();

						button.addEventListener('click', function(event) {
							this.layout.createShape(shapeType, variant);
							if(this.layout.getCurrentElement() instanceof Shape) {
								this.scrollToCenter(this.layout.getCurrentElement().getPosition());
							}
						}.bind(this));

						this.elements['shapeTypes'].appendChild(button);
					}
				}.bind(this));
			}.bind(this));
		}
	}
	
	public initializeView(): void {
		var canvasElement: HTMLElement = <HTMLElement>document.getElementById('layoutArea');
		this.elements['canvas'] = canvasElement;

		canvasElement.addEventListener('click', function(event) {
			var x: number = event.pageX - canvasElement.offsetLeft + (<HTMLDivElement>canvasElement.parentNode).scrollLeft;
			var y: number = event.pageY - canvasElement.offsetTop + (<HTMLDivElement>canvasElement.parentNode).scrollTop;

			this.layout.setCurrentElementByPosition(new Point(x/this.factor,y/this.factor),this.viewConfig);
		}.bind(this));
		(<HTMLCanvasElement>this.elements['canvas']).width = this.layout.getWidth()*this.factor;
		(<HTMLCanvasElement>this.elements['canvas']).height = this.layout.getHeight()*this.factor;
		
		
		this.canvas = (<HTMLCanvasElement>this.elements['canvas']).getContext('2d');
		
		this.initializeUiElement('variantTypes');

		// all
		var option = document.createElement('option');
		option.value = 'all';
		option.title = 'All';
		option.innerHTML = '<span class="label">All</span>';
		this.elements['variantTypes'].appendChild(option);

		Object.keys(this.variantTypes).forEach(function(key) {
			var variantType: VariantType = this.variantTypes[key];
			var option = document.createElement('option');
			if(variantType.getName() == "Default") {
				option.selected = true;
			}
			option.value = key;
			option.title = variantType.getName();
			
			option.innerHTML = '<img class="icon" src="'+variantType.getImage()+'" /><span class="label">'+variantType.getName()+'</span>';
			
			this.elements['variantTypes'].appendChild(option);
		}.bind(this));
		
		this.initializeUiElement('shapeTypes')
		this.elements['variantTypes'].addEventListener('change', function(event) {
			this.createShapeTypesMenu();
		}.bind(this));		
		this.createShapeTypesMenu();
		
		this.initializeUiElement('buttonRemove').addEventListener('click', function(event) {
			this.layout.removeCurrentShape();
		}.bind(this));		
		
		document.body.addEventListener('keydown', function(event) {
			if (event.keyCode === event.DOM_VK_BACK_SPACE || event.keyCode === 8 || event.keyCode === event.DOM_VK_DELETE || event.keyCode === 46) {
				this.layout.removeCurrentShape();
			}
		}.bind(this));
		
		this.initializeUiElement('buttonRotate').addEventListener('click', function(event) {
			this.layout.rotateCurrentShape();
		}.bind(this));
		
		document.body.addEventListener('keypress', function(event) {
			if (String.fromCharCode(event.charCode) === 'r') {
				this.layout.rotateCurrentShape();
			}
		}.bind(this));
		
		this.initializeUiElement('buttonExport').addEventListener('click', function(event) {
			this.exportLayout();
		}.bind(this));

		this.initializeUiElement('buttonSave').addEventListener('click', function(event) {
			this.notifyObservers(EventType.actionCall,{action:"save"});
		}.bind(this));

		this.initializeUiElement('buttonOpen').addEventListener('change', function(event) {
			// change to tab with all chapes because crappy browser won't render other shape image in canvas, change back after
			(<HTMLSelectElement>document.getElementById('variantTypes')).value = 'all';
			this.createShapeTypesMenu();
			this.notifyObservers(EventType.actionCall,{action:"open", file: event.target.files[0] });
			(<HTMLSelectElement>document.getElementById('variantTypes')).value = 'Default';
			this.createShapeTypesMenu();
		}.bind(this));
		
		this.initializeUiElement('moveToFront').addEventListener('click', function(event) {
			if(this.layout.getCurrentElement() instanceof Shape) {
				this.layout.moveShapeToFront(this.layout.getCurrentElement());
			}
		}.bind(this));
		
		this.draw();
	}
	
	public draw(drawControlElements: boolean = true): void {
		this.canvas.clearRect(0, 0, (<HTMLCanvasElement>this.elements['canvas']).width, (<HTMLCanvasElement>this.elements['canvas']).height);
		this.drawBackground();
		
		for(var si in this.layout.shapes) {
			var shape: Shape = this.layout.shapes[si];
			
			if(shape.getVariant().getImage() != "") {
				var img: HTMLImageElement = new Image;
				img.src = shape.getVariant().getImage();
				
				this.drawRotatedImage(img, shape.getPosition(), shape.getVariant().getWidth(), shape.getVariant().getHeight());
			}
			
			if(drawControlElements && shape === this.layout.getCurrentElement()) {				
				this.canvas.globalAlpha = 0.4;
				this.drawRectangle(shape.getCorners(), "rgb(255,255,0)", "rgb(255,255,0)");
				this.canvas.globalAlpha = 1;
			}
					
			
			var connectionPoints: ConnectionPoint[] = shape.getConnectionPoints();
			for(var cpi in connectionPoints) {
				if(drawControlElements && connectionPoints[cpi].getConnection() == null) {
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
		
		if(drawControlElements && this.layout.getCurrentElement() instanceof Point) {
			this.drawPoint(this.layout.getCurrentElement(), this.viewConfig.freePointSize, "rgb(255,140,0)", "rgb(255,140,0)");
		}
	}

	private scrollToCenter(point: Point): void {
		var scrollContainer: HTMLDivElement = <HTMLDivElement>this.elements['canvas'].parentNode;
		var scrollToX = (point.getX()*this.factor)-(scrollContainer.clientWidth/2);
		var scrollToY = (point.getY()*this.factor)-(scrollContainer.clientHeight/2);
		if(scrollToX > 0) {
			scrollContainer.scrollLeft = scrollToX;
		}
		if(scrollToX > 0) {
			scrollContainer.scrollTop = scrollToY;
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
		this.draw(false);
		window.open(
			(<HTMLCanvasElement>this.elements['canvas']).toDataURL("image/png"),
			'_blank'
		);
		this.draw();
	}
	
	public notify(event: EventType, notifier: Observable, subject: any) {
		if(event === EventType.objectResized && subject instanceof Layout || event === EventType.objectReplaced && subject instanceof Layout) {
			(<HTMLCanvasElement>this.elements['canvas']).width = this.layout.getWidth()*this.factor;
			(<HTMLCanvasElement>this.elements['canvas']).height = this.layout.getHeight()*this.factor;
		}
		if(event === EventType.objectReplaced && subject instanceof Layout) {
			this.draw();
		}
	
		this.draw();
	}
}

export = DesignerView;
