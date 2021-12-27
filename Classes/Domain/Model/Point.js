define(["require", "exports"], function (require, exports) {
    "use strict";
    var Point = /** @class */ (function () {
        function Point(x, y, angle) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (angle === void 0) { angle = 0; }
            this.x = x;
            this.y = y;
            this.angle = angle;
        }
        Point.getMinCoordinates = function (points) {
            if (points.length > 0) {
                var x = points[0].getX();
                var y = points[0].getY();
                for (var pi in points) {
                    if (points[pi].getX() < x) {
                        x = points[pi].getX();
                    }
                    if (points[pi].getY() < y) {
                        y = points[pi].getY();
                    }
                }
                return { x: x, y: y };
            }
            else {
                return { x: 0, y: 0 };
            }
        };
        Point.getMaxCoordinates = function (points) {
            if (points.length > 0) {
                var x = points[0].getX();
                var y = points[0].getY();
                for (var pi in points) {
                    if (points[pi].getX() > x) {
                        x = points[pi].getX();
                    }
                    if (points[pi].getY() > y) {
                        y = points[pi].getY();
                    }
                }
                return { x: x, y: y };
            }
            else {
                return { x: 0, y: 0 };
            }
        };
        Point.prototype.getX = function () {
            return this.x;
        };
        Point.prototype.getY = function () {
            return this.y;
        };
        Point.prototype.getAngle = function () {
            return this.angle;
        };
        Point.prototype.turnAngle = function (deltaAngle) {
            this.angle = (this.angle + deltaAngle) % 1;
        };
        Point.prototype.isInCircle = function (position, radius) {
            return (Math.abs(this.y - position.getY()) < radius && Math.abs(this.x - position.getX()) < radius);
        };
        Point.prototype.isInSquare = function (position, length) {
            return (Math.abs(this.y - position.getY()) < length / 2 && Math.abs(this.x - position.getX()) < length / 2);
        };
        /**
         * check if point is inside a rectangle
         *
         * @param Point position: The center of the rectangle
         * @param number length: The length of the rectangle
         * @param number width: The width of the rectangle
         * @return boolean
         */
        Point.prototype.isInRectangle = function (position, length, width) {
            // don't use vector: circular dependency
            var x = this.getX() - position.getX();
            var y = this.getY() - position.getY();
            var pointAngle = Math.atan(y / x) / (2 * Math.PI);
            var pointDistance = x / Math.cos(pointAngle * 2 * Math.PI);
            var incrementalAngle = pointAngle - position.getAngle();
            var distanceLengthDirection = pointDistance * Math.cos(incrementalAngle * 2 * Math.PI);
            var distanceWidthDirection = pointDistance * Math.sin(incrementalAngle * 2 * Math.PI);
            return (Math.abs(distanceLengthDirection) < length / 2 && Math.abs(distanceWidthDirection) < width / 2);
        };
        Point.prototype.move = function (deltaX, deltyY) {
            this.x += deltaX;
            this.y += deltyY;
        };
        Point.prototype.equals = function (point) {
            return Math.round(point.getX()) == Math.round(this.x) && Math.round(point.getY()) == Math.round(this.y);
        };
        Point.prototype.toString = function () {
            return this.x + "/" + this.y + "/" + this.angle;
        };
        Point.prototype.serialize = function () {
            return {
                "class": 'Classes/Domain/Model/Point',
                x: this.x,
                y: this.y,
                angle: this.angle
            };
        };
        Point.isSerializedStructureValid = function (structure, errors) {
            if (errors === void 0) { errors = []; }
            var valid = [
                typeof structure != "undefined",
                structure['class'] === 'Classes/Domain/Model/Point',
                typeof structure['x'] === "number",
                typeof structure['y'] === "number",
                typeof structure['angle'] === "number"
            ];
            if (valid.indexOf(false) >= 0) {
                errors.push('Point property not valid [structure, class, x, y,  angle]:(' + valid.toString() + ')');
                return false;
            }
            else {
                return true;
            }
        };
        Point.unserialize = function (structure, errors) {
            if (Point.isSerializedStructureValid(structure)) {
                return new Point(structure['x'], structure['y'], structure['angle'] % 1);
            }
            else {
                return null;
            }
        };
        return Point;
    }());
    return Point;
});
