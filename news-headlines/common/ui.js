const document = require('document');

export function get(id) { return (typeof id === 'object') ? id : document.getElementById(id); }

export function setVisible(id, visible) {
  let element = get(id);
  if(!element) return;
  
  element.style.display = visible ? 'inline' : 'none';
}

export function animate(id) { get(id).animate('enable'); }

export function setText(id, text) { get(id).text = text; }

/**
 * Windows collect multiple elements by ID using a parent <svg> element, and start hidden
 * setup is called immediately
 * update is called at the developer's discretion
 */
export function Window(opts) {
  const { id, setup, update } = opts;
  this.id = id;
  this.show = () => setVisible(this.id, true);
  this.hide = () => setVisible(this.id, false);
  this.hide();
  if(update) this.update = update;
  if(setup) setup();
}
