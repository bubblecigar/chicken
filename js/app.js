import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import { useMessage, pushMessage } from './useMessage'
import styled from 'styled-components'
import UserPanel, { getLocalUserData } from './UserPanel'

const socket = io.connect()
socket.on('notify', message => {
  pushMessage(message)
})

const ChatInputStyle = styled.div`
  padding: 10px;
`
const ChatInput = () => {
  const [message, setMessage] = React.useState('')
  const onSend = () => socket.emit('send', { user: getLocalUserData(), message })
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSend()
      setMessage('')
    }
  }
  return (
    <ChatInputStyle>
      <input value={message} onKeyDown={onKeyDown} onChange={e => setMessage(e.target.value)} />
      <button onClick={onSend}>send</button>
    </ChatInputStyle>
  )
}

const ChatRecordStyle = styled.div`
`
const MessageRowStyle = styled.div`
  padding: 5px 10px;
`
const ChatRecord = () => {
  const messages = useMessage()

  return (
    <ChatRecordStyle>
      {
        messages.map(
          (message, i) => (
            <MessageRowStyle key={i}>{message.user.userName} : {message.message}</MessageRowStyle>
          )
        )
      }
    </ChatRecordStyle>
  )
}


const ChatBoxStyle = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  border: 1px solid black;
`
const ChatBox = () => {
  return (
    <ChatBoxStyle>
      <ChatRecord />
      <ChatInput />
    </ChatBoxStyle>
  )
}

const App = () => {
  return (
    <div>
      <UserPanel />
      <ChatBox />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

