var http = require("http");

http.createServer(function(req, res){
    var abc = "999";
    abc += 777;
}).listen(3333);