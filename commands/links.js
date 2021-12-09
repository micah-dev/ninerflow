// TODO: Migrate this to BUTTONS (maybe)

const Discord = require('discord.js');
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

module.exports = {
    name: 'links',
    category: 'Sprint 2',
    description: 'Shows helpful UNCC web resources.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    callback: async ({ interaction, channel }) => {

        const embed_reply = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle(`UNCC Bookmarks for your convenience 🗺️ `)
            .setDescription(`
                [Canvas](https://uncc.instructure.com/)
                [Niner Net](https://my.charlotte.edu/)
                [Degree Works](https://degreeworks.uncc.edu/DashboardServlet/)
                [Banner Self Service](https://selfservice.uncc.edu/pls/BANPROD/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu)
                [UNCC Google Calendar](https://calendar.google.com/calendar/u/0/r?tab=mc)
                [Academic Calendar](https://registrar.charlotte.edu/printable-calendar)
                [Parking Services](https://mypark.uncc.edu/)
                [Hire-A-Niner](https://career.uncc.edu/hire-a-niner)
                [Athletic Tickets](https://charlotte49ers.com/sports/2010/3/10/204905522.aspx)
                [Student Health Center](https://studenthealth.uncc.edu/)
                [Niner Engage](https://ninerengage.uncc.edu/)
                [Counseling Center](https://counselingcenter.uncc.edu/)
                [49er IDCard](https://uncc-sp.transactcampus.com/UNCC/AccountSummary.aspx)
                [Niner Engage](https://ninerengage.uncc.edu/)
                [Campus Map](https://maps.charlotte.edu/)
                [Library](https://library.charlotte.edu/)
                [Advising & Tutoring](https://connect.uncc.edu/)
                [Scholarship Portal](https://ninerscholars.uncc.edu/)
                [Order Course Books](https://ssomanager.uncc.edu/ssomanager/c/SSB?pkg=ywskorbk.p_callbookstore)
                [Course Catalog](https://catalog.uncc.edu/)
                [COVID Weekly Mitigation Testing](https://www.mobilevaccinationservices.com/unccweekly)
                [More Links](https://www.uncc.edu/gateway/current-students)`)
            .setTimestamp()
            //.setThumbnail(url=logo)
        
        

        // Send the response
        interaction?.reply({
            ephemeral: true,
            embeds: [embed_reply]
        })

        
    }
}