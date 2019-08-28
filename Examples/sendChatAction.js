const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')});

const TelegramBot = require('../index');

const APIKEY = process.env.APIKEY || 'YOUR_TELEGRAM_API_KEY';
const BOTUSERNAME = process.env.BOTUSERNAME || 'YOUR_TELEGRAM_BOT_USERNAME';
const RECEIVER = process.env.RECEIVER || '12345678';

const bot = new TelegramBot(APIKEY, BOTUSERNAME);
const sleepForMs = ms => new Promise(a => setTimeout(a, ms));

(async () => {
  // Send Message
  await bot.sendMessage(RECEIVER, 'Hey! I am about to type something loooooong ...');
  const chatActionResponse = await bot.sendChatAction(RECEIVER, 'typing');
  await sleepForMs(2000);
  const sendMsgReponse = await bot.sendMessage(RECEIVER, 'Just kidding ...');
  console.log({ chatActionResponse, sendMsgReponse });

  // Send Photo
  await bot.sendChatAction(RECEIVER, 'upload_photo');
  await sleepForMs(1000);
  await bot.sendPhoto(
    RECEIVER,
    'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
    'Arsenal FC'
  );
})();
