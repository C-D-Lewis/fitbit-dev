import { UI } from '@chris-lewis/fitbit-utils/app';

const getChild = (element, id) => element.getElementById(id);

/**
 * Cards are a single instance, multiple reuse element with child elements
 */
export function Card(id) {
  this.root = UI.get(id);

  this.setText = function (id, text) {
    getChild(this.root, id).text = text;
  };

  this.get = function (id) {
    return getChild(this.root, id);
  };
};
