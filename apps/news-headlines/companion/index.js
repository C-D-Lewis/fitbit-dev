import { Comm } from '@chris-lewis/fitbit-utils/companion'
import * as messaging from 'messaging';
import * as headlines from './headlines';

const download = () => {
  console.log('Downloading...');
  headlines.download().then((stories) => {
    console.log(`Total size: ${JSON.stringify(stories).length} B`);
    Comm.sendFile({ stories });
  });
};

const main = () => {
  console.log('News Headlines companion start');

  Comm.setup({ open: download });
};

main();
