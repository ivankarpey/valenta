var TestManager = require('./../framework/core');
var Router = require('./../../src/routing');

var cheker = new TestManager();
var router = new Router();

cheker.run("Router:parseURI", function() {
    var testUrl = "/controller/action/123?abcd=999";
    router.parseURI({ url: testUrl });
    cheker.checkNotNullOrUndefined(router);
});

cheker.run("Router:Check default params values", function(){
    var testUrl = "/home/index/123?abcd=999";
    var routingParams = router.parseURI({ url: testUrl });
    cheker.checkNotNullOrUndefined(routingParams);
    cheker.checkTrue(routingParams.controller, "home", "Controller value should be 'home'");
    cheker.checkTrue(routingParams.action, "index", "Action value should be 'index'");
    cheker.checkTrue(routingParams.id, '123', "Id value should be 123");
    cheker.checkTrue(routingParams.queryString["abcd"], "999", "Querystring param abcd should be 999");
});



