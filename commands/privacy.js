const Discord = require('discord.js')
const secrets = require('../secrets.json')

module.exports = {
    category: 'Sprint 4',
    guildOnly: true,
    slash: true,
    //testOnly: true,

    name: 'privacy',
    description: `View NinerFlow's privacy policy.`,

    callback: async ({ interaction }) => {

        const embed_reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`We don't want your data! `)
            .setDescription(`NinerFlow only stores user preferences related to todo, class, and brief items that a user has given us.\n\n Other users can not access these items, they are tied to the globally unique ID of your Discord account.`)
            .setTimestamp()
        
        // Send the response
        interaction?.reply({
            ephemeral: true,
            embeds: [embed_reply]
        })



    }
}