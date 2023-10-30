// Create web server
// Run: node comments.js
// Open: http://localhost:8080/comments.html
// Comments: http://localhost:8080/comments

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = require('./comments.json');

var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case '/':
      fs.readFile(__dirname + '/comments.html', function(err, data) {
        if (err) {
          return send404(res);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data, 'utf8');
        res.end();
      });
      break;
    case '/comments':
      if (req.method === 'POST') {
        var body = '';
        req.on('data', function(data) {
          body += data;
        });
        req.on('end', function() {
          var newComment = JSON.parse(body);
          comments.push(newComment);
          fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
            if (err) {
              return send500(res);
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('OK');
            res.end();
          });
        });
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(comments));
        res.end();
      }
      break;
    default:
      send404(res);
  }
});

function send404(res) {
  res.writeHead(404);
  res.write('404');
  res.end();
}

function send500(res) {
  res.writeHead(500);
  res.write('500');
  res.end();
}

server.listen(8080);
console.log('Listening on port 8080');
```

### 6.3.3. Node.js and Express

Express is a web application framework for Node.js. It provides a set of features for web and mobile applications.

####