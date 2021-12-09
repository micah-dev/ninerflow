const Discord = require('discord.js')
const secrets = require('../secrets.json')
const classSchema = require('../models/class-schema')

// DONE crashes if list is empty
// parse date entry
// make days active a choice or array or buttons?
// auto remind
// format as a schedule
// DONE delete based on id
// DONE generate an id for every new class
// DONE if there are more than 10 todos, dont send them as embeds

// Generates the class items ID, used for item deletion.
async function generateItemID(user_id, class_item_collection) {
    let item_count = await class_item_collection.find({ userID: user_id}).count()
    return item_count + 1
}

// Creates a new class item for a user requester.
async function newClass(user_id, user_name, interaction, cmd_name, cmd_data, class_item_collection) {
    
    class_name = cmd_data[0].options[0].value
    class_days_active = cmd_data[0].options[1].value
    class_start_time = cmd_data[0].options[2].value // convert to time
    class_end_time = cmd_data[0].options[3].value // convert to time

    let item_id = await generateItemID(user_id, class_item_collection)

    // Create a new todo_item for the user
    const new_class_item = await classSchema.create({
        itemID: item_id,
        userID: user_id,
        name: class_name,
        daysOfWeek: class_days_active,
        startTime: class_start_time,
        endTime: class_end_time,
    })

    // Create a embed to show success.
    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Class added succesfully! ☑️')
        .setDescription(`${class_name}, active ${class_days_active} from ${class_start_time} to ${class_end_time}`)
        .setFooter(`ID: ${item_id}`)
    // Reply
    interaction?.reply({
        ephemeral: true,
        embeds: [success_embed]
    })
}

// Formats all class items if the requester has more than 10 items.
function formatClasses(user_class_list) {
    let str = '```'
    user_class_list.forEach(doc => {
        str += `\n${doc.name}\n * Active ${doc.daysOfWeek} from ${doc.startTime}\n * ID: ${doc.endTime}\n----------\n`
    })
    str += "```"
    return str
}

// Lists all class items for a requester.
async function listClasses(user_id, user_name, interaction, class_item_collection) {

    // If the user has no class items added
    // TODO: if the collection doesnt exist, return error
    let item_count = await class_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Nothing here. Make a new class with `/class new`")

        interaction?.reply({
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
        interaction?.reply({
            ephemeral: true,
            embeds: class_embeds_array,
        })
    }
}

// Deletes a class item based on its id.
async function deleteClass(user_id, user_name, interaction, cmd_name, cmd_data, class_item_collection) {
    
    // If the user has no class items added
    let item_count = await class_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Nothing here to delete. Make a new class item with `/class new`")

        interaction?.reply({
            ephemeral: true,
            embeds: [failure_embed]
        })
        return
    }

    // Find all items to validate ID exists
    let valid_ids = []
    // Get all class items for the requester
    let user_class_list = await class_item_collection.find({ userID: user_id })
    user_class_list.forEach(doc => {
        valid_ids.push(doc.itemID)
    })

    // Delete the class item
    class_item_id = cmd_data[0].options[0].value
    if (valid_ids.includes(class_item_id)) {
        // Find the item, get the name
        let class_item = await class_item_collection.find({ userID: user_id, itemID: class_item_id })
        class_item_name = class_item[0].name
        // Delete the item
        await class_item_collection.deleteOne({ userID: user_id, itemID: class_item_id })
        // Create success message
        const success_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Deleted "${class_item_name}" from your classes.`)

        interaction?.reply({
            ephemeral: true,
            embeds: [success_embed]
        })
    } else {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Sorry, we couldn't find a class matching that ID.`)

        interaction?.reply({
            ephemeral: true,
            embeds: [failure_embed]
        })
    }
}

async function clearClasses(user_id, user_name, interaction, cmd_name, cmd_data, class_item_collection) {
    
    // If the user has no class items added
    let item_count = await class_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Nothing to delete. Make a new class item with `/class new`")

        interaction?.reply({
            ephemeral: true,
            embeds: [failure_embed]
        })
        return
    }

    // If the user has class items, delete them all
    await class_item_collection.deleteMany({ userID: user_id })

    // Send success message
    const success_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Cleared all classes! Getting ready for a new semester?`)

    interaction?.reply({
        ephemeral: true,
        embeds: [success_embed]
    })
}




module.exports = {
    category: 'Sprint 3',
    guildOnly: true,
    slash: true,
    testOnly: true,

    name: 'class',
    description: 'View your classes and get class reminders.',
    type: 2,

    options: [
        {
            name: 'list',
            description: 'Lists all of your classes.',
            //required: true,
            type: 1,
        },
        {
            name: 'new',
            description: 'Creates a new class.',
            //required: true,
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Name of the class.',
                    required: true,
                    type: 3,
                },
                {
                    name: 'days_active',
                    description: "Days the class meets. Format: MWF.",
                    required: true,
                    type: 3,
                },
                {
                    name: 'start_time',
                    description: 'Time the class starts. Format: 11:15 AM.',
                    required: true,
                    type: 3,
                },
                {
                    name: 'end_time',
                    description: 'Time the class ends. Format: 1:15 PM.',
                    required: true,
                    type: 3,
                },
            ]
        },
        {
            name: 'delete',
            description: 'Deletes a class.',
            //required: true,
            type: 1,
            options: [
                {
                    name: 'item_id',
                    description: 'The ID of the class to be deleted.',
                    type: 3,
                    required: true,
                }
            ]
        },
        {
            name: 'clear',
            description: 'Deletes ALL classes.',
            //required: true,
            type: 1,
        }
    ],

    callback: async ({ interaction, member, args, instance }) => {
        
        if (!(interaction.commandName === 'class')) return
        let class_item_collection = instance.mongoConnection.models['class_item']

        // Will exist for all subcommands
        const cmd_name = interaction.options.getSubcommand()
        const cmd_data = interaction.options.data
        const user_id = member.id
        const user_name = member.nickname

        switch (interaction.options.getSubcommand()) {
            case 'list':
                listClasses(user_id, user_name, interaction, class_item_collection)
                break;
            case 'new':
                newClass(user_id, user_name, interaction, cmd_name, cmd_data, class_item_collection)
                break;
            case 'delete':
                deleteClass(user_id, user_name, interaction, cmd_name, cmd_data, class_item_collection)
                break;
            case 'clear':
                clearClasses(user_id, user_name, interaction, cmd_name, cmd_data, class_item_collection)
                break;
        }
    }
}

//module.exports.listClasses = listClasses