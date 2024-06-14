//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var comments = [];

var server = http.createServer(function (req, res) {
    //parse url
    var urlObj = url.parse(req.url, true);
    //get path
    var pathName = urlObj.pathname;
    //get query
    var query = urlObj.query;
    //get method
    var method = req.method;

    //router
    if (pathName === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (pathName === '/comment') {
        //get comments
        if (method === 'GET') {
            var jsonStr = JSON.stringify(comments);
            res.end(jsonStr);
        }
        //add comments
        else if (method === 'POST') {
            var str = '';
            req.on('data', function (chunk) {
                str += chunk;
            });
            req.on('end', function () {
                var comment = qs.parse(str);
                comments.push(comment);
                var jsonStr = JSON.stringify(comments);
                res.end(jsonStr);
            });
        }
    } else {
        var filePath = path.join(__dirname, pathName);
        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            }
            res.end(data);
        });
    }
});

server.listen(3000, function () {
    console.log('Server is running...');
});
