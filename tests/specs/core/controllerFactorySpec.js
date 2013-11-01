var ControllerFactory = require('./../../../src/core/controllerFactory');

describe("ControllerFactory", function(){
    var ctrlName = "testController", factory;

    beforeEach(function(){ factory = new ControllerFactory({controllerFolderPath: "./../../tests/app/controllers/"}); });

    it("should init controller instance when calling first time", function(){
        var ctrl = factory.getControllerInstance(ctrlName);
        expect(ctrl).not.toBeNull();
        expect(ctrl).toBeDefined();
        expect(typeof ctrl).toBe('object')
    });

    it("should init controller instance when calling not first time", function(){
        factory.getControllerInstance(ctrlName);
        var ctrl = factory.getControllerInstance(ctrlName);

        expect(ctrl).not.toBeNull();
        expect(ctrl).toBeDefined();
        expect(typeof ctrl).toBe('object')
    });

    describe("Controller Metadata reading", function(){

        it("should provide correct metadata asking first time", function(){
            var meta = factory.getControllerMetadata(ctrlName);
            expect(meta).toBeTruthy();
            expect(meta.name).toEqual(ctrlName);
            expect(meta.args).toBeArray();
            expect(meta.attr).toBeTruthy();
        });

        it("should provide correct metadata asking not first time", function(){
            factory.getControllerMetadata(ctrlName);
            var meta = factory.getControllerMetadata(ctrlName);
            expect(meta).toBeTruthy();
            expect(meta.name).toEqual(ctrlName);
            expect(meta.args).toBeArray();
            expect(meta.attr).toBeTruthy();
        });

        it("should provide correct actions metadata", function(){
            var meta = factory.getControllerMetadata(ctrlName);
            var actionsData = meta.actionsData;
            expect(actionsData).toBeTruthy();
        });

    });
});