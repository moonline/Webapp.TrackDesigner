define(["require", "exports", "Classes/Domain/Model/Layout"], function (require, exports, Layout) {
    "use strict";
    var ImportService = /** @class */ (function () {
        function ImportService() {
        }
        ImportService["import"] = function (structure) {
            var errors = [];
            if (ImportService.validate(structure, errors)) {
                switch (structure['format']['version']) {
                    case 1:
                        var layout = ImportService.importV1(structure, errors);
                        if (errors.length > 0) {
                            alert('Errors occured during import: ' + errors.toString());
                        }
                        return layout;
                        break;
                    default:
                        alert('JDTL version ' + structure['format']['version'] + ' not supported!');
                }
            }
            else {
                alert('Document contains errors. Please check the structure: ' + errors.toString());
            }
            return null;
        };
        ImportService.importV1 = function (structure, errors) {
            if (Layout.isSerializedStructureValid(structure['content']['layouts']['main'], errors)) {
                return Layout.unserialize(structure['content']['layouts']['main'], errors);
            }
            else {
                return null;
            }
        };
        ImportService.validate = function (structure, errors) {
            var valid = true;
            if (!(structure['date'] != undefined && structure['date'] < Date.now())) {
                valid = false;
                errors.push('Date incorrect');
            }
            if (!(structure['format'] != undefined &&
                structure['format']['version'] != undefined &&
                typeof structure['format']['version'] == "number" &&
                structure['format']['version'] % 1 === 0 &&
                structure['format']['type'] != undefined &&
                structure['format']['type'] == 'jtdl')) {
                valid = false;
                errors.push('Format incorrect');
            }
            if (!(structure['license'] == 'CC BY-NC-SA 3.0')) {
                valid = false;
                errors.push('Invalid license');
            }
            if (!(structure['content'] != undefined &&
                structure['content']['layouts'] != undefined &&
                structure['content']['layouts']['main'] != undefined &&
                Layout.isSerializedStructureValid(structure['content']['layouts']['main']))) {
                valid = false;
                errors.push('Invalid content structure');
            }
            return valid;
        };
        return ImportService;
    }());
    return ImportService;
});
