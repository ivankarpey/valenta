var _ = require("./jsUtilHelper");
var ErrorInvoker = require("../core/errors");

function ServiceMetaWrap(func, signature){
    this.func = func;
    this.args = signature
    this.meta = func.meta || {};
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

        var func = this.dependencyMap[service];
        if(func.args){
            
        }


        //TODO: Investigate behaviour of functions (constructors, fabricMethods, simple function with call's and apply when invoked with new)
        return new this.dependencyMap[service].func();
        
    },

    _findModule: function(moduleName){
         
         ErrorInvoker.raiseNotImplementedError("find module");
        
    },
    
    
    _setFuncSafely: function(func, key){
        
        if(key in this.dependencyMap){
            throw new Error("This service already registered. Use alias.");
        }else{
            this.dependencyMap[key] = new ServiceMetaWrap(func, this._readSignature(func));
        }
    },

    _readSignature: function(func){

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g)
        if(result === null)
            result = []
        return result

    }
    
};

module.exports = DependencyResolver;
    
    

