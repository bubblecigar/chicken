
const gameObject = {
  players: [],
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