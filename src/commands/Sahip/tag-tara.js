const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "tag-tara",
    aliases: ["tagtara", "tt"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply('Geçerli yetkin olmalı!')
    let rol = config.roles.team
    let tag = config.registration.GuilDTag
    let tag2 = config.registration.GuilDTag2
    let tag3 = config.registration.GuilDTag3
    let tag4 = config.registration.GuilDTag4
    let etiket = config.registration.GuildDiscrim 
    let taglılar = message.guild.members.cache.filter(s => s.user.discriminator === etiket || s.user.username.includes(tag3) && s.user.username.includes(tag2) && s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    message.reply({ embeds: [embed.setDescription(`
**Taglı Taratma İşlemi Başladı!**

\`-\` Kullanıcı adında \`${tag}\`, \`${tag2}\` ve etiketinde \`#${etiket}\` bulunduran kullanıcılara taglı rolü verildi.
\`-\` Taglı rolü alınacak kullanıcı yok.
`)] }).catch((err) => console.log(err), client.ytick(message))

    }
}