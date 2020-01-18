import { UI } from '@chris-lewis/fitbit-utils';

const IDS = {
  q1: 'beam-up-bar-25',
  q2: 'beam-up-bar-50',
  q3: 'beam-up-bar-75',
  q4: 'beam-up-bar-100',
  ret: 'beam-up-bar-return'
};

const SecondsBar = () => {
  const hideAll = () => {
    UI.setVisible(IDS.q1, false);
    UI.setVisible(IDS.q2, false);
    UI.setVisible(IDS.q3, false);
    UI.setVisible(IDS.q4, false);
  };

  const setProgress = (value) => {
    switch(value) {
      case 15:
        UI.setVisible(IDS.q1, true);
        UI.animate(IDS.q1);
        break;
      case 30:
        UI.setVisible(IDS.q2, true);
        UI.animate(IDS.q2);
        break;
      case 45:
        UI.setVisible(IDS.q3, true);
        UI.animate(IDS.q3);
        break;
      case 58:
        UI.setVisible(IDS.q4, true);
        UI.animate(IDS.q4);
        break;
      case 1:
        hideAll();
        UI.setVisible(IDS.ret, true);
        UI.animate(IDS.ret);
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
