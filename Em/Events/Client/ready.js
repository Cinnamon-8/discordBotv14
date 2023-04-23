const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../Snippets/config.json");
require("colors");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('[+]'.green + ' MongoDB connection succesful.')
        }

        const activities = ["Another casual bot ", "Made by Cinnamon-8", "github.com/Cinnamon-8"];
        let i = 0;

        setInterval(() => client.user.setPresence({ activities: [{ name: activities[i++ % activities.length], type: ActivityType.Watching }] }), 15000);
        console.log(`[ONLINE]`.green + ` ${client.user.tag} is online in ${client.guilds.cache.size} servers! `);
    },
};