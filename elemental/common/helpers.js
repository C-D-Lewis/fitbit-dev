import * as ui from './ui';

export function after(ms, func) { setTimeout(func, ms); }

export function every(ms, func) { return setInterval(func, ms); }

export function print(input) {
  if(typeof input === 'object') input = JSON.stringify(input, null, 2);
  console.log(input);
}

// { screenX, screenY, type }
export function setOnClickListener(target, listener) {
  const element = (typeof target === 'object') ? target : ui.get(target);
  if(!element) return;
  
  element.onclick = listener;
}

export function zeroPad(value) { return (value < 10) ? `0${value}` : value; }
