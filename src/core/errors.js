var ErrorInvoker = function(){
};

ErrorInvoker.raiseNotImplementedException = function(name){
    throw new Error("Function " + name + " not implemented.");
};

ErrorInvoker.raiseNoMethadataForAction = function(name){
    throw new Error("Couldn't find metadata for " + name);
}

module.exports = ErrorInvoker;