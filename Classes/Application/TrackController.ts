import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import Playground = require("Classes/Domain/Model/Playground");

class TrackController {
	playground: Playground;
	startingElements: Shape[];
	
	constructor() {
		this.playground = new Playground(<HTMLCanvasElement>document.getElementById('canvas'));
	
		var straightRail: ShapeType = new ShapeType("Straight rail");
		var rail1:Shape = new Shape(straightRail,new Point(100,100),[]);
		rail1.createConnectionPoint(new Vector(6.4, 0.5), 0.5);
		rail1.createConnectionPoint(new Vector(6.4, 0.0), 0.0);
		this.playground.addStartShape(rail1);
		this.playground.draw();
	}
}

export = TrackController;