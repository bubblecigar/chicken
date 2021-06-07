import React from 'react'
import styled from 'styled-components'
import { useMessage, createMessage, pushMessage } from './useMessage'
import { getLocalUserData } from './UserPanel'
import { socket } from './app'

const ChatInputStyle = styled.div`
  padding: 10px;
`
const ChatInput = () => {
    const [message, setMessage] = React.useState('')
    const onSend = () => {
        const messageObject = createMessage(message, { user: getLocalUserData() })
        socket.emit('send', messageObject)
        pushMessage(messageObject)
    }
    const onKeyDown = e => {
        if (e.keyCode === 13) {
            onSend()
            setMessage('')
        }
    }
    return (
        <ChatInputStyle>
            <input
                value={message}
                onKeyDown={onKeyDown}
                onChange={e => setMessage(e.target.value)}
            />
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

export default ChatBox