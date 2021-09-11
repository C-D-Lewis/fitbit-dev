import { Comm } from '@chris-lewis/fitbit-utils/companion'
import { downloadNews } from './headlines';

/**
 * Download the news headlines, then send them
 */
const download = () => {
  console.log('Downloading...');

  downloadNews()
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
};

main();
