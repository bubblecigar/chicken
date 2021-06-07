import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from './app'

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
  return gameObject ? (
    <ChessboardStyle>
      {
        gameObject.chessboard.map(
          (row, i) =>
            <React.Fragment key={i}>
              {
                row.map(
                  (col, j) => (
                    <CellStyle key={j}>
                      {
                        `(${i},${j})`
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