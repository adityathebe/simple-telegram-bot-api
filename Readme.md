# Simple Telegram Bot API Wrapper

### Installation

```bash
npm install simple-telegram-bot-api

yarn add simple-telegram-bot-api
```

### Usage

```js
const TelgramBot = require('simple-telegram-bot-api');

const token = 'bot123456789:BBHukdff2134mOYi123asdap7byDwO7dasdasP1231';
const username = 'jarvisbot';
const bot = new TelegramBot(token, username);

(async () => {
  await bot.setWebhook('https://www.my-webhook-url.com/');
  await bot.sendMessage('123456', 'Hello World');
})();
```