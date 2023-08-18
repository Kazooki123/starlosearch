const { Client } = require("discord.js");
const client = new discordJs.Client();

// Replace it with your Discord bot token
// To get it simple go to Discord's developer portal and make a bot.
const TOKEN = 'YOUR DISCORD TOKEN';

client.once('ready', () => {
  console.log('Elixe is online!');
});

client.on('message', message => {
  if (message.content === '/help') {
    message.channel.send('Hello! I am Elixe, your friendly search engine bot. How can I assist you today?');
  }
});

client.login(TOKEN);
