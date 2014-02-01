var _ = require("./jsUtilHelper");

var MAX_DEEP = 200;

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

};

function DependencyResolver(){
    
    this.dependencyMap = {};
    this.lastKey = null;
    this.deepIndicator = 0;
    
};

DependencyResolver.prototype = {
    
    register: function(func, key){
        
        if(!func){
            throw new Error("No service to register");
        }else{
            if(_.isString(func)){
                func = this._readModule(func);
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
            throw "service with name: " + service || null +" can't be resolved";
        }

        if(this.deepIndicator > MAX_DEEP){
            throw "Circular reference detected or too much dependencies to resolve";
        }

        this.deepIndicator++;
        var dependency = this.dependencyMap[service];
        var params = [];

        if(dependency.args){
            var self = this;
            _.forEach(dependency.args, function(arg){
               params.push(self.resolve(arg));
            });
        }

        this.deepIndicator--;
        return self._build(dependency.func, params);
    },

    readSignature: function(func){

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g)
        if(result === null){
            result = [];
        }
        return result;

    },

    _readModule: function(moduleName){

        return require(moduleName);
        
    },

    _setFuncSafely: function(func, key){
        
        if(key in this.dependencyMap){
            throw new Error("This service already registered. Use alias.");
        }else{
            this.dependencyMap[key] = new ServiceMetaWrap(func, this.readSignature(func));
        }

    },

    _build: function(constructor, args) {

        function F() {
            return constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    }
    
};

module.exports = DependencyResolver;
    
    

