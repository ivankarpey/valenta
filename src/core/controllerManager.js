var ErrorInvoker = require('./errors');
var __ = require('./../infrastructure/jsUtilHelper');

var ActionMetadata = function(){

}


var ControllerMetadata = function(controllerFullPath) {

    this.path = controllerFullPath;
    this.actionsData = this.readControllerActionsData();
    this.filters = this.readFiltersList();

};

ControllerMetadata.prototype = {

    readControllerActionsData: function(){
        ErrorInvoker.raiseNotImplementedException();
    },
    readFiltersList: function(){
        ErrorInvoker.raiseNotImplementedException();
    }

};

var ControllerManager = function(settings){

    this.settings = settings;
    this.controllers = {};
    this.controllersMetadata = {};

};

ControllerManager.prototype = {

    readControllerFromFile: function (name) {

        var controllerFullPath = this.settings["controllerFolderPath"] + name;
        this.controllers[name] = require(controllerFullPath);
        this.controllersMetadata[name] = new ControllerMetadata(controllerFullPath);

    },

    getControllerInstance: function(name){

        if (! __.hasKey(this.controllers, name)){
            this.readControllerFromFile(name);
        }
        return new (this.controllers[name])();

    },

    getControllerMetadata: function(name){

        if(! __.hasKey(this.controllersMetadata, name)){
            ErrorInvoker.raiseNoMethadataForController();
        }
        return this.controllersMetadata[name];

    },

    getActionMetadata:function(controller, name){

        var controllerMetadata = this.getControllerMetadata(controller);
        if(! __.hasKey(controllerMetadata.actionsData, name)){
            ErrorInvoker.raiseNoMethadataForAction(name);
        }
        return controllerMetadata[name];

    }

};

module.exports = ControllerManager;