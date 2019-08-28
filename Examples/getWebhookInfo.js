const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const TelegramBot = require('../index');

const APIKEY = process.env.APIKEY || 'YOUR_TELEGRAM_API_KEY';
const BOTUSERNAME = process.env.BOTUSERNAME || 'YOUR_TELEGRAM_BOT_USERNAME';

const bot = new TelegramBot(APIKEY, BOTUSERNAME);

bot
  .getWebhookInfo()
  .then(console.log)
  .catch(console.error);
