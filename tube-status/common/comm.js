import * as messaging from 'messaging';

export function setup(opts) {
  const { open, message, error } = opts;
  messaging.peerSocket.onopen = open;
  messaging.peerSocket.onmessage = message;
  messaging.peerSocket.onerror = error;
}

export function send(data) {
  try {
    messaging.peerSocket.send(data);
    console.log(`Sent ${JSON.stringify(data)}`);
  } catch(e) {
    console.log(`FAILED to send ${JSON.stringify(data)}`);
    console.log(e);
  }
}
