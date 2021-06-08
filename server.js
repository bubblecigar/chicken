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
  const userData = socket.handshake.auth
  const { userName, userId } = userData

  gameMethods.joinGuest(userData)
  messageMethods.pushSystemMessage(`${userName} join the room`)
  io.emit('update-gameObject', gameObject)
  io.emit('update-messages', messages)

  socket.on('disconnect', async function () {
    gameMethods.removeGuest(userId)
    messageMethods.pushSystemMessage(`${userName} leave the room`)
    io.emit('update-gameObject', gameObject)
    io.emit('update-messages', messages)
  });

  socket.on('move-chess', action => {
    gameMethods.gameLoop(action)
    io.emit('update-gameObject', gameObject)
  })

  socket.on('reset-chessboard', action => {
    gameMethods.resetChessboard()
    io.emit('update-gameObject', gameObject)
  })

  socket.on('take-color', color => {
    gameMethods.takeColor(userData, color)
    io.emit('update-gameObject', gameObject)
  })
  socket.on('leave-game', () => {
    gameMethods.leaveGame(userData)
    io.emit('update-gameObject', gameObject)
  })

  socket.on('message', messageObject => {
    messageMethods.pushUserMessage(messageObject)
    io.emit('update-messages', messages)
  })
});
