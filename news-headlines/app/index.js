import * as comm from '../common/comm';
import * as DATA from '../common/data.json';
import * as db from '../common/db';
import * as ui from '../common/ui';

const TIMEOUT_MS = 30000;

let loadingWindow, mainWindow;
let storiesArr = [];
let timeoutHandle, cardColor = DATA.colorStale, storiesReceived = 0;

// Sun, 15 Apr 2018 13:25:00 GMT
const formatDate = input => `${input.substring(5, 22)} GMT`;

(() => {
  console.log('News Headlines app start');
  
  loadingWindow = new ui.Window({ id: 'loading-window' });
  loadingWindow.show();
  
  mainWindow = new ui.Window({
    id: 'main-window', 
    setup: () => {}, 
    update: () => {
      storiesArr.forEach((item, i) => {
        const card = new ui.Card(`card[${i}]`);
        
        // Update this card
        card.get('bg').style.fill = cardColor;
        card.setText('index', `${i + 1} / ${DATA.maxStories}`);
        card.setText('title', item.t);
        card.setText('date', formatDate(item.dt));
      });
    }
  });
  
  comm.setup({
    file: (fileName, json) => {
      if(timeoutHandle) clearTimeout(timeoutHandle); 
      
      // Handle auth error
      if(json.error) {
        ui.setText('loading-text', json.error);
        loadingWindow.show();
        mainWindow.hide();
        return;
      }
      
      // Save the stories  [{ t, d, i, dt }, ... ]
      storiesArr = json.stories;
      db.set('stories', JSON.stringify(storiesArr));
      
      console.log(`Received ${storiesArr.length} stories`);
      console.log('Download complete!');
      cardColor = DATA.colorFresh;

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    }
  });
  
  timeoutHandle = setTimeout(() => {
    ui.setText('loading-text', 'Timed out!');
    timeoutHandle = null;
  }, TIMEOUT_MS);
  
  db.load(DATA.appName);
  const staleData = db.get('stories');
  if(staleData) {
    storiesArr = JSON.parse(staleData);
    console.log(`Loaded ${storiesArr.length} stale stories`);
    
    loadingWindow.hide();
    mainWindow.update();
    mainWindow.show();
  }
})();
