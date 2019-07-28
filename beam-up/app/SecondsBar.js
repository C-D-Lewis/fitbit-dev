import * as ui from '../common/ui';

const IDS = {
  q1: 'beam-up-bar-25',
  q2: 'beam-up-bar-50',
  q3: 'beam-up-bar-75',
  q4: 'beam-up-bar-100',
  ret: 'beam-up-bar-return'
};

const SecondsBar = () => {
  const hideAll = () => {
    ui.setVisible(IDS.q1, false);
    ui.setVisible(IDS.q2, false);
    ui.setVisible(IDS.q3, false);
    ui.setVisible(IDS.q4, false);
  };

  const setProgress = (value) => {
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
        hideAll();
        ui.setVisible(IDS.ret, true);
        ui.animate(IDS.ret);
        break;
    }
  };

  hideAll();

  return {
    hideAll,
    setProgress,
  };
};

export default SecondsBar;
