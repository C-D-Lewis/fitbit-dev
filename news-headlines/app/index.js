import document from 'document';
import * as messaging from 'messaging';

import * as log from '../common/log';
import * as ui from '../common/ui';

const TIMEOUT_MS = 10000;

const stories = [];
let loadingWindow, mainWindow, detailWindow;
let currentStory = 0;
let buttonsEnabled = false;
let timeoutHandle;

function setupUI() {
  loadingWindow = new ui.Window('loading-window');
  loadingWindow.show();
  ui.setVisible('loading-text', false);
  
  mainWindow = new ui.Window('main-window', () => {
    ui.get('main-title').onclick = () => {
      mainWindow.hide();
      detailWindow.show();
      detailWindow.update();
      ui.animate('detail-window-symbol-instance');
      buttonsEnabled = false;
    };
  }, () => {
    const story = stories[currentStory];
    ui.get('main-progress').innerText = `${currentStory + 1}/${stories.length}`;
    ui.get('main-title').innerText = story.title;
  });
  
  const detailWindow = new ui.Window('detail-window', null, () => {
    const story = stories[currentStory];
    ui.get('detail-title').innerText = story.title;
    
    const textView = ui.get('detail-text');
    textView.innerText = story.description;
    textView.onclick = () => {
      detailWindow.hide();
      mainWindow.show();
      buttonsEnabled = true;
    };
  });
}

function setupMessaging() {
  messaging.peerSocket.onopen = () => log.info('Device socket open');
  messaging.peerSocket.onmessage = (evt) => {
    if(stories.length === 0) {
      clearTimeout(timeoutHandle);
      loadingWindow.hide();
      mainWindow.show();
      buttonsEnabled = true;
    }

    stories.push(evt.data);
    mainWindow.update();
  };
  messaging.peerSocket.onerror = (err) => {
    log.error(`Device connection error: ${err.code} - ${err.message}`);
    ui.setVisible('loading-text', true);
  };
}

function setupButtons() {
  document.onkeypress = (e) => {
    if(!buttonsEnabled) return;
    
    switch(e.key) {
      case 'up': 
        if(currentStory === 0) return;
        currentStory--; 
        break;
      case 'down': 
        if(currentStory === stories.length - 1) return;
        currentStory++; 
        break;
      default: break;
    }
    mainWindow.update();
  };
}

function setupTimeout() {
  timeoutHandle = setTimeout(() => {
    ui.setVisible('loading-text', true);
    const errorView = ui.get('loading-text');
    errorView.innerText = 'Timed out';
  }, TIMEOUT_MS);
}

(() => {
  setupUI();
  setupButtons();
  setupMessaging();
  setupTimeout();
})();