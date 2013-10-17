var ControllerManager = require('./../../../src/core/controllerManager');

describe("ControllerManager", function(){
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

    describe("Controller Metadata reading", function(){

        it("should provide correct metadata asking first time", function(){
            var meta = manager.getControllerMetadata(ctrlName);
            expect(meta).toBeTruthy();
            expect(meta.name).toEqual(ctrlName);
            expect(meta.args).toBeArray();
            expect(meta.attr).toBeTruthy();
        })

        it("should provide correct metadata asking not first time", function(){
            manager.getControllerMetadata(ctrlName);
            var meta = manager.getControllerMetadata(ctrlName);
            expect(meta).toBeTruthy();
            expect(meta.name).toEqual(ctrlName);
            expect(meta.args).toBeArray();
            expect(meta.attr).toBeTruthy();
        })

        it("should provide correct actions metadata", function(){
            var meta = manager.getControllerMetadata(ctrlName);
            var actionsData = meta.actionsData;
            expect(actionsData).toBeTruthy();
        })

    });
});