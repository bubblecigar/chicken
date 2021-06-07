import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import { pushMessage } from './useMessage'
import UserPanel, { getLocalUserData } from './UserPanel'
import ChatBox from './ChatBox'
import GamePanel from './GamePanel'

const socket = io.connect()

const GlobalContext = React.createContext()

const App = () => {
  const [gameObject, setGameObject] = React.useState(null)
  const [messages, setMessages] = React.useState([])

  React.useEffect(
    () => {
      socket.on('update-gameObject', gameObject => {
        setGameObject(gameObject)
      })
      return () => socket.disconnect()
    }, []
  )
  console.log('gameObject:', gameObject)
  return (
    <GlobalContext.Provider value={{ gameObject, messages }}>
      <GamePanel />
      <UserPanel />
      <ChatBox />
    </GlobalContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

export { socket, GlobalContext }