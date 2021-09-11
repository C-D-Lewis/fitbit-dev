/** Max stories */
const MAX_STORIES = 10;

/**
 * Decode some XML encodings.
 *
 * @param {string} str - String to decode.
 * @returns {string} str with encodings removed.
 */
const decode = str => str.split(/&amp;/g).join('&')
  .split('<![CDATA[').join('')
  .split(']]>').join('');

/**
 * Extract some string from a larger string.
 *
 * @param {string} text - Text to extract from.
 * @param {Array<string>} beforeArr - Array of strings that lead to the chunk to extract.
 * @param {string} after - Marker of the end of the string to extract.
 * @returns {string} Extracted string.
 */
const extract = (text, beforeArr, after) => {
  let index = 0;

  for (let i = 0; i < beforeArr.length; i++) {
    index = text.indexOf(beforeArr[i]);
    if(index === -1) return;

    text = text.substring(index);
  }

  text = text.substring(beforeArr[beforeArr.length - 1].length);
  return text.substring(0, text.indexOf(after));
};

/**
 * Get JSON of stories from the XML string.
 *
 * @param {string} xml - XML downloaded.
 * @returns {Array<object>} Array of stories with { title, description, dateTime }.
 */
const getStories = (xml) => {
  const items = [];
  xml = xml.split('<item>');
  xml.shift();
  xml.map((xmlChunk) => {
    items.push({
      title: decode(extract(xmlChunk, ['<title>'], '</title>')),
      description: decode(extract(xmlChunk, ['<description>'], '</description>')),
      dateTime: decode(extract(xmlChunk, ['<pubDate>'], '</pubDate>'))
    });
  });

  console.log(`Extracted ${items.length} items.`);
  return items;
};

/**
 * Download and extract news stories.
 *
 * @returns {Promise<Array<object>>} List of stories.
 */
export const downloadNews = () => fetch('https://feeds.bbci.co.uk/news/rss.xml')
  .then(res => res.text())
  .then(text => getStories(text).slice(0, MAX_STORIES));
