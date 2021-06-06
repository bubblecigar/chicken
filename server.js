var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081, function () {
    console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {
    console.log('io on connection')
    socket.on('send', message => {
        io.emit('notify', message)
    })
    // socket.on('newplayer', function () {
    //     socket.player = {
    //         id: server.lastPlayderID++,
    //         x: randomInt(100, 400),
    //         y: randomInt(100, 400)
    //     };
    //     socket.emit('allplayers', getAllPlayers());
    //     socket.broadcast.emit('newplayer', socket.player);

    //     socket.on('click', function (data) {
    //         console.log('click to ' + data.x + ', ' + data.y);
    //         socket.player.x = data.x;
    //         socket.player.y = data.y;
    //         io.emit('move', socket.player);
    //     });

    socket.on('disconnect', function () {
        console.log('disconnect')
        // io.emit('remove', socket.player.id);
    });
    // });

    socket.on('test', function (a, b, c) {
        console.log('test received', a, b, c);
    });
});

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    });
    return players;
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
