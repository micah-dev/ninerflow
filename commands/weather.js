const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `weather.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.google.com/search?q=UNCC+weather'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'
//https://weatherstreet.com/weather-forecast/Unc-Charlotte-NC-28223.htm

module.exports = {
    name: 'weather',
    category: 'Sprint 2',
    description: 'Shows UNCC weekly weather forecast.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {

        // Send an initial reply within 3 seconds, and then edit that reply.
        await interaction.deferReply({
            ephemeral: true
        })
        await new Promise(resolve => setTimeout(resolve, 10000))

        // Get the screenshot
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        const element = await page.$('#rso > div:nth-child(2)');
        await element.screenshot({ path: tempPath })
        page.close();

        // Construct the reply
        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);
        const embed = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`This Weeks Weather Forecast 🌤`)
            .setImage(`attachment://${tempFile}`)
            //.setThumbnail(url = logo)
            .setTimestamp()
        
        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
            )
        
        // Actually send the reply
        await interaction.editReply({
            embeds: [embed],
            files: [attachment],
            components: [button],
        })
    }
}