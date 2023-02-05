import require

const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content.startsWith('!price')) {
    const args = msg.content.split(' ');
    const symbol = args[1];
    const apiKey = '1ZWGZA9H9W84Z1GY';

    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
      const data = response.data;

      if (data['Error Message']) {
        msg.reply(`Error: ${data['Error Message']}`);
        return;
      }

      const price = data['Global Quote']['05. price'];
      msg.reply(`The current price of ${symbol} is $${price}.`);
    } catch (error) {
      msg.reply(`Error: ${error.message}`);
    }
  }
});

client.login('your-token-here');