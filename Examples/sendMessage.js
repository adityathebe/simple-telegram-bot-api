require('dotenv').config();

const TelegramBot = require('../index');

const APIKEY = process.env.APIKEY || 'YOUR_TELEGRAM_API_KEY';
const BOTUSERNAME = process.env.BOTUSERNAME || 'YOUR_TELEGRAM_BOT_USERNAME';
const RECEIVER = process.env.RECEIVER || '12345678';

const bot = new TelegramBot(APIKEY, BOTUSERNAME);

bot
  .sendMessage(RECEIVER, 'hello world !')
  .then(console.log)
  .catch(console.error);
