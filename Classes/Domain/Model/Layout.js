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
define(["require", "exports", "Classes/Domain/Model/Point", "Classes/Domain/Model/ConnectionPoint", "Classes/Domain/Model/Shape", "Classes/Utility/Observable", "Classes/Utility/EventType"], function (require, exports, Point, ConnectionPoint, Shape, Observable, EventType) {
    "use strict";
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout(width, height) {
            if (width === void 0) { width = 1000; }
            if (height === void 0) { height = 1000; }
            var _this = _super.call(this) || this;
            _this.currentElement = null;
            _this.lastInsertedShape = null;
            _this.width = width;
            _this.height = height;
            _this.shapes = [];
            _this.currentElement = _this;
            return _this;
        }
        Layout.prototype.getWidth = function () {
            return this.width;
        };
        Layout.prototype.getHeight = function () {
            return this.height;
        };
        Layout.prototype.getShapes = function () {
            return this.shapes;
        };
        Layout.prototype.getCurrentElement = function () {
            return this.currentElement;
        };
        Layout.prototype.setCurrentElement = function (element) {
            this.currentElement = element;
            this.notifyObservers(EventType.propertyChanged, this.currentElement);
        };
        Layout.prototype.setStartPoint = function (point) {
            this.setCurrentElement(point);
        };
        Layout.prototype.addShape = function (shape) {
            this.shapes.push(shape);
            this.lastInsertedShape = shape;
            this.adjustLayoutIfShapeOutside(shape);
            this.connectNearConnectionPoint(shape);
            shape.addObserver(this);
            this.setCurrentElement(shape);
        };
        Layout.prototype.createShape = function (shapeType, variant) {
            var shape;
            if (this.getCurrentElement() instanceof Shape) {
                var shape = Shape.createFromShape(shapeType, variant, this.getCurrentElement());
            }
            else if (this.getCurrentElement() instanceof Point) {
                var shape = Shape.createShape(shapeType, variant, this.getCurrentElement());
            }
            else if (this.getCurrentElement() instanceof ConnectionPoint) {
                var shape = Shape.createFromConnectionPoint(shapeType, variant, this.getCurrentElement());
            }
            if (shape != null) {
                this.addShape(shape);
            }
        };
        Layout.prototype.adjustLayoutIfShapeOutside = function (shape) {
            var minCoordinates = Point.getMinCoordinates(shape.getCorners());
            var deltaX = (minCoordinates.x < 0) ? 0 - minCoordinates.x + 10 : 0;
            var deltaY = (minCoordinates.y < 0) ? 0 - minCoordinates.y + 10 : 0;
            if (deltaX > 0 || deltaY > 0) {
                this.moveShapes(deltaX, deltaY);
            }
            var maxCoordinates = Point.getMaxCoordinates(shape.getCorners());
            var deltaX = (maxCoordinates.x > this.width) ? maxCoordinates.x - this.width + 10 : 0;
            var deltaY = (maxCoordinates.y > this.height) ? maxCoordinates.y - this.height + 10 : 0;
            if (deltaX > 0 || deltaY > 0) {
                this.width += deltaX;
                this.height += deltaY;
                this.notifyObservers(EventType.objectResized, this);
            }
        };
        Layout.prototype.moveShapes = function (deltaX, deltaY) {
            this.width += deltaX;
            this.height += deltaY;
            this.notifyObservers(EventType.objectResized, this);
            for (var spi in this.shapes) {
                this.shapes[spi].move(deltaX, deltaY);
            }
            this.notifyObservers(EventType.objectMoved, this);
        };
        Layout.prototype.rotateCurrentShape = function () {
            if (this.currentElement != null) {
                if (this.currentElement instanceof Shape) {
                    this.currentElement.rotate();
                    this.connectNearConnectionPoint(this.currentElement);
                    this.adjustLayoutIfShapeOutside(this.currentElement);
                    // rotate last inserted element? -> adjust default rotation position
                    if (this.currentElement === this.lastInsertedShape) {
                        this.currentElement.getType().moveDefaultFirstConnectionPointPositionToNext();
                    }
                    this.notifyObservers(EventType.objectMoved, null);
                }
            }
        };
        Layout.prototype.removeShape = function (shape) {
            shape.removeObserver(this);
            shape.removeConnectionPoints();
            var pos = this.shapes.indexOf(shape);
            this.shapes.splice(pos, 1);
            shape = null;
            this.notifyObservers(EventType.childRemoved, null);
        };
        Layout.prototype.removeCurrentShape = function () {
            if (this.currentElement != null) {
                if (this.currentElement instanceof Shape) {
                    var firstNeighbor = this.currentElement.getFirstNeighbor();
                    this.removeShape(this.currentElement);
                    if (firstNeighbor != null) {
                        this.setCurrentElement(firstNeighbor);
                        this.lastInsertedShape = firstNeighbor;
                    }
                }
            }
        };
        Layout.prototype.setCurrentElementByPosition = function (position, config) {
            var connectionPointFound = false;
            for (var spi = this.shapes.length - 1; spi >= 0; spi--) {
                if (position.isInSquare(this.shapes[spi].getPosition(), this.shapes[spi].getVariant().getWidth() + this.shapes[spi].getVariant().getHeight())) {
                    if (position.isInRectangle(this.shapes[spi].getPosition(), this.shapes[spi].getVariant().getWidth(), this.shapes[spi].getVariant().getHeight())) {
                        this.setCurrentElement(this.shapes[spi]);
                        connectionPointFound = true;
                    }
                }
                var freeConnectionPoints = this.shapes[spi].getFreePoints();
                for (var cpi in freeConnectionPoints) {
                    if (position.isInCircle(freeConnectionPoints[cpi].getPosition(), config.connectionPointSize)) {
                        this.setCurrentElement(freeConnectionPoints[cpi]);
                        connectionPointFound = true;
                    }
                }
                // if shape matched, check for matching connection point before return because connectionpoints overlays shapes
                if (connectionPointFound) {
                    return;
                }
            }
            this.setCurrentElement(position);
        };
        Layout.prototype.connectNearConnectionPoint = function (shape) {
            var connectionPoints = shape.getConnectionPoints();
            for (var cpi in connectionPoints) {
                if (connectionPoints[cpi].getConnection() == null) {
                    for (var spi in this.shapes) {
                        var stopSearching = false;
                        if (shape != this.shapes[spi]) {
                            var shapeConnectionPoints = this.shapes[spi].getConnectionPoints();
                            for (var scpi in shapeConnectionPoints) {
                                if (connectionPoints[cpi].getPosition().isInCircle(shapeConnectionPoints[scpi].getPosition(), 1) && shapeConnectionPoints[scpi].getConnection() == null) {
                                    connectionPoints[cpi].connectTo(shapeConnectionPoints[scpi]);
                                    stopSearching = true;
                                    break;
                                }
                            }
                        }
                        if (stopSearching) {
                            break;
                        }
                    }
                }
            }
        };
        Layout.prototype.moveShapeToFront = function (shape) {
            var shapesToMove = shape.getNeighbors();
            shapesToMove.push(shape);
            for (var spi in shapesToMove) {
                var pos = this.shapes.indexOf(shapesToMove[spi]);
                if (pos >= 0) {
                    this.shapes.splice(pos, 1);
                    this.shapes.push(shapesToMove[spi]);
                }
            }
            this.notifyObservers(EventType.objectMoved, this);
        };
        Layout.prototype.notify = function (event, notifier, subject) {
            if (event === EventType.objectMoved && subject instanceof Shape) {
            }
            else {
                this.notifyObservers(event, subject);
            }
        };
        Layout.prototype.getSerializedShapes = function () {
            var serializedShapes = [];
            for (var si in this.shapes) {
                serializedShapes.push(this.shapes[si].serialize());
            }
            return serializedShapes;
        };
        Layout.prototype.serialize = function () {
            return {
                "class": 'Classes/Domain/Model/Layout',
                width: this.getWidth(),
                height: this.getHeight(),
                shapes: this.getSerializedShapes()
            };
        };
        Layout.isSerializedStructureValid = function (structure, errors) {
            if (errors === void 0) { errors = []; }
            var valid = [
                typeof structure != "undefined",
                structure['class'] === 'Classes/Domain/Model/Layout',
                typeof structure['width'] === "number",
                typeof structure['height'] === "number",
                Array.isArray(structure['shapes'])
            ];
            if (valid.indexOf(false) >= 0) {
                errors.push('Layout property not valid [structure, class, width, height, shapes list]:(' + valid.toString() + ')');
                return false;
            }
            else {
                return true;
            }
        };
        Layout.unserialize = function (structure, errors) {
            if (Layout.isSerializedStructureValid(structure)) {
                var layout = new Layout();
                layout.width = structure['width'];
                layout.height = structure['height'];
                layout.currentElement = this;
                layout.lastInsertedShape = null;
                layout.shapes = [];
                for (var si in structure['shapes']) {
                    if (Shape.isSerializedStructureValid(structure['shapes'][si], errors)) {
                        layout.addShape(Shape.unserialize(structure['shapes'][si], errors));
                    }
                }
                return layout;
            }
            else {
                return null;
            }
        };
        return Layout;
    }(Observable));
    return Layout;
});
