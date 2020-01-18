import { inbox, outbox } from 'file-transfer';
import * as cbor from 'cbor';
import * as messaging from 'messaging';
import { readFileSync } from 'fs';

/**
 * Setup handlers for messaging and file-transfer events.
 *
 * @param {Object} handlers - Handlers for socket open, socket message,
 *                            errors, and file received events.
 */
export const setup = (handlers) => {
  const { open, message, error, file } = handlers;

  messaging.peerSocket.onopen = open;
  messaging.peerSocket.onmessage = message;
  messaging.peerSocket.onerror = error;

  try {
    inbox.onnewfile = () => {
      // Require here so same module can be used on both app and companion
      const fileName = inbox.nextFile();
      const json = readFileSync(`/private/data/${fileName}`, 'cbor');
      console.log(`File ${fileName} received`);
      file(fileName, json);
    };
  } catch (e) {
    // Could be called from companion, which is OK
  }
};

/**
 * Send a message through the peerSocket.
 * Appears to be less reliable then file-transfer.
 *
 * @param {Object} data - JSON object data to send.
 */
export const sendMessage = data => messaging.peerSocket.send(data);

/**
 * Send a JSON object as a file. Appears to be almost always reliable,
 * allowing a couple of seconds typical to transfer.
 *
 * @param {Object} data - JSON object data to send.
 * @param {string} [fileName] - Optional explicit file name.
 * @returns {Promise}
 */
export const sendFile = async (data, fileName = 'data.json') => {
  const res = await outbox.enqueue(fileName, cbor.encode(data));
  console.log(`File '${fileName}' enqueued`);
};
