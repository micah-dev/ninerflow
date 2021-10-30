/**
 * Libraries/Imports
 */
const { delay } = require("../util");
const Discord = require('discord.js');
const OpenAIAPI = require('../node_modules/openai-api-node');
const secrets = require('../secrets.json')
const ai = new OpenAIAPI(secrets.openai_key);
/**
 * Local Variables
 */
 const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'
/**
 * Command Parameters/Initialization 
 */
module.exports = {
    name: 'schedule',
    usage: [],
    description: '',
    /**
    * The code the command executes when called
    */
    execute: async (msg, args, bot) => {

        let reply = new Discord.MessageEmbed()
                    .setDescription('')
                    .setColor('#008080')
                    .setTimestamp()
        ai.CompletionsCreate("What is the weather at UNCC?")
            .then(function (data) {
                reply.setDescription=data
            })
            .catch(function (err) {
                reply.setDescription=data
            })

        await msg.channel.send(reply)
    },
};