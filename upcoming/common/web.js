export const buildParams = params => Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
