import { Comm } from '@chris-lewis/fitbit-utils/companion';
import * as status from './status';

const main = () => {
  console.log('Tube Status companion start');

  Comm.setup({
    open: () => status.download().then(lines => Comm.sendFile(lines)),
    message: event => console.log(`RECV: ${JSON.stringify(event)}`),
    error: err => console.log(`Connection error: ${err.code} - ${err.message}`),
  });
};

main();
