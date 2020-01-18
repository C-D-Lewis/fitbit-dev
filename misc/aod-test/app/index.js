import clock from "clock";
import handleAoD from '../common/aod';

const onAodStarted = () => {
  console.log('onAodStarted');
  clock.granularity = "minutes";
};

const onAodEnded = () => {
  console.log('onAodEnded');
  clock.granularity = "seconds";
};

const main = () => {
  console.log('app start');
  
  handleAoD({ onAodStarted, onAodEnded });
};

main();
