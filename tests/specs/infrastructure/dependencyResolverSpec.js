var DependencyResolver = require("./../../../src/infrastructure/dependencyResolver");

describe("Dependancy Resolver", function(){
    var resolver;
    var func = function(){ return {msg: "I'm resolved object"}};

    beforeEach(function(){

        resolver = new DependencyResolver();

    });

    describe("register part", function(){

        it("should be able to register direct constructor", function(){

            resolver.register(func, "testFunc");
            expect(resolver.dependencyMap).toBeTruthy();
            expect(resolver.dependencyMap["testFunc"].func()).toEqual({msg: "I'm resolved object"});

        });

        it("should be able to register constructor with aliases in array form", function(){

           resolver.register(func, "testFunc").withAliases(["test", "hello"]);
           expect(resolver.dependencyMap["testFunc"].func()).toEqual({msg: "I'm resolved object"});
           expect(resolver.dependencyMap["test"].func()).toEqual({msg: "I'm resolved object"});
           expect(resolver.dependencyMap["hello"].func()).toEqual({msg: "I'm resolved object"});

        });

        it("should be able to register constructor with aliases in arguments form", function(){

           resolver.register(func, "testFunc").withAliases("test", "hello");
           expect(Object.keys(resolver.dependencyMap).length).toBe(3);
           expect(resolver.dependencyMap["testFunc"].func()).toEqual({msg: "I'm resolved object"});
           expect(resolver.dependencyMap["test"].func()).toEqual({msg: "I'm resolved object"});
           expect(resolver.dependencyMap["hello"].func()).toEqual({msg: "I'm resolved object"});

        });

        it("should register function with signature in correct manner", function(){

            var funcWithParams = function(param1, param2){return {msg: "I'm resolved object"}};
            resolver.register(funcWithParams, "testFunc");
            expect(resolver.dependencyMap["testFunc"].func()).toEqual({msg: "I'm resolved object"});
            expect(resolver.dependencyMap["testFunc"].args).toBeArray();
            expect(resolver.dependencyMap["testFunc"].args[0]).toEqual("param1");

        });

        it("should register function with metadata correctly", function(){

            func.meta = {type:'function'};
            resolver.register(func, "testFunc");
            expect(resolver.dependencyMap["testFunc"].func()).toEqual({msg: "I'm resolved object"});
            expect(resolver.dependencyMap["testFunc"].meta["type"]).toEqual("function");

        });
    });

    describe("resolving part", function(){
        var tName = "testFunc";

        beforeEach(function(){
           resolver.register(func, tName);
        });

        it("should resolve direct constructor without arguments", function(){
            var item = resolver.resolve(tName);
            expect(item).toBeTruthy();
            expect(item.msg).toEqual("I'm resolved object");
        });

        it("should resolve direct constructor with args, when other args registered", function(){
            var funcParams = function(testFunc){ this.data = testFunc.msg };
            resolver.register(funcParams, "withParams");
            var result = resolver.resolve("withParams");
            expect(result).toBeTruthy();
            expect(result.data).toEqual("I'm resolved object");
        });
//
//        it("should throw an exception during resolving constructtor if some args not registered", function(){
//            expect(null).toBeTruthy();
//        });
//
//        it("should corectly handle scenario when arguments also have arguments (reqursion)", function(){
//            expect(null).toBeTruthy();
//        });
//
//        it("should throw exception when detecting circular references, which caused infinite reqursion", function(){
//            expect(null).toBeTruthy();
//        });

    });
});