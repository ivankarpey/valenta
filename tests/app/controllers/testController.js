var TestController = function (){
}.meta({attr:['Auth']});

TestController.prototype = {
    index: function(msg){
        return "I am index";
    }.meta({attr:['POST']})
}

module.exports = TestController;