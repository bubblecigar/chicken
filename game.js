
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

const resetChessboard = () => {
  gameObject.chess = [
    { color: 'red', size: 1 }, { color: 'red', size: 1 },
    { color: 'red', size: 2 }, { color: 'red', size: 2 },
    { color: 'red', size: 3 }, { color: 'red', size: 3 },
    { color: 'blue', size: 1 }, { color: 'blue', size: 1 },
    { color: 'blue', size: 2 }, { color: 'blue', size: 2 },
    { color: 'blue', size: 3 }, { color: 'blue', size: 3 },
  ]
  gameObject.chessboard = [
    [[], [], []],
    [[], [], []],
    [[], [], []]
  ]
}

const checkNeighbor = (from, to) => {
  if (!from) { // its from chessBox
    return true
  }
  if (Math.abs((from[0] + from[1]) - (to[0] + to[1])) === 1) {
    return true
  }
  return false
}
const checkSize = (chess, to) => {
  const targetCell = gameObject.chessboard[to[0]][to[1]]
  const targetChess = targetCell[targetCell.length - 1]
  if (!targetChess) {
    return true // empty cell
  }
  return chess.size > targetChess.size
}

const moveChess = action => {
  const { chess, from, to } = action
  // check if moving to its neighbor
  const isNeighbor = checkNeighbor(from, to)
  const isBigger = checkSize(chess, to)

  // action is valid, perform
  if (isNeighbor && isBigger) {
    if (!from) { // move from chessBox to target
      const index = gameObject.chess.findIndex(c => c.color === chess.color && c.size === chess.size)
      gameObject.chess.splice(index, 1)
      gameObject.chessboard[to[0]][to[1]].push(chess)
    } else { // move from cell to cell
      const chess = gameObject.chessboard[from[0]][from[1]].pop()
      gameObject.chessboard[to[0]][to[1]].push(chess)
    }
  }
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
    removePlayer,
    moveChess,
    resetChessboard
  }
}