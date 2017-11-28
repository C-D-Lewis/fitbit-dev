import * as comm from '../common/comm';
import * as data from '../common/data.json';
import * as ui from '../common/ui';

let loadingWindow, mainWindow;
let linesArr = [];

function loadLinesData() {
  const lineData = data.lines;
  lineData.forEach((line, i) => {
    ui.get(`lines-card-line[${i}]`).style.fill = lineData[i].color;
    ui.setText(`lines-card-name[${i}]`, lineData[i].name);
  });
}

function setupUI() {
  loadingWindow = new ui.Window({
    id: 'loading-window',
    setup: () => {
      ui.setVisible('loading-text', true);
      ui.setText('loading-text', 'Waiting for phone...');
    }
  });
  loadingWindow.show();
  
  mainWindow = new ui.Window({
    id: 'main-window', 
    setup: loadLinesData, 
    update: () => {
      linesArr.forEach((item, i) => {
        ui.setText(`lines-card-status[${i}]`, item.status);
      });
    }
  });
}

function main() {
  console.log('Tube Status app start');
  
  setupUI();
  
  comm.setup({
    open: () => console.log('device onopen'),
    message: (evt) => {
      linesArr = evt.data;
      console.log(`Recv: ${JSON.stringify(linesArr)}`);
      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    },
    error: (err) => console.log(JSON.stringify(err))
  });
}

(() => main())();