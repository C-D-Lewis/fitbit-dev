import { settingsStorage } from 'settings';

import * as SECRETS from '../common/secrets.json';
import * as util from '../common/util';
import * as web from '../common/web';

const dataIsValid = oauthData => oauthData.access_token && oauthData.expires_in && oauthData.refresh_token;

export const getOauthData = () => {
  try {
    const oauthData = JSON.parse(settingsStorage.getItem('oauth'));
    if (!oauthData) {
      throw new Error('No oauthData in settingsStorage');
    }
  } catch(e) {
    console.log(e);
    return;
  }
  
  if (!dataIsValid(oauthData)) {
    console.log('oauthData not validated');
    return;
  }

  console.log('Using existing valid oauthData');
  return oauthData;
};

export const refreshAccess = (oauthData) => {
  const url = 'https://www.googleapis.com/oauth2/v4/token';
  const params = {
    client_secret: SECRETS.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: oauthData.refresh_token,
    client_id: SECRETS.clientId,
  };
  
  return fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: web.buildParams(params)
  }).then(response => response.json())
    .then((json) => {
      if (json.error) {
        throw new Error(json.error);
      }

      oauthData.access_token = json.access_token;
      oauthData.expires_in = json.expires_in;
      settingsStorage.setItem('oauth', JSON.stringify(oauthData));

      console.log('Refresh success!');
      return oauthData;
    })
    .catch(console.log);
};
