import * as document from 'document';

export const get = id => (typeof id === 'object') ? id : document.getElementById(id);

export const setVisible = (id, visible) => {
  get(id).style.display = visible ? 'inline' : 'none';
};

export const animate = id => get(id).animate('enable');

export const setText = (id, text) => {
  get(id).text = text;
};

/**
 * Windows collect multiple elements by ID using a parent <svg> element, and start hidden
 * setup is called immediately
 * update is called at the developer's discretion
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
