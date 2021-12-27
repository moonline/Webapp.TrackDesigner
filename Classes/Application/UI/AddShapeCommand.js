define(["require", "exports"], function(require, exports) {
    var AddShapeCommand = (function () {
        function AddShapeCommand(layout) {
            this.layout = layout;
        }
        AddShapeCommand.prototype.execute = function () {
            // TODO
            console.log('TODO execute AddShapeCommand');
        };

        AddShapeCommand.prototype.isExecutable = function () {
            return true;
        };
        return AddShapeCommand;
    })();

    
    return AddShapeCommand;
});
