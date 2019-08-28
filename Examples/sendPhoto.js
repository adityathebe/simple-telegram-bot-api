const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const TelegramBot = require('../index');

const APIKEY = process.env.APIKEY || 'YOUR_TELEGRAM_API_KEY';
const BOTUSERNAME = process.env.BOTUSERNAME || 'YOUR_TELEGRAM_BOT_USERNAME';
const RECEIVER = process.env.RECEIVER || '12345678';

const bot = new TelegramBot(APIKEY, BOTUSERNAME);

const imageUrl = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png';
const imageCaption = 'Arsenal Football Club';
bot
  .sendPhoto(RECEIVER, imageUrl, imageCaption)
  .then(console.log)
  .catch(console.error);
