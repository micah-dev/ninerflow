/**
 * Libraries/Imports
 */
const { delay } = require("../util");
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
/**
 * Local Variables
 */
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'
const tempFile = `events.png`
const tempPath = `./commands/temp/${tempFile}`
let lookupURL = 'https://campusevents.uncc.edu'

/**
 * Command Parameters/Initialization 
 */
module.exports = {
    name: 'events',
    usage: [],
    description: '',
    /**
    * The code the command executes when called
    */
    execute: async (msg, args, bot) => {
        let selector = `#event_results`
        let home =  `#tabs-19063-19065 > div`
        let title = ``
        if (args[1] != null) {
            selector = `#event_results`
            switch (args[1]) {
                case 'rec':
                    title = "Sports & Recreational"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30511197162301` //#event_results
                    break;
                case 'work':
                    title = "Conferences & Workshops"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30211491534209`
                    break;
                case 'social':
                    title = "Social"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30211491540308`
                    break;
                case 'entertainment':
                    title = "Entertainment"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30663157311715`
                    break;
                case 'info':
                    title = "Information Sessions"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30211491539784`
                    break;
                default:
                    lookupURL = 'https://campusevents.uncc.edu'
                    selector = home
                    break;
            }
        }else{
            title= 'Trending Events'
            selector = home
        }
        /**
        * Using puppeteer to setup browser and screenshot page then save it
        * 
        * To find a page element: 
        *   Click Object on page
        *   Inspect Element
        *   Click HTML for object
        *   copy>
        *   Selector Path>
        */
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        const element = await page.$(selector);
        delay(500);
        await element.screenshot({ path: tempPath })
        /**
        * Using the discord library to make embedded message to send back
        */
        const attachment = new Discord
            .MessageAttachment(tempPath, tempFile);

        const reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`🥂 ${title}`)
            .setThumbnail(url=logo)
            .setDescription(`[View on Web](${lookupURL})`)
            .attachFiles(attachment)
            .setImage(`attachment://${tempFile}`)
            .setTimestamp()
        page.close();

        await msg.channel.send(reply)
    },
};