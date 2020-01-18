import document from 'document';

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
 * Windows collect multiple elements by ID using a parent <svg> element, and start hidden.
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
