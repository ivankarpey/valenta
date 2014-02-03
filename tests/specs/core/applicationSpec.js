var Application = require('./../../../src/core/application');


describe("Base application tests", function(){

    it("should initialize application with default parameters", function(){

        var app = new Application();
        expect(app).toBeDefined();
        expect(app).not.toBeNull();

    });

    it("should initialize app with settings from config provided", function(){

        var app = new Application("./tests/app/config/app.json");
        expect(app).toBeDefined();
        expect(app).not.toBeNull();

    });

    it("should successfully run and start listen defined port", function(){

        var app = new Application();
        spyOn(app.server, 'listen');
        app.run();
        expect(app.server.listen).toHaveBeenCalledWith(app.settings.serverPort);

    });

    describe("application request handling", function(){

        it("should succesfully handle empty route call", function(){

            fake = function(){};

            var request = {url:"/"};
            var response = {writeHead:fake, end: fake};

            spyOn(response, "writeHead");
            spyOn(response, "end");

            var app = new Application("./tests/app/config/app.json");
            app.handleRequest(request, response);

            expect(response.writeHead).toHaveBeenCalled();
            expect(response.end).toHaveBeenCalledWith(response.executionFlowResult);

        })

    });
});
