const REASON_MAX_LENGTH = 192;

const getAllLinesStatus = json => json.map((item) => {
  const result = {
    id: item.id,
    status: item.lineStatuses[0].statusSeverityDescription,
  };

  if (item.lineStatuses[0].reason) {
    let reason = item.lineStatuses[0].reason.substring(0, REASON_MAX_LENGTH);
    if (reason.includes(':')) {
      reason = reason.substring(reason.indexOf(':') + 1);
    }

    result.reason = reason.trim();
  }

  return result;
});

export const download = () => {
  return fetch('https://api.tfl.gov.uk/line/mode/tube,dlr,overground,tflrail/status')
    .then(res => res.json())
    .then((json) => {
      console.log('Download from unified API complete!');
      const payload = getAllLinesStatus(json);
      // console.log(JSON.stringify(payload));
      console.log(`payload.length=${JSON.stringify(payload).length}`);
      return payload;
    });
};
