define(["require", "exports"], function (require, exports) {
    "use strict";
    var ShapeType = /** @class */ (function () {
        /**
         * @constructor
         * @param {string} name - The title for the type, e.g. 'rail straight'
         * @param {Vector[]} connectionPoints - A list with vectors describing the connection points from the center
         * @param {Variant[]} variants - A list with variants for this type, e.q. 12v, 4.5v, ...
         */
        function ShapeType(id, name, connectionPoints, variants) {
            if (connectionPoints === void 0) { connectionPoints = []; }
            if (variants === void 0) { variants = []; }
            this.id = id;
            this.name = name;
            this.connectionPoints = connectionPoints;
            this.variants = variants;
            this.defaultFirstConnectionPointPosition = 0;
        }
        ShapeType.prototype.getName = function () {
            return this.name;
        };
        ShapeType.prototype.getId = function () {
            return this.id;
        };
        ShapeType.prototype.getVariants = function () {
            return this.variants;
        };
        ShapeType.prototype.getDefaultFirstConnectionPointPosition = function () {
            return this.defaultFirstConnectionPointPosition;
        };
        ShapeType.prototype.getDefaultFirstConnectionPoint = function () {
            return this.connectionPoints[this.defaultFirstConnectionPointPosition];
        };
        ShapeType.prototype.addVariant = function (variant) {
            this.variants.push(variant);
        };
        ShapeType.prototype.getVariantByType = function (type) {
            for (var vari in this.variants) {
                if (this.variants[vari].getType() === type) {
                    return this.variants[vari];
                }
            }
            return null;
        };
        ShapeType.prototype.getDefaultVariant = function () {
            for (var vari in this.variants) {
                if (this.variants[vari].getType().getName() === "Default") {
                    return this.variants[vari];
                }
            }
            return null;
        };
        ShapeType.prototype.hasVariant = function (type) {
            return this.getVariantByType(type) != null;
        };
        ShapeType.prototype.addConnectionPoint = function (point) {
            this.connectionPoints.push(point);
        };
        ShapeType.prototype.moveDefaultFirstConnectionPointPositionToNext = function () {
            if (this.connectionPoints.length > 0) {
                if (this.defaultFirstConnectionPointPosition < this.connectionPoints.length - 1) {
                    this.defaultFirstConnectionPointPosition++;
                }
                else {
                    this.defaultFirstConnectionPointPosition = 0;
                }
            }
        };
        return ShapeType;
    }());
    return ShapeType;
});
