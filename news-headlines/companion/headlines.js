import * as DATA from '../common/data.json';

const decode = str => str.split(/&amp;/g).join('&')
  .split('<![CDATA[').join('')
  .split(']]>').join('');

const scrape = (text, beforeArr, after) => {
  let index = 0;
  for(let i = 0; i < beforeArr.length; i++) {
    index = text.indexOf(beforeArr[i]);
    if(index === -1) return;

    text = text.substring(index);
  }

  text = text.substring(beforeArr[beforeArr.length - 1].length);
  return text.substring(0, text.indexOf(after));
};

const getStories = (xml) => {
  const items = [];
  xml = xml.split('<item>');
  xml.shift();
  xml.map((xmlChunk, i) => {
    items.push({
      t: decode(scrape(xmlChunk, ['<title>'], '</title>')),
      d: decode(scrape(xmlChunk, ['<description>'], '</description>')),
      dt: decode(scrape(xmlChunk, ['<pubDate>'], '</pubDate>')),
      i
    });
  });

  console.log(`Extracted ${items.length} items.`);
  return items;
};

export const download = (cb) => {
  fetch('https://feeds.bbci.co.uk/news/rss.xml').then(response => response.text().then((text) => {
    const stories = getStories(text).slice(0, DATA.maxStories);
    if(stories.length < 1) return;
    
    cb(stories);
  }));
};
