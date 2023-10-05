import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";

export default {
	name: "purge",
	description: "purge messages from channel",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [{ name: "count", description: "please specify a number of message you want to delete", required: false, type: ApplicationCommandOptionType.Number }],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        await interaction.reply({content : "Start to deleting " , ephemeral : true}).catch(Err => console.log("can't"))
		let messageCount = interaction.options.get("count")?.value?Number(interaction.options.get("count").value):100;        
        if ( messageCount >= 100 ) {
            let loops = Math.ceil(messageCount / 100)
            let deleted = messageCount - 100
            for (let index = 0; index < loops; index++) {
                let count = 0
                if(deleted >= 0) count = 100
                else count = deleted                
               await interaction.channel.bulkDelete(count).catch(err => null);
             }
        } else   await interaction.channel.bulkDelete(messageCount).catch(err => null);
        await interaction.editReply({content : "Succefully deleted " + messageCount + " messages! 🫡" }).catch(Err => console.log("can't"))
	}
};
