var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('content-Type', 'text/plain');
  res.setHeader('content-Length', body.length);
  res.end(body);
});

app.listen(9000);
console.log('Listening on port 9000');