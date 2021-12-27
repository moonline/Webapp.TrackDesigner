import Layout = require("Classes/Domain/Model/Layout");


class ExportService {
	layout: Layout;

	constructor(layout: Layout) {
		this.layout = layout;
	}

	public getExportStructure(): Object {
		return {
			date: Date.now(),
			format: {
				version: 1,
				type: 'jtdl',
				description: 'Json Track Designer Layout'
			},
			exportApplication: {
				name: 'Webapp.TrackDesigner',
				author: 'moonline',
				url: 'https://github.com/moonline/Webapp.TrackDesigner'
			},
			license: 'CC BY-NC-SA 3.0',
			content: {
				layouts: {
					main: this.layout.serialize()
				}
			}
		};
	}
}

export = ExportService;