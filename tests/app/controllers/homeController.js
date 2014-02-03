var HomeController = function (){
}.meta({attr:['Auth']});

HomeController.prototype = {
    index: function(){
        return "I am 'index' of home controller";
    }
}

module.exports = HomeController;