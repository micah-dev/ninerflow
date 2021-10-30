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
 const lookupURL = 'https://www.ratemyprofessors.com/search/teachers?query=NAME&sid=U2Nob29sLTEyNTM='
 const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'
 
 /**
  * Command Parameters/Initialization 
  */
 module.exports = {
     name: 'rate',
     usage: [],
     description: '',
     /**
     * The code the command executes when called
     */
     execute: async (msg, args, bot) => {
        professorName = args[1] +"%20" + args[2] // horrible hard code pls fix 
        newURL = lookupURL.replace("NAME", professorName);
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
         const browser = await puppeteer.launch({headless: true})
         const page = await browser.newPage()
         await page.goto(newURL)
         await page.click('body > div:nth-child(13) > div > div > button')//cookies pop up
         const element = await page.$('#root > div > div > div.SearchResultsPage__StyledSearchResultsPage-sc-1srop1v-0.kdXwyM > div.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1.gsOeEv'); 
         delay(500);
         await element.screenshot({path: tempPath})
         /**
         * Using the discord library to make embedded message to send back
         */
         const attachment = new Discord
                 .MessageAttachment(tempPath, tempFile);
         
                 const reply = new Discord.MessageEmbed()
             .setColor('#008080')
             .setTitle(`Rate My Professor: ` + professorName.replace('%20', ' '))
             .attachFiles(attachment)
             .setImage(`attachment://${tempFile}`)
             .setDescription(`[View on Web](${newURL})`)
             .setThumbnail(url=logo)
             .setTimestamp()
             page.close();
     
         await msg.channel.send(reply)
         },
 };