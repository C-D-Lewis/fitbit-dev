import { me as device } from 'device';
import { UI } from '@chris-lewis/fitbit-utils/app';
import { deviceWidths } from './constants';

/** Movement step size */
const MOVE_DELTA = 15;
/** Length of a ray */
const RAY_LENGTH = 100;
/** Range of spawn delays in milliseconds */
const DELAY_RANGE_MS = [300, 2000];
/** Min x1 value */
const X_MIN = 50;
/** Minimum ray spacing */
const X_MOD = 30;

/**
 * Ray class
 */
export default class Ray {
  /**
   * Ray constructor.
   *
   * @param {number} index - Ray index.
   */
  constructor (index) {
    this.index = index;
    this.isResetting = false;
    this.displaySize = deviceWidths[device.modelName];

    this.line = UI.get(`ray[${index}]`);

    // Handed in index.resume
    // this.reset();
  }

  /**
   * Begin the Ray's movement again.
   */
  reset () {
    this.hide();
    this.isResetting = true;

    const delay = Math.round(Math.random() * DELAY_RANGE_MS[1]) + DELAY_RANGE_MS[0];
    setTimeout(() => {
      // Even ray spacing
      let nextX1 = X_MOD + 1;
      while (nextX1 % X_MOD !== 0) {
        nextX1 = Math.round(Math.random() * 1.5 * this.displaySize) + X_MIN;
      }

      // Set the new start position
      this.line.x1 = nextX1;
      this.line.y1 = 0;
      this.line.x2 = this.line.x1 + RAY_LENGTH;
      this.line.y2 = this.line.y1 - RAY_LENGTH;

      this.isResetting = false;
      this.show();
    }, delay);
  }

  /**
   * Step the Ray's movement.
   */
  update () {
    this.line.x1 -= MOVE_DELTA;
    this.line.y1 += MOVE_DELTA;
    this.line.x2 -= MOVE_DELTA;
    this.line.y2 += MOVE_DELTA;

    if (this.line.x2 < 0 && !this.isResetting) this.reset();
  }

  /**
   * Set the new ray color.
   *
   * @param {string} color - CSS color.
   */
  setColor (color) {
    this.line.style.fill = color;
  }

  /**
   * Hide the ray.
   */
  hide () {
    UI.setVisible(this.line, false);
  }

  /**
   * Show the ray.
   */
  show () {
    UI.setVisible(this.line, true);
  }
}
