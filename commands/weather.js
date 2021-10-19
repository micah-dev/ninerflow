/**
 * Libraries/Imports
 */
 const {delay} = require("../util");
 const puppeteer = require('puppeteer');
 const Discord = require('discord.js');
 /**
  * Local Variables
  */
 const tempFile = `weather.png`
 const tempPath = `./commands/temp/${tempFile}`
 const lookupURL = 'https://www.google.com/search?q=UNCC+weather'
 
 /**
  * Command Parameters/Initialization 
  */
 module.exports = {
     name: 'weather',
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
         const element = await page.$('#rso > div:nth-child(2)'); 
         delay(500);
         await element.screenshot({path: tempPath})
         /**
         * Using the discord library to make embedded message to send back
         */
         const attachment = new Discord
                 .MessageAttachment(tempPath, tempFile);
         
                 const reply = new Discord.MessageEmbed()
             .setColor('#008080')
             .setTitle(`This weeks weather forecast!`)
             .attachFiles(attachment)
             .setImage(`attachment://${tempFile}`)
             .setTimestamp()
             page.close();
     
         await msg.channel.send(reply)
         },
 };