class VariantType {
	// unique id
	id: string;
	name: string;
	image: string;
	
	constructor(id: string, name: string, image: string = null) {
		this.id = id;
		this.name = name;
		this.image = image;
	}
	
	public getName(): string {
		return this.name;
	}

	public getId():string {
		return this.id;
	}
	
	public getImage(): string {
		return this.image;
	}
}

export = VariantType;