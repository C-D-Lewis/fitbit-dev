import * as comm from '../common/comm';
import * as DATA from '../common/data.json';
import * as db from '../common/db';
import * as ui from '../common/ui';

const TIMEOUT_MS = 30000;

(() => {
  console.log('News Headlines app start');
  
  let storiesArr = [];
  let timeoutHandle, cardColor = DATA.colorStale;
  
  const loadingWindow = new ui.Window({ id: 'loading-window' });  
  const mainWindow = new ui.Window({
    id: 'main-window', 
    update: () => {
      storiesArr.forEach((item, i) => {
        const card = new ui.Card(`card[${i}]`);
        
        // Update this card
        card.get('bg').style.fill = cardColor;
        card.setText('index', `${i + 1} / ${storiesArr.length}`);
        card.setText('title', item.title);
        card.setText('date', `${item.dateTime.substring(5, 22)} GMT`);
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
      cardColor = DATA.colorFresh;

      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    }
  });
  
  timeoutHandle = setTimeout(() => ui.setText('loading-text', 'Timed out!'), TIMEOUT_MS);
  
  db.load();
  const staleData = db.get('stories');
  if(staleData) {
    storiesArr = JSON.parse(staleData);
    console.log(`Loaded ${storiesArr.length} stale stories`);
    
    loadingWindow.hide();
    mainWindow.update();
    mainWindow.show();
  }
  
  loadingWindow.show();
})();
