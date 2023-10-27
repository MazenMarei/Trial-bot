import config from "../../config.js";
import colors from "colors";
import path from "path";
import { fileURLToPath } from 'url';
import { log, error } from "../../utils/logging.js";
import { client } from "../../index.js";
import { readdirSync, statSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { convertURLs } from "../../utils/windowsUrlConvertor.js";
import { CronJob } from 'cron';
import { Guild, GuildTextBasedChannel, TextChannel } from "discord.js";
interface Command {
	name: string;
	description: string;
	options: any[]; // You can replace "any" with the correct type for options
}

export default {
	name: "ready",
	description: "daily reminder event",
	once: false,
	function: async function () {
        let time = config.reminderTime.split(":")
        const job = new CronJob(`${time[1]} ${time[0]} * * *`,
        async function () {
           let Guild = (await client.guilds.fetch(config.dailyReminder.guild)) as Guild
           if(!Guild) return
           let channel = await Guild.channels.fetch(config.dailyReminder.channel)  as GuildTextBasedChannel
           if(!channel) return;
           await channel.send({content :"A daily reminder message has been sent!"})
        },
        null,
        true,
        "UTC+3"
    );
    }
}