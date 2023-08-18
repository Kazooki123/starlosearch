const { Client } = require("discord.js");
const client = new discordJs.Client();

const TOKEN = 'MTEzMjIzNTEyMjg2Mzc2NzYyMw.G330_L.SxtQ9pEjaxBB7eYxmGldfY7JqA50nTDlL6H0jw';

client.once('ready', () => {
  console.log('Elixe is online!');
});

client.on('message', message => {
  if (message.content === '/help') {
    message.channel.send('Hello! I am Elixe, your friendly search engine bot. How can I assist you today?');
  }
});

client.login(TOKEN);
