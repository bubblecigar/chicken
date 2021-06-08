import React from 'react'
import styled from 'styled-components'
import { GlobalContext, socket } from './app'
import UserPanel from './UserPanel'

const GamePanelStyle = styled.div`
  margin: 20px;

  > div {
    padding: 5px;
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
      <div>
        players:
          {
          gameObject.redPlayer
            ? <span>{gameObject.redPlayer.userName}</span>
            : <button onClick={takeColor('red')}>sit red</button>
        }
        {
          gameObject.bluePlayer ? <span>{gameObject.bluePlayer.userName}</span> : <button onClick={takeColor('blue')}>sit blue</button>
        }
        <button onClick={leaveGame}>leave</button>
      </div>
      <button onClick={onStart} type="button" className="nes-btn is-warning">Start</button>
      <button onClick={onReset} type="button" className="nes-btn is-error">Reset</button>
    </GamePanelStyle>
  ) : null
}

export default GamePanel