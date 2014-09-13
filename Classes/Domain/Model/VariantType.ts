class VariantType {
	name: string;
	image: string;
	
	constructor(name: string, image: string = null) {
		this.name = name;
		this.image = image;
	}
	
	public getName(): string {
		return this.name;
	}
	
	public getImage(): string {
		return this.image;
	}
}

export = VariantType;