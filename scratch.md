interaction?.reply({
            custom: true,
            ephemeral: true,
            content: `${user_name}'s todo list:`,
        })
        

        user_todo_list.forEach(doc => {
            
            // msg = `${doc.dueDate} @ ${doc.dueTime}`
            // console.log(msg)

            // interaction?.followUp({
            //     custom: true,
            //     ephemeral: true,
            //     content: msg.toString(),
            // })

            // Create the todo items embed.
            const todo_embed = new Discord.MessageEmbed()
                .setColor('ORANGE')
                .setTitle(doc.name)
                .setDescription(`${doc.dueDate} @ ${doc.dueTime}`)
                //.setFooter(`ID: ${doc.itemID}`)

            // Create delete/complete buttons
            const buttons = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('delete_item')
                        //.setEmoji('❌')
                        .setLabel('Delete?')
                        .setStyle('DANGER')
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('complete_item')
                        //.setEmoji('✅')
                        .setLabel('Complete?')
                        .setStyle('SUCCESS')
                )

            // Send it
            interaction?.followUp({
                ephemeral: true,
                embeds: [todo_embed],
                components: [buttons],
            })

            // Listen to button presses
            const filter = i => i.customID === 'delete_item' && i.user.id === user_id

            const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000})

            collector.on('collect', async i => {
                if (i.customID === 'delete_item') {
                    //await i.update({ content: 'Deleting this todo item.', components: []})
                    i.reply({
                        content: 'deleting it...',
                        ephemeral: true,
                        custom: true,
                    })
                }
            })

            collector.on('end', collected => console.log(`Collected ${collected.size} items`))