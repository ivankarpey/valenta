var JSUtilHelper = function(){

};

JSUtilHelper.hasKey = function(hash, key){
    return key in hash;
};

JSUtilHelper.isNullOrUndefined = function(value){
    return value === null || typeof value === "undefined";
};

module.exports = JSUtilHelper;