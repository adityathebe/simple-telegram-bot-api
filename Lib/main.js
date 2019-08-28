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

    return this._makeAPIRequest(jsondata, 'sendVideo');
  }

  sendPhoto(receiver, photoId, caption) {
    const jsondata = {
      photo: photoId,
      chat_id: receiver,
      caption,
    };

    return this._makeAPIRequest(jsondata, 'sendPhoto');
  }

  sendAudio(receiver, audioId) {
    const jsondata = {
      audio: audioId,
      chat_id: receiver,
      caption,
    };

    return this._makeAPIRequest(jsondata, 'sendMessage');
  }

  /**
   * Use this method to send text messages. On success, the sent Message is returned
   * @param {Number | String} receiver Unique identifier for the target chat or username of the target channel (@channelusername)
   * @param {String} message Text of the message to be sent
   * @typedef optionsSendMessage
   * @property {'html' | 'markdown'} [parseMode] Send Markdown or HTML
   * @property {Boolean} [disableWebPagePreview] Disables link previews for links in this message
   * @property {Boolean} [disableNotification] Sends the message silently. Users will receive a notification with no sound.
   * @property {Number} [replyToMessageId] If the message is a reply, ID of the original message
   * @param {optionsSendMessage=}
   */
  sendMessage(
    receiver,
    message,
    { parseMode = 'html', disableWebPagePreview = false, disableNotification = false, replyToMessageId = null } = {}
  ) {
    const jsondata = {
      text: message,
      chat_id: receiver,
      parse_mode: parseMode,
      disable_web_page_preview: disableWebPagePreview,
      disable_notification: disableNotification,
      reply_to_message_id: replyToMessageId,
    };

    return this._makeAPIRequest(jsondata, 'sendMessage');
  }

  /**
   * Use this method to forward messages of any kind. On success, the sent Message is returned
   * @param {Number | String} targetChatId Unique identifier for the target chat or username of the target channel (@channelusername)
   * @param {Number | String} fromChatId Unique identifier for the chat where the original message was sent (or channel username @channelusername)
   * @param {Number} messageId Message identifier in the chat specified in fromChatId
   * @param {Boolean} disableNotification
   */
  forwardMessage(targetChatId, fromChatId, messageId, disableNotification = false) {
    const jsondata = {
      message_id: messageId,
      chat_id: targetChatId,
      from_chat_id: fromChatId,
      disable_notification: disableNotification,
    };

    return this._makeAPIRequest(jsondata, 'forwardMessage');
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

    return this._makeAPIRequest(jsondata, 'sendMessage');
  }

  sendMediaGroup(receiver, inputMediaPhoto, { parseMode = 'html', disableWebPagePreview = false } = {}) {
    const jsondata = {
      media: inputMediaPhoto,
      chat_id: receiver,
      parse_mode: parseMode,
      disable_web_page_preview: disableWebPagePreview,
    };

    return this._makeAPIRequest(jsondata, 'sendMediaGroup');
  }

  sendDocument(receiver, fileId) {
    const jsondata = {
      document: fileId,
      chat_id: receiver,
    };

    return this._makeAPIRequest(jsondata, 'sendDocument');
  }

  deleteMessage(chatId, messageId) {
    const jsondata = {
      chat_id: chatId,
      message_id: messageId,
    };
    return this._makeAPIRequest(jsondata, 'deleteMessage');
  }

  editMessage(chatId, messageId, editedMessage, { inlineKeyboardMarkup, parseMode = 'html' } = {}) {
    let jsondata = {
      chat_id: chatId,
      text: editedMessage,
      message_id: messageId,
      reply_markup: inlineKeyboardMarkup,
      parse_mode: parseMode,
    };

    return this._makeAPIRequest(jsondata, 'editMessageText');
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * @param {Number|String} chatId Unique identifier for the target chat or username of the target channel
   * @param {'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_audio' | 'upload_audio' | 'upload_document' | 'find_location' | 'record_video_note' | 'upload_video_note'} actionType Unique identifier for the target chat or username of the target channel
   */
  sendChatAction(chatId, actionType) {
    const jsondata = {
      chat_id: chatId,
      action: actionType,
    };

    return this._makeAPIRequest(jsondata, 'sendChatAction');
  }

  getAdminList(chatId) {
    const jsondata = {
      chat_id: chatId,
    };

    return this._makeAPIRequest(jsondata, 'getChatAdministrators');
  }

  getFileMeta(fileId) {
    const jsondata = {
      file_id: fileId,
    };

    return this._makeAPIRequest(jsondata, 'getFile');
  }

  getMe() {
    return this._makeAPIRequest({}, 'getMe');
  }

  getFileUrl(filePath) {
    return `https://api.telegram.org/file/${this.apiKey}/${filePath}`;
  }

  /**
   * Get a list of administrators in a chat
   * @param {String | Number} chatId Unique identifier for the target chat or username of the target supergroup or channel (@channelusername)
   * @returns {Promise<Array>} Array of ChatMembers
   */
  getChatAdministrators(chatId) {
    return callSendAPI({ chat_id: chatId }, 'getChatAdministrators');
  }

  /**
   * Use this method to kick a user from a group, a supergroup or a channel
   * @param {Number | String} chatId Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername)
   * @param {Number} userId Unique identifier of the target user
   * @param {Number} [untilDate] Date when the user will be unbanned, unix time
   */
  kickChatMember(chatId, userId, untilDate) {
    const jsondata = {
      chat_id: chatId,
      user_id: userId,
      until_date: untilDate,
    };
    return callSendAPI(jsondata, 'kickChatMember');
  }

  /**
   * Use this method to unban a previously kicked user in a supergroup or channel
   * @param {Number | String} chatId Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername)
   * @param {Number} userId Unique identifier of the target user
   */
  unbanChatMember(chatId, userId) {
    const jsondata = {
      chat_id: chatId,
      user_id: userId,
    };
    return callSendAPI(jsondata, 'unbanChatMember');
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////// Webhooks /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Use this method to specify a url and receive incoming updates via an outgoing webhook
   * @param {String} webhookUrl
   */
  setWebhook(webhookUrl) {
    const url = `https://api.telegram.org/${this.apiKey}/setWebhook?url=${webhookUrl}`;
    return makeGetRequest(url);
  }

  /**
   * @typedef WebhookInfo
   * @property {String} url Webhook URL, may be empty if webhook is not set up
   * @property {Boolean} has_custom_certificate True, if a custom certificate was provided for webhook certificate checks
   * @property {Number} pending_update_count Number of updates awaiting delivery
   * @property {Number} [last_error_date] Unix time for the most recent error that happened when trying to deliver an update via webhook
   * @property {String} [last_error_message] Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook
   * @property {Number} [max_connections] Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
   * @property {String[]} [allowed_updatesOptional] A list of update types the bot is subscribed to. Defaults to all update types
   * @typedef webhookInfoResponse
   * @property {Boolean} ok
   * @property {WebhookInfo} result
   * @returns {webhookInfoResponse}
   */
  getWebhookInfo() {
    const url = `https://api.telegram.org/${this.apiKey}/getWebhookInfo`;
    return makeGetRequest(url);
  }

  _makeAPIRequest(jsondata, methodType) {
    const apiEndpoint = `/${this.apiKey}/${methodType}`;
    return makePostRequest(apiEndpoint, jsondata);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////  Static Functions ////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

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
   * Returns the necessary markup for reply keyboard
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
