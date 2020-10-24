import { Comm, UI, DB } from '@chris-lewis/fitbit-utils/app';
import Constants from '../common/constants';
import { decodeDate } from './dateTimeUtils';
import { me as device } from 'device';

/** Max timeout when loading screen is waiting for companion. */
const TIMEOUT_MS = 30000;

let eventsArr = [];
let timeoutHandle;
let loadingWindow;
let mainWindow;

/**
 * Update function for mainWindow.
 */
const mainWindowUpdate = () => {
  for (let i = 0; i < Constants.maxEvents; i += 1) {
    const card = new UI.Card(`card[${i}]`);
    if (!eventsArr[i]) {
      UI.setVisible(`card-container[${i}]`, false);
      continue;
    }

    UI.setVisible(`card-container[${i}]`, true);
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

    // On Versa 3 and Sense, no panorama view is available
    if (['Versa 3', 'Sense'].includes(device.modelName)) {
      card.visibleElement = 'title';
      card.setVisibleElement(card.visibleElement);

      card.get('content-area').onclick = () => {
        if (card.visibleElement === 'title') {
          card.visibleElement = 'description';
        } else {
          card.visibleElement = 'title';
        }
        card.setVisibleElement(card.visibleElement);
      }
    }
  }
};

/**
 * Setup the UI using own window framework.
 */
const setupUi = () => {
  loadingWindow = new UI.Window({ id: 'loading-window' });
  mainWindow = new UI.Window({ id: 'main-window', update: mainWindowUpdate });
};

/**
 * When a file has been received.
 *
 * @param {string} fileName - Name of the file.
 * @param {Object} json - JSON object received.
 */
const onFileReceived = (fileName, json) => {
  clearTimeout(timeoutHandle);

  // Handle auth error
  if (json.error) {
    UI.setText('loading-text', json.error);
    loadingWindow.show();
    mainWindow.hide();
    return;
  }

  // All events data arrives in one message
  eventsArr = json.eventList;
  DB.set(Constants.dbKeys.staleEvents, eventsArr);
  console.log(`Received ${eventsArr.length} events`);

  loadingWindow.hide();
  mainWindow.update();
  mainWindow.show();
};

/**
 * Setup communication with companion.
 */
const setupComm = () => {
  Comm.setup({ file: onFileReceived });

  timeoutHandle = setTimeout(() => {
    UI.setText('loading-text', 'Timed out!');
    timeoutHandle = null;
  }, TIMEOUT_MS);
};

/**
 * Seup app data.
 */
const setupData = () => {
  DB.init('upcoming');

  // Check for stale data
  const staleEvents = DB.get(Constants.dbKeys.staleEvents);
  if (staleEvents) {
    eventsArr = staleEvents.map((item) => ({ ...item, isStale: true }));
    console.log(`Loaded ${eventsArr.length} stale events`);

    loadingWindow.hide();
    mainWindow.update();
    mainWindow.show();
  }
};

/**
 * The main function.
 */
const main = () => {
  console.log('Upcoming app start');

  setupUi();
  setupComm();
  setupData();

  loadingWindow.show();
};

main();
