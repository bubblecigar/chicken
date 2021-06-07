var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {
  socket.on('send', message => {
    io.emit('notify', message)
  })

  socket.on('disconnect', function () {
  });
});

module.exports = {
  io
}