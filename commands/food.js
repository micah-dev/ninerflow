/**
 * Libraries/Imports
 */
const { delay } = require("../util");
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
/**
 * Local Variables
 */
const tempFile = `food.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://dineoncampus.com/unccharlotte/hours-of-operation'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

/**
 * Command Parameters/Initialization 
 */
module.exports = {
    name: 'food',
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
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        page.setViewport({ width: 1920, height: 1080 });
        await page.goto(lookupURL)
        await delay(5000)
        await page.waitForSelector('#main-content > div > div', { visible: true });
        const element = await page.$('#main-content > div > div')
        await element.screenshot({ path: tempPath })
        /**
        * Using the discord library to make embedded message to send back
        */
        const attachment = new Discord
            .MessageAttachment(tempPath, tempFile);

        const reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`Here are the hours for on campus dining this week! 🍕`)
            .attachFiles(attachment)
            .setImage(`attachment://${tempFile}`)
            .setDescription(`[View on Web](${lookupURL})`)
            .setTimestamp()
            .setThumbnail(url=logo)
        page.close();
        await msg.channel.send(reply)
    },
};