const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

/**
 * Commande permettant les tests d'évenements
 */
module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('test', 'miscellaneous', []);
    }

    async run(client, message, args) {
        
    }
}