var JsUtilHelper = require('./../../src/infrastructure/jsUtilHelper');
var Logger = require('./../../src/infrastructure/logger');

var TestManager = function() {
   this.logger = new Logger();
};

TestManager.prototype = {
    raiseError: function(frameworkMsg, userMsg) {
        this.logger.logError(frameworkMsg);
        this.logger.logInfo(userMsg);
        throw frameworkMsg;
    },

    success: function() {
        this.logger.logInfo("Test succesfully passed.\n");

    },

    checkTrue: function(first, second, errorMsg) {
        if (first !== second) {
            this.raiseError("Objects isn't equals", errorMsg);
        }
        this.success();
    },

    checkIsObject: function(elem, errorMsg){
        if(elem === null || typeof elem !== 'object'){
            this.raiseError("Object is null or has wrong type", errorMsg);
        }
        this.success();
    },

    checkNotNullOrUndefined: function(elem, errorMsg) {
        if (JsUtilHelper.isNullOrUndefined(elem)) {
            this.raiseError("Element has NULL value or undefined", errorMsg);
        }
        this.success();
    },

    run: function(testName, test) {
        this.logger.logInfo( '#' +testName + "# test started.");
        test();
    }
};

module.exports = TestManager;
