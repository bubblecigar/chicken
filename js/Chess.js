import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from './app'

const IconStyle = styled.i`
  position: absolute;
  z-index: ${props => props.zIndex};
  margin: 10px;
  transform: scale(${props => props.size / 3});
`
const Chess = ({ chess, at, zIndex, i }) => {
  const { gameObject } = React.useContext(GlobalContext)
  const onDragStart = (e, chess) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ chess, from: at }))
  }
  const isWinColor = (gameObject.status === 'red-win' && chess.color === 'red') || (gameObject.status === 'blue-win' && chess.color === 'blue')
  const isLoseColor = (gameObject.status === 'red-win' && chess.color === 'blue') || (gameObject.status === 'blue-win' && chess.color === 'red')
  const chessClass = chess.color === 'red' ? 'nes-charmander' : 'nes-squirtle'

  return (
    <IconStyle
      className={'nes-pointer' + ' ' + chessClass}
      zIndex={zIndex}
      style={{
        opacity: `${isLoseColor ? '0.4' : '1'}`,
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