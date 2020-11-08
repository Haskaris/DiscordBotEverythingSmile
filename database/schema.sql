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
    modLogId VARCHAR(100),
    nameSuffix VARCHAR(10) DEFAULT 'ous'
);

CREATE TABLE XPTable (
    guildId VARCHAR(100) NOT NULL,
    memberId VARCHAR(100) NOT NULL,
    lvl INT DEFAULT 1,
    xp INT DEFAULT 0,
    PRIMARY KEY  (`guildId`,`memberId`)
);