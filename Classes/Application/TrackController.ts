import Shape = require("Classes/Domain/Model/Shape");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import Playground = require("Classes/Domain/Model/Playground");

class TrackController {
	playground: Playground;
	startingElements: Shape[];
	
	constructor() {
		this.playground = new Playground(<HTMLCanvasElement>document.getElementById('canvas'));
	
		var straightRail = new Shape(new Point(100,100),[],"Straight");
		straightRail.createConnectionPoint(new Vector(6.4, 0.5), 0.5);
		straightRail.createConnectionPoint(new Vector(6.4, 0.0), 0.0);
		this.playground.addStartShape(straightRail);
		this.playground.draw();
	}
}

export = TrackController;