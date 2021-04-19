const Discord = require('discord.js');
module.exports= {
    name: 'ban',
    description: '',
    aliases: [''],
    execute(message, prefix, args, Client){
        const player = message.author.id.toString()
        const embedbaninf = new Discord.MessageEmbed()
        .setTitle('Invalid User')
        .setDescription('You must Mention the person you want to ban.')
        .addField('Example:', `${prefix}ban <@${player}> being weird`)
        .setColor('#ff0000')
            let own = message.guild.member(message.author.id)
            if (!args[0]) return message.channel.send(embedbaninf).catch(console.error)
            let person1 = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
            if(!person1) return message.channel.send(embedbaninf);

            const embedban = new Discord.MessageEmbed();

            let banreason = args.slice(1).join(" ").trim();

            if (!args[1]) {
                banreason = "no reason specified"
              }
              if(!own.hasPermission("BAN_MEMBERS")) return message.channel.send('You have no Permission to use this Command')
            embedban.setDescription(`**${person1.user.tag}** has been banned from the server`)
            embedban.addField('User Id', `${person1.user.id}`)
            embedban.addField('Reason', `${banreason}`)
            embedban.setColor(`#ff0000`)

            person1.ban({reason: banreason})
            .then((e)=>{
                message.channel.send(embedban)


            }).catch((e)=>{
                if(e == 'DiscordAPIError: Missing Permissions'){ 
                    const embed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Missing Permissions')
                    .addField('Needed perms:','Ban Members')
                    message.channel.send(embed) 
                    return
                }
                console.log(e)
            })

            


    }
}