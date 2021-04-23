const Discord = require('discord.js');
module.exports= {
    name: 'kick',
    description: '',
    aliases: [''],
    execute(message, prefix, args, Client){
        const player = message.author.id.toString()
        const embedkickinf = new Discord.MessageEmbed()
        .setTitle('Invalid User')
        .setDescription('You must Mention the person you want to kick.')
        .addField('Example:', `${prefix}kick <@${player}> bad`)
        .setColor('#ff0000')
            let own = message.guild.member(message.author.id)
            if (!args[0]) return message.channel.send(embedkickinf).catch(console.error)
            let person1 = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
            if(!person1) return message.channel.send(embedkickinf);

            const embedkick = new Discord.MessageEmbed();

            let kickreason = args.slice(1).join(" ").trim();

            if (!args[1]) {
                kickreason = "no reason specified"
              }
              if(!own.hasPermission("KICK_MEMBERS")) return message.channel.send('You have no Permission to use this Command')
            embedkick.setDescription(`**${person1.user.tag}** has been kicked from the server`)
            embedkick.addField('User Id', `${person1.user.id}`)
            embedkick.addField('Reason', `${kickreason}`)
            embedkick.setColor(`#ff0000`)

            const embeduser = new Discord.MessageEmbed()
            .setDescription(`You have been kicked on **${message.guild.name}**`)
            .addField(`Reason`,`${kickreason}`)
            .setColor('#ff0000')
            const users = Client.users.cache.get(person1.user.id);
            users.send(embeduser).then(()=>{
                person1.kick({reason: kickreason}).then(e=>{message.channel.send(embedkick)
                }).catch((e)=>{
                    if(e == 'DiscordAPIError: Missing Permissions'){ 
                        const embed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Missing Permissions')
                        .addField('Needed perms:','kick members')
                        message.channel.send(embed) 
                        return
                    }
                  console.log(e)
                })

            }).catch((e)=>{
                if(e == 'DiscordAPIError: Missing Permissions'){ 
                    const embed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Missing Permissions')
                    .addField('Needed perms:','Kick Members')
                    message.channel.send(embed) 
                    return
                }
                console.log(e)
            })


    }
}