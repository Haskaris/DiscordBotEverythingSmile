const { EventEmitter } = require('events');
const connection = require('../../database/db');

//Variable globale
let guildAdminRole = new Map();
let guildPrefix = new Map();
let guildSuffix = new Map();
let guildShhh = new Map();

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

    shhhUpdated(guildId, member) {
        let shhh = guildShhh.get(guildId);
        //S'il n'y en avait pas déjà
        if (shhh == null) {
            shhh = new Array();
        }
        if (shhh.indexOf(member) == -1) {
            shhh.push(member);
            guildShhh.set(guildId, shhh);
        } 
    }

    shhhRemove(guildId, member) {
        let shhh = guildShhh.get(guildId);
        //S'il n'y en avait pas déjà
        if (shhh == null) return;
        const index = shhh.indexOf(member);
        if (index > -1) {
            shhh.splice(index, 1);
            guildShhh.set(guildId, shhh);
        } 
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

    getShhh() {
        return guildShhh;
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = new StateManager();