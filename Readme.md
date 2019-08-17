# Simple Telegram Bot API Wrapper

## Installation

```bash
# npm
npm install simple-telegram-bot-api --save-dev

# yarn
yarn add simple-telegram-bot-api --dev
```

## Usage

```js
const TelgramBot = require('simple-telegram-bot-api');

const token = 'bot123456789:BBHukdff2134mOYi123asdap7byDwO7dasdasP1231';
const username = 'jarvisbot';
const bot = new TelegramBot(token, username);

// With async/await
(async () => {
  try {
    await bot.sendMessage('123456', 'Hello World with async/await');
    console.log('Message sent')
  } catch (err) {
    console.error(err);
  }
})();

// With Promises
bot.sendMessage('123456', 'Hello World with Promise')
  .then(() => console.log('Message sent'))
  .catch(console.error)
```

## Try out the examples

First you need to install dotenv

```bash
# npm
npm install dotenv

# yarn
yarn add dotenv
```

Create a file named `.env` in the root directory. The file should have the following values

```
APIKEY=
BOTUSERNAME=
WEBHOOK_URL=
RECEIVER=
```

Then run the examples from the root dir

```bash
node Examples/sendMessage.js

node Examples/sendPhoto
```