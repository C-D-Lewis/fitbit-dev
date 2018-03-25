const getAllLinesStatus = responseText => JSON.parse(responseText).map((item) => {
  const output = { status: item.lineStatuses[0].statusSeverityDescription };

  if(item.lineStatuses[0].reason) {
    let reason = item.lineStatuses[0].reason.substring(0, 128);
    if(reason.includes(':')) reason = reason.substring(reason.indexOf(':') + 1);
    output.reason = reason.trim();
  }

  return output;
});

export const download = () => new Promise((resolve) => {
  fetch('https://api.tfl.gov.uk/line/mode/tube/status').then((response) => {
    console.log('Download from unified API complete!');
    response.text().then(text => resolve(getAllLinesStatus(text)));
  });
});
