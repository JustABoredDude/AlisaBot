const Discord = require('discord.js');
module.exports= {
    name: 'unban',
    description: '',
    aliases: [''],
    async execute(message, prefix, args, Client){
        let own = message.guild.member(message.author.id)
        let unban = await Client.users.fetch(args[0]).catch((e)=>{
            console.log(e)
                })
        if(!own.hasPermission(["BAN_MEMBERS","ADMINISTRATOR"])) return message.channel.send('you have no perms')
        message.guild.members.unban(unban,{reason:"unbanned"}).catch((e)=>{
            if(e == 'DiscordAPIError: Missing Permissions'){ 
                const embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Missing Permissions')
                .addField('Needed perms:','ban members?')
                message.channel.send(embed) 
                return
            }
        })
        if(unban){
            const embed = new Discord.MessageEmbed()
            .setDescription(`**${args[0]}** has been unbanned from the server`)
            .setColor(`#0099ff`)
            message.channel.send(embed)
            }        
    }
}