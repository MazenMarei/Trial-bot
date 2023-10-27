export default {
    name: "user",
    type: "user",
    function: async function ({ interaction }: { interaction: any }) {
        const { client } = await import("../index.js");
        interaction.reply("test");
    },
} as any;