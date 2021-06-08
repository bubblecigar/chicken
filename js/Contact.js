import React from 'react'
import styled from 'styled-components'

const ContactStyle = styled.div`
  margin-top: 300px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`
const Links = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  > a {
    margin: 20px;
  }
`
const Contact = ({ }) => {

  return (
    <ContactStyle>
      <Links>
        <a target="_BLANK" href="https://github.com/bubblecigar/chicken">
          <i className="nes-icon github is-medium"></i>
        </a>
        <a target="_BLANK" href="mailto:bubblecigar@gmail.com">
          <i className="nes-icon gmail is-medium"></i>
        </a>
        <a target="_BLANK" href="https://www.instagram.com/bubblecigar/">
          <i className="nes-icon instagram is-medium"></i>
        </a>
        <a target="_BLANK" href="https://www.facebook.com/roy.wang.773">
          <i className="nes-icon facebook is-medium"></i>
        </a>
      </Links>
      <div>
        @bubblecigar
      </div>
    </ContactStyle>
  )
}

export default Contact