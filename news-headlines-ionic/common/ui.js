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
 * Windows collect multiple elements by ID using a parent <svg> element, and start hidden
 * setupCb is called immediately
 * updateCb is called at the developer's discretion
 */
export function Window(svgId, setupCb, updateCb) {
  this.id = svgId;
  this.show = () => setVisible(this.id, true);
  this.hide = () => setVisible(this.id, false);
  this.hide();
  if(updateCb) this.update = updateCb;
  if(setupCb) setupCb();
}
