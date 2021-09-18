import { me as device } from 'device';
import { UI } from '@chris-lewis/fitbit-utils/app';
import { deviceWidths } from './constants';

/** Movement step size */
const MOVE_DELTA = 15;
/** Length of a ray */
const RAY_LENGTH = 80;
/** Range of spawn delays in milliseconds */
const DELAY_RANGE_MS = [1000, 3000];
/** Min x1 value */
const X_MIN = 50;

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
    this.line = UI.get(`ray[${index}]`);
    this.isResetting = false;

    this.reset();
  }

  /**
   * Begin the Ray's movement again.
   */
  reset () {
    this.isResetting = true;

    const delay = Math.round(Math.random() * DELAY_RANGE_MS[1]) + DELAY_RANGE_MS[0];
    setTimeout(() => {
      const xRange = deviceWidths[device.modelName];
      this.line.x1 = Math.round(Math.random() * 2 * xRange) + X_MIN;
      this.line.y1 = 0;
      this.line.x2 = this.line.x1 + RAY_LENGTH;
      this.line.y2 = this.line.y1 - RAY_LENGTH;

      this.isResetting = false;
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
}
