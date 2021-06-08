import React from 'react'
import styled from 'styled-components'
import { GlobalContext, socket } from './app'
import UserPanel from './UserPanel'

const GamePanelStyle = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  border: 1px solid black;
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
  return gameObject ? (
    <GamePanelStyle>
      <UserPanel />
      <div>
        {gameObject.status}
        <button onClick={onReset}>reset</button>
      </div>
      <div>
        guests:
        {
          gameObject.guests.map(
            user => (
              <div key={user.userId}>
                {user.userName}
              </div>
            )
          )
        }
      </div>
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
    </GamePanelStyle>
  ) : null
}

export default GamePanel