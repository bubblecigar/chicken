import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from './app'
import Chess from './Chess'

const ChessBoxStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const Chessbox = ({ color }) => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <ChessBoxStyle>
      {
        gameObject.chess.filter(c => c.color === color).map(
          (c, i) =>
            <Chess key={i} chess={c} at={null} />
        )
      }
    </ChessBoxStyle>
  ) : null
}

export default Chessbox