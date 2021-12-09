// TODO: Migrate this to BUTTONS (maybe)

const Discord = require('discord.js')
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

module.exports = {
    name: 'help',
    category: 'Sprint 2',
    description: 'Shows the NinerFlow help menu.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    // TODO: seperate help menu by cmd category

    callback: async ({ interaction, instance }) => {
        
        const embed = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`Need some help? 👋🏽`)
            .setDescription(`Below is all available commands. For more information, visit the NinerFlow [docs](https://github.com/micah-dev/ninerflow).\n\n`)
            //.setTimestamp()
        
        sprint_2 = []
        sprint_3 = []
        sprint_4 = []
        
        instance.commandHandler.commands.forEach((command) => {
            
            //console.log(command.category)
            if(command.category == 'Testing' || command.category == 'Configuration') return

            if (command.category == 'Sprint 2') {
                sprint_2.push(command)
            }

            if (command.category == 'Sprint 3') {
                sprint_3.push(command)
            }

            if (command.category == 'Sprint 4') {
                sprint_4.push(command)
            }
            
            
        })

        embed.addField("**Sprint 2**", "---------------------------------\n")
        sprint_2.forEach((command) => {
            //console.log(command)
            cmd = `/${command.names[0]} ${command.syntax}`
            cmd_format = "`"
            field = cmd_format + cmd + cmd_format
            
            embed.addField(field, command.description)
        })

        embed.addField("**Sprint 3**", "---------------------------------\n")
        sprint_3.forEach((command) => {
            //console.log(command)
            cmd = `/${command.names[0]} ${command.syntax}`
            cmd_format = "`"
            field = cmd_format + cmd + cmd_format
            
            embed.addField(field, command.description)
        })

        embed.addField("**Sprint 4**", "---------------------------------\n")
        sprint_4.forEach((command) => {
            //console.log(command)
            cmd = `/${command.names[0]} ${command.syntax}`
            cmd_format = "`"
            field = cmd_format + cmd + cmd_format
            
            embed.addField(field, command.description)
        })

        // Send the response
        interaction?.reply({
            ephemeral: true,
            embeds: [embed]
        })


    }
}