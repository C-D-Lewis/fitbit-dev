import { settingsStorage } from 'settings';
import { me } from 'companion';
import { Comm } from '@chris-lewis/fitbit-utils/companion';

const DB_KEY_THEME = 'theme';

/**
 * Send a value to the watch.
 *
 * @param {string} key - Key to send.
 * @param {string} value - Value to send.
 */
const sendValue = (key, value) => {
  if (!value) throw new Error('No value to send');

  const data = { [key]: value };
  Comm.sendMessage(data);
  console.log(`Send:\n${JSON.stringify(data)}`);
};

// Settings changed while companion is running
settingsStorage.onchange = (event) => {
  console.log(`settingsStorage.onchange:\n${JSON.stringify(event)}`);

  sendValue(event.key, JSON.parse(event.newValue).values[0].name);
};

/**
 * The main function.
 */
const main = () => {
  // Settings were changed while the companion was not running
  if (me.launchReasons.settingChanged) {
    console.log('me.launchReasons.settingChanged');

    sendValue(DB_KEY_THEME, settingsStorage.getItem(DB_KEY_THEME));
  }
};

main();
