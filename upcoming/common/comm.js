import * as cbor from 'cbor';
import { inbox, outbox } from 'file-transfer';
import * as messaging from 'messaging';

export const setup = ({ open, message, error, file }) => {
  messaging.peerSocket.onopen = open;
  messaging.peerSocket.onmessage = message;
  messaging.peerSocket.onerror = error;
  
  try {
    inbox.onnewfile = () => {
      const fs = require('fs');
      const fileName = inbox.nextFile();
      const json = fs.readFileSync(`/private/data/${fileName}`, 'cbor');
      file(fileName, json); 
    };
  } catch (e) {
    // Could be called from companion, which is OK
  }
};

export const sendMessage = data => messaging.peerSocket.send(data);

// fileName is optional, if data is handled explicitly
export const sendFile = (data, fileName = 'data.json') => {
  outbox.enqueue(fileName, cbor.encode(data)).then((ft) => {
    console.log(`File '${fileName}' enqueued`);
  }).catch(err => console.log(err));
};
