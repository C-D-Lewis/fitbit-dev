function getStatus(responseText) {
  return JSON.parse(responseText).map((item) => ({
    status: item.lineStatuses[0].statusSeverityDescription
  }));
}

export function download(cb) {
  fetch('https://api.tfl.gov.uk/line/mode/tube/status').then((response) => {
    console.log('Download from unified API complete!');
    response.text().then((text) => cb(getStatus(text)));
  });
}
