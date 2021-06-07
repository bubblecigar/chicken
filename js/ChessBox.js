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
  width: ${props => props.size * 50}px;
  height: ${props => props.size * 50}px;
  border-radius: 50%;
  background-color: ${props => props.color}
`
const Chess = ({ chess }) => {
  const onDragStart = (e, c) => {
    e.dataTransfer.setData("application/json", JSON.stringify(c))
  }
  return (
    <ChessStyle
      color={chess.color}
      size={chess.size}
      draggable
      onDragStart={e => onDragStart(e, chess)}
    />
  )
}
const Chessbox = ({ color }) => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <ChessBoxStyle>
      {
        gameObject.chess.filter(c => c.color === color).map(
          (c, i) =>
            <Chess key={i} chess={c} />
        )
      }
    </ChessBoxStyle>
  ) : null
}

export default Chessbox
export { Chess }