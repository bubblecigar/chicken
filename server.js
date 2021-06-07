const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { mount } = require('./IO.js')


app.use('/', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

mount(io)

// setInterval(() => {
//   console.log('io.engine.clientsCount:', io.engine.clientsCount)
// }, (1000));