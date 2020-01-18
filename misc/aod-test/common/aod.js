import { display } from "display";
import { me } from "appbit";

const handleAoD = (handlers) => {
  if (!display.aodAvailable) {
    console.error('AoD is not supported');
  }
  if (!me.permissions.granted("access_aod")) {
    console.error('access_aod permission not granted');
  }

  display.aodAllowed = true;
  display.addEventListener("change", () => {
    if (!display.aodActive && display.on) {
      handlers.onAodEnded();
    } else {
      handlers.onAodStarted();
    }
  });
};

export default handleAoD;
