define(["require", "exports"], function (require, exports) {
    "use strict";
    var Variant = /** @class */ (function () {
        function Variant(type, width, height, image) {
            this.type = type;
            this.height = height;
            this.width = width;
            this.image = image;
        }
        Variant.prototype.getType = function () {
            return this.type;
        };
        Variant.prototype.getHeight = function () {
            return this.height;
        };
        Variant.prototype.getWidth = function () {
            return this.width;
        };
        Variant.prototype.getImage = function () {
            return this.image;
        };
        return Variant;
    }());
    return Variant;
});
