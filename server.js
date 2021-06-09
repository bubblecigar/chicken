const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { messages, methods: messageMethods } = require('./message.js')
const gameObject = require('./gameObject.js')
const getMethods = require('./gameMethods.js')
const gameMethods = getMethods(gameObject)

app.use('/', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

io.on('connection', async function (socket) {
  let userData = socket.handshake.auth

  socket.on('update-user-data', _userData => {
    userData = _userData
    gameMethods.updateUserData(userData)
    io.emit('update-gameObject', gameObject)
  })

  gameMethods.joinGuest(userData)
  messageMethods.pushSystemMessage(`${userData.userName} enter the room`)
  io.emit('update-gameObject', gameObject)
  io.emit('update-messages', messages)

  socket.on('disconnect', async function () {
    gameMethods.removeGuest(userData.userId)
    gameMethods.leaveGame(userData)
    messageMethods.pushSystemMessage(`${userData.userName} leave the room`)
    io.emit('update-gameObject', gameObject)
    io.emit('update-messages', messages)
  });

  socket.on('move-chess', action => {
    gameMethods.gameLoop(action, userData)
    io.emit('update-gameObject', gameObject)
    io.emit('update-messages', messages)
  })

  socket.on('reset-chessboard', action => {
    gameMethods.resetChessboard()
    io.emit('update-gameObject', gameObject)
  })

  socket.on('take-color', color => {
    gameMethods.takeColor(userData, color)
    io.emit('update-gameObject', gameObject)
  })
  socket.on('player-ready', async () => {
    gameMethods.togglePlayerReady(userData)
    const cb = s => {
      if (s <= 0) {
        messageMethods.pushGameMessage(`Generate random color to start the game...`)
      } else {
        messageMethods.pushGameMessage(`Game will be start in ${s} seconds!`)
      }
      io.emit('update-messages', messages)
      io.emit('update-gameObject', gameObject)
    }
    await gameMethods.startGame(cb)
    io.emit('update-messages', messages)
    io.emit('update-gameObject', gameObject)
  })
  socket.on('leave-game', () => {
    gameMethods.leaveGame(userData)
    io.emit('update-messages', messages)
    io.emit('update-gameObject', gameObject)
  })

  socket.on('message', messageObject => {
    messageMethods.pushUserMessage(messageObject)
    socket.broadcast.emit('update-messages', messages)
  })
});

const getIO = () => io
module.exports = {
  getIO
}