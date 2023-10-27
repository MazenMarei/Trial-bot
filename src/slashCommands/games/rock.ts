import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, StringSelectMenuBuilder,Collection, GuildMember, ButtonBuilder, ButtonStyle } from "discord.js";
import { client } from "../../index.js";
import { log } from "../../utils/logging.js";

export default {
	name: "roshambo",
	description: "rock paper scissors game",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
       let gameDate = [{name : "paper" , rock : true },{name : "rock" , scissor : true} , {name : "scissor" , paper : true}];
       let gameEmbed = new EmbedBuilder()
       .setColor("Blue")
       .setTimestamp()
       .setImage("https://cdn.discordapp.com/attachments/866187063895523349/1166141887434997780/R.jpg?ex=65496943&is=6536f443&hm=b143d29822a2abf799f1d68d36b51a28d5b44388d7d2e671c361ce57c3eb1a70&")
       .setTitle("Rock Paper scissors")

       let rockBtn = new ButtonBuilder()
       .setCustomId("rock")
       .setEmoji("🪨")
       .setLabel("Rock")
       .setStyle(ButtonStyle.Primary)

       let paperBtn = new ButtonBuilder()
       .setCustomId("paper")
       .setEmoji("📃")
       .setLabel("Paper")
       .setStyle(ButtonStyle.Primary)

       let scissorBtn = new ButtonBuilder()
       .setCustomId("scissor")
       .setEmoji("✂️")
       .setLabel("Scissor")
       .setStyle(ButtonStyle.Primary)


        let gameBtnAction = new ActionRowBuilder<ButtonBuilder>().addComponents(rockBtn,paperBtn,scissorBtn)
        let gameMsg = await interaction.reply({embeds : [gameEmbed] , components : [gameBtnAction]})


        let msgCollector = await gameMsg.awaitMessageComponent({time : 0 , filter : i=> i.user.id === interaction.user.id && ["rock" , "paper", "scissor"].includes(i.customId) })

        let userAns = gameDate.find(a => a.name === msgCollector.customId) 
        let botAns = gameDate[Math.floor(gameDate.length * Math.random())];
        
        
        if(Object.keys(userAns).includes(botAns.name)) await gameMsg.edit({embeds : [gameEmbed.setImage("https://cdn.discordapp.com/attachments/1161695101697916969/1166143767166849055/R.jpg?ex=65496b03&is=6536f603&hm=2d632389e2f5a81db111680e0091d7965da988c3ea9e835b9ab7abf35d38899f&")] , components : []})
        else if(botAns.name ==  userAns.name) await gameMsg.edit({embeds : [gameEmbed.setImage("https://cdn.discordapp.com/attachments/1161695101697916969/1166143767405928569/OIP.jpg?ex=65496b04&is=6536f604&hm=5dba9ef4d7f42c6c210cdd97d8896f62fcdb0ab228f2ab567a377ce41a8d7a81&")] , components : []})
        else await gameMsg.edit({embeds : [gameEmbed.setImage("https://cdn.discordapp.com/attachments/1161695101697916969/1166143767619842088/download.jpg?ex=65496b04&is=6536f604&hm=0b8a156dfffd379c28aff371741963b6053ed38bb9829c55a38b0e5d890d8e20&")] , components : []})
        
        
        




    }

}