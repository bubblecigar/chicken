import React from 'react'
import { GlobalContext } from './app'

const Chessboard = () => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <div>
      {
        gameObject.chessboard.map(
          (row, i) =>
            <div key={i}>
              {
                row.map(
                  (col, j) => (
                    <span key={j}>
                      {
                        `(${i},${j})`
                      }
                    </span>
                  )
                )
              }
            </div>
        )
      }
    </div>
  ) : null
}

export default Chessboard