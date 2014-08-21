import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import Layout = require("Classes/Domain/Model/Layout");

import AddShapeCommand = require("Classes/Application/UI/AddShapeCommand");

class TrackController {
	shapeTypes: { [index: string]: ShapeType; } = {};
	layout: Layout;
	startingElements: Shape[];
	
	constructor() {
		this.shapeTypes = this.createShapeTypes();		
		this.layout = new Layout(<HTMLCanvasElement>document.getElementById('canvas'), 0.5);
		this.bindUI();
	
		var railStraight: ShapeType = this.shapeTypes['railStraight'];
		var railCurved: ShapeType = this.shapeTypes['railCurved'];
		var switchStraight: ShapeType = this.shapeTypes['switchStraight'];
		
		var rail1:Shape = new Shape(railStraight,new Point(200,200),[]);
		rail1.createConnectionPoint(railStraight.connectionPoints[1]);
		rail1.createConnectionPoint(railStraight.connectionPoints[0]);
		this.layout.addStartShape(rail1);		
		
		var rail2: Shape = Shape.createFromConnectionPoint(railStraight, rail1.getConnectionPoints()[1]);
		var rail3: Shape = Shape.createFromShape(railCurved, rail2);
		rail3.rotate();
		var rail4: Shape = Shape.createFromShape(railCurved, rail3);
		var rail45: Shape = Shape.createFromShape(railStraight, rail4);
		var rail5: Shape = Shape.createFromShape(railCurved, rail45);
		var rail6: Shape = Shape.createFromShape(railCurved, rail5);
		var rail7: Shape = Shape.createFromShape(railStraight, rail6);
		var rail8: Shape = Shape.createFromShape(railStraight, rail7);
		var switch1: Shape = Shape.createFromShape(switchStraight, rail8);
		var rail9: Shape = Shape.createFromShape(railCurved, switch1);
		var rail10: Shape = Shape.createFromShape(railCurved, switch1);			
		rail10.rotate();		
		var rail11: Shape = Shape.createFromShape(railCurved, rail10);
		rail11.rotate();
		var rail12: Shape = Shape.createFromShape(railCurved, rail9);
		
		this.layout.addShape(rail2);
		this.layout.addShape(rail3);
		this.layout.addShape(rail4);
		this.layout.addShape(rail45);
		this.layout.addShape(rail5);
		this.layout.addShape(rail6);
		this.layout.addShape(rail7);
		this.layout.addShape(rail8);
		this.layout.addShape(switch1);
		this.layout.addShape(rail9);
		this.layout.addShape(rail10);
		this.layout.addShape(rail11);
		this.layout.addShape(rail12);
		
		this.layout.draw();
		
		
	}
	
	private createShapeTypes(): any {
		return {
			railStraight: new ShapeType(
				"Rail straight",
				[new Vector(63.8, 0.0, 0.0), new Vector(63.8, 0.5, 0.5)],
				127.6,
				95.7,
				"Resources/Img/Tracks/railStraight.png"
			),
			railCurved: new ShapeType(
				"Rail curved",
				[new Vector(62.3424, 0.9906, 0.96875),new Vector(62.3424, 0.5094, 0.53125)],
				143.13777, // 136.9144
				100.91007, // 69.9295
				"Resources/Img/Tracks/railCurved.png"		
			),
			switchStraight: new ShapeType(
				"Switch straight",
				[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.96101, 0.0)],
				255.2,
				159.5,
				"Resources/Img/Tracks/switchStraight.png"
			)
		};			
	}
	
	private bindUI() {
		var addShapeCommand: AddShapeCommand = new AddShapeCommand(this.layout);
		var buttonAddShape: HTMLElement = document.getElementById('addShapeButton');
		buttonAddShape.onclick = function() { addShapeCommand.execute(); }
		buttonAddShape.disabled = !addShapeCommand.isExecutable();
	}
}

export = TrackController;