const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super('help', 'miscellaneous', []);
    }
}