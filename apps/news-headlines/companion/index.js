import { settingsStorage } from 'settings';
import { me } from 'companion';
import { Comm } from '@chris-lewis/fitbit-utils/companion'
import { downloadNews } from './headlines';

const STORAGE_KEY_CATEGORY = 'category';

/**
 * Download the news headlines, then send them
 */
const download = () => {
  console.log('Downloading...');

  const value = settingsStorage.getItem(STORAGE_KEY_CATEGORY);
  const category = value ? JSON.parse(value).values[0].value : 'headlines';
  downloadNews(category)
    .then((stories) => {
      console.log(`Total size: ${JSON.stringify(stories).length} B`);
      Comm.sendFile({ stories });
    });
};


/**
 * The main function.
 */
const main = () => {
  console.log('News Headlines companion start');

  Comm.setup({ open: download });

  // Settings were changed while the companion was not running
  if (me.launchReasons.settingChanged) {
    console.log('settingChanged');
  }

  // Settings changed while companion is running
  settingsStorage.onchange = (event) => {
    console.log(`onchange:\n${JSON.stringify(event)}`);

    download();
  };
};

main();
