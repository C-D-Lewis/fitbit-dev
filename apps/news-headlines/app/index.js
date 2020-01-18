import * as comm from '../common/comm';
import * as db from '../common/db';
import * as ui from '../common/ui';
import Constants from '../common/constants';

const TIMEOUT_MS = 30000;

let stories = [];
let cardColor = Constants.colorStale;
let loadingWindow;
let mainWindow;

const initUi = () => {
  loadingWindow = new ui.Window({ id: 'loading-window' });
  mainWindow = new ui.Window({
    id: 'main-window',
    update: () => {
      stories.forEach((item, i) => {
        const card = new ui.Card(`card[${i}]`);

        // Update this card
        card.get('bg').style.fill = cardColor;
        card.setText('index', `${i + 1} / ${stories.length}`);
        card.setText('title', item.title);
        card.setText('description', item.description);
        card.setText('date', `${item.dateTime.substring(5, 22)} GMT`);
      });
    }
  });
};

const initComm = () => {
  let timeoutHandle;

  comm.setup({
    file: (fileName, json) => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }

      // Handle auth error
      if (json.error) {
        ui.setText('loading-text', json.error);
        loadingWindow.show();
        mainWindow.hide();
        return;
      }

      // Save the stories  [{ t, d, i, dt }, ... ]
      stories = json.stories;
      db.set('stories', JSON.stringify(stories));

      console.log(`Received ${stories.length} stories`);
      cardColor = Constants.colorFresh;

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    }
  });

  timeoutHandle = setTimeout(() => ui.setText('loading-text', 'Timed out!'), TIMEOUT_MS);
};

const initData = () => {
  db.init();
  const staleData = db.get('stories');
  if (staleData) {
    stories = JSON.parse(staleData);
    console.log(`Loaded ${stories.length} stale stories`);

    loadingWindow.hide();
    mainWindow.update();
    mainWindow.show();
  }
};

const main = () => {
  console.log('News Headlines app');

  initUi();
  initComm();

  loadingWindow.show();

  initData();
};

main();
