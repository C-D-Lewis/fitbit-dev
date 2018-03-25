import * as comm from '../common/comm';
import * as data from '../common/data.json';
import * as ui from '../common/ui';

let loadingWindow, mainWindow;
let linesArr = [];

const setupUI = () => {
  loadingWindow = new ui.Window({ id: 'loading-window' });
  loadingWindow.show();
  
  mainWindow = new ui.Window({
    id: 'main-window', 
    setup: () => {
      const lineData = data.lines;
      lineData.forEach((line, i) => {
        ui.get(`lines-card-line[${i}]`).style.fill = lineData[i].color;
        ui.setText(`lines-card-name[${i}]`, lineData[i].name);
      });
    }, 
    update: () => {
      linesArr.forEach((item, i) => {
        ui.setText(`lines-card-status[${i}]`, item.status);
        
        const reason = item.reason ? item.reason : '';
        ui.setText(`lines-card-reason[${i}]`, reason);
        
        ui.setVisible(`lines-card-icon[${i}]`, item.reason);
      });
    }
  });
};

(() => {
  console.log('Tube Status app start');
  
  setupUI();
  
  comm.setup({
    open: () => console.log('device onopen'),
    message: (event) => {
      // All line data arrives in one message
      linesArr = event.data;
      if(data.debug) console.log(`Recv: ${JSON.stringify(linesArr)}`);
      
      loadingWindow.hide();
      mainWindow.update();
      mainWindow.show();
    },
    error: err => console.log(JSON.stringify(err))
  });
})();
