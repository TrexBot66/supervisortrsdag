const config = require("../../../config.json")
const db = require('quick.db');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {
    name: "kullanıcı-bilgi",
    aliases: ["me", "bilgi", "kb"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]) || author;
        message.reply({ embeds: [embed.setDescription(`**❯ Kullanıcı Bilgileri**
        
• Kullanıcı: (<@${member.id}> - \`${member.id}\`)
• Hesap Kurulum Tarihi: \`${moment(message.member.createdAt).format('D MMMM YYYY')}\`
• Kullanıcının Durumu: \`Veri görüntülenemedi.\` 
• Giriş Yaptığı Cihaz: \`Veri görüntülenemedi.\`

**❯ Sunucu Bilgileri**

• Sunucuya Katılma Tarihi: \`${moment(member.joinedAt).locale("tr").format("LLL")} - (${moment(member.joinedAt).locale("tr").fromNow()})\`
• En Yüksek Rolü (${message.member.roles.highest})
`)] });

    }
}