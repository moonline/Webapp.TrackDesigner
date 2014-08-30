import EventType = require("Classes/Utility/EventType");
import Observable = require("Classes/Utility/Observable");

interface Observer {
	notify(event: EventType, notifier: Observable, subject: any): void;
}

export = Observer;