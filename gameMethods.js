const _ = require('lodash')
const { methods: messageMethods } = require('./message.js')

const getMethods = gameObject => {

  const changeGameStatus = status => {
    gameObject.status = status
    switch (status) {
      case 'red-win': {
        messageMethods.pushGameMessage(`Red player win the game!`)
        break
      }
      case 'blue-win': {
        messageMethods.pushGameMessage(`Blue player win the game!`)
        break
      }
      case 'waiting': {
        messageMethods.pushGameMessage(`Wait players to be ready...`)
        break
      }
      case 'countDown': {
        // server.js handle this part
        break
      }
      case 'red': {
        messageMethods.pushGameMessage(`Red player's turn`)
        break
      }
      case 'blue': {
        messageMethods.pushGameMessage(`Blue player's turn`)
        break
      }
      default: {
        console.log('unhandle status: ', status)
      }
    }
  }

  const updateUserData = userData => {
    if (gameObject.redPlayer) {
      if (gameObject.redPlayer.userId === userData.userId) {
        gameObject.redPlayer = userData
      }
    }
    if (gameObject.bluePlayer) {
      if (gameObject.bluePlayer.userId === userData.userId) {
        gameObject.bluePlayer = userData
      }
    }
    gameObject.guests = gameObject.guests.map(
      g => g.userId === userData.userId ? userData : g
    )
  }

  const resetChessboard = () => {
    changeGameStatus('waiting')
    gameObject.redPlayerReady = false
    gameObject.bluePlayerReady = false
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

  const togglePlayerReady = user => {
    if (gameObject.redPlayer) {
      if (gameObject.redPlayer.userId === user.userId) {
        gameObject.redPlayerReady = !gameObject.redPlayerReady
      }
    }
    if (gameObject.bluePlayer) {
      if (gameObject.bluePlayer.userId === user.userId) {
        gameObject.bluePlayerReady = !gameObject.bluePlayerReady
      }
    }
  }
  const countDown = async (remainSeconds, exitTest, callback) => {
    return new Promise((resolve, reject) => {
      if (exitTest()) {
        return resolve(false)
      }
      if (remainSeconds < 0) return resolve(true)
      callback(remainSeconds)
      setTimeout(
        () => resolve(countDown(remainSeconds - 1, exitTest, callback))
        , 1000
      )
    })
  }
  const startGame = async (cb) => {
    const playerEnough = gameObject.redPlayer && gameObject.bluePlayer
    if (playerEnough) {
      if (gameObject.redPlayerReady && gameObject.bluePlayerReady) {
        changeGameStatus('countDown')
        const countDownSeconds = 3
        const exitTest = () => gameObject.status !== 'countDown'
        const finishCountDown = await countDown(countDownSeconds, exitTest, cb)
        if (finishCountDown) {
          resetChessboard()
          changeGameStatus(generateRandomColor())
          console.log('gameObject.status:', gameObject.status)
        }
      }
    }
  }
  const generateRandomColor = () => {
    const number = Math.random()
    return number >= 0.5 ? 'red' : 'blue'
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
    return winner
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
          changeGameStatus(`${winner}-win`)
          return
        }
      } else { // move from cell to cell
        const chess = gameObject.chessboard[from[0]][from[1]].pop()
        const winner = checkWin()
        gameObject.chessboard[to[0]][to[1]].push(chess)
        if (winner) {
          changeGameStatus(`${winner}-win`)
          return
        } else {
          const winner = checkWin()
          if (winner) {
            changeGameStatus(`${winner}-win`)
            return
          }
        }
      }
      // no winner, flip turn
      changeGameStatus(chess.color === 'red' ? 'blue' : 'red')
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
      gameObject.redPlayerReady = false
      changeGameStatus('waiting')
    }
    if (bluePlayer && (bluePlayer.userId === user.userId)) {
      gameObject.bluePlayer = null
      gameObject.bluePlayerReady = false
      changeGameStatus('waiting')
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

  return {
    updateUserData,
    joinGuest,
    removeGuest,
    takeColor,
    leaveGame,
    startGame,
    togglePlayerReady,
    resetChessboard,
    gameLoop
  }
}

module.exports = getMethods