import { settingsStorage } from 'settings';
import { me } from 'companion';
import messaging from 'messaging';

const DB_KEY_COLOR = 'color';

const sendValue = (key, value) => {
  if (!value) {
    throw new Error('No value to send');
  }

  const data = { [key]: value };
  if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) {
    throw new Error('No peerSocket connection');
  }

  messaging.peerSocket.send(data);
  console.log(`Send:\n${JSON.stringify(data)}`);
};

// Settings changed while companion is running
settingsStorage.onchange = (event) => {
  console.log(`settingsStorage.onchange:\n${JSON.stringify(event)}`);

  sendValue(event.key, JSON.parse(event.newValue).values[0].name);
};

const main = () => {
  // Settings were changed while the companion was not running
  if (me.launchReasons.settingChanged) {
    console.log('me.launchReasons.settingChanged');

    sendValue(DB_KEY_COLOR, settingsStorage.getItem(DB_KEY_COLOR));
  }
};

main();
