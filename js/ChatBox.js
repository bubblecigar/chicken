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
const SystemMessageStyle = styled.span`
  padding: 10px;
  text-align: center;
  display: block;
  color: #e59400;
`
const GameMessageStyle = styled.span`
  padding: 10px;
  text-align: center;
  display: block;
  color: black;
  margin: 30px -20px;
  animation-name: coloring;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;

  @keyframes coloring {
    from {color: red;}
    to {color: blue;}
  }
`
const P = styled.p`
  color: black;
  line-break: anywhere;
`
const Name = styled.span`
  position: absolute;
  left: -33px;
  bottom: -50px;
  color: #d3d3d3;
`
const MessageRow = ({ message }) => {
  switch (message.type) {
    case 'user-message': {
      const isMyMessage = message.user.userId === getLocalUserData().userId
      return (
        <section
          className={`message is-dark ${isMyMessage ? 'right' : 'left'}`}
          style={{
            textAlign: isMyMessage ? 'right' : 'left'
          }}
        >
          <div className={`nes-balloon from-${isMyMessage ? 'right' : 'left'}`} >
            {isMyMessage ? null : <Name>{message.user.userName}</Name>}
            <P>{message.message}</P>
          </div>
        </section >
      )
    }
    case 'system-message': {
      return (
        <SystemMessageStyle className="nes-text is-warning">{message.message}</SystemMessageStyle>
      )
    }
    case 'game-message': {
      return (
        <GameMessageStyle>{message.message}</GameMessageStyle>
      )
    }
    default: {
      return null // unhandled message type
    }
  }
}
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
          (message, i) => <MessageRow key={i} message={message} />
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