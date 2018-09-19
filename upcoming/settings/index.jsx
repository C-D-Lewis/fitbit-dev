import { settingsStorage } from "settings";

import * as SECRETS from '../common/secrets.json';

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Google Account</Text>}>
        The next 10 events from your primary calendar will be synchronized. If problems occur, try doing this again.

        Note: This page will remain the same after login so you can come back and choose a different account later on.
        <Oauth
          settingsKey="oauth"
          title="Choose Google Account"
          label="Google Account"
          status="Login"
          authorizeUrl="https://accounts.google.com/o/oauth2/v2/auth"
          requestTokenUrl="https://www.googleapis.com/oauth2/v4/token"
          clientId={SECRETS.clientId}
          clientSecret={SECRETS.clientSecret}
          scope="https://www.googleapis.com/auth/calendar.readonly"
          oAuthParams={{ access_type: 'offline', prompt: 'consent' }}
          encodeAsBase64
          pkce
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
