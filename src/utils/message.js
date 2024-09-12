import { Collection } from "discord.js";
import xpCalc from "./xpCalc.js";
const users = new Collection();
// const database = new Collection();

export default async message => {
    try {
        const { client } = message;

        const db = client.database('users');
        const guilddb = client.database('guild');

        let guildData;
        try {
            guildData = await guilddb.findOne({ guildID: message.guild.id });
        } catch (e) {
            client.channels.cache.get('1283850272807981106')?.send(`${message.guild.id} id li sunucu verisini xp verirken çekemiyorum`);
            throw `${message.guild.id} id li sunucu verisini xp verirken çekemiyorum`
        }
        if (guildData?.levelDisable) return;

        const data = await db.findOne({ memberID: message.author.id });

        const { level, xp } = xpCalc(data ?? undefined);
        const channel = guildData?.levelChannelEnable ? !!guildData.levelChannelID ? client.channels.cache.get(guildData.levelChannelID) : message.channel : message.channel

        db.updateOne({ memberID: message.author.id }, { $set: { level, xp } }, { upsert: true }).then(() => {
            const text = guildData?.levelMessage.replace('{user}', `${message.member}`).replace('{user.mention}', `${message.member}`).replace('{user.name}', `${message.member.user.username}`).replace('{user.id}', `${message.member.id}`).replace('{user.discriminator}', `${message.member.user.discriminator}`).replace('{user.tag}', `${message.member.user.tag}`).replace('{member}', `${message.member}`).replace('{member.mention}', `${message.member}`).replace('{member.name}', `${message.member.displayName}`).replace('{member.id}', `${message.member.id}`).replace('{member.discriminator}', `${message.member.user.discriminator}`).replace('{member.tag}', `${message.member.user.tag}`).replace('{server}', `${message.guild.name}`).replace('{server.name}', `${message.guild.name}`).replace('{server.iconURL}', `${message.guild.iconURL({ size: 1024 })}`).replace('{server.icon}', `${message.guild.icon}`).replace('{server.member_count}', `${message.guild.memberCount}`);

            channel?.send(text);
        })
    } catch (e) {
        console.log(e)
    }
}