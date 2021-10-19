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