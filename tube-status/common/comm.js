import messaging from 'messaging';

export const setup = ({ open, message, error }) => {
  messaging.peerSocket.onopen = open;
  messaging.peerSocket.onmessage = message;
  messaging.peerSocket.onerror = error;
};

export const send = (data) => {
  messaging.peerSocket.send(data);
  // console.log(`Sent ${JSON.stringify(data)}`);
};
