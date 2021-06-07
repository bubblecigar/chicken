import React from 'react'
import styled from 'styled-components'
import { socket, GlobalContext } from './app'
import { Chess } from './ChessBox'

const ChessboardStyle = styled.div`
  display: inline-grid;
  background-color: black;
  grid-template-rows: repeat(3, 200px);
  grid-template-columns: repeat(3, 200px);
  grid-gap: 1px;
  border: 1px solid black;
  margin: 20px;
`
const CellStyle = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
`
const Chessboard = () => {
  const { gameObject } = React.useContext(GlobalContext)

  const onDrop = (e, [i, j]) => {
    const json = e.dataTransfer.getData('application/json')
    const object = JSON.parse(json)
    const action = {
      chess: object,
      from: null,
      to: [i, j]
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
                            <Chess key={k} chess={c} />
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