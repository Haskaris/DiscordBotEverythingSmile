CREATE DATABASE discordBot;

USE discordBot; 

--Table contenant tous les serveurs
CREATE TABLE Guilds (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    ownerId VARCHAR(100) NOT NULL
);

--Table contenant les configurables important de chaque serveurs
CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT 'wi ',
    adminRole VARCHAR(100) DEFAULT 'admin',
    nameSuffix VARCHAR(10) DEFAULT '',
    modChannelId VARCHAR(100) DEFAULT '',
    roleChannelId VARCHAR(100) DEFAULT ''
);

--Table contenant les liaisons de l'assignation de role
CREATE TABLE GuildRoleEmoji (
    guildId VARCHAR(100) NOT NULL,
    roleId VARCHAR(100) NOT NULL,
    emoji VARCHAR(100) NOT NULL,
    PRIMARY KEY (`guildId`, `roleId`)
);

--Table contenant les niveau et les xp de chaque personne sur chaque serveur
CREATE TABLE XPTable (
    guildId VARCHAR(100) NOT NULL,
    memberId VARCHAR(100) NOT NULL,
    lvl INT DEFAULT 1,
    xp INT DEFAULT 0,
    PRIMARY KEY (`guildId`, `memberId`)
);