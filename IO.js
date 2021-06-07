
const mount = io => {
  io.on('connection', function (socket) {
    io.emit('notify', { user: { userName: 'system' }, message: 'new user' })

    socket.on('send', message => {
      socket.broadcast.emit('notify', message)
    })

    socket.on('disconnect', function () {
    });
  });
}

module.exports = { mount }