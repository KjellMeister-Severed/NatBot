import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log('Natbot ready to roll!')
})

client.on('messageCreate', (message) => {
    console.log('message sniffed!')
    if(message.content === 'Hello world!') {
        message.reply({
            content: 'Shut the fuck up!'
        })
    }
})

client.login(process.env.TOKEN)