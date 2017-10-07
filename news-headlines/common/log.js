const LEVEL = 'info';

function log(level, msg) {
  if(LEVEL.indexOf(level) >= 0 || 
     level === 'error' ||
     level === 'warn') console.log(msg);
}

export function info(msg) { log('info', msg); }

export function warn(msg) { log('warn', msg); }

export function error(msg) { log('error', msg); }

export function debug(msg) { log('debug', msg); }
