const moment = require("moment");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");

module.exports = {
    name: "sunucu-tag",
    aliases: ["tag"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        message.reply({ content: `Emoji Tagımız: ${config.registration.GuilDTag3}, \nYazı Taglarımız : ${config.registration.GuilDTag}, ${config.registration.GuilDTag2} ,\nEtiket Tagımız: #${config.registration.GuildDiscrim}`}) 
    }
}
