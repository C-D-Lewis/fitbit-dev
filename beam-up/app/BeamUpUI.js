import * as ui from '../common/ui';

const IDS = {
  q1: 'beam-up-bar-25',
  q2: 'beam-up-bar-50',
  q3: 'beam-up-bar-75',
  q4: 'beam-up-bar-100',
  ret: 'beam-up-bar-return'
};

export function SecondsBar () {
  this.state = 0;
  
  this.hideAll = () => {
    ui.setVisible(IDS.q1, false);
    ui.setVisible(IDS.q2, false);
    ui.setVisible(IDS.q3, false);
    ui.setVisible(IDS.q4, false);
  };
  
  this.setProgress = (value) => {
    // Ensure the bar has returned
    if(value > 1 && value < 15 && this.state !== 1) value = 1;

    if(value % 15 !== 0 && value !== 1 && value !== 58) return;
    
    if(value === this.state) return;
    
    this.state = value;
    switch(value) {
      case 15: 
        ui.setVisible(IDS.q1, true);
        ui.animate(IDS.q1);
        break;
      case 30:
        ui.setVisible(IDS.q2, true);
        ui.animate(IDS.q2);
        break;
      case 45:
        ui.setVisible(IDS.q3, true);
        ui.animate(IDS.q3);
        break;
      case 58:
        ui.setVisible(IDS.q4, true);
        ui.animate(IDS.q4);
        break;
      case 1:
        this.hideAll();
        ui.setVisible(IDS.ret, true);
        ui.animate(IDS.ret);
        break;
    }
  };
  
  this.hideAll();
};