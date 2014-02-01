var JsUtilHelper = require('./../infrastructure/jsUtilHelper');
var Router = require('./routing');
var Logger = require('./../infrastructure/logger');
var http = require('http')

var Application = function(configPath){

    var self = this;
    this.logger = new Logger();

    if(JsUtilHelper.isNullOrUndefined(configPath)){
        this.initDefault();
    }else{
        this.initWithConfig(configPath)
    }
}

Application.prototype = {

    initDefault: function(){
        this.settings = {
            "serverPort": 5000
        };
        this.router = new Router();
        this.server = http.createServer(this.handleRequest);
    },

    initWithConfig: function(path){
        var fs = require('fs');

        try {

            var data =  fs.readFileSync(path).toString();
            this.settings = JSON.parse(data);
            this.router = new Router(this.settings['routePattern']);

        }catch(err) {

            this.logger.logError(err);
            throw err;

        };
    },

    initiateController: function (uriData) {


    },

    handleRequest: function(req, resp){
        
        var uriData = self.router.parseURI(req.path);
        var controller = self.initiateController(uriData);

    },

    run: function(){
        this.server.listen(this.settings.serverPort);
    }

};

module.exports = Application;
