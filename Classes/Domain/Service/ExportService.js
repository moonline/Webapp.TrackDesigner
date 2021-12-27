define(["require", "exports"], function (require, exports) {
    "use strict";
    var ExportService = /** @class */ (function () {
        function ExportService(layout) {
            this.layout = layout;
        }
        ExportService.prototype.getExportStructure = function () {
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
        };
        return ExportService;
    }());
    return ExportService;
});
