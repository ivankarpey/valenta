var ControllerManager = require('./../../../src/core/controllerManager');

describe("ControllerManager initalization", function(){
    var manager = new ControllerManager({controllerFolderPath: "./../../tests/app/controllers/"});
    var ctrlName = "testController";

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