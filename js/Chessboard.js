import React from 'react'
import styled from 'styled-components'
import { socket, GlobalContext } from './app'
import Chess from './Chess'
import grassWithHole from '../assets/grassWithHole.png'
import grassWithFlower from '../assets/grassWithFlower.png'
import { getLocalUserData } from './UserPanel'
import getMethods from '../gameMethods.js'
import _ from 'lodash'
const ChessboardSize = 130

const ChessboardStyle = styled.div`
  display: inline-grid;
  background-color: black;
  grid-template-rows: repeat(3, ${ChessboardSize}px);
  grid-template-columns: repeat(3, ${ChessboardSize}px);
  grid-gap: 4px;
  border: 4px solid black;
  margin-right: 20px;
`
const CellStyle = styled.div`
  display: flex;
  background-image: url(${props => props.hint ? grassWithHole : grassWithFlower});
  background-size: ${ChessboardSize}px;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Chessboard = () => {
  const { gameObject, setGameObject } = React.useContext(GlobalContext)

  const onDrop = (e, to) => {
    const json = e.dataTransfer.getData('application/json')
    const { chess, from } = JSON.parse(json)
    const action = {
      chess,
      from,
      to
    }
    if (from && (from[0] === to[0] && from[1] === to[1])) {
      return // in the same cell
    }
    socket.emit('move-chess', action)
    const gameMethods = getMethods(gameObject)
    gameMethods.gameLoop(action, getLocalUserData())
    setGameObject(_.cloneDeep(gameObject))
  }

  const [dragHint, setDragHint] = React.useState([null, null])

  return gameObject ? (
    <ChessboardStyle>
      {
        gameObject.chessboard.map(
          (row, i) =>
            <React.Fragment key={i}>
              {
                row.map(
                  (col, j) => (
                    <CellStyle
                      index={i + j}
                      key={j}
                      hint={dragHint[0] === i && dragHint[1] === j}
                      onDragEnter={e => setDragHint([i, j])}
                      onMouseOver={e => setDragHint([i, j])}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => onDrop(e, [i, j])}
                    >
                      {
                        col.map(
                          (c, k) => (
                            <Chess key={k} chess={c} at={[i, j]} zIndex={k + 1} />
                          )
                        )
                      }
                    </CellStyle>
                  )
                )
              }
            </React.Fragment>
        )
      }
    </ChessboardStyle>
  ) : null
}

export default Chessboard