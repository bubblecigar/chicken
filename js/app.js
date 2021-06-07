import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styled from 'styled-components'
import { pushMessage } from './useMessage'
import UserPanel, { getLocalUserData } from './UserPanel'
import ChatBox from './ChatBox'

const socket = io.connect()
socket.on('notify', message => {
  pushMessage(message)
})
socket.on('update-clients', sids => {
  console.log('sids:', sids)
})

const App = () => {
  return (
    <div>
      <UserPanel />
      <ChatBox />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

export { socket }