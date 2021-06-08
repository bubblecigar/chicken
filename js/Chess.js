import React from 'react'
import styled from 'styled-components'

const ChessStyle = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
  align-items: center;
  width: ${props => props.size * 30}px;
  height: ${props => props.size * 30}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  position: ${props => props.zIndex ? 'absolute' : 'relative'};
  z-index: ${props => props.zIndex};
`
const Chess = ({ chess, at, zIndex }) => {
  const onDragStart = (e, chess) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ chess, from: at }))
  }
  return (
    <ChessStyle
      color={chess.color}
      size={chess.size}
      zIndex={zIndex}
      draggable
      onDragStart={e => onDragStart(e, chess)}
    />
  )
}

export default Chess