import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import Layout = require("Classes/Domain/Model/Layout");

class TrackController {
	shapeTypes: { [index: string]: ShapeType; } = {};
	layout: Layout;
	startingElements: Shape[];
	
	constructor() {
		this.shapeTypes = this.createShapeTypes();
		
		this.layout = new Layout(<HTMLCanvasElement>document.getElementById('canvas'), 0.5);
	
		var railStraight: ShapeType = this.shapeTypes['railStraight'];
		var railCurved: ShapeType = this.shapeTypes['railCurved'];
		
		var rail1:Shape = new Shape(railStraight,new Point(200,200),[]);
		rail1.createConnectionPoint(railStraight.connectionPoints[1]);
		rail1.createConnectionPoint(railStraight.connectionPoints[0]);
		this.layout.addStartShape(rail1);		
		
		var rail2: Shape = Shape.createFromConnectionPoint(railStraight, rail1.getConnectionPoints()[1]);
		var rail3: Shape = Shape.createFromConnectionPoint(railCurved, rail2.getConnectionPoints()[1]);
		var rail4: Shape = Shape.createFromConnectionPoint(railCurved, rail3.getConnectionPoints()[1]);
		var rail45: Shape = Shape.createFromConnectionPoint(railStraight, rail4.getConnectionPoints()[1]);
		var rail5: Shape = Shape.createFromConnectionPoint(railCurved, rail45.getConnectionPoints()[1]);
		var rail6: Shape = Shape.createFromConnectionPoint(railCurved, rail5.getConnectionPoints()[1]);
		var rail7: Shape = Shape.createFromConnectionPoint(railStraight, rail6.getConnectionPoints()[1]);
		var rail8: Shape = Shape.createFromConnectionPoint(railStraight, rail7.getConnectionPoints()[1]);
		
		this.layout.addShape(rail2);
		this.layout.addShape(rail3);
		this.layout.addShape(rail4);
		this.layout.addShape(rail45);
		this.layout.addShape(rail5);
		this.layout.addShape(rail6);
		this.layout.addShape(rail7);
		this.layout.addShape(rail8);
		
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
				136.9144,
				69.9295,
				"Resources/Img/Tracks/railCurved.png"		
			)
		};			
	}
}

export = TrackController;