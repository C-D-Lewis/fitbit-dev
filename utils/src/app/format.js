import { preferences } from 'user-settings';

/**
 * Pad a number to two digits.
 *
 * @param {number} i - Value to pad.
 * @returns {string} Padded number.
 */
export const zeroPad = i => (i >= 10) ? i : `0${i}`;

 /**
 * Get hours according to user preference.
 *
 * @param {number} hours - Hours value.
 * @returns {string} Adjusted value.
 */
export const to24h = hours => (preferences.clockDisplay === '12h') ? `${(hours % 12 || 12)}` : zeroPad(hours);
