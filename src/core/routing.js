/// Custom lightweight Router implementation, which allow to parse query string according route pattern provided

//TODO: Refactor code to avoid magic numbers and direct literals
var _ = require('../infrastructure/jsUtilHelper');
var Constants = require('./constants');
var queryString = require('querystring');

var RouterParam = function(param){
    this.data = param || {};
    this.queryString = param['queryString'];
    this.controller = this.data['controller'];
    this.action = this.data['action'];
    this.queryString = this.data['params'] || {};
    this.id = this.data['id'];
};

var Router = function(settings) {

    if(!settings){
        throw new Error("Routing settings should be provided");
    }

    this.settings = settings;
    this.setRoutePattern(this.settings['routePattern']);
    this.setDefaultValues(this.settings['defaultRoute']);
};

Router.prototype = {
    setRoutePattern: function(pattern){
        this._pattern = pattern || Constants.DEFAULT_ROUTE;
    },

    setDefaultValues: function(defaults){
        var value = defaults || Constants.DEFAULT_ROUTE_VALUE;
        this._default = this.parseURI({url: value});
    },

    parseURI: function (request) {
        var data = {};
        var parts = _.splitClear(request.url,'?');

        var paramNames = _.splitClear(this._pattern, '/');
        var paramValues = _.splitClear(parts[0], '/');

        var _default = this._default || [];
        for (var i in paramNames) {
            data[paramNames[i]] = paramValues[i] || (_default[paramNames[i]] || null);
        }

        var queryStringData = parts[1];
        if(queryStringData){
            data.params = queryString.parse(queryStringData);
        }

        return new RouterParam(data);
    },

    isStaticFileRoute: function(url){

        if(!this.settings.staticContent){
            throw new Error("static file route pattern should be provided");
        }
        return url.indexOf(this.settings.staticContent) == 0;

    }

};

module.exports = Router;






