import * as messaging from 'messaging';

import * as comm from '../common/comm';
import * as headlines from './headlines';

const download = () => {
  console.log('Downloading...');
  headlines.download((stories) => {
    console.log(`Total size: ${JSON.stringify(stories).length} B`);
    comm.sendFile('stories.json', { stories });
  });
};

(() => {
  console.log('News Headlines companion start');
  
  comm.setup({ open: download });
})();
