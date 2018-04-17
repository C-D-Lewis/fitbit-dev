import * as messaging from 'messaging';

export const setup = ({ open, message, error }) => {
  messaging.peerSocket.onopen = open;
  messaging.peerSocket.onmessage = message;
  messaging.peerSocket.onerror = error;
};
