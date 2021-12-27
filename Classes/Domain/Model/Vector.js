define(["require", "exports", "Classes/Domain/Model/Point"], function (require, exports, Point) {
    "use strict";
    var Vector = /** @class */ (function () {
        function Vector(length, angle, pointOrientation) {
            if (pointOrientation === void 0) { pointOrientation = 0; }
            this.length = length;
            this.angle = angle;
            this.pointOrientation = pointOrientation;
        }
        Vector.createVectorFromPoints = function (startPosition, endPosition) {
            var deltaX = endPosition.getX() - startPosition.getX();
            var deltaY = endPosition.getY() - startPosition.getY();
            var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            var angle = Math.atan(deltaY / deltaX) / (2 * Math.PI);
            return new Vector(length, angle, endPosition.getAngle() - startPosition.getAngle());
        };
        Vector.prototype.getLength = function () {
            return this.length;
        };
        Vector.prototype.getAngle = function () {
            return this.angle;
        };
        Vector.prototype.getPointOrientation = function () {
            return this.pointOrientation;
        };
        Vector.prototype.getEndPosition = function (startPosition) {
            return new Point(startPosition.getX() + this.getDeltaX(startPosition.getAngle()), startPosition.getY() + this.getDeltaY(startPosition.getAngle()), startPosition.getAngle() + this.pointOrientation);
        };
        Vector.prototype.getStartPosition = function (endPosition) {
            var startAngleAbs = endPosition.getAngle() - this.pointOrientation;
            return new Point(endPosition.getX() - this.getDeltaX(startAngleAbs), endPosition.getY() - this.getDeltaY(startAngleAbs), startAngleAbs);
        };
        Vector.prototype.getDeltaX = function (startAngle) {
            if (startAngle === void 0) { startAngle = 0; }
            return this.length * Math.cos((startAngle + this.angle) * 2 * Math.PI);
        };
        Vector.prototype.getDeltaY = function (startAngle) {
            if (startAngle === void 0) { startAngle = 0; }
            return this.length * Math.sin((startAngle + this.angle) * 2 * Math.PI);
        };
        Vector.prototype.serialize = function () {
            return {
                "class": 'Classes/Domain/Model/Vector',
                length: this.length,
                angle: this.angle,
                pointOrientation: this.pointOrientation
            };
        };
        Vector.isSerializedStructureValid = function (structure, errors) {
            if (errors === void 0) { errors = []; }
            var valid = [
                typeof structure != "undefined",
                structure['class'] === 'Classes/Domain/Model/Vector',
                typeof structure['length'] === "number",
                typeof structure['angle'] === "number",
                typeof structure['pointOrientation'] === "number"
            ];
            if (valid.indexOf(false) >= 0) {
                errors.push('Vector property not valid [structure, class, length, angle, pointOrientation]:(' + valid.toString() + ')');
                return false;
            }
            else {
                return true;
            }
        };
        Vector.unserialize = function (structure, errors) {
            if (Vector.isSerializedStructureValid(structure)) {
                return new Vector(structure['length'], structure['angle'] % 1, structure['pointOrientation']);
            }
            else {
                return null;
            }
        };
        return Vector;
    }());
    return Vector;
});
