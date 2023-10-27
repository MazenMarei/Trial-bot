// import { client } from "../index.js";
import fetch  from "node-fetch";
import { ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";
import config from "../config.js";
interface apiResponse  {
    "success": Boolean,
    "player": {
      "uuid": String
      "displayname": String,
      "rank": String,
      "packageRank":String, 
      "newPackageRank": String,
      "monthlyPackageRank":String,
      "firstLogin": Number,
      "lastLogin": Number,
      "lastLogout": Number,
      "stats": Object
    }
  }
export default {
	name: "hypixel",
	aliases: ["hpixel"],
	description: "displays information about a specified hypixel user",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	function: async function ({ message, args }: { message: Message; args: any }) {
       let data = await fetch("https://api.hypixel.net/player?uuid=68d2b739-3744-4c4e-ad00-f60f33ec8c43", {
        headers: {"API-Key":config.hypixelApiKey}
       }).then((r) => r.json())  as apiResponse;
       console.log(data.player)

		
	},
} as any;
