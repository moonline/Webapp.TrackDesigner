import ShapeType = require("Classes/Domain/Model/ShapeType");
import Vector = require("Classes/Domain/Model/Vector");
import VariantType = require("Classes/Domain/Model/VariantType");
import Variant = require("Classes/Domain/Model/Variant");

class ShapeConfiguration {
	public static variantTypes: { [index: string]: VariantType; } = {
		Default: new VariantType('Default', 'Resources/Img/VariantTypes/default.png'),
		FoundationLess: new VariantType('Foundation less', 'Resources/Img/VariantTypes/foundationLess.png'),
		S12V: new VariantType('12V Series', 'Resources/Img/VariantTypes/12v.png'),
		OutboundLeft: new VariantType('Outbound left', 'Resources/Img/VariantTypes/outboundLeft.png'),
		OutboundRight: new VariantType('Outbound right', 'Resources/Img/VariantTypes/outboundRight.png'),
		Bridge: new VariantType('Bridge', 'Resources/Img/VariantTypes/bridge.png'),
		Tunnel: new VariantType('Tunnel'),
		TunnelPortal1: new VariantType('Tunnel portal 1', 'Resources/Img/VariantTypes/tunnelPortal.png'),
		TunnelPortal2: new VariantType('Tunnel portal 2', 'Resources/Img/VariantTypes/tunnelPortal.png'),
		Grass: new VariantType('Grass'),
		Water: new VariantType('Water')
	};
	public static shapeTypes: { [index: string]: ShapeType; } = {
		railStraight: new ShapeType(
			"Rail straight",
			[new Vector(63.8, 0.0, 0.0), new Vector(63.8, 0.5, 0.5)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 127.6, 95.7, "Resources/Img/Tracks/railStraight-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['FoundationLess'], 127.6, 63.8, "Resources/Img/Tracks/railStraight-FoundationLess.png"),
				new Variant(ShapeConfiguration.variantTypes['S12V'], 127.6, 63.8, "Resources/Img/Tracks/railStraight-12V.png"),
				new Variant(ShapeConfiguration.variantTypes['OutboundLeft'], 127.6, 95.7, "Resources/Img/Tracks/railStraight-OutboundLeft.png"),
				new Variant(ShapeConfiguration.variantTypes['OutboundRight'], 127.6, 95.7, "Resources/Img/Tracks/railStraight-OutboundRight.png"),
				new Variant(ShapeConfiguration.variantTypes['Bridge'], 127.6, 95.7, "Resources/Img/Tracks/railStraight-Bridge.png"),
				new Variant(ShapeConfiguration.variantTypes['Tunnel'], 127.6, 2.46806, "Resources/Img/Tracks/railStraight-Tunnel.png"),
				new Variant(ShapeConfiguration.variantTypes['TunnelPortal1'], 127.6, 95.7, "Resources/Img/Tracks/railStraight-TunnelPortal1.png"),
				new Variant(ShapeConfiguration.variantTypes['TunnelPortal2'], 127.6, 95.7, "Resources/Img/Tracks/railStraight-TunnelPortal2.png")
			]			
		),
		railCurved: new ShapeType(
			"Rail curved",
			[new Vector(62.3424, 0.9906, 0.96875),new Vector(62.3424, 0.5094, 0.53125)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-Default.png"), 
				new Variant(ShapeConfiguration.variantTypes['FoundationLess'], 136.9144, 69.9295, "Resources/Img/Tracks/railCurved-FoundationLess.png"),
				new Variant(ShapeConfiguration.variantTypes['S12V'], 136.9144, 69.9295, "Resources/Img/Tracks/railCurved-12V.png"),
				new Variant(ShapeConfiguration.variantTypes['OutboundLeft'], 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-OutboundLeft.png"),
				new Variant(ShapeConfiguration.variantTypes['OutboundRight'], 143.13777, 100.91007, "Resources/Img/Tracks/railCurved-OutboundRight.png")
			]	
		),
		switchStraightLeft: new ShapeType(
			"Switch straight left",
			[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.96101, 0.0)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 159.5, "Resources/Img/Tracks/switchStraightLeft-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['S12V'], 255.2, 127.6, "Resources/Img/Tracks/switchStraightLeft-12V.png")
			]
		),
		switchStraightRight: new ShapeType(
			"Switch straight right",
			[new Vector(131.52707, 0.03899, 0.0),new Vector(131.52707, 0.46101, 0.5),new Vector(131.52707, 0.53899, 0.5)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 159.5, "Resources/Img/Tracks/switchStraightRight-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['S12V'], 255.2, 127.6, "Resources/Img/Tracks/switchStraightRight-12V.png")
			]
		),
		railCrossing: new ShapeType(
			"Crossing",
			[new Vector(63.8, 0.0, 0.0), new Vector(63.8, 0.5, 0.5), new Vector(63.8, 0.25, 0.25),new Vector(63.8, 0.75, 0.75)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 127.6, 127.6, "Resources/Img/Tracks/crossingStraight-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['S12V'], 127.6, 127.6, "Resources/Img/Tracks/crossingStraight-12V.png")
			]
		),
		railRoadCrossing: new ShapeType(
			"Railroad crossing",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5), new Vector(127.6, 0.25, 0.25), new Vector(127.6, 0.75, 0.75)],
			[
				new Variant(ShapeConfiguration.variantTypes['S12V'], 255.2, 255.2, "Resources/Img/Tracks/railRoadCrossing-12V.png"),
				new Variant(ShapeConfiguration.variantTypes['Grass'], 255.2, 255.2, "Resources/Img/Tracks/railRoadCrossing-Grass.png")
			]
		),
		railRoadCrossingDouble: new ShapeType(
			"Railroad crossing double track",
			[new Vector(131.52707, 0.03899, 0.0), new Vector(131.52707, 0.46101, 0.5), new Vector(131.52707, 0.53899, 0.5), new Vector(131.52707, 0.96101, 0.0)],
			[
				new Variant(ShapeConfiguration.variantTypes['S12V'], 255.2, 255.2, "Resources/Img/Tracks/railRoadCrossingDouble-12V.png")
			]
		),
		roadStraight: new ShapeType(
			"Road straight",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 255.2, "Resources/Img/Tracks/roadStraight-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['Grass'], 255.2, 255.2, "Resources/Img/Tracks/roadStraight-Grass.png")
			]
		),
		roadCurved: new ShapeType(
			"Road curved",
			[new Vector(127.6, 0.25, 0.25), new Vector(127.6, 0.5, 0.5)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 255.2, "Resources/Img/Tracks/roadCurved-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['Grass'], 255.2, 255.2, "Resources/Img/Tracks/roadCurved-Grass.png")
			]
		),
		roadTCrossing: new ShapeType(
			"Road T-Crossing",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5), new Vector(127.6, 0.25, 0.25)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 255.2, "Resources/Img/Tracks/roadTCrossing-Default.png"),
				new Variant(ShapeConfiguration.variantTypes['Grass'], 255.2, 255.2, "Resources/Img/Tracks/roadTCrossing-Grass.png")
			]
		),
		areaSquare: new ShapeType(
			"Area Square",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5), new Vector(127.6, 0.25, 0.25), new Vector(127.6, 0.75, 0.75)],
			[
				new Variant(ShapeConfiguration.variantTypes['Grass'], 255.2, 255.2, "Resources/Img/Tracks/areaSquare-Grass.png"),
				new Variant(ShapeConfiguration.variantTypes['Water'], 255.2, 255.2, "Resources/Img/Tracks/areaSquare-Water.png")
			]
		),
		areaRectangle: new ShapeType(
			"Area Rectangle",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5), new Vector(86.3, 0.25, 0.25), new Vector(86.3, 0.75, 0.75)],
			[
				new Variant(ShapeConfiguration.variantTypes['Grass'], 255.2, 127.6, "Resources/Img/Tracks/areaRectangle-Grass.png"),
				new Variant(ShapeConfiguration.variantTypes['Water'], 255.2, 127.6, "Resources/Img/Tracks/areaRectangle-Water.png")
			]
		),
		riverStraight: new ShapeType(
			"River straight",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 255.2, "Resources/Img/Tracks/riverStraight-Default.png")
			]
		),
		riverCurved: new ShapeType(
			"River curved",
			[new Vector(127.6, 0.5, 0.5), new Vector(127.6, 0.75, 0.75)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 255.2, "Resources/Img/Tracks/riverCurved-Default.png")
			]
		),
		riverOutfall: new ShapeType(
			"River outfall",
			[new Vector(127.6, 0.0, 0.0), new Vector(127.6, 0.5, 0.5), new Vector(127.6, 0.75, 0.75)],
			[
				new Variant(ShapeConfiguration.variantTypes['Default'], 255.2, 255.2, "Resources/Img/Tracks/riverOutfall-Default.png")
			]
		)
	}
}

export = ShapeConfiguration;