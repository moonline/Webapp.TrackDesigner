class ShapeType {
	name: string;
	imagePath: string;
	
	constructor(name: string) {
		this.name = name;
		this.imagePath = "";
	}
	
	public getName(): string {
		return this.name;
	}
	
	public setImagePath(imagePath: string): void {
		this.imagePath = imagePath;
	}
	
	public getImagePath(): string {
		return this.imagePath;
	}
}

export = ShapeType;