const { EventEmitter } = require('events');
const connection = require('../../database/db');

//Variable globale
let guildAdminRole = new Map();
let guildPrefix = new Map();
let guildSuffix = new Map();

class StateManager extends EventEmitter {
    constructor(opts) {
        super(opts);
        connection
            .then((connection) => this.connection = connection)
            .catch(err => console.log(err));
    }

    adminRoleUpdated(guildId, role) {
        guildAdminRole.set(guildId, role);
    }

    prefixUpdated(guildId, prefix) {
        guildPrefix.set(guildId, prefix);
    }

    suffixUpdated(guildId, suffix) {
        guildSuffix.set(guildId, suffix);
    }

    getAdminRole() {
        return guildAdminRole;
    }

    getPrefix() {
        return guildPrefix;
    }

    getSuffix() {
        return guildSuffix;
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = new StateManager();