CREATE DATABASE discordBot;

USE discordBot; 

CREATE TABLE Guilds (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    ownerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT 'wi ',
    adminRole VARCHAR(100) DEFAULT 'admin',
    nameSuffix VARCHAR(10) DEFAULT '',
    modChannelId VARCHAR(100),
    roleChannelId VARCHAR(100)
);

CREATE TABLE GuildRoleEmoji (
    guildId VARCHAR(100) NOT NULL,
    roleChannelId VARCHAR(100) NOT NULL,
    messageId VARCHAR(100) NOT NULL,
    roleId VARCHAR(100) NOT NULL,
    emoji VARCHAR(100) NOT NULL,
    PRIMARY KEY (`guildId`, `roleChannelId`, `messageId`, `roleId`)
);

CREATE TABLE XPTable (
    guildId VARCHAR(100) NOT NULL,
    memberId VARCHAR(100) NOT NULL,
    lvl INT DEFAULT 1,
    xp INT DEFAULT 0,
    PRIMARY KEY (`guildId`,`memberId`)
);