export const buildParams = params => Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');

export const getJSON = url => fetch(url).then(response => response.json());
