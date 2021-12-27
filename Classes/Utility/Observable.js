define(["require", "exports"], function (require, exports) {
    "use strict";
    var Observable = /** @class */ (function () {
        function Observable() {
            this.observers = [];
        }
        Observable.prototype.addObserver = function (observer) {
            if (this.observers.indexOf(observer) < 0) {
                this.observers.push(observer);
            }
        };
        Observable.prototype.removeObserver = function (observer) {
            var pos = this.observers.indexOf(observer);
            if (pos >= 0) {
                this.observers.splice(pos, 1);
            }
        };
        Observable.prototype.notifyObservers = function (event, subject) {
            for (var oi in this.observers) {
                this.observers[oi].notify(event, this, subject);
            }
        };
        return Observable;
    }());
    return Observable;
});
