var JSUtilHelper = function(){

};

JSUtilHelper.isNullOrUndefined = function(value){
    return value === null || typeof value === "undefined";
}

module.exports = JSUtilHelper;