const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["sayy", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply('Geçerli yetkin olmalı!')
        let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
        let uye = message.guild.memberCount
        var tag = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let boost = message.guild.premiumSubscriptionCount;
        message.reply({ embeds: [embed.setDescription(`
    \`●\` Sunucumuzda **${uye}** üye ve **${aktif}** aktif bulunuyor.
    \`●\` Seste **${sesli}** kullanıcı bulunuyor.
    \`●\` Sunucuda **${tag}** taglı bulunuyor.
    \`●\` Sunucuya **${message.guild.premiumSubscriptionCount}** boost basılmış.
    `)] });
      
    }
}