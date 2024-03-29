const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
    name: "top-kayıt",
    aliases: ["top"],
    execute: async (client, message, args, embed) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle geçerli yetkin olmalı.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

        const member = message.mentions.members.first() || message.author;

        let top = [...message.guild.members.cache.filter(member => db.get(`toplam_${member.id}`)).values()].sort((member1, member2) => Number(db.get(`toplam_${member2.id}`))-Number(db.get(`toplam_${member1.id}`))).slice(0, 15).map((uye, index) => `\`${index+1}.\` ${uye} | **${db.get(`toplam_${member.id}`) || "0"}** kayıt (**${db.get(`erkek_${member.id}`) || "0"}** erkek **${db.get(`kadın_${member.id}`) || "0"}** kadın`).join('\n');
        if(!top) return message.reply({ embeds: [embed.setDescription("Veri tabanı boş gözüküyor!")]})
        message.reply({ embeds: [embed.setDescription(top)]})

    }
}