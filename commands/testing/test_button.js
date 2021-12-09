const Discord = require('discord.js')

module.exports = {
    name: 'test_button',
    category: 'Testing',
    description: 'Sends a button.',

    hidden: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel}) => {
        
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ban_yes')
                    .setEmoji('🔨')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ban_no')
                    .setEmoji('❌')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
            )

        const linkRow = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setURL('https://google.com')
                    .setLabel('Visit URL')
                    .setStyle('LINK')
                
            )
            
        await msgInt.reply({
            ephemeral: true,
            content: 'Are you sure?',
            components: [row, linkRow],
        })

        
        

    }
}