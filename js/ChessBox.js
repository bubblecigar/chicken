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
const Chessbox = ({ color }) => {
  const { gameObject } = React.useContext(GlobalContext)
  const onDragStart = (e, c) => {
    e.dataTransfer.setData("application/json", JSON.stringify(c))
  }
  return gameObject ? (
    <ChessBoxStyle>
      {
        gameObject.chess.filter(c => c.color === color).map(
          (c, i) =>
            <ChessStyle
              key={i} color={color} size={c.size * 50}
              draggable
              onDragStart={e => onDragStart(e, c)}
            />
        )
      }
    </ChessBoxStyle>
  ) : null
}

export default Chessbox