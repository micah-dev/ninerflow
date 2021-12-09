const Discord = require('discord.js')
const secrets = require('../secrets.json')
const briefSchema = require('../models/brief-schema')

const puppeteer = require('puppeteer');
const tempFile_weather = `brief_weather.png`
const tempPath_weather = `./commands/temp/${tempFile_weather}`
const lookupURL_weather = 'https://www.google.com/search?q=UNCC+weather'
const tempFile_news = `brief_news.png`
const tempPath_news = `./commands/temp/${tempFile_news}`
const lookupURL_news = 'https://www.ninertimes.com/news/'

// const ClassCommand = require('../commands/class.js')
// const listClasses = require('../commands/class.js')

// const TodoCommand = require('../commands/todo.js')
// const WeatherCommand = require('../commands/weather.js')
// const NewsCommand = require('../commands/news.js')

// allow the user to choose what commands they want in their brief

// Lists all class items for a requester.
async function listClasses(user_id, interaction, class_item_collection) {

    // If the user has no class items added
    // TODO: if the collection doesnt exist, return error
    let item_count = await class_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Nothing here. Make a new class with `/class new`")

        interaction?.followUp({
            ephemeral: true,
            embeds: [failure_embed]
        })
        return
    }

    let user_class_list = await class_item_collection.find({ user: user_id})

    // If there are more than 10 items, send as a string message
    if (item_count > 10) {
        let formatted_list = formatClasses(user_class_list)
        // Reply
        interaction?.reply({
            ephemeral: true,
            custom: true,
            content: formatted_list.toString(),
        })
    } else {
        class_embeds_array = []
        user_class_list.forEach(doc => {
            class_embeds_array.push(new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(doc.name)
                .setDescription(`Active ${doc.daysOfWeek} from ${doc.startTime} to ${doc.endTime}`)
                .setFooter(`ID: ${doc.itemID}`)
            )
        })
        // Reply
        interaction?.followUp({
            ephemeral: true,
            embeds: class_embeds_array,
        })
    }
}

// Lists all todo items for a requester.
async function listTodos(user_id, interaction, todo_item_collection) {

    // If the user has no todo items added
    let item_count = await todo_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Nothing here, take a break!`)

        interaction?.followUp({
            ephemeral: true,
            embeds: [failure_embed]
        })
        return
    }

    let user_todo_list = await todo_item_collection.find({ user: user_id})

    // If there are more than 10 items, send as a string message
    if (item_count > 10) {
        let formatted_list = formatTodos(user_todo_list)
        // Reply
        interaction?.reply({
            ephemeral: true,
            custom: true,
            content: formatted_list.toString(),
        })
    } else {
        todo_embeds_array = []
        user_todo_list.forEach(doc => {
            todo_embeds_array.push(new Discord.MessageEmbed()
                .setColor('ORANGE')
                .setTitle(doc.name)
                .setDescription(`${doc.dueDate} @ ${doc.dueTime}`)
                .setFooter(`ID: ${doc.itemID}`)
            )
        })
        // Reply
        interaction?.followUp({
            ephemeral: true,
            embeds: todo_embeds_array,
        })
    }
}

// Sends weather
async function sendWeather(interaction) {
    
    console.log("sending weather")
    // Get the screenshot
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(lookupURL_weather)
    const element = await page.$('#rso > div:nth-child(2)');
    await element.screenshot({ path: tempPath_weather })
    page.close();

    // Construct the reply
    const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile_weather}`);
    const embed = new Discord.MessageEmbed()
        .setColor('#008080')
        .setTitle(`This Weeks Weather Forecast 🌤`)
        .setImage(`attachment://${tempFile_weather}`)
        //.setThumbnail(url = logo)
        .setTimestamp()
    
    const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setURL(`${lookupURL_weather}`)
                .setLabel('View on Web')
                .setStyle('LINK')
        )
    
    // Actually send the reply
    await interaction.followUp({
        ephemeral: true,
        embeds: [embed],
        files: [attachment],
        components: [button],
    })
}

// Sends news
async function sendNews(interaction) {
    console.log("sending news")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(lookupURL_news)
    const element = await page.$('#tncms-block-786297')
    await element.screenshot({ path: tempPath_news })
    page.close();

    const attachment = new Discord.MessageAttachment(`./commands/temp/${tempFile_news}`);
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Hot off the press 📰`)
        .setImage(`attachment://${tempFile_news}`)
        .setTimestamp()

    const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setURL(`${lookupURL_news}`)
                .setLabel('View on Web')
                .setStyle('LINK')
        )

    //await interaction.deferReply({ ephemeral: true })
    await interaction.followUp({
        ephemeral: true,
        embeds: [embed],
        files: [attachment],
        components: [button],
    })
}

