const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name: "gstart",
    description: "Starts a giveaways",

    async execute (message, prefix, args, Client) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permission to run this command")
        
        let channel = message.mentions.channels.first();

        if(!channel) return message.reply("Please provide a valid channel\n`Usage: a!gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`")

        let giveawayDuration = args[1];
        if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.reply('Please provide a valid duration\n`Usage: a!gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`')

        let giveawayWinners = args[2]
        if(isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.reply('Please provide a valid number of winners\n`Usage: a!gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`')

        let giveawayPrize = args.slice(3).join(" ")
        if(!giveawayPrize) return message.reply('Please specify a valid prize\n`Usage: a!gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`')

        Client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,

            message: {
                giveaway: "GIVEAWAY",
                giveawayend: "GIVEAWAY ENDED",
                timeRemaining: "Time remaining: **{duration}**",
                inviteToParticipate: "React with 🎉 to enter!",
                winMessage: "Congrats {winner}, you won {prize}",
                embedFooter: "Giveaway Time!",
                noWinner: "Couldnt determine the winner",
                hostedBy: "Hosted by {user}",
                winners: "winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        message.channel.send(`Giveaway starting in ${channel}`)
    }
}