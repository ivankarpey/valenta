
var ExecutionFlow = require("../../../src/core/executionFlow");

describe("Execution Flow", function(){
    
    var dependancyResolver = {};
    
    it("should init with new command", function(){
        
        var flow = new ExecutionFlow(dependancyResolver);
        expect(flow).toBeTruthy();
        
    });
    
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
    
    
    
});
