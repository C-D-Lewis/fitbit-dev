import * as messaging from 'messaging';

export function setup(opts) {
  const { open, message, error } = opts;
  messaging.peerSocket.onopen = open;
  messaging.peerSocket.onmessage = message;
  messaging.peerSocket.onerror = error;
}
