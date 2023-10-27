import { client } from "../../index.js";
import {  Message } from "discord.js";

export default {
	name: "messageCreate",
	description: "Client on receive message event",
	once: false,
	function: async function (message: Message) {
	if(message.author.bot || !message.guild) return;
    let counterCache = client.levelsCache.find(d => d.guildId === message.guildId && d.memberId === message.author.id);
    if(counterCache) counterCache.count++
    else client.levelsCache.set(`${message.guildId}#${message.member.id}`, { guildId: message.guild.id, memberId: message.member.id, count: 1 });
	},
};
