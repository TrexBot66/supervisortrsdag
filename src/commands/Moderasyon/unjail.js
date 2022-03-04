const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");

module.exports = {
    name: "unjail",
    aliases: ["unjail", "karantina-çıkart", "uj", "ceza-kaldır"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply('Geçerli yetkin olmalı!')
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (config.penals.jail.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.jail.limit) return message.reply({ embeds: [embed.setDescription("Saatlik özel rol verme sınırına ulaştın!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Bu komutu kendinizde kullanamazsınız.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        
        guild.members.cache.get(member.id).roles.add(config.youtube.üye);
        guild.members.cache.get(member.id).roles.remove(config.penals.jail.roles);
        
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından karantinadan çıkarıldı.`)] }).catch((err) => console.log(err), client.tick(message))
        if (config.bot.dmMessages) member.send(`**${message.guild.name}** sunucumuzda cezanız, **${message.author.tag}** yetkilisi tarafından kaldırıldı.`).catch(() => {});
        client.channels.cache.get(config.penals.jail.log).send({ embeds: [embed.setDescription(`     
        ${member} kullanıcısı ${author} tarafından karantinadan çıkarıldı.
             
        Kullanıcı: ${member} - \`(${member.id})\`
        Yetkili: ${author} - \`(${author.id})\`
        Tarih: \`Bulunamadı.\``)] });   
        if (config.penals.jail.limit > 0) {
            if (!limit.has(author.id)) limit.set(author.id, 1);
            else limit.set(author.id, limit.get(author.id) + 1);
            setTimeout(() => {
                if (limit.has(author.id)) limit.delete(author.id);
            }, 1000 * 60 * 60)
        };
    }
};
