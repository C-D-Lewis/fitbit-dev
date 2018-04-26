import { settingsStorage } from 'settings';

import * as auth from './auth';
import * as comm from '../common/comm';
import * as DATA from '../common/data.json';
import * as web from '../common/web';

// const fetchCalendars = (accessToken) => {
//   const params = { access_token: accessToken };
//   const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?${web.buildParams(params)}`;
//   return web.getJSON(url).then((json) => {
//     if(json.error) throw new Error(json.error);

//     return json.items;
//   });
// };

const fetchCalendarEvents = (accessToken, calendarId = 'primary') => {
  const params = {
    access_token: accessToken,
    timeMin: new Date().toISOString(),
    orderBy: 'startTime',
    singleEvents: 'true',
    maxResults: DATA.maxEvents
  };
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${web.buildParams(params)}`;  
  return web.getJSON(url).then((json) => {
    if(json.error) throw new Error(json.error);

    console.log(`Got ${json.items.length} events from ${calendarId}`);
    return json.items.map((item) => {
      // Multiday allday
      if (item.start.date) {
        return { 
          title: item.summary,
          description: item.description || 'No description',
          startDate: item.start.date.split('-').join('/'),
          endDate: item.end.date.split('-').join('/'),
          startTime: '00:00',
          endTime: '00:00'
        };
      }
      
      const [d1, t1] = item.start.dateTime.split('T');
      const [d2, t2] = item.end.dateTime.split('T');
      return {
        title: item.summary,
        description: item.description || 'No description',
        startDate: d1.split('-').join('/'),
        endDate: d2.split('-').join('/'),
        startTime: t1.split('+')[0].split(':').slice(0, 2).join(':'),
        endTime: t2.split('+')[0].split(':').slice(0, 2).join(':')
      };
    });
  });
};

const getEvents = (oauthData, lastAttempt) => {
  // TODO - choice of calendars in the JSX - forced to 'primary' for now
  fetchCalendarEvents(oauthData.access_token, 'primary')
    .then((eventList) => {
      console.log(`Packet size: ${JSON.stringify(eventList).length}`);
      comm.sendFile({ eventList });
    })
    .catch((err) => {
      console.log(err.message);
      if(lastAttempt) {
        console.log('Gave up reauthenticating');
        comm.sendFile({ error: err.message || 'Download Failed' });
        return;
      }

      auth.refreshAccess(oauthData).then((newOauthData) => {
        if(!newOauthData) {
          console.log('Reauthentication Failed');
          comm.sendFile({ error: 'Please log in' });
          return;
        }

        getEvents(newOauthData, true);
      });
  });
};

const onSocketOpen = () => {
  console.log('Companion peerSocket onopen');

  const oauthData = auth.getOauthData();
  if(!oauthData) {
    console.log('No credentials for watch, notifying.');
    comm.sendFile({ error: 'Please log in' });
    return;
  }
  
  getEvents(oauthData);
};

(() => {
  console.log('Upcoming companion start');
  
  comm.setup({ open: onSocketOpen });

  settingsStorage.onchange = (event) => {
    if (event.key !== "oauth") return;

    getEvents(auth.getOauthData());
  };
})();
