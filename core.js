const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const { Intents } = DiscordJS
require("dotenv").config()
const secrets = require('./secrets.json')

const client = new DiscordJS.Client({
    // These intents are recommended for the built in help menu
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', async () => {
    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // What guilds your slash commands will be created in
        testServers: ['529033279421153301', '880879298536431676'],
        botOwners: ['318257467446525952', '508066183598047232'],
        // If interactions should only be shown to the one user.
        //ephemeral: true,
        mongoUri: secrets.mongo_uri,
        dbOptions: {
            keepAlive: true
        },
        disabledDefaultCommands: [
            'command',
            'language',
            'prefix',
            'requiredrole',
            'channelonly'
        ],
        debug: true,
        // How many seconds to keep error messages before deleting them.
        // -1 is default and means do not delete.
        delErrMsgCooldown: 3,
    })

        .setCategorySettings([
            {
                name: 'Sprint 2',
                emoji: '2️⃣'
            },
            {
                name: 'Sprint 3',
                emoji: '3️⃣'
            },
            {
                name: 'Testing',
                emoji: '⚙️',
                hidden: true,
            },
        ])
        .setDisplayName('NinerFlow')
})


client.login(secrets.token_ninerflow)