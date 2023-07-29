// If you wanna use my Search engine and don't wanna use this, Simply delete it if you want to.
const Discord = require('discord.js');
const client = new Discord.Client();

// Replace 'YOUR_DISCORD_BOT_TOKEN' to your actual Discord bot token in the Discord developer portal.
// If you don't have a Discord bot yet simply create one.
const TOKEN = 'YOUR_DISCORD_TOKEN';

client.once('ready', () => {
  console.log('Elixe is online!');
});

client.on('message', message => {
  if (message.content === '/help') {
    message.channel.send('Hello! I am Elixe, your friendly search engine bot. How can I assist you today?');
  }
});

client.login(TOKEN);
