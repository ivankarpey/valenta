var Router = require('./../../../src/core/routing');

describe("router initializtion", function(){

    it("should successfully initialize with settings provided", function(){

        var router = new Router({routePattern: null, defaultRoute: "/home/index"});

        expect(router).toBeTruthy();
        expect(router.settings).toBeTruthy();
        expect(router.settings['routePattern']).toBeNull();
        expect(router.settings['defaultRoute']).toBeTruthy();

    });

    it("should throw error if no settings provided", function(){

        expect(function(){ return new Router();}).toThrow();

    });

});

describe("Checking routing", function(){

    var router = new Router({staticContent: "/public"});

    it("should successfully parse URI", function() {

        var testUrl = "/home/index/123?abcd=999";
        var routingParams = router.parseURI({ url: testUrl });
        expect(routingParams).not.toBeNull();
        expect(routingParams.controller).toEqual("home");
        expect(routingParams.action).toEqual("index");
        expect(routingParams.id).toEqual('123');
        expect(routingParams.queryString["abcd"]).toEqual("999");

    });

    it("should successfully parse empty URI", function(){

        var testUrl = "/";
        var routingParams = router.parseURI({ url: testUrl });
        expect(routingParams).not.toBeNull();
        expect(routingParams.controller).toEqual("home");
        expect(routingParams.action).toEqual("index");
        expect(routingParams.id).toBeNull();

    });

    it("should successfully parse URI without querystring", function(){

        var routingParams = router.parseURI({ url: "/home/index" });
        expect(routingParams).not.toBeNull();
        expect(routingParams.controller).toEqual("home");
        expect(routingParams.action).toEqual("index");
        expect(routingParams.id).toBeNull();
        expect(routingParams.queryString).toEqual([]);

    });

    it("should throw error if no static file pattern", function(){

        expect(function(){
            (new Router({})).isStaticFileRoute("/home/index")
        }).toThrow();

    });

    it("should say that route goes to static file", function(){

        expect(router.isStaticFileRoute("/public/style.css")).toBeTruthy();

    });

    it("should say that route goes to controller/action", function(){

        expect(router.isStaticFileRoute("/home/index")).toBeFalsy();

    });

});
