/// <reference path="Classes/Application/TrackController.ts"/>
var RequireJS = /** @class */ (function () {
    function RequireJS(config) {
        this.require = window['require'];
        this.require['config'](config);
    }
    RequireJS.prototype.load = function (classes, callback) {
        this.require(classes, callback);
    };
    return RequireJS;
}());
var requireJS = new RequireJS({
    baseUrl: ".",
    paths: {},
    shim: {}
});
requireJS.load(["Classes/Application/TrackController"], function (TrackController) {
    var application = new TrackController();
    application.designerAction();
});
