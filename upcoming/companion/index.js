import { settingsStorage } from 'settings';
import me from 'companion';
import calendars from 'calendars';
import * as comm from '../common/comm';
import Constants from '../common/constants';

/**
 * Transform a FitBit calendar event to one the app is expecting.
 *
 * @param {Object} item - Item to transform.
 * @returns {Object} Transformed object.
 */
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

/**
 * Send the event list to the watch.
 *
 * @param {Object[]} List of events.
 */
const sendEventList = (eventList) => {
  console.log(`Packet size: ${JSON.stringify(eventList).length}`);
  comm.sendFile({ eventList });
};

/**
 * Handle a sending error by sending an error string to the watch for display.
 *
 * @param {Error} err - Error object.
 */
const handleSendError = (err) => {
  console.log(err.stack);
  comm.sendFile({ error: 'Please grant permissions and choose a calendar' });
};

/**
 * Fetch all events from all calendars.
 *
 * @returns {Promise}
 */
const fetchCalendarEvents = async () => {
  const sources = await calendars.searchSources();
  settingsStorage.setItem('sources', JSON.stringify(sources));

  const results = await calendars.searchCalendars();
  settingsStorage.setItem('calendars', JSON.stringify(results));

  const startDate = new Date();
  const endDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(999, 59, 59, 999);
  const data = await calendars.searchEvents({ startDate, endDate });
  const events = data.slice(0, Constants.maxEvents);

  console.log(`events: ${JSON.stringify(events)}`);
  return events.map(transformEvent);
};

/**
 * Fetch and send events to the watch, handling any errors.
 */
const getEvents = async () => {
  try {
    const events = await fetchCalendarEvents();
    sendEventList(events);
  } catch (err) {
    handleSendError(err);
  }
};

/**
 * When a peer socket is available.
 */
const onSocketOpen = () => {
  console.log('Companion peerSocket onopen');

  if (!me.permissions.granted('access_calendar')) {
    comm.sendFile({ error: 'Please grant permissions and choose a calendar' });
    return;
  }

  getEvents();
};

/**
 * The main function.
 */
const main = () => {
  console.log('Upcoming companion start');

  comm.setup({ open: onSocketOpen });

  settingsStorage.onchange = (event) => {
    // Save prefs here?
  };
};

main();
