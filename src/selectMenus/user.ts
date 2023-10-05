import { AnySelectMenuInteraction, CommandInteraction } from "discord.js"; // Import CommandInteraction type
import { log } from "../utils/logging.js";
export default {
    id: "userMenu",
    cooldown: 0,
    function: async function ({ interaction, choices }: { interaction: AnySelectMenuInteraction, choices: any }) { // Add type annotations
        let data = (await import("../slashCommands/user.js")).default.userData
        let userData = data.get(interaction.user.id)
        switch (interaction.values[0]) {
            case "personal":     
                await interaction.reply({embeds : [userData.personalEmbed] , ephemeral : true})
                break;
            case "guild":
                await interaction.reply({embeds : [userData.guildEmbed], ephemeral : true})

                break;
            case "roles":
               await interaction.reply({embeds : [userData.rolesEmbed], ephemeral : true})
                break;

        }
    }
};
