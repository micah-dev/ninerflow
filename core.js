/**
 * Libraries/Imports
 */
const fs = require('fs') //reading file system
const Discord = require('discord.js') // discord wrapper
/**
 * Local imports
 */
const secrets = require('./secrets.json');
/**
 * Global Variables
 */
/**
 * Command Handler
 *      Breaks the message into parts by space, arg[0] is the command
 *      Ignore messages from bots
 *      If the bot has no command, do nothing
 *      Try to execute the command
 *          Send Error to console & reply with error to channel
 */

const messageParser = (msg) => {
    let command = msg.content.replace("!", "").split(" ")[0]
    let arguments = msg.content.replace(`${command}`, "").replace("!", "")
    // if the channel is not a DM ! is not needed, e
    if ((!msg.content.startsWith('!') & !(msg.channel instanceof Discord.DMChannel)) || msg.author.bot || !bot.commands.has(command))
        return false;
    else
        return {
            command: command.toLowerCase(),
            arguments: arguments,
            author: msg.author,
            channel: msg.channel,
            isDM: msg.channel instanceof Discord.DMChannel
        }
}
const commandHandler = async (msg) => {
    let parsed = messageParser(msg)
    if (!parsed) return
    if (!parsed.isDM) {
        msg.delete()
    }
    try {
        msg.author.send("```" + `${parsed.command} ${parsed.arguments}` + "```")
        channel = await msg.author.createDM().catch()
        channel.startTyping()
        command = bot.commands.get(parsed.command)
        await command.execute(msg, parsed.arguments, bot)
            .then(reply => msg.author.send(reply))
        channel.stopTyping()
    } catch (err) {
        console.log(`Error while attempting ${parsed.command}\n${err}`)
    }
}
/**
 * On Start 
 *      Prints bot's username to console 
 */
const startUp = async () => {
    console.log(`Logged in as ${bot.user.tag}!`)
}
/**
 * Load Commands
 *      Designates the file with commands, filters them looking for JS classes
 *      Creates a Discord Collection of them
 *          For each file in the Collection
 *              Require/import it
 *              Add the Command name & command to the commands map
 *              Log to console
 *          Print the total number of commands loaded
 */
const loadCommands = () => {
    bot.commandFile = (fs.readdirSync(`./commands`).filter(file => file.endsWith('.js')))
    bot.commands = new Discord.Collection()
    q = ''
    bot.commandFile.forEach(file => {
        try {
            const command = require(`./commands/${file}`)
            bot.commands.set(command.name, command)
            q += (`${command.name.toUpperCase()} `)
        } catch (error) {
            console.log(` ${error} while reading ${file}`)
        }
    })
    console.log(q)
    console.log(`${(bot.commands.size)} total loaded`)
}
/**
 * Main
 */
var bot = new Discord.Client()
loadCommands()
bot.once('ready', () => startUp())
bot.on('message', msg => commandHandler(msg))
bot.login(secrets.discord_token)