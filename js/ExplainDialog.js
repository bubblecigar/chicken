import React from 'react'
import styled from 'styled-components'
const Dialog = styled.dialog`
  p {
    font-size: larger;
  }

  li {
    margin-bottom: 10px;
  }
`
const ExplainDialog = ({ }) => {
  const onOpen = () => {
    document.getElementById('dialog-default').showModal()
  }
  return (
    <section>
      <button type="button" className="nes-btn is-error" onClick={onOpen}>
        How to play?
      </button>
      <Dialog className="nes-dialog" id="dialog-default">
        <form method="dialog">
          <p className="title"><span className="nes-text is-primary">#</span> Gobblet Gobbler</p>
          <ul>
            <li>Choose <span className="nes-text is-error">Red</span> or <span className="nes-text is-primary">Blue</span></li>
            <li>At your turn, drag a monster (of your color) onto the chessboard, or move one of which to its neighbor</li>
            <li>Bigger monster can cover a smaller one</li>
            <li>When three monsters of the same color are in a row, the player of the color win</li>
          </ul>
          <div style={{ textAlign: 'right' }}>
            <button className="nes-btn is-success">OK</button>
          </div>
        </form>
      </Dialog>
    </section>
  )
}

export default ExplainDialog