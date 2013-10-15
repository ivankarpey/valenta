var ErrorInvoker = require('./errors');
var CodeLoader = require('./../infrastructure/codeLoader');
var _ = require('./../infrastructure/jsUtilHelper');

var ActionMetadata = function(){

}


var ControllerMetadata = function(ctrl) {

    this.controller = ctrl;

    //this.readControllerMetadata();
    //this.actionsData = this.readControllerActionsData();


};

ControllerMetadata.prototype = {

    readControllerActionsData: function(){
        ErrorInvoker.raiseNotImplementedException('readControllerActionsData');
    },

    readControllerMetadata: function(){

    }

};

var ControllerManager = function(settings){

    this.settings = settings;
    this.controllers = {};
    this.controllersMetadata = {};
    this.loader = new CodeLoader(this.settings);

};

ControllerManager.prototype = {

    readControllerFromFile: function (name) {

        this.controllers[name] = this.loader.loadController(name);
        this.controllersMetadata[name] = new ControllerMetadata(this.controllers[name]);

    },

    getControllerInstance: function(name){

        if (! (name in this.controllers)){
            this.readControllerFromFile(name);
        }

        var constructor = this.controllers[name];
        return new constructor();

    },

    getControllerMetadata: function(name){

        if(! name in this.controllersMetadata){
            ErrorInvoker.raiseNoMethadataForController();
        }
        return this.controllersMetadata[name];

    },

    getActionMetadata:function(controller, name){

        var controllerMetadata = this.getControllerMetadata(controller);
        if(! name in controllerMetadata.actionsData){
            ErrorInvoker.raiseNoMethadataForAction(name);
        }
        return controllerMetadata[name];
    }

};

module.exports = ControllerManager;