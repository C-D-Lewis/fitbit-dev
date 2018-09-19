import * as comm from '../common/comm';
import * as DATA from '../common/data.json';
import * as DTU from './dateTimeUtils';
import * as db from '../common/db';
import * as ui from '../common/ui';

const TIMEOUT_MS = 30000;

let eventsArr = [];
let timeoutHandle, cardColor = DATA.colorStale;

(() => {
  console.log('Upcoming app start');
  
  const loadingWindow = new ui.Window({ id: 'loading-window' });
  const mainWindow = new ui.Window({
    id: 'main-window', 
    update: () => {
      for (let i = 0; i < DATA.maxEvents; i += 1) {
        const card = new ui.Card(`card[${i}]`);
        if(!eventsArr[i]) {
          // Hide the card
          ui.setVisible(`card-container[${i}]`, false);
          continue;
        }
        
        ui.setVisible(`card-container[${i}]`, true);
        const item = eventsArr[i];
        card.get('bg').style.fill = cardColor;
        card.setText('index', `${i + 1} / ${eventsArr.length}`);
        card.setText('title', item.title);
        card.setText('description', item.description);
        
        // const desc = card.get('description');
        // console.log('height before ' + desc.height);
        // const bbox = desc.getBBox();
        // desc.height = bbox.height;
        // console.log('height after ' + desc.height);
        
        
        card.setText('time', `${item.startTime} - ${item.endTime}`);
        card.setText('date', DTU.decodeDate(item.startDate, item.endDate));
      }
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
      
      // All events data arrives in one message
      eventsArr = json.eventList;
      db.set(DATA.dbKeys.staleEvents, eventsArr);
      cardColor = DATA.colorFresh;
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
  
  // Check for stale data
  db.load();
  const staleEvents = db.get(DATA.dbKeys.staleEvents);
  if(staleEvents) {
    eventsArr = staleEvents;
    console.log(`Loaded ${eventsArr.length} stale events`);
    
    loadingWindow.hide();
    mainWindow.update();
    mainWindow.show();
  }
  
  loadingWindow.show();
})();
