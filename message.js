const messages = []

const pushUserMessage = messageObject => {
    messageObject.type = 'user-message'
    messages.push(messageObject)
    if (messages.length > 20) {
        messages.shift()
    }
}

const pushSystemMessage = message => {
    messages.push({ message, type: 'system-message' })
}


const pushGameMessage = message => {
    const prevGameMessageIndex = messages.findIndex(msg => msg.type === 'game-message')
    messages.splice(prevGameMessageIndex, 1)
    messages.push({ message, type: 'game-message' })
}


module.exports = {
    messages,
    methods: {
        pushUserMessage,
        pushSystemMessage,
        pushGameMessage
    }
}