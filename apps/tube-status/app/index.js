import { me as device } from 'device';
import { Comm, UI } from '@chris-lewis/fitbit-utils/app';
import Constants from '../common/constants';

const TIMEOUT_MS = 30000;

let loadingWindow;
let mainWindow;
let lines = [];
let timeoutHandle;

const setupUI = () => {
  loadingWindow = new UI.Window({ id: 'loading-window' });
  loadingWindow.show();

  mainWindow = new UI.Window({
    id: 'main-window',
    setup: () => {
      const lineData = Constants.lines;
      lineData.forEach((line, i) => {
        UI.get(`lines-card-line[${i}]`).style.fill = lineData[i].color;
        UI.setText(`lines-card-name[${i}]`, lineData[i].name);
      });
    },
    update: () => {
      const lineData = Constants.lines;
      lines.forEach((item, i) => {
        // Verify the item is the correct line and in the same order
        if (item.id !== lineData[i].id) {
          UI.setText('loading-text', 'Data error!');
          return;
        }

        UI.setText(`lines-card-status[${i}]`, item.status);

        const reason = item.reason ? item.reason : '';
        UI.setText(`lines-card-reason[${i}]`, reason);
        UI.setVisible(`lines-card-icon[${i}]`, item.reason);

        // Move view
        if (reason) {
          const { nameY, statusY, reasonY } = Constants.layout[device.modelName];
          UI.get(`lines-card-name[${i}]`).y = nameY;
          UI.get(`lines-card-status[${i}]`).y = statusY;
          UI.get(`lines-card-reason[${i}]`).y = reasonY;
        }
      });
    }
  });
};

const setupComm = () => {
  Comm.setup({
    open: () => console.log('device onopen'),
    file: (fileName, json) => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }

      // All line data arrives in one message
      lines = json;
      if (Constants.debug) {
        console.log(`Recv: ${JSON.stringify(lines)}`);
      }

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    },
    error: err => console.log(JSON.stringify(err)),
  });

  timeoutHandle = setTimeout(() => {
    UI.setText('loading-text', 'Timed out!');
    timeoutHandle = null;
  }, TIMEOUT_MS);
};

const main = () => {
  console.log('Tube Status app start');

  setupUI();
  setupComm();
};

main();
