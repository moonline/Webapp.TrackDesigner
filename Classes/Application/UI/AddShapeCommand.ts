import Layout = require("Classes/Domain/Model/Layout");

class AddShapeCommand {
	layout: Layout;

	constructor(layout: Layout) {
		this.layout = layout;
	}
	
	public execute(): void {
		// TODO
		console.log('TODO execute AddShapeCommand');
	}
	
	public isExecutable(): boolean {
		return true;
	}
}

export = AddShapeCommand;