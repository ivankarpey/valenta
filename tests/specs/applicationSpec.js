var Application = require('./../../src/core/application');


describe("Base application tests", function(){

    it("should initialize application with default parameters", function(){

        var app = new Application();
        expect(app).toBeDefined();
        expect(app).not.toBeNull();

    });

    it("should initialize app with settings from config provided", function(){

        var app = new Application("./tests/config/app.json");
        expect(app).toBeDefined();
        expect(app).not.toBeNull();

    })
});
