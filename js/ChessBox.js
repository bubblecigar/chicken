import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from './app'
import Chess from './Chess'

const ChessBoxStyle = styled.div`
  margin: 20px;
  width: calc(50% - 40px);
`
const ChessGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Chessbox = ({ color }) => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <ChessBoxStyle className="nes-container with-title">
      <p className="title">{color}</p>
      <ChessGroup>
        {
          gameObject.chess.filter(c => c.color === color).map(
            (c, i) =>
              <Chess key={i} chess={c} at={null} />
          )
        }
      </ChessGroup>
    </ChessBoxStyle>
  ) : null
}

export default Chessbox