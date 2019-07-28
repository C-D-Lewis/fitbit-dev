import * as comm from '../common/comm';
import Constants from '../common/constants';
import { decodeDate } from './dateTimeUtils';
import * as db from '../common/db';
import * as ui from '../common/ui';

const TIMEOUT_MS = 30000;

let eventsArr = [];
let timeoutHandle;
let loadingWindow;
let mainWindow;

const setupUi = () => {
  loadingWindow = new ui.Window({ id: 'loading-window' });
  mainWindow = new ui.Window({
    id: 'main-window',
    update: () => {
      for (let i = 0; i < Constants.maxEvents; i += 1) {
        const card = new ui.Card(`card[${i}]`);
        if (!eventsArr[i]) {
          // Hide the card
          ui.setVisible(`card-container[${i}]`, false);
          continue;
        }

        ui.setVisible(`card-container[${i}]`, true);
        const item = eventsArr[i];
        card.setText('index', `${i + 1} / ${eventsArr.length}`);
        card.setText('title', item.title);
        card.setText('description', item.description);
        card.setText('time', `${item.startTime} - ${item.endTime}`);
        const decodedDate = decodeDate(item.startDate, item.endDate);
        card.setText('date', decodedDate);

        if (item.isStale) {
          card.get('bg').style.fill = decodedDate === 'Today' ? Constants.colorStaleToday : Constants.colorStaleOtherDay;
        } else {
          card.get('bg').style.fill = decodedDate === 'Today' ? Constants.colorUpdatedToday : Constants.colorUpdatedOtherDay;
        }
      }
    }
  });
};

const setupComm = () => {
  comm.setup({
    file: (fileName, json) => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }

      // Handle auth error
      if (json.error) {
        ui.setText('loading-text', json.error);
        loadingWindow.show();
        mainWindow.hide();
        return;
      }

      // All events data arrives in one message
      eventsArr = json.eventList;
      db.set(Constants.dbKeys.staleEvents, eventsArr);
      console.log(`Received ${eventsArr.length} events`);

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    }
  });

  timeoutHandle = setTimeout(() => {
    ui.setText('loading-text', 'Timed out!');
    timeoutHandle = null;
  }, TIMEOUT_MS);
};

const setupData = () => {
  // Check for stale data
  db.init();
  const staleEvents = db.get(Constants.dbKeys.staleEvents);
  if (staleEvents) {
    eventsArr = staleEvents.map((item) => {
      item.isStale = true;
      return item;
    });
    console.log(`Loaded ${eventsArr.length} stale events`);

    loadingWindow.hide();
    mainWindow.update();
    mainWindow.show();
  }
};

const main = () => {
  console.log('Upcoming app');

  setupUi();
  setupComm();
  setupData();

  loadingWindow.show();
};

main();
