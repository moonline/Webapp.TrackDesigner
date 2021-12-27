define(["require", "exports"], function (require, exports) {
    "use strict";
    var EventType;
    (function (EventType) {
        EventType[EventType["propertyChanged"] = 0] = "propertyChanged";
        EventType[EventType["childAdded"] = 1] = "childAdded";
        EventType[EventType["childRemoved"] = 2] = "childRemoved";
        EventType[EventType["objectResized"] = 3] = "objectResized";
        EventType[EventType["objectMoved"] = 4] = "objectMoved";
        EventType[EventType["actionCall"] = 5] = "actionCall";
        EventType[EventType["objectReplaced"] = 6] = "objectReplaced";
    })(EventType || (EventType = {}));
    return EventType;
});
