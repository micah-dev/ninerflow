const puppeteer = require('puppeteer');
const Discord = require('discord.js');
const https = require('https');

const tempFile = `food.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://api.dineoncampus.com/v1/locations/status?site_id=5751fd2790975b60e0489226&platform=0'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'


module.exports = {
    name: 'food',
    category: 'Sprint 2',
    description: 'Shows UNCC on-campus dining options.',
    guildOnly: true,
    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        await interaction.deferReply({ ephemeral: true })
        https.get(lookupURL, res => {
            let data = ''
            res.on('data', chunk => {
                data += chunk;
            })
            res.on('end', () => {
                
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle(`Hungry? 🍕`)
                    .setTimestamp()

                data = JSON.parse(data);
                for (loc of data.locations) {
                    embed.addField(loc.name, "> " + loc.status.message)
                }

                const button = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setURL(`${lookupURL}`)
                            .setLabel('View on Web')
                            .setStyle('LINK')
                    )

                interaction.editReply({
                    embeds: [embed],
                    components: [button],
                })
            })
        })
    }
}