import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import VariantType = require("Classes/Domain/Model/VariantType");
import Variant = require("Classes/Domain/Model/Variant");

import Layout = require("Classes/Domain/Model/Layout");
import DesignerView = require("Classes/View/DesignerView");

import ShapeConfiguration = require("Configuration/ShapeConfiguration");


class TrackController {
	shapeTypes: { [index: string]: ShapeType; } = {};
	variantTypes: { [index: string]: VariantType; } = {};
	
	constructor() {
	}
	
	public designerAction(): void {
		var layout: Layout = new Layout();
		layout.setStartPoint(new Point(100,100));
		var designerView: DesignerView = new DesignerView(layout, ShapeConfiguration.shapeTypes, ShapeConfiguration.variantTypes);
	}
}

export = TrackController;