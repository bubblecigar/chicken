import React from 'react'
import styled from 'styled-components'
import { GlobalContext, socket } from './app'

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
  return gameObject ? (
    <GamePanelStyle>
      <div>
        {gameObject.status}
        <button onClick={onReset}>reset</button>
      </div>
      <div>
        guests:
        {
          gameObject.guests.map(
            user => (
              <div key={user.id}>
                {user.name}
              </div>
            )
          )
        }
      </div>
      <div>
        players:
        <button>sit red</button>
        <button>sit blue</button>
      </div>
    </GamePanelStyle>
  ) : null
}

export default GamePanel