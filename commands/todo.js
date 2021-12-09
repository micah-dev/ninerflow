const Discord = require('discord.js')
const secrets = require('../secrets.json')
const todoSchema = require('../models/todo-schema')

// DONE crashes if list is empty
// parse date entry
// auto remind
// NOT DOING buttons to complete or delete
// DONE delete based on id
// DONE generate an id for every new todo
// DONE if there are more than 10 todos, dont send them as embeds

// Generates the todo items ID, used for item deletion.
async function generateItemID(user_id, todo_item_collection) {
    let item_count = await todo_item_collection.find({ userID: user_id}).count()
    return item_count + 1
}

// Creates a new todo item for a user requester.
async function newTodo(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection) {
    
    todo_name = cmd_data[0].options[0].value
    todo_due_date = cmd_data[0].options[1].value // convert to date
    todo_due_time = cmd_data[0].options[2].value // convert to time

    let item_id = await generateItemID(user_id, todo_item_collection)

    // Create a new todo_item for the user
    const new_todo_item = await todoSchema.create({
        itemID: item_id,
        userID: user_id,
        name: todo_name,
        dueDate: todo_due_date,
        dueTime: todo_due_time,
    })

    // Create a embed to show success.
    const success_embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Todo added succesfully! ☑️')
        .setDescription(`${todo_name} @ ${todo_due_date} by ${todo_due_time}`)
        .setFooter(`ID: ${item_id}`)
    // Reply
    interaction?.reply({
        ephemeral: true,
        embeds: [success_embed]
    })
}

// Formats all todo items if the requester has more than 10 items.
function formatTodos(user_todo_list) {
    let str = '```'
    user_todo_list.forEach(doc => {
        str += `\n${doc.name}\n * Due on ${doc.dueDate} by ${doc.dueTime}\n * ID: ${doc.itemID}\n----------\n`
    })
    str += "```"
    return str
}

// Lists all todo items for a requester.
async function listTodos(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection) {

    // If the user has no todo items added
    let item_count = await todo_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Nothing here, take a break!`)

        interaction?.reply({
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
        interaction?.reply({
            ephemeral: true,
            embeds: todo_embeds_array,
        })
    }
}

// Deletes a todo item based on its id.
async function deleteTodo(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection) {
    
    // If the user has no todo items added
    let item_count = await todo_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Nothing here to delete. Make a new todo item with `/todo new`")

        interaction?.reply({
            ephemeral: true,
            embeds: [failure_embed]
        })
        return
    }

    // Find all items to validate ID exists
    let valid_ids = []
    // Get all todo items for the requester
    let user_todo_list = await todo_item_collection.find({ userID: user_id })
    user_todo_list.forEach(doc => {
        valid_ids.push(doc.itemID)
    })

    // Delete the todo item
    todo_item_id = cmd_data[0].options[0].value
    if (valid_ids.includes(todo_item_id)) {
        // Find the item, get the name
        let todo_item = await todo_item_collection.find({ userID: user_id, itemID: todo_item_id })
        todo_item_name = todo_item[0].name
        // Delete the item
        await todo_item_collection.deleteOne({ userID: user_id, itemID: todo_item_id })
        // Create success message
        const success_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Deleted "${todo_item_name}" from your todo list.`)

        interaction?.reply({
            ephemeral: true,
            embeds: [success_embed]
        })
    } else {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Sorry, we couldn't find a todo item matching that ID.`)

        interaction?.reply({
            ephemeral: true,
            embeds: [failure_embed]
        })
    }
}

async function clearTodos(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection) {
    
    // If the user has no todo items added
    let item_count = await todo_item_collection.find({ userID: user_id}).count()
    if (item_count == 0) {
        // Create failure message
        const failure_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle("Nothing to delete. Make a new todo item with `/todo new`")

        interaction?.reply({
            ephemeral: true,
            embeds: [failure_embed]
        })
        return
    }

    // If the user has todo items, delete them all
    await todo_item_collection.deleteMany({ userID: user_id })

    // Send success message
    const success_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Cleared the todo list!`)

    interaction?.reply({
        ephemeral: true,
        embeds: [success_embed]
    })
}




module.exports = {
    category: 'Sprint 3',
    guildOnly: true,
    slash: true,
    //testOnly: true,

    name: 'todo',
    description: 'Create a todo list and get task reminders!',
    type: 2,

    options: [
        {
            name: 'list',
            description: 'Lists all of your todo items.',
            //required: true,
            type: 1,
        },
        {
            name: 'new',
            description: 'Creates a new todo item.',
            //required: true,
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'Name of todo item.',
                    required: true,
                    type: 3,
                },
                {
                    name: 'due_date',
                    description: 'Date item is due. Format: MM/DD/YYYY.',
                    required: true,
                    type: 3,
                },
                {
                    name: 'due_time',
                    description: 'Time item is due. Format: 8:00 PM.',
                    required: true,
                    type: 3,
                },
            ]
        },
        {
            name: 'delete',
            description: 'Deletes a todo item.',
            //required: true,
            type: 1,
            options: [
                {
                    name: 'item_id',
                    description: 'The ID of the todo item to be deleted.',
                    type: 3,
                    required: true,
                }
            ]
        },
        {
            name: 'clear',
            description: 'Deletes ALL todo items.',
            //required: true,
            type: 1,
        }
    ],

    callback: async ({ interaction, member, args, instance }) => {
        
        if (!(interaction.commandName === 'todo')) return
        let todo_item_collection = instance.mongoConnection.models['todo_item']

        // Will exist for all subcommands
        const cmd_name = interaction.options.getSubcommand()
        const cmd_data = interaction.options.data
        const user_id = member.id
        const user_name = member.nickname

        switch (interaction.options.getSubcommand()) {
            case 'list':
                listTodos(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection)
                break;
            case 'new':
                newTodo(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection)
                break;
            case 'delete':
                deleteTodo(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection)
                break;
            case 'clear':
                clearTodos(user_id, user_name, interaction, cmd_name, cmd_data, todo_item_collection)
                break;
        }
    }
}