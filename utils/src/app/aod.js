import { display } from 'display';
import { me } from 'appbit';

let active = false;

/**
 * Handle Always on Display on/off events.
 *
 * @param {Object} handlers - containing onStart() and onEnd().
 */
export const setup = (handlers) => {
  if (!display.aodAvailable) {
    console.error('AoD is not supported');
    return;
  }
  if (!me.permissions.granted('access_aod')) {
    console.error('access_aod permission not granted');
    return;
  }

  display.aodAllowed = true;
  display.addEventListener('change', () => {
    if (!display.aodActive && display.on) {
      handlers.onEnd();
      active = false;
      return;
    }

    handlers.onStart();
    active = true;
  });
};

/**
 * See if AoD mode is active right now.
 *
 * @returns {boolean} true if the display is on in AoD mode.
 */
export const isActive = () => active;
