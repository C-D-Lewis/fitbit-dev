import * as ui from './ui';

export const after = (ms, func) => setTimeout(func, ms);

export const every = (ms, func) => setInterval(func, ms);

export const setOnClickListener = (target, listener) => {
  const element = (typeof target === 'object') ? target : ui.get(target);
  
  element.onclick = listener;
};

export const zeroPad = value => (value < 10) ? `0${value}` : value;
