
import { client } from "../../index.js";
import levelsModel from "../../models/level.js";


export default {
	name: "ready",
	description: "client ready event",
	once: true,
	function: async function () {
    setInterval(async () => {
        let allGuilds = client.levelsCache.map(d => ({guildId:d.guildId, memberId: d.memberId}));
        if(allGuilds.length === 0) return;
        let allGuildData = await levelsModel.find({ $or: allGuilds});
        await client.levelsCache.map(async (d) => {
        let spefectedData = allGuildData.find(o => o.guildId === d.guildId && o.memberId === d.memberId);
         if(spefectedData) {
            spefectedData.messageCount += d.count;
            await spefectedData.save();
         }
         else {  await new levelsModel({ guildId: d.guildId, memberId: d.memberId, messageCount: d.count,}).save();}
       
       })
       await  client.levelsCache.clear();
          


    }, 10 * 2000)
    }
} as any;
