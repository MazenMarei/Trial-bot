import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder,Collection, GuildMember } from "discord.js";
import { client } from "../../index.js";
import { log } from "../../utils/logging.js";
const userData = new Map()
 
export default {
    userData : userData,
	name: "ban",
	description: "ban a user from the guild",
	permissions: ["Administrator"],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [
        { name: "user", description: "please specify a user", required: true, type: ApplicationCommandOptionType.User },
        { name: "reason", description: "please specify a reason", required: false, type: ApplicationCommandOptionType.String }
    ],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        let user = (await interaction.guild?.members.fetch((interaction?.options?.get("user")?interaction.options.get("user").user: interaction.user)?.id));
        if(user?.roles.highest >= interaction.guild?.members.me?.roles.highest || user.id == interaction.guild?.ownerId) return interaction.reply({content : "I'm unable to ban a user who has the same or higher role as me. 😕"})
        let banUser = interaction.guild?.members.ban(user, {reason : interaction?.options?.get("reason").value.toString()?interaction?.options?.get("reason").value.toString():undefined}).catch(err =>  {
            interaction.reply({content : "I'm unable to ban this user! 😔"}) 
            return false})
        if(banUser) return interaction.reply({content : "Succefully ban this user " + user?.user.username + " from the guild! 🫡"})

    }

}