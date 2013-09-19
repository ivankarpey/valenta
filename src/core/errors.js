var ErrorInvoker = function(){
};

ErrorInvoker.raiseNotImplementedException = function(){
    throw new Error("Function not implemented");
};

module.exports = ErrorInvoker;