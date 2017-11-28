const document = require('document');

export function get(id) { return document.getElementById(id); }

export function setVisible(target, visible) {
  let element = (typeof target === 'object') ? target : get(target);
  if(!element) return;

  element.style.display = visible ? 'inline' : 'none';
}
