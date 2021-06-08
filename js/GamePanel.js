import React from 'react'
import styled from 'styled-components'
import { GlobalContext, socket } from './app'
import UserPanel from './UserPanel'

const Player = ({ player, color, onSubscribe }) => {
  return player ? (
    <button type="button" className={`nes-btn ${(color === "red") ? "is-error" : "is-primary"}`} >
      {player.userName}
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
  const onReset = () => {
    socket.emit('reset-chessboard')
  }
  const takeColor = color => () => {
    socket.emit('take-color', color)
  }
  const leaveGame = () => {
    socket.emit('leave-game')
  }
  const onStart = () => {
    socket.emit('start-game')
  }
  return gameObject ? (
    <GamePanelStyle className="nes-container with-title">
      <p className="title">Chicken Chess</p>
      <ButtonGroup>
        <div>
          <Player player={gameObject.redPlayer} color={'red'} onSubscribe={takeColor('red')} />
          <span class="nes-text is-disabled">vs</span>
          <Player player={gameObject.bluePlayer} color={'blue'} onSubscribe={takeColor('blue')} />
        </div>
        <div>
          <button onClick={leaveGame} type="button" className="nes-btn">leave</button>
          <button onClick={onStart} type="button" className="nes-btn is-warning">Start</button>
          <button onClick={onReset} type="button" className="nes-btn is-error">Reset</button>
        </div>
      </ButtonGroup>
    </GamePanelStyle>
  ) : null
}

export default GamePanel