var ErrorInvoker = function(){
};

ErrorInvoker.raiseNotImplementedError = function(name){
    throw new Error("Function " + name + " not implemented.");
};

ErrorInvoker.raiseNoMetadataForAction = function(name){
    throw new Error("Couldn't find metadata for " + name);
};

ErrorInvoker.raiseNoMetadataForController = function(name){
    throw new Error("Couldn't find metadata for " + name);
};

module.exports = ErrorInvoker;