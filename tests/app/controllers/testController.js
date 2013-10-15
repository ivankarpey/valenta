var TestController = function (){
}.meta({attr:['Auth']});

TestController.prototype = {
    index: function(){
        return "I am index";
    }.meta({attr:['POST']})
}

module.exports = TestController;