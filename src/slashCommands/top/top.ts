import fetch  from "node-fetch";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import levelsModel from "../../models/level.js";
import { client } from "../../index.js";
export default {
	name: "leaderboard",
	description: "displays information about a specified hypixel user",
	permissions: [""],
	roleRequired: "",
	cooldown: 0, 
	options: [],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        await interaction.deferReply().catch((err) => null);
      let guildCache =  client.levelsCache.filter(d => d.guildId === interaction.guildId).toJSON();

      for (let index = 0; index < guildCache.length; index++) { const cache = guildCache[index]; let findData = await levelsModel.findOne({ guildId: cache.guildId, memberId: cache.memberId }); if(findData) { console.log(cache.count); findData.messageCount += cache.count; await findData.save() } else { await new levelsModel({ guildId: cache.guildId, memberId: cache.memberId, messageCount: cache.count }).save() }; client.levelsCache.delete(`${cache.guildId}#${cache.memberId}`) }
      let guildLevelData = await (await levelsModel.find({ guildId: interaction.guildId, })).sort((a,b) => b.messageCount - a.messageCount).slice(0,9)
      let text = `# Top 10 Message Senders\n`;
      if(guildLevelData.length === 0 ) text += `# No messages are being tracked.`
      for (let index = 0; index < guildLevelData.length; index++) {
        const memberData = guildLevelData[index];
        let user = await client.users.fetch(memberData.memberId).catch(err => null);
        text += `# **${index === 0 ? "👑" : `${index + 1}` }** | **${user.username}:** \`${memberData.messageCount}\`\n`
      }
      await interaction.editReply({
        embeds: [
            new EmbedBuilder().setColor("Aqua").setDescription(text).setTimestamp().setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() }).setThumbnail(interaction.guild.iconURL())
        ]
      })
          
	},
} as any;
