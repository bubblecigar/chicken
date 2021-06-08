import React from 'react'
import styled from 'styled-components'

const TechStyle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  max-width: 70%;
  margin: auto;

  > div:first-child {
    margin-bottom: 15px;
  }
`
const Links = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > a {
    margin: 15px 30px;
  }
`
const Tech = ({ }) => {

  return (
    <TechStyle>
      <div>
        built-by
      </div>
      <Links>
        <a target="_BLANK" href="https://reactjs.org/">
          #react
        </a>
        <a target="_BLANK" href="https://styled-components.com/">
          #styled-components
        </a>
        <a target="_BLANK" href="https://nostalgic-css.github.io/NES.css/">
          #NES.css
        </a>
      </Links>
      <Links>
        <a target="_BLANK" href="https://expressjs.com/">
          #express
        </a>
        <a target="_BLANK" href="https://socket.io/">
          #socket.io
        </a>
        <a target="_BLANK" href="https://dashboard.heroku.com/">
          #heroku
        </a>
      </Links>
      <Links>
        <a target="_BLANK" href="https://parceljs.org/">
          #parcel
        </a>
        <a target="_BLANK" href="https://lodash.com/">
          #lodash
        </a>
      </Links>
    </TechStyle>
  )
}

export default Tech