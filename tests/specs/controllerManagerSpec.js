var ControllerManager = require('./../../src/controllerManager');


var manager = new ControllerManager();
var ctrlName = "defaultTest";

describe("ControllerManager initalization", function(){
    it("should init controller instance when calling first time", function(){
        var ctrl = manager.getControllerInstance(ctrlName);
        expect(ctrl).not.toBeNull();
        expect(ctrl).toBeDefined();
        expect(typeof ctrl).toBe('object')
    });

    it("should init controller instance when calling not first time", function(){
        manager.getControllerInstance(ctrlName);
        var ctrl = manager.getControllerInstance(ctrlName);

        expect(ctrl).not.toBeNull();
        expect(ctrl).toBeDefined();
        expect(typeof ctrl).toBe('object')
    });
});