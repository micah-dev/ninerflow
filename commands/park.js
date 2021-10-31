/**
 * Libraries/Imports
 */
const { delay } = require("../util");
const puppeteer = require('puppeteer');
const Discord = require('discord.js');
/**
 * Local Variables
 */
const tempFile = `park.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://pats.charlotte.edu'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

 // Selector Path
 // body > root > app-root

/**
 * Command Parameters/Initialization 
 */
module.exports = {
    name: 'park',
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
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()

        // stolen from interwebs, didnt work
        await page.goto(lookupURL);

        //await delay(5000)
        //await page.waitForSelector('#body > root > app-root', { visible: true}); 
        await delay(500);
        //const element = await page.$('#two-col-left');
        //await element.screenshot({path: tempPath})

        // hmnn
        await page.screenshot({path: tempPath});

        /**
         * Using the discord library to make embedded message to send back
         */
        const attachment = new Discord
            .MessageAttachment(tempPath, tempFile);
        
        const reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`parking 🚗`)
            .attachFiles(attachment)
            .setImage(`attachment://${tempFile}`)
            .setDescription(`[View on Web](${lookupURL})`)
            .setThumbnail(url=logo)
            .setTimestamp()
        page.close();
        await msg.channel.send(reply)
    },
};

//body > root > app-root