/**
 * Libraries/Imports
 */
const { delay } = require("../util");
const puppeteer = require('puppeteer');
const playwright = require('playwright');
const Discord = require('discord.js');
const secrets = require('../buildingdata.json')
/**
 * Local Variables
 */
const tempFile = `map.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://maps.charlotte.edu/'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


async function getMapImage(location, destination) {

}
/**
 * Command Parameters/Initialization 
 */
module.exports = {
    name: 'walk',
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
        parseLocations = msg.content.replace('walk ', '')
        location = parseLocations.split(',')[0]
        destination = parseLocations.split(',')[1]
        console.log(`Debug: Going to ${destination}, leaving ${location}`)


        let browser = await playwright.chromium.launch({ headless: false })
        let context = await browser.newContext()
        page = await context.newPage()
        await page.goto("https://maps.charlotte.edu/")
        await page.click("text=From To Go! >> input[type=\"text\"]")
        await page.fill("text=From To Go! >> input[type=\"text\"]", location + ", Charlotte, NC, USA")
        await page.click("text=" + location + " >> span")
        await page.click("text=To Go! >> input[type=\"text\"]")
        await page.fill("text=To Go! >> input[type=\"text\"]", destination + ", Charlotte, NC, USA")
        await page.click("text=" + destination + " >> span")
        await page.click("css=[title='Walking']")
        await page.click("text=Go!")
        await page.wait_for_timeout(1000)

        summary_handle_1 = await page.query_selector("div.adp-summary > span:nth-child(1)")
        summary_handle_2 = await page.query_selector("div.adp-summary > span:nth-child(2)")
        summary_handle_3 = await page.query_selector("div.adp-summary > span:nth-child(3)")
        summary_handle_1 = await summary_handle_1.text_content()
        summary_handle_2 = await summary_handle_2.text_content()
        summary_handle_3 = await summary_handle_3.text_content()
        trip_summary = summary_handle_1 + summary_handle_2 + summary_handle_3
        await page.click("text=Map")
        await page.click("#map-canvas > div > div > div:nth-child(7) > div.gmnoprint.gm-style-mtc > ul > li:nth-child(3)")
        await page.evaluate("document.querySelector('#map-canvas > div > div > div:nth-child(7) > div.gmnoprint.gm-style-mtc').hidden=true");
        await page.evaluate("document.querySelector('body > div.ui-layer.container-fluid > div > div.col-sm-5.collapsable-col').hidden=true");
    },
};