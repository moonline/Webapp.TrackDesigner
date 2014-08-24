import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import DesignerView = require("Classes/View/DesignerView");

import Layout = require("Classes/Domain/Model/Layout");
import AddShapeCommand = require("Classes/Application/UI/AddShapeCommand");

class TrackController {
	shapeTypes: { [index: string]: ShapeType; } = {};
	
	constructor() {
		this.shapeTypes = this.createShapeTypes();
	}
	
	public designerAction(): void {
		var layout: Layout = new Layout();
		layout.addShape(Shape.createShape(this.shapeTypes['railStraight'], new Point(200,200)));
		//this.createDummyTracks(layout);
		var designerView: DesignerView = new DesignerView(layout, this.shapeTypes);
	}
	
	public createDummyTracks(layout: Layout): void {
		var railStraight: ShapeType = this.shapeTypes['railStraight'];
		var railCurved: ShapeType = this.shapeTypes['railCurved'];
		var switchStraightLeft: ShapeType = this.shapeTypes['switchStraightLeft'];
		var switchStraightRight: ShapeType = this.shapeTypes['switchStraightRight'];
		
		var rail1:Shape = new Shape(railStraight,new Point(200,200),[]);
		rail1.createConnectionPoint(railStraight.connectionPoints[1]);
		rail1.createConnectionPoint(railStraight.connectionPoints[0]);
		layout.addShape(rail1);		
		
		var rail2: Shape = Shape.createFromConnectionPoint(railStraight, rail1.getConnectionPoints()[1]);
		var rail3: Shape = Shape.createFromShape(railCurved, rail2);
		rail3.rotate();
		
		var rail4: Shape = Shape.createFromShape(railCurved, rail3);
		var rail45: Shape = Shape.createFromShape(railStraight, rail4);
		var rail5: Shape = Shape.createFromShape(railCurved, rail45);
		var rail6: Shape = Shape.createFromShape(railCurved, rail5);
		var rail7: Shape = Shape.createFromShape(railStraight, rail6);
		var rail8: Shape = Shape.createFromShape(railStraight, rail7);
		var switch1: Shape = Shape.createFromShape(switchStraightLeft, rail8);
		var rail9: Shape = Shape.createFromShape(railCurved, switch1);
		var rail10: Shape = Shape.createFromShape(railCurved, switch1);			
		rail10.rotate();	
		
		var rail11: Shape = Shape.createFromShape(railCurved, rail10);
		rail11.rotate();
		
		var rail12: Shape = Shape.createFromShape(railCurved, rail9);
		var switch2: Shape = Shape.createFromShape(switchStraightRight, rail12);
		
		layout.addShape(rail2);
		layout.addShape(rail3);
		layout.addShape(rail4);
		layout.addShape(rail45);
		layout.addShape(rail5);
		layout.addShape(rail6);
		layout.addShape(rail7);
		layout.addShape(rail8);
		layout.addShape(switch1);
		layout.addShape(rail9);
		layout.addShape(rail10);
		layout.addShape(rail11);
		layout.addShape(rail12);
		layout.removeShape(rail5);
		layout.addShape(switch2);
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
			switchStraightLeft: new ShapeType(
				"Switch straight left",
				[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.96101, 0.0)],
				255.2,
				159.5,
				"Resources/Img/Tracks/switchStraightLeft.png"
			),
			switchStraightRight: new ShapeType(
				"Switch straight right",
				[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.53899, 0.5)],
				255.2,
				159.5,
				"Resources/Img/Tracks/switchStraightRight.png"
			)
		};			
	}
}

export = TrackController;