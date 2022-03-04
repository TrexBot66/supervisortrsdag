const Discord = require("discord.js");
const config = require("../../../config.json");
module.exports = {
    name: "yetkili-bilgi",
    aliases: ["yt-bilgi", "yetkililer"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply('Geçerli yetkin olmalı!')
        let ses = message.guild.members.cache.filter(x => x.voice.channel).size
        let role =  guild.roles.cache.find(rol => rol.id === config.registration.staff)
        let notag = message.guild.members.cache.filter(x => {
            return !x.user.username.includes("a") && x.voice.channel
        }).size
        let yetkili = message.guild.members.cache.filter(x => {
            return x.user.username.includes("a") && x.voice.channel && x.roles.cache.has(config.registration.staff)
        }).size
        message.reply({ embeds: [embed.setDescription(`          
\`❯\` Sunucuda toplam **${role.members.size}** yetkili bulunmaktadır!
\`❯\` Ses kanallarında toplam **${yetkili}** yetkili bulunmaktadır!
`)] })
    }
}