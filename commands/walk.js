const Discord = require('discord.js')
const puppeteer = require('puppeteer')

const tempFile = `weather.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.campus-maps.com/uncc/'
const logo = 'https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858'

const secrets = require('../secrets.json')
const building_data = require('../buildingdata.json')
const https = require("https");

module.exports = {
    name: 'walk',
    category: 'Sprint 2',
    description: 'Shows path between two buildings.',
    guildOnly: true,

    slash: true,
    testOnly: true,

    // Arguments
    expectedArgs: '<origin> <destination>',
    minArgs: 2,
    maxArgs: 2,
    syntaxError: 'Incorrect usage! Please use "/walk origin destination"',


    callback: async ({ interaction, args }) => {

        // Send an initial reply within 3 seconds, and then edit that reply.
        await interaction.deferReply({
            ephemeral: true
        })
        await new Promise(resolve => setTimeout(resolve, 5000))

        let response = 'test'
        const a = (args[0])
        const b = (args[1])

        originAddress = {}
        destinationAddress = {}
        building_data.map(function (building_data) {
            if (building_data.building == a) {
                originAddress = building_data.address;
            }
            if (building_data.building == b) {
                destinationAddress = building_data.address;
            }
        });
        let mapBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json'
        let originQueryParam = encodeURIComponent(originAddress)
        let destinationQueryParam = encodeURIComponent(destinationAddress)
        let queryParams = "?origin=" + originQueryParam + "&destination=" + destinationQueryParam + "&mode=walking&key=" + secrets.GOOGLE_API_KEY

        let staticImageApiBaseUrl = "https://maps.googleapis.com/maps/api/staticmap?size=1400x1000&path=enc%3A"
        let staticImageStyleQueryParams = "&style=element%3Ageometry%7Ccolor%3A0x242f3e&style=element%3Alabels.text.stroke%7Ccolor%3A0x242f3e&style=element%3Alabels.text.fill%7Ccolor%3A0x746855&style=feature%3Aadministrative.locality%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Apoi%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Apoi.park%7Celement%3Ageometry%7Ccolor%3A0x263c3f&style=feature%3Apoi.park%7Celement%3Alabels.text.fill%7Ccolor%3A0x6b9a76&style=feature%3Aroad%7Celement%3Ageometry%7Ccolor%3A0x38414e&style=feature%3Aroad%7Celement%3Ageometry.stroke%7Ccolor%3A0x212a37&style=feature%3Aroad%7Celement%3Alabels.text.fill%7Ccolor%3A0x9ca5b3&style=feature%3Aroad.highway%7Celement%3Ageometry%7Ccolor%3A0x746855&style=feature%3Aroad.highway%7Celement%3Ageometry.stroke%7Ccolor%3A0x1f2835&style=feature%3Aroad.highway%7Celement%3Alabels.text.fill%7Ccolor%3A0xf3d19c&style=feature%3Atransit%7Celement%3Ageometry%7Ccolor%3A0x2f3948&style=feature%3Atransit.station%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Awater%7Celement%3Ageometry%7Ccolor%3A0x17263c&style=feature%3Awater%7Celement%3Alabels.text.fill%7Ccolor%3A0x515c6d&style=feature%3Awater%7Celement%3Alabels.text.stroke%7Ccolor%3A0x17263&style=feature:landscape|element:all|color:0x888888"
        let staticImageQueryParams = ""

        https.get(mapBaseUrl + queryParams, (res) => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {

                try {
                    body = JSON.parse(body);
                    polyline = body.routes[0].overview_polyline.points
                    staticImageQueryParams = polyline + staticImageStyleQueryParams + "&maptype=hybrid&key=" + secrets.GOOGLE_API_KEY
                    response = staticImageApiBaseUrl + staticImageQueryParams
                //console.log(response)

                //try {
                    // if response is too large, just send a
                    if (response.length >= 2000) {
                        //error
                        console.log(response.length)
                        
                        const fail_embed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`Sorry 😭, the request failed.`)
                            .setDescription(`[View on Web](${lookupURL})`)
                            .setTimestamp()

                        interaction.editReply({
                            embeds: [fail_embed],
                        })


                    } else {
                        const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`${a} to ${b} 🗺️`)
                        .setImage(response)
                        .setTimestamp()

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
                    }
                } catch (error) {
                    //
                    const fail_embed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle(`Sorry 😭, the request failed.`)
                            .setDescription(`[View on Web](${lookupURL})`)
                            .setTimestamp()

                    interaction.editReply({
                        embeds: [fail_embed],
                    })
                }

                
            });
        })

    }
}