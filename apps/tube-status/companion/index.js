import { Comm } from '@chris-lewis/fitbit-utils/companion';
import { downloadStatus } from './status';

/**
 * The main function.
 */
const main = () => {
  console.log('Tube Status companion start');

  Comm.setup({
    /**
     * When communication opens.
     */
    open: () => downloadStatus().then(lines => Comm.sendFile(lines)),
    /**
     * On message from the device.
     *
     * @param {object} event - Communication event.
     */
    message: event => console.log(`RECV: ${JSON.stringify(event)}`),
    /**
     * On error.
     *
     * @param {object} err - Communication error.
     */
    error: err => console.log(`Connection error: ${err.code} - ${err.message}`),
  });
};

main();
