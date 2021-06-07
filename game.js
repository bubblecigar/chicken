
const gameObject = {
  players: [],
  chessboard: [
    [[], [], []],
    [[], [], []],
    [[], [], []]
  ],
  chess: [
    { color: 'red', size: 1 }, { color: 'red', size: 1 },
    { color: 'red', size: 2 }, { color: 'red', size: 2 },
    { color: 'red', size: 3 }, { color: 'red', size: 3 },
    { color: 'blue', size: 1 }, { color: 'blue', size: 1 },
    { color: 'blue', size: 2 }, { color: 'blue', size: 2 },
    { color: 'blue', size: 3 }, { color: 'blue', size: 3 },
  ],
  status: 'waiting' // playing, end
}

const addPlayer = player => {
  gameObject.players.push(player)
}

const removePlayer = playerId => {
  gameObject.players = gameObject.players.filter(player => player.id !== playerId)
}

module.exports = {
  gameObject,
  methods: {
    addPlayer,
    removePlayer
  }
}