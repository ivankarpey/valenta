
var buffer = {};

function addFunctionExtensions(){
    buffer.meta = Function.prototype.meta;
    Function.prototype.meta = function(metadata){
        this.meta = metadata;
        return this;
    }
};

function removeFunctionExtensions(){
    Function.prototype.meta = buffer.meta;
};

function CodeLoader(settings){
    this.settings = settings;
};

CodeLoader.prototype = {
    loadController: function(name){

        var controllerFullPath = this.settings["controllerFolderPath"] + name;
        addFunctionExtensions();
        var result = require(controllerFullPath);
        removeFunctionExtensions();
        return result;
    }
};

module.exports = CodeLoader;

