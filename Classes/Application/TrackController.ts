import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import DesignerView = require("Classes/View/DesignerView");
import VariantType = require("Classes/Domain/Model/VariantType");
import Variant = require("Classes/Domain/Model/Variant");

import Layout = require("Classes/Domain/Model/Layout");
import AddShapeCommand = require("Classes/Application/UI/AddShapeCommand");

class TrackController {
	shapeTypes: { [index: string]: ShapeType; } = {};
	variantTypes: { [index: string]: VariantType; } = {};
	
	constructor() {
		this.variantTypes = this.createVariantTypes();
		this.shapeTypes = this.createShapeTypes();
	}
	
	public designerAction(): void {
		var layout: Layout = new Layout();
		//var firstShape: Shape = Shape.createShape(this.shapeTypes['railStraight'], this.shapeTypes['railStraight'].getDefaultVariant(), new Point(200,200));
		//console.log(this.shapeTypes);
		//layout.addShape(firstShape);
		layout.setStartPoint(new Point(100,100));
		var designerView: DesignerView = new DesignerView(layout, this.shapeTypes, this.variantTypes);
	}
	
	private createVariantTypes(): { [index: string]: VariantType; } {
		return {
			Default: new VariantType('Default'),
			FoundationLess: new VariantType('Foundation less')
		};
	}
	
	private createShapeTypes(): { [index: string]: ShapeType; } {	
		var defaultVariant = this.variantTypes['Default'];
		var foundationLessVariant = this.variantTypes['FoundationLess'];
	
		return {
			railStraight: new ShapeType(
				"Rail straight",
				[new Vector(63.8, 0.0, 0.0), new Vector(63.8, 0.5, 0.5)],
				[
					new Variant(defaultVariant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-Default.png"),
					new Variant(foundationLessVariant, 127.6, 63.8, "Resources/Img/Tracks/railStraight-FoundationLess.png")
				]			
			),
			railCurved: new ShapeType(
				"Rail curved",
				[new Vector(62.3424, 0.9906, 0.96875),new Vector(62.3424, 0.5094, 0.53125)],
				[
					new Variant(defaultVariant, 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-Default.png"), 
					new Variant(foundationLessVariant, 136.9144, 69.9295, "Resources/Img/Tracks/railCurved-FoundationLess.png")
				]	
			),
			switchStraightLeft: new ShapeType(
				"Switch straight left",
				[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.96101, 0.0)],
				[new Variant(defaultVariant, 255.2, 159.5, "Resources/Img/Tracks/switchStraightLeft-Default.png")]
			),
			switchStraightRight: new ShapeType(
				"Switch straight right",
				[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.53899, 0.5)],
				[new Variant(defaultVariant, 255.2, 159.5, "Resources/Img/Tracks/switchStraightRight-Default.png")]
			),
			roadStraight: new ShapeType(
				"Road straight",
				[new Vector(127.6, 0.0, 0.0),,new Vector(127.6, 0.5, 0.5)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/roadStraight-Default.png")]
			)
		};			
	}
}

export = TrackController;