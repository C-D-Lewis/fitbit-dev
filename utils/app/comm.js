import { inbox } from 'file-transfer';
import { readFileSync } from 'fs';
import * as messaging from 'messaging';

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
