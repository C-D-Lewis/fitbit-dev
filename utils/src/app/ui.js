const document = require('document');

/**
 * Get an element by 'id'
 *
 * @param {string} id - Element ID.
 * @returns {HTMLElement} The element. If it's already an object, the object is returned.
 */
export const get = id => (typeof id === 'object') ? id : document.getElementById(id);

/**
 * Set an element's visibility.
 *
 * @param {string} id - Element 'id' to show/hide.
 * @param {boolean} visible - Set to 'true' to show, 'false' to hide.
 */
export const setVisible = (id, visible) => {
  get(id).style.display = visible ? 'inline' : 'none';
};

/**
 * Set the 'text' of an element.
 *
 * @param {string} id - Element 'id' to update.
 * @param {string} text - Text to show.
 */
export const setText = (id, text) => {
  get(id).text = text;
};

/**
 * Trigger an element's associated animation.
 *
 * @param {string} id - Element ID.
 */
export const animate = id => get(id).animate('enable');

/**
 * Windows collect multiple elements by ID using a parent <svg> element,
 * allow showing/hiding of the whole tree in one go, provide update routines,
 * and start hidden.
 *
 * opts.setup is called immediately
 * opts.update is called at the developer's discretion to update all elements at once.
 *
 * @param {Object} opts - Options (see below)
 * @returns {Function} Window 'class'.
 */
export function Window({ id, setup, update }) {
  this.id = id;
  this.show = () => setVisible(this.id, true);
  this.hide = () => setVisible(this.id, false);
  this.hide();

  if (update) {
    this.update = update;
  }
  if (setup) {
    setup();
  }
}

/**
 * Get a child element of a parent by its own ID.
 *
 * @param {HTMLElement} element - Element object parent.
 * @param {string} id - ID of the child element.
 * @returns {HTMLElement} Child element.
 */
const getChild = (element, id) => element.getElementById(id);

/**
 * Cards are a single instance, multiple reuse element with child elements.
 * Associated SVG is not included, but goes something like this:
 *
 *  <defs>
 *    <symbol id="card">
 *      <image id="bg" class="card-bg" href="./resources/bg-rounded.png"/>
 *      <text id="index" class="card-index">0/0</text>
 *      <use href="#panoramaview">
 *        <use href="#panoramaview-item">
 *          <textarea id="title" class="card-title">TITLE</textarea>
 *        </use>
 *        <use href="#panoramaview-item">
 *          <textarea id="description" class="card-description">DESC</textarea>
 *        </use>
 *
 *       <use id="pagination-dots" href="#pagination-widget" class="card-dots">
 *          <use href="#pagination-dot"/>
 *          <use href="#pagination-dot"/>
 *          <use href="#pagination-highlight-dot"/>
 *        </use>
 *      </use>
 *      <rect class="card-div-line"/>
 *      <text id="date" class="card-date">date</text>
 *    </symbol>
 *  </defs>
 *
 * And used as so:
 *
 *  <use href="#tile-list-item">
 *    <use id="card[0]" href="#card"/>
 *  </use>
 */
export function Card(id) {
  this.root = get(id);

  this.setText = function (id, text) {
    getChild(this.root, id).text = text;
  };

  this.get = function (id) {
    return getChild(this.root, id);
  };
};
