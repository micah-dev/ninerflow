module.exports = {
    category: 'Testing',
    description: 'Replies with pong.',

    hidden: true,

    slash: 'both',
    testOnly: true,

    callback: ({ }) => {
        return 'Pong'
    }
}