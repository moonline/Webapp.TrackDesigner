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
define(["require", "exports", "Classes/Domain/Model/Point", "Classes/Domain/Model/Shape", "Classes/Domain/Model/Layout", "Classes/Utility/Observable", "Classes/Utility/EventType"], function (require, exports, Point, Shape, Layout, Observable, EventType) {
    "use strict";
    var DesignerView = /** @class */ (function (_super) {
        __extends(DesignerView, _super);
        function DesignerView(layout, shapeTypes, variantTypes) {
            var _this = _super.call(this) || this;
            _this.elements = {};
            _this.shapeTypes = {};
            _this.variantTypes = {};
            _this.viewConfig = {
                shapePointSize: 50,
                connectionPointSize: 15,
                connectedPointSize: 2,
                freePointSize: 15
            };
            _this.setLayout(layout);
            _this.shapeTypes = shapeTypes;
            _this.variantTypes = variantTypes;
            _this.factor = 0.5;
            return _this;
        }
        DesignerView.prototype.setLayout = function (layout) {
            this.layout = layout;
            this.layout.addObserver(this);
        };
        DesignerView.prototype.initializeUiElement = function (elementId) {
            this.elements[elementId] = document.getElementById(elementId);
            return this.elements[elementId];
        };
        DesignerView.prototype.createShapeTypesMenu = function () {
            this.elements['shapeTypes'].innerHTML = '';
            var selectElement = this.elements['variantTypes'];
            var selectedVariantIndex = selectElement.selectedIndex;
            if (selectedVariantIndex > 0) {
                var variantType = this.variantTypes[selectElement.options[selectedVariantIndex].value];
                var shapeTypesButtons = [];
                Object.keys(this.shapeTypes).forEach(function (key) {
                    var shapeType = this.shapeTypes[key];
                    if (shapeType.hasVariant(variantType)) {
                        var variant = shapeType.getVariantByType(variantType);
                        var button = document.createElement('button');
                        button.innerHTML = '<img class="track" src="' + variant.getImage() + '" alt="' + shapeType.getName() + '" />';
                        button.title = shapeType.getName();
                        button.addEventListener('click', function (event) {
                            this.layout.createShape(shapeType, variant);
                            if (this.layout.getCurrentElement() instanceof Shape) {
                                this.scrollToCenter(this.layout.getCurrentElement().getPosition());
                            }
                        }.bind(this));
                        this.elements['shapeTypes'].appendChild(button);
                    }
                }.bind(this));
            }
            else {
                Object.keys(this.shapeTypes).forEach(function (key) {
                    var shapeType = this.shapeTypes[key];
                    Object.keys(this.variantTypes).forEach(function (vtKey) {
                        var variantType = this.variantTypes[vtKey];
                        if (shapeType.hasVariant(variantType)) {
                            var variant = shapeType.getVariantByType(variantType);
                            var button = document.createElement('button');
                            button.innerHTML = '<img class="track" src="' + variant.getImage() + '" alt="' + shapeType.getName() + '" />';
                            button.title = shapeType.getName();
                            button.addEventListener('click', function (event) {
                                this.layout.createShape(shapeType, variant);
                                if (this.layout.getCurrentElement() instanceof Shape) {
                                    this.scrollToCenter(this.layout.getCurrentElement().getPosition());
                                }
                            }.bind(this));
                            this.elements['shapeTypes'].appendChild(button);
                        }
                    }.bind(this));
                }.bind(this));
            }
        };
        DesignerView.prototype.initializeView = function () {
            var canvasElement = document.getElementById('layoutArea');
            this.elements['canvas'] = canvasElement;
            canvasElement.addEventListener('click', function (event) {
                var x = event.pageX - canvasElement.offsetLeft + canvasElement.parentNode.scrollLeft;
                var y = event.pageY - canvasElement.offsetTop + canvasElement.parentNode.scrollTop;
                this.layout.setCurrentElementByPosition(new Point(x / this.factor, y / this.factor), this.viewConfig);
            }.bind(this));
            this.elements['canvas'].width = this.layout.getWidth() * this.factor;
            this.elements['canvas'].height = this.layout.getHeight() * this.factor;
            this.canvas = this.elements['canvas'].getContext('2d');
            this.initializeUiElement('variantTypes');
            // all
            var option = document.createElement('option');
            option.value = 'all';
            option.title = 'All';
            option.innerHTML = '<span class="label">All</span>';
            this.elements['variantTypes'].appendChild(option);
            Object.keys(this.variantTypes).forEach(function (key) {
                var variantType = this.variantTypes[key];
                var option = document.createElement('option');
                if (variantType.getName() == "Default") {
                    option.selected = true;
                }
                option.value = key;
                option.title = variantType.getName();
                option.innerHTML = '<img class="icon" src="' + variantType.getImage() + '" /><span class="label">' + variantType.getName() + '</span>';
                this.elements['variantTypes'].appendChild(option);
            }.bind(this));
            this.initializeUiElement('shapeTypes');
            this.elements['variantTypes'].addEventListener('change', function (event) {
                this.createShapeTypesMenu();
            }.bind(this));
            this.createShapeTypesMenu();
            this.initializeUiElement('buttonRemove').addEventListener('click', function (event) {
                this.layout.removeCurrentShape();
            }.bind(this));
            document.body.addEventListener('keydown', function (event) {
                if (event.keyCode === event.DOM_VK_BACK_SPACE || event.keyCode === 8 || event.keyCode === event.DOM_VK_DELETE || event.keyCode === 46) {
                    this.layout.removeCurrentShape();
                }
            }.bind(this));
            this.initializeUiElement('buttonRotate').addEventListener('click', function (event) {
                this.layout.rotateCurrentShape();
            }.bind(this));
            document.body.addEventListener('keypress', function (event) {
                if (String.fromCharCode(event.charCode) === 'r') {
                    this.layout.rotateCurrentShape();
                }
            }.bind(this));
            this.initializeUiElement('buttonExport').addEventListener('click', function (event) {
                this.exportLayout();
            }.bind(this));
            this.initializeUiElement('buttonSave').addEventListener('click', function (event) {
                this.notifyObservers(EventType.actionCall, { action: "save" });
            }.bind(this));
            this.initializeUiElement('buttonOpen').addEventListener('change', function (event) {
                // change to tab with all chapes because crappy browser won't render other shape image in canvas, change back after
                document.getElementById('variantTypes').value = 'all';
                this.createShapeTypesMenu();
                this.notifyObservers(EventType.actionCall, { action: "open", file: event.target.files[0] });
                document.getElementById('variantTypes').value = 'Default';
                this.createShapeTypesMenu();
            }.bind(this));
            this.initializeUiElement('moveToFront').addEventListener('click', function (event) {
                if (this.layout.getCurrentElement() instanceof Shape) {
                    this.layout.moveShapeToFront(this.layout.getCurrentElement());
                }
            }.bind(this));
            this.draw();
        };
        DesignerView.prototype.draw = function (drawControlElements) {
            if (drawControlElements === void 0) { drawControlElements = true; }
            this.canvas.clearRect(0, 0, this.elements['canvas'].width, this.elements['canvas'].height);
            this.drawBackground();
            for (var si in this.layout.shapes) {
                var shape = this.layout.shapes[si];
                if (shape.getVariant().getImage() != "") {
                    var img = new Image;
                    img.src = shape.getVariant().getImage();
                    this.drawRotatedImage(img, shape.getPosition(), shape.getVariant().getWidth(), shape.getVariant().getHeight());
                }
                if (drawControlElements && shape === this.layout.getCurrentElement()) {
                    this.canvas.globalAlpha = 0.4;
                    this.drawRectangle(shape.getCorners(), "rgb(255,255,0)", "rgb(255,255,0)");
                    this.canvas.globalAlpha = 1;
                }
                var connectionPoints = shape.getConnectionPoints();
                for (var cpi in connectionPoints) {
                    if (drawControlElements && connectionPoints[cpi].getConnection() == null) {
                        if (connectionPoints[cpi] === this.layout.getCurrentElement()) {
                            this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectionPointSize, "rgb(255,140,0)", "rgb(255,140,0)");
                        }
                        else {
                            this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectionPointSize, "rgb(0,255,0)", "rgb(0,255,0)");
                        }
                    }
                    else {
                        this.drawPoint(connectionPoints[cpi].getPosition(), this.viewConfig.connectedPointSize, "rgb(255,255,255)", "rgb(255,255,255)");
                    }
                }
            }
            if (drawControlElements && this.layout.getCurrentElement() instanceof Point) {
                this.drawPoint(this.layout.getCurrentElement(), this.viewConfig.freePointSize, "rgb(255,140,0)", "rgb(255,140,0)");
            }
        };
        DesignerView.prototype.scrollToCenter = function (point) {
            var scrollContainer = this.elements['canvas'].parentNode;
            var scrollToX = (point.getX() * this.factor) - (scrollContainer.clientWidth / 2);
            var scrollToY = (point.getY() * this.factor) - (scrollContainer.clientHeight / 2);
            if (scrollToX > 0) {
                scrollContainer.scrollLeft = scrollToX;
            }
            if (scrollToX > 0) {
                scrollContainer.scrollTop = scrollToY;
            }
        };
        DesignerView.prototype.drawPoint = function (position, radius, fillStyle, strokeStyle) {
            if (fillStyle === void 0) { fillStyle = "rgb(0,0,0)"; }
            if (strokeStyle === void 0) { strokeStyle = "rgb(0,0,0)"; }
            this.canvas.beginPath();
            // Startposition festlegen (gleich dem Mittelpkt)
            this.canvas.moveTo(position.getX() * this.factor, position.getY() * this.factor);
            // Kreis um den Mittelpunkt zeichnen
            this.canvas.arc(position.getX() * this.factor, position.getY() * this.factor, radius * this.factor, 0, Math.PI * 2, false);
            this.canvas.closePath();
            this.canvas.fillStyle = fillStyle;
            this.canvas.strokeStyle = strokeStyle;
            this.canvas.fill();
            this.canvas.stroke();
        };
        DesignerView.prototype.drawRotatedImage = function (image, position, width, height) {
            // save the current co-ordinate system before we screw with it
            this.canvas.save();
            // move to the middle of where we want to draw our image
            this.canvas.translate(position.getX() * this.factor, position.getY() * this.factor);
            // rotate around that point, converting our angle from degrees to radians 
            this.canvas.rotate(position.getAngle() * Math.PI * 2);
            // draw it up and to the left by half the width and height of the image 
            this.canvas.drawImage(image, -(width / 2) * this.factor, -(height / 2) * this.factor, width * this.factor, height * this.factor);
            // and restore the co-ords to how they were when we began
            this.canvas.restore();
        };
        DesignerView.prototype.drawRectangle = function (points, fillStyle, strokeStyle, lineWidth) {
            if (fillStyle === void 0) { fillStyle = null; }
            if (strokeStyle === void 0) { strokeStyle = null; }
            if (lineWidth === void 0) { lineWidth = 1; }
            if (points.length > 2) {
                this.canvas.beginPath();
                this.canvas.moveTo(points[0].getX() * this.factor, points[0].getY() * this.factor);
                for (var pi = 1; pi < points.length; pi++) {
                    this.canvas.lineTo(points[pi].getX() * this.factor, points[pi].getY() * this.factor);
                }
                this.canvas.lineTo(points[0].getX() * this.factor, points[0].getY() * this.factor);
                if (fillStyle) {
                    this.canvas.fillStyle = fillStyle;
                    this.canvas.fill();
                }
                if (strokeStyle) {
                    this.canvas.lineWidth = lineWidth;
                    this.canvas.strokeStyle = strokeStyle;
                    this.canvas.stroke();
                }
            }
        };
        DesignerView.prototype.drawBackground = function () {
            this.canvas.beginPath();
            this.canvas.rect(0, 0, this.elements['canvas'].width, this.elements['canvas'].height);
            this.canvas.fillStyle = 'white';
            this.canvas.fill();
        };
        DesignerView.prototype.exportLayout = function () {
            this.draw(false);
            window.open(this.elements['canvas'].toDataURL("image/png"), '_blank');
            this.draw();
        };
        DesignerView.prototype.notify = function (event, notifier, subject) {
            if (event === EventType.objectResized && subject instanceof Layout || event === EventType.objectReplaced && subject instanceof Layout) {
                this.elements['canvas'].width = this.layout.getWidth() * this.factor;
                this.elements['canvas'].height = this.layout.getHeight() * this.factor;
            }
            if (event === EventType.objectReplaced && subject instanceof Layout) {
                this.draw();
            }
            this.draw();
        };
        return DesignerView;
    }(Observable));
    return DesignerView;
});
