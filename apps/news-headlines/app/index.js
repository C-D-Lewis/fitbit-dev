import { DB, UI, Comm } from '@chris-lewis/fitbit-utils/app';
import Constants from '../common/constants';

const TIMEOUT_MS = 30000;

let stories = [];
let cardColor = Constants.colorStale;
let loadingWindow;
let mainWindow;

const initUi = () => {
  loadingWindow = new UI.Window({ id: 'loading-window' });
  mainWindow = new UI.Window({
    id: 'main-window',
    update: () => {
      stories.forEach((item, i) => {
        const card = new UI.Card(`card[${i}]`);

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

  Comm.setup({
    file: (fileName, json) => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }

      // Handle auth error
      if (json.error) {
        UI.setText('loading-text', json.error);
        loadingWindow.show();
        mainWindow.hide();
        return;
      }

      // Save the stories  [{ t, d, i, dt }, ... ]
      stories = json.stories;
      DB.set('stories', JSON.stringify(stories));

      console.log(`Received ${stories.length} stories`);
      cardColor = Constants.colorFresh;

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    }
  });

  timeoutHandle = setTimeout(() => UI.setText('loading-text', 'Timed out!'), TIMEOUT_MS);
};

const initData = () => {
  DB.init();

  const staleData = DB.get('stories');
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
