/**
 * Build a parameter string from an Object of key-value pairs.
 *
 * @param {Object} params - Key-value object, such as `{ filter: 'tags=foo' }`.
 * @returns {string} Query parameter string, to be appended to `?` or other parameters.
 */
export const buildParams = params => Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');

/**
 * Helper to fetch() some JSON.
 *
 * @param {string} url - URL to fetch.
 * @returns {Object} The received JSON.
 */
export const getJSON = url => fetch(url).then(res => res.json());
