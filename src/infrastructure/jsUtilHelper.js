//TODO: Add unittests for JSUtilHelper methods

var lodash = require("../../libs/lodash/dist/lodash");

var _ = function(){

};

_.__proto__ = lodash;

_.isNullOrUndefined = function(value){
    return value === null || typeof value === "undefined";
};

//TODO: implement normal inheritance way
_.inherit = function(childClass, baseClass){
    childClass.prototype = new baseClass();
    childClass.__proto__ = baseClass;
};

_.reference = function(func, context){
    return function(){
        func.apply(context, arguments);
    }
};

_.splitClear = function(elem, separator){

    if(!elem.split){
        throw new Error("This element could not be split. It's not a string");
    }

    return elem.split(separator).filter(function(elem){ return elem });

};


module.exports = _;