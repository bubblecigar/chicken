
const mount = io => {

  const getAllSockets = async () => {
    const sockets = await io.fetchSockets();
    return sockets.map(s => s.id)
  }

  io.on('connection', async function (socket) {
    io.emit('notify', { user: { userName: 'system' }, message: 'Someone enter the room' })
    io.emit('update-clients', await getAllSockets())

    socket.on('send', message => {
      socket.broadcast.emit('notify', message)
    })

    socket.on('disconnect', async function () {
      io.emit('notify', { user: { userName: 'system' }, message: 'Someone leave the room' })
      io.emit('update-clients', await getAllSockets())
    });
  });
}

module.exports = { mount }