async function sendBrief(instance, user_id, user_name, interaction, brief_item_collection) {
    let user_brief = await brief_item_collection.find({ userID: user_id })

    enable_class = user_brief[0].enable_class_list
    enable_todo = user_brief[0].enable_todo_list
    enable_weather = user_brief[0].enable_weather
    enable_news = user_brief[0].enable_news

    let class_item_collection = instance.mongoConnection.models['class_item']
    let todo_item_collection = instance.mongoConnection.models['todo_item']

    //interaction.reply("**Here is your brief:**")
    interaction?.reply({
        ephemeral: true,
        custom: true,
        content: "**Here is your brief:**",
    })

    if (enable_class) {
        listClasses(user_id, interaction, class_item_collection)
    }

    if (enable_todo) {
        listTodos(user_id, interaction, todo_item_collection)
    }

    if (enable_weather) {
        sendWeather(interaction)
    }

    if (enable_news) {
        sendNews(interaction)
    }
}

module.exports = {
    category: 'Sprint 4',
    guildOnly: true,
    slash: true,
    //testOnly: true,

    name: 'brief',
    description: 'Get daily updates on NinerFlow content that you choose.',
    
    options: [
        {
            name: 'enable_class_list',
            description: 'Include class list in brief?',
            type: 'BOOLEAN',
            required: true,
        },
        {
            name: 'enable_todo_list',
            description: 'Include todo list in brief?',
            type: 'BOOLEAN',
            required: true,
        },
        {
            name: 'enable_weather',
            description: 'Include weather forecast in brief?',
            type: 'BOOLEAN',
            required: true,
        },
        {
            name: 'enable_news',
            description: 'Include The Niner Times news in brief?',
            type: 'BOOLEAN',
            required: true,
        },
    ],

    callback: async ({ interaction, member, instance, args }) => {

        console.log(args)
        if (!(interaction.commandName === 'brief')) return
        let brief_item_collection = instance.mongoConnection.models['brief_item']

        const user_id = member.id
        const user_name = member.nickname

        if (args[0] == null) {
            console.log("Attempting to send the brief")
            // Try and send the brief message
            let item_count = await brief_item_collection.find({ userID: user_id}).count()
            console.log("item_count:", item_count)

            // If the user has no brief config, warn the user.
            if (item_count == 0) {
                console.log("No brief configuration, add one!")
                // Create warn message
                const no_config_embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("You don't have a brief configuration yet.")
                    .addField("Configure your brief with:", "`/brief enable_x: True/False`")

                interaction?.reply({
                    ephemeral: true,
                    embeds: [no_config_embed]
                })
                return
            } else {
                // Send the brief
                console.log("Sending the brief message")

                let user_brief = await brief_item_collection.find({ userID: user_id })

                enable_class = user_brief[0].enable_class_list
                enable_todo = user_brief[0].enable_todo_list
                enable_weather = user_brief[0].enable_weather
                enable_news = user_brief[0].enable_news

                if (enable_class == false && enable_todo == false && enable_weather == false && enable_news == false) {
                    const all_false_embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("All of your brief options are disabled.")
                    .addField("Configure your brief with:", "`/brief enable_x: True/False`")

                    interaction?.reply({
                        ephemeral: true,
                        embeds: [all_false_embed]
                    })
                    return
                }

                sendBrief(instance, user_id, user_name, interaction, brief_item_collection)
            }
        } else {
            console.log("Building the brief message")

            // Delete any existing brief configs if there are any
            let the_item_count = await brief_item_collection.find({ userID: user_id}).count()
            console.log(the_item_count)
            if (the_item_count > 0) {
                await brief_item_collection.deleteMany({ userID: user_id})
            }

            // Construct the brief config item
            const new_brief_item = await briefSchema.create({
                userID: user_id,
                enable_class_list: args[0],
                enable_todo_list: args[1],
                enable_weather: args[2],
                enable_news: args[3],
            })

            // Create a embed to show success.
            const success_embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Brief configured succesfully! ☑️')
                .setDescription("See your brief with `/brief` (no arguments)")
            // Reply
            interaction?.reply({
                ephemeral: true,
                embeds: [success_embed]
            })
        }

        



        



    }
}