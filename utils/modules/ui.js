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
export const setVisible = (id, visible) => get(id).style.display = visible ? 'inline' : 'none';

/**
 * Trigger an element's associated animation.
 *
 * @param {string} id - Element ID.
 */
export const animate = id => get(id).animate('enable');

/**
 * Windows collect multiple elements by ID, and start hidden
 * setupCb is called immediately
 * updateCb is called at the developer's discretion
 */
export const Window = (ids, setupCb, updateCb) => {
  this.ids = ids;
  this.show = () => this.ids.forEach(id => setVisible(id, true));
  this.hide = () => this.ids.forEach(id => setVisible(id, false));
  this.hide();

  if (updateCb) {
    this.update = updateCb;
  }
  if (setupCb) {
    setupCb();
  }
};
