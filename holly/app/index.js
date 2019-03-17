import clock from 'clock';
import document from 'document';

const QUOTES = [
  'There\'s an emergency going on',
  'It\'s still going on',
  'About as late as you\'d expect',
  'Why are you asking me?',
  'Probably not serious, don\'t panic',
  'That\'s a poor IQ for a glass of water!',
  'That\'s a load of Tottenham, that is',
  'Oh yeah, didn\'t see that',
  'I\'ve always had a bit of a blind spot with sevens',
  'It\'s about lunchtime, maybe half one',
  'My IQ is 6000 - same as 6000 PE teachers',
  'Abandon shop! This is not a daffodil.',
  'Everybody\'s dead, Dave',
  'They\'re dead, Dave.',
  'Gordon Bennett!',
];

const textTime = document.getElementById('text_time');
const textQuote = document.getElementById('text_quote');

const zeroPad = i => (i >= 10) ? i : `0${i}`;

const randomInt = max => Math.round(Math.random() * max);

const onTick = (event) => {
  const today = event.date;
  const hours = zeroPad(today.getHours());
  const mins = zeroPad(today.getMinutes());

  textTime.text = `Alright dudes? It's ${hours}:${mins}`;
  textQuote.text = QUOTES[randomInt(QUOTES.length - 1)];
};

const main = () => {
  clock.granularity = 'minutes';
  clock.ontick = onTick;
};

main();
