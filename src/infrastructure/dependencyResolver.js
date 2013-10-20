var _ = require("./jsUtilHelper");
var ErrorInvoker = require("../core/errors");

function ServiceMetaWrap(func){
    this.func = func;
};

function DependencyResolverDecorator(resolver){
    this.resolver = resolver; 
};

DependencyResolverDecorator.prototype = {
    
    withAliases: function(aliases){
        
        var self = this.resolver;
        
        function setAliases(aliases){
            
            var funcWrap = self.dependencyMap[self.lastKey];
            
            _.forEach(aliases, function(alias){
                self._setFuncSafely(funcWrap.func, alias.toString());
            });
            
        };
        
        if(aliases){
            
            if(_.isArray(aliases)){
                setAliases(aliases);
            }else{
                setAliases(arguments);
            }
            
        }
        
        return this;
        
    },
    
    asSingleton: function(){
        var self = this.resolver
        self.dependencyMap[self.lastKey].singleton = true;
        return this;
        
    }

}


function DependencyResolver(){
    
    this.dependencyMap = {};
    this.lastKey = null;
    
};

DependencyResolver.prototype = {
    
    register: function(func, key){
        
        if(!func){
            throw new Error("No service to register");
        }else{
            if(_.isString(func)){
                func = this._findModule(func);
            }
            if(!key && !func.name){
                throw new Error("Can't register unnamed service, key should be provided");
            }else{
                key = key || func.name;
            }
        }
        
        this.lastKey = key;
        this._setFuncSafely(func, key);
        
        return new DependencyResolverDecorator(this);
        
    },
    
    resolve: function(service){
        
        if(!service || !(service in this.dependencyMap)){
            throw "Current service couldn't be resolved";
        }
        
        return new this.dependencyMap[service];
        
    },
    
    _findModule: function(moduleName){
         
         ErrorInvoker.raiseNotImplementedError("find module");
        
    },
    
    
    _setFuncSafely: function(func, key){
        
        if(key in this.dependencyMap){
            throw new Error("This service already registered. Use alias.");
        }else{
            this.dependencyMap[key] = new ServiceMetaWrap(func);
        }
        
    }
    
};

module.exports = DependencyResolver;
    
    

