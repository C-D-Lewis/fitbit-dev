import { me as device } from 'device';
import { Comm, UI } from '@chris-lewis/fitbit-utils/app';
import { linesConfig, layoutConfig } from './constants';

const TIMEOUT_MS = 30000;

let loadingWindow;
let mainWindow;
let lines = [];
let timeoutHandle;

/**
 * Setup the UI.
 */
const setupUI = () => {
  // Loading window
  loadingWindow = new UI.Window({ id: 'loading-window' });
  loadingWindow.show();

  // Main window with lines displayed
  mainWindow = new UI.Window({
    id: 'main-window',
    /**
     * Setup the main window.
     */
    setup: () => {
      // Set line color and name
      linesConfig.forEach((line, i) => {
        UI.get(`lines-card-line[${i}]`).style.fill = linesConfig[i].color;
        UI.setText(`lines-card-name[${i}]`, linesConfig[i].name);
      });
    },
    /**
     * Update the main window.
     */
    update: () => {
      lines.forEach((item, i) => {
        console.log(JSON.stringify(item));

        // Set the status
        UI.setText(`lines-card-status[${i}]`, item.status);

        // Show the reason
        const reason = item.reason || '';
        UI.setText(`lines-card-reason[${i}]`, reason);
        UI.setVisible(`lines-card-icon[${i}]`, !!item.reason);

        // Move views if reason exists
        if (reason) {
          const { nameY, statusY, reasonY } = layoutConfig[device.modelName];
          UI.get(`lines-card-name[${i}]`).y = nameY;
          UI.get(`lines-card-status[${i}]`).y = statusY;
          UI.get(`lines-card-reason[${i}]`).y = reasonY;
        }
      });
    }
  });
};

/**
 * Setup communication.
 */
const setupComm = () => {
  Comm.setup({
    /**
     * When communication opens.
     */
    open: () => console.log('device onopen'),
    /**
     * When a file is received from the companion.
     *
     * @param {string} fileName - Name of the file.
     * @param {object} json - JSON in the file.
     */
    file: (fileName, json) => {
      if (timeoutHandle) clearTimeout(timeoutHandle);

      // All line data arrives in one message
      lines = json;

      // Check expected order
      let hasError = false;
      lines.forEach((item, i) => {
        if (item.id !== linesConfig[i].id) {
          console.log(`Data error: ${i}`)
          UI.setText('loading-text', 'Data error!');
          hasError = true;
        }
      });
      if (hasError) return;

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    },
    /**
     * When there's a comms error.
     *
     * @param {object} err - The error.
     */
    error: err => console.log(JSON.stringify(err)),
  });

  // Timeout if data takes too long to arrive
  timeoutHandle = setTimeout(() => {
    UI.setText('loading-text', 'Timed out!');
    timeoutHandle = null;
  }, TIMEOUT_MS);
};

/**
 * The main function.
 */
const main = () => {
  console.log('Tube Status app start');

  setupUI();
  setupComm();
};

main();
