var _ = require("../infrastructure/jsUtilHelper");
var er = ErrorInvoker = require("./errors");
function ExecutionFlow(){


}

ExecutionFlow.prototype = {
    buildFlow: function(){

    },


    append: function(){

    },

    execute: function(){

    },

    executeNext: function(){

    },

    executeAsync: function(){

        er.raiseNotImplementedError('executeAsync');

    },


    executeNextAsync: function(){

        er.raiseNotImplementedError('executeAsync');

    }
};

module.exports = ExecutionFlow;
