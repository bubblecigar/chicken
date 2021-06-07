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

module.exports = {
    messages,
    methods: {
        pushUserMessage,
        pushSystemMessage
    }
}