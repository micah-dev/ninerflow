const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `news.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.ninertimes.com/news/'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'news',
    category: 'Sprint 2',
    description: 'Shows the front page of the NinerTimes.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {

        await interaction.deferReply({ ephemeral: true })

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        const element = await page.$('#tncms-block-786297')
        await element.screenshot({ path: tempPath })
        page.close();

        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Hot off the press 📰`)
            .setImage(`attachment://${tempFile}`)
            .setTimestamp()

        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
            )

        //await interaction.deferReply({ ephemeral: true })
        await interaction.editReply({
            //ephemeral: true,
            embeds: [embed],
            files: [attachment],
            components: [button],
        })



    }
}