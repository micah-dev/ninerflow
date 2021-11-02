/**
 * Libraries/Imports
 */
const {delay} = require("../util");
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
                {name: '**!help**', value:"Shows all available commands." },
                {name: '**!events or !events <REC/WORK/SOCIAL/ENTERTAINMENT/INFO>**', value:"Show trending and future events" },
                {name: '**!bus**', value:"Show all bus routes." },
                {name: '**!walk <a> <b>**', value:"Shows a map overlayed with the best path between <a> and <b>." },
                {name: '**!prate <professor>**', value:"Shows the rating of <professorname> from ratemyprofessors.com." },
                {name: '**!weather **', value:"Shows the local weather forecast for UNCC." },
                {name: '**!remind <classname> <time> <days>**', value:"Schedules a reminder for a class." },
                {name: '**!resources**', value:"Show useful UNCC bookmarks." },
                {name: '**!food**', value:"Shows the operating hours of campus dinning." },
                {name: '**!news**', value:"Shows the Niner Times." },
                {name: '**!todo <task> <date> <time>**', value:"Reminds user of a task at a given time," },
                {name: '**!privacy <classname> <time> <days>**', value:"We don\'t want your data! You can find our privacy policy on our docs page." },
            )
            .setTimestamp()
            .setThumbnail(url=logo)
        await msg.author.send(reply)
        },
};