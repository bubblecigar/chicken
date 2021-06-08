import React from 'react'
import styled from 'styled-components'
import { socket, GlobalContext } from './app'
import Chess from './Chess'

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
  background-color: white;
  justify-content: center;
  align-items: center;
`
const Chessboard = () => {
  const { gameObject } = React.useContext(GlobalContext)

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
  }

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
                      key={j}
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