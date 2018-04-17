import * as messaging from 'messaging';

import * as comm from '../common/comm';
import * as status from './status';

(() => {
  console.log('Tube Status companion start');
  
  comm.setup({
    open: () => status.download().then(lines => comm.send(lines)),
    message: event => console.log(`RECV: ${JSON.stringify(event)}`),
    error: err => console.log(`Connection error: ${err.code} - ${err.message}`)
  });
})();
