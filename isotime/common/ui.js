const document = require('document');

export function get(id) { return (typeof id === 'object') ? id : document.getElementById(id); }

export function setVisible(id, visible) {
  let element = get(id);
  if(!element) return;
  
  element.style.display = visible ? 'inline' : 'none';
}

export function animate(id) {
  let element = get(id);
  element.animate = true;
}

/**
 * Windows collect multiple elements by ID, and start hidden
 * setupCb is called immediately
 * updateCb is called at the developer's discretion
 */
export function Window(ids, setupCb, updateCb) {
  this.ids = ids;
  this.show = () => this.ids.forEach((id) => setVisible(id, true));
  this.hide = () => this.ids.forEach((id) => setVisible(id, false));
  this.hide();
  if(updateCb) this.update = updateCb;
  if(setupCb) setupCb();
}
