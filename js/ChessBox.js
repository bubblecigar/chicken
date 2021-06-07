import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from './app'

const ChessBoxStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const ChessStyle = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color}
`
const Chessbox = () => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <ChessBoxStyle>
      {
        gameObject.chess.map(
          (c, i) =>
            <ChessStyle key={i} color={c.color} size={c.size * 50} />
        )
      }
    </ChessBoxStyle>
  ) : null
}

export default Chessbox