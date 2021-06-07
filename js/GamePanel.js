import React from 'react'
import { GlobalContext } from './app'

const GamePanel = () => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <div>
      <div>
        {gameObject.status}
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