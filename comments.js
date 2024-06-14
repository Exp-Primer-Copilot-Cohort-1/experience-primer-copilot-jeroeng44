//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req);
{
    var url_parts = url.parse(req.url);
    var path = url_parts.pathname;
    var query = url_parts.query;

    switch(path)
    {
        case '/':
            display_form(req, res);
            break;
        case '/comments':
            save_comment(req, res);
            break;
        default:
            display_404(req, res);
            break;
    }
}   