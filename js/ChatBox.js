import React from 'react'
import styled from 'styled-components'
import { getLocalUserData } from './UserPanel'
import { socket, GlobalContext } from './app'

const ChatInputStyle = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  padding: 10px;
  align-items: center;
  width: 100%;
  input {
    margin-right: 15px;
  }
`
const ChatInput = () => {
  const [message, setMessage] = React.useState('')
  const onSend = () => {
    const messageObject = { message, user: getLocalUserData() }
    socket.emit('message', messageObject)
    setMessage('')
  }
  const onKeyDown = e => {
    if (e.keyCode === 13 && (message !== '')) {
      onSend()
      setMessage('')
    }
  }
  return (
    <ChatInputStyle className="nes-field">
      <input type="text" className="nes-input" placeholder="type some messages..." value={message}
        onKeyDown={onKeyDown}
        onChange={e => setMessage(e.target.value)} />
      <button type="button" disabled={!message} className={`nes-btn ${message === '' ? 'is-disabled' : 'is-success'}`} onClick={onSend}>send</button>
    </ChatInputStyle >
  )
}

const ChatRecordStyle = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 75px);
`
const MessageRowStyle = styled.div`
  padding: 5px 10px;
`
const ChatRecord = () => {
  const { messages } = React.useContext(GlobalContext)
  const ref = React.useRef()
  React.useEffect(
    () => {
      if (ref.current) {
        ref.current.scrollTo(0, ref.current.scrollHeight)
      }
    }, [messages]
  )
  return (
    <ChatRecordStyle className='nes-container is-dark' ref={ref}>
      {
        messages.map(
          (message, i) => {
            switch (message.type) {
              case 'user-message': {
                return (
                  <MessageRowStyle key={i}>{message.user.userName} : {message.message}</MessageRowStyle>
                )
              }
              case 'system-message': {
                return (
                  <MessageRowStyle key={i}>system : {message.message}</MessageRowStyle>
                )
              }
            }
          }
        )
      }
    </ChatRecordStyle>
  )
}


const ChatBoxStyle = styled.div`
  border: 4px solid black;
  height: 405px;
  flex-grow: 1;
  position: relative;
  dispplay: flex;
  flex-flow: column;

`
const ChatBox = () => {
  return (
    <ChatBoxStyle>
      <ChatRecord />
      <ChatInput />
    </ChatBoxStyle>
  )
}

export default ChatBox