CREATE DATABASE discordBot;

CREATE TABLE Guilds (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    ownerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT 'wi ',
    adminRole VARCHAR(100) DEFAULT 'admin',
    modLogId VARCHAR(100)
);