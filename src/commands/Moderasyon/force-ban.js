const db = require('quick.db');
const config = require("../../../config.json")

module.exports = {
    name: "force-ban",
    aliases: ["kalıcı-ban", "forceban", "fban"],
    guildowner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        let member = message.mentions.members.first() || guild.members.cache.get(args[0]);
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply('Geçerli yetkin olmalı!')
        if (!member) return message.reply({ embeds: [embed.setDescription(`Öncelikle kalıcı banlanacak kullanıcıyı belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let reason = args.slice(1).join(' ')
        if (!reason) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir sebep belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        guild.members.ban(member.id, { reason: reason })
        db.add(`ceza_${guild.id}`, 1)
        message.reply({ content: (`**${member}** **(${member.id})** kullanıcısı ${author} tarafından **"${reason}"** sebebiyle sunucudan kalıcı olarak banlandı! (Ceza Numarası: \`#${db.fetch(`ceza_${guild.id}`)}\`)`)}) 
        client.channels.cache.get(config.penals.ban.log).send({ embeds: [embed.setDescription(`     
        ${member ? member.toString(): member.username} kullanıcısı ${author} tarafından kalıcı olarak sunucudan yasaklandı.
    
        Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
        Yasaklanan: ${member ? member.toString() : ""} - \`(${member.id})\`
        Yasaklayan Yetkili: ${author} - \`(${author.id})\`
        Yasaklama Sebebi: \`${reason}\`
        Yasaklama Tarihi: \`${moment(Date.now()).format("LLL")}\``)] });
        db.set(`ban.${member.id}`, true)
    }
}