const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4 } = require('uuid')
const { gameObject, methods } = require('./game.js')

app.use('/', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

io.on('connection', async function (socket) {
  const userId = v4()
  methods.addPlayer({ id: userId })
  io.emit('update-gameObject', gameObject)

  socket.on('disconnect', async function () {
    methods.removePlayer(userId)
    io.emit('update-gameObject', gameObject)
  });
});
