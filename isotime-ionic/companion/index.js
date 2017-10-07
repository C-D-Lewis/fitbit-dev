import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { me } from 'companion';

let KEY_COLOR = 'color';

settingsStorage.onchange = (evt) => {
  console.log('settingsStorage.onchange');
  sendValue(evt.data.key, evt.data.newValue);
}

// Settings were changed while the companion was not running
if(me.launchReasons.settingChanged) {
  console.log('me.launchReasons.settingChanged');
  sendValue(KEY_COLOR, settingsStorage.getItem(KEY_COLOR));
}

function sendValue(key, value) {
  if (!val) return;

  const data = { key: value };
  if(messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
    console.log(`Sent data ${JSON.stringify(data)}`);
  } else {
    console.log('No peerSocket connection');
  }
}
