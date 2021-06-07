import React from 'react'

let pushMessage = () => { console.log('not initialize yet') }
const useMessage = () => {
  const [messages, setMessages] = React.useState([])
  pushMessage = message => setMessages([...messages, message])
  return messages
}

const createMessage = (message, data) => {
  return {
    user: {
      userName: 'system'
    },
    message,
    ...data
  }
}

export { useMessage, pushMessage, createMessage }