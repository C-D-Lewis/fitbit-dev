import { display } from 'display';
import { me } from 'appbit';

/**
 * Handle Always on Display on/off events.
 *
 * @param {Object} handlers - containing onAodStarted() and onAodEnded().
 */
export const setup = (handlers) => {
  if (!display.aodAvailable) {
    console.error('AoD is not supported');
  }
  if (!me.permissions.granted('access_aod')) {
    console.error('access_aod permission not granted');
  }

  display.aodAllowed = true;
  display.addEventListener('change', () => {
    if (!display.aodActive && display.on) {
      handlers.onAodEnded();
      return;
    }

    handlers.onAodStarted();
  });
};
