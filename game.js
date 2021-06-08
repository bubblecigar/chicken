const _ = require('lodash')

const gameObject = {
  guests: [],
  redPlayer: null,
  bluePlayer: null,
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
  status: 'waiting' // red, blue, red-win, blue-win
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

const startGame = () => {
  const playerEnough = gameObject.redPlayer && gameObject.bluePlayer
  if (playerEnough) {
    resetChessboard()
    gameObject.status = 'red'
  } else {

  }
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
    return winner
  } else {
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
const checkChessAuth = (action, user) => {
  const { color } = action.chess
  const namespace = `${color}Player`
  const player = gameObject[namespace]
  if (!player) {
    return false
  }
  return player.userId === user.userId
}
const moveChess = (action, user) => {
  const { chess, from, to } = action
  const isYourChess = checkChessAuth(action, user)
  const isYourTurn = chess.color === gameObject.status
  const isNeighbor = checkNeighbor(from, to)
  const isBigger = checkSize(chess, to)

  if (isYourChess && isYourTurn && isNeighbor && isBigger) {
    if (!from) { // move from chessBox to target
      const index = gameObject.chess.findIndex(c => c.color === chess.color && c.size === chess.size)
      gameObject.chess.splice(index, 1)
      gameObject.chessboard[to[0]][to[1]].push(chess)
      const winner = checkWin()
      if (winner) {
        gameObject.status = `${winner}-win`
        return
      }
    } else { // move from cell to cell
      const chess = gameObject.chessboard[from[0]][from[1]].pop()
      const winner = checkWin()
      gameObject.chessboard[to[0]][to[1]].push(chess)
      if (winner) {
        gameObject.status = `${winner}-win`
        return
      } else {
        const winner = checkWin()
        if (winner) {
          gameObject.status = `${winner}-win`
          return
        }
      }
    }
    // no winner, flip turn
    gameObject.status = chess.color === 'red' ? 'blue' : 'red'
  }
}

const gameLoop = (action, user) => {
  const freezed = gameObject.status === 'red-win' || gameObject.status === 'blue-win'
  if (freezed) {
    return
  }
  moveChess(action, user)
}


const joinGuest = user => {
  gameObject.guests.push(user)
}
const removeGuest = userId => {
  gameObject.guests = gameObject.guests.filter(user => user.userId !== userId)
}

const leaveGame = user => {
  const { redPlayer, bluePlayer } = gameObject
  if (redPlayer && (redPlayer.userId === user.userId)) {
    gameObject.redPlayer = null
  }
  if (bluePlayer && (bluePlayer.userId === user.userId)) {
    gameObject.bluePlayer = null
  }
}
const takeColor = (user, color) => {
  const namespace = `${color}Player`
  leaveGame(user)
  if (gameObject[namespace]) {
    // this place has already been token by other
    return false
  } else {
    gameObject[namespace] = user
  }
}

module.exports = {
  gameObject,
  methods: {
    joinGuest,
    removeGuest,
    takeColor,
    leaveGame,
    startGame,
    resetChessboard,
    gameLoop
  }
}