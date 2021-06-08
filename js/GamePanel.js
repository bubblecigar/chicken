import React from 'react'
import styled from 'styled-components'
import { GlobalContext, socket } from './app'
import UserPanel, { getLocalUserData } from './UserPanel'

const Player = ({ player, color, onSubscribe }) => {
  return player ? (
    <button type="button" className={`nes-btn ${(color === "red") ? "is-error" : "is-primary"}`} >
      {player.userName || '?'}
    </button >
  ) : (
      <button type="button" className="nes-btn" onClick={onSubscribe}>empty +</button>
    )
}

const GamePanelStyle = styled.div`
  margin: 20px;
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin: 10px;
  }
`
const GamePanel = () => {
  const { gameObject } = React.useContext(GlobalContext)

  const takeColor = color => () => {
    socket.emit('take-color', color)
  }
  const leaveGame = () => {
    socket.emit('leave-game')
  }
  const onStart = () => {
    socket.emit('start-game')
  }

  const isInGame = () => {
    const user = getLocalUserData()
    if (gameObject) {
      const { redPlayer, bluePlayer } = gameObject
      if (redPlayer && redPlayer.userId === user.userId) {
        return true
      }
      if (bluePlayer && bluePlayer.userId === user.userId) {
        return true
      }
      return false
    }
  }
  const enoughPlayer = () => {
    if (gameObject) {
      const { redPlayer, bluePlayer } = gameObject
      return redPlayer && bluePlayer
    }
  }
  return gameObject ? (
    <GamePanelStyle className="nes-container with-title is-centered">
      <p className="title">game status - {gameObject.status}</p>
      <ButtonGroup>
        <div>
          <Player player={gameObject.redPlayer} color={'red'} onSubscribe={takeColor('red')} />
          <span className="nes-text is-disabled">vs</span>
          <Player player={gameObject.bluePlayer} color={'blue'} onSubscribe={takeColor('blue')} />
        </div>
        <div>
          {
            isInGame() && enoughPlayer() && (gameObject.status === 'blue-win' || gameObject.status === 'red-win')
              ? <button onClick={onStart} type="button" className="nes-btn is-warning">Re</button>
              : null
          }
          {
            isInGame()
              ? <button onClick={leaveGame} type="button" className="nes-btn">leave</button>
              : null
          }
          {
            isInGame() && enoughPlayer() && gameObject.status === 'waiting'
              ? <button onClick={onStart} type="button" className="nes-btn is-success">Start</button>
              : null
          }
          {
            !isInGame() && !enoughPlayer() && <UserPanel />
          }
        </div>
      </ButtonGroup>
    </GamePanelStyle>
  ) : null
}

export default GamePanel