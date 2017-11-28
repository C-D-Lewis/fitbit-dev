import * as messaging from 'messaging';

import * as log from '../common/log';
import * as headlines from './headlines';

const RETRY_TIMEOUT = 2000;

var stories = [];
var lastIndex = 0;

function sendNext() {
  if(lastIndex === stories.length) return;
  
  try {
    const story = stories[lastIndex];
    story.index = lastIndex;
    log.info(`Sending story ${lastIndex}`);
    messaging.peerSocket.send(story);
    lastIndex++;
  } catch(e) {
    log.error(`Error sending message: ${e}`);
    setTimeout(sendNext, RETRY_TIMEOUT);
  }
}

function download() {
  log.info('Downloading...');
  headlines.download((items) => {
    stories = items;
    setInterval(sendNext, 1000);
  });
}

function main() {
  log.info('News Headlines companion start');
  
  messaging.peerSocket.onopen = download;
  messaging.peerSocket.onerror = (err) => log.error(`Connection error: ${err.code} - ${err.message}`);
  // messaging.peerSocket.onbufferedamountdecrease = sendNext;
}

(() => main())();