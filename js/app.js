import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import { getLocalUserData } from './UserPanel'
import ChatBox from './ChatBox'
import GamePanel from './GamePanel'
import Chessboard from './Chessboard'
import ChessBox from './ChessBox'
import ExplainDialog from './ExplainDialog'
import Contact from './Contact'

const socket = io.connect({
  auth: {
    ...getLocalUserData()
  }
})

const GlobalContext = React.createContext()

const PlayGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`
const BoxGroup = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 0;
  justify-content: center;
  align-items: center;
`
const Header = styled.h1`
  padding: 20px;
`
const App = () => {
  const [gameObject, setGameObject] = React.useState(null)
  const [messages, setMessages] = React.useState([])

  React.useEffect(
    () => {
      socket.on('update-gameObject', gameObject => {
        setGameObject(gameObject)
      })
      socket.on('update-messages', messages => {
        setMessages(messages)
      })
      return () => socket.disconnect()
    }, []
  )

  return (
    <div style={{ paddingBottom: '200px' }}>
      <GlobalContext.Provider value={{ gameObject, messages }}>
        <Header><a target='_BLANK' href='https://www.youtube.com/watch?v=F8F29jfZBRo'># Gobblet Gobbler</a></Header>
        <GamePanel />
        <PlayGround>
          <Chessboard />
          <ChatBox />
        </PlayGround>
        <PlayGround>
          <ExplainDialog />
        </PlayGround>
        <Contact />
        <BoxGroup>
          <ChessBox color='red' />
          <ChessBox color='blue' />
        </BoxGroup>
      </GlobalContext.Provider>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

export { socket, GlobalContext }