// import { client } from "../index.js";

import { APIActionRowComponentTypes, ActionRowBuilder, AnyAPIActionRowComponent, AnyComponent, AnyComponentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";

export default {
	name: "avatar",
	aliases: ["av"],
	description: "get users avatar",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	function: async function ({ message, args }: { message: Message; args: any }) {
        let user;
		if(args.length <= 0) user = await message.author
        else user = (await message.guild.members.fetch((args[0].match(/\d+/)).toString())).user
        let avatarEmbed = new  EmbedBuilder()
        .setAuthor({name : user.username ,iconURL : user.avatarURL()})
        .setTitle("Avatar!")
        .setURL(user.avatarURL())
        .setImage(user.avatarURL({size : 1024}))
        .setFooter({text : "requsted by " + message.author.username , iconURL : message.author.avatarURL()})

        let imageBtn = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("avatar url")
        .setURL(user.avatarURL({ size: 1024 }));
    let row = new ActionRowBuilder<ButtonBuilder>().addComponents(imageBtn);
    message.channel.send({ embeds: [avatarEmbed], components: [row] });

		
	},
} as any;
