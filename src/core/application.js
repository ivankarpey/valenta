var _ = require('./../infrastructure/jsUtilHelper');
var Router = require('./routing');
var ControllerFactory = require("./controllerFactory");
var ExecutionFlow = require("./executionFlow");
var DependencyResolver = require("../infrastructure/dependencyResolver");
var Logger = require('./../infrastructure/logger');
var http = require('http');
var FileServer = require('node-static').Server;

var Application = function(configPath){

    this.logger = new Logger();

    if(_.isNullOrUndefined(configPath)){
        this.initDefault();
    }else{
        this.initWithConfig(configPath);
    }

    this.server = http.createServer(this.handleRequest);
    this.fileServer = new FileServer('.' + this.settings['staticContent']);
    this.controllerFactory = new ControllerFactory(this.settings);
    this.dependencyResolver = new DependencyResolver();
    this._initFilters();
}

Application.prototype = {

    initDefault: function(){

        this.settings = {
            "serverPort": 5000,
            "staticContent": "/public"
        };
        this.router = new Router(this.settings);
        this.server = http.createServer(this.handleRequest);

    },

    initWithConfig: function(path){

        var fs = require('fs');

        try {

            var data =  fs.readFileSync(path).toString();
            this.settings = JSON.parse(data);
            this.router = new Router(this.settings);

        }catch(err) {

            this.logger.logError(err);
            throw err;

        };

    },

    handleRequest: function(request, response){


        if(request.url.indexOf(this.settings.staticContent) == 0){

            this.fileServer.serve(request, response);

        }else{

            var uriData = this.router.parseURI(request);
            var controllerMetadata = this.controllerFactory.getControllerMetadata(uriData.controller);

            ExecutionFlow.buildControllerFlow(
                this.dependencyResolver,
                this.filters,
                controllerMetadata,
                request,
                response,
                uriData.action).execute();

            this._sendResponse(response);

        }

    },

    run: function(){
        this.server.listen(this.settings.serverPort);
    },

    _initFilters: function(){
        this.filters = [];
    },

    _sendResponse: function(response){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(response.executionFlowResult);
    }

};

module.exports = Application;
