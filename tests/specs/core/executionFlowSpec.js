ExecutionFlow = require("../../../src/core/executionFlow");
DependencyResolver = require("../../../src/infrastructure/dependencyResolver")

describe("Execution Flow", function(){
    
    var dependancyResolver = {readSignature: function(){return []}};

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
            });

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
        
        });
    
        describe("with multiple tasks", function(){
            var flow, func;
            var result;

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
    
    describe("flow execution with arguments and with DI by dependency resolver", function(){
        var flow, data;
        function fooCtor (){
            return { msg:"fooObj" };
        }

        function fooCtorParam(fooCtor){
            this.msg = fooCtor.msg + "Params";
            data = this.msg;
        }

        beforeEach(function(){
            var resolver = new DependencyResolver();
            resolver.register(fooCtor);
            resolver.register(fooCtorParam);

            flow = new ExecutionFlow(resolver);
        });

        it("should execute without error", function(){
            flow.append(fooCtorParam);
            flow.execute();
            expect(data).toEqual("fooObjParams");
        });
        
    });
    
});
