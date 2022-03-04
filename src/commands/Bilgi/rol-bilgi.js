const db = require("quick.db");
const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: 'rol-bilgi',
    aliases: ["rol-info", "rolbilgi"],
    execute: async (client, message, args, embed, author, channel, guild) => {

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply('Geçerli yetkin olmalı!')
      
    let rol = args[0]
    if (!rol) return message.reply({ content: `Öncelikle geçerli bir rol ID belirtmelisin.`})

    let roluyeler = message.guild.members.cache.filter(piece => piece.roles.cache.has(rol)).size

    message.channel.send(`
    **❯** <@&${rol}> \`(${rol})\` rolünün bilgileri;
    **❯** Rol rengi: \`${message.guild.roles.cache.get(rol).hexColor}\` 
    **❯** Rol açılma tarihi: \`Bulunamadı.\` 
    **❯** Rol kullanıcı sayısı: \`${roluyeler}\`
    ─────────────────
    **-** Roldeki kullanıcılar:
    ${message.guild.roles.cache.get(rol).members.map(m=> m .toString()+ " - " + "("+m.id+")").join("\n")}
    `, { split: true }).catch(err => message.channel.send(`Bir hata oluştu!

Hata sebebi: ${err}`));

   }
}