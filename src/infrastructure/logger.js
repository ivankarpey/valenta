var Logger = function(){

    function log(header, msg){
        console.log(header + ": " + msg);
    };

    var Logger = function(){
    };

    Logger.prototype = {

        logInfo: function(msg){
            log("INFO", msg);
        },

        logError: function(msg){
            log("ERROR", msg);
        }
    };
    return Logger;
};

module.exports = Logger();