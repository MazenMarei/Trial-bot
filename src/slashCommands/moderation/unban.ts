import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder,Collection, GuildMember } from "discord.js";
import { client } from "../../index.js";
import { log } from "../../utils/logging.js";
const userData = new Map()
 
export default {
    userData : userData,
	name: "unban",
	description: "unban a user from the guild",
	permissions: ["Administrator"],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [
        { name: "user", description: "please specify a user", required: true, type: ApplicationCommandOptionType.String },
        { name: "reason", description: "please specify a reason", required: false, type: ApplicationCommandOptionType.String }
    ],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        let user = interaction.options.get("user").value.toString()
        let bannedUser = await interaction.guild.bans.fetch(user)
        if(!bannedUser) return interaction.reply({content : "I'm unable to find this user in ban list! 😔"})
        let unban = await interaction.guild.bans.remove(user).catch(err => {
            interaction.reply({content : "I'm unable to unban this user! 😔"})
            return false
        })
        if(unban) return interaction.reply({content : "Succefully unban this user " + bannedUser.user.username + " from the guild! 🫡"})
    }

}