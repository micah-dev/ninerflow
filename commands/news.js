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
        delay(500);
        await element.screenshot({path: tempPath})
        /**
        * Using the discord library to make embedded message to send back
        */
        const attachment = new Discord
                .MessageAttachment(tempPath, tempFile);
        
                const reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`The Niner Times!`)
            .attachFiles(attachment)
            .setImage(`attachment://${tempFile}`)
            .setTimestamp()
            page.close();
    
        await msg.channel.send(reply)
        },
};