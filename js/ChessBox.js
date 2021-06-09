import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from './app'
import Chess from './Chess'

const ChessBoxStyle = styled.div`
  margin: 20px;
  position: relative;
  width: calc(50% - 40px);
  background: white;

  animation-name: ${props => props.inTurn ? 'bordering' : ''};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  @keyframes bordering {
    from {
      transform: translateY(0)
    }
    to {
      transform: translateY(-15px)
    }
  }
`
const ChessGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Chessbox = ({ color }) => {
  const { gameObject } = React.useContext(GlobalContext)
  return gameObject ? (
    <ChessBoxStyle className="nes-container with-title" inTurn={gameObject.status === color}>
      <p className="title">{gameObject[`${color}Player`] ? gameObject[`${color}Player`].userName : '*'}</p>
      <ChessGroup>
        {
          gameObject.chess.filter(c => c.color === color).map(
            (c, i) => <Chess key={i} i={i} chess={c} at={null} />
          )
        }
      </ChessGroup>
    </ChessBoxStyle>
  ) : null
}

export default Chessbox