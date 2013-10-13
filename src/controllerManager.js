var ErorrInvoker = require('./errors');

var ControllerManager = function(){
    this.controllers = {};
};

ControllerManager.prototype = {
    getControllerInstance: function(name){
    },

    getControllerMetadata: function(){
        ErorrInvoker.raiseNotImplementedException();
    },

    getActionMetadata:function(){
        ErorrInvoker.raiseNotImplementedException();
    }
};

module.exports = ControllerManager;