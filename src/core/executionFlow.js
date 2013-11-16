var _ = require("../infrastructure/jsUtilHelper");
var er = require("./errors");

function Task(func, order, context, resolver){
    
    this.func = func;
    this.order = order;
    this.context = context;
    this.resolver = resolver;
    
};

Task.prototype.invoke = function(){
    try{
        var signature = this.resolver.readSignature(this.func);
        if(_.isEmpty(signature)){
            this.func.call();
        }else{
            var data = [];
            var self = this;

            _.each(signature, function(elem){
                data.push(self.resolver.resolve(elem));
            })

            this.func.apply(null, data);
        }
    }
    catch(e){
        //TODO:Implement error handling logic according framework policies
        console.log(e);
    }

};

function FilterTask(func, order, context, resolver){

};

_.inherit(FilterTask, Task);

function ControllerTask(func, order, context, resolver){

}

_.inherit(ControllerTask, Task);

function AttributeTask(func, order, context, resolver){

}

_.inherit(AttributeTask, Task);

function ExecutionFlow(dependencyResolver){
    
    if(!dependencyResolver){
        throw new Error("Injector is required.")
    }
    
    this.resolver = dependencyResolver;
    this.tasks = [];
    this.size = 0;
    this.executionContext = {};
    
};

ExecutionFlow.buildControllerFlow = function(flow, controllerMetadata){
        
};

ExecutionFlow.prototype = {

    append: function(func){
        var taskCtor;

        switch(func.type){
            case "ctrl":
                taskCtor = ControllerTask;
                break;
            case "filter":
                taskCtor = FilterTask;
                break;
            case "attribute":
                taskCtor = AttributeTask;
                break;
            default:
                taskCtor = Task;
        }

        this.tasks.push(new taskCtor(func, ++this.size, this.executionContext, this.resolver));

    },
    
    execute: function(){

        _.forEach(this.tasks, function(task){
           task.invoke(); 
        });   

    }

};

module.exports = ExecutionFlow;
