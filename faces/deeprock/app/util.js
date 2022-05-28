import { FitFont } from 'fitfont';
import { preferences } from 'user-settings';
import { FF_DEFAULT } from './constants';

/**
 * Pad a number to two digits.
 * TODO: Move to utils.
 *
 * @param {number} i - Value to pad.
 * @returns {string} Padded number.
 */
export const zeroPad = i => (i >= 10) ? i : `0${i}`;

/**
 * Get hours according to user preference.
 * TODO: Move to utils.
 *
 * @param {number} hours - Hours value.
 * @returns {string} Adjusted value.
 */
export const to24h = hours => (preferences.clockDisplay === '12h') ? `${(hours % 12 || 12)}` : zeroPad(hours);
 
/**
 * Random integer in range 0 - max.
 * TODO: Move to utils.
 *
 * @param {number} max - Maximum value, inclusive.
 * @returns {number} Random number.
 */
export const randomInt = max => Math.round(Math.random() * max);

/**
 * Create new FitFont.
 *
 * @param {string} id - FitFont container ID.
 * @param {number} size - Font size.
 * @returns {object} FitFont instance.
 */
export const createFitFont = (id, size) => new FitFont({
  id,
  font:`fonts/Ostrich_Sans_${size}`,
  ...FF_DEFAULT,
});
