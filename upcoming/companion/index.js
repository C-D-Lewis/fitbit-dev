import { settingsStorage } from 'settings';
import me from 'companion';
import calendars from 'calendars';
import * as comm from '../common/comm';
import Constants from '../common/constants';

const transformEvent = (item) => {
  // For some reason the date properties are objects here
  item.startDate = item.startDate.toISOString();
  item.endDate = item.endDate.toISOString();

  // Multiday allday
  if (item.isAllDay) {
    return {
      title: item.title,
      description: item.description || 'No description',
      startDate: item.startDate.split('T')[0].split('-').join('/'),
      endDate: item.endDate.split('T')[0].split('-').join('/'),
      startTime: '00:00',
      endTime: '00:00',
    };
  }

  const [d1, t1] = item.startDate.split('T');
  const [d2, t2] = item.endDate.split('T');
  return {
    title: item.title,
    description: item.description || 'No description',
    startDate: d1.split('T')[0].split('-').join('/'),
    endDate: d2.split('T')[0].split('-').join('/'),
    startTime: t1.split(':').slice(0, 2).join(':'),
    endTime: t2.split(':').slice(0, 2).join(':'),
  };
};

const sendEventList = (eventList) => {
  console.log(`Packet size: ${JSON.stringify(eventList).length}`);
  comm.sendFile({ eventList });
};

const handleSendError = (err) => {
  console.log(err.stack);
  comm.sendFile({ error: 'Please grant permissions and choose a calendar' });
};

const fetchCalendarEvents = () => calendars
  .searchSources()
  .then((sources) => {
    settingsStorage.setItem('sources', JSON.stringify(sources));

    return calendars.searchCalendars();
  })
  .then((results) => {
    settingsStorage.setItem('calendars', JSON.stringify(results));

    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(999, 59, 59, 999);
    return calendars.searchEvents({ startDate, endDate });
  })
  .then(events => events.slice(0, Constants.maxEvents))
  .then((events) => {
    console.log('All events: ' + JSON.stringify(events));
    return events;
  })
  .then(events => events.map(transformEvent));

const getEvents = async () => {
  fetchCalendarEvents()
    .then(sendEventList)
    .catch(handleSendError);
};

const onSocketOpen = () => {
  console.log('Companion peerSocket onopen');

  if (!me.permissions.granted('access_calendar')) {
    comm.sendFile({ error: 'Please grant permissions and choose a calendar' });
    return;
  }

  getEvents();
};

const main = () => {
  console.log('Upcoming companion start');

  comm.setup({ open: onSocketOpen });

  settingsStorage.onchange = (event) => {
    // Save prefs here?
  };
};

main();
