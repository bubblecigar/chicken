import React from 'react'

const GamePanel = ({ gameObject }) => {
  return gameObject ? (
    <div>
      <div>
        {gameObject.status}
      </div>
      {
        gameObject.players.map(
          player => (
            <div key={player.id}>
              {player.id}
            </div>
          )
        )
      }
    </div>
  ) : null
}

export default GamePanel