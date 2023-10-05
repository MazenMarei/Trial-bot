import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder,Collection, GuildMember } from "discord.js";
import { client } from "../../index.js";
import { log } from "../../utils/logging.js";
const userData = new Map()
 
export default {
    userData : userData,
	name: "kick",
	description: "kick a user from the guild",
	permissions: ["Administrator"],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [
        { name: "user", description: "please specify a user", required: true, type: ApplicationCommandOptionType.User },
        { name: "reason", description: "please specify a reason", required: false, type: ApplicationCommandOptionType.String }
    ],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        let user = (await interaction.guild?.members.fetch((interaction?.options?.get("user")?interaction.options.get("user").user: interaction.user)?.id));
        if(user?.roles.highest >= interaction.guild?.members.me?.roles.highest || user.id == interaction.guild?.ownerId) return interaction.reply({content : "I'm unable to kick a user who has the same or higher role as me. 😕"})
        let kickUser = interaction.guild?.members.kick(user).catch(err =>  {
            interaction.reply({content : "I'm unable to kick this user! 😔"}) 
            return false})
        if(kickUser) return interaction.reply({content : "Succefully kicked this user " + user?.user.username + " from the guild! 🫡"})
        
    }

}