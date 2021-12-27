define(["require", "exports"], function (require, exports) {
    "use strict";
    var VariantType = /** @class */ (function () {
        function VariantType(id, name, image) {
            if (image === void 0) { image = null; }
            this.id = id;
            this.name = name;
            this.image = image;
        }
        VariantType.prototype.getName = function () {
            return this.name;
        };
        VariantType.prototype.getId = function () {
            return this.id;
        };
        VariantType.prototype.getImage = function () {
            return this.image;
        };
        return VariantType;
    }());
    return VariantType;
});
