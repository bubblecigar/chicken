const messages = []

const pushMessage = messageObject => {
    messages.push(messageObject)
    if (messages.length > 20) {
        messages.shift()
    }
}

module.exports = {
    messages,
    methods: {
        pushMessage
    }
}