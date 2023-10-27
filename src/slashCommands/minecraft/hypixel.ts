import fetch  from "node-fetch";
import { ChatInputCommandInteraction, EmbedBuilder,SlashCommandStringOption } from "discord.js";
import config from "../../config.js";
const calculateBedWarsLevel = (exp) => { let level = 100 * Math.floor(exp / 487000); exp = exp % 487000; if (exp < 500) { return level + exp / 500; } level++; if (exp < 1500) { return level + (exp - 500) / 1000; } level++; if (exp < 3500) { return level + (exp - 1500) / 2000; } level++; if (exp < 7000) { return level + (exp - 3500) / 3500; } level++; exp -= 7000; return level + exp / 5000; };
const calculateSkywarsExactLevel = (xp) => { const xpThresholds = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000]; if (xp >= xpThresholds[xpThresholds.length - 1]) { return xpThresholds.length - 1 + (xp - xpThresholds[xpThresholds.length - 1]) / 10000; } else { for (let i = 0; i < xpThresholds.length; i++) { if (xp < xpThresholds[i]) { return i - 1 + (xp - xpThresholds[i - 1]) / (xpThresholds[i] - xpThresholds[i - 1]); } } } return 0; };
interface apiResponse  { "success": Boolean, "player": {"prefix": String, "uuid": String, "displayname": String, "rank": String, "packageRank":String, "newPackageRank": String, "monthlyPackageRank":String, "firstLogin": Number, "lastLogin": Number, "lastLogout": Number, "stats": {SkyWars: { skywars_experience:Number },Bedwars:{ Experience: Number }, Duels: { wins: Number }} } }
interface mojangApiResponse { "name": String | null, "id": | null, "path": | null, "errorMessage": | null};
const ranksString = { "MVP": "[MVP]", "VIP": "[VIP]", "VIP_PLUS": "[VIP+]", "MVP_PLUS": "[MVP+]", "SUPERSTAR": "[MVP++]" };
export default {
	name: "hypixel",
	description: "displays information about a specified hypixel user",
	permissions: [""],
	roleRequired: "",
	cooldown: 0, 
	options: [new SlashCommandStringOption().setRequired(true).setName("ign").setDescription("please specify a player name").setMaxLength(16)],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        await interaction.deferReply().catch((err) => null);
        let uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString("ign")}`).then((r) => r.json()).catch((err) => null) as mojangApiResponse;
        let hypixelProfile = await fetch(`https://api.hypixel.net/player?uuid=${uuid.id}`, { headers: {"API-Key":config.hypixelApiKey} }).then((r) => r.json()).catch((err) => null)  as apiResponse;
        if(uuid.errorMessage) return await interaction.editReply({ embeds: [new EmbedBuilder().setColor("DarkRed").setDescription(`**${uuid.errorMessage}**`)] });
        let rank = hypixelProfile.player.rank ? `[${hypixelProfile.player.rank}]` : ranksString[`${hypixelProfile.player.monthlyPackageRank}`] || ranksString[`${hypixelProfile.player.newPackageRank}`]  ||  ranksString[`${hypixelProfile.player.packageRank}`] || null;
		let level = `https://gen.plancke.io/exp/${hypixelProfile.player.displayname}.png`;
        let bedwarsLevel = calculateBedWarsLevel(hypixelProfile.player.stats.Bedwars.Experience);
        let SkywarsLevel = calculateSkywarsExactLevel(hypixelProfile.player.stats.SkyWars.skywars_experience);
        if(hypixelProfile.player.prefix &&  hypixelProfile.player.prefix !== "NONE") rank = hypixelProfile.player?.prefix?.replace(/\u00A7[0-9A-FK-OR]/ig, "");
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setTitle(`${rank} ${hypixelProfile.player.displayname}`)
                .setColor("Random")
                .setThumbnail(`https://crafatar.com/avatars/${uuid.id}`)
                .setDescription(`**Bedwars Level:** **${Math.floor(bedwarsLevel) || 0}**⭐\n**Skywars Level:** **${Math.floor(SkywarsLevel) || 0}**🛠️\n**Duels Wins:** **${hypixelProfile.player.stats.Duels.wins || 0}**🏆`) 
                .setImage(level)
            ]
        }).catch((err) => interaction.deleteReply().catch((err) => null));
	},
} as any;
