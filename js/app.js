import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import { pushMessage } from './useMessage'
import UserPanel, { getLocalUserData } from './UserPanel'
import ChatBox from './ChatBox'

const socket = io.connect()

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
    <div>
      <UserPanel />
      <ChatBox />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

export { socket }