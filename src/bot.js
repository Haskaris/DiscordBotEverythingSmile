require('dotenv').config();
const { Client } = require('discord.js');

//Création du client
const client = new Client();
const StateManager = require('./utils/StateManager');

const { registerCommands, registerEvents } = require('./utils/register');

(async () => {

    client.commands = new Map();

    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');

    await client.login(process.env.BOT_TOKEN);
})();