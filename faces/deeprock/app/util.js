import { FitFont } from 'fitfont';
import { FF_DEFAULT } from './constants';


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
