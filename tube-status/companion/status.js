const getAllLinesStatus = text => JSON.parse(text).map((item) => {
  const output = { 
    id: item.id,
    status: item.lineStatuses[0].statusSeverityDescription 
  };

  if(item.lineStatuses[0].reason) {
    let reason = item.lineStatuses[0].reason.substring(0, 128);
    if(reason.includes(':')) reason = reason.substring(reason.indexOf(':') + 1);
    
    output.reason = reason.trim();
  }

  return output;
});

export const download = () => {
  return fetch('https://api.tfl.gov.uk/line/mode/tube,dlr,overground,tflrail/status')
    .then((response) => {
      console.log('Download from unified API complete!');
      return response.text().then(text => {
        const payload = getAllLinesStatus(text);
        console.log(`payload.length=${JSON.stringify(payload).length}`);
        return payload;
      });
    });
};
