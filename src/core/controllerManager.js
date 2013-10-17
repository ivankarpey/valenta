var ErrorInvoker = require('./errors');
var CodeLoader = require('./../infrastructure/codeLoader');
var _ = require('./../infrastructure/jsUtilHelper');

var ControllerMetadata = (function(){

    function readSignature(func){

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g)
        if(result === null)
            result = []
        return result

    };

    var ActionMetadata = function(func){
        this.name = func.name;
        this.args = readSignature(func);
        this.attr = func.meta;
    };

    function ControllerMetadata(ctrl, name) {

        this.controller = ctrl;
        this.readControllerMetadata(name);
        this.readControllerActionsData()

    };


    ControllerMetadata.prototype = {

        readControllerActionsData: function(){
            this.actionsData = {};
            var proto = this.controller.prototype;
            for(var method in proto){
                if(proto.hasOwnProperty(method)){
                    this.actionsData[method.name] = new ActionMetadata(method);
                }
            }
        },

        readControllerMetadata: function(name){
            this.name = name;
            this.args = readSignature(this.controller);
            this.attr = this.controller.meta;
        }
    };

    return ControllerMetadata;
})();


var ControllerManager = function(settings){

    this.settings = settings;
    this.controllers = {};
    this.controllersMetadata = {};
    this.loader = new CodeLoader(this.settings);

};

ControllerManager.prototype = {

    readControllerFromFile: function (name) {

        this.controllers[name] = this.loader.loadController(name);
        this.controllersMetadata[name] = new ControllerMetadata(this.controllers[name], name);

    },

    getControllerInstance: function(name){

        if (! (name in this.controllers)){
            this.readControllerFromFile(name);
        }

        var constructor = this.controllers[name];
        return new constructor();

    },

    getControllerMetadata: function(name){

        if(!(name in this.controllersMetadata)){
            this.readControllerFromFile(name);
        }
        return this.controllersMetadata[name];

    },

    getActionMetadata:function(controller, name){

        var controllerMetadata = this.getControllerMetadata(controller);
        if(! (name in controllerMetadata.actionsData)){
            ErrorInvoker.raiseNoMetadataForAction(name);
        }
        return controllerMetadata[name];
    }

};

module.exports = ControllerManager;