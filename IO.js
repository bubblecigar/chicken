
const mount = io => {
  io.on('connection', function (socket) {
    socket.on('send', message => {
      io.emit('notify', message)
    })

    socket.on('disconnect', function () {
    });
  });
}

module.exports = { mount }