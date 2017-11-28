import * as messaging from 'messaging';

import * as comm from '../common/comm';
import * as status from './status';

function main() {
  console.log('Tube Status companion start');
  
  comm.setup({
    open: () => status.download((lines) => comm.send(lines)),
    message: () => {},
    error: (err) => console.log(`Connection error: ${err.code} - ${err.message}`)
  });
}

(() => main())();
