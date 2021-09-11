import { DB, UI, Comm } from '@chris-lewis/fitbit-utils/app';
import { me as device } from 'device';

/** Download timeout */
const TIMEOUT_MS = 30000;
/** Stale data card color */
const COLOR_STALE = '#777';
/** Fresh data card color */
const COLOR_FRESH = '#d40000';

let cardColor = COLOR_STALE;
let stories = [];
let loadingWindow;
let mainWindow;

/**
 * Update a card's data.
 *
 * @param {object} item - Item to use.
 * @param {number} i - Index of card.
 */
const updateStoryCard = (item, i) => {
  const card = new UI.Card(`card[${i}]`);

  // Update this card
  card.get('banner').style.fill = cardColor;
  card.setText('index', `${i + 1} / ${stories.length}`);
  card.setText('title', item.title);
  card.setText('description', item.description);
  card.setText('date', `${item.dateTime.substring(5, 22)} GMT`);

  // On Versa 3 and Sense, no panorama view is available
  if (device.modelName === 'Versa 3' || device.modelName === 'Sense') {
    card.visibleElement = 'title';
    card.setVisibleElement(card.visibleElement);

    card.get('content-area').onclick = () => {
      card.visibleElement = card.visibleElement === 'title' ? 'description' : 'title';
      card.setVisibleElement(card.visibleElement);
    }
  }
};

/**
 * Setup UI.
 */
const setupUI = () => {
  // Loading window
  loadingWindow = new UI.Window({ id: 'loading-window' });

  // Main window with stories
  mainWindow = new UI.Window({
    id: 'main-window',
    /**
     * On window update.
     */
    update: () => stories.forEach(updateStoryCard),
  });
};

/**
 * Setup communication with companion.
 */
const setupComm = () => {
  let timeoutHandle;

  Comm.setup({
    /**
     * When a file is received from the companion.
     *
     * @param {string} fileName - Name of the file.
     * @param {object} json - JSON in the file.
     */
    file: (fileName, json) => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }

      // Handle comm error
      if (json.error) {
        mainWindow.hide();

        UI.setText('loading-text', json.error);
        loadingWindow.show();
        return;
      }

      // Save the stories  [{ title, description, dateTime }, ... ]
      stories = json.stories;
      DB.set('stories', JSON.stringify(stories));
      console.log(`Received ${stories.length} stories`);

      // Show data is current
      cardColor = COLOR_FRESH;

      // Show the stories
      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    }
  });

  // Time out if it takes too long
  timeoutHandle = setTimeout(() => UI.setText('loading-text', 'Timed out!'), TIMEOUT_MS);
};

/**
 * Setup app data, and existing stories.
 */
const setupData = () => {
  DB.init('news-headlines');

  const staleData = DB.get('stories');
  if (!staleData) return;

  stories = JSON.parse(staleData);
  console.log(`Loaded ${stories.length} stale stories`);

  loadingWindow.hide();
  mainWindow.update();
  mainWindow.show();
};

/**
 * The main function.
 */
const main = () => {
  console.log('News Headlines app');

  setupUI();
  setupComm();

  loadingWindow.show();

  setupData();
};

main();
