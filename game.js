const _ = require('lodash')

const gameObject = {
  guests: [],
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
  status: 'waiting' // playing, red-win, blue-win
}

const resetChessboard = () => {
  gameObject.status = 'waiting'
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

const checkWin = () => {
  const toppestBoard = gameObject.chessboard.map(
    row => {
      return row.map(
        col => {
          const toppestChess = col[col.length - 1]
          if (!toppestChess) {
            return null
          } else {
            return toppestChess.color
          }
        }
      )
    }
  )
  const row1 = [toppestBoard[0][0], toppestBoard[0][1], toppestBoard[0][2]]
  const row2 = [toppestBoard[1][0], toppestBoard[1][1], toppestBoard[1][2]]
  const row3 = [toppestBoard[2][0], toppestBoard[2][1], toppestBoard[2][2]]
  const col1 = [toppestBoard[0][0], toppestBoard[1][0], toppestBoard[2][0]]
  const col2 = [toppestBoard[0][1], toppestBoard[1][1], toppestBoard[2][1]]
  const col3 = [toppestBoard[0][2], toppestBoard[1][2], toppestBoard[2][2]]
  const dia1 = [toppestBoard[0][0], toppestBoard[1][1], toppestBoard[2][2]]
  const dia2 = [toppestBoard[0][2], toppestBoard[1][1], toppestBoard[2][0]]
  const possibleLines = [row1, row2, row3, col1, col2, col3, dia1, dia2]

  let winner = null
  for (const line of possibleLines) {
    const colorCounts = _.countBy(line)
    if (colorCounts.red === 3) {
      winner = 'red'
      break
    }
    if (colorCounts.blue === 3) {
      winner = 'blue'
      break
    }
  }
  if (winner) {
    gameObject.status = `${winner}-win`
    return winner
  } else {
    gameObject.status = 'playing'
    return null
  }
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
      checkWin()
    } else { // move from cell to cell
      const chess = gameObject.chessboard[from[0]][from[1]].pop()
      const winner = checkWin()
      console.log('winner:', winner)
      gameObject.chessboard[to[0]][to[1]].push(chess)
      if (winner) {
        // game already end
      } else {
        checkWin()
      }
    }
  }
}

const gameLoop = action => {
  const freezed = gameObject.status === 'red-win' || gameObject.status === 'blue-win'
  if (freezed) {
    return
  }
  moveChess(action)
}

const addPlayer = player => {
  gameObject.players.push(player)
}

const joinGuest = user => {
  gameObject.guests.push(user)
}
const removeGuest = userId => {
  gameObject.guests = gameObject.guests.filter(user => user.id !== userId)
}
const removePlayer = playerId => {
  gameObject.players = gameObject.players.filter(player => player.id !== playerId)
}

module.exports = {
  gameObject,
  methods: {
    addPlayer,
    joinGuest,
    removePlayer,
    resetChessboard,
    gameLoop,
    removeGuest
  }
}