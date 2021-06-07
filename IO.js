
const mount = io => {
  io.on('connection', function (socket) {
    io.emit('notify', { user: { userName: 'system' }, message: 'Someone enter the room' })

    socket.on('send', message => {
      socket.broadcast.emit('notify', message)
    })

    socket.on('disconnect', function () {
      io.emit('notify', { user: { userName: 'system' }, message: 'Someone leave the room' })
    });
  });
}

module.exports = { mount }