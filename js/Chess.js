import React from 'react'
import styled from 'styled-components'

const IconStyle = styled.i`
  position: absolute;
  z-index: ${props => props.zIndex};
  left: ${props => `${props.x}%`};

  margin: 10px;
  transform: scale(${props => props.size / 3});
`
const Chess = ({ chess, at, zIndex }) => {
  const [x, setX] = React.useState(10 + 70 * Math.random())
  const onDragStart = (e, chess) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ chess, from: at }))
  }
  return (
    <IconStyle
      className={'nes-pointer' + ' ' + (chess.color === 'red' ? 'nes-charmander' : 'nes-squirtle')}
      zIndex={zIndex}
      x={at ? 0 : x}
      size={chess.size}
      draggable
      onDragStart={e => onDragStart(e, chess)}
    />
  )
}

export default Chess