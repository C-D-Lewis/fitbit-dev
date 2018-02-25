import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { me } from 'companion';

const KEY_COLOR = 'color';

const sendValue = (key, value) => {
  if (!value) return;

  const data = { [key]: value };
  if(messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) {
    console.log('No peerSocket connection');
    return;
  }
  
  messaging.peerSocket.send(data);
  console.log(`Sent data ${JSON.stringify(data)}`);
};

settingsStorage.onchange = (event) => {
  console.log(`settingsStorage.onchange:\n${JSON.stringify(event)}`);
  sendValue(event.key, JSON.parse(event.newValue).values[0].name);
};

(() => {
  // Settings were changed while the companion was not running
  if(me.launchReasons.settingChanged) {
    console.log('me.launchReasons.settingChanged');
    sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
  }
})();
