const { makeGetRequest, makePostRequest } = require('./utils');

class TelegramBot {
  constructor(apiKey, username) {
    if (!apiKey) throw new Error('Please provide telegram api key');

    this.apiKey = apiKey;
    this.username = username;
  }

  sendVideo(receiver, videoId, caption) {
    const jsondata = {
      video: videoId,
      chat_id: receiver,
      caption,
    };

    return this.makeAPIRequest(jsondata, 'sendVideo');
  }

  sendPhoto(receiver, photoId, caption) {
    const jsondata = {
      photo: photoId,
      chat_id: receiver,
      caption,
    };

    return this.makeAPIRequest(jsondata, 'sendPhoto');
  }

  sendAudio(receiver, audioId) {
    const jsondata = {
      audio: audioId,
      chat_id: receiver,
      caption,
    };

    return this.makeAPIRequest(jsondata, 'sendMessage');
  }

  sendMessage(receiver, message, { parseMode = 'html', disableWebPagePreview = false } = {}) {
    const jsondata = {
      text: message,
      chat_id: receiver,
      parse_mode: parseMode,
      disable_web_page_preview: disableWebPagePreview,
    };

    return this.makeAPIRequest(jsondata, 'sendMessage');
  }

  /**
   * @param {String | Number} receiver chat id of the receiver or username of channel
   * @param {Object} replyMarkup InlineKeyboardMarkup, ReplyKeyboardMarkup
   * @param {String} message
   * @param {Object} param3 optional params
   */
  sendButton(receiver, replyMarkup, message, { parseMode = 'html', disableWebPagePreview = false } = {}) {
    const jsondata = {
      text: message,
      chat_id: receiver,
      parse_mode: parseMode,
      reply_markup: replyMarkup,
      disable_web_page_preview: disableWebPagePreview,
    };

    return this.makeAPIRequest(jsondata, 'sendMessage');
  }

  sendMediaGroup(receiver, inputMediaPhoto, { parseMode = 'html', disableWebPagePreview = false } = {}) {
    const jsondata = {
      media: inputMediaPhoto,
      chat_id: receiver,
      parse_mode: parseMode,
      disable_web_page_preview: disableWebPagePreview,
    };

    return this.makeAPIRequest(jsondata, 'sendMediaGroup');
  }

  sendDocument(receiver, fileId) {
    const jsondata = {
      document: fileId,
      chat_id: receiver,
    };

    return this.makeAPIRequest(jsondata, 'sendDocument');
  }

  deleteMessage(chatId, messageId) {
    const jsondata = {
      chat_id: chatId,
      message_id: messageId,
    };
    return this.makeAPIRequest(jsondata, 'deleteMessage');
  }

  editMessage(chatId, messageId, editedMessage, { inlineKeyboardMarkup, parseMode = 'html' } = {}) {
    let jsondata = {
      chat_id: chatId,
      text: editedMessage,
      message_id: messageId,
      reply_markup: inlineKeyboardMarkup,
      parse_mode: parseMode,
    };

    return this.makeAPIRequest(jsondata, 'editMessageText');
  }

  getAdminList(chatId) {
    const jsondata = {
      chat_id: chatId,
    };

    return this.makeAPIRequest(jsondata, 'getChatAdministrators');
  }

  getFileMeta(fileId) {
    const jsondata = {
      file_id: fileId,
    };

    return this.makeAPIRequest(jsondata, 'getFile');
  }

  getFileUrl(filePath) {
    return `https://api.telegram.org/file/${this.apiKey}/${filePath}`;
  }

  /**
   * Get a list of administrators in a chat
   * @param {String | Number} chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns {Promise<Array>} Array of ChatMembers
   */
  getChatAdministrators(chatId) {
    return callSendAPI({ chat_id: chatId }, 'getChatAdministrators');
  }

  setWebhook(webhookUrl) {
    const url = `https://api.telegram.org/${this.apiKey}/setWebhook?url=${webhookUrl}`;
    return makeGetRequest(url);
  }

  getWebhookInfo() {
    const url = `https://api.telegram.org/${this.apiKey}/getWebhookInfo`;
    return makeGetRequest(url);
  }

  makeAPIRequest(jsondata, methodType) {
    const apiEndpoint = `/${this.apiKey}/${methodType}`;
    return makePostRequest(apiEndpoint, jsondata);
  }

  //////////////////////
  // Static Functions //
  //////////////////////

  /**
   * Returns the necessary markup for inline keyboards
   * Example inputs:
   * `[{text: btn1, payload: payload1}, {text: btn2, payload: payload2}]`
   * `[ [{text: btn1, payload: payload1}], [{text: btn2, payload: payload2}] ]`
   * @typedef {Object} InlineKeyboard
   * @property {String} text Label text on the button
   * @property {String} payload Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   * @param {InlineKeyboard[] | Array<InlineKeyboard[]>} items
   * @return {Object} Inline Keyboard Markup
   */
  static makeInlineKeyboardMarkup(items) {
    const inlineMarkup = {
      inline_keyboard: [],
    };

    items.forEach(item => {
      if (item instanceof Array) {
        let row = [];
        item.forEach(inneritem => {
          row.push({
            text: inneritem.text,
            callback_data: inneritem.payload,
          });
        });
        inlineMarkup.inline_keyboard.push(row);
      } else {
        inlineMarkup.inline_keyboard.push([
          {
            text: item.text,
            callback_data: item.payload,
          },
        ]);
      }
    });

    return inlineMarkup;
  }

  /**
   * Get markup for reply keyboard
   * @typedef {Object} KeyboardButton This object represents one button of the reply keyboard
   * @property {String} text Text of the button
   * @param {Array<KeyboardButton[]>} keyboard Array of button rows, each represented by an Array of KeyboardButton objects
   * @param {Boolean} resizeKeyboard Requests clients to resize the keyboard vertically for optimal fit
   * @param {Boolean} oneTimeKeyboard Requests clients to hide the keyboard as soon as it's been used
   */
  static makeReplyKeyboardMarkup(keyboard, resizeKeyboard = true, oneTimeKeyboard = false) {
    const inlineMarkup = {
      keyboard: keyboard,
      resize_keyboard: resizeKeyboard,
      one_time_keyboard: oneTimeKeyboard,
    };

    return inlineMarkup;
  }
}

module.exports = TelegramBot;
