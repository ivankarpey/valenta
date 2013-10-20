
var ExecutionFlow = require("../../../src/core/executionFlow");

describe("Execution Flow", function(){
    
    var dependancyResolver = {};
    
    it("should init with new command", function(){
        
        var flow = new ExecutionFlow(dependancyResolver);
        expect(flow).toBeTruthy();
        
    });
    
    describe("execution flow with tasks without arguments", function(){
    
        describe("with no or single task", function(){
        
        var flow, func;
        var result;
        beforeEach(function(){
            flow = new ExecutionFlow(dependancyResolver);
            func = function(){ 
                result = "done"
            };
            flow.append(func);
        })
        
        it("should append function to flow", function(){
        
            expect(flow.tasks).toBeTruthy();
            expect(flow.tasks.length).toBe(1);
            expect(flow.size).toBe(1);
        
        });
    
        it("should executed without error when single task", function(){
            result = null;
            flow.execute();
            expect(result).toEqual("done");
        });
        
        
    })
    
        describe("with multiple tasks", function(){
           
            it("should execute without error", function(){
                
                result = null;
                flow = new ExecutionFlow(dependancyResolver);
                func = function(){ result = "done"};
                flow.append(func);
                var second = function(){result += "second";}
                flow.append(second);
                flow.execute();
                
                expect(result).toEqual("donesecond");
                
            }) 
        });
    
    });
    
    describe("flow execution with arguments and with DI by dependancy resolver", function(){
        
    });
    
});
