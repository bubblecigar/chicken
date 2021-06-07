import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import UserPanel, { getLocalUserData } from './UserPanel'
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
  console.log('gameObject:', gameObject)
  return (
    <GlobalContext.Provider value={{ gameObject, messages }}>
      <GamePanel />
      <UserPanel />
      <Chessboard />
      <ChessBox />
      <ChatBox />
    </GlobalContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

export { socket, GlobalContext }