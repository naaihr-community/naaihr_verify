(async () => {
    const { Intents } = require("discord.js");
    const Bot = require("./src/classes/Bot");
    const mongoose = require("mongoose");

    const client = new Bot({ 
        partials: ['MESSAGE', 'CHANNEL'],
        fetchAllMembers: false,
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES]    
    });
    
    const mongo = client.config.mongo;
    const connection = await mongoose.connect(`mongodb://${mongo.user}:${encodeURIComponent(mongo.password)}@${mongo.host}/${mongo.database}?ssl=false`, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connection = connection;

    const { registerEvents, registerCommands } = require("./src/functions/register");
    await registerEvents(client, '../events');
    console.info(`Registered ${client.commands.size} commands`, "COMMANDS")

    await client.login(client.config.token);
})();