import React from 'react'
import styled from 'styled-components'

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
const Chess = ({ chess, at }) => {
  const onDragStart = (e, chess) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ chess, from: at }))
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

export default Chess