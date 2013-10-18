var _ = require("../infrastructure/jsUtilHelper");
var er = require("./errors");

function Task(func, order, context){
    
    this.func = func;
    this.order = order;
    this.context = context;
    
};

Task.prototype.invoke = function(){
    
    this.func.call();
    
};

function ExecutionFlow(dependancyResolver){
    
    if(!dependancyResolver){
        throw new Error("Injector is required.")
    }
    
    this.dependancyResolver = dependancyResolver;
    this.tasks = [];
    this.size = 0;
    
};

ExecutionFlow.buildFlow = function(flow, controllerMetadata){
        
};

ExecutionFlow.prototype = {

    append: function(func){
   
        var task = new Task(func, ++this.size);
        this.tasks.push(task);

    },
    
    execute: function(){    

        _.each(this.tasks, function(task){
           task.invoke(); 
        });   

    },

    executeAsync: function(){

        er.raiseNotImplementedError('executeAsync');

    },
};

module.exports = ExecutionFlow;
