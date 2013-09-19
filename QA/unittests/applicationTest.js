var TestManager = require('./../framework/core');
var Application = require('./../../src/core/application');

var checker = new TestManager();
var app = new Application();

checker.run("Application: default initialization", function(){
    checker.checkNotNullOrUndefined(app, "Value shouldn't be null or undefined");
});

checker.run("Application: custom initialization", function(){
    app = new Application('./../config/app.json');
    checker.checkNotNullOrUndefined(app, "Value shouldn't be null or undefined");
});

