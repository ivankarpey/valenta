var TestManager = require('./../framework/core');
var ControllerManager = require('./../../controllerManager');


var checker = new TestManager();
var manager = new ControllerManager();
var ctrlName = "defaultTest";

checker.run("ControllerManager: get controller instance fists time", function(){
    var ctrl = manager.getControllerInstance(ctrlName);
    checker.checkNotNullOrUndefined(ctrl, "Value shouldn't be null or undefined");
    checker.checkIsObject(ctrl, "Controller instance should be an object" );
});

checker.run("ControllerManager: get controller instance not first time", function(){
    var ctrl = manager.getControllerInstance(ctrlName);
    checker.checkNotNullOrUndefined(ctrl, "Value shouldn't be null or undefined");
    checker.checkIsObject(ctrl, "Controller instance should be an object" );
});