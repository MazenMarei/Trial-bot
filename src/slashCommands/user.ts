import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder,Collection, GuildMember } from "discord.js";
import { client } from "../index.js";
import { log } from "../utils/logging.js";
const userData = new Map()
 
export default {
    userData : userData,
	name: "user",
	description: "get user information",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [{ name: "user", description: "please specify a user", required: false, type: ApplicationCommandOptionType.User }],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
                    let user = (await interaction.guild.members.fetch((interaction.options.get("user")?interaction.options.get("user").user: interaction.user).id)); 
                    var flags:string = "" ;
                    if(user.user.bot) flags += "Bot";
                    (await user.user.fetchFlags()).toArray().map(a => flags += `${a}\n`)     
                    //// personalEmbed
                    let personalEmbed = new EmbedBuilder()
                    .setColor(`Blue`)
                    .setAuthor({name : user.user.username , iconURL : user.avatarURL()})
                    .setTimestamp()
                    .setThumbnail(interaction.user.avatarURL())
                    .addFields(
                        {name : "> userID" , value : `\`${user.id}\`` , inline : true},
                        {name : "> username" ,value : `__${user.user.username}__` , inline : true},
                        {name : "> discriminator", value : `\`${user.user.discriminator}\``, inline : true}, 
                        {name : "> Flags" , value :flags, inline : true},
                        {name : "> Joined Discord" , value :`<t:${Math.ceil(Date.parse(user.user.createdAt.toISOString()) /1000)}:R>`, inline : true},
                        );
                    if(user.user.discriminator !== "0")  personalEmbed.addFields({name : "> discriminator", value : `\`${user.user.discriminator}\``, inline : true},)
                    let menu =  new StringSelectMenuBuilder()
                    .setCustomId("userMenu")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .setPlaceholder("Please specify the type of user data")
                    .setOptions([
                        {label: "personal data" ,value : "personal",default : false  , description: "to display personal data", emoji : "👤" },
                        {label : "guild data"   ,value : "guild"   ,default : false , description: "to display guild data", emoji : "👥"},
                        {label : "roles"        ,value : "roles"   ,default : false , description: "to display bot data", emoji : "🗒️"}
                    ])

                    /// guild information Embed 
                   let invites = (await interaction.guild.invites.fetch()).filter(a => a.inviterId === user.id)                   
                    let guildEmbed = new EmbedBuilder()
                    .setColor("Blue")
                    .setTimestamp()
                    .setThumbnail(interaction.guild.iconURL())
                    .addFields(
                        {name : "> Roles count" , value :user.roles.cache.size.toString(),inline : true},
                        {name : "> Invites count" , value : (invites.size.toString().length > 0 ? invites.size.toString():"0"), inline : true},
                        {name : "> Invites code" , value : (invites.map(a => a.code).join("\n").length > 0?invites.map(a => a.code).join("\n"):"null"), inline : true},
                        {name : "> Joined at" , value :`<t:${Math.ceil(Date.parse(user.joinedAt.toISOString()) /1000)}:R>` , inline : true},
                    );
                    
                /// roles emebed
                let userRoles = "";
                let i= 0;
                user.roles.cache.map((a) => {userRoles += `[${(i +1)}] | <@&${a.id}>\n` ; i++})
                let rolesEmbed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(userRoles)
                    let menuRow =  new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
                   await interaction.reply({ components: [menuRow]  })
                    userData.set(interaction.user.id , {user : user, personalEmbed : personalEmbed  , guildEmbed : guildEmbed , rolesEmbed : rolesEmbed})
                        
                }           
};
