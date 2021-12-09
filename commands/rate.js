const puppeteer = require('puppeteer');
const Discord = require('discord.js');
const https = require('https');
const { delay } = require("../util");


const tempFile = `rate.png`
const tempPath = `./commands/temp/${tempFile}`
const lookupURL = 'https://www.ratemyprofessors.com/search/teachers?query=NAME&sid=U2Nob29sLTEyNTM='


module.exports = {
    name: 'rate',
    category: 'Sprint 2',
    description: `View a professor's RateMyProfessor profile.`,
    guildOnly: true,
    slash: true,
    //testOnly: true,

    // Arguments
    expectedArgs: "<Professor Name>",
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'Incorrect usage! Please use "/rate <Firstname Lastname>"',

    callback: async ({ interaction, args }) => {
        let professorName = args[0].replace(" ", '%20')
        let newURL = lookupURL.replace('NAME', professorName)

        await interaction.deferReply({ ephemeral: true })
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(newURL)

        try {
            let rating = await page.$eval('#root > div > div > div.SearchResultsPage__StyledSearchResultsPage-sc-1srop1v-0.kdXwyM > div.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1.gsOeEv > div:nth-child(2) > a > div > div.TeacherCard__NumRatingWrapper-syjs0d-2.joEEbw > div > div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.kMhQxZ', el => el.innerText);
            let ratings = await page.$eval('#root > div > div > div.SearchResultsPage__StyledSearchResultsPage-sc-1srop1v-0.kdXwyM > div.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1.gsOeEv > div:nth-child(2) > a > div > div.TeacherCard__NumRatingWrapper-syjs0d-2.joEEbw > div > div.CardNumRating__CardNumRatingCount-sc-17t4b9u-3.jMRwbg', el => el.innerText);
            let department = await page.$eval('#root > div > div > div.SearchResultsPage__StyledSearchResultsPage-sc-1srop1v-0.kdXwyM > div.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1.gsOeEv > div:nth-child(2) > a > div > div.TeacherCard__CardInfo-syjs0d-1.fkdYMc > div.CardSchool__StyledCardSchool-sc-19lmz2k-2.gSTNdb > div.CardSchool__Department-sc-19lmz2k-0.haUIRO', el => el.innerText);
            let takeAgain = await page.$eval('#root > div > div > div.SearchResultsPage__StyledSearchResultsPage-sc-1srop1v-0.kdXwyM > div.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1.gsOeEv > div:nth-child(2) > a > div > div.TeacherCard__CardInfo-syjs0d-1.fkdYMc > div.CardFeedback__StyledCardFeedback-lq6nix-0.frciyA > div:nth-child(1) > div', el => el.innerText);
            let difficulty = await page.$eval('#root > div > div > div.SearchResultsPage__StyledSearchResultsPage-sc-1srop1v-0.kdXwyM > div.SearchResultsPage__SearchResultsWrapper-sc-1srop1v-1.gsOeEv > div:nth-child(2) > a > div > div.TeacherCard__CardInfo-syjs0d-1.fkdYMc > div.CardFeedback__StyledCardFeedback-lq6nix-0.frciyA > div:nth-child(3) > div', el => el.innerText);

            const embed = new Discord.MessageEmbed()
                .setColor('#008080')
                .setTitle(`RateMyProfessor: ${args[0]} 👨🏽‍🏫`)
                .addField('Rating', `${rating} out of ${ratings} total reviews`)
                .addField('Department', `${department}`)
                .addField('Take Again:', `${takeAgain}`)
                .addField('Difficulty', `${difficulty}/5`)
                .setTimestamp()

            const button = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setURL(`${newURL}`)
                        .setLabel('View on Web')
                        .setStyle('LINK')
                )

            // Actually send the reply
            await interaction.editReply({
                embeds: [embed],
                components: [button],
            })

        } catch(error) {
            console.log("Error with /rate")

            const fail_embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle(`Sorry 😭, the request failed.`)
                .setDescription(`[View on Web](${lookupURL})`)
                .setTimestamp()

            interaction.editReply({
                embeds: [fail_embed],
            })

        }
    }
}