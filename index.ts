import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import {rolldice} from './functions'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    const guildID = '771746615920427058';
    const guild = client.guilds.cache.get(guildID);
    let commands;

    if(guildID) {
        commands = guild?.commands
    } else{
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'You know what\'s going to happen, you bastard'
    });

    commands?.create({
        name: 'roll',
        description: 'rolls the digital dice',
        options: [
            {
                name: 'dicestring',
                description: 'The Ammount of dice to be rolled',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'modifier',
                description: 'Modifier to be added to the roll',
                required: false,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ],
    });
    console.log('Natbot ready to roll!')
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return;
    }

    const { commandName, options } = interaction;
    if (commandName === 'ping'){
        interaction.reply({
            content: 'pong'
        });
    } else if(commandName === 'roll'){
        const [dicecount, dicetype] = options.getString("dicestring")?.split("d")!
        const modifier = options.getNumber("modifier") || 0;
        interaction.reply({
            content: `${dicecount}d${dicetype} +${modifier} => ${(rolldice(+dicecount, +dicetype) + modifier).toString()}`
        })
    };
});

client.login(process.env.TOKEN)