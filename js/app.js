import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import { getLocalUserData } from './UserPanel'
import ChatBox from './ChatBox'
import GamePanel from './GamePanel'
import Chessboard from './Chessboard'
import ChessBox from './ChessBox'

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
  display: flex;
  justify-content: center;
  align-items: center;
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
    <GlobalContext.Provider value={{ gameObject, messages }}>
      <GamePanel />
      <PlayGround>
        <Chessboard />
        <ChatBox />
      </PlayGround>
      <BoxGroup>
        <ChessBox color='red' />
        <ChessBox color='blue' />
      </BoxGroup>
    </GlobalContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

export { socket, GlobalContext }