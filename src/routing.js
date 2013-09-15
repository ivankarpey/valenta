/// Custom lightweight Router implementation, which allow to parse query string according route pattern provided

//TODO: Refactor code to avoid magic numbers and direct literals

var Constants = require('./constants');
var queryString = require('querystring');

var RouterParam = function(param){
    this.data = param || {};
    this.queryString = this.data['queryString'];
    this.controller = this.data['controller'];
    this.action = this.data['action'];
    this.queryString = this.data['params'];
    this.id = this.data['id'];
};

var Router = function(pattern) {
    this.setRoutePattern(pattern);
};

Router.prototype = {
    setRoutePattern: function(pattern){
        this._pattern = pattern || Constants.DEFAULT_ROUTE;
    },

    parseURI: function (request) {
        var data = {};

        if (request.url.indexOf('?') !== -1) {
            var parts = request.url.split('?');
        }else{
            parts[0] = request.url;
            parts[1] = "";
        }

        var paramNames = this._pattern.split('/');
        var paramValues = parts[0].split('/');

        for (var i in paramNames) {
            data[paramNames[i]] = paramValues[i];
        }
        data.params = queryString.parse(parts[1]);

        return new RouterParam(data);
    }
};

module.exports = Router;






