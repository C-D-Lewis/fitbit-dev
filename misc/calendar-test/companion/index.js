import me from 'companion';
import calendars from "calendars";

const testCalendars = () => {
  if (me.permissions.granted("access_calendar")) {
    calendars
      .searchSources()
      .then(sources => {
        console.log("All calendar data sources");
        console.log(JSON.stringify(sources));
        return calendars.searchCalendars();
      })
      .then(results => {
        console.log("All calendars");
        console.log(JSON.stringify(results));
        const start = new Date();
        const end = new Date();

        // 48hr window
        start.setHours(0, 0, 0, 0);
        end.setHours(47, 59, 59, 999);
        const eventsQuery = {
          startDate: start,
          endDate: end
        };

        return calendars.searchEvents(eventsQuery);
      })
      .then(eventData => {
        // All events
        console.log("All events for the next 48 hours");
        console.log(JSON.stringify(eventData));
      })
      .catch(error => {
        // Inform the user about the error
        console.error(error);
        console.error(error.stack);
      });
  } else {
    console.log('no perms')
  }
}

const main = () => {
  console.log('companion start');
  
  testCalendars();
}

main();
