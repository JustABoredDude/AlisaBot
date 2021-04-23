const Discord = require('discord.js')
const Client = new Discord.Client({ partials: ['MESSAGE','CHANNEL','REACTION'] })
const prefix = 'a!'
const fs = require('fs');

Client.commands = new Discord.Collection();
//-----

const { GiveawaysManager } = require('discord-giveaways')
Client.giveawaysManager = new GiveawaysManager(Client, {
    storage: "./giveaway.json",
    updateCountdownEvery: 10000, //1000ms = 1s
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#3de214",
        reaction: "🎉"
    }
});

Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command)
}
Client.on('ready', ()=>{
    console.log('Ready')
    Client.user.setActivity('Angels is mine and mine alone no one can steal him from me', { type: "PLAYING"}).catch(console.error)
})
Client.on('message', async message => {
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const command = Client.commands.get(commandName) ||
         Client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, prefix, args, Client);
    } catch (error) {
        console.error(error);
        message.reply('Error: '+ error);
    }
})

Client.login("ODI5NjA2ODAyMTgyMjQyMzM0.YG6lig.IHMp-8gyGPSG4M8hhzhjak8KomA")