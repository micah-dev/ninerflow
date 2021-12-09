// Imports
const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `test.png`
const tempPath = `./commands/temp/${tempFile}`
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'
// Where should I go?
const lookupURL = 'https://www.google.com/search?q=UNCC+weather'


// eEpRmt5tptPEQwBN



module.exports = {
    name: 'test',
    category: 'Testing',
    description: 'Shows UNCC weekly weather forecast.',
    guildOnly: true,
    hidden: true,

    slash: true, // We will only use slash commands for this version
    testOnly: true, // Instant access to slash commands. Global use can take up to 2 hours to initialize in servers.

    callback: async ({ message, interaction, channel }) => {
        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        // Div path to element
        const element = await page.$('#rso > div:nth-child(2)');
        await element.screenshot({ path: tempPath })
        page.close();
        
        const attachment = new Discord.MessageAttachment('https://indify.co/widgets/live/weather/o2URfkUkMbQitvmOCjI0');

        const embed_reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`This Weeks Weather Forecast! 🌤`)
            //.attachFiles(attachment)
            //.setImage('./commands/temp/weather.png')
            //.setImage(`${tempFile}`)
            //.setImage(`attachment://${tempFile}`)
            .setImage('https://indify.co/widgets/live/weather/o2URfkUkMbQitvmOCjI0')
            .setDescription(`[View on Web](${lookupURL})`)
            .setThumbnail('https://indify.co/widgets/live/weather/o2URfkUkMbQitvmOCjI0')
            .setTimestamp()
        
        
        // APPARENTLY, in discord.js@13, bots MUST
        // respond to slash commands in 3 seconds,
        // thus, we must either defer a reply and
        // then edit it, or reply and then edit it.
        
        // Response example for messages without web interaction.
        // a.k.a. for sending fast messages.
        //interaction.reply({
        //    ephemeral: true,
        //    embeds: [embed_reply],
        //    files: [attachment]
        //})


        // Response example for messages with web interaction.
        // The bot will defer its repsonse until the promise is resolved.
        await interaction.deferReply({
            ephemeral: true
        })
        
        await new Promise(resolve => setTimeout(resolve, 5000))

        // Actually send the response.
        // Notice, NOT explicitly ephemeral because it is built off of deferReply({})
        await interaction.editReply({
            //ephemeral: true,
            embeds: [embed_reply],
            files: [attachment]
        })

    

    }
}