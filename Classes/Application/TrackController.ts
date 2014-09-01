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
			FoundationLess: new VariantType('Foundation less'),
			OutboundLeft: new VariantType('Outbound left'),
			OutboundRight: new VariantType('Outbound right'),
			Bridge: new VariantType('Bridge'),
			Tunnel: new VariantType('Tunnel'),
			TunnelPortal1: new VariantType('Tunnel portal 1'),
			TunnelPortal2: new VariantType('Tunnel portal 2'),
			Grass: new VariantType('Grass'),
			Water: new VariantType('Water')
		};
	}
	
	private createShapeTypes(): { [index: string]: ShapeType; } {	
		var defaultVariant = this.variantTypes['Default'];
		var foundationLessVariant = this.variantTypes['FoundationLess'];
		var outboundLeftVariant = this.variantTypes['OutboundLeft'];
		var outboundRightVariant = this.variantTypes['OutboundRight'];
		var bridgeVariant = this.variantTypes['Bridge'];
		var tunnelVariant = this.variantTypes['Tunnel'];
		var tunnelPortal1Variant = this.variantTypes['TunnelPortal1'];
		var tunnelPortal2Variant = this.variantTypes['TunnelPortal2'];
		var grassVariant = this.variantTypes['Grass'];
		var waterVariant = this.variantTypes['Water'];
		
		
	
		return {
			railStraight: new ShapeType(
				"Rail straight",
				[new Vector(63.8, 0.0, 0.0), new Vector(63.8, 0.5, 0.5)],
				[
					new Variant(defaultVariant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-Default.png"),
					new Variant(foundationLessVariant, 127.6, 63.8, "Resources/Img/Tracks/railStraight-FoundationLess.png"),
					new Variant(outboundLeftVariant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-OutboundLeft.png"),
					new Variant(outboundRightVariant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-OutboundRight.png"),
					new Variant(bridgeVariant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-Bridge.png"),
					new Variant(tunnelVariant, 127.6, 2.46806, "Resources/Img/Tracks/railStraight-Tunnel.png"),
					new Variant(tunnelPortal1Variant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-TunnelPortal1.png"),
					new Variant(tunnelPortal2Variant, 127.6, 95.7, "Resources/Img/Tracks/railStraight-TunnelPortal2.png")
				]			
			),
			railCurved: new ShapeType(
				"Rail curved",
				[new Vector(62.3424, 0.9906, 0.96875),new Vector(62.3424, 0.5094, 0.53125)],
				[
					new Variant(defaultVariant, 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-Default.png"), 
					new Variant(foundationLessVariant, 136.9144, 69.9295, "Resources/Img/Tracks/railCurved-FoundationLess.png"),
					new Variant(outboundLeftVariant, 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-OutboundLeft.png"),
					new Variant(outboundRightVariant, 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-OutboundRight.png")
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
			railRoadCrossing: new ShapeType(
				"Railroal crossing",
				[new Vector(127.6, 0.0, 0.0),new Vector(127.6, 0.25, 0.25), new Vector(127.6, 0.5, 0.5),new Vector(127.6, 0.75, 0.75)],
				[new Variant(grassVariant, 255.2, 255.2, "Resources/Img/Tracks/railRoadCrossing-Grass.png")]
			),
			roadStraight: new ShapeType(
				"Road straight",
				[new Vector(127.6, 0.0, 0.0),new Vector(127.6, 0.5, 0.5)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/roadStraight-Default.png"),new Variant(grassVariant, 255.2, 255.2, "Resources/Img/Tracks/roadStraight-Grass.png")]
			),
			roadCurved: new ShapeType(
				"Road curved",
				[new Vector(127.6, 0.25, 0.25),new Vector(127.6, 0.5, 0.5)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/roadCurved-Default.png"),new Variant(grassVariant, 255.2, 255.2, "Resources/Img/Tracks/roadCurved-Grass.png")]
			),
			roadTCrossing: new ShapeType(
				"Road T-Crossing",
				[new Vector(127.6, 0.0, 0.0),new Vector(127.6, 0.25, 0.25),new Vector(127.6, 0.5, 0.5)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/roadTCrossing-Default.png"),new Variant(grassVariant, 255.2, 255.2, "Resources/Img/Tracks/roadTCrossing-Grass.png")]
			),
			railCrossing: new ShapeType(
				"Crossing",
				[new Vector(63.8, 0.0, 0.0),new Vector(63.8, 0.25, 0.25),new Vector(63.8, 0.5, 0.5), new Vector(63.8, 0.75, 0.75)],
				[new Variant(defaultVariant, 127.6, 127.6, "Resources/Img/Tracks/crossingStraight-Default.png")]
			),
			areaSquare: new ShapeType(
				"Area Square",
				[new Vector(127.6, 0.0, 0.0),new Vector(127.6, 0.25, 0.25), new Vector(127.6, 0.5, 0.5),new Vector(127.6, 0.75, 0.75)],
				[new Variant(grassVariant, 255.2, 255.2, "Resources/Img/Tracks/areaSquare-Grass.png"),new Variant(waterVariant, 255.2, 255.2, "Resources/Img/Tracks/areaSquare-Water.png")]
			),
			areaRectangle: new ShapeType(
				"Area Rectangle",
				[new Vector(127.6, 0.0, 0.0),new Vector(86.3, 0.25, 0.25), new Vector(127.6, 0.5, 0.5),new Vector(86.3, 0.75, 0.75)],
				[new Variant(grassVariant, 255.2, 127.6, "Resources/Img/Tracks/areaRectangle-Grass.png"),new Variant(waterVariant, 255.2, 127.6, "Resources/Img/Tracks/areaRectangle-Water.png")]
			),
			riverStraight: new ShapeType(
				"River straight",
				[new Vector(127.6, 0.0, 0.0),new Vector(127.6, 0.5, 0.5)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/riverStraight-Default.png")]
			),
			riverCurved: new ShapeType(
				"River curved",
				[new Vector(127.6, 0.5, 0.5),new Vector(127.6, 0.75, 0.75)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/riverCurved-Default.png")]
			),
			riverOutfall: new ShapeType(
				"River outfall",
				[new Vector(127.6, 0.0, 0.0),new Vector(127.6, 0.5, 0.5),new Vector(127.6, 0.75, 0.75)],
				[new Variant(defaultVariant, 255.2, 255.2, "Resources/Img/Tracks/riverOutfall-Default.png")]
			)
		};			
	}
}

export = TrackController;