import * as log from '../common/log';

function decode(str) {
  return str.split(/&amp;/g).join('&')
            .split('<![CDATA[').join('')
            .split(']]>').join('');
}

function scrape(text, beforeArr, after) {
  let index = 0;
  for(var i = 0; i < beforeArr.length; i++) {
    index = text.indexOf(beforeArr[i]);
    if(index === -1) return null;

    text = text.substring(index);
  }
  text = text.substring(beforeArr[beforeArr.length - 1].length);
  return text.substring(0, text.indexOf(after));
}

function getStories(xml) {
  const items = [];
  xml = xml.split('<item>');
  xml.shift();
  xml.map((xmlChunk) => {
    items.push({
      title: decode(scrape(xmlChunk, [ '<title>' ], '</title>')),
      description: decode(scrape(xmlChunk, [ '<description>' ], '</description>'))
    });
  });

  log.info(`Extracted ${items.length} items.`);
  return items;
};

export function download(cb) {
  fetch('http://feeds.bbci.co.uk/news/rss.xml').then((response) => {
    response.text().then((text) => {
      const stories = getStories(text).slice(0, 10);
      if(stories.length < 1) return;
      else cb(stories);
    });
  });
};
