import colors from "colors";
import { log } from "../../utils/logging.js";
import { client } from "../../index.js";
import config from "../../config.js";
import { EmbedBuilder, GuildMember, GuildTextBasedChannel, Message, PermissionsBitField } from "discord.js";
import guildData from "../../models/guild.js"
export default {
	name: "guildMemberAdd",
	description: "Client on receive message event",
	once: false,
	function: async function (member: GuildMember) { 
        
        let welcomeChannel =await member.guild.channels.cache.get(config.joinChannelID) as GuildTextBasedChannel;
        if (!welcomeChannel) return;
        const embed = new EmbedBuilder()
        .setTitle(`Welcome to ${member.guild.name}`)
        .setImage(member.user.avatarURL())
        .setTimestamp()
        welcomeChannel.send({embeds : [embed]})
        let newData = await guildData.create({
            member : member.user.username,
            guildId : member.guild.id
        })
            


    }
}