/**
 * Libraries/Imports
 */
const {delay} = require("../util");
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
/**
 * Local Variables
 */
const tempFile = `news.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.ninertimes.com/news/'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

/**
 * Command Parameters/Initialization 
 */
module.exports = {
    name: 'news',
    usage: [],
    description: '',
    /**
    * The code the command executes when called
    */
    execute: async (msg, args, bot) => {
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
        const element = await page.$('#tncms-block-786297'); 
        await element.screenshot({path: tempPath})
        /**
        * Using the discord library to make embedded message to send back
        */
        const attachment = new Discord
                .MessageAttachment(tempPath, tempFile);
        
                const reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`The Niner Times! 📰`)
            .attachFiles(attachment)
            .setImage(`attachment://${tempFile}`)
            .setThumbnail(url=logo)
            .setTimestamp()
            page.close();
    
        return reply
        },
};