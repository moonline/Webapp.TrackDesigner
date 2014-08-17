/// <reference path="Classes/Application/TrackController.ts"/>

class RequireJS {
	require:any = window['require'];

	constructor(config:any) {
		this.require['config'](config);
	}

	public load(classes: string[], callback:any):void {
		this.require(classes, callback);
	}
}

var requireJS = new RequireJS({
	baseUrl: ".",
	paths: {
	},
	shim: {
	}
});



requireJS.load(["Classes/Application/TrackController"], (TrackController) => {
	var application = new TrackController();
});