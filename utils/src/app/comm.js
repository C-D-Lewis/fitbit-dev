// Problems when file() is uncommented, not sure why

// import { inbox } from 'file-transfer';
// import { readFileSync } from 'fs';
// import * as messaging from 'messaging';
//
// /**
//  * Setup handlers for messaging and file-transfer events.
//  *
//  * @param {Object} handlers - Handlers for socket open, socket message,
//  *                            errors, and file received events.
//  */
// export const setup = (handlers) => {
//   const { open, message, error, file } = handlers;
//
//   messaging.peerSocket.onopen = open;
//   messaging.peerSocket.onmessage = message;
//   messaging.peerSocket.onerror = error;
//
//   try {
//     inbox.onnewfile = () => {
//       const fileName = inbox.nextFile();
//       const json = readFileSync(`/private/data/${fileName}`, 'cbor');
//       console.log(`File ${fileName} received`);
//       file(fileName, json);
//     };
//   } catch (e) {
//     console.log(e);
//   }
// };
