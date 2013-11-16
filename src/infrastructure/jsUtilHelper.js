//TODO: Add unittests for JSUtilHelper methods

var lodash = require("../../libs/lodash/dist/lodash");

var JSUtilHelper = function(){

};


JSUtilHelper.__proto__ = lodash;



JSUtilHelper.isNullOrUndefined = function(value){
    return value === null || typeof value === "undefined";
};

//TODO: implement normal inheritance way
JSUtilHelper.inherit = function(childClass, baseClass){
    childClass.prototype = new baseClass();
    childClass.__proto__ = baseClass;
}


module.exports = JSUtilHelper;