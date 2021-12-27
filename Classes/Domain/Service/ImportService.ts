import Layout = require("Classes/Domain/Model/Layout");


class ImportService {
	constructor() {}

	public static import(structure: Object): Layout {
		var errors: string[] = [];
		if(ImportService.validate(structure, errors)) {
			switch(structure['format']['version']) {
				case 1:
					var layout: Layout = ImportService.importV1(structure, errors);
					if(errors.length > 0) {
						alert('Errors occured during import: '+errors.toString());
					}
					return layout;
					break;
				default:
					alert('JDTL version '+structure['format']['version']+' not supported!');
			}
		} else {
			alert('Document contains errors. Please check the structure: '+errors.toString());
		}
		return null;
	}

	public static importV1(structure: Object, errors: string[]): Layout {
		if(Layout.isSerializedStructureValid(structure['content']['layouts']['main'], errors)) {
			return Layout.unserialize(structure['content']['layouts']['main'],errors);
		} else {
			return null;
		}
	}

	public static validate(structure: Object, errors: string[]): boolean {
		var valid: boolean = true;
		if(!(structure['date'] != undefined && structure['date'] < Date.now())) {
			valid = false; errors.push('Date incorrect');
		}
		if(!(structure['format'] != undefined &&
			structure['format']['version'] != undefined &&
			typeof structure['format']['version'] == "number" &&
			structure['format']['version']%1 === 0 &&
			structure['format']['type'] != undefined &&
			structure['format']['type'] == 'jtdl')) {
			valid = false; errors.push('Format incorrect');
		}
		if(!(structure['license'] == 'CC BY-NC-SA 3.0')) {
			valid = false; errors.push('Invalid license');
		}
		if(!(structure['content'] != undefined &&
			structure['content']['layouts'] != undefined &&
			structure['content']['layouts']['main'] != undefined &&
			Layout.isSerializedStructureValid(structure['content']['layouts']['main']))) {
			valid = false; errors.push('Invalid content structure');
		}
		return valid;
	}
}

export = ImportService;
