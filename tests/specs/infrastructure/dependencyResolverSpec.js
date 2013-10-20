var DependencyResolver = require("./../../../src/infrastructure/dependencyResolver");

describe("Dependancy Resolver", function(){
    var resolver;
    var func = function(){ return {msg: "I'm resolved object"}};
    
    beforeEach(function(){
        
        resolver = new DependencyResolver();
        
    });
    
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
        
    })
    
    it("should be able to register constructor with aliases in arguments form", function(){
        
       resolver.register(func, "testFunc").withAliases("test", "hello");
       expect(Object.keys(resolver.dependencyMap).length).toBe(3);
       expect(resolver.dependencyMap["testFunc"].func()).toEqual({msg: "I'm resolved object"});
       expect(resolver.dependencyMap["test"].func()).toEqual({msg: "I'm resolved object"});
       expect(resolver.dependencyMap["hello"].func()).toEqual({msg: "I'm resolved object"});
        
    })
});