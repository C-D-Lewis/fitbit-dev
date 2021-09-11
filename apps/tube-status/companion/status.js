/** Max length of a reason */
const REASON_MAX_LENGTH = 192;

/**
 * Extract all line statuses and reasons.
 *
 * @param {Array<object>} arr - Array of status items.
 * @returns {Array<object>} Mapped status items.
 */
const getAllLinesStatus = arr => arr.map((item) => {
  const [status] = item.lineStatuses;
  const result = {
    id: item.id,
    status: status.statusSeverityDescription,
    reason: undefined,
  };

  if (status.reason) {
    let reason = status.reason.substring(0, REASON_MAX_LENGTH);
    if (reason.includes(':')) {
      reason = reason.substring(reason.indexOf(':') + 1);
    }

    result.reason = reason.trim();
  }

  return result;
});

/**
 * Download the status from TfL
 *
 * @returns {Promise<Array<object>>}
 */
export const downloadStatus = () => {
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
