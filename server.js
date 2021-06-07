const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4 } = require('uuid')
const { gameObject, methods: gameMethods } = require('./game.js')
const { messages, methods: messageMethods } = require('./message.js')

app.use('/', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

io.on('connection', async function (socket) {
  const userId = v4()
  gameMethods.addPlayer({ id: userId })
  io.emit('update-gameObject', gameObject)
  io.emit('update-messages', messages)

  socket.on('disconnect', async function () {
    gameMethods.removePlayer(userId)
    io.emit('update-gameObject', gameObject)
  });

  socket.on('message', messageObject => {
    messageMethods.pushMessage(messageObject)
    io.emit('update-messages', messages)
  })
});
