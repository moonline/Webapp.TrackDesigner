import EventType = require("Classes/Utility/EventType");
import Observer = require("Classes/Utility/Observer");

class Observable {
	observers: Observer[] = [];

	addObserver(observer: Observer): void {
		if(this.observers.indexOf(observer) < 0) {
			this.observers.push(observer);
		}
	}
	
	removeObserver(observer: Observer): void {
		var pos: number = this.observers.indexOf(observer);
		if(pos >= 0) {
			this.observers.splice(pos, 1);
		}
	}
	
	notifyObservers(event: EventType, subject: any): void {
		for(var oi in this.observers) {
			this.observers[oi].notify(event, this, subject);
		}
	}
}

export = Observable;