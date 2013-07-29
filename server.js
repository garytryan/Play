var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('content-Type', 'text/plain');
  res.setHeader('content-Length', body.length);
  res.end(body);
});

// Basic static server
app.use(express.static(__dirname + '/app'));

// Error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.listen(9000);
console.log('Listening on port 9000');