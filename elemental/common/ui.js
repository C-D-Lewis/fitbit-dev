const document = require('document');

export const get = id => document.getElementById(id);

export const setText = (id, text) => get(id).text = text;

export const setVisible = (target, visible) => {
  const element = (typeof target === 'object') ? target : get(target);

  element.style.display = visible ? 'inline' : 'none';
};
