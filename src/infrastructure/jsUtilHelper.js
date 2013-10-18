//TODO: Add unittests for JSUtilHelper methods

var lodash = require("../../libs/lodash/dist/lodash");

lodash.bindAll()
var JSUtilHelper = function(){

};

JSUtilHelper.__proto__ = lodash;


JSUtilHelper.isNullOrUndefined = function(value){
    return value === null || typeof value === "undefined";
};

module.exports = JSUtilHelper;