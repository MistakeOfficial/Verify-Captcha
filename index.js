const { Client } = require("discord.js");

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('WayBackHome')
})

app.listen(3000)




const { token, guildId } = require("./config");

const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

client.on("ready", async () => {
  console.log(`${client.user.tag} is Online !!`);

  let guild = client.guilds.cache.get(guildId);
  if (guild) {
    guild.commands.set([
      {
        name: "ping",
        description: `check ping of bot`,
        type: "CHAT_INPUT",
      },
      {
        name: "setup",
        description: `setup the verification system`,
        type: "CHAT_INPUT",
      },
    ]);
  }
  // loading
  require("./verify")(client);
});

client.login(token || process.env.token);

