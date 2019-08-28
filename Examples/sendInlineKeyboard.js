const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const TelegramBot = require('../index');

const APIKEY = process.env.APIKEY || 'YOUR_TELEGRAM_API_KEY';
const BOTUSERNAME = process.env.BOTUSERNAME || 'YOUR_TELEGRAM_BOT_USERNAME';
const RECEIVER = process.env.RECEIVER || '12345678';

const bot = new TelegramBot(APIKEY, BOTUSERNAME);

const message = 'Hello World!';
const inlineKeyboardMarkup = TelegramBot.makeInlineKeyboardMarkup([
  { text: 'Button 1', payload: 'payload1' },
  [{ text: 'Button 2', payload: 'payload2' }, { text: 'Button 3', payload: 'payload3' }],
]);

bot
  .sendButton(RECEIVER, inlineKeyboardMarkup, message)
  .then(console.log)
  .catch(console.error);
