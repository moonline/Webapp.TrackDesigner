define(["require", "exports", "Classes/Domain/Model/Point", "Classes/Domain/Model/Layout", "Classes/Utility/EventType", "Classes/View/DesignerView", "Configuration/ShapeConfiguration", "Classes/Domain/Service/ExportService", "Classes/Domain/Service/FileService", "Classes/Domain/Service/ImportService"], function (require, exports, Point, Layout, EventType, DesignerView, ShapeConfiguration, ExportService, FileService, ImportService) {
    "use strict";
    var TrackController = /** @class */ (function () {
        function TrackController() {
            this.shapeTypes = {};
            this.variantTypes = {};
            this.layout = new Layout();
            this.layout.setStartPoint(new Point(100, 100));
            this.view = new DesignerView(this.layout, ShapeConfiguration.shapeTypes, ShapeConfiguration.variantTypes);
            this.exportService = new ExportService(this.layout);
        }
        TrackController.prototype.designerAction = function () {
            this.view.addObserver(this);
            this.view.initializeView();
        };
        TrackController.prototype.saveAction = function () {
            var fileContent = this.exportService.getExportStructure();
            var blob = new Blob([JSON.stringify(fileContent)], { type: 'application/json' });
            var fileSaver = saveAs(blob, "trackLayout." + fileContent.format.type);
        };
        TrackController.prototype.importAction = function (file) {
            var layout = ImportService["import"](file);
            this.layout = layout;
            this.view.setLayout(layout);
            layout.notifyObservers(EventType.objectReplaced, layout);
            this.layout.setStartPoint(new Point(100, 100));
        };
        TrackController.prototype.notify = function (event, notifier, subject) {
            if (event === EventType.actionCall && notifier instanceof DesignerView) {
                if (subject.action == "save") {
                    this.saveAction();
                }
                else if (subject.action == "open" && subject.file) {
                    FileService.readFile(subject.file, function (fileContent) {
                        this.importAction(JSON.parse(fileContent));
                    }.bind(this));
                }
            }
        };
        return TrackController;
    }());
    return TrackController;
});
