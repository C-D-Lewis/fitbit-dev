import { UI } from '@chris-lewis/fitbit-utils/app';
import clock from 'clock';

const QUOTES = [
  'There\'s an emergency going on',
  'Why are you asking me?',
  'Probably not serious, don\'t panic',
  'That\'s a poor IQ for a glass of water!',
  'Oh yeah, didn\'t see that',
  'You want me to prove it, do you?',
  'How \'bout a space question instead?',
  'I may not be fast, but I get there in the end',
  'Still, you\'ve got to laugh, haven\'t you?',
  'My IQ is 6000 - same as 6000 PE teachers',
  'It\'s still going on',
  'Abandon shop! This is not a daffodil.',
  'Everybody\'s dead, Dave',
  'Gordon Bennett!',
  'They\'re dead, Dave.',
];

const textTime = UI.get('text_time');
const textQuote = UI.get('text_quote');

const zeroPad = i => (i >= 10) ? i : `0${i}`;

const randomInt = max => Math.round(Math.random() * max);

const onTick = (event) => {
  const today = event.date;
  const hours = zeroPad(today.getHours());
  const mins = zeroPad(today.getMinutes());

  let quote = QUOTES[randomInt(QUOTES.length - 1)];
  if (hours % 7 === 0 || mins % 7 === 0) {
    quote = 'I\'ve always had a bit of a blind spot with sevens';
  }
  if (hours > 12 && hours < 14 && randomInt(100) > 50) {
    quote = 'It\'s about lunchtime, maybe half one';
  }
  if (hours > 19 && randomInt(100) > 50) {
    quote = 'About as late as you\'d expect';
  }

  textTime.text = `Alright dudes? It's ${hours}:${mins}`;
  textQuote.text = quote;
};

const main = () => {
  clock.granularity = 'minutes';
  clock.ontick = onTick;
};

main();
