var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "Classes/Domain/Model/Point", "Classes/Domain/Model/ConnectionPoint", "Classes/Domain/Model/Vector", "Classes/Utility/Observable", "Classes/Utility/EventType", "Configuration/ShapeConfiguration"], function (require, exports, Point, ConnectionPoint, Vector, Observable, EventType, ShapeConfiguration) {
    "use strict";
    var Shape = /** @class */ (function (_super) {
        __extends(Shape, _super);
        function Shape(type, variant, center, connectionPoints) {
            if (connectionPoints === void 0) { connectionPoints = []; }
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.variant = variant;
            _this.center = center;
            _this.connectionPoints = connectionPoints;
            return _this;
        }
        Shape.createFromConnectionPoint = function (type, variant, connectionPoint) {
            var position = connectionPoint.getPosition();
            position.turnAngle(0.5);
            var newCenter = type.getDefaultFirstConnectionPoint().getStartPosition(position);
            var newShape = new Shape(type, variant, newCenter);
            for (var i in type.connectionPoints) {
                newShape.createConnectionPoint(type.connectionPoints[i]);
            }
            newShape.getConnectionPoints()[newShape.getType().getDefaultFirstConnectionPointPosition()].connectTo(connectionPoint);
            return newShape;
        };
        Shape.createFromShape = function (type, variant, shape) {
            var connectionPoint = shape.getNextFreeConnectionPoint();
            if (connectionPoint != null) {
                return Shape.createFromConnectionPoint(type, variant, connectionPoint);
            }
            else {
                return null;
            }
        };
        Shape.createShape = function (type, variant, center) {
            var newShape = new Shape(type, variant, center);
            for (var i in type.connectionPoints) {
                newShape.createConnectionPoint(type.connectionPoints[i]);
            }
            return newShape;
        };
        Shape.prototype.getPosition = function () {
            return this.center;
        };
        Shape.prototype.getType = function () {
            return this.type;
        };
        Shape.prototype.getVariant = function () {
            return this.variant;
        };
        Shape.prototype.getConnectionPoints = function () {
            return this.connectionPoints;
        };
        Shape.prototype.getCorners = function () {
            var cornerVector = Vector.createVectorFromPoints(new Point(0, 0), new Point(this.variant.getWidth() / 2, this.variant.getHeight() / 2));
            return [
                cornerVector.getEndPosition(this.center),
                (new Vector(cornerVector.getLength(), 0.5 - cornerVector.getAngle())).getEndPosition(this.center),
                (new Vector(cornerVector.getLength(), 0.5 + cornerVector.getAngle())).getEndPosition(this.center),
                (new Vector(cornerVector.getLength(), 1 - cornerVector.getAngle())).getEndPosition(this.center)
            ];
        };
        Shape.prototype.move = function (deltaX, deltaY) {
            this.center.move(deltaX, deltaY);
            this.notifyObservers(EventType.objectMoved, this);
        };
        Shape.prototype.addConnectionPoint = function (point) {
            point.setShape(this);
            this.connectionPoints.push(point);
        };
        Shape.prototype.removeConnectionPoints = function () {
            for (var i in this.connectionPoints) {
                this.connectionPoints[i].removeConnection();
            }
            this.connectionPoints = null;
        };
        Shape.prototype.createConnectionPoint = function (position, connection) {
            if (connection === void 0) { connection = null; }
            var connectionPoint = new ConnectionPoint(this, position, connection);
            this.addConnectionPoint(connectionPoint);
        };
        Shape.prototype.toString = function () {
            return this.type.getName() + ", position: " + this.center.toString();
        };
        Shape.prototype.canRotate = function () {
            return this.getConnectedPoints().length <= 1;
        };
        Shape.prototype.getConnectedPoints = function () {
            var connectedPoints = [];
            for (var i in this.connectionPoints) {
                if (this.connectionPoints[i].getConnection() != null) {
                    connectedPoints.push(this.connectionPoints[i]);
                }
            }
            return connectedPoints;
        };
        Shape.prototype.getFreePoints = function () {
            var freePoints = [];
            for (var i in this.connectionPoints) {
                if (this.connectionPoints[i].getConnection() == null) {
                    freePoints.push(this.connectionPoints[i]);
                }
            }
            return freePoints;
        };
        Shape.prototype.getFirstNeighbor = function () {
            for (var i in this.connectionPoints) {
                if (this.connectionPoints[i].connection != null) {
                    return this.connectionPoints[i].getConnection().getShape();
                }
            }
            return null;
        };
        Shape.prototype.getNeighbors = function () {
            var neighbors = [];
            for (var i in this.connectionPoints) {
                if (this.connectionPoints[i].connection != null) {
                    neighbors.push(this.connectionPoints[i].getConnection().getShape());
                }
            }
            return neighbors;
        };
        /**
         * unbind old connectionPoint and bind new point
         */
        Shape.prototype.rotate = function () {
            var connectedPoints = this.getConnectedPoints();
            if (connectedPoints.length < 1) {
                this.center.turnAngle(1 / 32);
            }
            else if (connectedPoints.length == 1) {
                // unbind old point
                var currentConnectionPoint = connectedPoints[0];
                var connectedNeighbor = currentConnectionPoint.getConnection();
                var newConnectionPoint = this.getNextFreeConnectionPoint(currentConnectionPoint);
                currentConnectionPoint.removeConnection();
                // recalc new center, set new connection
                var position = connectedNeighbor.getPosition();
                position.turnAngle(0.5);
                this.center = newConnectionPoint.getIncrementalPosition().getStartPosition(position);
                newConnectionPoint.connectTo(connectedNeighbor);
                // rotate shape connected with 2points only if angles are the same direction
            }
            else if (connectedPoints.length == 2) {
                if (connectedPoints[0].getIncrementalPosition().getPointOrientation() + 0.5 == connectedPoints[1].getIncrementalPosition().getPointOrientation()) {
                    var connectionPoint1 = connectedPoints[0];
                    var connectionPoint2 = connectedPoints[1];
                    // unbind old point
                    var connectedNeighbor1 = connectionPoint1.getConnection();
                    var connectedNeighbor2 = connectionPoint2.getConnection();
                    connectedNeighbor1.removeConnection();
                    connectedNeighbor2.removeConnection();
                    // recalc new center, set new connection
                    var position = connectedNeighbor2.getPosition();
                    position.turnAngle(0.5);
                    this.center = connectionPoint1.getIncrementalPosition().getStartPosition(position);
                    connectionPoint1.connectTo(connectedNeighbor2);
                    connectionPoint2.connectTo(connectedNeighbor1);
                }
            }
            this.notifyObservers(EventType.propertyChanged, this);
        };
        /**
         * iterate through connection points, starting by the position of the given ConnectionPoint or 0
         * @return ConnectionPoint first element without a connection
         */
        Shape.prototype.getNextFreeConnectionPoint = function (connectionPoint) {
            if (connectionPoint === void 0) { connectionPoint = null; }
            if (this.connectionPoints != null) {
                var startPosition;
                if (connectionPoint == null) {
                    startPosition = 0;
                }
                else {
                    var pos = this.connectionPoints.indexOf(connectionPoint);
                    startPosition = (pos >= 0) ? pos : 0;
                }
                var rotatePosition = startPosition;
                for (var i = 0; i < this.connectionPoints.length; i++) {
                    // TODO return of empty place found
                    if (this.connectionPoints[rotatePosition].connection == null) {
                        return this.connectionPoints[rotatePosition];
                    }
                    if (rotatePosition < this.connectionPoints.length - 1) {
                        rotatePosition++;
                    }
                    else {
                        rotatePosition = 0;
                    }
                }
            }
            return null;
        };
        Shape.prototype.serialize = function () {
            return {
                "class": 'Classes/Domain/Model/Shape',
                type: this.type.getId(),
                variant: this.variant.getType().getId(),
                center: this.center.serialize()
            };
        };
        Shape.isSerializedStructureValid = function (structure, errors) {
            if (errors === void 0) { errors = []; }
            var valid = [
                typeof structure != "undefined",
                structure['class'] === 'Classes/Domain/Model/Shape',
                typeof structure['variant'] === "string",
                typeof ShapeConfiguration.variantTypes[structure['variant']] != "undefined",
                typeof structure['type'] === "string",
                typeof ShapeConfiguration.shapeTypes[structure['type']] != "undefined",
                typeof structure['center'] === "object",
                Point.isSerializedStructureValid(structure['center'], errors)
            ];
            if (valid.indexOf(false) >= 0) {
                errors.push('Shape property not valid [structure, class, variant, variant exists, type, type exists, center, center valid]:(' + valid.toString() + ')');
                return false;
            }
            else {
                return true;
            }
        };
        Shape.unserialize = function (structure, errors) {
            if (Shape.isSerializedStructureValid(structure)) {
                var shapeType = ShapeConfiguration.shapeTypes[structure['type']];
                var shapeVariants = shapeType.getVariants();
                var variant;
                for (var vi in shapeVariants) {
                    if ((shapeVariants[vi]).getType().getId() === structure['variant']) {
                        variant = shapeVariants[vi];
                        break;
                    }
                }
                if (variant) {
                    return new Shape(ShapeConfiguration.shapeTypes[structure['type']], variant, Point.unserialize(structure['center'], errors));
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        };
        return Shape;
    }(Observable));
    return Shape;
});
