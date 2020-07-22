require('dotenv').config();
const { Client } = require('discord.js');
const { ErelaClient } = require('erela.js');

//Création du client
const client = new Client();
const StateManager = require('./utils/StateManager');

const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/register');

(async () => {

    client.commands = new Map();

    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');

    await client.login(process.env.BOT_TOKEN);

    client.music = new ErelaClient(client, [
        {
            host: process.env.HOST,
            port: process.env.PORT,
            password: process.env.PASSWORD
        }
    ]);

    await registerMusicEvents(client.music, '../musicEvents');
})();