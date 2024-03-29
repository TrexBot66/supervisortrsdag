const { MessageEmbed } = require("discord.js")
const config = require("../../../config.json");

module.exports = {
    name: "nerede",
    aliases: ["ss", "n", "nerde"],
    execute: async (client, message, args, embed, author, channel, guild) => {

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply('Geçerli yetkin olmalı!')

if(!member) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let kanal = member.voice.channel
    if(!kanal) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı herhangi bir sesli kanalda bulunmuyor.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
let microphone = member.voice.selfMute ? "kapalı" : "açık";
let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join(", ")

kanal.createInvite().then(invite =>
    message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı \`${kanal.name}\` kanalında bulunmakta.

\`Mikrofon Durumu:\` ${microphone}
\`Kulaklık Durumu:\` ${headphones}

\`>\` Odadaki Kullanıcılar: ${sestekiler}
[Kanala bağlanmak için tıkla!](https://discord.gg/${invite.code})`)] }));


    }
}