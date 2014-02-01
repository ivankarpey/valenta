var ExecutionFlow = require("../../../src/core/executionFlow");
var DependencyResolver = require("../../../src/infrastructure/dependencyResolver");

describe("Execution Flow", function(){
    
    var dependencyResolver = {readSignature: function(){return []}};

    it("should init with new command", function(){
        
        var flow = new ExecutionFlow(dependencyResolver);
        expect(flow).toBeTruthy();
        
    });
    
    describe("execution flow with tasks without arguments", function(){
    
        describe("with no or single task", function(){

            var flow, func;
            var result;

            beforeEach(function(){
                flow = new ExecutionFlow(dependencyResolver);
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
                flow = new ExecutionFlow(dependencyResolver);
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
        };

        function fooCtorParam(fooCtor){
            this.msg = fooCtor.msg + "Params";
            data = this.msg;
        };

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

    describe("controller flow build logic", function(){

        var ctrlName = "testController", metadata, req, resp = {};

        beforeEach(function(){
            metadata = {
                controller: function(){
                    return {
                        index: function(){}
                    };
                },
                actionsData:{index:{attr:null, func: function(){return "action index executed"}}}
            }}
        );

        it("should allow to build controller flow from single controller, index action", function(){
            var ctrlFlow = ExecutionFlow.buildControllerFlow(dependencyResolver, [], metadata, req, resp, "index");
            ctrlFlow.execute();
            expect(resp.executionFlowResult[0]).toEqual("action index executed");
        });

        //TODO:Introduce filter concepts and attributes into framework and test it properly
//        it("should allow to build controller flow from controller action with attributes", function(){
//            expect(false).toBeTrue();
//        });
//
//
//        it("should allow to build controller flow from controller action with attributes, filters", function(){
//            expect(false).toBeTrue();
//        });


    });



});
