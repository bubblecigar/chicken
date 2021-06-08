import React from 'react'
import styled from 'styled-components'

const IconStyle = styled.i`
  position: absolute;
  z-index: ${props => props.zIndex};
  margin: 10px;
  transform: scale(${props => props.size / 3});
`
const Chess = ({ chess, at, zIndex, i }) => {
  const onDragStart = (e, chess) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ chess, from: at }))
  }
  return (
    <IconStyle
      className={'nes-pointer' + ' ' + (chess.color === 'red' ? 'nes-charmander' : 'nes-squirtle')}
      zIndex={zIndex}
      style={{
        left: `${at ? '0' : 15 * i}%`,
        bottom: '-14px',
        transformOrigin: `${at ? 'center' : 'bottom'}`
      }}
      size={chess.size}
      draggable
      onDragStart={e => onDragStart(e, chess)}
    />
  )
}

export default Chess