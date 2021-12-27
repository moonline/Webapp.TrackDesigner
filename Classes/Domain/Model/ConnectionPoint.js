define(["require", "exports"], function (require, exports) {
    "use strict";
    var ConnectionPoint = /** @class */ (function () {
        function ConnectionPoint(shape, incrementalPosition, connection) {
            if (connection === void 0) { connection = null; }
            this.shape = shape;
            this.incrementalPosition = incrementalPosition;
            this.connection = connection;
        }
        ConnectionPoint.prototype.getConnection = function () {
            return this.connection;
        };
        ConnectionPoint.prototype.setConnection = function (ConnectionPoint) {
            this.connection = ConnectionPoint;
        };
        ConnectionPoint.prototype.connectTo = function (ConnectionPoint) {
            this.connection = ConnectionPoint;
            ConnectionPoint.setConnection(this);
        };
        ConnectionPoint.prototype.removeConnection = function () {
            if (this.connection != null) {
                this.connection.setConnection(null);
                this.connection = null;
            }
        };
        ConnectionPoint.prototype.getShape = function () {
            return this.shape;
        };
        ConnectionPoint.prototype.setShape = function (shape) {
            this.shape = shape;
        };
        ConnectionPoint.prototype.getIncrementalPosition = function () {
            return this.incrementalPosition;
        };
        ConnectionPoint.prototype.getPosition = function () {
            return this.incrementalPosition.getEndPosition(this.shape.getPosition());
        };
        ConnectionPoint.prototype.apendShape = function (shape) {
            // TODO:
        };
        return ConnectionPoint;
    }());
    return ConnectionPoint;
});
