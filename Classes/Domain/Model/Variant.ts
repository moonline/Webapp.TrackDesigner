import VariantType = require("Classes/Domain/Model/VariantType");

class Variant {
	type: VariantType;
	image: string;
	height: number;
	width: number;
	
	constructor(type: VariantType, width: number, height: number, image: string) {
		this.type = type;
		this.height = height;
		this.width = width;
		this.image = image;
	}
	
	public getType(): VariantType {
		return this.type;
	}
	
	public getHeight(): number {
		return this.height;
	}
	
	public getWidth(): number {
		return this.width;
	}
	
	public getImage(): string {
		return this.image;
	}
}

export = Variant;