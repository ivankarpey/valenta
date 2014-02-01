var Router = require('./../../../src/core/routing');

var router = new Router();

describe("Checking routing", function(){

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
        expect(routingParams.action).toBeNull();
        expect(routingParams.id).toBeNull();

    })
});
