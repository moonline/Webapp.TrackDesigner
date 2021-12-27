import Shape = require("Classes/Domain/Model/Shape");
import ShapeType = require("Classes/Domain/Model/ShapeType");
import Point = require("Classes/Domain/Model/Point");
import ConnectionPoint = require("Classes/Domain/Model/ConnectionPoint");
import Vector = require("Classes/Domain/Model/Vector");
import VariantType = require("Classes/Domain/Model/VariantType");
import Variant = require("Classes/Domain/Model/Variant");
import Layout = require("Classes/Domain/Model/Layout");

import Observer = require("Classes/Utility/Observer");
import Observable = require("Classes/Utility/Observable");
import EventType = require("Classes/Utility/EventType");

import DesignerView = require("Classes/View/DesignerView");

import ShapeConfiguration = require("Configuration/ShapeConfiguration");

import ExportService = require("Classes/Domain/Service/ExportService");
import FileService = require("Classes/Domain/Service/FileService");
import ImportService = require("Classes/Domain/Service/ImportService");

declare function saveAs(blobb, name: string):void;


class TrackController implements Observer {
	shapeTypes: { [index: string]: ShapeType; } = {};
	variantTypes: { [index: string]: VariantType; } = {};
	layout: Layout;
	view: DesignerView;
	exportService: ExportService;
	
	constructor() {
		this.layout = new Layout();
		this.layout.setStartPoint(new Point(100,100));
		this.view = new DesignerView(this.layout, ShapeConfiguration.shapeTypes, ShapeConfiguration.variantTypes);
		this.exportService = new ExportService(this.layout);
	}
	
	public designerAction(): void {
		this.view.addObserver(this);
		this.view.initializeView();
	}

	public saveAction(): void {
		var fileContent: any = this.exportService.getExportStructure();
		var blob = new Blob([JSON.stringify(fileContent)], {type: 'application/json'});
		var fileSaver = saveAs(blob,"trackLayout."+fileContent.format.type);
	}

	public importAction(file: Object): void {
		var layout: Layout = ImportService.import(file);
		this.layout = layout;
		this.view.setLayout(layout);
		layout.notifyObservers(EventType.objectReplaced, layout);
		this.layout.setStartPoint(new Point(100,100));
	}

	public notify(event: EventType, notifier: Observable, subject: any) {
		if(event === EventType.actionCall && notifier instanceof DesignerView) {
			if(subject.action == "save") {
				this.saveAction();
			} else if(subject.action == "open" && subject.file) {
				FileService.readFile(subject.file, function(fileContent) {
					this.importAction(JSON.parse(fileContent));
				}.bind(this));
			}
		}
	}
}

export = TrackController;