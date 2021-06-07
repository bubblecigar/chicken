import React from 'react'
import { GlobalContext, socket } from './app'

const GamePanel = () => {
  const { gameObject } = React.useContext(GlobalContext)
  const onReset = () => {
    socket.emit('reset-chessboard')
  }
  return gameObject ? (
    <div>
      <div>
        {gameObject.status}
        <button onClick={onReset}>reset</button>
      </div>
      {
        gameObject.players.map(
          player => (
            <div key={player.id}>
              {player.name}
            </div>
          )
        )
      }
    </div>
  ) : null
}

export default GamePanel