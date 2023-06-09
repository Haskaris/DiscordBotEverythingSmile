require('dotenv').config();
const { Client } = require('discord.js');
const { ErelaClient } = require('erela.js');

//Création du client
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const StateManager = require('./utils/StateManager');

const { registerCommands, registerEvents, registerMusicEvents } = require('./utils/register');

(async () => {

    client.commands = new Map();

    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');

    await client.login(process.env.BOT_TOKEN);

    //Étudier en profondeur l'ajout de musique
    client.music = new ErelaClient(client, [
        {
            host: process.env.HOST,
            port: process.env.PORT,
            password: process.env.PASSWORD
        }
    ]);

    await registerMusicEvents(client.music, '../musicEvents');

    setInterval(StateManager.clearXPBlocker, 2500);
    setInterval(StateManager.clearShhh, 300000);
})();