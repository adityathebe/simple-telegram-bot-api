const request = require('request');

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
}

module.exports = TelegramBot;
