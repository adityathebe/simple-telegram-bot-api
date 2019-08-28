const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const TelegramBot = require('../index');

const APIKEY = process.env.APIKEY || 'YOUR_TELEGRAM_API_KEY';
const BOTUSERNAME = process.env.BOTUSERNAME || 'YOUR_TELEGRAM_BOT_USERNAME';
const RECEIVER = process.env.RECEIVER || '12345678';

const bot = new TelegramBot(APIKEY, BOTUSERNAME);

const message = 'Choose your favorite Premier League club ...';
const replyKeyboardMarkup = TelegramBot.makeReplyKeyboardMarkup([
  [{ text: 'Arsenal' }],
  [{ text: 'Man City' }, { text: 'Man United' }],
  [{ text: 'Liverpool' }, { text: 'Chelsea' }, { text: 'Spurs' }],
]);

bot
  .sendButton(RECEIVER, replyKeyboardMarkup, message)
  .then(console.log)
  .catch(console.error);
