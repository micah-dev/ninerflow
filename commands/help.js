/**
 * Libraries/Imports
 */
const { delay } = require("../util");
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
/**
 * Local Variables
 */
const tempFile = `help.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = ''
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

/**
  * Command Parameters/Initialization 
  */
module.exports = {
    name: 'help',
    usage: [],
    description: '',
    /**
     * The code the command executes when called
     */
    execute: async (msg, args, bot) => {


        /**
         * Using the discord library to make embedded message to send back
         */
        const attachment = new Discord
            .MessageAttachment(tempPath, tempFile);

        const reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`Need some help? 👋🏽`)
            .setDescription(`'Below is all available commands. For more information, visit [NinerFlow docs](https://github.com/micah-dev/ninerflow).'`)
            .addFields(
                { name: '**!help**', value: "Shows all available commands." },
                { name: '**!events or !events <REC/WORK/SOCIAL/ENTERTAINMENT/INFO>**', value: "Show trending and future events" },
                { name: '**!walk <a>, <b>**', value: "Shows the fastest walking path between <a> and <b>." },
                { name: '**!weather **', value: "Shows the local weather forecast for UNCC." },
                { name: '**!links**', value: "Show useful UNCC web resources." },
                { name: '**!food**', value: "Shows the operating hours of campus dinning." },
                { name: '**!news**', value: "Shows the Niner Times." },
                { name: '**!bus**', value: "[WIP]Show all bus routes." },
                { name: '**!ratemy <professorname>**', value: "[WIP]Shows the rating of <professorname> from ratemyprofessors.com." },
                { name: '**!classremind <classname> <time> <days>**', value: "[WIP]Reminds user of a class at a given time." },
                { name: '**!taskremind <task> <date> <time>**', value: "[WIP]Reminds user of a task at a given time" },
                { name: '**!schedule**', value: "[WIP]Shows a user their class schedule." },
            )
            .setTimestamp()
            .setThumbnail(url = logo)
        return reply
    },
};
