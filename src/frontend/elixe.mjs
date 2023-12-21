import { Client } from 'discord.js';
const client = new discordJs.Client();

const TOKEN = 'empty';

client.once('ready', () => {
  console.log('Elixe is online!');
});

client.on('message', message => {
  if (message.content === '/help') {
    message.channel.send('Hello! I am Elixe, your friendly search engine bot. How can I assist you today?');
  }
});

client.login(TOKEN);
