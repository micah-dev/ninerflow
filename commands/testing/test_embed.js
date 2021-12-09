const Discord = require("discord.js")

const lookupURL = 'https://www.google.com/search?q=UNCC+weather'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

module.exports = {
    name: 'test_embed',
    category: 'Testing',
    description: 'Sends an embed.',

    hidden: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction }) => {
        
        const the_embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(url = logo)
            .setTimestamp()

            //.setDescription(`[View on Web](${lookupURL})`)
            
            .setTitle(`Clear throughout the day. 🌘`)
        
            .addField('Today:', '> 51, Clear\n> Feels like: 51\n> Low: 31\n> High: 69\n> Chance of rain: 0%\n')

            .addField('Sunday:', "> lo: 38  hi: 73", inline=true)
            .addField('Monday:', "> lo: 36  hi: 71", inline=true)
            .addField('Tuesday:', "> lo: 31  hi: 69", inline=true)
            .addField('Wednesday:', "> lo: 33  hi: 68", inline=true)
            .addField('Thursday: ', "> lo: 34  hi: 73", inline=true)
            .addField('Friday:', "> lo: 38  hi: 68", inline=true)
            .addField('Saturday:', "> lo: 41  hi: 70", inline=true)
            
            .setFooter(`Data from Dark Sky`)
            

        //return embed

        const the_button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL('https://google.com')
                    .setLabel('View on Web')
                    .setStyle('LINK')
                
            )

        await interaction.reply({
                ephemeral: true,
                //content: 'Are you sure?',
                embeds: [the_embed],
                components: [the_button],
            })

    }
}