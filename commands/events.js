const puppeteer = require('puppeteer');
const Discord = require('discord.js');

const tempFile = `events.png`
const tempPath = `./commands/temp/${tempFile}`
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'events',
    category: 'Sprint 2',
    description: 'Shows UNCC events.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    //expectedArgs: '[category]',
    //maxArgs: 1,

    options: [
        {
            name: 'category',
            description: 'Optionally get news by category.',
            type: 3,
            required: false,
            choices: [
                {
                    name: 'recreation',
                    value: 'recreation',
                },
                {
                    name: 'work',
                    value: 'work',
                },
                {
                    name: 'social',
                    value: 'social',
                },
                {
                    name: 'entertainment',
                    value: 'entertainment',
                },
                {
                    name: 'info',
                    value: 'info',
                },
            ]
        }
    ],

    callback: async ({ interaction, args }) => {
        
        if (!(interaction.commandName === 'events')) return

        await interaction.deferReply({ ephemeral: true })
        let selector = `#event_results`
        let home = `#tabs-19063-19065 > div`
        let title = ``
        let lookupURL = ``

        if (args[0] != null) {
            selector = `#event_results`
            switch (args[0]) {
                case 'recreation':
                    title = "Sports & Recreational"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30511197162301` //#event_results
                    break;
                case 'work':
                    title = "Conferences & Workshops"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30211491534209`
                    break;
                case 'social':
                    title = "Social"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30211491540308`
                    break;
                case 'entertainment':
                    title = "Entertainment"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30663157311715`
                    break;
                case 'info':
                    title = "Information Sessions"
                    lookupURL = `https://campusevents.uncc.edu/calendar?event_types%5B%5D=30211491539784`
                    break;
                default:
                    lookupURL = 'https://campusevents.uncc.edu'
                    selector = home
                    break;
            }
        } else { //No args case
            lookupURL = 'https://campusevents.uncc.edu'
            title = 'Trending Events'
            selector = home
        }
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(lookupURL)
        const element = await page.$(selector);
        await element.screenshot({ path: tempPath })

        const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile}`);
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`${title} 🎪`)
            .setImage(`attachment://${tempFile}`)
            .setTimestamp()

        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL(`${lookupURL}`)
                    .setLabel('View on Web')
                    .setStyle('LINK')
            )

        interaction.editReply({
            //ephemeral: true,
            embeds: [embed],
            files: [attachment],
            components: [button],
        })
    }
}